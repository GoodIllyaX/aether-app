import apiClient from '../api/apiClient';

export interface SubclassDetail {
  index: string;
  name: string;
  desc: string[];
  class: { name: string; index: string };
}

export interface DndClass {
  index: string;
  name: string;
  url: string;
}

export interface SubclassDetail {
  index: string;
  name: string;
}

export interface ClassDetail {
  index: string;
  name: string;
  hit_die: number;
  proficiencies: { name: string }[];
  saving_throws: { name: string }[];
  starting_equipment: { equipment: { name: string }; quantity: number }[];
  subclasses: { index: string; name: string; url: string }[];
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

const getSubclassDetails = async (subclassIndex: string): Promise<SubclassDetail | null> => {
  try {
    const response = await apiClient.get(`/subclasses/${subclassIndex}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting subclass details: ${subclassIndex}`, error);
    return null;
  }
};

export { getClasses, getClassDetails, getSubclassDetails };