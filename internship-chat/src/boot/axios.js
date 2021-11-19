import Vue from 'vue';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
  const { response } = error;
  return Promise.reject(response.data);
});

Vue.prototype.$api = axios;
Vue.prototype.$api = api;

export { axios, api };
