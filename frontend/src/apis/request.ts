import axios, { type AxiosRequestConfig } from 'axios';

export const CreateAxiosInstance = (config?: AxiosRequestConfig) => {
  const instance = axios.create({
    timeout: 3000,
    baseURL: '/api',
    ...config,
  });

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.data.success !== true) throw new APIError(response.data);
      return Promise.resolve(response);
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

const request = CreateAxiosInstance({});
export default request;

export class APIError extends Error {
  raw: any;

  constructor(raw: any) {
    if (typeof raw == 'string') {
      super(raw);
      this.raw = raw;
    } else if (raw instanceof APIError) {
      super(raw.message);
      this.raw = raw.raw;
    } else if (typeof raw == 'object' && raw.success === false) {
      const msg = raw.message || '未知错误';
      super(msg);
      this.raw = raw;
    } else {
      // 接受其余类型防止构造失败
      super('未知错误');
      this.raw = raw;
    }
  }
}

export const GetErrorMessage = (error: any): string => {
  if (error instanceof Error) return error.message;
  else if (typeof error == 'string') return error;
  else {
    console.error(error);
    return '未知错误';
  }
};
