
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
    <div class="card" style="margin-top: 10px; height: 1000px">
        <el-tabs type="border-card">
          <el-tab-pane label="在制品原始数据">
            <el-table  :data="relateStore.producingSplitList" border>
              <el-table-column label="序号" type="index" fixed width="80"></el-table-column>
              <el-table-column label="总成" prop="productUDID"/>
              <el-table-column label="名称" prop="partName"/>
              <el-table-column label="型号" prop="partUDID"/>
              <el-table-column label="在制零件" prop="count"/>
              <el-table-column label="备注" prop="remark"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="在制品数据汇总">
            <el-table  :data="Object.values(relateStore.producingSplitListMap)" border>
              <el-table-column label="序号" type="index" fixed width="80"></el-table-column>
              <el-table-column label="名称" prop="partName"/>
              <el-table-column label="型号" prop="partUDID"/>
              <el-table-column label="在制零件" prop="count"/>
              <el-table-column label="备注" prop="remark"/>
              <el-table-column label="总成详情" prop="detail"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref, computed} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel';
import {useRelateStore} from '@/store'
const relateStore = useRelateStore()



// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    const producingSplitList = result.slice(2).map((item, index) => {
      const [productUDID, partName, partUDID, count, remark] = item
      
      return {productUDID, partName, partUDID, count, remark}
    })

    relateStore.setProducingSplitList(producingSplitList)
    
  })
  return false
}

// 清除数据
const clearData = () => {
  ElMessageBox.confirm('是否确定删除零件数据？', '警告', { type: 'warning' })
        .then(() => {
            relateStore.clearProducingSplitList()
        })
}



</script>



<style scoped>

</style>