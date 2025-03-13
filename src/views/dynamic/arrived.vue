
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
              <el-button type="primary">上传库存列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px; height: 1000px;">
      <el-table  :data="relateStore.arrivedList" border>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="materialCode" label="物料代码" />
        <el-table-column prop="materialName" label="物料名称" />
        <el-table-column prop="UDID" label="规格型号UDID" />
        <el-table-column prop="warehouseName" label="仓库名称" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="count" label="数量" />
        <el-table-column prop="expireDate" label="到期日" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="systemRemark" label="系统备注" />
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
    const arrivedList = result.slice(2).map(item => {
      const [materialCode, materialName, UDID, warehouseName, unit, count, expireDate, remark, systemRemark] = item
      const row = { materialCode, materialName, UDID, warehouseName, unit, count, expireDate, remark, systemRemark  }
      return row
    })
    
    relateStore.setArrivedList(arrivedList)
  })
  return false
}

// 清除数据
const clearData = () => {
  relateStore.clearArrivedList()
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