
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <strong>库存列表</strong><br>
          总成BOM EXCEL。数据从第3行开始，第1行表名，第2行是表头。
        </div>


        <div style="display: flex;">
            <el-upload accept=".xlsx,.xls" :before-upload="beforeUpload">
              <el-button type="primary">上传BOM列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card table-container" style="margin-top: 10px;">
      <el-table  :data="materialMonitorStore.assemBom.data" border>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="assem" label="总成" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="型号" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel';
import { useMaterialMonitorStore } from '@/store';
const materialMonitorStore = useMaterialMonitorStore()



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    const list = result.slice(2).map(item => {
      const [assem, supplier, name, code, remark] = item
      const row = { assem, supplier, name, code, remark }
      return row
    })
    
    materialMonitorStore.setAssemBom({data: list})
  })
  return false
}

// 清除数据
const clearData = () => {
  materialMonitorStore.clearAssemBom()
}

</script>
