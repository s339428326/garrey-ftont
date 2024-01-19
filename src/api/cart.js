import axiosInstance from './axiosInstance';

export const getUserCart = async () => {
  try {
    const res = await axiosInstance.get('/cart');
    console.log(res);
    return res.data.cart;
  } catch (error) {
    console.log(error);
  }
};

export const addCartItem = async (id) => {
  try {
    const res = await axiosInstance.post(`/cart/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (id) => {
  console.log('axios', id);
  try {
    const res = await axiosInstance.delete(`/cart/${id}`);
    console.log('cart delete', res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllCartItem = async () => {
  try {
    const res = await axiosInstance.delete('/cart/');
    console.log(res.data.message);
  } catch (error) {
    console.log(error);
  }
};
