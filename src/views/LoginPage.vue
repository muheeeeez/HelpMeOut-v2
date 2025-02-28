<!-- LoginRegister.vue -->
<template>
  <div>
    <navigation-bar></navigation-bar>
  </div>
  <div class="hero">
    <div class="form-box">
      <div class="button-box">
        <div id="btn"></div>
        <button type="button" class="toggle-btn" @click="login">Log In</button>
        <button type="button" class="toggle-btn" @click="register">Register</button>
      </div>
      <div class="title-container">
        <p>Join millions of others in sharing successful moves on HelpMeOut</p>
      </div>
      <form class="input-group" id="login" @submit.prevent="loginUser">
        <input type="email" class="input-field" placeholder="Email" required v-model="loginEmail" />
        <input
          type="password"
          class="input-field"
          placeholder="Password"
          required
          v-model="loginPassword"
        />
        <p class="forgot"><router-link to="/forgot-pasword">Forgot Password ?</router-link></p>
        <div class="checkbox-container">
          <input type="checkbox" class="check-box" /><span class="check-box-span"
            >Remember Password</span
          >
        </div>

        <button type="submit" class="submit-btn" :disabled="!isLoginFormValid">Log In</button>
      </form>
      <form class="input-group" id="register" @submit.prevent="registerUser">
        <input
          type="text"
          class="input-field"
          placeholder="First Name"
          required
          v-model="firstName"
        />
        <input
          type="text"
          class="input-field"
          placeholder="Last Name"
          required
          v-model="lastName"
        />
        <input
          type="email"
          class="input-field"
          placeholder="Email"
          required
          v-model="registerEmail"
        />
        <input
          type="password"
          class="input-field"
          placeholder="Password"
          required
          v-model="registerPassword"
        />
        <div>
          <input type="checkbox" class="check-box" v-model="registerCheckbox" /><span
            class="check-box-span"
            >I agree to terms & conditions</span
          >
        </div>

        <button type="submit" class="submit-btn" :disabled="!isRegisterFormValid">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
const toast = useToast()
const firstName = ref('')
const lastName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const loginEmail = ref('')
const loginPassword = ref('')
const router = useRouter()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const registerCheckbox = ref()

let x = null
let y = null
let z = null

function register() {
  x.style.left = '-400px'
  y.style.left = '50px'
  z.style.left = '110px'
}

function login() {
  x.style.left = '50px'
  y.style.left = '450px'
  z.style.left = '0'
}
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

const isRegisterFormValid = computed(() => {
  return (
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    registerEmail.value.trim() !== '' &&
    registerPassword.value.trim() !== '' &&
    registerCheckbox.value === true &&
    emailRegex.test(registerEmail.value)
  )
})

const registerUser = async () => {
  if (!firstName.value.trim()) {
    toast.error('First Name is required.')
  }
  if (!lastName.value.trim()) {
    toast.error('Last Name is required.')
  }
  if (!registerEmail.value.trim()) {
    toast.error('Email is required.')
  } else if (!emailRegex.test(registerEmail.value)) {
    toast.error('Please enter a valid email address.')
  }
  if (!registerPassword.value.trim()) {
    toast.error('Password is required.')
  }
  if (!registerCheckbox.value) {
    toast.error('Please agree to our terms and conditions.')
  }
  if (isRegisterFormValid.value) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail.value,
        registerPassword.value,
      )
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName.value,
        lastName: lastName.value,
        email: registerEmail.value,
        createdAt: serverTimestamp(),
        videos: [], // Initialize empty videos array
      })
      await sendEmailVerification(user)
      toast.success('Registration successful! Please check your email for verification.', {
        position: 'top-right',
      })
      login()
    } catch (err) {
      showFirebaseError(err)
    }
  }
}

const isLoginFormValid = computed(() => {
  return (
    loginEmail.value.trim() !== '' &&
    loginPassword.value.trim() !== '' &&
    emailRegex.test(loginEmail.value)
  )
})

const loginUser = async () => {
  if (!loginEmail.value.trim()) {
    toast.error('Email is required.')
  } else if (!emailRegex.test(loginEmail.value)) {
    toast.error('Please enter a valid email address.')
  }
  if (!loginPassword.value.trim()) {
    toast.error('Password is required.')
  }
  if (isLoginFormValid.value) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail.value,
        loginPassword.value,
      )
      const user = userCredential.user

      if (!user.emailVerified) {
        toast.error('Please verify your email before logging in.', {
          position: 'top-right',
        })
        await auth.signOut()
        return
      }

      router.push('/dashboard')
    } catch (err) {
      showFirebaseError(err)
    }
  }
}

onMounted(() => {
  x = document.getElementById('login')
  y = document.getElementById('register')
  z = document.getElementById('btn')
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
.hero {
  height: 100%;
  width: 100%;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../assets/images/woman.jpg); */
  /* background-position: center;
  background-size: cover; */
  /* position: absolute; */
}
.form-box {
  width: 380px;
  height: 580px;
  position: relative;
  margin: 6% auto;
  background: #fff;
  padding: 5px;
  overflow: hidden;
}
.button-box {
  width: 220px;
  margin: 35px auto;
  position: relative;
  box-shadow: 0 0 20px 9px #ff61241f;
  border-radius: 30px;
}
.toggle-btn {
  padding: 10px 30px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
  /* color: #fff; */
}
#btn {
  top: 0;
  left: 0;
  position: absolute;
  width: 110px;
  height: 100%;
  background: linear-gradient(to right, #ff105f, #ffad06);

  border-radius: 30px;
  transition: 0.5s;
}
.input-group {
  top: 180px;
  position: absolute;
  width: 280px;
  transition: 0.5s;
}
.input-field {
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #999;
  outline: none;
  background: transparent;
  font-family: 'Poppins', sans-serif;
}
.submit-btn {
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  /* background: linear-gradient(to right, #ff105f, #ffad06); */
  background-color: #1b233d;
  color: #fff;
  border: 0;
  outline: none;
  border-radius: 30px;
}
.submit-btn:disabled {
  background-color: #ccc;
  color: #666;
  border: 1px solid #999;
  cursor: not-allowed;
}
.check-box {
  margin: 30px 10px 30px 0;
}
.check-box-span {
  color: #777;
  font-size: 15px;
  bottom: 65px;
  position: absolute;
}
#login {
  left: 50px;
}
#register {
  left: 450px;
}
.title-container {
  width: 300px;
  gap: 8px;
  margin: 0 auto;
}
.title-container p {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 1%;
}
.title-container span {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 1%;
}
.forgot {
  font-size: 12px;
  /* text-align: center; */
  margin: 15px 0 auto;
}
.forgot a {
  text-decoration: none;
  color: #1b233d;
  text-decoration: underline;
}
.error-text {
  margin-top: 10px;
  color: #ff3b3b;
  font-size: 0.9rem;
}
</style>
