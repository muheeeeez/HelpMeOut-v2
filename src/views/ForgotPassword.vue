<template>
  <div><NavigationBar></NavigationBar></div>
  <div class="hero">
    <div class="form-box">
      <div class="button-box">
        <div id="btn"></div>
        <button type="button" class="toggle-btn">Forgot Password</button>
      </div>

      <form class="input-group" id="login" @submit.prevent="resetPassword">
        <input
          type="email"
          class="input-field"
          placeholder="Email"
          required
          v-model="email"
        />
        <button type="submit" class="submit-btn">Send Verification</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useToast } from 'vue-toast-notification'
import NavigationBar from '@/components/NavigationBar.vue'
const email = ref('')
const router = useRouter()
const toast = useToast()
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

const resetPassword = async () => {
  try {
    await sendPasswordResetEmail(auth, email.value)
    toast.success('Reset Password Verification Sent', {
      position: 'top-right',
    })
    router.push('/login')
  } catch (error) {
    showFirebaseError(error)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
.hero {
  height: 100%;
  width: 100%;
}
.form-box {
  width: 380px;
  height: 480px;
  position: relative;
  margin: 6% auto;
  background: #fff;
  padding: 5px;
  overflow: hidden;
}
.button-box {
  width: 220px;
  margin: 35px;
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
  display: flex;
  text-align: center;
  margin: 0 auto;
  color: #fff;
}
#btn {
  top: 0;
  left: 0;
  position: absolute;
  width: 220px;
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
  border: none;
  border-bottom: 1px solid #999;
  outline: none;
  font-family: "Poppins", sans-serif;
  background: transparent;
}
.submit-btn {
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  background-color: #1b233d;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 30px;
}
</style>
