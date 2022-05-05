<template>
  <div class="categories-table">
    <el-dialog v-model="dialogFormVisible" @close="closeDialog" title="Shipping address">
      <el-form ref="ruleFormRef" :model="form.data" :rules="rules" label-width="120px">
        <el-form-item prop="category_name" label="分类名称">
          <el-input v-model="form.data.category_name" />
        </el-form-item>
        <el-form-item prop="level" label="级别">
          <el-select v-model="form.data.level" placeholder="请选择">
            <el-option v-for="(item, index) in form.options" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类栏是否显示">
          <el-switch v-model="form.data.category_column" :inactive-value="0" :active-value="1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="btnSure(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { addCategory, getCategory, upDataCategory } from '../../api/category'

interface Props {
  dialogFormVisible: boolean;
  categoryId?: number;
  type?: string;
}
const { dialogFormVisible = false, categoryId, type } = defineProps<Props>()

const emit = defineEmits(['update:dialogFormVisible', 'updataList'])

const ruleFormRef = ref<FormInstance>()
const form = reactive({
  data: {
    category_name: '',
    level: '',
    category_column: 1,
  },
  options: [
    {
      value: '一级',
      label: '一级'
    }
  ]
})

const rules = reactive<FormRules>({
  category_name: [
    { required: true, message: '请输入商品分类名称', trigger: 'blur' },
  ],
  level: [
    { required: true, message: '请选择商品分类级别', trigger: 'change' },
  ],
})

onMounted(() => {
  categoryId ? getCategorys() : null
})

// 获取数据
function getCategorys() {
  getCategory(categoryId).then(res => {
    form.data = res.data.data
  })
}

// 退出时回调
function closeDialog() {
  emit('updataList')
  emit('update:dialogFormVisible', false)
}
// 确定
async function btnSure(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (type === '添加') {
        addCategory(form.data).then((res) => {
          console.log(res);
          form.data = {
            category_name: '',
            level: '',
            category_column: 1,
          }
          if (res.data.data === '添加成功') {
            ElMessage({
              showClose: true,
              message: res.data.data,
              type: 'success',
            })
          } else {
            ElMessage({
              showClose: true,
              message: '添加失败',
              type: 'error',
            })
          }
          emit('updataList')
        })
      }
      if (type === '修改') {
        upDataCategory(form.data).then(res => {
          console.log(res);
          ElMessage({
            showClose: true,
            message: res.data.data,
            type: 'success',
          })
          emit('updataList')
        })
      }
      emit('update:dialogFormVisible', false)
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 取消
function btnCancel() {
  emit('updataList')
  emit('update:dialogFormVisible', false)
}
</script>

<style lang="less" scoped>
.box-card {
  width: 800px;
  margin: 0 auto;
}
</style>