<template>
  <div>

    <div class="card" style="margin-bottom: 10px;">
      <el-form ref="searchFormRef" inline :model="searchForm">
        <el-form-item label="零件名称" prop="name">
          <el-input style="width: 250px; margin-right: 10px" placeholder="请输入零件名称查询" v-model="searchForm.name"></el-input>
        </el-form-item>

        <el-form-item label="供应商" prop="supplierId">
          <el-select style="width: 250px;" v-model="searchForm.supplierId" filterable placeholder="请选择供应商">
            <el-option
                v-for="item in data.supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="load">查询</el-button>
          <el-button type="info" style="margin: 0 10px" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>


    </div>

    <div class="card" style="margin-bottom: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="handleAdd">新增组合</el-button>
      </div>
      <el-table :data="data.tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="70"/>
        <el-table-column prop="name" label="组合名称"/>
        <el-table-column prop="partList" label="零件列表">
          <template #default="scope">
            <el-tag v-for="item in scope.row.partList" :key="item.id">
              {{item.id}} * {{item.count}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注"/>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card" v-if="data.total">
      <el-pagination background layout="prev, pager, next" @current-change="load" :page-size="data.pageSize" v-model:current-page="data.pageNum" :total="data.total"/>
    </div>

    <el-dialog v-model="data.formVisible" title="信息" width="600px" destroy-on-close>
      <el-form :model="data.form" label-width="100px" style="padding-right:50px;">
        <el-form-item label="组合名称">
          <el-input v-model="data.form.name"  placeholder="请输入组合名称" />
        </el-form-item>
        <el-form-item label="零件列表">
          <PartListComp v-model="data.form.partList" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="data.form.remarks" autocomplete="off" :rows="3" type="textarea" placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.formVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import PartListComp from './components/PartListComp.vue'

const data = reactive({
  tableData: [],
  total: 0,
  pageNum: 1,  // 当前的页码
  pageSize: 5,  // 每页的个数
  formVisible: false,
  form: {},
})
const searchForm = reactive({
  name: '',
  supplierId: ''
})

const load = () => {
  const getList = () => {
    return request.get('/part-group/selectAll', {
      params: {
        name: searchForm.name,
        supplierId: searchForm.supplierId
      }
    }).then(res => {
      data.tableData = (res.data || []).map(item => {
        return {...item, partList: JSON.parse(item.partList)}
      })
      data.total= res.data.total
    })
  }

  const getSupplierList = () => {
    return request.get('/supplier/selectAll')
        .then(res => {
          data.supplierList = res.data || []
        })
  }

  Promise.all([getList(), getSupplierList()])
      .then(() => {
        data.supperListMap = data.supplierList.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {})
      })
}

const searchFormRef = ref()
const reset = () => {
  searchFormRef.value.resetFields()
  load()
}

const handleAdd = () => {
  data.formVisible = true
  data.form = {} // 初始化表单
}

const save = () => {
  const formdata = {...data.form, partList: JSON.stringify(data.form.partList)}
  request.request({
    method: data.form.id ? 'PUT' : 'POST',
    url: data.form.id ? '/part-group/update' : '/part-group/add',
    data: formdata
  }).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      data.formVisible = false
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formVisible = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('删除后数据无法恢复，您确定删除吗', '确认删除', {type: 'warning'}).then(() => {
    request.delete('/part-group/delete/' + id).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  })
}

const handleFileUpload = (file) => {
  data.form.avatar = file.data
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