import axiosInstance from './axiosInstance';

//取得瀏覽用戶前10名
export const getUserHotViewerTop10 = async () => {
  try {
    const res = await axiosInstance.get('/user/getUserHotViewerTop10');
    console.log('[get Top Viewer user]', res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//取得單一用戶資料
export const getUserData = async (id) => {
  try {
    const res = await axiosInstance.get(`/user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//增加用戶形象頁面瀏覽次數
export const addViewer = async (id) => {
  try {
    const res = await axiosInstance.post(`/user/addViewer/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 使用者編輯頁面
export const uploadAvatar = async (data) => {
  try {
    const res = await axiosInstance.post('/user/uploadAvatar', {
      avatar: data,
    });
    return res;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const uploadCover = async (data) => {
  try {
    const res = await axiosInstance.post('/user/uploadCover', {
      cover: data,
    });
    return res;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const uploadUserInfo = async (data) => {
  try {
    const res = await axiosInstance.post('/user/uploadInfo', data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const getUserArtwork = async (id) => {
  try {
    const res = await axiosInstance.get(`/user/${id}/artwork`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//藝術品最愛清單
export const getUserTrackArtwork = async () => {
  try {
    const res = await axiosInstance.get('/user/trackArtwork/all');

    return res.data.trackArtworkList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// addTrackArtwork
export const addTrackArtworkList = async (id) => {
  try {
    const res = await axiosInstance.post(`/user/trackArtwork/${id}`);
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const deleteTrackArtworkList = async (id) => {
  try {
    const res = await axiosInstance.delete(`/user/trackArtwork/${id}`);
  } catch (error) {
    console.error(error.response.data.message);
  }
};
