<template>
    <div>
        <div class="card">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <strong>结果</strong><br>

                </div>


                <div style="display: flex;">
                    <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
                </div>
            </div>
        </div>
        <div class="card table-container" style="margin-top: 10px; ">
            <el-table :data="result.data" border>
                <el-table-column type="index" label="序号" fixed="left" />
                <el-table-column label="总成" prop="assem" fixed="left" />
                <el-table-column label="供应商" prop="supplier" fixed="left" />
                <el-table-column label="名称" prop="name" fixed="left" />
                <el-table-column label="型号" prop="code" fixed="left" />
                <el-table-column label="规格、备注" prop="remark" />
                <el-table-column label="订单数量" prop="needCount" />
                <el-table-column label="库存数量" prop="stockCount" />

                <el-table-column label="生产在制" prop="producingCount" />
                <el-table-column label="来料数量" prop="arrivedCount" />
                <el-table-column label="尚欠数量" prop="oweCount" />

                <el-table-column width="300" label="详情" prop="">
                    <template #default="scope">
                        <span v-for="(assemName, index) in Object.keys(scope.row.relateListMap)" :key="index">
                            <span>【{{ assemName }},{{ scope.row.relateListMap[assemName].producingCount }}】</span>
                            <span v-for="(productItem, productIndex) in scope.row.relateListMap[assemName].productList" :key="productIndex">
                                <span>{{ productItem.productName }},{{ productItem.productCount }}</span>
                                <span v-if="productIndex < scope.row.relateListMap[assemName].productList.length - 1"> | </span>
                            </span>

                        </span>
                    </template>
                </el-table-column>

                <el-table-column width="300" label="详情" prop="">
                    <template #default="scope">
                        <span v-for="(item, index) in scope.row.relateList" :key="index">
                            <span>【{{ item.assemName }},{{ item.producingCount }}】</span>
                            <span>{{ item.productName }},{{ item.productCount }}</span>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus";
import loadExcel from '@/utils/loadExcel'
import { useMaterialMonitorStore } from '@/store'
const materialMonitorStore = useMaterialMonitorStore()


const result = ref({ data: [] })
const calc = () => {
    const resultMap = {}
    materialMonitorStore.plan.data.forEach((planItem) => {
        const currProduct = planItem[0]
        const currTotal = planItem.total
 
        if (/^[\u4e00-\u9fa5]+$/.test(currProduct)) { // 判断是否全是汉字
            // 最后一行是总数，忽略汉字
            console.log(`已忽略”${currProduct}“`)
            ElMessage.error(`已忽略“${currProduct}”`)
            return
        }

        // 查找总成号,判断是否有总成信息
        const currAssem = materialMonitorStore.assemRelateMap[currProduct]
        if (!currAssem) {
            console.log(`${currProduct}找不到总成`)
            ElMessage.error(`${currProduct}找不到总成`)
            return
        }

        // 查找总成的Bom，判断是否有Bom信息
        const currAssemBom = materialMonitorStore.assemBomMap[currAssem]
        if (!currAssemBom) {
            console.log(`产品${currProduct}-总成${currAssem}找不到Bom`)
            ElMessage.error(`产品${currProduct}-总成${currAssem}找不到总成`)
            return
        }


        currAssemBom.forEach(assemBomItem => {
            // 如果结果中没有当前物料，初始化当前物料信息
            if (!resultMap[assemBomItem.code]) {
                resultMap[assemBomItem.code] = {
                    ...assemBomItem,
                    needCount: 0, // 需要数量
                    producingCount: 0, // 在制生产数
                    relateList: [], // 总成、产品关系列表
                    stockCount: 0 // 库存数
                }

            }

            // 在制数
            const producingItem = materialMonitorStore.producingMap[currAssem] || materialMonitorStore.producingMap[currProduct] || {} // 通过总成获取在制数
            const producingCount = producingItem[assemBomItem.code]?.count || 0
            // 保存 对应关系
            resultMap[assemBomItem.code].relateList.push({
                productName: currProduct,
                productCount: currTotal,
                producingCount: producingCount,
                assemName: currAssem
            })
        })
    })

    // 最后的数据处理
    Object.keys(resultMap).forEach(key => {
        const bomItem = resultMap[key]
        const { relateList } = bomItem

        bomItem.relateListMap = relateList.reduce((acc, relateItem) => {
            if (!acc[relateItem.assemName]) {
                acc[relateItem.assemName] = {
                    assemName: relateItem.assemName, // 总成
                    producingCount: relateItem.producingCount, // 当前总成的在制数
                    productList: [], // 用到该总成的产品信息集合，[{productName: '', productCount: ''}]
                    productTotalCount: 0 // 用到该总成的产品总数
                }
            }

            acc[relateItem.assemName].productList.push({
                productName: relateItem.productName,
                productCount: relateItem.productCount
            })
            acc[relateItem.assemName].productTotalCount += relateItem.productCount

            return acc
        }, {})


        // 计算总成的在制生产数
        Object.values(bomItem.relateListMap).forEach((item) => {

            if (Object.keys(bomItem.relateListMap).length === 1) {
                bomItem.producingCount = item.producingCount
            } else {
                bomItem.producingCount += Math.min(item.producingCount, item.productTotalCount)
            }

            if (bomItem.remark?.trim() === '2个') {
                bomItem.needCount += 2 * item.productTotalCount
            } else {
                bomItem.needCount += item.productTotalCount
            }
        })



        let stockCount = materialMonitorStore.stockMap[bomItem.code]?.count
        let arrivedCount = materialMonitorStore.arrivedMap[bomItem.code]?.count


        bomItem.stockCount = stockCount // 库存数
        bomItem.arrivedCount = arrivedCount // 当月来料数
        bomItem.oweCount = bomItem.needCount - (bomItem.producingCount || 0) - (bomItem.stockCount || 0) - (bomItem.arrivedCount || 0)
    })

    result.value.data = Object.values(resultMap)
    console.log(Object.values(resultMap))
}

setTimeout(() => {
    calc()
})



const clearData = () => {

}
</script>
