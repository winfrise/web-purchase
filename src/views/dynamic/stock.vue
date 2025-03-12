
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>库存列表</div>


        <div style="display: flex;">
            <el-upload accept=".xlsx" :before-upload="beforeUpload">
              <el-button type="primary">上传库存列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px; height: 1000px;">

      <el-table  :data="relateStore.stockList" border>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="物料名称" />
        <el-table-column prop="UDID" label="规格UDID" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="count" label="数量" />

        <template v-for="(item, index) in relateStore.stockHeaders"  :key="index">
          <el-table-column  :prop="item.prop" :label="item.label" />
        </template>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel';
import { useRelateStore } from '@/store';
const relateStore = useRelateStore()



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    const stockHeaders = result.slice(0, 1)[0].slice(4).map((item, index) => {
      return {prop: `${index}`, label: item}
    })
    const stockList = result.slice(1).map(item => {
      const [name, UDID, unit, count, ...other] = item
      const row = { name, UDID, unit, count  }
      for(let i = 4; i < item.length; i++) {
        row[i] = item[i]
      }
      return row
    })
    
    relateStore.setStockList(stockHeaders, stockList)
  })
  return false
}

// 清除数据
const clearData = () => {
  relateStore.clearStockList()
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