<template>
  <div class="productlist">
    <ListTitle></ListTitle>
    <DataList :tableData="tableData.arr.slice((currentPage - 1) * pageSize, currentPage * pageSize)"></DataList>
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

import { onMounted, reactive, ref } from 'vue';

// interface Data {
//   id: number;
//   goodsImg: string;
//   name: string;
//   price: number;
//   articleNumber: string;
//   sales: number;
//   [propName: string]: any;
// }

const currentPage = ref(1)
const pageSize = ref(10)

let tableData = reactive({
  arr:[]
})

let total = ref(tableData.arr.length)

onMounted(()=>{
  getGoodsLists()
})


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

function getGoodsLists(){
  getGoodsList().then(res=>{
    console.log(res);
    tableData.arr = res.data.data
  }).catch(err=>{
    console.log(err);
  })
}

</script>

<style lang="less" scoped>
</style>