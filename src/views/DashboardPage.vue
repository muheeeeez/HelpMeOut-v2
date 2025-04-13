<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-container" @click="() => router.push('/')">
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
        
        <div class="profile-section" @click="toggleProfileMenu">
          <div class="profile-info">
            <font-awesome-icon :icon="['fas', 'user-circle']" class="avatar-icon" />
            <span>{{ userData.firstName }} {{ userData.lastName }}</span>
            <font-awesome-icon :icon="['fas', 'chevron-down']" class="dropdown-icon" :class="{ 'rotate': profileMenuOpen }" />
          </div>
          
          <div class="profile-dropdown" v-if="profileMenuOpen">
            <div class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'cog']" />
              <span>Settings</span>
            </div>
            <div class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'question-circle']" />
              <span>Help & Support</span>
            </div>
            <div class="dropdown-item" @click="logout">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="dashboard-main">
      <div class="dashboard-welcome">
        <div class="welcome-text">
          <h2>
            <font-awesome-icon :icon="['fas', 'user-circle']" />
            Welcome, {{ userData.firstName }} {{ userData.lastName }}
          </h2>
          <p>
            <font-awesome-icon :icon="['fas', 'film']" />
            Here are your recorded videos
          </p>
        </div>
        
        <div class="action-buttons">
          <button class="btn-primary" @click="openModal">
            <font-awesome-icon :icon="['fas', 'video']" />
            Start Recording
          </button>
          
          <div class="divider">Or</div>
          
          <div class="upload-section">
            <label class="file-upload-label">
              <font-awesome-icon :icon="['fas', 'upload']" />
              <input type="file" @change="handleFileChange" accept="video/*" />
              <span>Choose a file to upload</span>
            </label>
            
            <button 
              @click="uploadVideos" 
              :disabled="!selectedFile" 
              class="btn-secondary"
              :class="{ 'btn-disabled': !selectedFile }"
            >
              <font-awesome-icon :icon="['fas', 'cloud-upload-alt']" />
              Upload Video
            </button>
          </div>
        </div>
      </div>

      <div class="search-section">
        <div class="search-container">
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
          <input
            type="text"
            class="search-input"
            placeholder="Search for a particular video"
            v-model="searchValue"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <div class="video-content">
        <div class="recent-files">
          <h3>
            <font-awesome-icon :icon="['fas', 'clock']" />
            Recent Files
          </h3>
        </div>
        
        <div class="video-preview">
          <video class="video" ref="videoRef" controls></video>
        </div>
        
        <div class="video-list-wrapper">
          <DisplayVideo 
            ref="videoDisplay" 
            :childValue="searchValue"
          />
        </div>
      </div>
    </div>

    <!-- Modal for recording -->
    <transition name="fade">
      <div v-if="showRecordModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h2>
              <font-awesome-icon :icon="['fas', 'video']" />
              Record a New Video
            </h2>
            <button class="modal-close" @click="closeModal">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label for="videoTitle">Enter a title for your video</label>
              <input
                id="videoTitle"
                v-model="videoName"
                type="text"
                placeholder="e.g. Product Demonstration"
                class="modal-input"
              />
            </div>
            
            <div class="form-group audio-toggle-group">
              <label class="toggle-label">
                <span>
                  <font-awesome-icon :icon="['fas', 'microphone']" />
                  Capture Audio
                </span>
                <div class="toggle-switch">
                  <input type="checkbox" v-model="captureAudio" />
                  <span class="toggle-slider"></span>
                </div>
              </label>
              <p class="audio-note">
                <font-awesome-icon :icon="['fas', 'info-circle']" /> 
                When enabled, your microphone and system sounds will be recorded
              </p>
            </div>
            
            <div class="modal-actions">
              <button class="btn-primary" @click="startRecording">
                <font-awesome-icon :icon="['fas', 'check-circle']" />
                Confirm
              </button>
              <button class="btn-secondary" @click="closeModal">
                <font-awesome-icon :icon="['fas', 'times-circle']" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Recording notification -->
    <div v-if="isRecording" class="recording-notification">
      <div class="recording-indicator">
        <font-awesome-icon :icon="['fas', 'circle']" class="recording-icon pulse" />
        <span>Recording is in progress</span>
      </div>
      <p>You can stop recording using the browser's native controls</p>
    </div>
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
const captureAudio = ref(true)
let screenStream = null

const selectedFile = ref(null)
const router = useRouter()
const toast = useToast()
const showRecordModal = ref(false)
const searchValue = ref('')
const childRef = ref(null)
const profileMenuOpen = ref(false)

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

function toggleProfileMenu() {
  profileMenuOpen.value = !profileMenuOpen.value
}

const videoDisplay = ref(null)

function handleSearch() {
  if (videoDisplay.value) {
    videoDisplay.value.filterVideos()
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
    },
  )
}

