import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRaces = async () => {
  const response = await apiClient.get('/races');
  return response.data;
};

export const getRaceDetails = async (raceIndex: string) => {
  const response = await apiClient.get(`/races/${raceIndex}`);
  return response.data;
};

export const getSubraceDetails = async (subraceIndex: string) => {
  const response = await apiClient.get(`/subraces/${subraceIndex}`);
  return response.data;
};

export const getSkills = async () => {
  const response = await apiClient.get('/skills');
  return response.data;
};

export const getBackgrounds = async () => {
  const response = await apiClient.get('/backgrounds');
  return response.data;
};

export const getBackgroundDetails = async (index: string) => {
  const response = await apiClient.get(`/backgrounds/${index}`);
  return response.data;
};

export default apiClient;