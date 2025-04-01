<template>
  <transition name="fade-scale">
    <button 
      v-show="isVisible" 
      @click="scrollToTop" 
      class="scroll-to-top"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <span class="ripple"></span>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 300
let throttleTimeout = null
let buttonEl = null

function throttleScroll() {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      handleScroll()
      throttleTimeout = null
    }, 100)
  }
}

function handleScroll() {
  isVisible.value = window.pageYOffset > scrollThreshold
}

function scrollToTop() {
  // Add a ripple effect when clicked
  const ripple = buttonEl.querySelector('.ripple')
  ripple.classList.add('active')
  
  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  // Reset ripple after animation
  setTimeout(() => {
    ripple.classList.remove('active')
  }, 500)
}

onMounted(() => {
  window.addEventListener('scroll', throttleScroll)
  buttonEl = document.querySelector('.scroll-to-top')
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(16, 10, 66, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.scroll-to-top:hover {
  background-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(16, 10, 66, 0.4);
}

.scroll-to-top:active {
  transform: translateY(-2px);
}

.scroll-to-top svg {
  transition: transform 0.3s ease;
}

.scroll-to-top:hover svg {
  transform: translateY(-3px);
}

/* Ripple effect */
.ripple {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
  transition: all 0.5s ease-out;
}

.ripple.active {
  transform: scale(2);
  opacity: 0;
  animation: ripple-effect 0.5s ease-out;
}

@keyframes ripple-effect {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

/* Fade scale animation */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@media screen and (max-width: 768px) {
  .scroll-to-top {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
}

@media screen and (max-width: 480px) {
  .scroll-to-top {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
  }
  
  .scroll-to-top svg {
    width: 20px;
    height: 20px;
  }
}
</style> 