module.exports = [
    {
        path: '/q/categories',
        component: () => import(/* webpackChunkName: "q-categories" */ '../views/Qoutes/Categories.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/q/category/:id',
        component: () => import(/* webpackChunkName: "q-category" */ '../views/Qoutes/Category.vue'),
        meta: {
            requireAuth: true
        }
    }
]