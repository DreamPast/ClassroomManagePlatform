export async function apiUserLogin(arg: { UserId: string; Password: string }) {
  // await request.post('/user/login', arg);
  localStorage.setItem('cr.UserId', arg.UserId);
  localStorage.setItem('cr.Name', '12');
  localStorage.setItem('cr.Token', 'hh');
}
export async function apiUserRegister(args: { UserId: string; Password: string }) {
  return args || undefined;
  // await request.post('/user/register', args);
}
export async function apiUserLogout() {
  localStorage.removeItem('cr.UserId');
  localStorage.removeItem('cr.Name');
  localStorage.removeItem('cr.Token');
}
