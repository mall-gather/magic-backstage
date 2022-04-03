<template>
  <div class="data-list">
    <el-table
      ref="multipleTableRef"
      :border="true"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="编号" width="120" />
      <el-table-column property="name" label="分类名称" width="200" />
      <el-table-column property="level" label="级别" width="200" />
      <el-table-column property="goodsNumber" label="商品数量" />
      <el-table-column label="分类栏是否显示" width="200">
        <template #default="scope">
          <el-switch v-model="scope.row.categoryColumn" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button>编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ElTable } from 'element-plus'

interface Props {
  tableData: Array<Data>
}

interface Data {
  id: number,
  name: string,
  level: string,
  goodsNumber: number,
  categoryColumn: boolean,
}

const { tableData } = defineProps<Props>()

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Data[]>([])

const handleSelectionChange = (val: Data[]) => {
  multipleSelection.value = val
}

</script>

<style lang="less" scoped>
.data-list {
  margin-top: 20px;
}
</style>