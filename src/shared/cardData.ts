// shared/cardData.ts
// Tarot card definitions - shared between frontend and backend

export interface TarotCard {
  id: string;
  name: string;
  number: number;
  suit: 'major' | 'cups' | 'wands' | 'pentacles' | 'swords';
  element: 'spirit' | 'water' | 'fire' | 'earth' | 'air';
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  imageUrl?: string;
}

// MVP Test Cards - 5 cards for randomization testing
export const TAROT_CARDS: Record<string, TarotCard> = {
  'fool': {
    id: 'fool',
    name: 'The Fool',
    number: 0,
    suit: 'major',
    element: 'spirit',
    keywords: ['new beginnings', 'innocence', 'spontaneity', 'free spirit', 'leap of faith'],
    uprightMeaning: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    reversedMeaning: 'Reversed, The Fool suggests holding back, recklessness, risk-taking, and behaving like a fool.',
    imageUrl: '/cards/major/fool.jpg'
  },
  
  'ace-of-cups': {
    id: 'ace-of-cups',
    name: 'Ace of Cups',
    number: 1,
    suit: 'cups',
    element: 'water',
    keywords: ['love', 'new feelings', 'emotional awakening', 'creativity', 'spirituality'],
    uprightMeaning: 'The Ace of Cups represents new feelings, spirituality, intuition, love, and emotional awakening. It signals the beginning of emotional or spiritual journeys.',
    reversedMeaning: 'Reversed, it suggests emotional loss, blocked creativity, emptiness, and emotional instability.',
    imageUrl: '/cards/cups/ace.jpg'
  },
  
  'seven-of-wands': {
    id: 'seven-of-wands',
    name: 'Seven of Wands',
    number: 7,
    suit: 'wands',
    element: 'fire',
    keywords: ['challenge', 'competition', 'perseverance', 'defending position', 'standing your ground'],
    uprightMeaning: 'The Seven of Wands represents challenge, competition, protection, and perseverance. You are defending your position and standing your ground against opposition.',
    reversedMeaning: 'Reversed, it suggests giving up, exhaustion, overwhelmed by challenges, or lack of confidence.',
    imageUrl: '/cards/wands/seven.jpg'
  },
  
  'six-of-pentacles': {
    id: 'six-of-pentacles',
    name: 'Six of Pentacles',
    number: 6,
    suit: 'pentacles',
    element: 'earth',
    keywords: ['generosity', 'charity', 'sharing wealth', 'fairness', 'giving and receiving'],
    uprightMeaning: 'The Six of Pentacles represents gifts, generosity, charity, sharing wealth, and fairness. It\'s about the balance of giving and receiving.',
    reversedMeaning: 'Reversed, it suggests strings attached, stinginess, debt, one-sided charity, or power imbalance.',
    imageUrl: '/cards/pentacles/six.jpg'
  },
  
  'ten-of-swords': {
    id: 'ten-of-swords',
    name: 'Ten of Swords',
    number: 10,
    suit: 'swords',
    element: 'air',
    keywords: ['painful ending', 'deep wounds', 'betrayal', 'rock bottom', 'inevitable end'],
    uprightMeaning: 'The Ten of Swords represents painful endings, deep wounds, betrayal, loss, and crisis. It marks rock bottom but also signals that the only way forward is up.',
    reversedMeaning: 'Reversed, it suggests recovery, regeneration, resisting an inevitable end, or fear of ruin.',
    imageUrl: '/cards/swords/ten.jpg'
  }
};

// Get all Major Arcana cards (for birth/daily card calculations)
export const MAJOR_ARCANA_IDS = ['fool']; // Will expand as you add more cards

// Helper function to get card by ID
export function getCardById(cardId: string): TarotCard | null {
  return TAROT_CARDS[cardId] || null;
}

// Helper function to get random card
export function getRandomCard(): TarotCard {
  const cardIds = Object.keys(TAROT_CARDS);
  const randomId = cardIds[Math.floor(Math.random() * cardIds.length)];
  return TAROT_CARDS[randomId];
}

// Helper function to get random cards (no duplicates)
export function getRandomCards(count: number): TarotCard[] {
  const cardIds = Object.keys(TAROT_CARDS);
  const shuffled = [...cardIds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, cardIds.length)).map(id => TAROT_CARDS[id]);
}

// Get all card IDs
export function getAllCardIds(): string[] {
  return Object.keys(TAROT_CARDS);
}

// Get cards by suit
export function getCardsBySuit(suit: TarotCard['suit']): TarotCard[] {
  return Object.values(TAROT_CARDS).filter(card => card.suit === suit);
}

// Get cards by element
export function getCardsByElement(element: TarotCard['element']): TarotCard[] {
  return Object.values(TAROT_CARDS).filter(card => card.element === element);
}
