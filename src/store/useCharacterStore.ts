import { create } from 'zustand';

interface CharacterState {
  heroName: string | null;
  chosenClass: any | null;
  chosenArchetype: any | null;
  chosenRace: any | null;
  chosenSubrace: any | null;
  appearance: string;
  
  abilityScores: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
  selectedSkills: string[];

  background: string | null;
  backgroundStory: string;
  AppearanceHero: string;
  alignment: string;
  faith: string;
  ideal: string;
  bond: string;

  setHeroName: (name: string) => void;
  setChosenClass: (data: any) => void;
  setChosenArchetype: (data: any) => void;
  setChosenRace: (data: any) => void;
  setChosenSubrace: (data: any) => void;
  setAbilityScores: (scores: any) => void;
  setSelectedSkills: (skills: string[]) => void;
  
  setBackground: (bg: string) => void;
  setBackgroundStory: (story: string) => void;
  setAppearance: (text: string) => void;
  setAlignment: (align: string) => void;
  setFaith: (val: string) => void;
  setIdeal: (val: string) => void;
  setBond: (val: string) => void;

  reset: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  heroName: null,
  chosenClass: null,
  chosenArchetype: null,
  chosenRace: null,
  chosenSubrace: null,
  abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  selectedSkills: [],
  background: 'Acolyte',
  appearance: '',
  backgroundStory: '',
  AppearanceHero: '',
  alignment: 'True Neutral',
  faith: '',
  ideal: '',
  bond: '',

  setHeroName: (name) => set({ heroName: name }),
  setChosenClass: (data) => set({ chosenClass: data }),
  setChosenArchetype: (data) => set({ chosenArchetype: data }),
  setChosenRace: (data) => set({ chosenRace: data }),
  setChosenSubrace: (data) => set({ chosenSubrace: data }),
  setAbilityScores: (scores) => set({ abilityScores: scores }),
  setSelectedSkills: (skills) => set({ selectedSkills: skills }),
  
  setBackground: (bg) => set({ background: bg }),
  setBackgroundStory: (story) => set({ backgroundStory: story }),
  setAppearance: (text) => set({ appearance: text }),
  setAlignment: (align) => set({ alignment: align }),
  setFaith: (val) => set({ faith: val }),
  setIdeal: (val) => set({ ideal: val }),
  setBond: (val) => set({ bond: val }),

  reset: () => set({ 
    heroName: null, chosenClass: null, chosenArchetype: null, 
    chosenRace: null, chosenSubrace: null, selectedSkills: [],
    backgroundStory: '', appearance: '', alignment: 'True Neutral', faith: '', ideal: '', bond: ''
  }),
}));