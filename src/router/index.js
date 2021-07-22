import { createRouter, createWebHistory } from 'vue-router'
import Qoutes from './Qoutes'
import wCategory from './wCategory'
import Wallpaper from './Wallpaper'
import Users from './Users'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'
const routes = [
  { path: '/index.html', redirect: '/' },
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      requireAuth: false
    }
  },
  ...Users,
  ...wCategory,
  ...Wallpaper,
  ...Qoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth);

  if (requireAuth && !await firebase.getCurrentUser()) {
    next('/login');
  } else if (!requireAuth && await firebase.getCurrentUser()) {
    next('/');
  } else {
    next();
  }
})


export default router
