/**
 * Avatar Theme Context
 * Manages body-level styling for avatar themes (like vanilla app fix)
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AvatarId } from '@/types/reading.types';

interface AvatarThemeContextValue {
  activeAvatar: AvatarId | null;
  setActiveAvatar: (avatar: AvatarId | null) => void;
  clearTheme: () => void;
}

const AvatarThemeContext = createContext<AvatarThemeContextValue | undefined>(undefined);

interface AvatarThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider that manages body-level avatar theming
 * Applies avatar-specific classes to document.body (learned from vanilla app)
 */
export function AvatarThemeProvider({ children }: AvatarThemeProviderProps) {
  const [activeAvatar, setActiveAvatarState] = useState<AvatarId | null>(null);

  useEffect(() => {
    // Clear all avatar classes first
    document.body.classList.remove(
      'avatar-active-olivia',
      'avatar-active-elijah',
      'avatar-active-destiny',
      'avatar-active-casper'
    );

    // Apply new avatar class if set
    if (activeAvatar) {
      document.body.classList.add(`avatar-active-${activeAvatar}`);
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove(
        'avatar-active-olivia',
        'avatar-active-elijah',
        'avatar-active-destiny',
        'avatar-active-casper'
      );
    };
  }, [activeAvatar]);

  const setActiveAvatar = (avatar: AvatarId | null) => {
    setActiveAvatarState(avatar);
  };

  const clearTheme = () => {
    setActiveAvatarState(null);
  };

  return (
    <AvatarThemeContext.Provider 
      value={{ 
        activeAvatar, 
        setActiveAvatar, 
        clearTheme 
      }}
    >
      {children}
    </AvatarThemeContext.Provider>
  );
}

/**
 * Hook to access and control avatar theme
 */
export function useAvatarThemeContext() {
  const context = useContext(AvatarThemeContext);
  if (context === undefined) {
    throw new Error('useAvatarThemeContext must be used within AvatarThemeProvider');
  }
  return context;
}
