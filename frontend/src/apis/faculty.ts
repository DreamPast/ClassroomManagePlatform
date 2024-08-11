import mockjs from 'mockjs';

export interface ApiFacultyInfo {
  facultyId: string;
  name: string;
  introduction: string;
}

export async function apiFacultyList(): Promise<ApiFacultyInfo[]> {
  return mockjs.mock({
    'list|20': [
      {
        'facultyId|+1': 1,
        name: '@cname',
        introduction: '@cparagraph(50)',
      },
    ],
  }).list;
}

export async function apiFacultyGet(facultyId: string): Promise<ApiFacultyInfo> {
  return mockjs.mock({
    facultyId: facultyId,
    name: '@cname',
    introduction: '@cparagraph(50)',
  });
}
