
<template>
  <div>
    <div class="card">
      高正产品
    </div>
    <div class="card" style="margin-top: 10px;">

      <el-table border
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="产品型号" />
        <el-table-column label="是否有组成">
          <template #default="scope">
            <span>{{ scope.row.hasConsist ? "是" : "-" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script setup>
import {ref} from "vue"

const rawProduct = [
  'ES6KA', 'ES10ZKB', 'ES10ZLD', 'ES10ZRA', 'ES10ZRB', 
  'ES6ZX1-J402', 'ES6FA2', 'ES6FB', 'ES6FA', 'ES10ZKA', 
  'ES10ZKA', 'ES10WTA', 'ES11WMA', 'ES8ZXB', 'ES8ZXB', 
  'ES10WXB', 'ES8ZXC', 'ES6ZD', 'ES8ZTB', 'ES8ZTD', 
  'ES8ZTC', 'ES8ZTC1', 'ES10ZTB', 'ES10WTB', 'ES10ZTC-J301', 
  'ES10WTC', 'ESZ8HB1', 'ESZ8HB2', 'ES8ZXL', 'ES11ZXC1', 
  'ES11ZXC1', 'ES10ZXP', 'ES10ZXP', 'ES10ZXP', 'ES10ZXB',
  'ES10ZXB', 'ES10ZHB1', 'ES10ZXK-J308', 'ES10ZXA', 'ES11WA1', 
  'ES11WA5', 'ES6FA3', 'ES6FA5', 'ES6ZYA', 'ES7A-J202401', 
  'ES11ZG1', 'ES11ZXA', 'ES8ZXD', 'ES11ZXF', 'ES11ZD', 
  'ES11ZD', 'ES11ZDC', 'ES11ZDC1', 'ES8ZAE', 'ES8ZAE', 
  'ES8ZAG-J501', 'ES10ZDE', 'ES10ZMA', 'ES10ZMB', 'ES6MB', 
  'ES6L4', 'ES10ZHB2', 'ES8ZXK', 'ES8ZXK', 'ES8ZAD', 
  'ES8ZAD'
]

const localProductConsist = localStorage.getItem('product-consist')

const productConsist = JSON.parse(localProductConsist)

sessionStorage.setItem('product-gz', rawProduct.join(','))


const productList = ref(rawProduct)

const tableData = rawProduct.map(item => {
  return {name: item, hasConsist: !!productConsist[item]}
})

</script>



<style scoped>
.item {
  width: 200px;
}
</style>