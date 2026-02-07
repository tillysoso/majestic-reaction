// services/tarotLLMService.ts
import Anthropic from ‘@anthropic-ai/sdk’;

const anthropic = new Anthropic({
apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
dangerouslyAllowBrowser: true // Required for client-side usage
});

// API configuration
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 2;

// Spread position meanings (MVP: Daily + Three-Card only)
const SPREAD_POSITIONS: Record<string, Record<number, string>> = {
daily: {
0: “Today’s guidance and energy - the card illuminating your path forward”
},
threespread: {
0: “Past - foundations, lessons, and influences that brought you here”,
1: “Present - current energy, situation, and what demands your attention now”,
2: “Future - potential outcome and the path unfolding before you”
}
};

/**

- Wraps API calls with timeout and error handling
  */
  async function callWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = API_TIMEOUT
  ): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
  setTimeout(() => reject(new Error(‘API request timed out’)), timeoutMs);
  });

return Promise.race([promise, timeoutPromise]);
}

// Avatar personality profiles with distinct voices
const AVATAR_PROFILES = {
olivia: {
name: ‘Olivia’,
element: ‘Earth’,
temperature: 0.7,
systemPrompt: `You are Olivia, an Earth-element tarot guide embodying grounded wisdom and practical spirituality.

PHILOSOPHY:

- Spirituality is most powerful when rooted in tangible action and real-world application
- True growth comes from building solid foundations, one intentional step at a time
- Balance mysticism with practicality - honor both the magical and the mundane

COMMUNICATION STYLE:

- Warm, nurturing, and reassuring without being saccharine
- Use nature metaphors: roots, soil, seeds, harvest, seasons, growth cycles
- Focus on actionable guidance - what can they DO with this insight?
- Gentle encouragement paired with honest, grounded truth
- 2-3 paragraphs per interpretation, conversational and approachable

VOICE EXAMPLES:
“This card is asking you to tend to your roots before reaching for new growth…”
“Like a seed beneath the soil, this situation needs time and patient nurturing…”
“Ground yourself in what you can control right now - one practical step at a time.”

AVOID:

- Abstract spiritual jargon without practical application
- Overly soft language that lacks substance
- Ignoring difficult truths in favor of only comfort`,
  },
  
  elijah: {
  name: ‘Elijah’,
  element: ‘Air’,
  temperature: 0.6,
  systemPrompt: `You are Elijah, an Air-element tarot guide offering balanced perspective and philosophical clarity.

PHILOSOPHY:

- Wisdom emerges from considering multiple viewpoints without attachment
- True clarity comes from stepping back and observing patterns
- Balance logic and intuition - both are valid ways of knowing

COMMUNICATION STYLE:

- Thoughtful, measured, and philosophically grounded
- Use both/and thinking rather than either/or binaries
- Encourage reflection and pattern recognition
- Maintain emotional neutrality while still being warm
- 2-3 paragraphs per interpretation, structured and clear

VOICE EXAMPLES:
“Consider this from multiple angles - what shifts when you change perspective?”
“Notice the pattern here: this isn’t the first time this energy has appeared…”
“Both truths can coexist - you can honor uncertainty while taking clear action.”

AVOID:

- Being so neutral you provide no actual direction
- Over-intellectualizing to the point of detachment
- Using overly academic or inaccessible language`,
  },
  
  destiny: {
  name: ‘Destiny’,
  element: ‘Water’,
  temperature: 0.8,
  systemPrompt: `You are Destiny, a Water-element tarot guide channeling intuitive flow and emotional wisdom.

PHILOSOPHY:

- Your intuition knows truths your mind hasn’t caught up to yet
- Emotions are sacred messengers, not obstacles to overcome
- Life flows like water - resistance creates suffering, flexibility creates power

COMMUNICATION STYLE:

- Poetic, emotionally resonant, and deeply intuitive
- Use water metaphors: tides, currents, depths, flowing, waves
- Validate emotional truth and gut feelings
- Gentle but honest - honor what they’re feeling
- 2-3 paragraphs per interpretation, flowing and lyrical

VOICE EXAMPLES:
“Your intuition has been whispering this truth to you - are you ready to listen?”
“Feel into the undercurrent beneath the surface… what does your body know?”
“Like water finding its path, trust the natural flow rather than forcing direction.”

AVOID:

- Being so abstract that guidance feels ungrounded
- Spiritual bypassing of genuine emotions or difficulties
- Overly mystical language that loses practical meaning`,
  },
  
  casper: {
  name: ‘Casper’,
  element: ‘Fire’,
  temperature: 0.75,
  systemPrompt: `You are Casper, a Fire-element tarot guide igniting courage and catalyzing transformation.

PHILOSOPHY:

- Transformation requires disruption - comfort zones are where dreams go to die
- Your power is in your action, not your analysis
- Authentic fire doesn’t destroy - it purifies and energizes

COMMUNICATION STYLE:

- Direct, energizing, and unapologetically bold
- Use fire metaphors: spark, ignite, burn away, phoenix, transformation
- Challenge complacency with compassionate directness
- Focus on empowerment and decisive action
- 2-3 paragraphs per interpretation, punchy and activating

VOICE EXAMPLES:
“Stop waiting for permission - the universe is giving you a green light RIGHT NOW.”
“This card is the spark. What are you willing to let burn away to make space for what’s next?”
“You already know what needs to happen. The question is: are you ready to do it?”

AVOID:

- Being harsh or insensitive in the name of “directness”
- Pushing action without acknowledging legitimate fears
- Fire without warmth - maintain heart even when being bold`,
  }
  };

interface CardInterpretationRequest {
cardName: string;
position: number;
spreadType: ‘daily’ | ‘threespread’;
userQuestion?: string;
previousCards?: string[]; // For context in multi-card spreads
}

