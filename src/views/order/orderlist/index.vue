<template>
  <div class="orderlist">
    <ListTitle></ListTitle>
    <DataList :tableData="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"></DataList>
    <Pagination
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import ListTitle from './component/ListTitle.vue';
import DataList from './component/DataList.vue';
import Pagination from '@/components/Pagination/index.vue';
import { reactive, ref } from 'vue';

interface Data {
  id: number,
  orderNumber: string,
  submissionTime: string,
  userAccount: string,
  orderAmount: number,
  paymentMethod: string,
  orderStatus: number
}

const tableData:Data[] = reactive([
  {
    id: 1,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
  {
    id: 2,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
  {
    id: 3,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
  {
    id: 4,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
  {
    id: 5,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
  {
    id: 6,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
  {
    id: 7,
    orderNumber: '1111',
    submissionTime: '2022-04-04',
    userAccount: 'text',
    orderAmount: 1000,
    paymentMethod: '支付宝',
    orderStatus: 1
  },
])

const currentPage = ref(1)
const pageSize = ref(10)

let total = ref(tableData.length)
/**
 * 计算页数公式：
 *    (当前页码-1)*每页的数据条数，当前页码*每页的数据条数-1
 *    slice((当前页码-1)*每页的数据条数，当前页码*每页的数据条数)
 */
function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

</script>

<style scoped>
</style>