<template>
  <div class="goods">
    <el-card class="box-card" shadow="never">
      <el-form ref="ruleFormRef" :model="ruleForm.data" :rules="rules" label-width="150px" class="demo-ruleForm"
        :size="formSize">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="ruleForm.data.goods_name" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="ruleForm.data.category_id" :disabled="Route.name === 'editgoods'" placeholder="请选择">
            <el-option v-for="(item, index) in categoryColumn.arr" :key="index" :label="item['category_name']"
              :value="item['category_id']" />
          </el-select>
        </el-form-item>
        <el-form-item label="货号" prop="article_number">
          <el-input v-model="ruleForm.data.article_number" :disabled="Route.name === 'editgoods'" />
        </el-form-item>
        <el-form-item label="商品简介" prop="infor">
          <el-input v-model="ruleForm.data.infor" type="textarea" />
        </el-form-item>
        <!--  -->
        <Specification :specification="ruleForm" @updataList="updataList"></Specification>
        <!--  -->
        <el-form-item label="商品快照" prop="goods_avatar">
          <ImageUpload v-model="ruleForm.data.goods_avatar" v-if="Route.name === 'addinggoods'" :limit="1" />
          <ImageUpload v-model="ruleForm.data.goods_avatar"
            v-else-if="Route.name === 'editgoods' && ruleForm.data.goods_avatar !== null" :limit="1" />
        </el-form-item>
        <el-form-item label="商品轮播图" prop="goods_carousel">
          <ImageUpload v-model="ruleForm.data.goods_carousel" v-if="Route.name === 'addinggoods'" />
          <ImageUpload v-model="ruleForm.data.goods_carousel"
            v-else-if="Route.name === 'editgoods' && ruleForm.data.goods_carousel !== null" />
        </el-form-item>
        <el-form-item label="商品详细图" prop="goods_carousel">
          <ImageUpload v-model="ruleForm.data.goods_details" v-if="Route.name === 'addinggoods'" />
          <ImageUpload v-model="ruleForm.data.goods_details"
            v-else-if="Route.name === 'editgoods' && ruleForm.data.goods_details !== null" />
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
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import Specification from '@/components/Specification/index.vue';
import ImageUpload from '@/components/ImageUpload/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { getCategoryColumnList } from '@/api/category';
import { getGoods, addGoods, getArticleNumber, upDataGoods } from '@/api/goods';

interface T {
  [name: string]: any
}

const Router = useRouter()
const Route = useRoute()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  data: {
    goods_name: null,
    category_id: null,
    article_number: null,
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
  }
})

const categoryColumn = reactive({
  arr: []
})

// 查询货号是否存在
const getArticleNumberRule = (rule: any, value: any, callback: any) => {
  if (Route.name === 'addinggoods') {
    getArticleNumber(value).then(res => {
      if (res.data.data === '货号存在') {
        callback(new Error('货号已存在，请重新输入'))
      }
      if (res.data.data === '货号不存在') {
        callback()
      }
    })
  }
  else {
    callback()
  }
}

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
    {
      validator: getArticleNumberRule,
      trigger: 'blur'
    }
  ],
  infor: [
    {
      required: true,
      message: '请输入商品简介',
      trigger: 'change',
    },
  ],
  specification: [
    {
      required: true,
      message: '请输入商品规格',
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
  Number(Route.query.goods_id) ? getGoodsData(Number(Route.query.goods_id)) : null
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
function getGoodsData(goods_id: number) {
  getGoods(goods_id).then(res => {
    console.log(res);
    ruleForm.data = res.data.data
  })
}

// 更新规格
function updataList(data: any) {
  ruleForm.data.specification = data
}


// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (Route.name === 'addinggoods') {
        console.log('添加商品');
        addGoods(ruleForm.data).then(res => {
          console.log(res);
          ElMessage({
            message: res.data.data,
            type: 'success',
          })
        })
      }
      if (Route.name === 'editgoods') {
        console.log('编辑商品');
        upDataGoods(ruleForm.data).then(res => {
          console.log(res);
          ElMessage({
            message: res.data.data,
            type: 'success',
          })
          Router.replace('productlist')
        })
      }
    } else {
      console.log('error submit!', fields)
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