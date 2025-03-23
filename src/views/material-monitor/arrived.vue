
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <strong>到货列表</strong><br>
          使用原始的到货EXCEL。数据从第3行开始，第1行表名，第2行是表头。
        </div>


        <div style="display: flex;">
            <el-upload accept=".xlsx,.xls" :before-upload="beforeUpload">
              <el-button type="primary">上传到货列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card table-container" style="margin-top: 10px;">
      <el-table  :data="materialMonitorStore.arrived.data" border>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="UDID" label="型号UDID" />
        <el-table-column prop="remark" label="规格、备注" />
        <el-table-column prop="count" label="本月来料" />
        
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
      const [supplier, name, UDID, remark, count] = item
      const row = { supplier, name, UDID, remark, count }
      return row
    })
    
    materialMonitorStore.setArrived({data: list})
  })
  return false
}

// 清除数据
const clearData = () => {
  materialMonitorStore.clearArrived()
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