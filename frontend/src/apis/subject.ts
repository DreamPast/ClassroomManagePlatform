import mockjs from 'mockjs';

export interface ApiSubjectInfo {
  subjectId: string;
  name: string;
  introduction: string;
  facultyId: string;
}

export async function apiSubjectList(facultyId?: string): Promise<ApiSubjectInfo[]> {
  return mockjs.mock({
    'list|5': [
      {
        'subjectId|+1': 1,
        name: '@ctitle',
        introduction: '@cparagraph(50)',
        facultyId: facultyId || '@integer(1, 10)',
      },
    ],
  }).list;
}

export async function apiSubjectGet(subjectId: string): Promise<ApiSubjectInfo> {
  return mockjs.mock({
    subjectId: subjectId,
    name: '@ctitle',
    introduction: '@cparagraph(50)',
    facultyId: '1',
  });
}
