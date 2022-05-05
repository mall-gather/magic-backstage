<template>
  <div class="orderlist">
    <ListTitle></ListTitle>
    <DataList :tableData="data.tableData" @updataDataList="updataDataList"></DataList>
    <Pagination :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import ListTitle from './component/ListTitle.vue';
import DataList from './component/DataList.vue';
import Pagination from '@/components/Pagination/index.vue';
import { onMounted, reactive, ref,watch } from 'vue';

import { getOrderList } from '@/api/order';

const data = reactive({
  tableData: []
})
const currentPage = ref(1)
const pageSize = ref(10)
let total = ref()

onMounted(() => {
  getOrderLists()
})

watch(currentPage,getOrderLists)
watch(pageSize,getOrderLists)

// 获取数据
function getOrderLists() {
  getOrderList(currentPage.value, pageSize.value).then(res => {
    console.log(res);
    data.tableData = res.data.data
    total.value = res.data.total
  })
}
function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

// 更新数据
function updataDataList(){
  getOrderLists()
}

</script>

<style scoped>
</style>