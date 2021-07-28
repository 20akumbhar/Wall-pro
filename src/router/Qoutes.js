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
    },
    {
        path: '/q/qoutes',
        component: () => import(/* webpackChunkName: "q-qoutes" */ '../views/Qoutes/Qoutes.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/q/qoutes/:id',
        component: () => import(/* webpackChunkName: "q-qoutes" */ '../views/Qoutes/ViewQoute.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/q/qoutes/new',
        component: () => import(/* webpackChunkName: "q-qoutes" */ '../views/Qoutes/NewQoutes.vue'),
        meta: {
            requireAuth: true
        }
    }
]