<template>
  <div class="goods">
    <el-card class="box-card" shadow="never">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="商品分类" prop="categoriesName">
          <el-select v-model="ruleForm.categoriesName" placeholder="请选择">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="货号" prop="articleNumber">
          <el-input v-model="ruleForm.articleNumber" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price" />
        </el-form-item>
        <el-form-item label="商品简介" prop="introduction">
          <el-input v-model="ruleForm.introduction" type="textarea" />
        </el-form-item>
        <el-form-item label="商品快照">
          <ImageUpload />
        </el-form-item>
        <el-form-item label="商品轮播图">
          <ImageUpload />
        </el-form-item>
        <el-form-item label="商品详细图">
          <ImageUpload />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import ImageUpload from '@/components/ImageUpload/index.vue';

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: null,
  categoriesName: null,
  articleNumber:null,
  price: null,
  introduction: null,
  productSnapshot: null,
  productCarousel: null,
  productDetails: null
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  categoriesName: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  articleNumber: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  price: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  introduction: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  productSnapshot: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  productCarousel: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  productDetails: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.box-card {
  width: 800px;
  margin: 0 auto;
}
</style>