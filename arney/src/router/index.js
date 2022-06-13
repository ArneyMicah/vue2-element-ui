import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/users',
    },
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue'),
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('../views/Users.vue'),
            },
            {
                path: '/roles',
                name: 'roles',
                component: () => import('../views/Roles.vue'),
            },
            {
                path: '/rights',
                name: 'rights',
                component: () => import('../views/Rights.vue'),
            },
            {
                path: '/goods',
                name: 'goods',
                component: () => import('../views/Goods.vue'),
            },
            {
                path: '/add',
                name: 'add',
                component: () => import('../views/Add.vue'),
            },
            {
                path: '/categories',
                name: 'categories',
                component: () => import('../views/Categories.vue'),
            },
            {
                path: '/Orders',
                name: 'Orders',
                component: () => import('../views/Orders.vue'),
            },
            {
                path: '/params',
                name: 'params',
                component: () => import('../views/Params.vue'),
            },
            {
                path: '/reports',
                name: 'reports',
                component: () => import('../views/Reports.vue'),
            }
        ],
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if(sessionStorage.getItem("token")){
        next()
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next("/login")
        }
    }
})
export default router