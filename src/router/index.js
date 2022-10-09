import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'staticNews',
      component: () => import('@/views/StaticNews.vue'),
    },
    {
        path: '/news/create',
        name: 'newsCreate',
        component: () => import('@/views/CreateNews.vue'),
        meta: {
            login: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            login: false,
        }
    },
    {
        path: '/user/create',
        name: 'userCreate',
        component: () => import('@/views/CreateUser.vue'),
        meta: {
            login: true
        }
    },
  ]
})

router.beforeEach((to, from, next) => {
    if(to.meta.login === false && store.state.login){
        next({name: 'staticNews'});
    }else{
        next();
    }
});

export default router
