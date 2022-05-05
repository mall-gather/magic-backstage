<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <el-table-column prop="order_id" label="订单编号" />
    <el-table-column prop="consignee" label="收货人" width="180" />
    <el-table-column prop="telephone" label="手机号码" />
    <el-table-column prop="zipcode" label="邮政编码" />
    <el-table-column prop="address" label="收货地址">
      <template #default="scope">
        {{ areaCodeToChinese(scope.row.address_region.split(',')) + ' ' +
            scope.row.address_detailed
        }}
      </template>
    </el-table-column>
    <el-table-column prop="company_id" label="配送方式">
      <template #default="scope">
        <el-select v-model="scope.row.company_id" clearable placeholder="请选择物流">
          <el-option v-for="item in data.options" :key="item['company_id']" :label="item['company_name']" :value="item['company_id']" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="company_number" label="物流单号">
      <template #default="scope">
        <el-input v-model="scope.row.company_number" placeholder="请输入物流单号" />
      </template>
    </el-table-column>
  </el-table>
  <div class="btn">
    <el-button @click="btnCancel">取消</el-button>
    <el-button type="primary" @click="btnSure">确定</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOrder,getLogisticsCompany,updataOrderShipped } from '@/api/order';
import { areaCodeToChinese } from '@/utils/areaCode';

const Route = useRoute()
const Router = useRouter()

const data = reactive({
  tableData: [] as Array<any>,
  options: []
})

onMounted(() => {
  getData()
  getLogisticsCompanys()
})

// 获取表格数据
function getData() {
  data.tableData = []
  getOrder(String(Route.query.order_id)).then(res => {
    console.log(res);
    data.tableData.push(res.data.data)
  })
}
// 获取选择器数据
function getLogisticsCompanys(){
  getLogisticsCompany().then(res=>{
    console.log(res);
    data.options = res.data.data
  })
}

function btnSure() {
updataOrderShipped(data.tableData[0]).then(res=>{
  console.log(res);
  ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    Router.replace({
      path:'orderlist'
    })
})
}
function btnCancel() {
  Router.go(-1)
}

</script>

<style lang="less" scoped>
.el-table {
  margin: 20px 0 0 0;
}

.btn {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: center;
}
</style>