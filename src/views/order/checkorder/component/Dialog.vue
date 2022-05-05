<template>
  <el-dialog v-model="dialogFormVisible" @close="closeDialog" :title="title">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnSure">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

interface Props {
  dialogFormVisible: boolean;
  title?: string;
}
const { dialogFormVisible = false, title = '' } = defineProps<Props>()
const emit = defineEmits(['update:dialogFormVisible', 'updataLists','submit'])

function closeDialog() {
  emit('updataLists')
  emit('update:dialogFormVisible', false)
}
function btnSure() {
  emit('submit')
  emit('update:dialogFormVisible', false)
}
function btnCancel() {
  emit('updataLists')
  emit('update:dialogFormVisible', false)
}
</script>

<style lang="less" scoped>
</style>