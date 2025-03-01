<template>
  <div class="video-detail-page">
    <header class="menu-bar">
      <div class="top-logo" @click="() => router.push('/')">
        <svg
          class="logo"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M31.1401 16.8421C30.5804 14.9122 29.5621 13.1464..." fill="#100A42" />
          <path d="M20.0841 28.7495C21.811 28.7329 23.4944..." fill="white" />
        </svg>
        <h1>HelpMeOut</h1>
      </div>
      <div class="profile-bar">
        <li>
          <div class="profile" @click="menuView">
            <img src="../assets/images/profile-circle.png" alt="profile" />
            <p>{{ userData.firstName }} {{ userData.lastName }}</p>
            <img src="../assets/images/arrow-down.png" alt="arrow-down" />
          </div>

          <transition name="dropdown">
            <div class="dropdown-menu" v-if="menuIsViewed">
              <ul>
                <li class="listing">
                  <img src="../assets/images/setting-2.png" alt="settings" />
                  <router-link>Settings and Privacy</router-link>
                  <img src="../assets/images/arrow-right.png" alt="arrow-right" />
                </li>
                <li class="listing">
                  <img src="../assets/images/moon.png" alt="moon" />
                  <router-link>Display and Accessibility</router-link>
                  <img src="../assets/images/arrow-right.png" alt="arrow-right" />
                </li>
                <li class="listing">
                  <img src="../assets/images/message-question.png" alt="help" />
                  <router-link>Help and Support</router-link>
                  <img src="../assets/images/arrow-right.png" alt="arrow-right" />
                </li>
                <li class="listing" @click="logout">
                  <img src="../assets/images/logout.png" alt="logout" />
                  <router-link>Logout</router-link>
                </li>
              </ul>
            </div>
          </transition>
        </li>
      </div>
    </header>
    <div class="video-detail-container" v-if="video && !isLoading">
      <h3 class="breadcrumb">
        Home / <span>{{ video.videoName }}</span>
      </h3>
      <h1 class="video-name">{{ video.videoName }}</h1>
      <div class="videos-grid">
        <video controls :src="video.downloadURL" type="video/webm" class="card-video" />
      </div>
      <p class="transcript">Transcript</p>
      <select id="language" disabled>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="spain">Spanish</option>
        <option value="arabic">Arabic</option>
      </select>
      <div class="send">
        <div class="send-item">
          <input type="text" placeholder="Enter email of receiver" v-model="recieverEmail" />
          <button class="btn-primary" @click="prepareEmail">
            <a :href="mailtoLink">Send</a>
          </button>
        </div>
        <div class="send-item">
          <input type="text" disabled :value="VideoCopyUrl" />
          <button class="btn-secondary" @click="copyToClipboard">
            <img src="../assets/images/copy.png" alt="copy" /> Copy URL
          </button>
        </div>
      </div>
      <div class="share">
        <p>Share your video</p>
        <div class="share-button">
          <button class="btn-tertiary">
            <img src="../assets/images/Facebook.png" alt="facebook" />
            Facebook
          </button>
          <button class="btn-tertiary">
            <img src="../assets/images/Whatsapp.png" alt="whatsapp" />
            <a :href="whatsappUrl" target="_blank">WhatsApp</a>
          </button>
          <button class="btn-tertiary">
            <img src="../assets/images/Telegram.png" alt="telegram" />
            <a :href="telegramUrl" target="_blank">Telegram</a>
          </button>
        </div>
      </div>

      <p class="upload-date">Uploaded At: {{ formatDate(video.uploadedAt) }}</p>

      <button @click="goBack" class="btn-secondary back-button">Back to List</button>
    </div>
    <div v-else-if="isLoading" class="loading">
      <p>Loading video details...</p>
    </div>
    <div v-else class="error">
      <p>{{ error }}</p>
      <button @click="goBack" class="btn-primary back-button">Back to List</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, db, storage } from '../firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth'
const menuIsViewed = ref(false)
const userData = ref({})
let unsubscribeUserData = null
const VideoCopyUrl = ref('')
const mailtoLink = ref('')
const route = useRoute()
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const recieverEmail = ref('')
const video = ref(null)
const isLoading = ref(true)
const error = ref('')
const whatsappUrl = ref('')
const telegramUrl = ref('')

function menuView() {
  menuIsViewed.value = !menuIsViewed.value
}

