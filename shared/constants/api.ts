import Constants from 'expo-constants';
import axios from 'axios';



const { API_URL_DEV } = Constants.expoConfig?.extra || {};



const api = axios.create({
  baseURL: API_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;