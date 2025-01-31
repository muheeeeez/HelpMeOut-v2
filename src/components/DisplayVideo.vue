<!-- src/components/VideoList.vue -->
<template>
  <hr />
  <div class="video-list-container">
    <!-- Search Bar -->
    <!-- <div class="search-bar">
      <input
        type="text"
        placeholder="Search Videos..."
        v-model="searchQuery"
        @input="filterVideos"
      />
    </div> -->
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading">
      <p>Loading your videos...</p>
    </div>
    <!-- Error Message -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <!-- No Videos Message -->
    <div v-if="!isLoading && filteredVideos.length === 0" class="no-videos">
      <p>You have not uploaded any videos yet.</p>
    </div>
    <div v-else class="videos-grid">
      <div v-for="(video, index) in filteredVideos" :key="video.id" class="video-item">
        <video
          @loadedmetadata="updateDuration(index)"
          controls
          :src="video.downloadURL"
          type="video/webm"
          class="card-video"
        />
        <div class="video-info">
          <div>
            <h2 class="video-name">{{ video.videoName }}</h2>
            <!-- <span>{{ formattedDurations[index] }}</span> -->
            <p class="uploaded-at">{{ formatDate(video.uploadedAt) }}</p>
          </div>
          <div>
            <img
              src="../assets/images/link.png"
              alt="copy"
              class="info"
              @click="copyToClipboard(video)"
            />
            <img
              @click="viewDetails(video)"
              src="../assets/images/more.png"
              alt="More Information"
              class="more"
            />
          </div>
        </div>

        <button @click="deleteVideo(video)" class="delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { db, storage } from '../firebase' // Adjust the path as needed
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification' // Ensure vue-toast-notification is installed

// Import the auth store
const authStore = useAuthStore()

// Reactive Variables
const userVideos = ref([])
const filteredVideos = ref([])
const error = ref('')
const searchQuery = ref('')
const formattedDurations = ref([])
const videoRefs = ref([])
const router = useRouter()
const toast = useToast()

let unsubscribeVideos = null

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

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' + secs : secs}`
}

const updateDuration = (index) => {
  nextTick(() => {
    const video = videoRefs.value[index]
    if (video) {
      formattedDurations.value[index] = formatTime(video.duration)
    }
  })
}

const copyToClipboard = async (video) => {
  try {
    await navigator.clipboard.writeText(video.downloadURL)
    toast.info('Copied to clipboard')
  } catch (err) {
    toast.error('Copy Error ' + err.message, {
      position: 'top-right',
    })
  }
}

// Fetch and validate user videos from Firestore
onMounted(() => {
  if (authStore.user) {
    fetchVideos()
  }
})

// Watch for changes in authStore.user to fetch videos when authenticated
watch(
  () => authStore.user,
  (newUser) => {
    if (newUser) {
      fetchVideos()
    } else {
      // If user logs out, clean up
      if (unsubscribeVideos) {
        unsubscribeVideos()
        unsubscribeVideos = null
      }
      userVideos.value = []
      filteredVideos.value = []
    }
  }
)

// Function to fetch videos
const fetchVideos = () => {
  const user = authStore.user
  if (!user) {
    error.value = 'User not authenticated.'
    return
  }

  const videosCollectionRef = collection(db, 'users', user.uid, 'videos')
  const videosQueryObj = query(videosCollectionRef, orderBy('uploadedAt', 'desc'))

  unsubscribeVideos = onSnapshot(
    videosQueryObj,
    async (querySnapshot) => {
      userVideos.value = []
      querySnapshot.forEach((docSnap) => {
        userVideos.value.push({ id: docSnap.id, ...docSnap.data() })
      })
      await validateVideos() // Check for ghost videos
      filteredVideos.value = userVideos.value
      console.log('Updated videos:', userVideos.value)
    },
    (err) => {
      console.error('Error fetching videos:', err)
      error.value = 'Failed to load videos.'
      toast.error('Failed to load videos: ' + err.message, { position: 'top-right' })
    },
  )
}