const logout = async () => {
  try {
    await auth.signOut()
    router.push('/login')
  } catch (err) {
    toast.error('Logout failed: ' + err.message, { position: 'top-right' })
  }
}
const formatDate = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate()
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    }
    return date.toLocaleDateString(undefined, options)
  }
  return ''
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(VideoCopyUrl.value)
    toast.info('Copied to clipboard')
  } catch (err) {
    toast.error('Copy Error: ' + err.message, { position: 'top-right' })
  }
}
const fetchVideoDetails = async () => {
  if (!authStore.user) {
    toast.error('User not authenticated.', { position: 'top-right' })
    router.push('/login')
    return
  }

  const passedVideo = route.state?.video
  const videoId = route.params.id

  if (passedVideo) {
    video.value = passedVideo
    VideoCopyUrl.value = passedVideo.downloadURL
    isLoading.value = false
  } else {
    try {
      const videoDocRef = doc(db, 'users', authStore.user.uid, 'videos', videoId)
      const videoSnap = await getDoc(videoDocRef)
      if (videoSnap.exists()) {
        const videoData = videoSnap.data()
        video.value = { id: videoSnap.id, ...videoData }
        video.value.downloadURL = await getDownloadURL(storageRef(storage, video.value.downloadURL))
        VideoCopyUrl.value = video.value.downloadURL
      } else {
        toast.error('Video not found.', { position: 'top-right' })
        router.push('/')
      }
    } catch (err) {
      toast.error('Failed to load video details: ' + err.message, { position: 'top-right' })
    } finally {
      isLoading.value = false
    }
  }
}

onMounted(() => {
  fetchVideoDetails()
  const user = auth.currentUser
  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    unsubscribeUserData = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        userData.value = docSnap.data()
      }
    })
  } else {
    router.push('/login')
  }
})

onBeforeUnmount(() => {
  if (unsubscribeUserData) unsubscribeUserData()
})

const prepareEmail = () => {
  mailtoLink.value = `mailto:${recieverEmail.value}?subject=Video%20from%20${userData.value.firstName}&body=Here%20is%20the%20video%20link:%20${VideoCopyUrl.value}`
  recieverEmail.value = ''
}
const message = ref(`Video from ${userData.value.firstName}: ${VideoCopyUrl.value}`)
whatsappUrl.value = `https://wa.me/?text=${encodeURIComponent(message.value)}`
telegramUrl.value = `https://t.me/share/url?url=${encodeURIComponent(VideoCopyUrl.value)}&text=${encodeURIComponent(
  message.value,
)}`

const goBack = () => {
  router.back()
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
.video-detail-page {
  background-color: #f5f5f7; /* match your other pages */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.menu-bar {
  height: 70px;
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.top-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.top-logo h1 {
  font-size: 24px;
  font-weight: 700;
  color: #120b48;
  margin: 0;
}
.logo {
  cursor: pointer;
}
.profile-bar {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 0;
  list-style-type: none;
}
.profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.profile p {
  font-size: 16px;
  margin: 0;
  font-weight: 500;
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 70px;
  right: 5%;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 240px;
  overflow: hidden;
  animation: fadeInDown 0.25s ease forwards;
}

.dropdown-menu ul {
  margin: 0;
  padding: 10px 0;
  list-style: none;
}

.dropdown-menu ul li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  transition: background-color 0.2s;
}
.dropdown-menu a {
  color: #000;
  text-decoration: none;
}
.dropdown-menu ul li:hover {
  background-color: #f5f5f7;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.video-detail-container {
  padding: 30px 5%;
  flex: 1;
}
.breadcrumb {
  margin-bottom: 8px;
  font-size: 18px;
  color: rgba(20, 20, 20, 0.7);
}

.breadcrumb span {
  font-weight: 600;
  color: #141414;
}
.video-name {
  margin-top: 0;
  font-size: 28px;
  font-weight: 700;
  color: #141414;
  margin-bottom: 16px;
}
.videos-grid {
  margin-bottom: 24px;
}

.card-video {
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 10px;
  background-color: #000;
  outline: none;
}
.transcript {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-bottom: 8px;
}

select {
  width: 120px;
  height: 32px;
  margin-bottom: 24px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.send {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 24px;
}
.send-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.send-item input[type='text'] {
  width: 300px;
  height: 40px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  border-radius: 4px;
  padding: 0 8px;
}
.share {
  margin-bottom: 16px;
}
.share p {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.share-button {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.share-button .btn-tertiary {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.share-button .btn-tertiary:hover {
  background-color: #e2e2e2;
}
.share-button a {
  color: inherit;
  text-decoration: none;
}
.upload-date {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}
.back-button {
  margin-top: 16px;
}
.btn-primary,
.btn-secondary {
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  transition: 0.2s;
  border: none;
}

.btn-primary {
  background-color: #120b48;
}
.btn-primary:hover {
  background-color: #0c0836;
}
.btn-primary a {
  text-decoration: none;
  color: #fff;
}
.btn-secondary {
  background-color: #e0e0e0;
  color: #000;
}
.btn-secondary:hover {
  background-color: #c9c9c9;
}

.loading,
.error {
  text-align: center;
  padding: 50px;
}

.error p {
  color: red;
  margin-bottom: 20px;
}
</style>
