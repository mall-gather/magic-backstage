<template>
  <el-menu
    default-active="/home"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="rgb(48, 65, 86)"
    text-color="rgb(191,203,217)"
    active-text-color="rgb(64,158,255)"
    :router="true"
  >
    <el-menu-item index="/home">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-sub-menu index="/commodity">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>商品</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/commodity/productlist">商品列表</el-menu-item>
        <el-menu-item index="/commodity/addinggoods">添加商品</el-menu-item>
        <el-menu-item index="/commodity/categories">商品分类</el-menu-item>
        <el-menu-item index="/commodity/producttypes">商品类型</el-menu-item>
        <el-menu-item index="/commodity/brandmanagement">品牌管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="/order">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>订单</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/order/orderlist">订单列表</el-menu-item>
        <el-menu-item index="/order/ordersettings">订单设置</el-menu-item>
        <el-menu-item index="/order/Returnrequestprocessing">退货申请处理</el-menu-item>
        <el-menu-item index="/order/ReturnReasonSettings">退货原因设置</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="/marketing">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>营销</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/marketing/listofseckillactivities">秒杀活动列表</el-menu-item>
        <el-menu-item index="/marketing/listofcoupons">优惠券列表</el-menu-item>
        <el-menu-item index="/marketing/brandrecommendation">品牌推荐</el-menu-item>
        <el-menu-item index="/marketing/newproduct">新品推荐</el-menu-item>
        <el-menu-item index="/marketing/popularrecommendation">人气推荐</el-menu-item>
        <el-menu-item index="/marketing/recommendedtopics">专题推荐</el-menu-item>
        <el-menu-item index="/marketing/adlist">广告列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="/permission">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>权限</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/permission/userlist">用户列表</el-menu-item>
        <el-menu-item index="/permission/rolelist">角色列表</el-menu-item>
        <el-menu-item index="/permission/menulist">菜单列表</el-menu-item>
        <el-menu-item index="/permission/listofresources">资源列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import {
  Location,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

interface Props {
  isCollapse: boolean;
}

const { isCollapse = false } = defineProps<Props>()

// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/deep/.el-menu--inline {
  background-color: #1f2d3d !important;
  .el-menu-item:hover {
    background-color: #001528 !important;
  }
}
/deep/.el-sub-menu.is-active > .el-sub-menu__title {
  color: #f4f4f5 !important;
}
/deep/.el-menu-item-group__title {
  padding: 0;
}
</style>