<template>
  <div class="categories">
    <ListTitle></ListTitle>
    <DataList :tableData="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"></DataList>
    <Pagination :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></Pagination>
  </div>
</template>

<script setup lang="ts">
import ListTitle from './component/ListTitle.vue';
import DataList from './component/DataList.vue';
import Pagination from '@/components/Pagination/index.vue';

import { ref } from 'vue';

interface Data {
  id: number,
  name: string,
  level: string,
  goodsNumber:number,
  categoryColumn:boolean,
}

const tableData: Data[] = [
  {
    id: 1,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
  {
    id: 2,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
  {
    id: 3,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
  {
    id: 4,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
  {
    id: 5,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
  {
    id: 6,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
  {
    id: 7,
    name: '手机',
    level: '一级',
    goodsNumber:1,
    categoryColumn:true
  },
]

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

<style lang="less" scoped>
</style>