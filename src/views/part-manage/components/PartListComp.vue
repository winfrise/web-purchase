<template>
  <div style="width: 100%;">
    <div>
      <el-button @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="modelValue">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="零件名称">
        <template #default="scope">
          <el-select v-model="scope.row.id">
            <el-option v-for="item in allPartList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="零件数量">
        <template #default="scope">
          <el-input-number style="width: 100px;" v-model="scope.row.count" :min="1" :max="10" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleRemove(scope.row.$index)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
  import { reactive, ref, defineProps,  defineEmits} from "vue";
  import request from "@/utils/request";

  defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);

  const partList = ref([])

  const handleAdd = () => {
    partList.value.push({
      id: '',
      count: ''
    })
    emit('update:modelValue', partList.value)
  }

  const handleRemove = (index) => {
    partList.value.splice(index, 1)
    emit('update:modelValue', partList.value)
  }

  const allPartList = ref([])
  const getPartList = () => {
    return request.get('/part/selectAll')
        .then(res => {
          allPartList.value = res.data || []
        })
  }
  getPartList()
</script>

<style scoped>

</style>