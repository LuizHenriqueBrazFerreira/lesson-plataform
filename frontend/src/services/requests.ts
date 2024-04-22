import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL || 'http://localhost:3001',
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestPost = async (endpoint: string, body: any) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUpdate = async (endpoint: string, body: any) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export default api;
