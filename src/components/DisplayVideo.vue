<template>
  <hr />
  <div class="video-list-container">
    <div v-if="isLoading" class="loading">
      <p>Loading your videos...</p>
    </div>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
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
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  defineProps,
  computed,
  defineExpose,
} from 'vue'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { db, storage } from '../firebase'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  childValue: {
    type: String,
    default: '',
  },
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const userVideos = ref([])
const filteredVideos = ref([])
const error = ref('')
const isLoading = ref(true)
const formattedDurations = ref([])
const videoRefs = ref([])
let unsubscribeVideos = null

// Convert the parent's prop into a computed, so we can rely on reactivity
const searchQuery = computed(() => props.childValue)

onMounted(() => {
  if (authStore.user) {
    fetchVideos()
  }
})

watch(
  () => authStore.user,
  (newUser) => {
    if (newUser) {
      fetchVideos()
    } else {
      if (unsubscribeVideos) {
        unsubscribeVideos()
        unsubscribeVideos = null
      }
      userVideos.value = []
      filteredVideos.value = []
    }
  },
)

function fetchVideos() {
  const user = authStore.user
  if (!user) {
    error.value = 'User not authenticated.'
    isLoading.value = false
    return
  }
  const videosCollectionRef = collection(db, 'users', user.uid, 'videos')
  const videosQueryObj = query(videosCollectionRef, orderBy('uploadedAt', 'desc'))

  unsubscribeVideos = onSnapshot(
    videosQueryObj,
    async (querySnapshot) => {
      isLoading.value = true
      userVideos.value = []
      querySnapshot.forEach((docSnap) => {
        userVideos.value.push({ id: docSnap.id, ...docSnap.data() })
      })
      await validateVideos()
      filteredVideos.value = userVideos.value
      isLoading.value = false
    },
    (err) => {
      error.value = 'Failed to load videos.'
      toast.error('Failed to load videos: ' + err.message, { position: 'top-right' })
      isLoading.value = false
    },
  )
}

onBeforeUnmount(() => {
  if (unsubscribeVideos) {
    unsubscribeVideos()
  }
})

async function validateVideos() {
  const validVideos = []
  for (const video of userVideos.value) {
    try {
      await getDownloadURL(storageRef(storage, video.downloadURL))
      validVideos.push(video)
    } catch (e) {
      await deleteDoc(doc(db, 'users', authStore.user.uid, 'videos', video.id))
      console.log('Removed ghost video:', video.videoName)
      console.error(e)
    }
  }
  userVideos.value = validVideos
  filteredVideos.value = validVideos
}

function filterVideos() {
  if (!searchQuery.value) {
    filteredVideos.value = userVideos.value
  } else {
    const queryStr = searchQuery.value.toLowerCase()
    filteredVideos.value = userVideos.value.filter((video) =>
      video.videoName.toLowerCase().includes(queryStr),
    )
  }
}

function updateDuration(index) {
  nextTick(() => {
    const videoEl = videoRefs.value[index]
    if (videoEl) {
      formattedDurations.value[index] = formatTime(videoEl.duration)
    }
  })
}

function formatDate(timestamp) {
  if (timestamp && typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate()
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour12: false }
    return date.toLocaleDateString(undefined, options)
  }
  return ''
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' + secs : secs}`
}

async function copyToClipboard(video) {
  try {
    await navigator.clipboard.writeText(video.downloadURL)
    toast.info('Copied to clipboard')
  } catch (err) {
    toast.error('Copy Error ' + err.message, { position: 'top-right' })
  }
}

async function deleteVideo(video) {
  if (!confirm(`Are you sure you want to delete "${video.videoName}"?`)) return
  try {
    const user = authStore.user
    if (!user) {
      error.value = 'User not authenticated.'
      toast.error('User not authenticated.', { position: 'top-right' })
      return
    }
    const videoStorageRefPath = `videos/${user.uid}/${video.videoName}`
    const videoStorageReference = storageRef(storage, videoStorageRefPath)

    try {
      await deleteObject(videoStorageReference)
    } catch (err) {
      console.warn('Storage file missing, skipping...', err)
    }

    const videoDocRef = doc(db, 'users', user.uid, 'videos', video.id)
    await deleteDoc(videoDocRef)

    userVideos.value = userVideos.value.filter((v) => v.id !== video.id)
    filterVideos()
    toast.success(`"${video.videoName}" deleted successfully!`, { position: 'top-right' })
  } catch (err) {
    error.value = 'Failed to delete video.'
    toast.error('Failed to delete video: ' + err.message, { position: 'top-right' })
  }
}

function viewDetails(video) {
  router.push({
    name: 'ViewDetails',
    params: { id: video.id },
    state: { video },
  })
}
defineExpose({
  filterVideos,
  filteredVideos,
})
</script>

<style scoped>
hr {
  border: none;
  border-top: 1px solid #dfe1e5;
  margin-bottom: 20px;
}
.video-list-container {
  padding: 0 5%;
}
.loading,
.error,
.no-videos {
  text-align: center;
  margin-top: 20px;
  color: #555;
  font-size: 18px;
}
.videos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 20px;
}
.video-item {
  width: 550px;
  border: 1px solid #b6b3c6;
  border-radius: 16px;
  background-color: #f8fafc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-video {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 12px;
  object-fit: cover;
  background: #000;
}
.video-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.video-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px;
}
.uploaded-at {
  font-size: 14px;
  color: #888;
  margin: 0;
}
.info,
.more {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
.delete-button {
  margin-top: auto;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #f44336;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.2s;
}
.delete-button:hover {
  background-color: #d32f2f;
}
</style>
