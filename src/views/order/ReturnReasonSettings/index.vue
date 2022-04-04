<template>
  <div class="return-reason-settings">
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
import { ref, reactive } from 'vue';

interface Data {
  id: number,
  reasonType: string,
  available: boolean,
  addTime: string
}

const tableData: Data[] = reactive([
  {
    id: 1,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
  },
  {
    id: 2,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
  },
  {
    id: 3,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
  },
  {
    id: 4,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
  },
  {
    id: 5,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
  },
  {
    id: 6,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
  },
  {
    id: 7,
    reasonType: '质量问题',
    available: true,
    addTime: '2022-04-04'
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