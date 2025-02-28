<template>
  <div class="dashboard-container">
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

    <main class="main-content">
      <section class="intro-section">
        <h2>Hello, {{ userData.firstName }} {{ userData.lastName }}</h2>
        <p>Here are your recorded videos.</p>
        <div class="content">
          <button class="btn-primary" @click="openModal">Start Recording</button>
          <p>Or</p>
          <div class="upload-container">
            <label class="custom-file-upload">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                />
              </svg>
              <input type="file" @change="handleFileChange" accept="video/*" />
              Choose a file to Upload
            </label>
            <button @click="uploadVideos" :disabled="!selectedFile" class="upload-btn">
              Upload Video
            </button>
          </div>
        </div>

        <transition name="fade">
          <div v-if="showRecordModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal">
              <h2>Record a New Video</h2>
              <label for="videoTitle">Enter a title for your video:</label>
              <input
                id="videoTitle"
                v-model="videoName"
                type="text"
                placeholder="e.g. My Awesome Recording"
              />
              <div class="modal-actions">
                <button class="btn-primary" @click="startRecording">Confirm</button>
                <button class="btn-secondary" @click="closeModal">Cancel</button>
              </div>
            </div>
          </div>
        </transition>

        <p v-if="isRecording" class="user-guidance">
          Recording is in progress. You can stop recording using the browser's native controls.
        </p>
      </section>

      <section class="video-section">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for a particular video"
          v-model="searchValue"
          @keyup.enter="handleSearch"
        />
        <div class="video-container">
          <video class="video" ref="videoRef" controls></video>
        </div>
      </section>
    </main>

    <section class="videos-list">
      <DisplayVideo :childValue="searchValue" ref="childRef" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { auth, db, storage } from '../firebase'
import { doc, onSnapshot, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import DisplayVideo from '@/components/DisplayVideo.vue'

const userData = ref({})
const menuIsViewed = ref(false)
const mediaRecorder = ref(null)
const recordedChunks = ref([])
const videoName = ref('')
const videoUrl = ref(null)
const isRecording = ref(false)
const uploadProgress = ref(0)
const uploadError = ref('')
const uploadSuccess = ref(false)
const videoRef = ref(null)
let screenStream = null

const selectedFile = ref(null)
const router = useRouter()
const toast = useToast()
const showRecordModal = ref(false)
const searchValue = ref('')
const childRef = ref(null)
function showFirebaseError(error) {
  let message = ''
  switch (error.code) {
    case 'auth/invalid-email':
      message = 'Invalid email address. Please check and try again.'
      break
    case 'auth/user-not-found':
      message = 'No account found with this email.'
      break
    case 'auth/wrong-password':
      message = 'Incorrect password. Please try again.'
      break
    case 'auth/weak-password':
      message = 'Password is too weak. Please choose a stronger password.'
      break
    case 'auth/user-disabled':
      message = 'This account has been disabled. Please contact support.'
      break
    default:
      message = error.message || 'An unexpected error occurred. Please try again later.'
  }
  toast.error(message, { position: 'top-right' })
}

function menuView() {
  menuIsViewed.value = !menuIsViewed.value
}

function openModal() {
  showRecordModal.value = true
}

function closeModal() {
  showRecordModal.value = false
}

function handleSearch() {
  if (childRef.value) {
    childRef.value.filterVideos()
  }
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    toast.info(`Selected file: ${file.name}`)
  }
}

async function logout() {
  try {
    await auth.signOut()
    router.push('/login')
  } catch (err) {
    showFirebaseError(err)
  }
}

async function uploadVideos() {
  if (!selectedFile.value) {
    toast.error('No file selected!')
    return
  }
  const file = selectedFile.value
  const user = auth.currentUser
  if (!user) {
    toast.error('User not authenticated.', { position: 'top-right' })
    return
  }
  const fileName = videoName.value || file.name || 'Recording'
  const videoStoragePath = `videos/${user.uid}/${fileName}`
  const videoStorageReference = storageRef(storage, videoStoragePath)

  const uploadTask = uploadBytesResumable(videoStorageReference, file)
  toast.info('Uploading your video, please wait...', { position: 'top-right' })

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      uploadProgress.value = Math.floor(progress)
    },
    (error) => {
      uploadError.value = 'Upload failed: ' + error.message
      showFirebaseError(error)
      if (confirm('Upload failed. Would you like to download your video instead?')) {
        downloadVideo(new Blob(recordedChunks.value, { type: 'video/webm' }))
      }
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      toast.success('Video uploaded successfully!', { position: 'top-right' })
      const videosCollectionRef = collection(db, 'users', user.uid, 'videos')
      await addDoc(videosCollectionRef, {
        videoName: fileName,
        downloadURL,
        storagePath: videoStoragePath,
        uploadedAt: serverTimestamp(),
      })
    }
  )
}

async function startRecording() {
  try {
    showRecordModal.value = false
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' },
      audio: true,
    })
    screenStream.getTracks().forEach((track) => {
      track.addEventListener('ended', () => {
        stopRecording()
      })
    })

    recordedChunks.value = []
    mediaRecorder.value = new MediaRecorder(screenStream)

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.value.push(event.data)
      }
    }

    mediaRecorder.value.onstop = () => {
      const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
      videoUrl.value = URL.createObjectURL(blob)
      if (videoRef.value) {
        videoRef.value.src = videoUrl.value
      }
      saveVideoLocally(blob)
      uploadVideo(blob)
    }

    mediaRecorder.value.start()
    isRecording.value = true
    toast.success('Recording started!', { position: 'top-right' })
  } catch (err) {
    showFirebaseError(err)
  }
}

