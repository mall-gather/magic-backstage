<template>
  <div class="list-title">
    <el-card class="box-card" shadow="never">
      <div class="left">
        <el-icon>
          <list />
        </el-icon>数据列表
      </div>
      <div class="right">
        <el-button @click="addCategories">添加</el-button>
      </div>
    </el-card>

    <Categories v-model:dialogFormVisible="dialogFormVisible" :type="type" @updataList="updataList"></Categories>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { List } from '@element-plus/icons-vue';
import Categories from '@/components/Categories/index.vue';

const emit = defineEmits(['updataList'])

const dialogFormVisible = ref(false)
const type = ref('添加')

function addCategories(){
  dialogFormVisible.value = true
}
function updataList(){
  emit('updataList')
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