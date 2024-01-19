import axiosInstance from './axiosInstance';

//查詢個人訂單
export const getUserOrder = async (id) => {
  console.log(id);
  try {
    const res = await axiosInstance.get(`/order/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//建立訂單
export const newOrder = async (data) => {
  console.log('接收orderData', data);
  try {
    const res = await axiosInstance.post(`/order/`, data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
