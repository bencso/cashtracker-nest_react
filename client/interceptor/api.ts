import axios from "axios";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshResponse = await api.post("/auth/refresh");

//         const tokens = {
//           access: refreshResponse.data.accessToken,
//           refresh: refreshResponse.data.refreshToken,
//         };
//         if (tokens) {
//           await SecureStore.setItemAsync("accessToken", String(tokens.access));
//           await SecureStore.setItemAsync(
//             "refreshToken",
//             String(tokens.refresh)
//           );
//           originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
//           return api(originalRequest);
//         }
//       } catch {
//         router.replace("/(notauth)/auth/login");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
