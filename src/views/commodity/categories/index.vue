<template>
  <div class="categories">
    <ListTitle @updataList="updataList"></ListTitle>
    <DataList :tableData="data.tableData" @updataList="updataList"></DataList>
    <Pagination :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></Pagination>
  </div>
</template>

<script setup lang="ts">
import ListTitle from './component/ListTitle.vue';
import DataList from './component/DataList.vue';
import Pagination from '@/components/Pagination/index.vue';

import { onMounted, reactive, ref,watch } from 'vue';

import {getCategoryList} from '@/api/category';

const currentPage = ref(1)
const pageSize = ref(10)
const data = reactive({
  tableData:[]
})
let total = ref()

onMounted(()=>{
  getCategoryLists()
})


function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

watch(currentPage,getCategoryLists)
watch(pageSize,getCategoryLists)
// 获取数据
function getCategoryLists(){
  getCategoryList(currentPage.value,pageSize.value).then(res=>{
    console.log(res);
    total.value = res.data.total
    data.tableData = res.data.data
  })
}
function updataList(){
  getCategoryLists()
}
</script>

<style lang="less" scoped>
</style>