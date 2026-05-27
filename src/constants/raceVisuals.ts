import { SUPABASE_CONFIG } from '../../config';

const BASE_URL = SUPABASE_CONFIG.ASSETS_URL;

export interface RaceVisual {
    color: string;
    icon: string;
}

export const RACE_VISUALS: Record<string, RaceVisual> = {
    'dragonborn': {
        color: '#BECFE4',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Air%20Genasi%201.png`,
    },
    'dwarf': {
        color: '#0E0915',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Drow%201.png`,
    },
    'elf': {
        color: '#1C1C1E',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Earth%20Genasi%201.png`,
    },
    'gnome': {
        color: '#BECFE4',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Firbolg%201.png`,
    },
    'half-elf': {
        color: '#CE0E0E',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Fire%20Genasi%201.png`,
    },
    'half-orc': {
        color: '#BECFE4',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Forest%20Gnome%201.png`,
    },
    'human': {
        color: '#BECFE4',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20High%20Elf%201.png`,
    },
    'tiefling': {
        color: '#CE0E0E',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Tiefling%201.png`,
    },
    'halfling': {
        color: '#BECFE4',
        icon: `${BASE_URL}/races/Race%20Icon%20-%20Triton%201.png`,
    },
};