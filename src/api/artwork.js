import axiosInstance from './axiosInstance';

export const getAllArtwork = async (data) => {
  let query = '';

  //data
  console.log('搜索', data);

  // //query string
  if (data.name) query += `name=${data.name}&`;
  if (data.tags.length) query += `tags=${data.tags}&`;
  if (data.isSold) query += `isSold=${data.isSold}&`;
  if (data.isBid === 'false') {
    query += `startDate[exists]=false&`;
  } else if (data.isBid === 'true') {
    query += `startDate[lte]=${new Date().toISOString()}&endDate[gte]=${new Date().toISOString()}&`;
  }
  if (data.startDate) query += `createAt[gte]=${data.startDate}&`;
  if (data.endDate) query += `createAt[lte]=${data.endDate}&`;
  if (data.currentItem) query += `currentItem=${data.currentItem}&`;
  // if (data.fields) query += `fields=${data.fields}&`;
  // if (data.limit) query += `limit=${data.limit}&`;
  // if (data.page) query += `page=${data.page}&`;

  console.log(`/artwork?${query}`);

  try {
    const res = await axiosInstance(`/artwork?isShow=true&${query}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log('[GET All Artwork]', error);
    return error;
  }
};

export const getOneArtwork = async (id) => {
  if (!id) return console.error('請求中請帶入id');
  try {
    const res = await axiosInstance(`/artwork/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log('[GET one Artwork]', error);
    return error;
  }
};

//artwork
export const createArtwork = async (data) => {
  try {
    const res = await axiosInstance.post('/artwork', data);
    console.log(res);
    return res;
  } catch (error) {
    console.log('[POST One Artwork]', error);
    return error.response.data.message;
  }
};

export const updateArtwork = async (id, data) => {
  try {
    const res = await axiosInstance.patch(`/artwork/${id}`, data);
    // console.log(res);
  } catch (error) {
    console.log('[PATCH One Artwork]', error);
    return error.response.data.message;
  }
};

export const deleteArtwork = async (id) => {
  try {
    const res = await axiosInstance.delete(`/artwork/${id}`);
    console.log(res);
  } catch (error) {
    console.log('[DELETE One Artwork]', error);
  }
};

//熱門標籤前5
export const tagsTop5 = async () => {
  try {
    const res = await axiosInstance.get(`/artwork/hotTagTop5`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//熱門觀看數前5
export const hotViewTop5 = async () => {
  try {
    const res = await axiosInstance.get(`/artwork/hotViewTop5`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//競標出價

/**
 *
 * @param {string} id  藝術品ID
 */
export const getArtworkBidData = async (id) => {
  try {
    const res = await axiosInstance.get(`/artwork/bid/${id}`);
    console.log('[get]出價API Data', res);
    return res.data.bidUserList;
  } catch (error) {
    console.log('[Error getArtworkBidData]:出價API出錯', error);
  }
};

/**
 *
 * @param {string} id  藝術品ID
 * @param {number} price 出價價格
 */
export const newBidData = async (id, price) => {
  console.log(id, price);
  if (!price) return console.error('price 沒有放入API中');
  if (typeof price !== 'number') return console.log('price 型別不是number');
  try {
    const res = await axiosInstance.post(`/artwork/bid/${id}`, { price });
    console.log('[post]出價API Data', res);
    return res;
  } catch (error) {
    console.error(
      '[Error newBidData]:出價API出錯',
      error.response.data.message
    );
    return error.response.data.message;
  }
};
