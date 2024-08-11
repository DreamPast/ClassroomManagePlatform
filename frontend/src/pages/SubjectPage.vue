<template>
  <div style="font-weight: bold; font-size: 32px; padding-bottom: 16px">
    {{ facultyInfo?.name }}
  </div>
  <div style="font-size: medium">{{ facultyInfo?.introduction }}</div>
</template>

<script lang="tsx" setup>
import { apiFacultyGet, type ApiFacultyInfo } from '@/apis/faculty';
import { GetErrorMessage } from '@/apis/request';
import { apiSubjectList, type ApiSubjectInfo } from '@/apis/subject';
import { ElLoading, ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
const subjectId = $route.params['id'] + '';

const facultyInfo = ref<ApiFacultyInfo | undefined>();

onMounted(async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true });
  try {
    facultyInfo.value = await apiFacultyGet(subjectId);
    subjectList.value = await apiSubjectList(subjectId);
    // facultyInfo.value.introduction = facultyInfo.value.introduction.repeat(10);
    for (let i = 0; i < 4; ++i) subjectList.value = [...subjectList.value, ...subjectList.value];
  } catch (e) {
    ElMessage.error(GetErrorMessage(e));
  } finally {
    loadingInstance.close();
  }
});

const subjectList = ref<ApiSubjectInfo[]>([]);
</script>

<style>
.dialog-with-scroll .el-dialog__body {
  height: 100%;
}
</style>

<style scoped>
.title_content_flex {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
</style>
