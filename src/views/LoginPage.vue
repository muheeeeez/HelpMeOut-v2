<!-- LoginRegister.vue -->
<template>
  <div class="login-page-container">
    <header class="auth-header">
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
    </header>

    <main class="auth-main">
      <div class="auth-card">
        <div class="auth-welcome">
          <h2>Welcome Back!</h2>
          <p>Record and share screen videos with ease</p>
        </div>

        <div class="auth-tabs">
          <button
            @click="activeTab = 'login'"
            :class="{ active: activeTab === 'login' }"
            class="tab-button"
          >
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
            Login
          </button>
          <button
            @click="activeTab = 'register'"
            :class="{ active: activeTab === 'register' }"
            class="tab-button"
          >
            <font-awesome-icon :icon="['fas', 'user-plus']" />
            Register
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="activeTab === 'login'" @submit.prevent="loginUser" class="auth-form">
          <div class="form-group">
            <label for="login-email">Email Address</label>
            <div class="input-container">
              <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
              <input
                id="login-email"
                type="email"
                v-model="loginEmail"
                placeholder="Enter your email"
                required
                :class="{ 'error': loginEmailError }"
                @input="validateLoginEmail"
              />
            </div>
            <p v-if="loginEmailError" class="error-message">
              <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
              {{ loginEmailError }}
            </p>
          </div>

          <div class="form-group">
            <label for="login-password">Password</label>
            <div class="input-container">
              <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
              <input
                id="login-password"
                :type="showPassword ? 'text' : 'password'"
                v-model="loginPassword"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <font-awesome-icon
                  :icon="['fas', showPassword ? 'eye-slash' : 'eye']"
                />
              </button>
            </div>
          </div>

          <div class="form-actions">
            <div class="remember-me">
              <input
                type="checkbox"
                id="remember"
                v-model="rememberMe"
              />
              <label for="remember">Remember me</label>
            </div>
            <a @click="() => router.push('/forgot-pasword')" class="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            class="auth-button"
          
          >
            <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" class="spinner" />
            <font-awesome-icon v-else :icon="['fas', 'sign-in-alt']" />
            <span>Login</span>
          </button>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="registerUser" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <div class="input-container">
                <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
                <input
                  id="first-name"
                  type="text"
                  v-model="firstName"
                  placeholder="First Name"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <div class="input-container">
                <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
                <input
                  id="last-name"
                  type="text"
                  v-model="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="register-email">Email Address</label>
            <div class="input-container">
              <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
              <input
                id="register-email"
                type="email"
                v-model="registerEmail"
                placeholder="Enter your email"
                required
                :class="{ 'error': registerEmailError }"
                @input="validateRegisterEmail"
              />
            </div>
            <p v-if="registerEmailError" class="error-message">
              <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
              {{ registerEmailError }}
            </p>
          </div>

          <div class="form-group">
            <label for="register-password">Password</label>
            <div class="input-container">
              <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
              <input
                id="register-password"
                :type="showPassword ? 'text' : 'password'"
                v-model="registerPassword"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <font-awesome-icon
                  :icon="['fas', showPassword ? 'eye-slash' : 'eye']"
                />
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="register-confirm">Confirm Password</label>
            <div class="input-container">
              <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
              <input
                id="register-confirm"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Confirm your password"
                required
                :class="{ 'error': passwordsDoNotMatch }"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <font-awesome-icon
                  :icon="['fas', showConfirmPassword ? 'eye-slash' : 'eye']"
                />
              </button>
            </div>
            <p v-if="passwordsDoNotMatch" class="error-message">
              <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
              Passwords do not match
            </p>
          </div>

          <button
            type="submit"
            class="auth-button"
            :disabled="loading || registerEmailError || passwordsDoNotMatch"
          >
            <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" class="spinner" />
            <font-awesome-icon v-else :icon="['fas', 'user-plus']" />
            <span>Create Account</span>
          </button>
        </form>

        <!-- <div class="auth-separator">
          <span>OR</span>
        </div> -->

        <!-- <div class="social-login">
          <button class="social-button google">
            <font-awesome-icon :icon="['fab', 'google']" />
            <span>Continue with Google</span>
          </button>
          <button class="social-button facebook">
            <font-awesome-icon :icon="['fab', 'facebook']" />
            <span>Continue with Facebook</span>
          </button>
        </div> -->
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Toast and router
const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

// Registration refs
const firstName = ref('')
const lastName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')

// Login refs
const loginEmail = ref('')
const loginPassword = ref('')

// UI toggles
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

// Active tab: 'login' or 'register'
const activeTab = ref('login')

// Error handling
const loginEmailError = ref('')
const registerEmailError = ref('')
const passwordsDoNotMatch = ref(false)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateLoginEmail() {
  if (!loginEmail.value.trim()) {
    loginEmailError.value = 'Email is required.'
  } else if (!emailRegex.test(loginEmail.value)) {
    loginEmailError.value = 'Please enter a valid email address.'
  } else {
    loginEmailError.value = ''
  }
}

function validateRegisterEmail() {
  if (!registerEmail.value.trim()) {
    registerEmailError.value = 'Email is required.'
  } else if (!emailRegex.test(registerEmail.value)) {
    registerEmailError.value = 'Please enter a valid email address.'
  } else {
    registerEmailError.value = ''
  }
}

