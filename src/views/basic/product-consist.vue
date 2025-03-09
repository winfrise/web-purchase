
<template>
    <div>
        <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>产品组成</div>


        <div style="display: flex;">
            <el-upload accept=".xlsx" :before-upload="beforeUpload">
              <el-button type="primary">上传组成列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>
    </div>
      <div class="card" style="margin-top: 10px;">
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
        >
            <el-table-column label="序号" type="index" width="80" fixed />
            <el-table-column label="产品UDID" prop="UDID" width="180" />
            <el-table-column label="名称" prop="name" width="180" />
            <el-table-column label="零件UDID" prop="partUDID" />
            <el-table-column label="备注" prop="remark" />
            <el-table-column label="数量" prop="count" />
            <el-table-column label="供应商" prop="supplier" />
            <el-table-column label="所属型号" prop="belong" />
        </el-table>
      </div>

    </div>
  </template>
  
  <script setup>
    import {reactive, ref, computed} from "vue"
    import loadExcel from '@/utils/loadExcel'
    import { useProductStore } from "@/store"

    const productStore = useProductStore()

    const tableData = computed(() => {
        console.log(productStore.productConsistMap)
        return productStore.productConsist.map(item => {
            return ({
                ...item
            })
        })
    })

     
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex}) => {
        if ([1].includes(columnIndex)) {
            if (row.UDID) {
                return {rowspan:  productStore.productConsistMap[row.UDID].length, colspan: 1}
            } else {
                return {rowspan: 0, colspan: 0}
            }
        } 
    }


// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    let prevUDID = null
    const productConsist = result.slice(1).map(item => {
        if (item[0]) {
            prevUDID = item[0]
        }
        return {
            UDID: item[0],
            name: item[1],
            partUDID: item[2],
            remark: item[3],
            count: item[4],
            supplier: item[5],
            belong: item[0] || prevUDID
        }
    })

    productStore.setProductConsist(productConsist)
    
  })
  return false
}

// 清除数据
const clearData = () => {
    ElMessageBox.confirm('是否确定删除产品组成数据？','警告', {type: 'warning'})
    .then(() => {
      productStore.clearProductConsist()
    })
}

  
  </script>
  
  
  
  <style scoped>
  
  </style>