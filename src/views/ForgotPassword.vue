<template>
  <div class="forgot-password-container">
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
        <div class="auth-card-content">
          <div class="auth-title">
            <h2>
              <font-awesome-icon :icon="['fas', 'key']" />
              Forgot Password
            </h2>
            <div class="auth-alert">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
              <p>Enter your email address and we'll send you a link to reset your password.</p>
            </div>
          </div>

          <form @submit.prevent="submitReset" class="auth-form">
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-container">
                <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  placeholder="Enter your email"
                  required
                  :class="{ 'error': emailError }"
                  @input="validateEmail"
                />
              </div>
              <p v-if="emailError" class="error-message">
                <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                {{ emailError }}
              </p>
            </div>

            <button 
              type="submit" 
              class="auth-button" 
              :disabled="loading"
            >
              <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" class="spinner" />
              <font-awesome-icon v-else :icon="['fas', 'paper-plane']" />
              <span>Send Reset Link</span>
            </button>
          </form>

          <div class="auth-footer">
            <p>
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
              <a @click="() => router.push('/login')">Back to Login</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useToast } from 'vue-toast-notification'

const email = ref('')
const loading = ref(false)
const emailError = ref('')
const router = useRouter()
const toast = useToast()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function showFirebaseError(error) {
  let message = ''
  switch (error.code) {
    case 'auth/invalid-email':
      message = 'Invalid email address. Please check and try again.'
      break
    case 'auth/user-not-found':
      message = 'No account found with this email. Please check the email or register first.'
      break
    default:
      message = 'An unexpected error occurred. Please try again later.'
  }
  toast.error(message, { position: 'top-right' })
}

function validateEmail() {
  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
  } else {
    emailError.value = ''
  }
}

async function submitReset() {
  if (emailError.value) return
  
  validateEmail()
  if (emailError.value) return
  
  loading.value = true
  try {
    await sendPasswordResetEmail(auth, email.value)
    toast.success('Password reset email sent! Please check your inbox.', {
      position: 'top-right',
    })
    router.push('/login')
  } catch (error) {
    showFirebaseError(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.forgot-password-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  max-width: 500px;
  animation: fadeIn 0.5s ease-out;
}

.auth-card-content {
  padding: 2.5rem;
}

.auth-title {
  margin-bottom: 2rem;
  text-align: center;
}

.auth-title h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #120B48;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.auth-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background-color: rgba(18, 11, 72, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: left;
  margin-top: 1.5rem;
}

.auth-alert svg {
  margin-top: 0.25rem;
  color: #120B48;
}

.auth-alert p {
  font-size: 0.95rem;
  color: #333333;
  line-height: 1.5;
}

/* Form styles */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
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
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(18, 11, 72, 0.2);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

/* Footer styles */
.auth-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.auth-footer p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.auth-footer a {
  color: #120B48;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.auth-footer a:hover {
  color: #424b6e;
  text-decoration: underline;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive styles */
@media (max-width: 576px) {
  .auth-card-content {
    padding: 2rem 1.5rem;
  }
  
  .auth-title h2 {
    font-size: 1.5rem;
  }
}
</style>
