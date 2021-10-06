module.exports = [
    {
        path: '/quiz',
        component: () => import(/* webpackChunkName: "quiz" */ '../views/Quiz/Quiz.vue'),
        meta: {
            requireAuth: true
        }
    },
]