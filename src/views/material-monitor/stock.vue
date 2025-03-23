
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <strong>库存列表</strong><br>
          使用原始的库存EXCEL。数据从第3行开始，第1行表名，第2行是表头。
        </div>


        <div style="display: flex;">
            <el-upload accept=".xlsx,.xls" :before-upload="beforeUpload">
              <el-button type="primary">上传库存列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card table-container" style="margin-top: 10px;">
      <el-table  :data="materialMonitorStore.stock.data" border>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="materialCode" label="物料代码" />
        <el-table-column prop="materialName" label="物料名称" />
        <el-table-column prop="UDID" label="规格型号UDID" />
        <el-table-column prop="warehouseName" label="仓库名称" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="count" label="数量" />
        <el-table-column prop="expireDate" label="到期日" />
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
    const stockList = result.slice(2).map(item => {
      const [materialCode, materialName, UDID, warehouseName, unit, count, expireDate, remark, systemRemark] = item
      const row = { materialCode, materialName, UDID, warehouseName, unit, count, expireDate, remark, systemRemark  }
      return row
    })
    
    materialMonitorStore.setStock({data: stockList})
  })
  return false
}

// 清除数据
const clearData = () => {
  materialMonitorStore.clearStock()
}

</script>
