import axios from "axios";
import cookie from "../lib/cookie";
import { authApi } from "./auth";
import { HASH } from "../const";

const isClient = typeof window !== "undefined";

export const axiosForPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  withCredentials: true,
});

export const axiosForNextApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const axiosForPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  withCredentials: true,
});

axiosForPublic.interceptors.request.use(
  async function (config: any) {
    if (!isClient) return config;
    const controller = new AbortController();
    const locale = cookie.getCookie("NEXT_LOCALE");

    config.headers = {
      "Accept-Language": locale,
      ...config.headers,
    };

    return {
      ...config,
      signal: controller.signal,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for API calls
axiosForPrivate.interceptors.request.use(
  async (config: any) => {
    if (!isClient) return config;

    const locale = cookie.getCookie("NEXT_LOCALE");
    const token = cookie.getCookie("token");

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": locale,
      ...config.headers,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosForPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const hash = window.Telegram.WebApp.initData || HASH;

      originalRequest._retry = true;
      const token = await authApi.refresh(hash);

      console.log("Token refreshed", token);
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosForPrivate;
