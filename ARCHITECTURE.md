# Majestic React App Architecture

## Overview
Production-ready React/TypeScript implementation with reusable components, proper theming, and comprehensive testing. Built with learnings from vanilla app development.

---

## Key Learnings Applied

### 1. Body-Level Theming (Critical Fix)
**Problem in Vanilla App:** Avatar backgrounds were on container divs, leaving dark body padding visible around edges.

**Solution:** Apply gradients to `document.body` via dynamic classes.

```typescript
// Context manages body classes
useEffect(() => {
  if (activeAvatar) {
    document.body.classList.add(`avatar-active-${activeAvatar}`);
  }
  return () => {
    document.body.classList.remove('avatar-active-olivia', ...);
  };
}, [activeAvatar]);
```

```css
/* index.css */
body.avatar-active-olivia {
  background: linear-gradient(to bottom, #f0fdf4, #ffffff);
}
body.avatar-active-elijah {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
/* ... destiny, casper */
```

### 2. Component Reusability
All components follow DRY principles with proper TypeScript interfaces.

### 3. Consistent Avatar Personalities
All 4 avatars get:
- Unique question chips (personality-driven text)
- Unique response styles (Olivia conversational, Elijah lowercase, Destiny contemplative, Casper direct/caps)
- Same feature set (3 chips each, XP tracking, conversation threading)

---

## Architecture

### Directory Structure
```
src/
├── components/
│   └── reading/              # Reusable reading components
│       ├── AvatarHeader.tsx
│       ├── CardDisplay.tsx
│       ├── InterpretationSection.tsx
│       ├── ChipsSection.tsx
│       ├── ConversationView.tsx
│       └── index.ts
├── context/
│   └── AvatarThemeContext.tsx  # Body-level theme management
├── data/
│   └── conversationData.ts     # Avatar chips & responses
├── hooks/
│   └── useAvatarTheme.ts       # Avatar data hooks
├── types/
│   └── reading.types.ts        # TypeScript interfaces
├── tests/
│   ├── AvatarStyling.test.tsx
│   └── ReadingConsistency.test.ts
└── styles/
    └── avatar-themes.css       # Avatar-specific CSS
```

---

## Core Components

### 1. AvatarThemeProvider (Context)
**Purpose:** Manages body-level styling for active avatar  
**Location:** `src/context/AvatarThemeContext.tsx`

**Usage:**
```tsx
import { AvatarThemeProvider, useAvatarThemeContext } from '@/context/AvatarThemeContext';

// Wrap app
<AvatarThemeProvider>
  <App />
</AvatarThemeProvider>

// In component
const { setActiveAvatar, clearTheme } = useAvatarThemeContext();
setActiveAvatar('elijah'); // Body gets .avatar-active-elijah
```

**Methods:**
- `setActiveAvatar(avatar)` - Apply avatar theme to body
- `clearTheme()` - Remove all avatar classes
- `activeAvatar` - Current active avatar ID

---

### 2. AvatarHeader
**Purpose:** Consistent header across all reading views  
**Location:** `src/components/reading/AvatarHeader.tsx`

**Props:**
```typescript
interface AvatarHeaderProps {
  config: AvatarConfig;      // Avatar data (name, element, icon)
  relationshipXP?: number;   // Optional XP display
}
```

**Renders:**
```tsx
<AvatarHeader 
  config={{ id: 'elijah', name: 'Elijah', element: 'Air', icon: '💨', level: 1 }}
  relationshipXP={15}
/>
// Output: "Elijah | Air Guide • Level 1 • 15 XP"
```

---

### 3. CardDisplay
**Purpose:** Large card container (16rem × 24rem) with avatar-specific gradients  
**Location:** `src/components/reading/CardDisplay.tsx`

**Props:**
```typescript
interface CardDisplayProps {
  card: TarotCard;          // Card data (emoji, name, keywords)
  avatar: AvatarId;         // For gradient styling
  birthdate?: string;       // Optional for birth card readings
  readingType: ReadingType; // 'daily' | 'birth' | 'three-card' | 'jumping'
}
```

**Styling:** Matches onboarding flow exactly (learned from vanilla fix)

---

### 4. InterpretationSection
**Purpose:** Display card interpretation with title, text, reflection points  
**Location:** `src/components/reading/InterpretationSection.tsx`

**Props:**
```typescript
interface InterpretationSectionProps {
  title: string;
  text: string;
  points: string[];
  avatar: AvatarId;
}
```

---

### 5. ChipsSection
**Purpose:** "Explore Further" question chips  
**Location:** `src/components/reading/ChipsSection.tsx`

**Props:**
```typescript
interface ChipsSectionProps {
  avatar: AvatarId;
  chips: QuestionChip[];
  onChipClick: (chipId: string) => void;
  selectedChips: string[];  // Disable already-selected chips
}
```

**Behavior:**
- Displays 3 avatar-specific question chips
- Disables chips after selection
- Shows avatar-appropriate label ("got questions? hit me" vs "questions for reflection")

---

### 6. ConversationView
**Purpose:** Message threading with XP tracking and input  
**Location:** `src/components/reading/ConversationView.tsx`

