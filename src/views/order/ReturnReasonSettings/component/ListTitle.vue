<template>
  <div class="list-title">
    <el-card class="box-card" shadow="never">
      <div class="left">
        <el-icon>
          <list />
        </el-icon>数据列表
      </div>
      <div class="right">
        <el-button @click="addReasons">添加</el-button>
      </div>
    </el-card>
  </div>
  <!-- t添加 -->
  <Dialog v-if="dialogAdd" v-model:dialogFormVisible="dialogAdd" title="添加原因" width="25%" @updataLists="updataLists"
    @submit="addSubmit">
    <el-form :model="data.addForm" label-width="120px">
      <el-form-item label="原因类型">
        <el-input v-model="data.addForm.reason_type" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="data.addForm.available" :inactive-value="0" :active-value="1" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { List } from '@element-plus/icons-vue';
import Dialog from './Dialog.vue';
import { addReason } from '@/api/order';

const emit = defineEmits(['updataLists'])
const dialogAdd = ref(false)
const data = reactive({
  addForm: {
    reason_type: null,
    available: 1
  }
})

// 添加原因
function addReasons() {
  dialogAdd.value = true
}

// 提交添加
function addSubmit() {
  addReason(data.addForm).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    updataLists()
    data.addForm = {
      reason_type: null,
      available: 1
    }
  }).catch(err=>{
    console.log(err);
    ElMessage({
      showClose: true,
      message: '添加失败',
      type: 'error',
    })
  })
}

// 更新数据
function updataLists() {
  emit('updataLists')
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;

  /deep/.el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.left {
      display: flex;
      align-items: center;

      >.el-icon {
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
}
</style>