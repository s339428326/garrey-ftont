import axios from 'axios';

// 自訂axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 請求攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('token=')[1];
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

export default axiosInstance;
