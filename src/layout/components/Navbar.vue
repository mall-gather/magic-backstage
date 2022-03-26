<template>
  <div class="navbar">
    <div class="left">
      <div class="hamburger-container" @click="collapse">
        <el-icon v-if="isCollapse">
          <expand />
        </el-icon>
        <el-icon v-else>
          <fold />
        </el-icon>
      </div>
    </div>
    <div class="middle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">promotion management</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img class="avatar-img" src="../../assets/img/avt.gif" />
          <i class="fas fa-caret-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Expand, Fold } from '@element-plus/icons-vue';

const emit = defineEmits(['collapse'])

const isCollapse = ref(false)

function collapse() {
  isCollapse.value = !isCollapse.value
  emit('collapse', isCollapse.value)
}

</script>

<style lang="less" scoped>
.left{
  .hamburger-container{
    padding: 0 15px;
    font-size: 20px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  display: block;
  align-items: center;
  .avatar-img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  i.fa-caret-down{
    vertical-align: bottom;
    margin: 0 0 0 10px;
  }
}

.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .middle {
    flex: 1;
  }
}
</style>