// Cleanup Firestore listener when component is unmounted
onBeforeUnmount(() => {
  if (unsubscribeVideos) {
    unsubscribeVideos()
  }
})

// Validate videos: Remove Firestore entries for missing files
const validateVideos = async () => {
  const validVideos = []

  for (const video of userVideos.value) {
    try {
      await getDownloadURL(storageRef(storage, video.downloadURL)) // Check if file exists
      validVideos.push(video)
    } catch (error) {
      console.warn(`Ghost video detected: ${video.videoName}, removing metadata...` + error)

      // Delete metadata from Firestore
      await deleteDoc(doc(db, 'users', authStore.user.uid, 'videos', video.id))
    }
  }

  userVideos.value = validVideos
  filteredVideos.value = validVideos
}

// Search and Filter Function
const filterVideos = () => {
  if (!searchQuery.value) {
    filteredVideos.value = userVideos.value
  } else {
    const queryStr = searchQuery.value.toLowerCase()
    filteredVideos.value = userVideos.value.filter((video) =>
      video.videoName.toLowerCase().includes(queryStr),
    )
  }
}

// Delete Video Function
const deleteVideo = async (video) => {
  if (!confirm(`Are you sure you want to delete "${video.videoName}"?`)) {
    return
  }

  try {
    const user = authStore.user
    if (!user) {
      error.value = 'User not authenticated.'
      toast.error('User not authenticated.', { position: 'top-right' })
      return
    }

    // Delete from Firebase Storage
    const videoStorageRefPath = `videos/${user.uid}/${video.videoName}`
    const videoStorageReference = storageRef(storage, videoStorageRefPath)

    try {
      await deleteObject(videoStorageReference)
      console.log('Video deleted from storage.')
    } catch (err) {
      console.warn('Storage file already missing, skipping...' + err)
    }

    // Delete from Firestore Subcollection
    const videoDocRef = doc(db, 'users', user.uid, 'videos', video.id)
    await deleteDoc(videoDocRef)
    console.log('Video metadata removed from Firestore.')

    // Update UI
    userVideos.value = userVideos.value.filter((v) => v.id !== video.id)
    filterVideos()
    toast.success(`"${video.videoName}" deleted successfully!`, { position: 'top-right' })
  } catch (err) {
    console.error('Error deleting video:', err)
    error.value = 'Failed to delete video.'
    toast.error('Failed to delete video: ' + err.message, { position: 'top-right' })
  }
}

// **New Method to Navigate to Detail Page with Video State**
const viewDetails = (video) => {
  router.push({
    name: 'ViewDetails', // Ensure this matches your route name
    params: { id: video.id },
    state: { video }, // Pass the entire video object
  })
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.video-list-container {
  display: flex;
  flex-wrap: nowrap; /* Prevents wrapping, enabling horizontal scroll */
  overflow-x: auto;
  justify-content: space-between;
  padding: 0 5%;
  align-items: center;
  width: 100vw;
  margin-top: 40px;
}
.videos-grid {
  display: flex;
  justify-content: center;
  gap: 74px;
  flex-wrap: wrap;
}
.video-item {
  width: 557px;
  height: 322px;
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
  width: 525px;
  height: 208px;
  border-radius: 10px;
  /* border: 1px solid #b6b3c6; */
  object-fit: cover;
}
.video-item h2 {
  font-size: 25px;
  font-weight: 500;
  line-height: 23.46px;
  margin-bottom: 10px;
}
.video-item p {
  font-size: 20px;
  font-weight: 400;
  line-height: 18.77px;
  color: #b6b3c6;
}
.video-info {
  display: flex;
  justify-content: space-around;
}
.more {
  cursor: pointer;
}
.info {
  margin-right: 20px;
  cursor: pointer;
}
</style>
