
<template>
  <div>
    <div class="card">
      <div style="display: flex; justify-content: space-between;">
        <div>生成零件需求</div>


        <div style="display: flex;">
            <el-upload accept=".xlsx" :before-upload="beforeUpload">
              <el-button type="primary">上传产品列表</el-button>
            </el-upload>

            <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
        </div>
      </div>


    </div>

    <div class="card"  style="height: 800px; margin-top: 20px;">
      <el-tabs
        v-model="activeName"
        type="border-card"
      >
        <el-tab-pane label="冲压件" name="first">
          <el-table :data="stampTableData" stripe style="width: 100%; height: 100%">
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="name" label="零件名称" width="160px" />
            <el-table-column prop="UDID" label="零件编号" width="160px" />
            <el-table-column prop="supplier" label="供应商" />
            <el-table-column prop="cate" label="类型" />
            <el-table-column fixed="right" prop="needCount" label="需要数量" />
            <el-table-column fixed="right" prop="producingCount" label="生产在制" />
            <el-table-column fixed="right" prop="stockCount" label="仓库库存" />
            <el-table-column fixed="right" prop="needDetail" label="详情"  />
            <el-table-column label="尚欠数量" fixed="right">
              <template #default="scope">
                {{ scope.row.needCount - (scope.row.producingCount || 0) - (scope.row.stockCount || 0) }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="其他" name="second">
            <el-table :data="otherTableData" stripe >
                  <el-table-column type="index" label="序号" width="60" />
                  <el-table-column prop="name" label="零件名称" />
                  <el-table-column prop="UDID" label="零件编号"  />
                  <el-table-column prop="count" label="个数" />
                  <el-table-column prop="supplier" label="供应商"  />
                  <el-table-column prop="cate" label="类型"  />
                  <el-table-column fixed="right" prop="needCount" label="需要数量" />
                  <el-table-column fixed="right" prop="producingCount" label="生产在制" />
                  <el-table-column fixed="right" prop="stockCount" label="仓库库存" />
                  <el-table-column fixed="right" prop="needDetail" label="详情"  />
                  <el-table-column label="尚欠数量" fixed="right">
                    <template #default="scope">
                      {{ scope.row.needCount - (scope.row.producingCount || 0) - (scope.row.stockCount || 0) }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="长材" name="third">
                <el-table :data="tubeTableData" stripe>
              <el-table-column type="index" label="序号" width="60" />
              <el-table-column prop="name" label="零件名称" />
              <el-table-column prop="UDID" label="零件编号" />
              <el-table-column prop="remark" label="备注" />
              <el-table-column prop="supplier" label="供应商" />
              <el-table-column prop="cate" label="类型" width="180" />
              <el-table-column fixed="right" prop="needCount" label="需要数量" />
              <el-table-column fixed="right" prop="producingCount" label="生产在制" />
              <el-table-column fixed="right" prop="stockCount" label="仓库库存"  />
              <el-table-column fixed="right" prop="needDetail" label="详情"  />
              <el-table-column label="尚欠数量" fixed="right">
                <template #default="scope">
                  {{ scope.row.needCount - (scope.row.producingCount || 0) - (scope.row.stockCount || 0) }}
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
  </el-tabs>
      
    </div>


  </div>
</template>

<script setup>
import {reactive, ref, computed, watch} from "vue"
import {ElMessage, ElMessageBox} from "element-plus";
import loadExcel from "@/utils/loadExcel";

const activeName = ref('first')

// 获取各型号产品需要零件映射
const productConsistMap = JSON.parse(localStorage.getItem('productConsistMap')) 


// 获取零件列表
const partListMap = JSON.parse(localStorage.getItem("partListMap"))

// 获取生产在制库存数
const producingPartListMap = JSON.parse(localStorage.getItem('producingPartListMap'))


// 获取仓库库存数
const stockListMap = JSON.parse(localStorage.getItem('stockListMap'))

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
      ...needStampTotalMap.value[key],
      UDID: key,
      producingCount: producingPartListMap[key]?.count,
      stockCount: stockListMap[key]?.count
    }
  })
})

// 管子Table列表
const tubeTableData = computed(() => {
  return Object.keys(needTubeTotalMap.value).map(key => {
    return {
      ...partListMap[key],
      ...needTubeTotalMap.value[key],
      UDID: key,
      producingCount: producingPartListMap[key]?.count,
      stockCount: stockListMap[key]?.count
    }
  })
})

// 其他Table列表
const otherTableData = computed(() => {
  return Object.keys(needOtherTotalMap.value).map(key => {
    return {
      ...partListMap[key],
      ...needOtherTotalMap.value[key],
      UDID: key,
      producingCount: producingPartListMap[key]?.count, // 在制品数量
      stockCount: stockListMap[key]?.count // 库存数
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
        const needItem = result[key]
        if (!partListMap[key]) {
          console.log(`${key}在零件列表不存在`)
        } else {
          const cate = partListMap[key].cate
          if (cate === '管子') {
            tubeListMap[key] = needItem
          } else if (cate === '冲压件') {
            stampListMap[key] = needItem
          } else {
            otherListMap[key] = needItem
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

const clearData = () => {
  ElMessageBox.confirm('是否确定删除？','提示', {type: 'warning'})
    .then(() => {
      localStorage.removeItem('needTubeTotalMap')
      localStorage.removeItem('needStampTotalMap')
      localStorage.removeItem('needOtherTotalMap')
      needTubeTotalMap.value = []
    needStampTotalMap.value = []
    needOtherTotalMap.value = []
    })

}

const genResult = (totalList) => {
  return totalList.reduce((acc, item) => {
    const productName = item[0]
    const productCount = item[1]

    const productPartList = productConsistMap[productName]
    if (!productPartList) {
      ElMessage.error(`[${productName}]组成不存在`);
      console.log(`[${productName}]组成不存在`)

    } else {
      productPartList.forEach(partItem => {
        if (!acc[partItem.UDID]) {
          acc[partItem.UDID] = {...partItem,  needCount: 0, needDetail: ''}
        }

        const needCount = productCount * (partItem.count || 1)
        acc[partItem.UDID].needCount += needCount
        if (acc[partItem.UDID].needDetail) {
          acc[partItem.UDID].needDetail += " | "
        }
        acc[partItem.UDID].needDetail += `${productName},${productCount}`
      })
    }

    return acc
  }, {})
}



</script>



<style scoped>

</style>