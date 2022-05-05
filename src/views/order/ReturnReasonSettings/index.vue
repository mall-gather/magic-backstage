<template>
  <div class="return-reason-settings">
    <ListTitle @updataLists="updataLists"></ListTitle>
    <DataList v-if="data.tableData.length" :tableData="data.tableData" @updataLists="updataLists"></DataList>
    <Pagination :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import ListTitle from './component/ListTitle.vue';
import DataList from './component/DataList.vue';
import Pagination from '@/components/Pagination/index.vue';
import { ref, reactive, onMounted,watch } from 'vue';
import { getreturnreason } from '@/api/order';

const data = reactive({
  tableData: []
})


const currentPage = ref(1)
const pageSize = ref(10)

let total = ref()

function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

onMounted(() => {
  getreturnreasons()
})

watch(currentPage,getreturnreasons)
watch(pageSize,getreturnreasons)

// 获取列表数据
function getreturnreasons() {
  getreturnreason(currentPage.value, pageSize.value).then(res => {
    console.log(res);
    data.tableData = res.data.data
    total.value = res.data.total
  })
}

// 更新数据
function updataLists(){
  getreturnreasons()
}

</script>

<style scoped>
</style>