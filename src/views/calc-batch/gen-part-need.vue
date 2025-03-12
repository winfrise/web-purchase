<template>
    <div>
        <div class="card">
            <div style="display: flex; justify-content: space-between;">
                <div>批量生成零件需求</div>


                <div style="display: flex;">
                    <el-upload accept=".xlsx" :before-upload="beforeUpload">
                        <el-button type="primary">上传产品列表</el-button>
                    </el-upload>

                    <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
                </div>
            </div>


        </div>

        <div class="card" style="height: 800px; margin-top: 20px;">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="管材" name="tube">
                    <el-table :data="batchResultStore.resultList" stripe >
                        <el-table-column type="index" label="序号" width="60" />

                        <el-table-column prop="name" label="零件名称">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.UDID]?.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="UDID" label="零件编号" width="160px" />
                            

                        <el-table-column label="备注">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.UDID]?.remark }}
                            </template>
                        </el-table-column>

                        <el-table-column label="规格">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.UDID]?.remark?.split('*').slice(0, 2).join('*') }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="name" label="供应商">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.UDID]?.supplier }}
                            </template>
                        </el-table-column>

                        <el-table-column fixed="right" label="单支重量Kg" >
                            <template #default="scope">
                                {{ calcWeight(productStore.partListMap[scope.row.UDID]?.remark) }}
                            </template>
                        </el-table-column>

                        <template v-for="(num,index) in batchResultStore.columnCount" :key="index">
                            <el-table-column fixed="right" :prop="`needCount${index + 1}`" :label="`需要数量${index + 1}`"  />
                            <el-table-column fixed="right" :prop="`needDetail${index + 1}`" :label="`需要详情${index + 1}`"  />
                        </template>
                        
                    


                    </el-table>
                </el-tab-pane>
            </el-tabs>

        </div>


    </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus";
import loadExcel from "@/utils/loadExcel";
import { useRelateStore, useProductStore, useBatchResultStore } from '@/store'
const relateStore = useRelateStore()
const productStore = useProductStore()
const batchResultStore = useBatchResultStore()

const activeName = ref('tube')





// 选择产品型号总数列表上传
const beforeUpload = (rawFile) => {
    loadExcel(rawFile)
        .then(excelArray => {

            const totalList = excelArray.slice(1)
            const result = genResult(totalList)
            batchResultStore.setResultList(result)
        })

    return false
}

const clearData = () => {
    ElMessageBox.confirm('是否确定删除？', '提示', { type: 'warning' })
        .then(() => {
            batchResultStore.clearResultList()
            batchResultStore.clearColumnCount()
        })

}

// 根据管的外径，壁厚，长度计算重量 32*1.8*130
const calcWeight = (str) => {
    // 重量 = (外径 - 壁厚) × 壁厚 × 0.02466 × 长度
    const [r, w, l] = str.split('*')
    return Math.ceil((r - w) * w * 0.02466 * l / 0.95) / 1000

}

// 计算结果
const genResult = (totalList) => {
    let result = []
    totalList.forEach((itemArr) => {
        // 当前行数据处理
        itemArr.forEach((count, columnIndex) => {
            // 第1列是UDID
            if (columnIndex === 0) {
                return 
            }
            // 在结果中添加数据结构
            if (!result[columnIndex]) {
                result[columnIndex] = {}
            }

            const productUDID = itemArr[0]
            const productCount = count
            const productPartList = productStore.productConsistMap[productUDID] // 当前产品需要的零件列表
            if (!productPartList) {
                ElMessage.error(`[${productUDID}]组成不存在`);
                console.log(`[${productUDID}]组成不存在`)
            } else {
                // 统计当前产品需要的零件
                productPartList.forEach(partItem => {
                    if (!result[columnIndex][partItem.partUDID]) {
                        result[columnIndex][partItem.partUDID] = { partUDID: partItem.partUDID, needCount: 0, needDetail: '' }
                    }

                    const needCount = productCount * (partItem.count || 1) // 需要的零件数量
                    result[columnIndex][partItem.partUDID].needCount += needCount
                    if ( result[columnIndex][partItem.partUDID].needDetail) {
                        result[columnIndex][partItem.partUDID].needDetail += " , "
                    }
                    result[columnIndex][partItem.partUDID].needDetail += `${productUDID}/${productCount}`  // 需要的零件详情
                })
            }
        })
        
    })

    result = result.filter(item => !!item)
    batchResultStore.setColumnCount(result.length) // 除了第一列共有几列

    // 合并数据 [[...], [...], [...]] => [item, item2, item3,...]
    const newResult = Object.keys(result[0]).map((UDID, index) => {
        let row = {UDID}
        for(let i = 0; i < batchResultStore.columnCount; i++) {
            debugger
            const {needCount, needDetail} = result[i][UDID] || {}
            row[`needCount${i+1}`] = needCount
            row[`needDetail${i+1}`] = needDetail
        }
        return row
    })

    return newResult.filter(item => productStore.partListMap[item.UDID]?.cate === '管子')
    
}
</script>



<style scoped></style>