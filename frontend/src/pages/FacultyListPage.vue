<template>
  <ElSpace fill wrap style="width: 100%" direction="horizontal">
    <ElCard v-for="item in faculties" :key="item.facultyId" shadow="hover">
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
import { apiFacultyList, type ApiFacultyInfo } from '@/apis/faculty';
import { ElCard, ElSpace } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

onMounted(async () => {
  faculties.value = await apiFacultyList();
});

const faculties = ref<ApiFacultyInfo[]>([]);

const $router = useRouter();
const handleClick = (item: ApiFacultyInfo) => {
  $router.push('/faculty/' + item.facultyId);
};
</script>
