<template>
  <div class="goods">
    <el-card class="box-card" shadow="never">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="ruleForm.goods_name" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="ruleForm.category_id" placeholder="请选择">
            <el-option v-for="(item, index) in categoryColumn.arr" :key="index" :label="item['category_name']"
              :value="item['category_id']" />
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
        <!--  -->
        <Specification></Specification>
        <!--  -->
        <el-form-item label="商品快照" prop="goods_avatar">
          <ImageUpload v-model="ruleForm.goods_avatar" :limit="1" />
        </el-form-item>
        <el-form-item label="商品轮播图" prop="goods_carousel">
          <ImageUpload v-model="ruleForm.goods_carousel" />
        </el-form-item>
        <el-form-item label="商品详细图" prop="goods_carousel">
          <ImageUpload v-model="ruleForm.goods_details" />
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
import { onMounted, provide, reactive, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import Specification from '@/components/Specification/index.vue';
import ImageUpload from '@/components/ImageUpload/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { getCategoryColumnList } from '@/api/category';
import { getGoods } from '@/api/goods';

interface T {
  [name: string]: any
}

const Router = useRouter()
const Route = useRoute()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  goods_name: null,
  category_id: null,
  article_number: null,
  goods_pic: null,
  infor: null,
  // 规格
  specification_name1: null,
  specification_name2: null,
  checkList1: null,
  checkList2: null,
  specification: [] as Array<T>,
  // 图片
  goods_avatar: null,
  goods_carousel: null,
  goods_details: null
})

const categoryColumn = reactive({
  arr: []
})

const rules = reactive({
  goods_name: [
    { required: true, message: '请输入商品名字', trigger: 'blur' },
    { min: 1, max: 100, message: '长度应为 1 到 100', trigger: 'blur' },
  ],
  category_id: [
    {
      required: true,
      message: '请选择商品分类',
      trigger: 'change',
    },
  ],
  article_number: [
    {
      required: true,
      message: '请输入货号',
      trigger: 'change',
    },
  ],
  goods_pic: [
    {
      required: true,
      message: '请输入商品价格',
      trigger: 'change',
    },
  ],
  infor: [
    {
      type: 'date',
      required: true,
      message: '请输入商品简介',
      trigger: 'change',
    },
  ],
  type_value: [
    {
      required: true,
      message: '请选择属性类型',
      trigger: 'change',
    },
  ],
  goods_avatar: [
    {
      required: true,
      message: '请上传商品快照',
      trigger: 'change',
    },
  ],
  goods_carousel: [
    {
      required: true,
      message: '请上传商品轮播图',
      trigger: 'change',
    },
  ],
  goods_details: [
    {
      required: true,
      message: '请上传商品详细图',
      trigger: 'change',
    },
  ],
})


onMounted(() => {
  getCategoryColumn()
  Number(Route.query.goods_id)?getGoodsData(Number(Route.query.goods_id)):null
})

// 通过id获取分类栏
function getCategoryColumn() {
  getCategoryColumnList().then(res => {
    categoryColumn.arr = res.data.data
  }).catch(err => {
    console.log(err);
  })
}

// 获取商品数据
function getGoodsData(goods_id:number) {
  getGoods(goods_id).then(res => {
    console.log(res);
  })
}


// 规格
provide('specificationList', specificationList)
function specificationList(data: any) {
  ruleForm.specification_name1 = data.specification_name1
  ruleForm.specification_name2 = data.specification_name2
  ruleForm.checkList1 = data.checkList1
  ruleForm.checkList2 = data.checkList2
}

// 更新规格
provide('upSpecificationList', upSpecificationList)
function upSpecificationList(data: any) {
  ruleForm.specification = data
}


// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (Route.name === 'addinggoods') {
        console.log('添加商品');

      }

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