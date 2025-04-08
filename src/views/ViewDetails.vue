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
      <div class="transcript-section">
        <div class="transcript-header">
          <p class="transcript"><font-awesome-icon :icon="['fas', 'closed-captioning']" /> Transcript</p>
          <div class="transcript-controls">
            <select v-model="selectedLanguage" id="language" :disabled="isTranscribing">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="nl">Dutch</option>
            </select>
            
            <button 
              class="btn-primary transcript-btn" 
              @click="generateTranscript" 
              :disabled="isTranscribing"
              v-if="!transcriptionText && !isTranscribing"
            >
              <font-awesome-icon :icon="['fas', 'closed-captioning']" /> 
              Generate Transcript
            </button>
            
            <button 
              class="btn-secondary transcript-btn" 
              @click="regenerateTranscript" 
              :disabled="isTranscribing"
              v-if="transcriptionText && !isTranscribing"
            >
              <font-awesome-icon :icon="['fas', 'sync']" /> 
              Regenerate
            </button>
          </div>
        </div>
        
        <div class="transcript-content">
          <div v-if="isTranscribing" class="transcript-loading">
            <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" />
            <p>Generating transcript... This may take a few minutes.</p>
          </div>
          
          <div v-else-if="transcriptionError" class="transcript-error">
            <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
            <p>{{ transcriptionError }}</p>
          </div>
          
          <div v-else-if="transcriptionText" class="transcript-text">
            <p>{{ transcriptionText }}</p>
          </div>
          
          <div v-else class="transcript-empty">
            <font-awesome-icon :icon="['fas', 'file-alt']" />
            <p>No transcript available. Click the button above to generate one.</p>
          </div>
        </div>
      </div>
      <div class="send">
        <div class="send-item">
          <h4 class="section-title">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            Share via Email
          </h4>
          <div class="input-container">
            <input 
              type="email" 
              placeholder="Enter email of receiver" 
              v-model="recieverEmail" 
              class="styled-input email-input"
            />
            <button class="btn-primary email-button" @click="prepareEmail">
              <font-awesome-icon :icon="['fas', 'paper-plane']" /> 
              <a :href="mailtoLink">Send</a>
            </button>
          </div>
        </div>
        
        <div class="send-item">
          <h4 class="section-title">
            <font-awesome-icon :icon="['fas', 'link']" />
            Video Link
          </h4>
          <div class="input-container url-container">
            <input 
              type="text" 
              readonly 
              :value="VideoCopyUrl" 
              class="styled-input url-input"
              ref="urlInput"
            />
            <button class="btn-secondary copy-button" @click="copyToClipboard">
              <font-awesome-icon :icon="['fas', 'copy']" /> 
              Copy
            </button>
          </div>
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, db, storage } from '../firebase'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth'
import { config } from '../config'
import { AssemblyAI } from 'assemblyai'

const menuIsViewed = ref(false)
const userData = ref({})
let unsubscribeUserData = null
// Holds the shortened URL
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
const message = ref('')
const urlInput = ref(null)

// Transcription related states
const transcriptionText = ref('')
const isTranscribing = ref(false)
const selectedLanguage = ref('en')
const transcriptionError = ref('')

// Get AssemblyAI API key from config
const ASSEMBLY_API_KEY = config.ASSEMBLY_API_KEY

// Toggle menu view
function menuView() {
  menuIsViewed.value = !menuIsViewed.value
}

// Logout function
const logout = async () => {
  try {
    await auth.signOut()
    router.push('/login')
  } catch (err) {
    toast.error('Logout failed: ' + err.message, { position: 'top-right' })
  }
}

// Format timestamp to readable date
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

// Copy URL to clipboard (with debug logging)
const copyToClipboard = async () => {
  console.log('Copy button clicked. URL to copy:', VideoCopyUrl.value)
  try {
    if (urlInput.value) {
      // Select the text in the input field
      urlInput.value.select();
      urlInput.value.setSelectionRange(0, 99999); // For mobile devices
    }
    
    await navigator.clipboard.writeText(VideoCopyUrl.value)
    toast.success('Link copied to clipboard!', { 
      position: 'top-right',
      duration: 2000
    })
  } catch (err) {
    toast.error('Copy Error: ' + err.message, { position: 'top-right' })
  }
}

