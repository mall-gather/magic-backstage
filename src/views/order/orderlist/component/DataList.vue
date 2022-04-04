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
      <el-table-column property="orderNumber" label="订单编号" width="200" />
      <el-table-column property="submissionTime" label="提交时间" width="200" />
      <el-table-column property="userAccount" label="用户账号" width="200" />
      <el-table-column property="orderAmount" label="订单金额" width="200" />
      <el-table-column property="paymentMethod" label="支付方式" width="120" />
      <el-table-column property="orderStatus" label="订单状态" width="200" />
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
  orderNumber: string,
  submissionTime: string,
  userAccount: string,
  orderAmount: number,
  paymentMethod: string,
  orderStatus: number
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