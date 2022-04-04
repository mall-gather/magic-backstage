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
      <el-table-column property="serviceNumber" label="服务单号" width="200" />
      <el-table-column property="applicationTime" label="申请时间" width="200" />
      <el-table-column property="userAccount" label="用户账号" width="200" />
      <el-table-column property="refundAmount" label="退款金额" width="120" />
      <el-table-column property="applicationStatus" label="申请状态" width="120" />
      <el-table-column property="processingTime" label="处理时间" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button>查看详情</el-button>
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
  serviceNumber: string,
  applicationTime:string,
  userAccount: string,
  refundAmount: number,
  applicationStatus: number,
  processingTime: string
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