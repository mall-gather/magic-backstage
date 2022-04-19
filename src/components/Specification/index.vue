<template>
  <div class="specification-list">
    <el-form-item label="商品规格" prop="specification">
      <el-table :data="tableData.list" border style="width: 100%">
        <el-table-column prop="specification_value1" label="规格1">
          <template #header>
            <el-input v-model="tableData.specificationTitle.specification_name1" @change="updataList" size=" small"
              placeholder="请输入" />
          </template>
          <template #default="scope">
            <el-input v-model="scope.row.specification_value1" maxlength="10" @change="updataList" class="w-50 m-2"
              placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="specification_value2" label="规格2">
          <template #header>
            <el-input v-model="tableData.specificationTitle.specification_name2" @change="updataList" size=" small"
              placeholder="请输入" />
          </template>
          <template #default="scope">
            <el-input v-model="scope.row.specification_value2" maxlength="10" @change="updataList" class="w-50 m-2"
              placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="goods_pic" label="价格">
          <template #default="scope">
            <el-input v-model.number="scope.row.goods_pic" maxlength="10" @change="updataList" class="w-50 m-2"
              placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存">
          <template #default="scope">
            <el-input v-model.number="scope.row.inventory" maxlength="10" @change="updataList" class="w-50 m-2"
              placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button type="text" size="small" @click="deleteRow(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="add-specification" type="primary" @click="addSpecification" plain>添加规格</el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

interface Props {
  specification: any
}
const { specification } = defineProps<Props>()

const emit = defineEmits(['updataList'])

interface T {
  [name: string]: any
}
const tableData = reactive({
  specificationTitle: {
    specification_name1: null,
    specification_name2: null
  },
  list: [] as Array<T>
})

watch(specification, () => {
  if (specification.data.specification.length) {
    tableData.specificationTitle = {
      specification_name1: specification.data.specification[0].specification_name1,
      specification_name2: specification.data.specification[0].specification_name2
    }
    tableData.list = specification.data.specification
  }
})

function updataList() {
  tableData.list.map(item => {
    item.specification_name1 = tableData.specificationTitle.specification_name1
    item.specification_name2 = tableData.specificationTitle.specification_name2
    return item
  })
  emit('updataList', tableData.list)
}

function addSpecification() {
  tableData.list.push({
    specification_name1: null,
    specification_name2: null,
    specification_value1: null,
    specification_value2: null,
    goods_pic: null,
    inventory: null
  })
}

function deleteRow(index: number) {
  tableData.list.splice(index, 1)
}
</script>

<style lang="less" scoped>
.add-specification {
  margin-top: 10px;
}
</style>