**Props:**
```typescript
interface ConversationViewProps {
  avatar: AvatarId;
  messages: Message[];
  relationshipXP: number;
  onSendMessage: (message: string) => void;
  onBack: () => void;
  remainingChips: QuestionChip[];
  onChipClick: (chipId: string) => void;
}
```

**Features:**
- Message bubbles (user right, avatar left)
- XP display in header
- Remaining chips still clickable
- Text input for custom questions
- Back to interpretation button

---

## Data Layer

### conversationData.ts
**Exports:**
- `avatarQuestionChips` - 3 chips per avatar
- `avatarResponses` - Personality-driven responses (100-200 words each)
- `getAvatarChips(avatarId)` - Get chips for avatar
- `getAvatarResponse(avatarId, questionId)` - Get response with XP

**Example:**
```typescript
const chips = getAvatarChips('elijah');
// [
//   { id: 'love', text: 'what about love?', icon: '💭', category: 'love' },
//   { id: 'stuck', text: "i'm feeling stuck...", icon: '🌀', category: 'stuck' },
//   { id: 'career', text: 'career implications?', icon: '⚡', category: 'career' }
// ]

const response = getAvatarResponse('elijah', 'stuck');
// {
//   message: "oof yeah that's the WORST. getting a movement card...",
//   xp: 3
// }
```

---

## TypeScript Interfaces

### Core Types (`src/types/reading.types.ts`)

```typescript
type AvatarId = 'olivia' | 'elijah' | 'destiny' | 'casper';
type ReadingType = 'daily' | 'birth' | 'three-card' | 'jumping';
type ConversationStage = 'interpretation' | 'conversation';

interface TarotCard {
  id: string;
  name: string;
  emoji: string;
  keywords: string[];
}

interface Message {
  id: string;
  sender: 'user' | 'avatar';
  text: string;
  timestamp: Date;
  xpGained?: number;
}

interface QuestionChip {
  id: string;
  text: string;
  icon: string;
  category: 'love' | 'stuck' | 'career' | 'custom';
}

interface AvatarResponse {
  message: string;
  xp: number;
}

interface ConversationState {
  stage: ConversationStage;
  messages: Message[];
  relationshipXP: number;
  currentAvatar: AvatarId;
  selectedChips: string[];
}
```

---

## Testing Strategy

### Test Files
1. **AvatarStyling.test.tsx** - Component rendering & styling consistency
2. **ReadingConsistency.test.ts** - Data layer & personality consistency

### Test Coverage

#### Avatar Styling Tests
- ✅ Body class application for all 4 avatars
- ✅ Body class cleanup on unmount
- ✅ Avatar switching (remove old, add new)
- ✅ Component rendering with all avatars
- ✅ Icon/emoji display
- ✅ XP display
- ✅ Card display with keywords
- ✅ Chip rendering and disabling

#### Reading Consistency Tests
- ✅ All avatars have 3 chips (love, stuck, career)
- ✅ All avatars have responses for all questions
- ✅ Chip text is unique per avatar (personality-driven)
- ✅ Response length (min 100 chars)
- ✅ XP awards (1-3 points)
- ✅ Personality voice consistency:
  - Olivia: conversational, warm
  - Elijah: lowercase, philosophical
  - Destiny: contemplative, reflective
  - Casper: direct, caps, action-oriented
- ✅ Feature parity across avatars
- ✅ UX consistency (same interaction patterns)

### Running Tests
```bash
npm test                    # Run all tests
npm test AvatarStyling     # Run styling tests
npm test ReadingConsistency # Run consistency tests
```

---

## Styling System

### Avatar Theme CSS (`src/styles/avatar-themes.css`)

**Structure:**
```css
/* Scoped to avatar classes */
.avatar-reading.olivia { /* font, colors */ }
.avatar-reading.elijah { /* font, colors */ }
.avatar-reading.destiny { /* font, colors */ }
.avatar-reading.casper { /* font, colors */ }

/* Card display (16rem × 24rem) */
.avatar-reading .card-display { /* shared structure */ }
.avatar-reading.olivia .card-display { /* olivia gradient */ }
.avatar-reading.elijah .card-display { /* elijah gradient */ }
/* ... destiny, casper */

/* Buttons, chips, messages - all avatar-scoped */
.avatar-reading.olivia .btn-primary { /* olivia button style */ }
.avatar-reading.elijah .chip { /* elijah chip style */ }
/* ... etc */
```

**Key Features:**
- Background gradients on body (not containers)
- Avatar-specific fonts (Courier for Elijah, Georgia for Destiny)
- Consistent button/chip/message styling per avatar
- Animations (glitch for Elijah, pulse for Destiny, etc.)

---

## Usage Example

