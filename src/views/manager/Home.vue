<template>
  <div>

    <div class="card" style="line-height: 30px; margin-bottom: 10px;">
      <div>欢迎您，<span style="color: #1450aa">{{ user.name }}</span> 祝您今天过得开心！</div>
    </div>

  </div>
</template>

<script setup>
  import {reactive} from "vue";
  import request from "@/utils/request";
  import {Dish} from "@element-plus/icons-vue";
  import router from '@/router'
  const user = JSON.parse(localStorage.getItem('canteen-user') || '{}')

  const data = reactive({

  })

</script>