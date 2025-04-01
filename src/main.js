import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

/* Import Font Awesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* Import Font Awesome component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* Import specific icons */
import { 
  faSignInAlt, faUserPlus, faEnvelope, faLock, faQuestionCircle,
  faCheckCircle, faUsers, faHome, faVideo, faListUl, faSearch,
  faPaperPlane, faCopy, faShareAlt, faCalendarAlt, faArrowLeft,
  faSpinner, faExclamationTriangle, faUpload, faCloudUploadAlt,
  faUserCircle, faFilm, faCircle, faTimes, faTimesCircle, faLockOpen,
  faInfoCircle, faTachometerAlt, faBars, faClosedCaptioning, faFileVideo,
  faLink, faEye, faEyeSlash, faExclamationCircle, faKey, faSignOutAlt, faChevronDown, faCog, faClock
} from '@fortawesome/free-solid-svg-icons'
import { 
  faFacebookF, faWhatsapp, faTelegramPlane 
} from '@fortawesome/free-brands-svg-icons'

/* Add icons to the library */
library.add(
  faSignInAlt, faUserPlus, faEnvelope, faLock, faQuestionCircle,
  faCheckCircle, faUsers, faHome, faVideo, faListUl, faSearch,
  faPaperPlane, faCopy, faShareAlt, faCalendarAlt, faArrowLeft,
  faSpinner, faExclamationTriangle, faUpload, faCloudUploadAlt,
  faUserCircle, faFilm, faCircle, faTimes, faTimesCircle, faLockOpen,
  faInfoCircle, faTachometerAlt, faBars, faClosedCaptioning, faFileVideo,
  faLink, faFacebookF, faWhatsapp, faTelegramPlane, faEye, faEyeSlash, faExclamationCircle, faKey, faSignOutAlt, faChevronDown, faCog, faClock
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally

const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
  app.mount('#app')
})
