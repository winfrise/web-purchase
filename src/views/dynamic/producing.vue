
<template>
  <div>
    <div class="card">
      <el-form label-width="100px" style="padding-right:50px;">
        <el-form-item label="在制品部件拆分表">
          <el-upload
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
    <div class="card" style="margin-top: 10px; height: 1000px">

      <el-table  :data="tableData" border style="width: 100%; height: 100%; overflow: auto;">
        <el-table-column label="序号" type="index" fixed></el-table-column>
        <el-table-column
            v-for="(cell, cellIndex) in tableCells"
            :key="cellIndex"
            :prop="cell.prop"
            :label="`${cell.label}`"
            :width="cellIndex === 0 ? 250 : 200"
            :fixed="cellIndex === 0 ? true : false"
        />
      </el-table>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import * as XLSX from 'xlsx';


// 上传月度计划Eexcel表
const tableCells = ref([])
const tableData = ref([])

setTimeout(() => {
  const localTableCells = localStorage.getItem('producingTableCells')
  if (localTableCells) {
    tableCells.value = JSON.parse(localTableCells)
  }

  const localTableData = localStorage.getItem('producingTableData')
  if (localTableData) {
    tableData.value = JSON.parse(localTableData)
  }
})


const beforeUpload = (rawFile) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
    const worksheet = workbook.Sheets[sheetName]; // 获取工作表对象
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 转换为JSON，header: 1 表示第一行作为标题行
    

    tableCells.value = json.shift().map((item, index) => {
      return {
        label: item,
        prop: '' + index
      }
    })

    localStorage.setItem('producingTableCells', JSON.stringify(tableCells.value))

    tableData.value = json.map((row, rowIndex) => {
      return row.reduce((acc, item, index) => {
        if (item !== undefined) {
          acc[index] = item
        }
        return acc
      }, {})
    })
    
    localStorage.setItem('producingTableData', JSON.stringify(tableData.value))
  };
  reader.readAsArrayBuffer(rawFile);
  return false
}




</script>



<style scoped>

</style>