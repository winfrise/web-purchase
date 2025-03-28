import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Manager',
      component: () => import('@/layout/Manager.vue'),
      redirect: '/home',
      children: [
        { path: 'home', name: 'Home', component: () => import('@/views/manager/Home.vue')},
    
        // 基础数据
        { path: 'basic/product-gz', name: 'PRODUCT_GZ', component: () => import('@/views/basic/product-gz.vue')},
        { path: 'basic/product-consist', name: 'PRODUCT_CONSIST', component: () => import('@/views/basic/product-consist.vue')},
        { path: 'basic/part-list', name: 'PART_LIST', component: () => import('@/views/basic/part-list.vue')},
        { path: 'basic/supplier', name: 'SUPPLIER', component: () => import('@/views/basic/supplier.vue')},

        // 动态数据
        { path: 'dynamic/producing', name: 'PRODUCING', component: () => import('@/views/dynamic/producing.vue')},
        { path: 'dynamic/stock', name: 'STOCK', component: () => import('@/views/dynamic/stock.vue')},
        { path: 'dynamic/arrived', name: 'ARRIVED', component: () => import('@/views/dynamic/arrived.vue')},

        // 计算分类路由
        { path: 'calc/plan103', name: 'PLAN103', component: () => import('@/views/calc/plan103.vue')},
        { path: 'calc/gen-part-need', name: 'GEN_PART_LIST', component: () => import('@/views/calc/gen-part-need.vue')},
        
        // 批量计算
        { path: 'calc-batch/gen-part-need', name: 'BATCH_GEN_PART_PLAN', component: () => import('@/views/calc-batch/gen-part-need.vue')},

        // 过滤产品
        { path: 'tools/filter-gz-product', name: 'FILTER_PRODUCT', component: () => import('@/views/tools/filter-gz-product.vue')},
        { path: 'tools/match-product-name', name: 'MATCH_PRODUCT_NAME', component: () => import('@/views/tools/match-product-name.vue')},
        { path: 'tools/load-excel', name: 'LOAD_EXCEL', component: () => import('@/views/tools/load-excel.vue')},

        // 物实监控
        { path: '/material-monitor/assem-bom', name: 'MATERIAL_MONITOR_ASSEM_BOM', component: () => import('@/views/material-monitor/assem-bom.vue')},
        { path: '/material-monitor/assem-relate', name: 'MATERIAL_MONITOR_ASSEM_RELATE', component: () => import('@/views/material-monitor/assem-relate.vue')},
        { path: '/material-monitor/stock', name: 'MATERIAL_MONITOR_STOCK', component: () => import('@/views/material-monitor/stock.vue')},
        { path: '/material-monitor/producing', name: 'MATERIAL_MONITOR_PRODUCING', component: () => import('@/views/material-monitor/producing.vue')},
        { path: '/material-monitor/arrived', name: 'MATERIAL_MONITOR_ARRIVED', component: () => import('@/views/material-monitor/arrived.vue')},
        { path: '/material-monitor/plan', name: 'MATERIAL_MONITOR_PLAN', component: () => import('@/views/material-monitor/plan.vue')},
        { path: '/material-monitor/result', name: 'MATERIAL_MONITOR_RESULT', component: () => import('@/views/material-monitor/result.vue')},
      ]
    }
  ]
})

export default router
