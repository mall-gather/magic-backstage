<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  total: number
}

const { total } = defineProps<Props>()
const emit = defineEmits(['handleSizeChange', 'handleCurrentChange'])

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

emit('handleSizeChange', pageSize.value)
emit('handleCurrentChange', currentPage.value)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  emit('handleSizeChange', pageSize.value)
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  emit('handleCurrentChange', currentPage.value)
}
</script>

<style lang="less" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block {
  background-color: #fff;
  padding: 20px 20px !important;
}
</style>