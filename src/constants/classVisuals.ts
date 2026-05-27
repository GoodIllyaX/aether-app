import { SUPABASE_CONFIG } from '../config';

const BASE_URL = SUPABASE_CONFIG.ASSETS_URL;

export interface ClassVisual {
  color: string;
  listIcon: string;
  detailIcon: string;
  tagline: string;
}

export const CLASS_VISUALS: Record<string, ClassVisual> = {
  bard: {
    color: '#9B59B6',
    listIcon: `${BASE_URL}/class-icons-flat/Bard card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/Bard card.png`,
    tagline: 'An inspiring magician whose power echoes the music of creation.',
  },
  barbarian: {
    color: '#9B59B6',
    listIcon: `${BASE_URL}/class-icons-flat/barbarian card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/Class Icon - Barbarian 1.png`,
    tagline: 'A fierce warrior who can enter a battle rage to crush enemies.',
  },
  cleric: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/Cleric card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/Cleric card.png`,
    tagline: 'A priestly champion who wields divine magic in service of a higher power.',
  },
  druid: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/druid card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/druid card.png`,
    tagline: 'A priestly champion whoA priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
  },
  fighter: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/Warior card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/Warior card.png`,
    tagline: 'A master of martial combat, skilled with a variety of weapons and armor.',
  },
  monk: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/Monk card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/Monk card.png`,
    tagline: 'A master of martial arts, harnessing the power of the body in pursuit of spiritual perfection.',
  },
  paladin: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/paladin card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/paladin card.png`,
    tagline: 'A holy warrior bound to a sacred oath, combining martial skill with divine favor.',
  },
  ranger: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/ranger card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/ranger card.png`,
    tagline: 'A warrior who uses martial prowess and nature magic to hunt down foes on the edges of civilization.',
  },
  rogue: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/rogue card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/rogue card.png`,
    tagline: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
  },
  sorcerer: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/sorccer card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/sorccer card.png`,
    tagline: 'A spellcaster who draws on inborn magic from a bloodline or exotic cosmic origin.',
  },
  warlock: {
    color: '#F1C40F',
    listIcon: `${BASE_URL}/class-icons-flat/warlock card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/warlock card.png`,
    tagline: 'A wielder of magic that is derived from a bargain with an extraplanar entity.',
  },
  wizard: {
    color: '#3498DB',
    listIcon: `${BASE_URL}/class-icons-flat/wisard card.png`,
    detailIcon: `${BASE_URL}/class-icons-gradient/wisard card.png`,
    tagline: 'A scholarly magic-user capable of manipulating the structures of reality.',
  },
};

// export const DEFAULT_VISUAL = {
//   color: '#FFBF00',
//   icon: 'help-circle',
//   tagline: 'A brave adventurer seeking glory and power.',
// };

export const DEFAULT_VISUAL: ClassVisual = {
  color: '#7F8C8D',
  listIcon: `${BASE_URL}/class-icons-flat/Warrior card.png`,
  detailIcon: `${BASE_URL}/class-icons-gradient/Warrior card.png`,
  tagline: 'A versatile hero of the realm.',
};

export const UI_ASSETS = {
  mascot_big: `${BASE_URL}/ui-mascot/Mascot_Big.png`,
  mascot_small: `${BASE_URL}/ui-mascot/Mascot_Small.png`,
};