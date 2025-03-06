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
        { path: 'password', name: 'Password', component: () => import('@/views/manager/Password.vue')},
        { path: 'admin', name: 'Admin', component: () => import('@/views/user-manage/Admin.vue')},
        { path: 'user', name: 'User', component: () => import('@/views/user-manage/User.vue')},
        { path: 'person', name: 'Person', component: () => import('@/views/user-manage/Person.vue')},
        { path: 'notice', name: 'Notice', component: () => import('@/views/manager/Notice.vue')},
        { path: 'category', name: 'Category', component: () => import('@/views/manager/Category.vue')},
        { path: 'supplier', name: 'SUPPLIER', component: () => import('@/views/part-manage/supplier.vue')},
        { path: 'part', name: 'PART', component: () => import('@/views/part-manage/part.vue')},
        { path: 'part-group', name: 'PART_GROUP', component: () => import('@/views/part-manage/partGroup.vue')},
        { path: 'product/list', name: 'PRODUCT_LIST', component: () => import('@/views/product-manage/product-list.vue')},
        { path: 'product/detail', name: 'PRODUCT_DETAIL', component: () => import('@/views/product-manage/product-detail.vue')},

        { path: 'basic/product-gz', name: 'PRODUCT_GZ', component: () => import('@/views/basic/product-gz.vue')},
        { path: 'basic/product-consist', name: 'PRODUCT_CONSIST', component: () => import('@/views/basic/product-consist.vue')},
        { path: 'basic/part-list', name: 'PART_LIST', component: () => import('@/views/basic/part-list.vue')},

        { path: 'dynamic/producing', name: 'PRODUCING', component: () => import('@/views/dynamic/producing.vue')},
        { path: 'dynamic/stock', name: 'STOCK', component: () => import('@/views/dynamic/stock.vue')},

        { path: 'month-plan/plan103', name: 'PLAN103', component: () => import('@/views/month-plan/plan103.vue')},
        { path: 'month-plan/gen-part-list', name: 'GEN_PART_LIST', component: () => import('@/views/month-plan/gen-part-list.vue')},
        { path: 'month-plan/gen-plan', name: 'GEN_PLAN', component: () => import('@/views/month-plan/gen-plan.vue')},

        { path: 'tools/load-excel', name: 'LOAD_EXCEL', component: () => import('@/views/tools/load-excel.vue')},
      ]
    },
    {path: '/login', name: 'Login', component: () => import('@/views/Login.vue')},
    {path: '/register', name: 'Register', component: () => import('@/views/Register.vue')}
  ]
})

export default router
