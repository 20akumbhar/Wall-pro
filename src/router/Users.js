module.exports=[
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