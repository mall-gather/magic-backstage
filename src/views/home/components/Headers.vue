<template>
  <div class="headers">
    <el-card class="box-card" v-for="item in listHeader" :key="item.icon">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <div class="right">
        <div class="title">{{ item.title }}</div>
        <span>200</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import app from '../../../main';
import { List, WalletFilled, Coin } from '@element-plus/icons-vue';

app.component('list', List)
app.component('wallet-filled', WalletFilled)
app.component('coin', Coin)


interface List {
  icon: string,
  title: string
}

const listHeader: List[] = [
  {
    icon: 'list',
    title: '今日订单总数'
  },
  {
    icon: 'wallet-filled',
    title: '今日销售总额'
  },
  {
    icon: 'coin',
    title: '昨日销售总额'
  }
]
</script>

<style lang="less" scoped>
.headers {
  display: flex;
  // justify-content: center;
  justify-content:space-between;
  margin:0 auto;
  width:80%
}


.box-card {
  flex:1;
  margin: 0 20px;
  &:first-child,
  &:last-child {
    margin:0;
  }
}
.el-card /deep/.el-card__body {
  display: flex;
  align-items: center;
  .el-icon {
    font-size: 36px;
    margin: 0 10px 0 0;
    color: #409eff;
  }
  .right {
    .title {
      font-size: 16px;
      color: #909399;
      margin: 0 0 10px 0;
    }
    > span {
      font-size: 18px;
      color: #606266;
    }
  }
}
</style>