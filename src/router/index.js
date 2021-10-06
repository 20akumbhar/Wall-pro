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
  {
    path: '/update-password',
    component: () => import(/* webpackChunkName: "update-password" */ '../views/Settings/UpdatePassword.vue'),
    meta: {
      requireAuth: true
    }
  },
  ...Users,
  ...wCategory,
  ...Wallpaper,
  ...Qoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "update-password" */ '../views/404.vue'),
    meta: {
      requireAuth: true
    }
  },
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
