<template>
  <div class="data-list">
    <el-table ref="multipleTableRef" :border="true" :data="tableData" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="order_id" label="订单编号" width="200" />
      <el-table-column property="create_time" label="提交时间" width="200">
        <template #default="scope">
          {{ submitTime(scope.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column property="u_name" label="用户账号" width="200" />
      <el-table-column property="goods_amount_tatol" label="订单金额" width="200" />
      <el-table-column property="pay_channel" label="支付方式" width="120" />
      <el-table-column property="order_status" label="订单状态" width="200">
        <template #default="scope">
          {{ orderStatus(scope.row.order_status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="checkOrder(scope.row.order_id)">查看订单</el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" @confirm="sureCloseOrder(scope.row.order_id)"
            @cancel="cancelCloseOrder" :icon="InfoFilled" icon-color="#626AEF" title="是否关闭订单?">
            <template #reference>
              <el-button v-if="scope.row.order_status === 1">关闭订单</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="scope.row.order_status === 2" @click="orderShipped(scope.row.order_id)">订单发货</el-button>
          <el-button v-if="scope.row.order_status === 3 || scope.row.order_status === 4"
            @click="orderTracking(scope.row.order_id)">订单跟踪
          </el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" @confirm="sureDeleteOrder(scope.row.order_id)"
            @cancel="cancelDeleteOrder" :icon="InfoFilled" icon-color="#626AEF" title="是否删除订单?">
            <template #reference>
              <el-button v-if="scope.row.order_status === (-1)" type="danger">
                删除订单
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <OrderTrack v-if="dialogVisible" v-model:dialogVisible="dialogVisible" :order_id="order_id"></OrderTrack>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElTable } from 'element-plus'
import {
  InfoFilled
} from '@element-plus/icons-vue'
import { convertTime } from '@/utils/times';
import { deleteOrder, updataCloseOrder } from '@/api/order';
import { useRouter } from 'vue-router';
import OrderTrack from '@/components/OrderTrack/index.vue';

interface Props {
  tableData: Array<Data>
}
const { tableData } = defineProps<Props>()
const emit = defineEmits(['updataDataList'])
const Router = useRouter()

interface Data {
  [nmae: string]: any
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Data[]>([])

const dialogVisible = ref(false)
const order_id = ref()

const handleSelectionChange = (val: Data[]) => {
  multipleSelection.value = val
}

// 提交时间
function submitTime(timestamp: number) {
  return convertTime('yyyy-MM-dd hh:mm:ss', timestamp)
}

// 订单状态
function orderStatus(order_status: number) {
  let orderStatus = ''
  switch (order_status) {
    case 1:
      orderStatus = '待付款'
      break;
    case 2:
      orderStatus = '待发货'
      break;
    case 3:
      orderStatus = '已发货'
      break;
    case 4:
      orderStatus = '已完成'
      break;
    case -1:
      orderStatus = '已关闭'
      break;
  }
  return orderStatus
}

// 查看订单
function checkOrder(order_id: string) {
  Router.push({
    path: 'checkorder',
    query: {
      order_id
    }
  })
}

// 订单跟踪
function orderTracking(orderId: string) {
  order_id.value = orderId
  dialogVisible.value = true
}
//订单发货
function orderShipped(order_id: string) {
  Router.push({
    path: 'ordershipped',
    query: {
      order_id
    }
  })
}

// 关闭订单
// 确定关闭订单
function sureCloseOrder(order_id: string) {
  updataCloseOrder(order_id).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    emit('updataDataList')
  })
}
// 取消关闭订单
function cancelCloseOrder() {
  ElMessage({
    showClose: true,
    message: '已取消.',
  })
}

// 删除订单
// 确定删除订单
function sureDeleteOrder(order_id: string) {
  deleteOrder(order_id).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    emit('updataDataList')
  })
}
// 取消删除订单
function cancelDeleteOrder() {
  ElMessage({
    showClose: true,
    message: '已取消.',
  })
}

</script>

<style lang="less" scoped>
.data-list {
  margin-top: 20px;
}
</style>