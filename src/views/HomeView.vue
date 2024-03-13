<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import NoticeButton from '../components/NoticeButton.vue'
import { computed } from 'vue';
import SideBar from '../components/SideBar.vue'
import Tabs from '../components/Tabs.vue'
const route = useRoute();
const router = useRouter();
const username = localStorage.getItem('username') || '';

const breadcrumb = computed(() => {
  return {
    path: route.name,
    name: route.meta.name,
    fullPath: route.fullPath
  }
})

// 处理路由的封装函数
const handleRoute = (command: string) => {
  if (command === 'logout') {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    router.push('/login');
  }
  if (command === 'user') {
    router.push('/user');
  }
}
</script>

<template>
  <div class="fillcontain">
    <div class="header">
      <div class="logo">管理系统</div>
      <div class="right">
        <NoticeButton class="notice-button" />
        <!-- 下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleRoute">
          <span class="el-dropdown-link">
            <img class="avatar" src="../assets/user.jpg" alt="" />
            <span class="name"> {{ username }}</span>
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <el-container class="fillcontain">
      <!-- 侧边显示 -->
      <el-aside class="aside">
        <SideBar />
      </el-aside>
      <!-- 主显示 -->
      <el-main>
        <Tabs />
        <!-- header 面包屑 -->
        <el-breadcrumb separator="/" style="margin-bottom: 12px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-show="breadcrumb.path !== 'dashboard'">{{
          breadcrumb.name
        }}</el-breadcrumb-item>
        </el-breadcrumb>
        <RouterView v-slot="{ Component }">
          <!-- 根据文档，KeepAlive 必须是 component 标签的直接父元素 -->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </RouterView>
      </el-main>
    </el-container>

  </div>


</template>

<style lang="less" scoped>
.header {
  height: 48px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;

  .right {
    display: flex;
    align-items: center;

    .notice-button {
      margin: 0 6px;
    }

    .el-dropdown-link {

      .avatar {
        display: inline-block;
        height: 30px;
        width: 30px;
        margin-bottom: -8px;
      }

      .name {
        cursor: pointer;
        line-height: 48px;
        font-size: 16px;
        padding-left: 8px;
        padding-right: 8px;
        font-weight: 600;
      }
    }


  }
}

.el-container {
  height: calc(100% - 48px);

  .aside {
    width: 200px;
    height: 100%;
  }
}

a {
  img {
    width: 82px;
    padding-right: 12px;
    border-radius: inherit;
  }
}
</style>
