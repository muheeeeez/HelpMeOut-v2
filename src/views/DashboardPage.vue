<template>
  <div class="dashboard-container">
    <header class="menu-bar">
      <div class="top-logo" @click="() => router.push('/')">
        <!-- SVG Logo -->
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
        <button class="btn-primary" @click="openModal">Start Recording</button>

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
          You can stop recording using the browser's native controls.
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
          <video ref="webcamRef" class="webcam-overlay video" autoplay></video>
        </div>

        <!-- Search Input -->
      </section>
    </main>

    <!-- Pass 'searchValue' to child as 'childValue' -->
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
const webcamRef = ref(null)
let screenStream = null
let webcamStream = null

const router = useRouter()
const toast = useToast()
const showRecordModal = ref(false)

// The search string we pass to the child
const searchValue = ref('')

const childRef = ref(null)

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
    // This calls filterVideos() in the child
    childRef.value.filterVideos()
  }
}

async function logout() {
  try {
    await auth.signOut()
    router.push('/login')
  } catch (err) {
    toast.error('Logout failed: ' + err.message, { position: 'top-right' })
  }
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
    webcamStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 200, height: 150 },
      audio: false,
    })
    webcamStream.getTracks().forEach((track) => {
      track.addEventListener('ended', () => {
        stopRecording()
      })
    })
    if (webcamRef.value) {
      webcamRef.value.srcObject = webcamStream
    }
    const combinedStream = new MediaStream([
      ...screenStream.getTracks(),
      ...webcamStream.getVideoTracks(),
    ])
    recordedChunks.value = []
    mediaRecorder.value = new MediaRecorder(combinedStream)

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.value.push(event.data)
      }
    }

    mediaRecorder.value.onstop = () => {
      const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
      videoUrl.value = URL.createObjectURL(blob)
      videoRef.value.src = videoUrl.value
      uploadVideo(blob)
    }

    mediaRecorder.value.start()
    isRecording.value = true
    toast.success('Recording started!', { position: 'top-right' })
  } catch (err) {
    toast.error('Error starting recording: ' + err.message, { position: 'top-right' })
  }
}

function stopRecording() {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    screenStream?.getTracks().forEach((track) => track.stop())
    webcamStream?.getTracks().forEach((track) => track.stop())
    toast.success('Recording stopped!', { position: 'top-right' })
  }
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

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploadProgress.value = Math.floor(progress)
      },
      (error) => {
        uploadError.value = 'Upload failed: ' + error.message
        toast.error('Upload failed: ' + error.message, { position: 'top-right' })
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          videoUrl.value = downloadURL
          const videosCollectionRef = collection(db, 'users', user.uid, 'videos')
          await addDoc(videosCollectionRef, {
            videoName: fileName,
            downloadURL,
            uploadedAt: serverTimestamp(),
          })
          uploadSuccess.value = true
          uploadProgress.value = 0
          uploadError.value = ''
          toast.success('Video uploaded successfully!', { position: 'top-right' })
        } catch (err) {
          uploadError.value = 'Failed to update Firestore: ' + err.message
          toast.error('Failed to update Firestore: ' + err.message, { position: 'top-right' })
        }
      },
    )
  } catch (err) {
    uploadError.value = 'An error occurred during upload: ' + err.message
    toast.error('An error occurred: ' + err.message, { position: 'top-right' })
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
        toast.error('Failed to fetch user data: ' + err.message, { position: 'top-right' })
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
.dashboard-container {
  /* background-color: #f5f5f7; */
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
  line-height: 1.2;
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
}
.dropdown-menu ul li:hover {
  background-color: #f5f5f7;
}
.dropdown-menu a {
  color: #000;
  text-decoration: none;
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
}
.intro-section p {
  font-size: 18px;
  color: #555;
  margin-bottom: 16px;
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
  transition: 0.2s;
}
.btn-primary {
  background-color: #120b48;
  color: #fff;
}
.btn-primary:hover {
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
.webcam-overlay {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 180px;
  height: 120px;
  border: 2px solid #fff;
  border-radius: 6px;
  background: black;
  z-index: 10;
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
</style>
