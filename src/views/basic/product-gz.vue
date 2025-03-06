
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
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column type="index" label="序号" width="60" />

        <el-table-column v-for="(item, index) in tableCell" :prop="item.prop" :label="item.label" :key="index" />

        <el-table-column label="是否有组成" fixed="right">
          <template #default="scope">
            <span>{{ scope.row.hasConsist ? "是" : "-" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script setup>
import {computed, ref} from "vue"
import loadExcel from '@/utils/loadExcel'

const productConsistMap = JSON.parse(localStorage.getItem('productConsistMap')) || {}
const localProductGZ = JSON.parse(localStorage.getItem('productGZ'))


const productGZ = ref([])
if (localProductGZ) {
  productGZ.value = localProductGZ
}

// 表头数据
const tableCell = computed(() => {
  if (!productGZ.value[0]) {
    return []
  }
  return productGZ.value.slice(0, 1)[0].map((cellItem, index) => {
    return {label: cellItem, prop: `${index}`}

  })
})

// 列表数据
const tableData = computed(() => {
  return productGZ.value.slice(1).map(row => {
    const rowData = row.reduce((acc, item, index) => {
      acc[index] = item
      return acc
    }, {})
    rowData.hasConsist = !!productConsistMap[rowData['0']]
    return rowData
  })
})

// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    localStorage.setItem('productGZ', JSON.stringify(result))
    productGZ.value = result
    
  })
  return false
}

// 清除数据
const clearData = () => {
  localStorage.removeItem('productGZ')
}
</script>



<style scoped>
.item {
  width: 200px;
}
</style>