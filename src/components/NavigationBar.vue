<template>
  <header :class="{ 'scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-wrapper" @click="() => router.push('/')">
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
      
      <div class="mobile-menu-toggle" @click="toggleMenu">
        <div class="hamburger" :class="{ 'active': menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <nav>
        <transition name="fade">
          <ul class="nav-links" :class="{ 'menu-open': menuOpen }">
            <li>
              <a href="/#features" @click="menuOpen = false">
                <font-awesome-icon :icon="['fas', 'list-ul']" /> Features
              </a>
            </li>
            <li>
              <a href="/#how-it-works" @click="menuOpen = false">
                <font-awesome-icon :icon="['fas', 'question-circle']" /> How it Works
              </a>
            </li>
          </ul>
        </transition>
      </nav>
      
      <router-link to="/login" class="cta-button">
        <button class="btn btn-primary">
          <font-awesome-icon :icon="['fas', 'user-plus']" /> Get Started
        </button>
      </router-link>
    </div>
  </header>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)
const isScrolled = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function navigateToSignIn() {
  router.push({ path: '/getting-started' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
:root {
  --primary-color: #120b48;
  --accent-color: #424b6e;
  --text-primary: #141414;
  --max-width: 1400px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 0;
  margin: 0;
}

header.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.98);
}

.header-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: transparent;
}

.logo-wrapper:hover {
  transform: scale(1.05);
}

.logo-wrapper h1 {
  font-weight: 700;
  font-size: 24px;
  color: #120b48;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: transparent;
}

.logo {
  width: 35px;
  height: 35px;
  background-color: transparent;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
  background-color: transparent;
}

.nav-links li {
  background-color: transparent;
  margin: 0;
}

.nav-links li a {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #141414;
  text-decoration: none;
  padding: 5px 0;
  transition: all 0.3s ease;
  position: relative;
  background-color: transparent;
}

.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #120b48;
  transition: width 0.3s ease;
}

.nav-links li a:hover {
  color: #120b48;
}

.nav-links li a:hover::after {
  width: 100%;
}

.nav-links .icon {
  opacity: 0.7;
  transition: all 0.3s ease;
  background-color: transparent;
}

.nav-links li a:hover .icon {
  opacity: 1;
  transform: translateY(-2px);
}

.cta-button {
  text-decoration: none;
  background-color: transparent;
  margin: 0;
}

.cta-button .btn {
  background: linear-gradient(to right, #120b48, #424b6e);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(18, 11, 72, 0.1);
}

.cta-button .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(18, 11, 72, 0.2);
}

.cta-button .btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(18, 11, 72, 0.2);
}

.cta-button .btn .icon {
  background-color: transparent;
}

.mobile-menu-toggle {
  display: none;
  cursor: pointer;
  z-index: 1001;
  background-color: transparent;
  margin: 0;
}

.hamburger {
  width: 30px;
  height: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: transparent;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #120b48;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

nav {
  background-color: transparent;
  margin: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .header-container {
    padding: 15px;
  }
  
  .logo-wrapper h1 {
    font-size: 20px;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  nav {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .menu-open + nav {
    opacity: 1;
    pointer-events: all;
  }
  
  .nav-links {
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 70%;
    max-width: 300px;
    background-color: white;
    padding: 80px 20px 20px;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    gap: 20px;
  }
  
  .nav-links.menu-open {
    transform: translateX(0);
  }
  
  .nav-links li a {
    font-size: 18px;
    padding: 10px 0;
  }
  
  .cta-button {
    margin-left: auto;
  }
  
  .cta-button .btn {
    font-size: 14px;
    padding: 10px 16px;
  }
}

.nav-item i, .mobile-nav-item i {
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.nav-item:hover i, .mobile-nav-item:hover i {
  transform: translateY(-2px);
}

.get-started-btn i, .auth-link i {
  margin-right: 8px;
}

.menu-toggle i {
  font-size: 24px;
  color: #120b48;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }
  
  .menu-toggle:hover {
    background-color: rgba(18, 11, 72, 0.1);
  }
  
  .menu-toggle:active i {
    transform: scale(0.9);
  }
}
</style>