// Helper function to shorten a URL using CleanURI API
const shortenUrl = async (longUrl) => {
  try {
    // Use TinyURL's API which doesn't have CORS issues
    const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl.trim())}`;
    
    // Fetch the shortened URL
    const response = await fetch(tinyUrlApi);
    
    if (!response.ok) {
      console.error(`TinyURL API error: ${response.status}`);
      return longUrl; // fallback to original URL
    }
    
    const shortUrl = await response.text();
    return shortUrl || longUrl;
  } catch (error) {
    console.error('Error in shortenUrl:', error)
    return longUrl
  }
}

// Save shortened URL to Firebase
const saveShortUrlToFirebase = async (videoId, shortUrl) => {
  try {
    if (!authStore.user || !videoId || !shortUrl) return;
    
    const videoDocRef = doc(db, 'users', authStore.user.uid, 'videos', videoId);
    await updateDoc(videoDocRef, {
      shortUrl: shortUrl
    });
    
    console.log('Shortened URL saved to Firebase');
  } catch (err) {
    console.error('Error saving short URL to Firebase:', err);
  }
}

// Function to force regeneration of transcript
function regenerateTranscript() {
  console.log('Forcing transcript regeneration with language:', selectedLanguage.value);
  // Force clearing all transcript data
  transcriptionText.value = '';
  transcriptionError.value = '';
  
  // Also clear the transcript from the video object to prevent reusing it
  if (video.value) {
    delete video.value.transcript;
    delete video.value.transcriptLanguage;
  }
  
  // Now generate a fresh transcript
  generateTranscript();
}

// Function to generate transcript of the video
async function generateTranscript() {
  console.log('Generate transcript called with API key:', config.ASSEMBLY_API_KEY);
  console.log('Video information:', video.value);
  console.log('Selected language:', selectedLanguage.value);

  if (!video.value || !video.value.downloadURL) {
    transcriptionError.value = 'No video available for transcription';
    return;
  }
  
  if (!config.ASSEMBLY_API_KEY) {
    transcriptionError.value = 'API key not configured. Please set up your AssemblyAI API key in the config file.';
    toast.error('Transcription API key not configured', { position: 'top-right' });
    return;
  }

  try {
    // Only use existing transcript if we're not forcing regeneration
    // We only use it if there's no text already loaded AND the languages match
    if (!transcriptionText.value && 
        video.value.transcript && 
        video.value.transcriptLanguage === selectedLanguage.value) {
      console.log('Using existing transcript:', video.value.transcript);
      transcriptionText.value = video.value.transcript;
      return;
    }

    isTranscribing.value = true;
    transcriptionError.value = '';
    toast.info('Starting transcription process...', { position: 'top-right' });
    
    // Ensure we have a direct download URL for the video
    let videoUrl = video.value.downloadURL;
    
    // If the URL is a Firebase storage path rather than a direct download URL
    if (videoUrl.startsWith('videos/')) {
      console.log('Converting Firebase storage path to direct URL');
      try {
        videoUrl = await getDownloadURL(storageRef(storage, video.value.downloadURL));
        console.log('Converted URL:', videoUrl);
      } catch (urlErr) {
        console.error('Error getting download URL:', urlErr);
        throw new Error('Could not get a direct download URL for the video');
      }
    }
    
    console.log('Submitting transcription request with URL:', videoUrl);
    
    // Initialize the AssemblyAI client
    const client = new AssemblyAI({
      apiKey: config.ASSEMBLY_API_KEY
    });
    
    // Set up transcription parameters
    const params = {
      audio: videoUrl,
      language_code: selectedLanguage.value
    };
    
    // Start the transcription
    const transcript = await client.transcripts.transcribe(params);
    
    // Check for errors
    if (transcript.status === 'error') {
      throw new Error(`Transcription error: ${transcript.error}`);
    }
    
    // Get the transcription text
    if (transcript.text) {
      console.log('Final transcript text:', transcript.text);
      transcriptionText.value = transcript.text;
      
      // Save to Firebase
      if (authStore.user && video.value.id) {
        console.log('Saving transcript to Firebase');
        const videoDocRef = doc(db, 'users', authStore.user.uid, 'videos', video.value.id);
        await updateDoc(videoDocRef, {
          transcript: transcript.text,
          transcriptLanguage: selectedLanguage.value
        });
        
        // Update local video object
        video.value.transcript = transcript.text;
        video.value.transcriptLanguage = selectedLanguage.value;
        
        toast.success('Transcription completed and saved!', { position: 'top-right' });
        console.log('Transcript saved successfully');
      }
    } else {
      throw new Error('No transcript text was generated');
    }
  } catch (err) {
    console.error('Transcription error details:', err);
    transcriptionError.value = err.message;
    toast.error(`Transcription failed: ${err.message}`, { position: 'top-right' });
  } finally {
    isTranscribing.value = false;
  }
}

// Watch for language changes to regenerate transcript
watch(selectedLanguage, (newLanguage) => {
  // If language changed, always regenerate transcript
  if (video.value && video.value.transcriptLanguage !== newLanguage) {
    // Clear existing transcript to force regeneration
    if (video.value.transcript) {
      console.log('Language changed, regenerating transcript');
      transcriptionText.value = '';
      transcriptionError.value = '';
      generateTranscript();
    }
  }
})

// Fetch video details and update sharing URLs
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
    
    // Check if the video already has a shortened URL
    if (passedVideo.shortUrl) {
      console.log('Using existing shortened URL from passed video');
      VideoCopyUrl.value = passedVideo.shortUrl;
    } else {
      // Generate and save a new shortened URL
      const shortUrl = await shortenUrl(passedVideo.downloadURL);
      VideoCopyUrl.value = shortUrl;
      
      // Save the short URL to Firebase
      await saveShortUrlToFirebase(passedVideo.id, shortUrl);
    }
    
    isLoading.value = false
  } else {
    try {
      const videoDocRef = doc(db, 'users', authStore.user.uid, 'videos', videoId)
      const videoSnap = await getDoc(videoDocRef)
      
      if (videoSnap.exists()) {
        const videoData = videoSnap.data()
        video.value = { id: videoSnap.id, ...videoData }
        
        // Check if shortened URL already exists in Firebase
        if (videoData.shortUrl) {
          console.log('Using existing shortened URL from database');
          VideoCopyUrl.value = videoData.shortUrl;
        } else {
          // Get the Firebase Storage download URL
          const firebaseUrl = await getDownloadURL(storageRef(storage, video.value.downloadURL));
          // Generate a new shortened URL
          const shortUrl = await shortenUrl(firebaseUrl);
          VideoCopyUrl.value = shortUrl;
          
          // Save the short URL to Firebase
          await saveShortUrlToFirebase(videoId, shortUrl);
        }
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

  // Update sharing messages and URLs based on the shortened URL
  message.value = `Video from ${userData.value.firstName}: ${VideoCopyUrl.value}`
  whatsappUrl.value = `https://wa.me/?text=${encodeURIComponent(message.value)}`
  telegramUrl.value = `https://t.me/share/url?url=${encodeURIComponent(VideoCopyUrl.value)}&text=${encodeURIComponent(message.value)}`

  // After setting video.value and before ending isLoading
  if (video.value && video.value.transcript) {
    transcriptionText.value = video.value.transcript
    selectedLanguage.value = video.value.transcriptLanguage || 'en'
  }
}

