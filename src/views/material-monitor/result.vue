
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
        <el-table-column label="库存数量" prop="">
          <template #default="scope">
            {{materialMonitorStore.stockMap[scope.row.code]?.count}}
          </template>
        </el-table-column>

        <el-table-column label="生产在制" prop="producingCount" />

        <el-table-column label="来料数量" prop="">

        </el-table-column>

        <el-table-column label="尚欠数量" prop="">
          <template #default="scope">
            {{scope.row.needCount - (materialMonitorStore.stockMap[scope.row.code]?.count || 0)}}
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
        resultMap[bomItem.code] = {...bomItem}
        resultMap[bomItem.code].needCount = 0
        resultMap[bomItem.code].producingCount = 0
      }

      resultMap[bomItem.code].needCount += currTotal

      // 在制数
      const producingItem = materialMonitorStore.producingMap[currAssem] || {}
      const producingCount = producingItem[bomItem.code]?.count || 0
      resultMap[bomItem.code].producingCount += producingCount

    })
  })
  result.value.data =  Object.values(resultMap)
  console.log(result.value.data)
}

setTimeout(() => {
  calc()
})



const clearData = () => {
  
}
</script>

