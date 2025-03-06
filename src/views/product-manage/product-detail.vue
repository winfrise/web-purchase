<template>
  <div class="card">
      <el-form :model="formdata" label-width="100px" style="padding-right:50px;">
        <el-form-item label="零件名称">
          <el-input v-model="formdata.name" :disabled="pageAction === 'detail'"  placeholder="请输入零件名称" />
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="formdata.img" :disabled="pageAction === 'detail'"  placeholder="请输入图片地址" />
        </el-form-item>
        <el-form-item label="库存数">
          <el-input v-model="formdata.total" :disabled="pageAction === 'detail'"  placeholder="请输入库存数量" />
        </el-form-item>
        <el-form-item label="零件组合">
          <el-select v-model="formdata.partGroup" :disabled="pageAction === 'detail'" filterable placeholder="请选择供应商" value-key="id">
            <el-option
                v-for="item in partGroupList"
                :key="item.id"
                :label="item.name"
                :value="item"
            />
          </el-select>

          <el-table border :data="formdata.partGroup.partList" style="margin-top: 20px;">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="零件ID" prop="id"></el-table-column>
            <el-table-column label="数量" prop="count"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formdata.remarks" :disabled="pageAction === 'detail'" :rows="3" type="textarea" placeholder="请输入备注信息" />
        </el-form-item>

        <el-form-item>
            <el-button v-if="pageAction != 'detail'" type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue"
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import { useRoute } from 'vue-router';

const route = useRoute()
const formdata = ref({
  partGroup: []
})

const getDetail = () => {
  if (route.query.id) {
    request.get(`/product/detail?id=${route.query.id}`)
        .then(res => {
          formdata.value= res.data
        })
  }
}
getDetail()
const pageAction = ref(route.query.action || 'add')

const partGroupList = ref([])
const getPartGroupList = () => {
  request.get('/part-group/selectAll')
      .then(res => {
        partGroupList.value = (res.data || []).map(item => {
          return {...item, partList: JSON.parse(item.partList)}
        })
      })
}
getPartGroupList()



const save = () => {
  const data = {...formdata.value, partGroupId: formdata.value.partGroup.id}
  delete data.partGroup
  debugger
  request.request({
    method: data.id ? 'PUT' : 'POST',
    url: data.id ? '/product/update' : '/product/add',
    data
  }).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
    } else {
      ElMessage.error(res.msg)
    }
  })
}


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