// Prepare mailto link for sending email
const prepareEmail = () => {
  mailtoLink.value = `mailto:${recieverEmail.value}?subject=Video%20from%20${userData.value.firstName}&body=Here%20is%20the%20video%20link:%20${VideoCopyUrl.value}`
  recieverEmail.value = ''
}

// Go back function
const goBack = () => {
  router.back()
}

// On component mount, fetch video details and subscribe to user data
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

// Clean up listener on component unmount
onBeforeUnmount(() => {
  if (unsubscribeUserData) unsubscribeUserData()
})
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
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.send-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-container {
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.copy-button {
  white-space: nowrap;
  padding: 14px 20px;
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(to right, #e9ecf1, #f5f7fa);
  color: #333;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: linear-gradient(to right, #dde2e8, #e9ecf1);
  transform: translateY(-2px);
}

.email-button {
  white-space: nowrap;
  padding: 14px 20px;
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
  to {
    transform: translateX(-50%) rotate(360deg);
  }
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

  .btn-primary,
  .btn-secondary {
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

.breadcrumb i,
.video-name i,
.transcript i,
.share p i,
.upload-date i {
  margin-right: 8px;
  color: #120b48;
}

.btn-primary i,
.btn-secondary i,
.btn-tertiary i {
  margin-right: 8px;
}

/* New styled input containers */
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #120b48;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.styled-input {
  flex: 1;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  transition: all 0.3s ease;
  color: #333;
  background-color: #fff;
}

.styled-input:focus {
  outline: none;
  border-color: #120b48;
  box-shadow: 0 0 0 3px rgba(18, 11, 72, 0.1);
}

.styled-input::placeholder {
  color: #999;
}

.styled-input:read-only {
  background-color: #f8f9fc;
  cursor: default;
}

.url-container {
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.url-input {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #f5f7fa;
  border: 1px solid #e2e8f0;
}

.email-input {
  min-width: 250px;
}

.email-button {
  white-space: nowrap;
  padding: 14px 20px;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .send {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .send-item {
    flex: 1;
  }
}

.transcript-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.transcript-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.transcript-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.transcript-btn {
  white-space: nowrap;
}

.transcript-content {
  background-color: #f8f9fc;
  border-radius: 8px;
  padding: 20px;
  min-height: 120px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
}

.transcript-text {
  white-space: pre-wrap;
  font-size: 15px;
  line-height: 1.6;
  color: #333;
}

.transcript-loading, 
.transcript-error, 
.transcript-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 120px;
  text-align: center;
  color: #666;
}

.transcript-loading svg,
.transcript-error svg,
.transcript-empty svg {
  font-size: 24px;
  color: #120b48;
}

.transcript-error {
  color: #e74c3c;
}

.transcript-error svg {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .transcript-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .transcript-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
