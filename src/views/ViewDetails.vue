<!-- src/components/VideoDetail.vue -->
<template>
  <hr />
  <div>
    <div class="menu-bar">
      <div class="top-logo">
        <svg
          class="logo"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.1401 16.8421C30.5804 14.9122 29.5621 13.1464 28.1721 11.6953C26.7821 10.2442 25.0617 9.15092 23.1577 8.50876C21.2766 7.96121 19.2993 7.82666 17.3614 8.11432C15.4234 8.40199 13.5705 9.10507 11.9296 10.1754C11.7946 10.3107 11.6252 10.4067 11.4398 10.4531C11.2544 10.4994 11.0598 10.4944 10.877 10.4386C10.5084 10.3192 10.1763 10.1079 9.91205 9.82455C9.71967 9.47744 9.65746 9.07308 9.73661 8.68419C9.78687 8.49754 9.87514 8.32327 9.9959 8.17233C10.1167 8.02138 10.2673 7.89701 10.4384 7.807C15.0875 5.0877 19.6489 4.38595 24.0349 5.78946C26.1942 6.50768 28.1656 7.69964 29.8047 9.27811C31.4439 10.8566 32.7094 12.7816 33.5085 14.9123H39.3857C38.184 10.1719 35.2871 6.0361 31.2427 3.28683C27.1983 0.537565 22.2868 -0.634627 17.4368 -0.00811872C12.5868 0.618389 8.13434 3.00017 4.92135 6.68692C1.70837 10.3737 -0.0425069 15.1098 -0.000228394 20C-0.000228394 20.7895 0.0874909 21.4912 0.0874909 22.2807H7.54363C7.82839 22.2645 8.11069 22.3414 8.34801 22.4996C8.58532 22.6578 8.76481 22.8888 8.85942 23.1579C9.43235 25.0811 10.4553 26.8402 11.8434 28.2894C13.2316 29.7385 14.945 30.8361 16.8419 31.4912C18.723 32.0388 20.7002 32.1733 22.6382 31.8856C24.5761 31.598 26.429 30.8949 28.0699 29.8245C28.205 29.6892 28.3743 29.5933 28.5597 29.5469C28.7452 29.5005 28.9398 29.5055 29.1226 29.5614C29.4911 29.6808 29.8232 29.8921 30.0875 30.1754C30.2799 30.5225 30.3421 30.9269 30.2629 31.3158C30.2127 31.5024 30.1244 31.6767 30.0036 31.8276C29.8829 31.9786 29.7323 32.103 29.5612 32.193C26.917 33.9722 23.8008 34.9192 20.6138 34.9123C19.0386 34.9004 17.4732 34.6641 15.9647 34.2105C13.7963 33.5094 11.8162 32.3235 10.1747 30.7428C8.53315 29.162 7.27338 27.2281 6.491 25.0877H0.701526C1.96964 29.7501 4.88277 33.7958 8.90243 36.477C12.9221 39.1582 17.7765 40.2935 22.5683 39.6731C27.3601 39.0527 31.7653 36.7186 34.9696 33.1022C38.174 29.4858 39.9608 24.8316 39.9998 20C40.0161 19.2679 39.9868 18.5355 39.9121 17.807H32.5436C32.2445 17.7872 31.9563 17.6872 31.7093 17.5174C31.4623 17.3476 31.2657 17.1143 31.1401 16.8421Z"
            fill="#100A42"
          />
          <path
            d="M20.0841 28.7495C21.811 28.7329 23.4944 28.2056 24.9222 27.2341C26.3501 26.2626 27.4585 24.8903 28.1078 23.2901C28.7572 21.6898 28.9185 19.9332 28.5715 18.2414C28.2244 16.5497 27.3845 14.9985 26.1575 13.7832C24.9305 12.5679 23.3713 11.7428 21.6763 11.412C19.9813 11.0811 18.2263 11.2592 16.6324 11.9239C15.0384 12.5886 13.6768 13.71 12.719 15.1471C11.7612 16.5841 11.2501 18.2725 11.25 19.9995C11.2499 21.1557 11.479 22.3004 11.924 23.3675C12.369 24.4346 13.021 25.403 13.8425 26.2166C14.6639 27.0302 15.6385 27.673 16.7098 28.1077C17.7811 28.5425 18.928 28.7606 20.0841 28.7495Z"
            fill="white"
          />
        </svg>
        <h1>HelpMeOut</h1>
      </div>
      <div class="profile-bar">
        <li>
          <div class="profile" @click="menuView">
            <img src="../assets/images/profile-circle.png" alt="" />
            <p>{{ userData.firstName }} {{ userData.lastName }}</p>
            <img src="../assets/images/arrow-down.png" alt="" />
          </div>
          <div class="dropdown-menu" v-if="menuIsViewed">
            <ul>
              <li class="listing">
                <img src="../assets/images/setting-2.png" alt="" /><router-link>
                  Settings and Privacy</router-link
                >
                <img src="../assets/images/arrow-right.png" alt="arrow-right" />
              </li>
              <li class="listing">
                <img src="../assets/images/moon.png" alt="" /><router-link
                  >Display and Accessbility</router-link
                ><img src="../assets/images/arrow-right.png" alt="arrow-right" />
              </li>
              <li class="listing">
                <img src="../assets/images/message-question.png" alt="" /><router-link
                  >Help and Support</router-link
                ><img src="../assets/images/arrow-right.png" alt="arrow-right" />
              </li>
              <li class="listing" @click="logout">
                <img src="../assets/images/logout.png" alt="" /><router-link>Logout</router-link>
              </li>
            </ul>
          </div>
        </li>
      </div>
    </div>
  </div>

  <div class="video-detail-container" v-if="video">
    <h3>
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
      <option value="spain">Spain</option>
      <option value="arabic">Arabic</option>
    </select>
    <div class="send">
      <div>
        <input type="text" placeholder="enter email of receiver " v-model="recieverEmail" />
        <button @click="prepareEmail"><a :href="mailtoLink">Send</a></button>
      </div>
      <div>
        <input type="text" disabled :placeholder="VideoCopyUrl" />
        <button @click="copyToClipboard"><img src="../assets/images/copy.png" /> Copy URL</button>
      </div>
    </div>
    <div class="share">
      <p>Share your video</p>
      <div class="share-button">
        <button><img src="../assets/images/Facebook.png" alt="" />Facebook</button>
        <button>
          <img src="../assets/images/Whatsapp.png" alt="" /><a :href="whatsappUrl" target="_blank"
            >WhatsApp</a
          >
        </button>
        <button>
          <img src="../assets/images/Telegram.png" alt="" /><a :href="telegramUrl" target="_blank"
            >Telegram</a
          >
        </button>
      </div>
    </div>
    <p>Uploaded At: {{ formatDate(video.uploadedAt) }}</p>
    <!-- Add more video details as needed -->
    <button @click="goBack" class="back-button">Back to List</button>
  </div>

  <!-- Loading Indicator -->
  <div v-else-if="isLoading" class="loading">
    <p>Loading video details...</p>
  </div>

  <!-- Error Message -->
  <div v-else class="error">
    <p>{{ error }}</p>
    <button @click="goBack" class="back-button">Back to List</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, db, storage } from '../firebase' // Adjust the path as needed
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth'
const menuIsViewed = ref(false)
const userData = ref({})
const uploadError = ref('')
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
// const messengerUrl = ref('')

