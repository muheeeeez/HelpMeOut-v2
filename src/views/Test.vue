<template>
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
          <h1>{{ userData.firstName }} {{ userData.lastName }}</h1>
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
  <div class="container">
    <div class="first-container">
      <h1>Hello, {{ userData.firstName }} {{ userData.lastName }}</h1>
      <p>Here are your recorded videos</p>
      <button @click="startRecording" :disabled="isRecording">Start Recording</button>
      <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
      <!-- <video ref="videoRef" controls></video> -->
      <!-- <a v-if="videoUrl" :href="videoUrl" download="recorded-video.webm">Download Video</a> -->
    </div>
    <div class="second-container"><input type="text" /></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'vue-router'
const userData = ref({})
const router = useRouter()
const menuIsViewed = ref(false)
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' },
      audio: true,
    })

    recordedChunks.value = []
    mediaRecorder.value = new MediaRecorder(stream)

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.value.push(event.data)
    }

    mediaRecorder.value.onstop = () => {
      const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
      videoUrl.value = URL.createObjectURL(blob)
      videoRef.value.src = videoUrl.value
    }

    mediaRecorder.value.start()
    isRecording.value = true
  } catch (err) {
    console.error('Error starting screen recording:', err)
  }
}
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  }
}
const videoRef = ref(null)
const mediaRecorder = ref(null)
const recordedChunks = ref([])
const videoUrl = ref(null)
const isRecording = ref(false)
const logout = async () => {
  await auth.signOut()
  router.push('/login')
}
function menuView() {
  menuIsViewed.value = !menuIsViewed.value
}
onMounted(() => {
  const user = auth.currentUser
  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        userData.value = docSnap.data()
        // userVideos.value = docSnap.data().videos || []
      }
    })
  }
})
</script>
<style>
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
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
  font-size: 20px;
  line-height: 39.36px;
  color: #100a42;
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
  top: 6.5%;
  right: 6%;
}
.dropdown-menu ul {
  display: block;
  margin: 10px 0px 70px;
  background-color: #f8fafc;
  box-shadow: 2px 88px #ffffff;
  border-radius: 8px;
  height: 198px;
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
.profile h1 {
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
.container {
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  align-items: center;
  margin-top: 40px;
}
.first-container h1 {
  font-size: 38px;
  font-weight: 700;
  color: #141414;
}
.first-container p {
  font-size: 20px;
  font-weight: 400;
  color: #464444;
}
</style>
