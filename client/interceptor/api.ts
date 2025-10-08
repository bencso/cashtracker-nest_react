import axios from "axios";
import Constants from 'expo-constants';
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

export default api;