// messengerUrl.value = `https://m.me/${encodeURIComponent(this.messengerPageId)}`

function menuView() {
  menuIsViewed.value = !menuIsViewed.value
}
// Function to Format Firestore Timestamps
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
    toast.error('Copy Error ' + err.message, {
      position: 'top-right',
    })
  }
}
// Function to Fetch Video Details
const fetchVideoDetails = async () => {
  if (!authStore.user) {
    toast.error('User not authenticated.', { position: 'top-right' })
    router.push('/login')
    return
  }

  const passedVideo = route.state?.video
  console.log(passedVideo)
  const videoId = route.params.id

  if (passedVideo) {
    // Use the passed video object
    video.value = passedVideo
    isLoading.value = false
  } else {
    // Fallback: Fetch video from Firestore using ID
    try {
      const videoDocRef = doc(db, 'users', authStore.user.uid, 'videos', videoId)
      const videoSnap = await getDoc(videoDocRef)

      if (videoSnap.exists()) {
        const videoData = videoSnap.data()
        video.value = { id: videoSnap.id, ...videoData }

        // Ensure the downloadURL is up-to-date
        video.value.downloadURL = await getDownloadURL(storageRef(storage, video.value.downloadURL))
        VideoCopyUrl.value = video.value.downloadURL
      } else {
        toast.error('Video not found.', { position: 'top-right' })
        router.push('/')
      }
    } catch (err) {
      console.error('Error fetching video details:', err)
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
    unsubscribeUserData = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          userData.value = docSnap.data()
          console.log('User data fetched:', userData.value)
        } else {
          console.warn('No such document!')
        }
      },
      (err) => {
        console.error('Error fetching user data:', err)
        uploadError.value = 'Failed to fetch user data.'
        toast.error('Failed to fetch user data: ' + err.message, { position: 'top-right' })
      },
    )
  } else {
    // If no user is authenticated, redirect to login
    router.push('/login')
  }
})
onBeforeUnmount(() => {
  if (unsubscribeUserData) {
    unsubscribeUserData()
  }
})
const prepareEmail = () => {
  mailtoLink.value = `mailto:${recieverEmail.value}?subject=Video%20from%20${userData.value.firstName}&body=This%20Is%20the%20Link:%20${VideoCopyUrl.value}`
  recieverEmail.value = ''
}
const message = ref(`Video from ${userData.value.firstName}: ${VideoCopyUrl.value}`)