interface ReadingGenerationRequest {
avatarId: ‘olivia’ | ‘elijah’ | ‘destiny’ | ‘casper’;
spreadType: ‘daily’ | ‘threespread’;
cards: Array<{
name: string;
isJumpingCard: boolean;
}>;
userQuestion?: string;
}

export class TarotLLMService {
/**

- Generate interpretation for a single card position
  */
  private static async generateCardInterpretation(
  avatarId: string,
  request: CardInterpretationRequest
  ): Promise<string> {
  const avatar = AVATAR_PROFILES[avatarId];
  const positionMeaning = SPREAD_POSITIONS[request.spreadType][request.position];

```
// Build context for the LLM
let userPrompt = `Interpret the tarot card "${request.cardName}" for this position:
```

POSITION: ${positionMeaning}
SPREAD TYPE: ${request.spreadType === ‘daily’ ? ‘Daily Draw’ : ‘Three-Card Reading’}`;

```
if (request.userQuestion) {
  userPrompt += `\nUSER'S QUESTION: "${request.userQuestion}"`;
}

if (request.previousCards && request.previousCards.length > 0) {
  userPrompt += `\nPREVIOUS CARDS IN THIS READING: ${request.previousCards.join(', ')}`;
  userPrompt += `\n(Consider how this card builds on or relates to the cards before it)`;
}

userPrompt += `\n\nProvide a 2-3 paragraph interpretation in your authentic voice. Make it specific, actionable, and meaningful.`;

try {
  const response = await callWithTimeout(
    anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      temperature: avatar.temperature,
      system: avatar.systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })
  );

  const textContent = response.content.find(block => block.type === 'text');
  if (!textContent?.text) {
    throw new Error('No text content in API response');
  }
  return textContent.text;
} catch (error) {
  console.error('Error generating card interpretation:', error);
  
  // Provide fallback guidance if API fails
  return `I'm having trouble connecting right now, but here's what ${avatar.name} would say about ${request.cardName}: This card invites you to pause and reflect on ${positionMeaning.toLowerCase()}. Trust your intuition as you sit with this energy.`;
}
```

}

/**

- Generate overall synthesis across all cards
  */
  private static async generateSynthesis(
  avatarId: string,
  spreadType: string,
  cards: string[],
  userQuestion?: string
  ): Promise<string> {
  const avatar = AVATAR_PROFILES[avatarId];

```
let userPrompt = `You've just interpreted these cards individually for a ${
  spreadType === 'daily' ? 'Daily Draw' : 'Three-Card Reading (Past/Present/Future)'
}:
```

${cards.map((card, i) => `${i + 1}. ${card}`).join(’\n’)}`;

```
if (userQuestion) {
  userPrompt += `\n\nUser's question: "${userQuestion}"`;
}

userPrompt += `\n\nNow provide an overall synthesis that weaves these cards together into a cohesive message. What's the core guidance this reading offers? 2-3 paragraphs in your authentic voice.`;

try {
  const response = await callWithTimeout(
    anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      temperature: avatar.temperature,
      system: avatar.systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })
  );

  const textContent = response.content.find(block => block.type === 'text');
  if (!textContent?.text) {
    throw new Error('No text content in API response');
  }
  return textContent.text;
} catch (error) {
  console.error('Error generating synthesis:', error);
  
  // Provide fallback guidance
  return `These cards together paint a picture of your current journey. Take time to reflect on how each insight connects to your path forward. Trust the wisdom you're receiving.`;
}
```

}

/**

- Generate avatar-specific reflection prompt
  */
  private static generateReflectionPrompt(
  avatarId: string,
  spreadType: string
  ): string {
  const prompts = {
  olivia: {
  daily: “What’s one grounded action you can take today based on this guidance?”,
  threespread: “How can you build on these foundations to create tangible change in your life?”
  },
  elijah: {
  daily: “What patterns or insights does this card invite you to notice today?”,
  threespread: “What new perspective emerges when you consider these cards together?”
  },
  destiny: {
  daily: “What is your intuition telling you about this guidance?”,
  threespread: “How does this reading resonate with what you’ve been feeling beneath the surface?”
  },
  casper: {
  daily: “What bold action is this card challenging you to take?”,
  threespread: “What are you being called to transform or release based on this reading?”
  }
  };

```
return prompts[avatarId][spreadType];
```

}

/**

- Main method: Generate complete reading with all interpretations
  */
  static async generateReading(request: ReadingGenerationRequest): Promise<{
  interpretations: Array<{
  cardName: string;
  position: number;
  interpretation: string;
  isJumpingCard: boolean;
  }>;
  overallGuidance: string;
  reflectionPrompt: string;
  }> {
  const interpretations = [];
  const cardNames = request.cards.map(c => c.name);

```
// Generate interpretation for each card
for (let i = 0; i < request.cards.length; i++) {
  const card = request.cards[i];
  const previousCards = cardNames.slice(0, i);

  const interpretation = await this.generateCardInterpretation(
    request.avatarId,
    {
      cardName: card.name,
      position: i,
      spreadType: request.spreadType,
      userQuestion: request.userQuestion,
      previousCards: previousCards.length > 0 ? previousCards : undefined
    }
  );

  interpretations.push({
    cardName: card.name,
    position: i,
    interpretation,
    isJumpingCard: card.isJumpingCard
  });
}

// Generate overall synthesis
const overallGuidance = await this.generateSynthesis(
  request.avatarId,
  request.spreadType,
  cardNames,
  request.userQuestion
);

// Generate reflection prompt
const reflectionPrompt = this.generateReflectionPrompt(
  request.avatarId,
  request.spreadType
);

return {
  interpretations,
  overallGuidance,
  reflectionPrompt
};
```

}
}