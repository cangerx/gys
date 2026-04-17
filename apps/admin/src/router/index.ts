import { createRouter, createWebHistory } from 'vue-router'
import { adminRoutes } from './modules/admin'

const router = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
})

export default router
