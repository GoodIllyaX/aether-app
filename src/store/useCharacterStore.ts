import { create } from 'zustand';

interface CharacterState {
  chosenClass: any | null;
  chosenRace: any | null;
  setChosenClass: (classData: any) => void;
  setChosenRace: (raceData: any) => void;
  reset: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  chosenClass: null,
  chosenRace: null,
  setChosenClass: (classData) => set({ chosenClass: classData }),
  setChosenRace: (raceData) => set({ chosenRace: raceData }),
  reset: () => set({ chosenClass: null, chosenRace: null }),
}));