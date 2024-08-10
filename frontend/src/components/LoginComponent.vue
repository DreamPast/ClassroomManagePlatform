<template>
  <ElDialog :show-close="true" v-model="showModel" width="600px" top="30vh">
    <ElText
      style="
        font-size: 32px;
        width: calc(100%);
        text-align: center;
        display: block;
        padding-bottom: 16px;
      "
    >
      {{ isInLogin ? '登录' : '注册' }}
    </ElText>
    <ElForm label-width="auto" :rules="rules" style="padding-left: 12px; padding-right: 12px">
      <ElFormItem label="学号/工号" prop="UserId">
        <ElInput v-model="loginData.UserId"> </ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="Password">
        <ElInput v-model="loginData.Password" type="password"></ElInput>
      </ElFormItem>
      <ElFormItem label="重复密码" prop="ReplyPassword" v-if="!isInLogin">
        <ElInput v-model="loginData.ReplyPassword" type="password"></ElInput>
      </ElFormItem>
      <div style="width: calc(100%); text-align: center">
        <ElSpace>
          <ElButton @click="clickLogin" :type="isInLogin ? 'primary' : 'default'" :loading="loading"
            >登录</ElButton
          >
          <ElButton
            @click="clickRegister"
            :type="!isInLogin ? 'primary' : 'default'"
            :loading="loading"
            >注册</ElButton
          >
        </ElSpace>
      </div>
    </ElForm>
  </ElDialog>
</template>

<script setup lang="tsx">
import { APIError, GetErrorMessage } from '@/apis/request';
import { apiUserLogin } from '@/apis/user';
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElSpace,
  ElText,
  type FormRules,
} from 'element-plus';
import { reactive, ref } from 'vue';

const showModel = defineModel<boolean>();
const loginData = reactive<{
  UserId: string;
  Password: string;
  ReplyPassword: string;
}>({ UserId: '', Password: '', ReplyPassword: '' });
const isInLogin = ref(true);
const loading = ref(false);

const rules = reactive<FormRules>({
  UserId: [
    {
      required: true,
      validator: () => (loginData.UserId ? undefined : new Error('请输入用户名')),
      trigger: 'blur',
    },
  ],
  Password: [
    {
      required: true,
      validator: () => (loginData.Password ? undefined : new Error('请输入密码')),
      trigger: 'blur',
    },
  ],
  ReplyPassword: [
    {
      required: true,
      validator: () => {
        if (!loginData.ReplyPassword) return new Error('请重复输入密码');
        if (loginData.ReplyPassword !== loginData.Password) return new Error('两次输入密码不一致');
      },
      trigger: ['change', 'blur'],
    },
  ],
});

const clickLogin = async () => {
  if (isInLogin.value == false) {
    isInLogin.value = true;
    return;
  }
  loading.value = true;
  try {
    await apiUserLogin({ UserId: loginData.UserId, Password: loginData.Password });
    ElMessage.success('登录成功');
    await new Promise((resolve) => setTimeout(resolve, 300));
    location.reload();
  } catch (e) {
    ElMessage.error(GetErrorMessage(e));
  } finally {
    loading.value = false;
  }
};
const clickRegister = async () => {
  if (isInLogin.value == true) {
    isInLogin.value = false;
    return;
  }
  loading.value = true;
  try {
    await apiUserLogin({ UserId: loginData.UserId, Password: loginData.Password });
    ElMessage.success('注册成功');
    await new Promise((resolve) => setTimeout(resolve, 300));
    isInLogin.value = true;
    loginData.ReplyPassword = '';
  } catch (e) {
    ElMessage.error(GetErrorMessage(e));
  } finally {
    loading.value = false;
  }
};
</script>
