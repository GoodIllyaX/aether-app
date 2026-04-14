import apiClient from '../api/apiClient';

export interface DndClass {
  index: string;
  name: string;
  url: string;
}

export interface ClassDetail {
  index: string;
  name: string;
  hit_die: number;
  proficiencies: { name: string }[];
  saving_throws: { name: string }[];
  starting_equipment: { equipment: { name: string }; quantity: number }[];
}

const getClasses = async (): Promise<DndClass[]> => {
  try {
    const response = await apiClient.get('/classes');
    return response.data.results;
  } catch (error) {
    console.error("Error getting classes list:", error);
    return [];
  }
};

const getClassDetails = async (classIndex: string): Promise<ClassDetail | null> => {
  try {
    const response = await apiClient.get(`/classes/${classIndex}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting details for class: ${classIndex}`, error);
    return null;
  }
};

export { getClasses, getClassDetails };