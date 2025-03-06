
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>在制品拆分</div>


        <div style="display: flex;">
            <el-upload accept=".xlsx" :before-upload="beforeUpload">
              <el-button type="primary">上传在制品拆分列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px; height: 1000px">

      <el-table  :data="producingPartList" border style="width: 100%; height: 100%; overflow: auto;">
        <el-table-column label="序号" type="index" fixed></el-table-column>
        <el-table-column label="型号UDID" prop="UDID"/>
        <el-table-column label="在制零件数" prop="count"/>
        <el-table-column label="总成" prop="ownProduct"/>
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="备注" prop="remark"/>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel';



const producingPartList = ref([])

setTimeout(() => {
  const localProducingPartList = localStorage.getItem('producingPartList')
  if (localProducingPartList) {
    producingPartList.value = JSON.parse(localProducingPartList)
  }
})


// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    producingPartList.value = result.slice(1).map(item => {
        return {
            UDID: item[0],
            count: item[1],
            ownProduct: item[2],
            name: item[3],
            remark: item[4]
        }
    })
    localStorage.setItem('producingPartList', JSON.stringify(producingPartList.value))

    const producingPartListMap = producingPartList.value.reduce((acc, item) => {
        acc[item.UDID] = item
        return acc
    }, {})
    localStorage.setItem('producingPartListMap', JSON.stringify(producingPartListMap))
    
  })
  return false
}

// 清除数据
const clearData = () => {
  localStorage.removeItem('producingPartList')
  localStorage.removeItem('producingPartListMap')
  producingPartList.value = []
}



</script>



<style scoped>

</style>