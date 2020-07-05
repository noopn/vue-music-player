import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/components/recommend'
import Singer from '@/components/singer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Recommend
  },
  {
    path: '/singer',
    name: 'singer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Singer
  }
]

const router = new VueRouter({
  routes
})

export default router
