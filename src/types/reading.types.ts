/**
 * Core Types for Majestic Reading Engine
 * Ensures consistency across all reading experiences
 */

export type AvatarId = 'olivia' | 'elijah' | 'destiny' | 'casper';
export type ReadingType = 'daily' | 'birth' | 'three-card' | 'jumping';
export type ConversationStage = 'interpretation' | 'conversation';

export interface TarotCard {
  id: string;
  name: string;
  emoji: string;
  keywords: string[];
  element?: string;
  number?: string;
}

export interface CardData {
  card: TarotCard;
  cards?: TarotCard[];
  position?: string;
  birthdate?: string;
}

export interface BaseInterpretation {
  text: string;
  points: string[];
  jumpingGuidance?: string;
  jumpingPoints?: string[];
}

export interface AvatarReading {
  base: BaseInterpretation;
  avatarPersonality: string;
  relationshipXP: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'avatar';
  text: string;
  timestamp: Date;
  xpGained?: number;
}

export interface QuestionChip {
  id: string;
  text: string;
  icon: string;
  category: 'love' | 'stuck' | 'career' | 'custom';
}

export interface AvatarResponse {
  message: string;
  xp: number;
}

export interface ConversationState {
  stage: ConversationStage;
  messages: Message[];
  relationshipXP: number;
  currentAvatar: AvatarId;
  selectedChips: string[];
}

export interface AvatarConfig {
  id: AvatarId;
  name: string;
  element: 'Earth' | 'Air' | 'Water' | 'Fire';
  icon: string;
  tagline: string;
  level: number;
  favoriteTrack?: {
    title: string;
    artist: string;
  };
}

export interface ReadingEngineState {
  currentReading: ReadingType | null;
  selectedAvatar: AvatarId | null;
  cardData: CardData | null;
  baseReading: BaseInterpretation | null;
  avatarReading: AvatarReading | null;
  conversation: ConversationState | null;
  isAnimating: boolean;
}

export interface ChipsSectionProps {
  avatar: AvatarId;
  chips: QuestionChip[];
  onChipClick: (chipId: string) => void;
  selectedChips: string[];
}

export interface ConversationViewProps {
  avatar: AvatarId;
  messages: Message[];
  relationshipXP: number;
  onSendMessage: (message: string) => void;
  onBack: () => void;
  remainingChips: QuestionChip[];
  onChipClick: (chipId: string) => void;
}

export interface CardDisplayProps {
  card: TarotCard;
  avatar: AvatarId;
  birthdate?: string;
  readingType: ReadingType;
}

export interface InterpretationSectionProps {
  title: string;
  text: string;
  points: string[];
  avatar: AvatarId;
}

export interface AvatarHeaderProps {
  config: AvatarConfig;
  relationshipXP?: number;
}
