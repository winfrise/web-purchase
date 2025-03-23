
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>月计划表</strong><br>
            使用原始计划表，第1行是表头，从第2行开始是数据,第一列是产品型号,最后一列和最后一行是总数
          </div>


          <div style="display: flex;">
              <el-upload accept=".xlsx,.xls" :before-upload="beforeUpload">
                  <el-button type="primary">上传</el-button>
              </el-upload>

              <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
          </div>
      </div>
    </div>
    <div class="card table-container" style="margin-top: 10px; ">

      <el-table  :data="materialMonitorStore.plan.data" border>
        <el-table-column width="100"
            v-for="(cell, cellIndex) in materialMonitorStore.plan.headers"
            :key="cellIndex"
            :prop="cell.prop"
            :label="`${cell.label}`"
            :fixed="cellIndex < 3 ? 'left' : false"
        />
        <el-table-column prop="total" label=""></el-table-column>
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



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {

    const tableHeaders = result.slice(0, 1)[0].map((item, index) => {
      return { prop: `${index}`, label: item}
    })

    const tableData = result.slice(1).map(rowItem => {
      rowItem.length = result[0].length // 去掉超出的列
      return rowItem.reduce((acc, item, index) => {
        acc[index] = item
        if (index === rowItem.length - 1) {
          acc.total = item
        } 
        return acc
      }, {})
    })

    materialMonitorStore.setPlan({headers: tableHeaders, data: tableData})
    
  })
  return false
}

const clearData = () => {
  materialMonitorStore.clearPlan()
}

</script>

