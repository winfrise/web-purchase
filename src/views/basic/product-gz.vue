
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>高正产品</div>


        <div style="display: flex;">
            <el-upload accept=".xlsx" :before-upload="beforeUpload">
              <el-button type="primary">上传产品列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>


    </div>
    <div class="card" style="margin-top: 10px;">
      <el-table border
        :data="productStore.productList"
      >
        <el-table-column type="index" label="序号" width="60" />

        <el-table-column  prop="UDID" label="UDID" />
        <el-table-column  prop="remark" label="备注" />

        <el-table-column label="是否有组成" fixed="right">
          <template #default="scope">
            <span>{{ productStore.productConsistMap[scope.row.UDID] ? "是" : "-" }}</span>
          </template>
        </el-table-column>
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
    const productList = result.slice(1).map(item => ({
      UDID: item[0],
      remark: item[1]
    }))
    productStore.setProductList(productList)
    
  })
  return false
}

// 清除数据
const clearData = () => {
  ElMessageBox.confirm('是否确定删除产品数据？','警告', {type: 'warning'})
    .then(() => {
      productStore.clearProductList()
    })
}
</script>



<style scoped>
.item {
  width: 200px;
}
</style>