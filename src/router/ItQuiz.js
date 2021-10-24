module.exports = [
    {
        path: '/it-quiz/languages',
        component: () => import(/* webpackChunkName: "it-quiz-languages" */ '../views/ItQuiz/Languages.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/it-quiz/languages/add',
        component: () => import(/* webpackChunkName: "it-quiz-languages-add" */ '../views/ItQuiz/AddLanguage.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/it-quiz/languages/:languageId/levels',
        component: () => import(/* webpackChunkName: "it-quiz-languages-levels" */ '../views/ItQuiz/Levels.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/it-quiz/level/:levelId',
        component: () => import(/* webpackChunkName: "it-quiz-level" */ '../views/ItQuiz/Level.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/it-quiz/questions/:levelId',
        component: () => import(/* webpackChunkName: "it-quiz-questions" */ '../views/ItQuiz/Questions.vue'),
        meta: {
            requireAuth: true
        }
    },
]