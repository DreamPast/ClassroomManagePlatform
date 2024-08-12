<template>
  <!-- 展示各教学楼各楼层 -->
  <div style="text-align: -webkit-center">
    <li v-for="(floor, i) in floorList">
      <el-card v-if="i % 2 == 0" style="width: 60%; background-color: #FFFFFF;" shadow="hover" @click="queryClassroomList(floor)">{{ floor.name }}</el-card>
      <el-card v-if="i % 2 == 1" style="width: 60%; background-color: #FAFCFF;" shadow="hover" @click="queryClassroomList(floor)">{{ floor.name }}</el-card>
    </li>
  </div>

  <!-- 展示各教学楼各楼层 -->
  <!-- <el-table :data="floorList" style="width: 61%" stripe>
    <el-table-column label="教学楼层" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="查询">
      <template #default="scope">
        <el-button size="small" @click="queryClassroomList(scope.$index, scope.row)"> 查询 </el-button>
      </template>
    </el-table-column>
  </el-table> -->

  <!-- 展示指定某层的教室列表 -->
  <el-dialog v-model="classroomListVisible" title="教室列表" width="800">
    <el-table :data="classroomList" stripe style="width: 100%">
      <el-table-column label="教学楼层" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="查看已借出时间">
        <template #default="scope">
          <el-button size="small" @click="queryBorroredTimeList(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="借用教室">
        <template #default="scope">
          <el-button plain @click="queryTimeSelector(scope.row)"> 借用 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <!-- 展示指定教室的已借用时间 -->
  <el-dialog v-model="borrowedTimeVisible" title="已借用时间">
    <el-table :data="borrowedTimeList" stripe style="width: 100%">
      <el-table-column prop="startTime" label="借用开始时间"> </el-table-column>
      <el-table-column prop="endTime" label="借用结束时间"> </el-table-column>
    </el-table>
  </el-dialog>

  <!-- 借用教室日期时间选择 -->
  <el-dialog v-model="dateSelectVisible" title="选择借用时间" width="800">
    <div class="block">
      <el-date-picker type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="defaultTime"
        v-model="borrowedTime" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" />
    </div>
    <el-button @click="dateSelectVisible = !dateSelectVisible">取消</el-button>
    <el-button @click="submitBorrowedTime">提交</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { apiFloorList, type ApiFloorInfo } from '@/apis/classroom';
import { apiClassroomList, type ApiClassroomInfo } from '@/apis/classroom';
import { apiBorrowedTimeList, apiSubmitBorrowedTime, type ApiBorrowedTimeInfo } from '@/apis/classroom';

const defaultTime: [Date, Date] = [new Date(), new Date()];
const borrowedTime = ref(['', '']);

const dateSelectVisible = ref(false);
const classroomListVisible = ref(false);
const borrowedTimeVisible = ref(false);

const floorList = ref<ApiFloorInfo[]>([]);
const classroomList = ref<ApiClassroomInfo[]>([]);
const borrowedTimeList = ref<ApiBorrowedTimeInfo[]>([]);

const currentClassroom = ref<ApiClassroomInfo>({
  classroomID: '0',
  buildingID: '0',
  name: 'none',
});

onMounted(async () => {
  floorList.value = await apiFloorList();
})

const queryClassroomList = async (floor: ApiFloorInfo) => {
  classroomListVisible.value = !classroomListVisible.value;
  classroomList.value = await apiClassroomList(floor);
};

const queryBorroredTimeList = async (classroom: ApiClassroomInfo) => {
  borrowedTimeVisible.value = !borrowedTimeVisible.value;
  borrowedTimeList.value = await apiBorrowedTimeList(classroom);
};

const queryTimeSelector = (classroom: ApiClassroomInfo) => {
  dateSelectVisible.value = !dateSelectVisible.value;
  currentClassroom.value = classroom;
}

const submitBorrowedTime = async () => {
  console.log('[test][submit]')
  console.log(`[test]${borrowedTime.value}`)
  const data: ApiBorrowedTimeInfo = {
    userID: '0',
    classroomID: currentClassroom.value.classroomID,
    buildingID: currentClassroom.value.buildingID,
    startTime: borrowedTime.value[0],
    endTime: borrowedTime.value[1],
  }
  console.log(`[test][data]${data}`);

  if (borrowedTime.value[0] == '' && borrowedTime.value[1] == '') {
    alert('请选择时间');
  }
  else if (await apiSubmitBorrowedTime(data)) {
    alert('申请成功 ^_^')
  }
  else {
    alert('该时间已被占用 ToT')
  }
}
</script>

<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

li {
  list-style-type: none;
  margin: 10px;
}
</style>
