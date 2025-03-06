
<template>
  <div>
    <div class="card">
      <h3>需要零件列表</h3>
    </div>

    <div class="card">
      <el-form label-width="100px" style="padding-right:50px;">
        <el-form-item label="上传计划表">
          <el-upload style="width: 100px; height: 100px;"
              accept=".xlsx"
              drag
              action=""
              multiple
              :before-upload="beforeUpload"
          >
            选择/拖拽
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <div class="card"  style="height: 800px; margin-top: 20px;">
      <el-table :data="stampTableData" stripe style="width: 100%; height: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="零件名称" width="180" />
        <el-table-column prop="UDID" label="零件编号" width="180" />
        <el-table-column prop="supplier" label="供应商" width="180" />
        <el-table-column prop="cate" label="类型" width="180" />
        <el-table-column fixed="right" prop="count" label="需要零件数量" width="180" />
        <el-table-column fixed="right" prop="producingCount" label="生产在制库存" width="180" />
        <el-table-column fixed="right" prop="stockCount" label="仓库库存" width="180" />
        <el-table-column label="尚欠数量" fixed="right">
          <template #default="scope">
            {{ scope.row.count - (scope.row.producingCount || 0) - (scope.row.stockCount || 0) }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card"  style="height: 500px; margin-top: 20px;">
      <el-table :data="otherTableData" stripe style="width: 100%; height: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="零件名称" width="180" />
        <el-table-column prop="UDID" label="零件编号" width="180" />
        <el-table-column prop="supplier" label="供应商" width="180" />
        <el-table-column prop="cate" label="类型" width="180" />
        <el-table-column fixed="right" prop="count" label="需要零件数量" width="180" />
        <el-table-column fixed="right" prop="producingCount" label="生产在制库存" width="180" />
        <el-table-column fixed="right" prop="stockCount" label="仓库库存" width="180" />
        <el-table-column label="尚欠数量" fixed="right">
          <template #default="scope">
            {{ scope.row.count - (scope.row.producingCount || 0) - (scope.row.stockCount || 0) }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card" style="height: 800px; margin-top: 20px;">
      <el-table :data="tubeTableData" stripe style="width: 100%; height: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="零件名称" width="180" />
        <el-table-column prop="UDID" label="零件编号" width="180" />
        <el-table-column prop="supplier" label="供应商" width="180" />
        <el-table-column prop="cate" label="类型" width="180" />
        <el-table-column fixed="right" prop="count" label="需要零件数量" width="180" />
        <el-table-column fixed="right" prop="producingCount" label="生产在制库存" width="180" />
        <el-table-column fixed="right" prop="stockCount" label="仓库库存" width="180" />
        <el-table-column label="尚欠数量" fixed="right">
          <template #default="scope">
            {{ scope.row.count - (scope.row.producingCount || 0) - (scope.row.stockCount || 0) }}
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref, computed, watch} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from "@/utils/loadExcel";


// 获取各型号产品需要零件映射
const productConsist = JSON.parse(localStorage.getItem('product-consist')) 


// 获取零件列表
const partList = JSON.parse(localStorage.getItem("partList"))
const partListMap = partList.reduce((acc, item) => {
  acc[item.UDID] = {...item}
  return acc
}, {})

// 获取生产在制库存数
const producingTotalMap = JSON.parse(localStorage.getItem('producingTableData')).reduce((acc, item) => {
  acc[item[0]] = item[1]
  return acc
}, {})


// 获取仓库库存数
const stockTotalMap = JSON.parse(localStorage.getItem('stockTableData')).reduce((acc, item) => {
  acc[item[0]] = item[1]
  return acc
}, {})

// 获取需要的管子总数映射
const needTubeTotalMap = ref({})
const localNeedTubeTotalMap = localStorage.getItem('needTubeTotalMap')
if (localNeedTubeTotalMap) {
  needTubeTotalMap.value = JSON.parse(localNeedTubeTotalMap)
}

// 获取需要的冲压件总数映射
const needStampTotalMap = ref({})
const localNeedStampTotalMap = localStorage.getItem('needStampTotalMap')
if (localNeedStampTotalMap) {
  needStampTotalMap.value = JSON.parse(localNeedStampTotalMap)
}

// 获取需要的其他（螺母、轴承、垫块等）总数映射
const needOtherTotalMap = ref({})
const localNeedOtherTotalMap = localStorage.getItem('needOtherTotalMap')
if (localNeedOtherTotalMap) {
  needOtherTotalMap.value = JSON.parse(localNeedOtherTotalMap)
}

// 冲压件Table列表
const stampTableData = computed(() => {
  return Object.keys(needStampTotalMap.value).map(key => {
    return {
      ...partListMap[key],
      count: needStampTotalMap.value[key],
      UDID: key,
      producingCount: producingTotalMap[key],
      stockCount: stockTotalMap[key]
    }
  })
})

// 管子Table列表
const tubeTableData = computed(() => {
  return Object.keys(needTubeTotalMap.value).map(key => {
    return {
      ...partListMap[key],
      count: needTubeTotalMap.value[key],
      UDID: key,
      producingCount: producingTotalMap[key],
      stockCount: stockTotalMap[key]
    }
  })
})

// 其他Table列表
const otherTableData = computed(() => {
  return Object.keys(needOtherTotalMap.value).map(key => {
    return {
      ...partListMap[key],
      count: needOtherTotalMap.value[key],
      UDID: key,
      producingCount: producingTotalMap[key],
      stockCount: stockTotalMap[key]
    }
  })
})



// 选择产品型号总数列表上传
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
    .then(excelArray => {
      console.log(excelArray)
      const totalList = excelArray.slice(1)
      const result = genResult(totalList)
      console.log(result)

      const tubeListMap = {}
      const stampListMap = {}
      const otherListMap = {}
      
      Object.keys(result).forEach(key => {
        const count = result[key]
        if (!partListMap[key]) {
          console.log(`${key}在零件列表不存在`)
        } else {
          const cate = partListMap[key].cate
          console.log(cate)
          if (cate === '管子') {
            tubeListMap[key] = count
          } else if (cate === '冲压件') {
            stampListMap[key] = count
          } else {
            otherListMap[key] = count
          }
        }

      })

      localStorage.setItem('needTubeTotalMap', JSON.stringify(tubeListMap))
      localStorage.setItem('needStampTotalMap', JSON.stringify(stampListMap))
      localStorage.setItem('needOtherTotalMap', JSON.stringify(otherListMap))

      needTubeTotalMap.value = tubeListMap
      needStampTotalMap.value = stampListMap
      needOtherTotalMap.value = otherListMap

    })

  return false
}

const genResult = (totalList) => {
  return totalList.reduce((acc, item) => {
    const productName = item[0]
    const productCount = item[1]

    const productPartList = productConsist[productName]
    if (!productPartList) {
      ElMessage.error(`[${productName}]组成不存在`);
      console.log(`[${productName}]组成不存在`)

    } else {
      productPartList.forEach(partItem => {
        if (!acc[partItem.UDID]) {
          acc[partItem.UDID] = 0
        }
        acc[partItem.UDID] += productCount * (partItem.count || 1)
      })
    }

    return acc
  }, {})
}



</script>



<style scoped>

</style>