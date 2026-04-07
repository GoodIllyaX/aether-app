import apiClient from '../api/apiClient';

export interface DndClass {
  index: string;
  name: string;
  url: string;
}

export const getClasses = async (): Promise<DndClass[]> => {
  try {
    const response = await apiClient.get('/classes');
    return response.data.results; 
  } catch (error) {
    console.error("Error getting classes:", error);
    return [];
  }
};