### Complete Reading Flow
```tsx
import { useState } from 'react';
import { AvatarThemeProvider, useAvatarThemeContext } from '@/context/AvatarThemeContext';
import { 
  AvatarHeader, 
  CardDisplay, 
  InterpretationSection,
  ChipsSection,
  ConversationView 
} from '@/components/reading';
import { getAvatarChips, getAvatarResponse } from '@/data/conversationData';

function ReadingEngine() {
  const { setActiveAvatar, clearTheme } = useAvatarThemeContext();
  const [avatar, setAvatar] = useState<AvatarId>('elijah');
  const [stage, setStage] = useState<'interpretation' | 'conversation'>('interpretation');
  const [messages, setMessages] = useState<Message[]>([]);
  const [xp, setXp] = useState(0);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleAvatarSelect = (avatarId: AvatarId) => {
    setAvatar(avatarId);
    setActiveAvatar(avatarId); // Apply body theme
  };

  const handleChipClick = (chipId: string) => {
    const response = getAvatarResponse(avatar, chipId);
    
    setMessages([
      ...messages,
      { id: Date.now(), sender: 'user', text: chips.find(c => c.id === chipId).text },
      { id: Date.now() + 1, sender: 'avatar', text: response.message, xpGained: response.xp }
    ]);
    
    setXp(xp + response.xp);
    setSelectedChips([...selectedChips, chipId]);
    setStage('conversation');
  };

  const chips = getAvatarChips(avatar);
  const remainingChips = chips.filter(c => !selectedChips.includes(c.id));

  return (
    <div className={`avatar-reading ${avatar}`}>
      <AvatarHeader config={avatarConfig} relationshipXP={xp} />
      
      {stage === 'interpretation' ? (
        <>
          <CardDisplay card={card} avatar={avatar} readingType="daily" />
          <InterpretationSection 
            title="Base Interpretation" 
            text={interpretation} 
            points={points}
            avatar={avatar}
          />
          <ChipsSection 
            avatar={avatar}
            chips={chips}
            onChipClick={handleChipClick}
            selectedChips={selectedChips}
          />
        </>
      ) : (
        <ConversationView 
          avatar={avatar}
          messages={messages}
          relationshipXP={xp}
          onSendMessage={handleCustomMessage}
          onBack={() => setStage('interpretation')}
          remainingChips={remainingChips}
          onChipClick={handleChipClick}
        />
      )}
    </div>
  );
}

// Wrap in provider
<AvatarThemeProvider>
  <ReadingEngine />
</AvatarThemeProvider>
```

---

## Deployment Checklist

### Pre-Deploy
- [ ] Run all tests: `npm test`
- [ ] Build: `npm run build`
- [ ] Check bundle size
- [ ] Test avatar switching in built version
- [ ] Verify body classes apply correctly
- [ ] Check all 4 avatars render properly

### Post-Deploy
- [ ] Test on iOS Safari (avatar theme compatibility)
- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Verify card display gradients
- [ ] Check conversation flow
- [ ] Verify XP tracking
- [ ] Test chip selection/disabling

---

## Key Differences from Vanilla App

### Vanilla App
- Direct DOM manipulation
- Inline event handlers
- Function-based state management
- Manual class toggling

### React App
- React hooks & context
- Component-based architecture
- Centralized state management
- Declarative class application

### Shared Principles
✅ Body-level theme application  
✅ Avatar-specific styling  
✅ Reusable patterns  
✅ Consistent UX across avatars  
✅ Explore Further conversation feature  
✅ XP tracking system  

---

## Future Enhancements

1. **API Integration**
   - Connect to Claude API for live avatar responses
   - Store conversation history
   - Implement user profiles

2. **Advanced Features**
   - Relationship level progression (unlock new content at higher XP)
   - Avatar favorite tracks player integration
   - Animated card reveals
   - Save/share readings

3. **Performance**
   - Lazy load avatar-specific assets
   - Code splitting by avatar
   - Optimize bundle size

---

## Maintenance Notes

### Adding New Avatar
1. Add avatar ID to `AvatarId` type
2. Create avatar theme CSS in `avatar-themes.css`
3. Add body class in `index.css`
4. Add avatar config to `avatarData.ts`
5. Add question chips to `conversationData.ts`
6. Add responses to `conversationData.ts`
7. Update tests to include new avatar

### Modifying Avatar Personality
1. Update response text in `conversationData.ts`
2. Maintain consistent voice patterns
3. Run tests to verify consistency
4. Update documentation if personality traits change

### Styling Updates
1. Modify `avatar-themes.css` for avatar-specific changes
2. Modify `index.css` for global changes
3. Test across all 4 avatars to ensure no regressions
4. Verify body background displays correctly

---

## Support & Troubleshooting

### Common Issues

**Issue:** Avatar background not showing  
**Fix:** Ensure `AvatarThemeProvider` wraps app, check body class applied

**Issue:** Chips not disabling after click  
**Fix:** Verify `selectedChips` state updates, check prop passing

**Issue:** Tests failing  
**Fix:** Run `npm install`, ensure all dependencies installed

**Issue:** XP not tracking  
**Fix:** Check `getAvatarResponse` returns xp value, verify state updates

---

## Contact & Contribution

Built for Majestic - The Co-Star for Intuition  
Project Lead: Oso (Loveburn / Gumdrop Labs)  
Architecture: Reusable components, comprehensive testing, production-ready
