<template>
  <div class="data-list">
    <el-table ref="multipleTableRef" :border="true" :data="tableData" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="reason_id" label="编号" width="120" />
      <el-table-column property="reason_type" label="原因类型" width="200" />
      <el-table-column property="available" label="是否可用" width="200">
        <template #default="scope">
          <el-switch v-model="scope.row.available" :inactive-value="0" :active-value="1" />
        </template>
      </el-table-column>
      <el-table-column property="add_time" label="添加时间" width="200">
        <template #default="scope">
          {{ convertTime('yyyy-MM-dd hh:mm:ss', scope.row.add_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="editReason(scope.row.reason_id)">编辑</el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" @confirm="sureDeleteReason(scope.row.reason_id)"
            @cancel="cancelDeleteReason" :icon="InfoFilled" icon-color="#626AEF" title="是否取消删除?">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 编辑 -->
  <Dialog v-if="dialogEdit" v-model:dialogFormVisible="dialogEdit" title="编辑原因" width="25%" @updataLists="updataLists"
    @submit="editSubmit">
    <el-form :model="data.editForm" label-width="120px">
      <el-form-item label="原因类型">
        <el-input v-model="data.editForm.reason_type" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="data.editForm.available" :inactive-value="0" :active-value="1" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage,ElTable } from 'element-plus'
import {
  InfoFilled
} from '@element-plus/icons-vue'
import Dialog from './Dialog.vue';
import { convertTime } from '@/utils/times';
import { updataReason,deleteReason } from '@/api/order';

interface Data {
  reason_id: number,
  reason_type: string,
  available: number,
  add_time: string
}
interface Props {
  tableData: Array<Data>
}
const { tableData } = defineProps<Props>()
const emit = defineEmits(['updataLists'])

const dialogEdit = ref(false)
const data = reactive({
  editForm: {
    reason_id: 0,
    reason_type: '',
    available: 1
  }
})

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Data[]>([])

const handleSelectionChange = (val: Data[]) => {
  multipleSelection.value = val
}

// 编辑原因
function editReason(id: number) {
  tableData.map(item => {
    if (item.reason_id == id) {
      data.editForm.reason_id = item.reason_id
      data.editForm.reason_type = item.reason_type
      data.editForm.available = item.available
    }
  })
  dialogEdit.value = true
}

// 删除原因
// 确定
function sureDeleteReason(id: number){
  deleteReason(id).then(res=>{
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    updataLists()
  })
}
// 取消
function cancelDeleteReason(){
    ElMessage({
      showClose: true,
      message: '已取消',
    })
    updataLists()
}


// 提交修改
function editSubmit() {
  updataReason(data.editForm).then(res=>{
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    updataLists()
  })
}

// 更新数据
function updataLists() {
  emit('updataLists')
}

</script>

<style lang="less" scoped>
.data-list {
  margin-top: 20px;
}
</style>