
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>月计划表</strong><br>
            使用原始计划表，第5行是表头，从第6行开始是数据,第1列是产品型号，可能有隐藏行
          </div>


          <div style="display: flex;">
              <el-upload accept=".xlsx,.xls" :before-upload="beforeUpload">
                  <el-button type="primary">上传</el-button>
              </el-upload>

              <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
          </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px;">

      <el-table  :data="monthPlanStore.monthPlanList" border>
        <el-table-column label="供应商" width="100">
          <template #default="scope">
            {{productStore.supplierMapByUDID[scope.row["0"]]?.supplier}}
          </template>
        </el-table-column>
        <el-table-column width="100"
            v-for="(cell, cellIndex) in monthPlanStore.monthPlanHeaders"
            :key="cellIndex"
            :prop="cell.prop"
            :label="`${cell.label}`"
        />
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel'
import { useMonthPlanStore, useProductStore } from '@/store'
const monthPlanStore = useMonthPlanStore()
const productStore = useProductStore()



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {

    const tableHeaders = result.slice(4, 5)[0].map((item, index) => {
      return { prop: `${index}`, label: item}
    })

    const tableData = result.slice(5).map(item => {
      return item.reduce((acc, item, index) => {
        acc[index] = item
        return acc
      }, {})
    })

    monthPlanStore.setMonthPlanList(tableHeaders, tableData)
    
  })
  return false
}

const clearData = () => {
  monthPlanStore.clearMonthPlanList()
}

</script>



<style scoped>
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>