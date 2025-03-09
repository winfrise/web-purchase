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

        <div class="card" style="height: 800px; margin-top: 20px;">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane v-for="(item, index) in tabList" :label="item.label" :name="item.name" :key="index">
                    <el-table :data="resultStore[item.dataKey]" stripe >
                        <el-table-column type="index" label="序号" width="60" />

                        <el-table-column prop="name" label="零件名称">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.partUDID].name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="partUDID" label="零件编号" width="160px" />

                        <el-table-column label="备注">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.partUDID].remark }}
                            </template>
                        </el-table-column>

                        <el-table-column label="规格" v-if="item.name === 'tube'">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.partUDID].remark.split('*').slice(0, 2).join('*') }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="name" label="供应商">
                            <template #default="scope">
                                {{ productStore.partListMap[scope.row.partUDID].supplier }}
                            </template>
                        </el-table-column>
                        
                        <el-table-column fixed="right" prop="needCount" label="需要数量" />
                        <el-table-column fixed="right" prop="needDetail" label="需要详情" />

                        <el-table-column fixed="right" label="单支重量Kg" v-if="item.name === 'tube'">
                            <template #default="scope">
                                {{ calcWeight(productStore.partListMap[scope.row.partUDID].remark) }}
                            </template>
                        </el-table-column>

                        <el-table-column fixed="right" prop="producingCount" label="生产在制">
                            <template #default="scope">
                                {{ relateStore.producingSplitListMap[scope.row.partUDID]?.count}}
                            </template>
                        </el-table-column>

                        <el-table-column fixed="right" label="在制详情">
                            <template #default="scope">
                                {{ relateStore.producingSplitListMap[scope.row.partUDID]?.detail }}
                            </template>
                        </el-table-column>

                        <el-table-column fixed="right"  label="仓库库存">
                            <template #default="scope">
                                {{ relateStore.stockListMap[scope.row.partUDID]?.count }}
                            </template>
                        </el-table-column>
                        <el-table-column label="尚欠数量" fixed="right">
                            <template #default="scope">
                                {{ scope.row.needCount - (relateStore.producingSplitListMap[scope.row.partUDID]?.count || 0) - (relateStore.stockListMap[scope.row.partUDID]?.count || 0)
                                }}
                            </template>
                        </el-table-column>
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
import { useRelateStore, useProductStore, useResultStore } from '@/store'
const relateStore = useRelateStore()
const productStore = useProductStore()
const resultStore = useResultStore()

const activeName = ref('stamp')

const tabList = [
    {label:'冲压件', name: 'stamp', dataKey: 'stampList'},
    {label:'其他', name: 'other', dataKey: 'otherList'},
    {label:'长材', name: 'tube', dataKey: 'tubeList'}
]




// 选择产品型号总数列表上传
const beforeUpload = (rawFile) => {
    loadExcel(rawFile)
        .then(excelArray => {
            const totalList = excelArray.slice(1)
            const result = genResult(totalList)

            const tubeList = []
            const stampList = []
            const otherList = []
            console.log(result)
            Object.values(result).forEach(needItem => {
                const UDID = needItem.partUDID
                if (!productStore.partListMap[UDID]) {
                    console.log(`${UDID}在零件列表不存在`)
                    ElMessage.error(`${UDID}在零件列表不存在`)
                } else {
                    const cate = productStore.partListMap[UDID].cate
                    if (cate === '管子') {
                        tubeList.push(needItem)
                    } else if (cate === '冲压件') {
                        stampList.push(needItem)
                    } else {
                        otherList.push(needItem)
                    }
                }

            })

            resultStore.setStampList(stampList)
            resultStore.setOtherList(otherList)
            resultStore.setTubeList(tubeList)
        })

    return false
}

const clearData = () => {
    ElMessageBox.confirm('是否确定删除？', '提示', { type: 'warning' })
        .then(() => {
            resultStore.clearData()
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
    return totalList.reduce((acc, item) => {
        const productUDID = item[0]
        const productCount = item[1]
        const productPartList = productStore.productConsistMap[productUDID] // 当前产品需要的零件列表
        if (!productPartList) {
            ElMessage.error(`[${productUDID}]组成不存在`);
            console.log(`[${productUDID}]组成不存在`)
        } else {
            productPartList.forEach(partItem => {
                if (!acc[partItem.partUDID]) {
                    acc[partItem.partUDID] = { partUDID: partItem.partUDID, needCount: 0, needDetail: '' }
                }

                const needCount = productCount * (partItem.count || 1) // 需要的零件数量
                acc[partItem.partUDID].needCount += needCount
                if (acc[partItem.partUDID].needDetail) {
                    acc[partItem.partUDID].needDetail += " , "
                }
                acc[partItem.partUDID].needDetail += `${productUDID}/${productCount}`  // 需要的零件详情
            })
        }

        return acc
    }, {})
}
</script>



<style scoped></style>