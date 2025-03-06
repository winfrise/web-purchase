import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Manager',
      component: () => import('@/layout/Manager.vue'),
      redirect: '/home',
      children: [
        { path: 'home', name: 'Home', component: () => import('@/views/manager/Home.vue')},
    

        { path: 'basic/product-gz', name: 'PRODUCT_GZ', component: () => import('@/views/basic/product-gz.vue')},
        { path: 'basic/product-consist', name: 'PRODUCT_CONSIST', component: () => import('@/views/basic/product-consist.vue')},
        { path: 'basic/part-list', name: 'PART_LIST', component: () => import('@/views/basic/part-list.vue')},

        { path: 'dynamic/producing', name: 'PRODUCING', component: () => import('@/views/dynamic/producing.vue')},
        { path: 'dynamic/stock', name: 'STOCK', component: () => import('@/views/dynamic/stock.vue')},

        { path: 'calc/plan103', name: 'PLAN103', component: () => import('@/views/calc/plan103.vue')},
        { path: 'calc/gen-part-list', name: 'GEN_PART_LIST', component: () => import('@/views/calc/gen-part-list.vue')},
        { path: 'calc/gen-plan', name: 'GEN_PLAN', component: () => import('@/views/calcgen-plan.vue')},

        { path: 'tools/load-excel', name: 'LOAD_EXCEL', component: () => import('@/views/tools/load-excel.vue')},
      ]
    },
    {path: '/login', name: 'Login', component: () => import('@/views/Login.vue')},
    {path: '/register', name: 'Register', component: () => import('@/views/Register.vue')}
  ]
})

export default router
