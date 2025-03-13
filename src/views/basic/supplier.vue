
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>供应商产品对照</strong><br>
            使用原始表，从第3行开始是数据
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
      <el-table border
        :data="productStore.supplierList"
      >
        <el-table-column type="index" label="序号" width="60" />
      
        <el-table-column  prop="UDID" label="型号UDID" />
        <el-table-column  prop="name" label="名称" />
        <el-table-column  prop="customer" label="客户" />
        <el-table-column  prop="supplier" label="供应商" />
      </el-table>
    </div>


  </div>
</template>

<script setup>
import {computed, ref} from "vue"
import loadExcel from '@/utils/loadExcel'

import { useProductStore } from "@/store"

const productStore = useProductStore()



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    const list = result.slice(3).map(item => {
      const [UDID, name, customer, supplier] = item
      return {UDID, name, customer, supplier}
    })
    productStore.setSupplierList(list)
    
  })
  return false
}

// 清除数据
const clearData = () => {
  ElMessageBox.confirm('是否确定删除产品数据？','警告', {type: 'warning'})
    .then(() => {
      productStore.clearSupplierList()
    })
}
</script>



<style scoped>
.item {
  width: 200px;
}
</style>