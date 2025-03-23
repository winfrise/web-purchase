<template>
  <div>
    <div style="height: 60px; background-color: #fff; display: flex; align-items: center; border-bottom: 1px solid #ddd">
      <div style="flex: 1">
        <div style="padding-left: 20px; display: flex; align-items: center">
          <img src="../assets/imgs/logo.png" alt="" style="width: 40px">
          <div style="font-weight: bold; font-size: 24px; margin-left: 5px; color: #F9B44C">采购管理系统</div>
        </div>
      </div>
      <div style="width: fit-content; padding-right: 10px; display: flex; align-items: center;">
        <img :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="" style="width: 40px; height: 40px">
      </div>
    </div>

    <div style="display: flex;  height: calc(100vh - 60px)">
      <div style="width: 200px; border-right: 1px solid #ddd; ">
        <el-menu
            router
            :unique-opened="true"
            :default-active="$route.path"
            :default-openeds="['/home', '2']"
        >
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>系统首页</span>
          </el-menu-item>


          <el-sub-menu index="2">
            <template #title>
              <el-icon><User /></el-icon>
              <span>基础数据</span>
            </template>

            <el-menu-item index="/basic/product-gz">
              <span>高正产品</span>
            </el-menu-item>

            <el-menu-item index="/basic/product-consist">
              <span>产品组成</span>
            </el-menu-item>

            <el-menu-item index="/basic/part-list">
              <span>零件列表</span>
            </el-menu-item>
            <el-menu-item index="/basic/supplier">
              <span>供应商对照</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="8">
            <template #title>
              <el-icon><User /></el-icon>
              <span>动态数据</span>
            </template>
          <el-menu-item index="/dynamic/stock">
              <span>材料库存</span>
            </el-menu-item>

            <el-menu-item index="/dynamic/producing">
              <span>在制拆分</span>
            </el-menu-item>

            <el-menu-item index="/dynamic/arrived">
              <span>到货列表</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><User /></el-icon>
              <span>计算</span>
            </template>

            <el-menu-item index="/calc/plan103">
              <span>豫北计划</span>
            </el-menu-item>

            <el-menu-item index="/calc/gen-part-need">
              <span>生成零件需求</span>
            </el-menu-item>

          </el-sub-menu>

          <el-sub-menu index="9">
            <template #title>
              <el-icon><User /></el-icon>
              <span>批量计算</span>
            </template>

            <el-menu-item index="/calc-batch/gen-part-need">
              <span>批量生成需求</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="10">
            <template #title>
              <el-icon><User /></el-icon>
              <span>实用工具</span>
            </template>

            <el-menu-item index="/tools/filter-gz-product">
              <span>过滤产品</span>
            </el-menu-item>

            <el-menu-item index="/tools/match-product-name">
              <span>匹配名称</span>
            </el-menu-item>

            <el-menu-item index="/tools/load-excel">
              <span>加载Excel</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="100">
            <template #title>
              <el-icon><User /></el-icon>
              <span>物料监控</span>
            </template>

            <el-menu-item index="/material-monitor/assem-bom">
              <span>总成BOM</span>
            </el-menu-item>

            <el-menu-item index="/material-monitor/assem-relate">
              <span>总成关系</span>
            </el-menu-item>

            <el-menu-item index="/material-monitor/stock">
              <span>仓库库存</span>
            </el-menu-item>

            <el-menu-item index="/material-monitor/producing">
              <span>在制库存</span>
            </el-menu-item>

            <el-menu-item index="/material-monitor/arrived">
              <span>到货数量</span>
            </el-menu-item>

            <el-menu-item index="/material-monitor/plan">
              <span>装配计划</span>
            </el-menu-item>

            <el-menu-item index="/material-monitor/result">
              <span>计算结果</span>
            </el-menu-item>


          </el-sub-menu>

        </el-menu>
      </div>

      <div style="flex: 1; background-color: #f8f8ff; padding: 10px">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive  } from 'vue'
import { useRoute } from 'vue-router'
import {User, UserFilled, Dish, Bowl, List} from "@element-plus/icons-vue";
const $route = useRoute()
console.log($route.path)


</script>

<style scoped>

</style>