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
        <font-awesome-icon :icon="['fas', 'home']" /> Home / <span><font-awesome-icon :icon="['fas', 'video']" /> {{ video.videoName }}</span>
      </h3>
      <h1 class="video-name"><font-awesome-icon :icon="['fas', 'file-video']" /> {{ video.videoName }}</h1>
      <div class="videos-grid">
        <video controls :src="video.downloadURL" type="video/webm" class="card-video" />
      </div>
      <p class="transcript"><font-awesome-icon :icon="['fas', 'closed-captioning']" /> Transcript</p>
      <select id="language" disabled>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="spain">Spanish</option>
        <option value="arabic">Arabic</option>
      </select>
      <div class="send">
        <div class="send-item">
          <div class="input-container">
            <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
            <input type="text" placeholder="Enter email of receiver" v-model="recieverEmail" />
          </div>
          <button class="btn-primary" @click="prepareEmail">
            <font-awesome-icon :icon="['fas', 'paper-plane']" /> <a :href="mailtoLink">Send</a>
          </button>
        </div>
        <div class="send-item">
          <div class="input-container">
            <font-awesome-icon :icon="['fas', 'link']" class="input-icon" />
            <input type="text" disabled :value="VideoCopyUrl" />
          </div>
          <button class="btn-secondary" @click="copyToClipboard">
            <font-awesome-icon :icon="['fas', 'copy']" /> Copy URL
          </button>
        </div>
      </div>
      <div class="share">
        <p><font-awesome-icon :icon="['fas', 'share-alt']" /> Share your video</p>
        <div class="share-button">
          <button class="btn-tertiary">
            <font-awesome-icon :icon="['fab', 'facebook-f']" /> Facebook
          </button>
          <button class="btn-tertiary">
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
            <a :href="whatsappUrl" target="_blank">WhatsApp</a>
          </button>
          <button class="btn-tertiary">
            <font-awesome-icon :icon="['fab', 'telegram-plane']" />
            <a :href="telegramUrl" target="_blank">Telegram</a>
          </button>
        </div>
      </div>

      <p class="upload-date"><font-awesome-icon :icon="['fas', 'calendar-alt']" /> Uploaded At: {{ formatDate(video.uploadedAt) }}</p>

      <button @click="goBack" class="btn-secondary back-button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back to List
      </button>
    </div>
    <div v-else-if="isLoading" class="loading">
      <font-awesome-icon :icon="['fas', 'spinner']" class="loading-icon fa-pulse" />
      <p>Loading video details...</p>
    </div>
    <div v-else class="error">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="error-icon" />
      <p>{{ error }}</p>
      <button @click="goBack" class="btn-primary back-button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back to List
      </button>
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
  background-color: #f5f7fa;
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
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.07);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.top-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.top-logo:hover {
  transform: scale(1.05);
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
  gap: 12px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 30px;
  transition: background-color 0.3s;
}
.profile:hover {
  background-color: #f5f5f7;
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
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  width: 260px;
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
  gap: 12px;
  padding: 12px 20px;
  transition: background-color 0.2s;
  cursor: pointer;
}
.dropdown-menu a {
  flex: 1;
  color: #000;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
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
  padding: 40px 5%;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.breadcrumb {
  margin-bottom: 12px;
  font-size: 16px;
  color: rgba(20, 20, 20, 0.6);
}

.breadcrumb span {
  font-weight: 600;
  color: #141414;
}
.video-name {
  margin-top: 0;
  font-size: 32px;
  font-weight: 700;
  color: #141414;
  margin-bottom: 24px;
  position: relative;
  display: inline-block;
}

.video-name::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #120b48, #424b6e);
  border-radius: 3px;
}

.videos-grid {
  margin-bottom: 30px;
}

.card-video {
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 12px;
  background-color: #000;
  outline: none;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.transcript {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;
}

select {
  width: 140px;
  height: 40px;
  margin-bottom: 30px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #f8f9fc;
  font-family: 'Poppins', sans-serif;
  color: #555;
  transition: border-color 0.3s;
}

select:focus {
  outline: none;
  border-color: #120b48;
}

.send {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}
.send-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.input-container {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}

.send-item input[type='text'] {
  padding-left: 45px;
}

.share {
  margin-bottom: 30px;
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}
.share p {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #120b48;
}
.share-button {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.share-button .btn-tertiary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f7fa;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}
.share-button .btn-tertiary:hover {
  background-color: #e9ecf1;
  transform: translateY(-2px);
}
.share-button a {
  color: inherit;
  text-decoration: none;
}
.upload-date {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  display: inline-block;
  padding: 8px 16px;
  background-color: #f2f4f8;
  border-radius: 20px;
}
.back-button {
  margin-top: 20px;
}
.btn-primary,
.btn-secondary {
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.btn-primary {
  background: linear-gradient(to right, #120b48, #424b6e);
  color: #fff;
  box-shadow: 0 4px 10px rgba(18, 11, 72, 0.2);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(18, 11, 72, 0.25);
}
.btn-primary a {
  text-decoration: none;
  color: #fff;
}
.btn-secondary {
  background-color: #e9ecef;
  color: #343a40;
}
.btn-secondary:hover {
  background-color: #dee2e6;
  transform: translateY(-2px);
}

.loading,
.error {
  text-align: center;
  padding: 80px 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin: 40px auto;
  max-width: 500px;
  animation: fadeIn 0.4s ease-out;
}

.loading p {
  color: #120b48;
  font-size: 18px;
  position: relative;
  padding-bottom: 40px;
}

.loading p::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 3px solid #e0e3eb;
  border-top-color: #120b48;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translateX(-50%);
}

@keyframes spin {
  to { transform: translateX(-50%) rotate(360deg); }
}

.error p {
  color: #e74c3c;
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .video-detail-container {
    padding: 30px 15px;
  }
  
  .send {
    flex-direction: column;
    gap: 20px;
  }
  
  .send-item {
    width: 100%;
  }
  
  .send-item input[type='text'] {
    width: 100%;
  }
  
  .video-name {
    font-size: 26px;
  }
  
  .share-button {
    gap: 10px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 10px 16px;
    font-size: 14px;
  }
}

.loading-icon {
  font-size: 2rem;
  color: #120b48;
  margin-bottom: 15px;
}

.error-icon {
  font-size: 2rem;
  color: #e74c3c;
  margin-bottom: 15px;
}

.loading {
  text-align: center;
  padding: 80px 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin: 40px auto;
  max-width: 500px;
  animation: fadeIn 0.4s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading p {
  color: #120b48;
  font-size: 18px;
}

.error {
  text-align: center;
  padding: 80px 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin: 40px auto;
  max-width: 500px;
  animation: fadeIn 0.4s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.breadcrumb i, .video-name i, .transcript i, .share p i, .upload-date i {
  margin-right: 8px;
  color: #120b48;
}

.btn-primary i, .btn-secondary i, .btn-tertiary i {
  margin-right: 8px;
}
</style>
