<template>
  <div class="data-list">
    <el-table ref="multipleTableRef" :border="true" :data="tableData" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="goods_id" label="编号" width="120" />
      <el-table-column label="商品图片" width="200">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.goods_avatar" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column property="goods_name" label="商品名称" width="200" />
      <el-table-column label="商品分类" width="200">
        <template #default="scope">
            {{categoryName(scope.row.category_id)}}
        </template>
      </el-table-column>
      <el-table-column property="article_number" label="货号" width="200" />
      <el-table-column label="库存" header-align="left" align="center" width="120">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" circle />
        </template>
      </el-table-column>
      <el-table-column property="sales" label="销量" width="200" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="edit(scope.row.goods_id)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref,computed, reactive, onMounted } from 'vue'
import type { ElTable } from 'element-plus'
import { Edit } from '@element-plus/icons-vue';

import {getCategoryColumnList} from '@/api/category';
import { useRouter } from 'vue-router';

interface Props {
  tableData: Array<Data>
}

interface Data {
  [propName: string]: any;
}

const Router = useRouter()

const { tableData } = defineProps<Props>()

const categoryList = reactive({
  arr:[]
})

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Data[]>([])

const handleSelectionChange = (val: Data[]) => {
  multipleSelection.value = val
}

function categoryName(categoryId:number){
  for (let index = 0; index < categoryList.arr.length; index++) {
    if(categoryId === categoryList.arr[index]['category_id']){
      return categoryList.arr[index]['category_name']
    }
  }
}

// 获取分类列表
onMounted(categoryLists)
function categoryLists(){
  getCategoryColumnList().then(res=>{
    categoryList.arr = res.data.data
  })
}

// 编辑
function edit(goods_id:number){
  Router.push({
    path:'editgoods',
    query:{
      goods_id
    }
  })
}

</script>

<style lang="less" scoped>
.data-list {
  margin-top: 20px;
}
</style>