import request from "./request";

const isProto = true;

export interface ApiCourseInfo {
    courseID: string,
    courseName: string,
    facultyID: string,
}

export async function apiCourseList(): Promise<ApiCourseInfo[]> {
    if (!isProto) {
        let ret: ApiCourseInfo[] = [];
        request({
            method: 'get',
            url: '/course/list/'
        })
        .then(res => {
            console.log
        })
        return ret;
    }
    else {
        return courseProtoList;
    }
}

const courseProtoList: ApiCourseInfo[] = [
    {
        courseID: '1',
        courseName: '母猪的产后护理',
        facultyID: '1',
    },
    {
        courseID: '2',
        courseName: '椎名立希：说话的艺术',
        facultyID: '2',
    },
    {
        courseID: '3',
        courseName: '黑川赤音：请神术从入门到精通',
        facultyID: '2',
    },
    {
        courseID: '4',
        courseName: '和泉有希：吐槽役的养成',
        facultyID: '3',
    }
]
