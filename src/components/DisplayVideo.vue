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
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
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
    // Check if the video already has a shortened URL stored
    if (video.shortUrl) {
      await navigator.clipboard.writeText(video.shortUrl);
      toast.success('Shortened URL copied to clipboard!', { position: 'top-right' });
      return;
    }
    
    // Use TinyURL's API which doesn't have CORS issues
    const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(video.downloadURL)}`;
    
    // Fetch the shortened URL
    const response = await fetch(tinyUrlApi);
    
    if (!response.ok) {
      throw new Error(`TinyURL API error: ${response.status}`);
    }
    
    const shortUrl = await response.text();
    
    if (shortUrl) {
      // Save the shortened URL to Firebase
      try {
        const user = authStore.user;
        if (user) {
          const videoDocRef = doc(db, 'users', user.uid, 'videos', video.id);
          await updateDoc(videoDocRef, {
            shortUrl: shortUrl
          });
          console.log('Shortened URL saved to Firebase');
        }
      } catch (err) {
        console.error('Error saving shortened URL:', err);
      }
      
      await navigator.clipboard.writeText(shortUrl);
      toast.success('Shortened URL copied to clipboard!', { position: 'top-right' });
    } else {
      throw new Error('Failed to get shortened URL');
    }
  } catch (err) {
    console.error('URL shortening error:', err);
    toast.error('URL shortening failed, copying original URL', { position: 'top-right' });
    
    // Fallback to copying the original URL
    try {
      await navigator.clipboard.writeText(video.downloadURL);
      toast.info('Original URL copied to clipboard', { position: 'top-right' });
    } catch (clipErr) {
      toast.error('Copy failed: ' + clipErr.message, { position: 'top-right' });
    }
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
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
hr {
  border: none;
  border-top: 1px solid #e0e3eb;
  margin-bottom: 30px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.6;
}
.video-list-container {
  padding: 0 5%;
  max-width: 1400px;
  margin: 0 auto;
}
.loading,
.error,
.no-videos {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px;
  color: #555;
  font-size: 18px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.loading {
  position: relative;
  padding-top: 50px;
}
.loading:before {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  border: 3px solid #e0e3eb;
  border-top-color: #120b48;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: translateX(-50%) rotate(360deg); }
}
.error {
  border-left: 4px solid #e74c3c;
  color: #e74c3c;
}
.no-videos {
  border-left: 4px solid #3498db;
  color: #555;
}
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 30px;
  margin-top: 20px;
  margin-bottom: 40px;
}
.video-item {
  width: 100%;
  border: none;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Poppins', sans-serif;
  transition: transform 0.3s, box-shadow 0.3s;
}
.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.card-video {
  width: 100%;
  height: 300px;
  border-radius: 0;
  margin-bottom: 0;
  object-fit: cover;
  background: #000;
  font-family: 'Poppins', sans-serif;
}
.video-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  font-family: 'Poppins', sans-serif;
}
.video-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #333;
  font-family: 'Poppins', sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.uploaded-at {
  font-size: 14px;
  color: #888;
  margin: 0;
  display: flex;
  align-items: center;
}
.uploaded-at:before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #120b48;
  border-radius: 50%;
  margin-right: 8px;
}
.info,
.more {
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 50%;
  background-color: #f8f9fc;
  transition: all 0.2s;
  margin-left: 8px;
}
.info:hover,
.more:hover {
  background-color: #e9ecf1;
  transform: scale(1.1);
}
.delete-button {
  width: 100%;
  margin-top: 0;
  padding: 12px;
  border: none;
  border-radius: 0;
  background-color: #fff;
  color: #e74c3c;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  border-top: 1px solid #f1f3f9;
}
.delete-button:hover {
  background-color: #fceeee;
}

@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
  .video-item {
    width: 100%;
  }
}
</style>
