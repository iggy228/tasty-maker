import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TASTY_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_TASTY_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_TASTY_HOST
  },
  timeout: 5000,
  responseType: 'json'
});
