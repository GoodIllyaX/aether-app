import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;