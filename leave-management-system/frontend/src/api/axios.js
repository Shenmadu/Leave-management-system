import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // your Laravel backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
