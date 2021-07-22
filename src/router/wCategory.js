module.exports = [{
    path: '/categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Wallpapers/Categories.vue'),
    meta: {
        requireAuth: true
    }
},
{
    path: '/categories/new',
    component: () => import(/* webpackChunkName: "add-categories" */ '../views/Wallpapers/NewCategory.vue'),
    meta: {
        requireAuth: true
    }
},
{
    name: 'ViewCategory',
    path: '/categories/view/:categoryId',
    component: () => import(/* webpackChunkName: "view-category" */ '../views/Wallpapers/ViewCategory.vue'),
    meta: {
        requireAuth: true
    }
}
]