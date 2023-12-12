import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/Account/Login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/Account/Error',
    name: 'error',
    component: () => import('../views/ErrorView.vue')
  },
  {
    path: '/Account/Password/Reset/Confirmed',
    name: 'resetPasswordConfirmed',
    component: () => import('../views/ResetPasswordConfirmedView.vue')
  },
  {
    path: '/Account/Locked',
    name: 'accountLocked',
    component: () => import('../views/LockedAccountView.vue')
  },
  {
    path: '/Account/Email/Confirmed',
    name: 'emailConfirmed',
    component: () => import('../views/EmailConfirmedView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
