
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

      <el-table  :data="relateStore.producingSplitList" border>
        <el-table-column label="序号" type="index" fixed></el-table-column>
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="型号UDID" prop="UDID"/>
        <el-table-column label="单位" prop="unit"/>
        <el-table-column label="在制零件数" prop="count"/>
        <el-table-column label="在制详情" prop="detail"/>
        <el-table-column label="备注" prop="remark"/>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from '@/utils/loadExcel';
import {useRelateStore} from '@/store'
const relateStore = useRelateStore()




// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    const producingSplitList = result.slice(1).reduce((acc, item) => {
      const [name, UDID, unit, count, belong, remark] = item
      console.log(UDID)
      const index = acc.findIndex(accItem => accItem.UDID === UDID)
      console.log(index)
      if (index < 0) {
        acc.push({ name, UDID, unit, count, detail: `${belong}/${count}`,  remark})
      } else {
        acc[index].count += count
        acc[index].detail += ` , ${belong}/${count}`
      }
      return acc
    }, [])

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