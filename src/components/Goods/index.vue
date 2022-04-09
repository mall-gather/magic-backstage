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
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="ruleForm.goods_name" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="ruleForm.category_id" placeholder="请选择">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="货号" prop="article_number">
          <el-input v-model="ruleForm.article_number" />
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_pic">
          <el-input v-model="ruleForm.goods_pic" />
        </el-form-item>
        <el-form-item label="商品简介" prop="infor">
          <el-input v-model="ruleForm.infor" type="textarea" />
        </el-form-item>
        <el-form-item label="商品快照">
          <ImageUpload v-model="ruleForm.goods_avatar" />
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
import { useRouter } from 'vue-router';

const Router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  goods_name: null,
  category_id: null,
  article_number:null,
  goods_pic: null,
  infor: null,
  goods_avatar: null,
  goods_carousel: null,
  goods_details: null
})

const rules = reactive({
  goods_name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  category_id: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  article_number: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  goods_pic: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  infor: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  goods_avatar: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  goods_carousel: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  goods_details: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})



// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
      console.log(ruleForm);
      
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
   Router.go(-1)
}
</script>

<style lang="less" scoped>
.box-card {
  width: 800px;
  margin: 0 auto;
}
</style>