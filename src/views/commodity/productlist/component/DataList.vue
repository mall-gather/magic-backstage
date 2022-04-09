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
      <el-table-column property="goods_id" label="编号" width="120" />
      <el-table-column label="商品图片" width="200">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.goods_avatar" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column property="goods_name" label="商品名称" width="200" />
      <el-table-column property="goods_pic" label="价格" width="200" />
      <el-table-column property="article_number" label="货号" width="200" />
      <el-table-column label="库存" header-align="left" align="center" width="120">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" circle />
        </template>
      </el-table-column>
      <el-table-column property="sales" label="销量" width="200" />
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
import { Edit } from '@element-plus/icons-vue';

interface Props {
  tableData: Array<Data>
}

interface Data {
  [propName: string]: any;
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