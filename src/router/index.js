import { createRouter, createWebHistory } from 'vue-router'
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
    path:'/categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Wallpapers/Categories.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/categories/new',
    component: () => import(/* webpackChunkName: "add-categories" */ '../views/Wallpapers/NewCategory.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'ViewCategory',
    path:'/categories/view/:categoryId',
    component: () => import(/* webpackChunkName: "view-category" */ '../views/Wallpapers/ViewCategory.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/Users.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/users/new',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/NewUser.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/users/:userId',
    component: () => import(/* webpackChunkName: "view-user" */ '../views/Users/ViewUser.vue'),
    meta: {
      requireAuth: true
    }
  }
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
