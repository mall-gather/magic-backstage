<template>
  <el-dialog v-model="dialogVisible" @close="closeDialog" width="30%" title="订单跟踪">
    <el-steps direction="vertical">
      <el-step v-for="(item, index) in data.orderTracking" :key="index" status="process" :title="item['logistics_info']"
        :description="convertTime('yyyy-MM-dd hh:mm:ss', item['logistics_time'])" />
    </el-steps>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getOrderTracking } from '@/api/order';
import { convertTime } from '@/utils/times';

interface Props {
  dialogVisible: boolean;
  order_id: string;
}
const { dialogVisible = false, order_id } = defineProps<Props>()
const emit = defineEmits(['update:dialogVisible'])

const active = ref(0)
const data = reactive({
  orderTracking: []
})


function closeDialog() {
  emit('update:dialogVisible', false)
}

onMounted(() => {
  getDataList()
})

// 获取数据
function getDataList() {
  getOrderTracking(order_id).then(res => {
    console.log(res);
    data.orderTracking = res.data.data
    active.value = res.data.data.length-1
  })
}

</script>

<style lang="less" scoped>
</style>