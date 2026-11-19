import axios from "axios";

const config = {
  API_BASE_URL: "../data",
};

const request = axios.create({
  baseURL: config.API_BASE_URL ?? "../data",
  timeout: 10000,
});

// 請求攔截器：例如自動帶 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem("CRA-authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 回應攔截器：成功直接回傳 data，失敗統一整理錯誤
request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? "發生未知錯誤";
    return Promise.reject(new Error(message, { cause: error }));
  },
);

export default request;
