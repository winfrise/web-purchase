<template>
  <div>

    <div class="card" style="margin-bottom: 10px;">
      <el-form ref="searchFormRef" inline :model="searchForm">
        <el-form-item label="产品名称" prop="name">
          <el-input style="width: 250px; margin-right: 10px" placeholder="请输入产品名称" v-model="searchForm.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="load">查询</el-button>
          <el-button type="info" style="margin: 0 10px" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>


    </div>

    <div class="card" style="margin-bottom: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="handleAdd">新增产品</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="70"/>
        <el-table-column prop="name" label="零件名称"/>
        <el-table-column prop="img" label="图片"/>
        <el-table-column prop="total" label="库存数量"/>
        <el-table-column prop="remarks" label="备注"/>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card" v-if="data.total">
      <el-pagination background layout="prev, pager, next" @current-change="load" :page-size="data.pageSize" v-model:current-page="data.pageNum" :total="data.total"/>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import { useRouter } from 'vue-router';

const router = useRouter()
const data = reactive({
  tableData: [],
  total: 0,
  pageNum: 1,  // 当前的页码
  pageSize: 5,  // 每页的个数
})
const searchForm = reactive({
  name: ''
})

const tableData = ref([])
const load = () => {
  const getList = () => {
    return request.get('/product/selectAll', {
      params: {
        name: searchForm.name
      }
    }).then(res => {
      tableData.value = res.data || []
    })
  }
  getList()
}


const searchFormRef = ref()
const reset = () => {
  searchFormRef.value.resetFields()
  load()
}

const handleAdd = () => {
  router.push(`/product/detail?action=add`)
}

const handleEdit = (row) => {
  router.push(`/product/detail?action=edit&id=${row.id}`)
}

const handleDetail = (row) => {
  router.push(`/product/detail?action=detail&id=${row.id}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm('删除后数据无法恢复，您确定删除吗', '确认删除', {type: 'warning'}).then(() => {
    request.delete('/product/delete/' + row.id).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  })
}

load()

</script>



<style scoped>
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>