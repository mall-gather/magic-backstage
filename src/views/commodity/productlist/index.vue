<template>
  <div class="productlist">
    <ListTitle></ListTitle>
    <DataList :tableData="tableData.list"></DataList>
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

import {getGoodsList} from '@/api/goods';

import { onMounted, reactive, ref,watch } from 'vue';

const currentPage = ref(1)
const pageSize = ref(10)

let tableData = reactive({
  list:[]
})
let total = ref()

onMounted(()=>{
  getGoodsLists()
})

function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

watch(currentPage,getGoodsLists)
watch(pageSize,getGoodsLists)

function getGoodsLists(){
  getGoodsList(currentPage.value,pageSize.value).then(res=>{
    console.log(res);
    tableData.list = res.data.data
    total.value = res.data.total
  }).catch(err=>{
    console.log(err);
  })
}

</script>

<style lang="less" scoped>
</style>