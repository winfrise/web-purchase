
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>结果</strong><br>
            
          </div>


          <div style="display: flex;">
              <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
          </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px; ">
      <el-table  :data="result.data" border>
        <el-table-column type="index" label="序号" />
        <el-table-column label="总成" prop="assem" />
        <el-table-column label="供应商" prop="supplier" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="型号" prop="code" />
        <el-table-column label="规格、备注" prop="remark" />
        <el-table-column label="订单数量" prop="needCount" />
        <el-table-column label="库存数量" prop="stockCount" />

        <el-table-column label="生产在制" prop="producingCount" />
        <el-table-column label="来料数量" prop="arrivedCount" />
        <el-table-column label="尚欠数量" prop="oweCount" />

        <el-table-column label="" prop="">
          <template #default="scope">
            <div v-for="(item, index) in scope.row.needList" :key="index">
              <span>{{ item.name }}</span>,
              <span>{{ item.needCount }}</span>,
              <span>{{ item.assem }}</span>,
              <span>{{ item.producingCount }}</span> | 
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel'
import { useMaterialMonitorStore } from '@/store'
const materialMonitorStore = useMaterialMonitorStore()


const result = ref({data: []})
const calc = () => {
  const resultMap = {}
  materialMonitorStore.plan.data.forEach((planItem) => {
    const currProduct = planItem[0]
    const currTotal = planItem.total
    
    // 查找总成号
    const currAssem = materialMonitorStore.assemRelateMap[currProduct]
    if (!currAssem) {
      console.log(`${currProduct}找不到总成`)
      ElMessage.error(`${currProduct}找不到总成`)
      return
    }

    const currAssemBom =  materialMonitorStore.assemBomMap[currAssem]
    if (!currAssemBom) {
      console.log(`产品${currProduct}-总成${currAssem}找不到Bom`)
      ElMessage.error(`产品${currProduct}-总成${currAssem}找不到总成`)
      return 
    }

    currAssemBom.forEach(bomItem => {
      if (!resultMap[bomItem.code]) {
        resultMap[bomItem.code] = {...bomItem} // 基本信息
        resultMap[bomItem.code].needCount = 0 // 需要数量
        resultMap[bomItem.code].needProducts = [] // 用到该零件的产品型号
        resultMap[bomItem.code].producingCount = 0 // 在制生产数
        resultMap[bomItem.code].needList = []
        resultMap[bomItem.code].stockCount = 0
      }

      // 在制数
      const producingItem = materialMonitorStore.producingMap[currAssem] || {}
      const producingCount = producingItem[bomItem.code]?.count || 0

      // TODO:需要修改
      resultMap[bomItem.code].needList.push({
        name: currProduct,
        needCount: currTotal,
        producingCount: producingCount,
        assem: currAssem
      })
    })
  })

  // 最后的数据处理
  Object.keys(resultMap).forEach(key => {
    const item = resultMap[key]
    debugger
    const {needList} = item

    let producingCount = 0
    let needCount = 0
    if (needList.length === 1) {
      producingCount = needList[0].producingCount
      needCount = needList[0].needCount
    } else {
      needList.forEach(needItem => {
        producingCount += Math.min(needItem.producingCount, needItem.needCount)
        needCount += needItem.needCount
      })
    }

    let stockCount = materialMonitorStore.stockMap[item.code]?.count
    let arrivedCount = materialMonitorStore.arrivedMap[item.code]?.count

    item.needCount = needCount !== undefined ? needCount : 'unknow'
    item.producingCount = producingCount !== undefined ? producingCount :  'unknow'
    item.stockCount =  stockCount !== undefined ? stockCount : 'unknow' // 库存数
    item.arrivedCount = arrivedCount !== undefined ? arrivedCount : 'unknow' // 当月来料数
    item.oweCount = needCount - (producingCount || 0) - (stockCount || 0) - (arrivedCount || 0)
  })

  result.value.data =  Object.values(resultMap)
}

setTimeout(() => {
  calc()
})



const clearData = () => {
  
}
</script>

