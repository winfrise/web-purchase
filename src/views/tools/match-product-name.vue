<template>
    <div>
        <div class="card">
            <div style="display: flex; justify-content: space-between;">
                <div>匹配产品</div>

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
import {ref} from 'vue'
import loadExcel from "@/utils/loadExcel";

const tableCells = ref([])
const tableData = ref([])

const beforeUpload = (rawFile) => {
    loadExcel(rawFile)
        .then(excelArray => {
            const cells = ['UDID',...excelArray.slice(0, 1)[0]]
            tableCells.value = cells.map((item, index) => ({prop: `${index}`, label: item}))

            tableData.value = excelArray.slice(1).map(item => {
                const originalName = item[0].trim()
                const newName = originalName.match(/^[\w-]+/)[0]

                // 添加新的列
                item.unshift(newName)

                const itemMap = item.reduce((acc, item, index) => {
                    acc[index] = item
                    return acc
                }, {})
                return itemMap

            })
        })

    return false
}

</script>