async function startRecording() {
  try {
    showRecordModal.value = false
    
    const displayMediaOptions = {
      video: { 
        mediaSource: 'screen',
        frameRate: 30
      },
      audio: captureAudio.value
    }
    
    screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    
    const hasAudioTrack = screenStream.getAudioTracks().length > 0
    
    if (captureAudio.value && !hasAudioTrack) {
      toast.info('Audio capture was not permitted by the browser.', { position: 'top-right' })
    }
    
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
    
    const audioStatus = hasAudioTrack ? 'with audio' : 'without audio'
    toast.success(`Recording started ${audioStatus}!`, { position: 'top-right' })
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
      },
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
      },
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
:root {
  --color-primary: #100A42;
  --color-secondary: #424b6e;
  --color-accent: #120B48;
  --color-text: #333333;
  --color-text-light: #6c757d;
  --color-background: #f8f9fa;
  --color-white: #ffffff;
  --color-grey: #e0e0e0;
  --color-light-grey: #f2f4f8;
  --color-danger: #e74c3c;
  --shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  color: var(--color-text);
  font-family: var(--font-family);
}

/* Header styles */
.dashboard-header {
  background-color: white;
  box-shadow: var(--shadow-sm);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo-container h1 {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: 700;
  margin: 0;
}

/* Profile styles */
.profile-section {
  position: relative;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.profile-info:hover {
  background-color: var(--color-light-grey);
}

.avatar-icon {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.dropdown-icon {
  font-size: 0.8rem;
  color: var(--color-text-light);
  transition: transform 0.3s ease;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  width: 200px;
  overflow: hidden;
  z-index: 10;
  animation: fadeIn 0.2s ease-out;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: var(--color-light-grey);
}

.dropdown-item svg {
  color: var(--color-primary);
}

/* Main content styles */
.dashboard-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-welcome {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-text h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.welcome-text h2 svg,
.welcome-text p svg {
  color: var(--color-primary);
}

.welcome-text p {
  font-size: 1.1rem;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}

.divider {
  color: var(--color-text-light);
  font-weight: 500;
}

.upload-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  flex: 1;
}

.file-upload-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border: 2px dashed var(--color-grey);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.file-upload-label:hover {
  border-color: var(--color-primary);
  background-color: rgba(18, 11, 72, 0.05);
}

.file-upload-label input {
  display: none;
}

.file-upload-label svg {
  color: var(--color-primary);
  font-size: 1.2rem;
}

/* Search styles */
.search-section {
  margin-bottom: 2rem;
}

.search-container {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-light);
}

.search-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid var(--color-grey);
  border-radius: var(--radius-md);
  background-color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: var(--font-family);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(18, 11, 72, 0.1);
}

/* Video content styles */
.video-content {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.recent-files {
  margin-bottom: 1.5rem;
}

.recent-files h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.recent-files h3 svg {
  color: var(--color-primary);
}

.video-preview {
  margin-bottom: 2rem;
}

.video {
  width: 100%;
  max-height: 400px;
  border-radius: var(--radius-md);
  background-color: black;
  display: none;
}

/* Button styles */
.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  color:black;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  font-family: var(--font-family);
}

.btn-primary {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));

  box-shadow: 0 4px 15px rgba(18, 11, 72, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(18, 11, 72, 0.3);
}

.btn-secondary {
  background-color: var(--color-light-grey);
  color: var(--color-text);
}

.btn-secondary:hover {
  background-color: #e9ecf1;
  transform: translateY(-2px);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-disabled:hover {
  transform: none;
}

/* Modal styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-container {
  background-color: white;
  border-radius: var(--radius-lg);
  width: 500px;
  max-width: 95%;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: zoomIn 0.3s ease-out;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-grey);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-header h2 svg {
  color: var(--color-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--color-text-light);
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: var(--color-danger);
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.modal-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #000;
  border-radius: var(--radius-md);
  background-color: #f9f9f9;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: var(--font-family);
}

.modal-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: white;
  box-shadow: 0 0 0 3px rgba(18, 11, 72, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

/* Recording notification */
.recording-notification {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background-color: white;
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-md);
  z-index: 900;
  max-width: 300px;
  animation: slideIn 0.3s ease-out;
  border-left: 4px solid #e74c3c;
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.recording-icon {
  color: #e74c3c;
}

.recording-notification p {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.pulse {
  animation: pulse 1.5s infinite;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .dashboard-main {
    padding: 1.5rem 1rem;
  }
  
  .dashboard-welcome {
    padding: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .divider {
    align-self: center;
    margin: 0.5rem 0;
  }
  
  .upload-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .file-upload-label {
    width: 100%;
    justify-content: center;
  }
  
  .video-content {
    padding: 1.5rem;
  }
}

.audio-toggle-group {
  margin-top: 1.5rem;
}

.toggle-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.toggle-label span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border-radius: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
  background-color: #ccc;
 
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: #632d2d;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--color-primary);
}

input:focus + .toggle-slider {
  box-shadow: 0 0 1px var(--color-primary);
  background-color: #ccc;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
  background-color: #000;
}

.audio-note {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
