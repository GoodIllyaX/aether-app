import apiClient from '../api/apiClient';
import myBackEndClient from '../api/BackEndClient';
// import { CURRENT_SESSION } from '../../config';
import { CURRENT_SESSION } from '../config.web';

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

export const characterService = {
  saveCharacter: async (characterData: any) => {
    const response = await myBackEndClient.post('/characters', characterData);
    return response.data;
  },

  getAllCharacters: async () => {
    const response = await myBackEndClient.get('/characters/all');
    return response.data;
  },

  getUserCharacters: async () => {
    const userName = CURRENT_SESSION.userName || 'Anonymous';
    const response = await myBackEndClient.get(`/characters/user/${userName}`);
    return response.data;
  }
};
export { getClasses, getClassDetails, getSubclassDetails };