function stopRecording() {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    screenStream?.getTracks().forEach((track) => track.stop())
    toast.success('Recording stopped!', { position: 'top-right' })
  }
}

function saveVideoLocally(blob) {
  const reader = new FileReader()
  reader.onload = function (event) {
    localStorage.setItem('unsavedVideo', event.target.result)
    toast.info('Video backed up locally before uploading.', { position: 'top-right' })
  }
  reader.readAsDataURL(blob)
}

function downloadVideo(blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (videoName.value || 'Recording') + '.webm'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function uploadVideo(blob) {
  try {
    const user = auth.currentUser
    if (!user) {
      uploadError.value = 'User not authenticated.'
      toast.error('User not authenticated.', { position: 'top-right' })
      return
    }
    const fileName = videoName.value || 'Recording'
    const videoStoragePath = `videos/${user.uid}/${fileName}`
    const videoStorageReference = storageRef(storage, videoStoragePath)
    videoName.value = ''

    const uploadTask = uploadBytesResumable(videoStorageReference, blob)
    toast.info('Uploading your video, please wait...', { position: 'top-right' })

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploadProgress.value = Math.floor(progress)
      },
      (error) => {
        uploadError.value = 'Upload failed: ' + error.message
        showFirebaseError(error)
        if (confirm('Upload failed. Would you like to download your video instead?')) {
          downloadVideo(blob)
        }
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        videoUrl.value = downloadURL
        const videosCollectionRef = collection(db, 'users', user.uid, 'videos')
        await addDoc(videosCollectionRef, {
          videoName: fileName,
          downloadURL,
          storagePath: videoStoragePath,
          uploadedAt: serverTimestamp(),
        })
        uploadSuccess.value = true
        uploadProgress.value = 0
        uploadError.value = ''
        toast.success('Video uploaded successfully!', { position: 'top-right' })
        localStorage.removeItem('unsavedVideo')
      }
    )
  } catch (err) {
    uploadError.value = 'An error occurred during upload: ' + err.message
    showFirebaseError(err)
  }
}

let unsubscribeUserData = null
onMounted(() => {
  const user = auth.currentUser
  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    unsubscribeUserData = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          userData.value = docSnap.data()
        }
      },
      (err) => {
        showFirebaseError(err)
      }
    )
  } else {
    router.push('/login')
  }
})

onBeforeUnmount(() => {
  if (unsubscribeUserData) unsubscribeUserData()
})
</script>

<style scoped>
svg {
  width: 60px;
  margin-right: 20px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
input[type='file'] {
  display: none;
}
.custom-file-upload {
  display: flex;
  align-items: center;
  margin-right: 30px;
  font-size: 18px;
  color: #555;
  font-family: "Poppins", sans-serif;
}
.dashboard-container {
  display: flex;
  flex-direction: column;
}
.content .btn-primary {
  margin-top: 20px;
}
.content {
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: center;
}
.content p {
  text-align: center;
  margin: auto 0;
  padding: 0;
  display: flex;
  font-family: "Poppins", sans-serif;
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
  line-height: 1.2;
  color: #120b48;
  margin: 0;
  font-family: "Poppins", sans-serif;
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
  font-family: "Poppins", sans-serif;
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
  animation: fadeInDown 0.25s ease forwards;
  overflow: hidden;
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
  font-family: "Poppins", sans-serif;
}
.dropdown-menu ul li:hover {
  background-color: #f5f5f7;
}
.dropdown-menu a {
  color: #000;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
}
.listing img {
  width: 20px;
  height: 20px;
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
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 5%;
}
.intro-section {
  margin-bottom: 10px;
}
.intro-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: #141414;
  margin-bottom: 8px;
  font-family: "Poppins", sans-serif;
}
.intro-section p {
  font-size: 18px;
  color: #555;
  margin-bottom: 16px;
  font-family: "Poppins", sans-serif;
}
.user-guidance {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
.btn-primary,
.btn-secondary {
  cursor: pointer;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  transition: 0.2s;
}
.btn-primary {
  background-color: #120b48;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0c0836;
}
.upload-btn {
  cursor: pointer;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  transition: 0.2s;
  background-color: #120b48;
  color: #fff;
}
.upload-btn:hover {
  background-color: #0c0836;
}
.btn-secondary {
  background-color: #e0e0e0;
  color: #000;
}
.btn-secondary:hover {
  background-color: #c9c9c9;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.video-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}
.video-container {
  position: relative;
  width: 500px;
  max-width: 100%;
}
.video {
  width: 100%;
  border-radius: 8px;
  display: none;
  background: #000;
}
.search-bar {
  flex: 1;
  max-width: 350px;
  height: 44px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}
.search-bar::placeholder {
  color: #999;
}
.videos-list {
  margin-top: 0px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 320px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.modal h2 {
  margin: 0 0 12px;
  font-size: 20px;
  color: #120b48;
  font-family: "Poppins", sans-serif;
}
.modal label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}
.modal input[type='text'] {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.upload-container {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
</style>
