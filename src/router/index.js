import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../modules/home/index.vue')
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router
