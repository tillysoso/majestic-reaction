// shared/avatarData.ts
// Avatar theme and personality data - shared between frontend and backend

export interface AvatarTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    light: string;
    dark: string;
    glow: string;
  };
  backgrounds: string[];
  sacredObjects: string[];
  icon: string;
}

export interface AvatarPersonality {
  tagline: string;
  archetype: string;
  adviceType: string;
  backstory: string;
  themeSong: string;
  bestFor: string;
}

export interface AvatarData {
  name: string;
  element: string;
  suit: string;
  theme: AvatarTheme;
  personality: AvatarPersonality;
}

export const AVATAR_DATA: Record<string, AvatarData> = {
  olivia: {
    name: 'Olivia',
    element: 'Earth',
    suit: 'Pentacles',
    theme: {
      colors: {
        primary: '#7ED321',
        secondary: '#689F38',
        accent: '#AED581',
        light: '#F1F8E9',
        dark: '#33691E',
        glow: 'rgba(126, 211, 33, 0.6)'
      },
      backgrounds: ['forest groves', 'mountain meadows', 'garden sanctuaries'],
      sacredObjects: ['crystals', 'plants', 'wooden totems'],
      icon: 'Leaf'
    },
    personality: {
      tagline: 'I guide with nurturing stability and help you build solid foundations',
      archetype: 'The Nurturing Builder',
      adviceType: 'Practical, step-by-step guidance with gentle encouragement',
      backstory: 'Born from ancient forest wisdom, Olivia learned that true strength comes from deep roots and patient growth',
      themeSong: 'Rooted by Little Simz',
      bestFor: 'Users seeking career guidance, financial stability, tangible next steps'
    }
  },
  
  elijah: {
    name: 'Elijah',
    element: 'Air',
    suit: 'Swords',
    theme: {
      colors: {
        primary: '#9E9E9E',
        secondary: '#757575',
        accent: '#BDBDBD',
        light: '#F5F5F5',
        dark: '#424242',
        glow: 'rgba(158, 158, 158, 0.6)'
      },
      backgrounds: ['sky temples', 'cloud libraries', 'crystal caves'],
      sacredObjects: ['feathers', 'incense', 'wind chimes'],
      icon: 'Wind'
    },
    personality: {
      tagline: 'I offer clarity through balanced perspective and thoughtful analysis',
      archetype: 'The Balanced Philosopher',
      adviceType: 'Balanced insights that consider multiple perspectives',
      backstory: 'A former scholar who discovered that true wisdom comes from observing patterns in both chaos and order',
      themeSong: 'Breathe Me by Sia',
      bestFor: 'Overthinkers, decision-paralyzed users, those seeking intellectual frameworks'
    }
  },
  
  destiny: {
    name: 'Destiny',
    element: 'Water',
    suit: 'Cups',
    theme: {
      colors: {
        primary: '#4A90E2',
        secondary: '#357ABD',
        accent: '#7B68EE',
        light: '#E3F2FD',
        dark: '#1565C0',
        glow: 'rgba(74, 144, 226, 0.6)'
      },
      backgrounds: ['ocean depths', 'moonlit lakes', 'flowing rivers'],
      sacredObjects: ['seashells', 'moon phases', 'crystal water vessels'],
      icon: 'Droplets'
    },
    personality: {
      tagline: 'I help you trust your intuition and flow with life\'s currents',
      archetype: 'The Intuitive Empath',
      adviceType: 'Intuitive guidance that honors emotional truth',
      backstory: 'Once a lighthouse keeper, Destiny learned to read the tides of human emotion and guide souls safely to shore',
      themeSong: 'Ocean Eyes by Billie Eilish',
      bestFor: 'Users who need permission to feel, trust gut instincts, navigate relationships'
    }
  },
  
  casper: {
    name: 'Casper',
    element: 'Fire',
    suit: 'Wands',
    theme: {
      colors: {
        primary: '#E53E3E',
        secondary: '#C53030',
        accent: '#FC8181',
        light: '#FFF5F5',
        dark: '#9B2C2C',
        glow: 'rgba(229, 62, 62, 0.6)'
      },
      backgrounds: ['fire temples', 'sunset peaks', 'forge spaces'],
      sacredObjects: ['candles', 'swords', 'transformation symbols'],
      icon: 'Flame'
    },
    personality: {
      tagline: 'I ignite your inner fire and guide you to take empowered action',
      archetype: 'The Passionate Catalyst',
      adviceType: 'Direct, action-oriented guidance that sparks transformation',
      backstory: 'A former warrior who learned that true power comes from channeling passion into purposeful action',
      themeSong: 'Run the World by Beyoncé',
      bestFor: 'Users stuck in analysis paralysis, needing courage, ready for bold moves'
    }
  }
};

// Helper function to get avatar theme only
export function getAvatarTheme(avatarId: string): AvatarTheme | null {
  return AVATAR_DATA[avatarId]?.theme || null;
}

// Helper function to get avatar personality only
export function getAvatarPersonality(avatarId: string): AvatarPersonality | null {
  return AVATAR_DATA[avatarId]?.personality || null;
}

// Helper function to get complete avatar data (no system prompt)
export function getAvatarData(avatarId: string): AvatarData | null {
  return AVATAR_DATA[avatarId] || null;
}

// Get all avatar IDs
export function getAllAvatarIds(): string[] {
  return Object.keys(AVATAR_DATA);
}
