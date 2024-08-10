<template>
  <!-- 展示各教学楼各楼层 -->
  <el-table :data="tableData" style="width: 61%" stripe>
    <el-table-column label="教学楼层" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="查询">
      <template #default="scope">
        <el-button size="small" @click="queryFloor(scope.$index, scope.row)">
          查询
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 展示指定某层的教室列表 -->
  <el-dialog v-model="classroomListVisible" title="教室列表" width="800">
    <el-table :data="classroomData" stripe style="width: 100%">
      <el-table-column label="教学楼层" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="查看已借出时间">
        <template #default="scope">
          <el-button size="small" @click="queryClassroom(scope.$index, scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="借用教室">
        <template #default="scope">
          <el-button plain @click="dateSelectVisible = true">
            借用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <!-- 展示指定教室的已借用时间 -->
  <el-dialog v-model="borrowedDatetimeVisible" title="已借用时间">
    <el-table :data="borrowedDatetimeData" stripe style="width: 100%">
      <el-table-column prop="startTime" label="借用开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="借用结束时间">
      </el-table-column>
    </el-table>
  </el-dialog>

  <!-- 借用教室日期时间选择 -->
  <el-dialog v-model="dateSelectVisible" title="Shipping address" width="800">
    <div class="block">
      <el-date-picker v-model="value2" type="datetimerange" start-placeholder="Start Date" end-placeholder="End Date"
        :default-time="defaultTime2" />
    </div>
    <el-button>取消</el-button>
    <el-button>提交</el-button>
  </el-dialog>


</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { format } from 'date-fns'

const value2 = ref('')
const defaultTime2: [Date, Date] = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
] // '12:00:00', '08:00:00'

const dateSelectVisible = ref(false)
const classroomListVisible = ref(false)
const borrowedDatetimeVisible = ref(false)

interface Floor {
  name: string
  id: string
}

const queryFloor = (index: number, row: Floor) => {
  classroomListVisible.value = !classroomListVisible.value
  console.log(index, row)
}

const queryClassroom = (index: number, row: Classroom) => {
  borrowedDatetimeVisible.value = !borrowedDatetimeVisible.value
  console.log(index, row)
}

const borrow = (index: number, row: Floor) => {
  console.log(index, row)
}

const tableData: Floor[] = [
  {
    name: '松江校区一教一楼',
    id: '1'
  },
  {
    name: '松江校区一教二楼',
    id: '2'
  },
  {
    name: '松江校区一教三楼',
    id: '3'
  },
  {
    name: '松江校区一教四楼',
    id: '4'
  },
  {
    name: '松江校区二教一楼',
    id: '5'
  },
  {
    name: '松江校区二教二楼',
    id: '6'
  },
  {
    name: '松江校区二教三楼',
    id: '7'
  },
  {
    name: '松江校区二教四楼',
    id: '8'
  },
]

interface Classroom {
  name: string,
  id: string
}

const classroomData: Classroom[] = [
  {
    name: '松2101',
    id: '2101'
  },
  {
    name: '松2122',
    id: '2122'
  },
  {
    name: '松2137',
    id: '2137'
  },
  {
    name: '松2229',
    id: '2229'
  },
]

interface BorrowedDatetime {
  id: string,
  startTime: string,
  endTime: string 
}

const borrowedDatetimeData: BorrowedDatetime[] = [
  {
    startTime: format(new Date('2024-09-01 08:15'), 'yyyy-MM-dd HH:mm'),
    endTime: format(new Date('2024-09-01 09:45'), 'yyyy-MM-dd HH:mm'),
    id: '1',
  },
  {
    startTime: format(new Date('2024-09-01 13:00'), 'yyyy-MM-dd HH:mm'),
    endTime: format(new Date('2024-09-01 15:35'), 'yyyy-MM-dd HH:mm'),
    id: '2',
  }
]

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
</style>