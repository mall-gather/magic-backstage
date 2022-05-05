<template>
  <el-steps :active="active" align-center finish-status="success">
    <el-step title="提交订单" description="1" />
    <el-step title="支付订单" description="2" />
    <el-step title="平台发货" description="3" />
    <el-step title="确认收货" description="4" />
  </el-steps>
</template>

<script setup lang="ts">

interface Props {
  active: number
}
const { active = 0 } = defineProps<Props>()

</script>

<style lang="less" scoped>
</style>