<template>
  <div class="common-layout">
    <ElContainer>
      <ElHeader>
        <ElMenu
          mode="horizontal"
          :default-active="activeIndex"
          @select="handleRouter"
          :ellipsis="false"
        >
          <ElMenuItem index="classroom">教室</ElMenuItem>
          <ElMenuItem index="faculty">学院</ElMenuItem>
          <ElMenuItem index="subject">专业</ElMenuItem>
          <ElMenuItem index="teacher">教师</ElMenuItem>
          <ElMenuItem index="course">课程</ElMenuItem>

          <ElMenuItem style="margin-left: auto" v-if="!crName" @click="handleLogin"
            >登录</ElMenuItem
          >
          <ElSubMenu index="" style="margin-left: auto" v-else>
            <template #title>{{ crName }}</template>
            <ElMenuItem @click="hanldeLogout">退出登录</ElMenuItem>
          </ElSubMenu>
        </ElMenu>
      </ElHeader>

      <ElMain>
        <slot></slot>
      </ElMain>

      <!-- <ElFooter> 数据库课程设计 2024 </ElFooter> -->
    </ElContainer>
    <ElBacktop :right="50" :bottom="50"></ElBacktop>
    <LoginComponent v-model="showLogin"> </LoginComponent>
  </div>
</template>

<script setup lang="tsx">
import {
  ElBacktop,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
} from 'element-plus';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoginComponent from './LoginComponent.vue';
import { apiUserLogout } from '@/apis/user';

const $router = useRouter();
const $route = useRoute();
const activeIndex = ref($route.path.split('/')[1] || 'classroom');

const crName = ref(localStorage.getItem('cr.Name'));

watch(
  () => localStorage.getItem('cr.name'),
  () => {},
);

watch(
  () => $route.path,
  () => (activeIndex.value = $route.path.split('/')[1] || 'classroom'),
);

const handleRouter = (index: string) => {
  window.location.pathname = index;
  // $router.push(index);
};
const hanldeLogout = async () => {
  await apiUserLogout();
  $router.go(0);
};

const showLogin = ref(false);
const handleLogin = () => {
  showLogin.value = true;
};
</script>
