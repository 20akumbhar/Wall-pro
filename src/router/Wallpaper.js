module.exports = [
    {
        name: 'AllWallpaper',
        path: '/wallpapers',
        component: () => import(/* webpackChunkName: "wallpaper" */ '../views/Wallpapers/Wallpapers.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/wallpapers/new',
        component: () => import(/* webpackChunkName: "add-wallpaper" */ '../views/Wallpapers/NewWallpaper.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/wallpapers/popular',
        component: () => import(/* webpackChunkName: "popular-wallpaper" */ '../views/Wallpapers/Popular.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/wallpapers/premium',
        component: () => import(/* webpackChunkName: "premium-wallpaper" */ '../views/Wallpapers/Premium.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/wallpapers/view/:wallpaperId',
        component: () => import(/* webpackChunkName: "view-wallpaper" */ '../views/Wallpapers/ViewWallpaper.vue'),
        meta: {
            requireAuth: true
        }
    }
]