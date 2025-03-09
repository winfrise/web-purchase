
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>零件列表</div>


        <div style="display: flex;">
            <el-upload accept=".xlsx" :before-upload="beforeUpload">
              <el-button type="primary">上传零件列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px;">

      <el-table border
        :data="productStore.partList"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="零件名称" />
        <el-table-column prop="UDID" label="零件编号" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="cate" label="零件分类" />
        <el-table-column prop="supplier" label="供应商" />
      </el-table>
    </div>


  </div>
</template>

<script setup>
import { ref } from "vue"
import loadExcel from '@/utils/loadExcel'
import { useProductStore } from '@/store'
const productStore = useProductStore()



// 上传文件
const beforeUpload = (rawFile) => {
    loadExcel(rawFile)
        .then(result => {
            const partList = result.slice(1).map(item => {
                return {
                    name: item[0],
                    UDID: item[1],
                    remark: item[2],
                    cate: item[3],
                    supplier: item[4]
                }
            })

            productStore.setPartList(partList)
        })
    return false
}

// 清除数据
const clearData = () => {
    ElMessageBox.confirm('是否确定删除零件数据？', '警告', { type: 'warning' })
        .then(() => {
            productStore.clearPartList()
        })
}


</script>



<style scoped>

</style>