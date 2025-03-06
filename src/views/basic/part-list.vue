
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
        :data="partList"
        style="width: 100%; margin-bottom: 20px; height: 1000px;"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="零件名称" />
        <el-table-column prop="UDID" label="零件编号" />
        <el-table-column prop="cate" label="零件分类" />
        <el-table-column prop="supplier" label="供应商" />
      </el-table>
    </div>


  </div>
</template>

<script setup>
import {ref} from "vue"
import loadExcel from '@/utils/loadExcel'

const partList = ref([])
const partListMap = ref({})

// 本地读取零件列表
const localPartList = localStorage.getItem('partList')
if (localPartList) {
  partList.value = JSON.parse(localPartList)
}


// 上传文件
const beforeUpload = (rawFile) => {
    
  loadExcel(rawFile)
  .then(result => {
    partList.value = result.slice(1).map(item => {
        return {
            name: item[0],
            UDID: item[1],
            cate: item[2],
            supplier: item[3]
        }
    })
    localStorage.setItem('partList', JSON.stringify(partList.value))

    const partMap = partList.value.reduce((acc, item) => {
        acc[item.UDID] = item
        return acc
    }, {})
    localStorage.setItem('partListMap', JSON.stringify(partMap))
    partListMap.value = partMap
    
  })
  return false
}

// 清除数据
const clearData = () => {
  localStorage.removeItem('partList')
  localStorage.removeItem('partListMap')
  partList.value = []
  partListMap.value = {}
}


</script>



<style scoped>
.item {
  width: 200px;
}
</style>