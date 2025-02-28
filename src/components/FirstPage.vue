<template>
  <div class="container">
    <div class="left-container">
      <div class="text-left-container">
        <h1>Show Them Don't Just Tell</h1>
        <p>
          Help your friends and loved ones by creating and sending videos on how to get things done
          on a website
        </p>
      </div>
      <button @click="installApp()">Install HelpMeOut &rarr;</button>
    </div>
    <div class="boxes-photo">
      <div class="photo-container">
        <div class="photo-gallery">
          <div class="column">
            <transition name="slide-from-left">
              <div class="photo oldwoman-photo" v-if="showImage">
                <img src="../assets/images/oldwoman.jpg" alt="" />
              </div>
            </transition>

            <div class="photo man-photo">
              <transition name="slide-from-right">
                <img src="../assets/images/man.jpg" alt="" v-if="showImage" />
              </transition>
            </div>
          </div>
          <div class="photo woman-photo">
            <transition name="slide-from-top">
              <img src="../assets/images/woman.jpg" alt="" v-if="showImage" />
            </transition>
          </div>
        </div>
      </div>
      <div class="boxes">
        <div class="dot-box">
          <div class="dot" v-for="i in 144" :key="i"></div>
        </div>
        <div class="dot-box2">
          <div class="dot2" v-for="i in 143" :key="i"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const deferredPrompt = ref(null)
const showImage = ref(false)
onMounted(() => {
  showImage.value = true
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default install prompt
    e.preventDefault()
    // Save the event so we can trigger it later
    deferredPrompt.value = e
    console.log('beforeinstallprompt event captured.')
  })
})
function installApp() {
  if (deferredPrompt.value) {
    // Trigger the install prompt
    deferredPrompt.value.prompt()
    // Wait for the user's response to the prompt
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      // Clear the saved prompt since it can only be used once
      deferredPrompt.value = null
    })
  } else {
    console.log('Installation prompt is not available')
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
}
.container {
  max-width: 1440px;
  height: 777px;
  top: 174px;
  display: flex;
  /* border-top: px solid #e9e1e1; */
}
.left-container {
  max-width: 548px;
  height: 317px;
  margin: 48px;
  margin-left: 100px;
  margin-top: 230px;
}
.left-container button {
  width: 239px;
  height: 65px;
  border-radius: 8px;
  padding: 22px 24px 22px 24px;
  margin-top: 20px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.11px;
  align-items: center;
  background-color: #120b48;
  color: #fff;
}
.text-left-container {
  width: 548px;
  height: 254px;
  margin-bottom: 20px;
}
.text-left-container h1 {
  width: 468px;
  gap: 10px;
  font-size: 64px;
  line-height: 64px;
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  color: #141414;
}
.text-left-container p {
  font-size: 20px;
  line-height: 28px;
  font-family: 'Inter', sans-serif;
  color: #000000bf;
}
.boxes {
  z-index: -5;
}
.dot-box {
  width: 330px;
  height: 313.08px;
  margin-top: 107px;
  margin-left: 1058.5px;
  opacity: 30%;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.dot {
  width: 10.58px;
  height: 10.58px;
  border-radius: 50%;
  background-color: #100a42;
  margin: 7px;
  margin-left: 10px;
}
.dot-box2 {
  width: 330px;
  height: 313.08px;
  margin-top: 0px;
  margin-left: 501.5px;
  opacity: 50%;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.dot2 {
  width: 10.58px;
  height: 10.58px;
  border-radius: 50%;
  background-color: #baf6eb;
  margin: 7px;
  margin-left: 10px;
}
.photo-container {
  position: absolute;
  top: 220px;
  left: 1365px;
  padding: 40px 0;
  z-index: 1;
}
.photo-gallery {
  display: flex;
}
.column {
  display: flex;
  flex-direction: column;
}
.photo {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}
/* .oldwoman-photo {
  width: 311px;
  height: 214px;
  margin-top: 165px;
  border-radius: 8px;
} */
/* .man-photo {
} */
.woman-photo {
  margin-left: 45px;
  border-radius: 8px;
}
.slide-from-left-enter-active {
  transition: transform 0.8s ease-out;
}
.slide-from-left-enter {
  transform: translateX(-100%);
}

/* Animation for image sliding from the right */
.slide-from-right-enter-active {
  transition: transform 0.8s ease-out;
}
.slide-from-right-enter {
  transform: translateX(100%);
}

/* Animation for image sliding from the top */
.slide-from-top-enter-active {
  transition: transform 0.8s ease-out;
}
.slide-from-top-enter {
  transform: translateY(-100%);
}
@media screen and (min-width: 100px) and (max-width: 1300px) {
  .container {
    width: 100vw;
    height: 100%;
    margin-top: 60px;
    margin-bottom: 60px;
    margin-left: 25px;
  }
  .left-container {
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .text-left-container {
    width: 100%;
    height: 100%;
  }
  .text-left-container h1 {
    width: 100%;
  }
  .text-left-container p {
    width: 80%;
  }
  .boxes-photo {
    display: none;
  }
}
</style>
