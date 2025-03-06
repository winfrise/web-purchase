
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
            style="width: 100%; height: 800px; overflow: auto; margin-top: 20px"
        >
            <el-table-column label="序号" type="index" width="80" fixed />
            <el-table-column label="产品型号" prop="product" width="180" />
            <el-table-column label="名称" prop="name" width="180" />
            <el-table-column label="UDID" prop="UDID" />
            <el-table-column label="备注" prop="remark" />
            <el-table-column label="数量" prop="count" />
            <el-table-column label="供应商" prop="supplier" />
            <el-table-column label="所属型号" prop="parent" />
        </el-table>
      </div>

    </div>
  </template>
  
  <script setup>
  import {reactive, ref, computed} from "vue"
import loadExcel from '@/utils/loadExcel'


  
    const localProductConsist = JSON.parse(localStorage.getItem('productConsist'))
    const localProductConsistMap = JSON.parse(localStorage.getItem('productConsistMap'))
    const productConsist = ref([])
    const productConsistMap = ref({})

    if (localProductConsist) {
        productConsist.value = localProductConsist
    }

    if (localProductConsistMap) {
        productConsistMap.value = localProductConsistMap
    }
    // 表头数据
    const tableCell = computed(() => {
        if (!productConsist.value[0]) {
            return []
        }
        return productConsist.value.slice(0, 1)[0].map((cellItem, index) => {
            return {label: cellItem, prop: `${index}`}

        })
    })

    // 列表数据
    const tableData = computed(() => {
        return productConsist.value.map(row => {
            const rowspan = row.product ? productConsistMap.value[row.product].length : 0
            const colspan = 0
            return {...row, rowspan, colspan}
        })
    })
   
    // const tableData = ref([])
    // tableData.value =Object.keys(productConsist).map(key=> {
    //     return productConsist[key].map((item, index) => {
    //         const rowspan = index === 0 ? productConsist[key].length : 0
    //         const colspan = index === 0 ? 1 : 0
    //         return {...item, product: key, rowspan , colspan}
    //     })
    // }).flat()
     
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex}) => {
        if ([0,1].includes(columnIndex)) {
            return {
                rowspan: row.rowspan,
                colspan: 1,

            }
        }
    }


// 上传文件
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
  .then(result => {
    productConsist.value = result.slice(1).map(item => {
        return {
            product: item[0],
            name: item[1],
            UDID: item[2],
            remark: item[3],
            count: item[4],
            supplier: item[5],
            parent: item[6]
        }
    })
    localStorage.setItem('productConsist', JSON.stringify(productConsist.value))

    const productMap = {}
    let preKey = null
    productConsist.value.forEach(item => {
        const currKey = item.product
        if (currKey) {
            if (!productMap[currKey]) {
                productMap[currKey] = []
            }
            productMap[currKey].push(item)
            preKey = currKey
        } else {
            productMap[preKey].push(item)
        }
    })
    localStorage.setItem('productConsistMap', JSON.stringify(productMap))
    productConsistMap.value = productMap
    
  })
  return false
}

// 清除数据
const clearData = () => {
  localStorage.removeItem('productConsist')
  localStorage.removeItem('productConsistMap')
  productConsist.value = []
  productConsistMap.value = {}
}

  
  </script>
  
  
  
  <style scoped>
  
  </style>