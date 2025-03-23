
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <strong>在制品拆分</strong><br>
          使用原始EXCEL表。数据从第3行开始，第1行表名，第2行是表头。
        </div>


        <div style="display: flex;">
            <el-upload accept=".xlsx,.xls" :before-upload="beforeUpload">
              <el-button type="primary">上传在制品拆分列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card table-container" style="margin-top: 10px;">
      <el-table  :data="materialMonitorStore.producing.data" border>
        <el-table-column label="序号" type="index" fixed width="80"></el-table-column>
        <el-table-column label="总成" prop="assem"/>
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="型号" prop="UDID"/>
        <el-table-column label="在制零件" prop="count"/>
        <el-table-column label="备注" prop="remark"/>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref, computed} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel';
import {useMaterialMonitorStore} from '@/store'
const materialMonitorStore = useMaterialMonitorStore()



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    const producingList = result.slice(2).map((item, index) => {
      const [assem, name, UDID, count, remark] = item
      
      return {assem, name, UDID, count, remark}
    })

    materialMonitorStore.setProducing({data: producingList})
    
  })
  return false
}

// 清除数据
const clearData = () => {
  ElMessageBox.confirm('是否确定删除零件数据？', '警告', { type: 'warning' })
        .then(() => {
            materialMonitorStore.clearProducing()
        })
}



</script>



<style scoped>

</style>