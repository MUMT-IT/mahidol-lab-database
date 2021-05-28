import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Main',
        meta: {
            title: 'Main Page',
            requiresAuth: true,
        },
        component: () => import('../views/Main.vue')
    },
    {
        path: '/form',
        name: 'Form',
        meta: {
            title: 'Form Page',
        },
        component: () => import('../views/Form.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
