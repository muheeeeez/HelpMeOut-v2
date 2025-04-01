<template>
  <section class="hero-section">
    <div class="container hero-container">
      <div class="hero-content">
        <h1 class="hero-title">Show Them <span class="highlight">Don't Just Tell</span></h1>
        <p class="hero-description">
          Help your friends and loved ones by creating and sending videos on how to get things done
          on a website
        </p>
        <button class="btn btn-primary btn-lg install-btn" @click="installApp()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Install HelpMeOut
        </button>
      </div>
      
      <div class="hero-visuals">
        <div class="image-gallery">
          <div class="image-column">
            <transition name="slide-from-left" appear>
              <div class="image-card" v-if="showImage">
                <img src="../assets/images/oldwoman.jpg" alt="Elderly woman using a computer" class="rounded shadow" />
                <div class="image-card-glow"></div>
              </div>
            </transition>

            <transition name="slide-from-right" appear>
              <div class="image-card" v-if="showImage">
                <img src="../assets/images/man.jpg" alt="Man using a computer" class="rounded shadow" />
                <div class="image-card-glow"></div>
              </div>
            </transition>
          </div>
          
          <div class="image-column-right">
            <transition name="slide-from-top" appear>
              <div class="image-card" v-if="showImage">
                <img src="../assets/images/woman.jpg" alt="Woman using a computer" class="rounded shadow" />
                <div class="image-card-glow"></div>
              </div>
            </transition>
          </div>
        </div>
        
        <div class="dot-pattern dot-pattern-primary">
          <div class="dot" v-for="i in 144" :key="`primary-${i}`"></div>
        </div>
        
        <div class="dot-pattern dot-pattern-secondary">
          <div class="dot" v-for="i in 143" :key="`secondary-${i}`"></div>
        </div>
      </div>
    </div>
    
    <div class="curve-divider">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="var(--light-bg)" d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const deferredPrompt = ref(null)
const showImage = ref(false)
onMounted(() => {
  showImage.value = true
  window.addEventListener('beforeinstallprompt', (e) => {
 
    e.preventDefault()

    deferredPrompt.value = e
    console.log('beforeinstallprompt event captured.')
  })
})
function installApp() {
  if (deferredPrompt.value) {
  
    deferredPrompt.value.prompt()
    
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
    
      deferredPrompt.value = null
    })
  } else {
    console.log('Installation prompt is not available')
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  padding: 80px 0 120px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(186, 246, 235, 0.1) 100%);
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  padding: 20px;
  z-index: 2;
}

.hero-title {
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 24px;
  color: var(--text-primary);
  animation: fadeInUp 1s ease forwards;
}

.highlight {
  color: var(--primary-color);
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: rgba(186, 246, 235, 0.5);
  z-index: -1;
  transform: skewX(-10deg);
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 40px;
  max-width: 500px;
  animation: fadeInUp 1s ease 0.2s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.install-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 1.125rem;
  border-radius: var(--border-radius);
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease 0.4s forwards;
  opacity: 0;
  transform: translateY(20px);
  box-shadow: 0 6px 15px rgba(16, 10, 66, 0.2);
}

.install-btn:hover {
  background-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(16, 10, 66, 0.3);
}

.install-btn svg {
  transition: transform 0.3s ease;
}

.install-btn:hover svg {
  transform: translateY(3px);
}

.hero-visuals {
  flex: 1;
  position: relative;
  min-height: 500px;
  z-index: 1;
}

.image-gallery {
  display: flex;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.image-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-column-right {
  margin-top: 40px;
}

.image-card {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.image-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.image-card img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.image-card:hover img {
  transform: scale(1.05);
}

.image-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-card-glow {
  opacity: 1;
}

.dot-pattern {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  z-index: 0;
  opacity: 0.5;
  transition: all 0.5s ease;
}

.dot-pattern:hover {
  opacity: 0.7;
  transform: rotate(-3deg) scale(1.05);
}

.dot-pattern-primary {
  width: 330px;
  height: 313px;
  top: -50px;
  right: -100px;
}

.dot-pattern-secondary {
  width: 330px;
  height: 313px;
  bottom: -50px;
  left: 30%;
}

.dot-pattern-primary .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin: 7px;
}

.dot-pattern-secondary .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  margin: 7px;
}

.curve-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 1;
}

.curve-divider svg {
  width: 100%;
  height: 100%;
}

/* Slide animations */
.slide-from-left-enter-active,
.slide-from-right-enter-active,
.slide-from-top-enter-active {
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-from-left-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-from-right-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-from-top-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media screen and (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    max-width: 100%;
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-description {
    margin: 0 auto 40px;
  }
  
  .image-gallery {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .dot-pattern-primary {
    right: 0;
    top: 0;
  }
  
  .dot-pattern-secondary {
    left: 0;
    bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .hero-section {
    padding: 40px 0 100px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .image-gallery {
    max-width: 400px;
  }
  
  .dot-pattern {
    width: 200px;
    height: 200px;
  }
  
  .dot-pattern .dot {
    width: 8px;
    height: 8px;
    margin: 5px;
  }
}

@media screen and (max-width: 480px) {
  .image-column-right {
    display: none;
  }
  
  .install-btn {
    width: 100%;
    padding: 14px 20px;
  }
}
</style>
