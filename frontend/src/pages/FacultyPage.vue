<template>
  <div style="display: flex">
    <div class="title_content_flex">
      <div style="font-weight: bold; font-size: 32px; padding-bottom: 16px">
        {{ facultyInfo?.name }}
      </div>
      <div style="font-size: medium">{{ facultyInfo?.introduction }}</div>
    </div>
    <div style="min-width: 150px; width: 100%; padding-left: 32px" class="title_content_flex">
      <div style="font-weight: bold; font-size: large; text-align: center; padding-bottom: 16px">
        下设专业
      </div>
      <ElSpace direction="vertical" fill style="width: 100%; margin-bottom: 16px">
        <ElCard
          v-for="item in subjectList"
          :key="item.subjectId"
          shadow="hover"
          :onclick="() => goSubject(item.subjectId)"
        >
          <span style="cursor: pointer">
            {{ item.name }}
          </span>
        </ElCard>
      </ElSpace>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { apiFacultyGet, type ApiFacultyInfo } from '@/apis/faculty';
import { GetErrorMessage } from '@/apis/request';
import { apiSubjectList, type ApiSubjectInfo } from '@/apis/subject';
import { ElCard, ElLink, ElLoading, ElMessage, ElSpace } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
const facultyId = $route.params['id'] + '';

const facultyInfo = ref<ApiFacultyInfo | undefined>();

onMounted(async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true });
  try {
    facultyInfo.value = await apiFacultyGet(facultyId);
    subjectList.value = await apiSubjectList(facultyId);
  } catch (e) {
    ElMessage.error(GetErrorMessage(e));
  } finally {
    loadingInstance.close();
  }
});

const subjectList = ref<ApiSubjectInfo[]>([]);

const goSubject = (subjectId: string) => {
  window.location.href = '/subject/' + subjectId;
};
</script>

<style scoped>
.title_content_flex {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
</style>
