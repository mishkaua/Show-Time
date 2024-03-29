import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminPanelView from '../views/AdminPanelView.vue'
import BookingStatsView from '../views/BookingStatsView.vue'
import AddConcertView from '../views/AddConcertView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanelView
    },
    {
      path: '/stats',
      name: 'stats',
      component: BookingStatsView
    },
    {
      path: '/concert',
      name: 'concert',
      component: AddConcertView
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
