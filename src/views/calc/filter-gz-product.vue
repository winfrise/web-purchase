<template>
    <div>
        <div class="card">
            <div style="display: flex; justify-content: space-between;">
                <div>过滤高正产品</div>

                <div style="display: flex;">
                    <el-upload accept=".xlsx" :before-upload="beforeUpload">
                        <el-button type="primary">上传产品列表</el-button>
                    </el-upload>

                    <el-button type="danger" @click="clearData" style="margin-left: 15px;">删除数据</el-button>
                </div>
            </div>
        </div>

        <div class="card">
            <el-table :data="resultStore.gzProductList" stripe >
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column prop="UDID" label="UDID" width="160" />
                <el-table-column prop="count" label="数量" width="60" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import loadExcel from "@/utils/loadExcel";
import { useProductStore, useResultStore } from '@/store'

const productStore = useProductStore()
const resultStore = useResultStore()

const beforeUpload = (rawFile) => {
    loadExcel(rawFile)
        .then(excelArray => {
            const result = excelArray.slice(1).map(item => {
                return {
                    UDID: item[0],
                    count: item[1]
                }
            }).filter(item => {
                debugger
                return productStore.productListMap[item.UDID]
            })
            resultStore.setGzProductList(result)
        })

    return false
}

const clearData = () => {
    ElMessageBox.confirm('是否确定删除？', '提示', { type: 'warning' })
        .then(() => {
            resultStore.clearGzProductList()
        })
}
</script>