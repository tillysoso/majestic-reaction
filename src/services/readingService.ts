// services/readingService.ts
// Generic reading generation before avatar personalization

import { getCardById, TarotCard } from '../shared/cardData';
import { getSpreadPositions, SpreadPosition } from '../shared/spreadCalculations';

export interface GenericCardInterpretation {
  cardId: string;
  cardName: string;
  position: SpreadPosition;
  genericMeaning: string;
  keywords: string[];
}

export interface GenericReading {
  spreadType: 'daily' | 'threespread' | 'birthcard';
  cards: GenericCardInterpretation[];
  overallTheme: string;
}

/**
 * Generate generic reading before avatar personalization
 * This provides the base interpretation that avatars will then personalize
 */
export function generateGenericReading(
  cardIds: string[],
  spreadType: 'daily' | 'threespread' | 'birthcard',
  userQuestion?: string
): GenericReading | null {
  let positions: SpreadPosition[] = [];
  if (spreadType === 'daily' || spreadType === 'threespread') {
    positions = getSpreadPositions(spreadType);
    if (cardIds.length !== positions.length) {
      console.error(`Card count mismatch: expected ${positions.length}, got ${cardIds.length}`);
      return null;
    }
  }

  // For birth card reading, use single position
  const effectivePositions = spreadType === 'birthcard' 
    ? [{
        position: 0,
        name: 'Your Birth Card',
        meaning: 'The archetypal energy that shapes your life journey and core essence'
      }]
    : positions;
  
  const cardInterpretations: GenericCardInterpretation[] = [];
  
  // Generate generic interpretation for each card
  cardIds.forEach((cardId, index) => {
    const card = getCardById(cardId);
    if (!card) {
      console.error(`Card not found: ${cardId}`);
      return;
    }
    
    const position = effectivePositions[index];
    
    cardInterpretations.push({
      cardId: card.id,
      cardName: card.name,
      position: position,
      genericMeaning: card.uprightMeaning,
      keywords: card.keywords
    });
  });
  
  // Generate overall theme based on spread type
  const overallTheme = generateOverallTheme(cardInterpretations, spreadType, userQuestion);
  
  return {
    spreadType,
    cards: cardInterpretations,
    overallTheme
  };
}

/**
 * Generate overall theme for the reading
 */
function generateOverallTheme(
  cards: GenericCardInterpretation[],
  spreadType: string,
  userQuestion?: string
): string {
  if (spreadType === 'daily') {
    return `Today's energy centers around ${cards[0].keywords.slice(0, 2).join(' and ')}. ${cards[0].genericMeaning}`;
  }
  
  if (spreadType === 'birthcard') {
    return `Your birth card reveals the core archetypal energy of ${cards[0].keywords.slice(0, 3).join(', ')} that shapes your life journey.`;
  }
  
  // Three-card spread
  const pastKeywords = cards[0].keywords[0];
  const presentKeywords = cards[1].keywords[0];
  const futureKeywords = cards[2].keywords[0];
  
  return `This reading shows a journey from ${pastKeywords} through ${presentKeywords} toward ${futureKeywords}. The cards suggest a natural progression and evolution in your situation.`;
}

/**
 * Format reading for display (before avatar personalization)
 */
export function formatGenericReading(reading: GenericReading): string {
  let output = `=== ${reading.spreadType.toUpperCase()} READING ===\n\n`;
  
  reading.cards.forEach((card, index) => {
    output += `${card.position.name}:\n`;
    output += `Card: ${card.cardName}\n`;
    output += `Keywords: ${card.keywords.join(', ')}\n`;
    output += `Meaning: ${card.genericMeaning}\n\n`;
  });
  
  output += `Overall Theme:\n${reading.overallTheme}\n`;
  
  return output;
}

/**
 * Prepare reading for avatar personalization
 * Returns structured data that LLM service can use
 */
export interface ReadingForPersonalization {
  spreadType: 'daily' | 'threespread' | 'birthcard';
  cards: Array<{
    name: string;
    position: string;
    positionMeaning: string;
    genericMeaning: string;
    keywords: string[];
  }>;
  userQuestion?: string;
  overallTheme: string;
}

export function prepareForPersonalization(
  reading: GenericReading,
  userQuestion?: string
): ReadingForPersonalization {
  return {
    spreadType: reading.spreadType,
    cards: reading.cards.map(card => ({
      name: card.cardName,
      position: card.position.name,
      positionMeaning: card.position.meaning,
      genericMeaning: card.genericMeaning,
      keywords: card.keywords
    })),
    userQuestion,
    overallTheme: reading.overallTheme
  };
}
