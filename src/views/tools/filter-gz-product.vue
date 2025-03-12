<template>
    <div>
        <div class="card">
            <div style="display: flex; justify-content: space-between;">
                <div>过滤高正产品</div>

                <div style="display: flex;">
                    <el-upload accept=".xlsx" :before-upload="beforeUpload">
                        <el-button type="primary">上传产品列表</el-button>
                    </el-upload>

                </div>
            </div>
        </div>

        <div class="card">
            <el-table :data="tableData" stripe >
                <el-table-column type="index" label="序号" width="60" />

                <el-table-column v-for="(item, index) in tableCells" :prop="item.prop" :label="item.label" :key="index" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import loadExcel from "@/utils/loadExcel";
import { useProductStore } from '@/store'

const productStore  = useProductStore()

const tableCells = ref([])
const tableData = ref([])

const beforeUpload = (rawFile) => {
    loadExcel(rawFile)
        .then(excelArray => {
            tableCells.value = excelArray.slice(0, 1)[0].map((item, index) => {
                return {
                    prop: `${index}`,
                    label: item
                }
            })

            tableData.value = excelArray.slice(1).map(item => {
                return item.reduce((acc, rowItem, rowIndex) => {
                    acc[rowIndex] = rowItem
                    return acc
                }, {})
            }).filter(item => {
                return !!productStore.productListMap[item['0']]
            })
        })

    return false
}


</script>