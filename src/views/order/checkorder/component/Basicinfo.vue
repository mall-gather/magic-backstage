<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="card-header-hint">
          <el-icon>
            <warning-filled />
          </el-icon>当前订单状态：{{ orderStatus(orderData.order_status) }}
        </span>
        <div>
          <el-button v-if="orderData.order_status === 1 || orderData.order_status === 2" class="button" @click="editConsigneeInfo">修改收货人信息</el-button>
          <el-button v-if="orderData.order_status === 1" class="button" @click="editCostInfo">修改费用信息</el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" @confirm="sureCloseOrder"
            @cancel="cancelCloseOrder" :icon="InfoFilled" icon-color="#626AEF" title="是否关闭订单?">
            <template #reference>
              <el-button v-if="orderData.order_status === 1" class="button">关闭订单</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" @confirm="sureCancelOrder"
            @cancel="cancelCancelOrder" :icon="InfoFilled" icon-color="#626AEF" title="是否取消订单?">
            <template #reference>
              <el-button v-if="orderData.order_status === 2" class="button">取消订单</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="orderData.order_status === 3" class="button" @click="orderTrack">订单跟踪</el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" @confirm="sureDeleteOrder"
            @cancel="cancelDeleteOrder" :icon="InfoFilled" icon-color="#626AEF" title="是否删除订单?">
            <template #reference>
              <el-button v-if="orderData.order_status === (-1)" class="button">删除订单</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="orderData.order_status === 1 || orderData.order_status === 2" class="button"
            @click="orderRemark">备注订单</el-button>
        </div>
      </div>
    </template>
    <!--  -->
    <div class="basic">
      <el-descriptions direction="vertical" :column="4" size="default" border>
        <template #title>
          <el-icon>
            <checked />
          </el-icon>
          基本信息
        </template>
        <el-descriptions-item label="订单编号">{{ orderData.order_id }}</el-descriptions-item>
        <el-descriptions-item label="提交时间">{{ convertTime('yyyy-MM-dd hh:mm:ss', orderData.create_time) }}
        </el-descriptions-item>
        <el-descriptions-item label="用户账号">{{ orderData.u_name }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{ orderData.pay_channel }}</el-descriptions-item>
        <el-descriptions-item label="配送方式">{{ orderData.company_id ? data.company : '暂无' }}
        </el-descriptions-item>
        <el-descriptions-item label="物流单号">{{ orderData.company_number ? orderData.company_number : '暂无' }}
        </el-descriptions-item>
        <el-descriptions-item label="自动确认收货时间">{{ orderData.end_time }}</el-descriptions-item>
        <el-descriptions-item label="订单备注">{{ orderData.note ? orderData.note : '暂无' }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" :column="4" size="default" border>
        <template #title>
          <el-icon>
            <checked />
          </el-icon>
          收货人信息
        </template>
        <el-descriptions-item label="收货人">{{ orderData.consignee }}</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{ orderData.telephone }}</el-descriptions-item>
        <el-descriptions-item label="邮政编码">{{ orderData.zipcode }}</el-descriptions-item>
        <el-descriptions-item label="收货地址">{{ areaCodeToChinese(orderData.address_region.split(',')) + ' ' +
            orderData.address_detailed
        }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="goods-info">
        <span class="goods-info-title">
          <el-icon>
            <checked />
          </el-icon>
          商品信息
        </span>
        <el-table :data="orderData.orderGoods" border style="width: 100%">
          <el-table-column prop="goods_avatar" label="商品图片" width="180">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.goods_avatar" fit="cover" />
            </template>
          </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="180" />
          <el-table-column prop="goods_pic" label="价格" />
          <el-table-column prop="specification_id" label="属性" />
          <el-table-column prop="goods_num" label="数量" />
          <el-table-column prop="goods_pic" label="合计">
          </el-table-column>
        </el-table>
        <div class="goods-info-footer">
          <div></div>
          <span>合计：<span class="total">{{ orderData.goods_amount_tatol }}</span></span>
        </div>
      </div>
      <el-descriptions direction="vertical" :column="4" size="default" border>
        <template #title>
          <el-icon>
            <checked />
          </el-icon>
          费用信息
        </template>
        <el-descriptions-item label="商品合计">￥{{ orderData.goods_amount_tatol }}</el-descriptions-item>
        <el-descriptions-item label="运费">￥{{ orderData.order_freight }}</el-descriptions-item>
        <el-descriptions-item label="优惠券">-￥{{ orderData.coupon_reduce ? orderData.coupon_reduce : 0 }}
        </el-descriptions-item>
        <el-descriptions-item label="应付款金额">￥{{ orderData.order_amount_tatal }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
  <!-- 修改收货人信息 -->
  <Dialog v-model:dialogFormVisible="dialogConsigneeInfo" title="修改收货人信息" @submit="submitConsigneeInfo">
    <el-form :model="data.consigneeInfo" label-width="120px">
      <el-form-item label="收货人姓名：">
        <el-input v-model="data.consigneeInfo.consignee" />
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="data.consigneeInfo.telephone" />
      </el-form-item>
      <el-form-item label="邮政编码：">
        <el-input v-model="data.consigneeInfo.zipcode" />
      </el-form-item>
      <el-form-item label="所在区域：">
        <el-cascader size="large" :options="data.options" v-model="data.selectedOptions" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input v-model="data.consigneeInfo.address_detailed" type="textarea" />
      </el-form-item>
    </el-form>
  </Dialog>

  <!-- 修改费用信息 -->
  <Dialog v-model:dialogFormVisible="dialogCostInfo" title="修改费用信息" @submit="submitCostInfo">
    <el-descriptions direction="vertical" :column="4" size="default" border>
      <template #title>
        <el-icon>
          <checked />
        </el-icon>
        费用信息
      </template>
      <el-descriptions-item label="商品合计">￥{{ orderData.goods_amount_tatol }}</el-descriptions-item>
      <el-descriptions-item label="运费" width="25%">
        <el-input v-model="data.costInfo.order_freight" :min="0" @input="orderFreight" placeholder="Please input">
          <template #prepend>￥</template>
        </el-input>
      </el-descriptions-item>
      <el-descriptions-item label="优惠券">-￥{{ orderData.coupon_reduce ? orderData.coupon_reduce : 0 }}
      </el-descriptions-item>
      <el-descriptions-item label="应付款金额">￥{{ data.costInfo.order_amount_tatal }}</el-descriptions-item>
    </el-descriptions>
  </Dialog>

  <!-- 订单跟踪 -->
  <OrderTrack v-if="dialogOrderTrack" v-model:dialogVisible="dialogOrderTrack" :order_id="orderData.order_id">
  </OrderTrack>

  <!-- 备注订单 -->
  <Dialog v-model:dialogFormVisible="dialogOrderRemark" title="备注订单" @submit="submitOrderRemark">
    <el-input v-model="data.orderRemark.note" type="textarea" />
  </Dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  WarningFilled,
  Checked,
  InfoFilled
} from '@element-plus/icons-vue'
import { regionData } from 'element-china-area-data'
import { reactive, ref, onMounted } from 'vue';
import Dialog from './Dialog.vue';
import OrderTrack from '@/components/OrderTrack/index.vue';

import { areaCodeToChinese } from '@/utils/areaCode';
import { convertTime } from '@/utils/times';
import listToString from '@/hooks/listToString';
import { updataConsigneeInfo, updataCostInfo, updataOrderRemark, deleteOrder, updataCloseOrder, queryLogisticsCompany } from '@/api/order';
import { useRouter } from 'vue-router';

interface T {
  [name: string]: any
}
interface Props {
  orderData: T
}
const { orderData } = defineProps<Props>()
const emit = defineEmits(['updataLists'])
const Router = useRouter()

const dialogConsigneeInfo = ref(false)
const dialogCostInfo = ref(false)
const dialogOrderTrack = ref(false)
const dialogOrderRemark = ref(false)
const data = reactive({
  consigneeInfo: {
    order_id: '',
    consignee: '',
    telephone: '',
    zipcode: '',
    address_region: '',
    address_detailed: ''
  },
  costInfo: {
    order_id: '',
    order_freight: 0,
    order_amount_tatal: 0
  },
  orderRemark: {
    order_id: '',
    note: ''
  },
  options: regionData,
  selectedOptions: [],
  company: ''
})

onMounted(()=>{
  logisticsCompany()
})

// 当前订单状态
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

// 物流公司
function logisticsCompany() {
  queryLogisticsCompany(orderData.company_id).then(res => {
    data.company = res.data.data.company_name
  })
}



// 修改收货人信息
function editConsigneeInfo() {
  data.consigneeInfo.order_id = orderData.order_id
  data.consigneeInfo.consignee = orderData.consignee
  data.consigneeInfo.telephone = orderData.telephone
  data.consigneeInfo.zipcode = orderData.zipcode
  data.consigneeInfo.address_region = orderData.address_region
  data.consigneeInfo.address_detailed = orderData.address_detailed
  data.selectedOptions = orderData.address_region.split(',')
  dialogConsigneeInfo.value = true
}
// 修改费用信息
function editCostInfo() {
  data.costInfo.order_id = orderData.order_id
  data.costInfo.order_freight = orderData.order_freight
  data.costInfo.order_amount_tatal = orderData.order_amount_tatal
  dialogCostInfo.value = true
}
// 订单跟踪
function orderTrack() {
  dialogOrderTrack.value = true
}
// 备注订单
function orderRemark() {
  data.orderRemark.order_id = orderData.order_id
  data.orderRemark.note = orderData.note
  dialogOrderRemark.value = true
}

// 三级联动选择器
function handleChange(value: Array<string>) {
  data.consigneeInfo.address_region = listToString(value)
}
// 运费表单修改时触发
function orderFreight(value: number) {
  data.costInfo.order_amount_tatal = orderData.goods_amount_tatol + Number(value)
}

// 修改收货人信息提交
function submitConsigneeInfo() {
  updataConsigneeInfo(data.consigneeInfo).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    updataLists()
  })
}
// 修改费用信息提交
function submitCostInfo() {
  updataCostInfo(data.costInfo).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    updataLists()
  })
}
// 备注订单
function submitOrderRemark() {
  updataOrderRemark(data.orderRemark).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    updataLists()
  })
}
// 关闭订单
// 确定关闭订单
function sureCloseOrder() {
  updataCloseOrder(orderData.order_id).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    Router.replace({
      path: 'orderlist'
    })
  })
}
// 取消关闭订单
function cancelCloseOrder() {
  ElMessage({
    showClose: true,
    message: '已取消.',
  })
}
// 取消订单
// 确定取消订单
function sureCancelOrder() {
  updataCloseOrder(orderData.order_id).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: '订单已取消',
      type: 'success',
    })
    Router.replace({
      path: 'orderlist'
    })
  })
}
// 取消取消订单
function cancelCancelOrder() {
  ElMessage({
    showClose: true,
    message: '已取消.',
  })
}
// 删除订单
// 确定删除订单
function sureDeleteOrder() {
  deleteOrder(orderData.order_id).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    Router.replace({
      path: 'orderlist'
    })
  })
}
// 取消删除订单
function cancelDeleteOrder() {
  ElMessage({
    showClose: true,
    message: '已取消.',
  })
}

// 更新信息
function updataLists() {
  emit('updataLists')
}

</script>

<style lang="less" scoped>
.box-card {
  /deep/.el-card__header {
    background-color: #f2f6fc;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .card-header-hint {
      display: flex;
      align-items: center;
      color: #f56c6c;

      .el-icon {
        font-size: 18px;
      }
    }
  }
}

.box-card {
  width: 80%;
  margin: 20px auto 0;

  .goods-info {
    margin: 20px 0 0 0;

    .goods-info-title {
      display: block;
      margin: 0 0 10px 0;
    }

    .goods-info-footer {
      display: flex;
      margin: 10px 0;

      >div {
        flex: 1;
      }

      >span {
        .total {
          color: #f56c6c;
        }
      }
    }
  }
}

.el-descriptions {
  margin-top: 20px;
}
</style>