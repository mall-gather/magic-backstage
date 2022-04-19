<template>
  <div class="list-title">
    <el-card class="box-card" shadow="never">
      <div class="left">
        <el-icon>
          <list />
        </el-icon>数据列表
      </div>
      <div class="right">
        <el-button @click="addGoods">添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { List } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const Router = useRouter()

function addGoods(){
  Router.push({
    path: 'addinggoods'
  })
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  /deep/.el-card__body{
    display: flex;
    justify-content: space-between;
    align-items: center;
    >.left{
      display: flex;
      align-items: center;
      >.el-icon{
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
}
</style>