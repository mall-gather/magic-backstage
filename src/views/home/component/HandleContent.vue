<template>
  <div class="handle-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>待处理事务</span>
        </div>
      </template>
      <div class="content">
        <div class="handle-item">
          <div class="item" v-for="item in handleList.slice(0,3)">
            <div class="title">{{item}}</div>
            <div class="message">(10)</div>
          </div>
        </div>
        <div class="handle-item">
          <div class="item" v-for="item in handleList.slice(3,6)">
            <div class="title">{{item}}</div>
            <div class="message">(10)</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';

const handleList = reactive([
  '待付款订单',
  '已完成订单',
  '待处理退款申请',
  '待发货订单',
  '已发货订单',
  '待处理退货订单',
])
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 480px;
}
.handle-content {
  margin-top: 20px;
  .el-card {
    width: 80%;
    margin: 0 auto;
  }
  .content {
    // display: flex;
    // justify-content: flex-start;
    .handle-item {
      display: flex;
      .item {
        width: 33%;
        display: flex;
        justify-content: space-between;
        padding:10px;
        margin: 0 10px;
        border-bottom: 1px solid #ebeef5;
        .title {
          font-size: 16px;
          color: #606266;
        }
        .message {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>