// Show firebase errors with user-friendly messages
function showFirebaseError(error) {
  let message = ''
  switch (error.code) {
    case 'auth/invalid-email':
      message = 'Invalid email address. Please check and try again.'
      break
    case 'auth/email-already-in-use':
      message = 'Email is already in use. Please use a different email address.'
      break
    case 'auth/weak-password':
      message = 'Password is too weak. Please choose a stronger password.'
      break
    case 'auth/user-not-found':
      message = 'No account found with this email. Please register first.'
      break
    case 'auth/wrong-password':
      message = 'Incorrect password. Please try again.'
      break
    case 'auth/user-disabled':
      message = 'This account has been disabled. Please contact support.'
      break
    default:
      message = 'An unexpected error occurred. Please try again later.'
  }
  toast.error(message, { position: 'top-right' })
}

// Register user
const registerUser = async () => {
  loading.value = true
  try {
    if (!firstName.value.trim()) {
      toast.error('First Name is required.')
      loading.value = false
      return
    }
    if (!lastName.value.trim()) {
      toast.error('Last Name is required.')
      loading.value = false
      return
    }
    if (!registerEmail.value.trim()) {
      toast.error('Email is required.')
      loading.value = false
      return
    } else if (!emailRegex.test(registerEmail.value)) {
      toast.error('Please enter a valid email address.')
      loading.value = false
      return
    }
    if (!registerPassword.value.trim()) {
      toast.error('Password is required.')
      loading.value = false
      return
    }
    if (registerPassword.value !== confirmPassword.value) {
      passwordsDoNotMatch.value = true
      toast.error('Passwords do not match.')
      loading.value = false
      return
    } else {
      passwordsDoNotMatch.value = false
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerEmail.value,
      registerPassword.value
    )
    const user = userCredential.user

    // Create user record in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: registerEmail.value,
      createdAt: serverTimestamp(),
      videos: []
    })

    // Send verification email
    await sendEmailVerification(user)
    toast.success('Registration successful! Please check your email for verification.', {
      position: 'top-right'
    })

    // Switch to login tab
    activeTab.value = 'login'
    loading.value = false
  } catch (err) {
    loading.value = false
    showFirebaseError(err)
  }
}

// Login user
const loginUser = async () => {
  loading.value = true
  try {
    if (!loginEmail.value.trim()) {
      toast.error('Email is required.')
      loading.value = false
      return
    } else if (!emailRegex.test(loginEmail.value)) {
      toast.error('Please enter a valid email address.')
      loading.value = false
      return
    }
    if (!loginPassword.value.trim()) {
      toast.error('Password is required.')
      loading.value = false
      return
    }

    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    )
    const user = userCredential.user

    // Check if user’s email is verified
    if (!user.emailVerified) {
      toast.error('Please verify your email before logging in.', {
        position: 'top-right'
      })
      await auth.signOut()
      loading.value = false
      return
    }

    toast.success('Login successful!', {
      position: 'top-right'
    })
    router.push('/dashboard')
    loading.value = false
  } catch (err) {
    loading.value = false
    showFirebaseError(err)
  }
}

// If user is already logged in, redirect to dashboard
onMounted(async () => {
  await authStore.initializeAuth()
  if (authStore.user) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333333;
}

/* Header styles */
.auth-header {
  padding: 1.5rem 0;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  color: #100A42;
  font-weight: 700;
  margin: 0;
}

/* Main content styles */
.auth-main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
  min-height: calc(100vh - 5rem);
}

.auth-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  padding: 2.5rem;
  animation: fadeIn 0.5s ease-out;
}

.auth-welcome {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-welcome h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #120B48;
  margin-bottom: 0.5rem;
}

.auth-welcome p {
  color: #6c757d;
  font-size: 1rem;
}

/* Tabs */
.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f2f4f8;
}

.tab-button {
  flex: 1;
  padding: 1rem 0.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
}

.tab-button.active {
  color: #120B48;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #120B48;
  animation: slideIn 0.3s ease-out;
}

.tab-button:hover {
  color: #120B48;
}

/* Form styles */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333333;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9e9e9e;
}

.input-container input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input-container input:focus {
  outline: none;
  border-color: #120B48;
  box-shadow: 0 0 0 3px rgba(18, 11, 72, 0.1);
}

.input-container input::placeholder {
  color: #9e9e9e;
}

.input-container input.error {
  border-color: #e74c3c;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9e9e9e;
  cursor: pointer;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #120B48;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -0.25rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #120B48;
}

.remember-me label {
  font-size: 0.9rem;
  color: #6c757d;
  cursor: pointer;
}

.forgot-link {
  color: #120B48;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #424b6e;
  text-decoration: underline;
}

.auth-button {
  background: linear-gradient(to right, #120B48, #2D2A77);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 15px rgba(18, 11, 72, 0.2);
  font-family: inherit;
}

.auth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(18, 11, 72, 0.3);
  background: linear-gradient(to right, #1F1566, #37348C);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Separator */
.auth-separator {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.auth-separator::before,
.auth-separator::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #e0e0e0;
}

.auth-separator::before {
  left: 0;
}

.auth-separator::after {
  right: 0;
}

.auth-separator span {
  display: inline-block;
  padding: 0 1rem;
  background-color: white;
  position: relative;
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Social Login */
.social-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.social-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.social-button.google {
  color: #DB4437;
}

.social-button.google:hover {
  background-color: #fef8f7;
  border-color: #DB4437;
}

.social-button.facebook {
  color: #4267B2;
}

.social-button.facebook:hover {
  background-color: #f7f9fe;
  border-color: #4267B2;
}

/* Animations */
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

@keyframes slideIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .auth-welcome h2 {
    font-size: 1.75rem;
  }

  .auth-tabs {
    margin-bottom: 1.5rem;
  }

  .social-login {
    gap: 0.75rem;
  }
}
</style>
