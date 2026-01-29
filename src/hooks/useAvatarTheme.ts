// frontend/hooks/useAvatarTheme.ts
// React hook for accessing avatar theme data

import { useState, useEffect } from 'react';
import { 
  getAvatarTheme, 
  getAvatarPersonality, 
  getAvatarData,
  getAllAvatarIds,
  AvatarTheme,
  AvatarPersonality,
  AvatarData
} from '@/shared/avatarData';

/**
 * Hook to get avatar theme (colors, backgrounds, objects)
 */
export function useAvatarTheme(avatarId: string) {
  const [theme, setTheme] = useState<AvatarTheme | null>(null);
  
  useEffect(() => {
    const avatarTheme = getAvatarTheme(avatarId);
    setTheme(avatarTheme);
  }, [avatarId]);
  
  return theme;
}

/**
 * Hook to get avatar personality (tagline, backstory, etc)
 */
export function useAvatarPersonality(avatarId: string) {
  const [personality, setPersonality] = useState<AvatarPersonality | null>(null);
  
  useEffect(() => {
    const avatarPersonality = getAvatarPersonality(avatarId);
    setPersonality(avatarPersonality);
  }, [avatarId]);
  
  return personality;
}

/**
 * Hook to get complete avatar data (theme + personality)
 */
export function useAvatarData(avatarId: string) {
  const [data, setData] = useState<AvatarData | null>(null);
  
  useEffect(() => {
    const avatarData = getAvatarData(avatarId);
    setData(avatarData);
  }, [avatarId]);
  
  return data;
}

/**
 * Hook to get all available avatars
 */
export function useAllAvatars() {
  const [avatarIds, setAvatarIds] = useState<string[]>([]);
  
  useEffect(() => {
    const ids = getAllAvatarIds();
    setAvatarIds(ids);
  }, []);
  
  return avatarIds;
}

/**
 * Hook to manage avatar selection with theme data
 */
export function useAvatarSelection(initialAvatarId: string = 'destiny') {
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatarId);
  const avatarData = useAvatarData(selectedAvatar);
  
  const selectAvatar = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };
  
  return {
    selectedAvatar,
    avatarData,
    selectAvatar
  };
}
