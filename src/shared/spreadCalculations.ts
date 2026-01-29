// shared/spreadCalculations.ts
// Birth card and daily card calculations - shared between frontend and backend

export interface SpreadPosition {
  position: number;
  name: string;
  meaning: string;
}

// Spread position definitions
export const SPREAD_POSITIONS: Record<string, SpreadPosition[]> = {
  daily: [
    {
      position: 0,
      name: "Today's Guidance",
      meaning: "The energy and guidance illuminating your path forward today"
    }
  ],
  
  threespread: [
    {
      position: 0,
      name: 'Past',
      meaning: 'Foundations, lessons, and influences that brought you here'
    },
    {
      position: 1,
      name: 'Present',
      meaning: 'Current energy, situation, and what demands your attention now'
    },
    {
      position: 2,
      name: 'Future',
      meaning: 'Potential outcome and the path unfolding before you'
    }
  ]
};

// Helper to get spread positions
export function getSpreadPositions(spreadType: 'daily' | 'threespread'): SpreadPosition[] {
  return SPREAD_POSITIONS[spreadType] || [];
}

/**
 * Calculate birth card using Tarot numerology
 * Adds all digits of birth date and reduces to 1-22 for Major Arcana
 * 
 * Examples:
 * - 1990-03-15 → 1+9+9+0+3+1+5 = 28 → 2+8 = 10 (Wheel of Fortune)
 * - 1985-12-25 → 1+9+8+5+1+2+2+5 = 33 → 3+3 = 6 (The Lovers)
 */
export function calculateBirthCard(birthDate: Date): number {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1; // JS months are 0-indexed
  const day = birthDate.getDate();
  
  // Sum all individual digits
  const sumDigits = (num: number): number => {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  };
  
  let total = sumDigits(year) + sumDigits(month) + sumDigits(day);
  
  // Reduce to single digit or master number (max 22 for Major Arcana)
  while (total > 22) {
    total = sumDigits(total);
  }
  
  // The Fool is 0, but in calculations it can be represented as 22
  return total === 22 ? 0 : total;
}

/**
 * Calculate daily card based on birth card and current date
 * Uses personal year + day of year cycle through Major Arcana
 * 
 * Formula: (birthCardNumber + dayOfYear) % 22
 */
export function calculateDailyCard(birthCardNumber: number, date: Date = new Date()): number {
  // Get day of year (1-365/366)
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Cycle through Major Arcana based on birth card + day
  const dailyCardNumber = (birthCardNumber + dayOfYear) % 22;
  
  return dailyCardNumber;
}

/**
 * Get Major Arcana card name by number
 * Note: This is a placeholder mapping for the MVP
 * As you add more cards, expand this mapping
 */
export function getMajorArcanaCardId(cardNumber: number): string | null {
  const majorArcanaMap: Record<number, string> = {
    0: 'fool',
    // 1: 'magician',
    // 2: 'high-priestess',
    // ... etc - add as you implement more cards
  };
  
  return majorArcanaMap[cardNumber] || null;
}

/**
 * Calculate birth card and return card ID
 */
export function getBirthCardId(birthDate: Date): string | null {
  const birthCardNumber = calculateBirthCard(birthDate);
  return getMajorArcanaCardId(birthCardNumber);
}

/**
 * Calculate daily card and return card ID
 */
export function getDailyCardId(birthDate: Date, date: Date = new Date()): string | null {
  const birthCardNumber = calculateBirthCard(birthDate);
  const dailyCardNumber = calculateDailyCard(birthCardNumber, date);
  return getMajorArcanaCardId(dailyCardNumber);
}

/**
 * Check if a card is available in the current deck
 * (Used to handle cases where calculated card isn't implemented yet)
 */
export function isCardImplemented(cardNumber: number): boolean {
  return getMajorArcanaCardId(cardNumber) !== null;
}

/**
 * Get reading context for display
 */
export interface ReadingContext {
  spreadType: 'daily' | 'threespread' | 'birthcard';
  birthCardNumber?: number;
  dailyCardNumber?: number;
  calculationNote?: string;
}

export function getReadingContext(
  spreadType: 'daily' | 'threespread' | 'birthcard',
  birthDate?: Date,
  currentDate?: Date
): ReadingContext {
  const context: ReadingContext = { spreadType };
  
  if (birthDate) {
    context.birthCardNumber = calculateBirthCard(birthDate);
    
    if (spreadType === 'daily' && currentDate) {
      context.dailyCardNumber = calculateDailyCard(context.birthCardNumber, currentDate);
      
      // Check if calculated card is implemented
      if (!isCardImplemented(context.dailyCardNumber)) {
        context.calculationNote = `Your daily card is Major Arcana #${context.dailyCardNumber}, but this card is not yet available in the showcase. The calculation logic is working correctly!`;
      }
    }
    
    if (spreadType === 'birthcard' && !isCardImplemented(context.birthCardNumber)) {
      context.calculationNote = `Your birth card is Major Arcana #${context.birthCardNumber}, but this card is not yet available in the showcase. The calculation logic is working correctly!`;
    }
  }
  
  return context;
}
