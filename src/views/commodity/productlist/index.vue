<template>
  <div class="productlist">
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

import { ref } from 'vue';

interface Data {
  id: number,
  goodsImg: string,
  name: string,
  price: number,
  articleNumber: string,
  sales: number
}

const currentPage = ref(1)
const pageSize = ref(10)

const tableData: Data[] = [
  {
    id: 1,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  },
  {
    id: 2,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  },
  {
    id: 3,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  },
  {
    id: 4,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  },
  {
    id: 5,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  },
  {
    id: 6,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  },
  {
    id: 7,
    goodsImg: '123',
    name: '手机',
    price: 1000,
    articleNumber: '611000',
    sales: 111
  }
]

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

<style lang="less" scoped>
</style>