<template>
  <div class="data-list">
    <el-table ref="multipleTableRef" :border="true" :data="tableData" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="category_id" label="编号" width="120" />
      <el-table-column property="category_name" label="分类名称" width="200" />
      <el-table-column property="level" label="级别" width="200" />
      <el-table-column property="goodsNumber" label="商品数量" />
      <el-table-column label="分类栏是否显示" width="200">
        <template #default="scope">
          <el-switch v-model="scope.row.category_column" :inactive-value="0" :active-value="1" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="editCategories(scope.row.category_id)">编辑</el-button>
          <el-button type="danger" @click="deleteData(scope.row.category_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Categories v-model:dialogFormVisible="dialogFormVisible" :type="type" :categoryId="categoryId" @updataList="updataList" v-if="dialogFormVisible"></Categories>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ElTable } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import Categories from '@/components/Categories/index.vue';
import { deleteCategory } from '@/api/category';

interface Props {
  tableData: Array<Data>
}
const { tableData } = defineProps<Props>()
const emit = defineEmits(['updataList'])

interface Data {
  [name: string]: any;
}
const dialogFormVisible = ref(false)
const type = ref('修改')
const categoryId = ref()
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Data[]>([])

const handleSelectionChange = (val: Data[]) => {
  multipleSelection.value = val
}

function editCategories(category_id:number) {
  categoryId.value =category_id
  dialogFormVisible.value = true
}

function updataList(){
  emit('updataList')
}

function deleteData(category_id: number) {
  ElMessageBox.confirm(
    '是否删除该商品?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteCategory(category_id).then(res => {
        console.log(res);
        if (res.data.data === '删除成功') {
          ElMessage({
            showClose: true,
            type: 'success',
            message: '删除成功',
          })
        }
        if (res.data.data === '删除失败，该商品分类存在商品') {
          ElMessage({
            showClose: true,
            type: 'error',
            message: res.data.data,
          })
        }
        emit('updataList')
      }).catch(err => {
        console.log(err);
        ElMessage({
          showClose: true,
          type: 'error',
          message: '删除失败',
        })
        emit('updataList')
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}

</script>

<style lang="less" scoped>
.data-list {
  margin-top: 20px;
}
</style>