<template>
  <ElSpace fill wrap style="width: 100%" direction="horizontal">
    <ElCard v-for="item in faculties" :key="item.subjectId" shadow="hover">
      <template #header>
        <div
          class="card-header"
          :onclick="() => handleClick(item)"
          style="cursor: pointer; font-weight: bold"
        >
          {{ item.name }}
        </div>
      </template>
      <div style="font-size: medium">
        {{ item.introduction }}
      </div>
    </ElCard>
  </ElSpace>
</template>

<script lang="tsx" setup>
import { apiSubjectList, type ApiSubjectInfo } from '@/apis/subject';
import { ElCard, ElSpace } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

onMounted(async () => {
  faculties.value = await apiSubjectList();
});

const faculties = ref<ApiSubjectInfo[]>([]);

const $router = useRouter();
const handleClick = (item: ApiSubjectInfo) => {
  $router.push('/subject/' + item.subjectId);
};
</script>
