import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ViewDetails from '@/views/ViewDetails.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/forgot-password',
      component: ForgotPassword,
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardPage.vue'),
    },
    {
      path: '/video/:id',
      name: 'ViewDetails',
      component: ViewDetails,
      props: true,
    },
  ],
})

export default router
