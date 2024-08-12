import { format } from 'date-fns';

import request from './request';

const isProto = true;

export interface ApiFloorInfo {
  floorID: string;
  buidingID: string;
  name: string;
}

export async function apiFloorList(): Promise<ApiFloorInfo[]> {
  if (!isProto) {
    let ret = <ApiFloorInfo[]>[];
    request({
      method: 'get',
      url: '/floor/list',
    })
      .then((res) => {
        console.log(`[test]${res}`);
        return <ApiFloorInfo[]>res.data;
      })
      .catch((err) => console.log(`[error]${err}`));
    return ret;
  } else {
    return floorProtoList;
  }
}

export interface ApiClassroomInfo {
  classroomID: string;
  buildingID: string;
  name: string;
}

export async function apiClassroomList(floor: ApiFloorInfo): Promise<ApiClassroomInfo[]> {
  console.log(`[test]${floor}`);
  if (!isProto) {
    let ret = <ApiClassroomInfo[]>[];
    request({
      method: 'post',
      url: `/classroom/`,
      data: floor,
    })
      .then((res) => {
        console.log(`[test]${res}`);
        return <ApiClassroomInfo[]>res.data;
      })
      .catch((err) => console.log(`[error]${err}`));
    return ret;
  } else if (Number(floor.floorID) % 2 == 0) {
    return classroomProtoList1;
  } else {
    return classroomProtoList2;
  }
}

export interface ApiBorrowedTimeInfo {
  userID: string,
  classroomID: string,
  buildingID: string,
  startTime: string;
  endTime: string;
}

export async function apiBorrowedTimeList(classroom: ApiClassroomInfo): Promise<ApiBorrowedTimeInfo[]> {
  if (!isProto) {
    let ret = <ApiBorrowedTimeInfo[]>[];
    request({
      method: 'post',
      url: `/borrowedTime/`,
      data: classroom,
    })
      .then((res) => {
        console.log(`[test]${res}`);
        return <ApiBorrowedTimeInfo[]>res.data;
      })
      .catch((err) => console.log(`[error]${err}`));
    return ret;
  } else {
    return borrowedTimeProtoList;
  }
}

export async function apiSubmitBorrowedTime(borrowedTime: ApiBorrowedTimeInfo): Promise<boolean> {
  if (!isProto) {
    request({
      method: 'post',
      url: '/borrowedTime/post/',
      data: borrowedTime,
    })
      .then((res) => {
        console.log(`[test]${res}`);
        return true;
      })
      .catch((err) => {
        console.log(`[error]${err}`);
        return false;
      });
  }
  if (Math.random() >= 0.5) {
    return true;
  } else {
    return false;
  }
}

const floorProtoList: ApiFloorInfo[] = [
  {
    floorID: '1',
    buidingID: '1',
    name: '松江校区一教一楼',
  },
  {
    floorID: '2',
    buidingID: '1',
    name: '松江校区一教二楼',
  },
  {
    floorID: '3',
    buidingID: '1',
    name: '松江校区一教三楼',
  },
  {
    floorID: '4',
    buidingID: '1',
    name: '松江校区一教四楼',
  },
  {
    floorID: '5',
    buidingID: '1',
    name: '松江校区二教一楼',
  },
  {
    floorID: '6',
    buidingID: '1',
    name: '松江校区二教二楼',
  },
  {
    floorID: '7',
    buidingID: '1',
    name: '松江校区二教三楼',
  },
  {
    floorID: '8',
    name: '松江校区二教四楼',
    buidingID: '1',
  },
];

const classroomProtoList1: ApiClassroomInfo[] = [
  { classroomID: '1101', name: '松1101', buildingID: '1' },
  {
    classroomID: '1111',
    name: '松1111',
    buildingID: '1',
  },
  {
    classroomID: '1137',
    name: '松1137',
    buildingID: '1',
  },
  {
    classroomID: '1119',
    name: '松1119',
    buildingID: '1',
  },
];

const classroomProtoList2: ApiClassroomInfo[] = [
  { classroomID: '2101', name: '松2101', buildingID: '2' },
  {
    classroomID: '2122',
    name: '松2122',
    buildingID: '2',
  },
  {
    classroomID: '2137',
    name: '松2137',
    buildingID: '2',
  },
  {
    classroomID: '2229',
    name: '松2229',
    buildingID: '2',
  },
];

const borrowedTimeProtoList: ApiBorrowedTimeInfo[] = [
  {
    userID: '1',
    classroomID: '11',
    buildingID: '1',
    startTime: format(new Date('2024-09-01 08:15'), 'yyyy-MM-dd HH:mm'),
    endTime: format(new Date('2024-09-01 09:45'), 'yyyy-MM-dd HH:mm'),
  },
  {
    userID: '2',
    classroomID: '22',
    buildingID: '2',
    startTime: format(new Date('2024-09-01 13:00'), 'yyyy-MM-dd HH:mm'),
    endTime: format(new Date('2024-09-01 15:35'), 'yyyy-MM-dd HH:mm'),
  },
];
