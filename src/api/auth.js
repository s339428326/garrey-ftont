import axiosInstance from './axiosInstance';

//登入取得用戶資訊
export const login = async (data) => {
  try {
    const res = await axiosInstance.post('/user/login', data);
    // console.log('[API 取得成功]', res);
    return res;
  } catch (error) {
    // console.log('[API 取得失敗]', error);
    return error;
  }
};

//驗證Token 正確性
export const isLogin = async () => {
  try {
    const res = await axiosInstance.post('/user/isLogin');
    // console.log('[API 取得成功]', res.data.user);
    return res.data.user;
  } catch (error) {
    // console.log('[API 取得失敗]', error);
    return error;
  }
};

//註冊
export const singup = async (data) => {
  console.log(data);
  try {
    const res = await axiosInstance.post('/user/singup', data);
    // console.log('[API 取得成功]', res.data.user);
    return res.data.user;
  } catch (error) {
    console.log('[API 取得失敗]', error);
    return error;
  }
};
