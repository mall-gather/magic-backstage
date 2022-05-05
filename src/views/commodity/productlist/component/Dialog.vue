<template>
  <el-dialog v-model="dialogTableVisible" @close="closeDialog" title="库存">
    <el-table :data="data.specificationList" border style="width: 100%">
      <el-table-column property="specification_value1" v-if="specification_name1" :label="specification_name1">
      </el-table-column>
      <el-table-column property="specification_value2" v-if="specification_name2" :label="specification_name2">
      </el-table-column>
      <el-table-column property="goods_pic" label="价格">
        <template #default="scope">
          <el-input v-model.number="scope.row.goods_pic" maxlength="10" class="w-50 m-2" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column property="inventory" label="库存">
        <template #default="scope">
          <el-input v-model.number="scope.row.inventory" maxlength="10" class="w-50 m-2" placeholder="请输入" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnSure">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getSpecification, upDataSpecification } from '@/api/goods';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
interface Props {
  dialogTableVisible: boolean;
  articleNumber: number;
}
const { dialogTableVisible, articleNumber } = defineProps<Props>()
const emit = defineEmits(['update:dialogTableVisible', 'updataLists'])

const data = reactive({
  specificationList: []
})
const specification_name1 = ref('')
const specification_name2 = ref('')

onMounted(() => {
  getSpecificationData()
})

function getSpecificationData() {
  getSpecification(articleNumber).then(res => {
    console.log(res);
    data.specificationList = res.data.data
    specification_name1.value = data.specificationList[0]['specification_name1']
    specification_name2.value = data.specificationList[0]['specification_name2']
  }).catch(err => {
    console.log(err);

  })
}

function closeDialog() {
  emit('updataLists')
  emit('update:dialogTableVisible', false)
}
function btnSure() {
  upDataSpecification(data.specificationList).then(res => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: res.data.data,
      type: 'success',
    })
    emit('updataLists')
    emit('update:dialogTableVisible', false)
  }).catch(err => {
    console.log(err);
    ElMessage({
      showClose: true,
      message: '修改失败.',
      type: 'error',
    })
  })
}
function btnCancel() {
  emit('updataLists')
  emit('update:dialogTableVisible', false)
}

</script>

<style lang="less" scoped>
.el-button--text {
  margin-right: 15px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>