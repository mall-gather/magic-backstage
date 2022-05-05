<template>
  <div class="check-order">
    <Steps :active="active"></Steps>
    <Basicinfo v-if="data.orderData" :orderData="data.orderData" @updataLists="updataLists"></Basicinfo>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import Steps from './component/Steps.vue';
import Basicinfo from './component/Basicinfo.vue';

import { getOrder } from '@/api/order';
import { useRoute } from 'vue-router';

const Route = useRoute()
const active = ref(0)
const data = reactive({
  orderData: null
})

onMounted(() => {
  getOrders()
})

function getOrders() {
  data.orderData = null
  getOrder(String(Route.query.order_id)).then(res => {
    console.log(res);
    data.orderData = res.data.data
    active.value = res.data.data.order_status
  })
}

// 更新数据
function updataLists() {
  getOrders()
}

</script>

<style lang="less" scoped>
</style>