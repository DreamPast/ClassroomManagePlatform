import request from './request';

export const apiUserLogin = async (arg: { UserId: string; Password: string }) => {
  // await request.post('/user/login', arg);
  localStorage.setItem('cr.UserId', arg.UserId);
  localStorage.setItem('cr.Name', '12');
  localStorage.setItem('cr.Token', 'hh');
};
export const apiUserRegister = async (args: { UserId: string; Password: string }) => {
  // await request.post('/user/register', args);
};
export const apiUserLogout = async () => {
  localStorage.removeItem('cr.UserId');
  localStorage.removeItem('cr.Name');
  localStorage.removeItem('cr.Token');
};