whatsappUrl.value = `https://wa.me/?text=${message.value}`
telegramUrl.value = `https://t.me/share/url?url=${encodeURIComponent(VideoCopyUrl.value)}&text=${encodeURIComponent(message)}`
// Function to Navigate Back
const goBack = () => {
  router.back()
}
const logout = async () => {
  try {
    await auth.signOut()
    router.push('/login')
  } catch (err) {
    console.error('Logout Error:', err)
    toast.error('Logout failed: ' + err.message, { position: 'top-right' })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
hr {
  background-color: #dfe1e5;
  border: 1px solid #dfe1e5;
  margin-top: 50px;
  margin-bottom: 50px;
}
.video-name {
  margin-top: 46px;
  height: 46px;
  padding: 8px 0;
  font-size: 30px;
  font-weight: 600;
  color: rgba(20, 20, 20, 1);
}
h3 {
  height: 21px;
  font-size: 23px;
  font-weight: 400;
  color: rgba(20, 20, 20, 0.7);
}
span {
  font-weight: 500;
  font-size: 23px;
  color: #141414;
}
.first {
  margin-bottom: 40px;
}
.top-logo {
  display: flex;
  gap: 10px;
  cursor: pointer;
}
.top-logo h1 {
  width: 89px;
  height: 29px;
  font-weight: 700;
  font-size: 25px;
  line-height: 39.36px;
  color: #141414;
}
.logo {
  cursor: pointer;
}
.menu-bar {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}
.dropdown-menu {
  display: block;
  position: absolute;
  /* left: ; */
  top: 13.5%;
  right: 6%;
}
.dropdown-menu ul {
  display: block;
  margin: 10px 0px 70px;
  background-color: #f8fafc;
  box-shadow: 2px 88px #ffffff;
  border-radius: 8px;
  height: 98px;
}
.dropdown-menu ul li {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 250px;
  padding: 10px;
}
.profile-bar {
  display: flex;
  padding: 10px 30px;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  cursor: pointer;
}
.profile p {
  font-size: 20px;
}
.listing {
  width: 276px;
  height: 40px;
  /* justify-content: space-between; */
  font-size: 16.3px;
  font-weight: 500;
  line-height: 18.77px;
}
.video-detail-container {
  padding: 0 5%;
}

.detail-video {
  width: 80%;
  max-width: 800px;
  height: auto;
  margin: 20px 0;
}

.back-button {
  background-color: #008cba;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #007bb5;
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
.share p {
  font-size: 20px;
  font-weight: 500;
  color: rgba(8, 5, 30, 1);
  margin: 12px 0px;
}
.share-button {
  display: flex;
  gap: 20px;
  align-items: center;
  text-align: center;
}
.share-button button {
  width: 121px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 6px;
  background: transparent;
}
.transcript {
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin: 12px 0px;
}
select {
  width: 107px;
  height: 30px;
  margin-bottom: 22px;
}
input {
  width: 400px;
  height: 52px;
  border: 0.5px solid rgba(146, 146, 146, 1);
  background-color: rgba(250, 250, 250, 1);
}
.send {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.video-item {
  width: 1240px;
  height: 498px;
  border: 1px solid #b6b3c6;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
  background-color: #f8fafc;
  padding: 16px 16px 24px 16px;
  overflow: hidden;
}

.card-video {
  margin-bottom: 15px;
  width: 1208px;
  height: 458px;
  border-radius: 10px;
  /* border: 1px solid #b6b3c6; */
  object-fit: cover;
}
</style>
