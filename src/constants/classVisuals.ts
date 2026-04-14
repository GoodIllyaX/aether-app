export const CLASS_VISUALS: Record<string, { color: string; icon: string; tagline: string }> = {
  barbarian: {
    color: '#E74C3C',
    icon: 'axe',
    tagline: 'A fierce warrior of primitive background who can enter a battle rage.',
  },
  bard: {
    color: '#9B59B6',
    icon: 'music',
    tagline: 'An inspiring magician whose power echoes the music of creation.',
  },
  cleric: {
    color: '#F1C40F',
    icon: 'cross',
    tagline: 'A priestly champion who wields divine magic in service of a higher power.',
  },
  // Add other classes as needed...
  wizard: {
    color: '#3498DB',
    icon: 'auto-fix',
    tagline: 'A scholarly magic-user capable of manipulating the structures of reality.',
  },
};

export const DEFAULT_VISUAL = {
  color: '#FFBF00',
  icon: 'help-circle',
  tagline: 'A brave adventurer seeking glory and power.',
};