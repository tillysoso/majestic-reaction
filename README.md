# Majestic React App - Setup & Quick Start

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 What's Included

### ✅ Complete Component Library
- **AvatarHeader** - Consistent header across all views
- **CardDisplay** - Large card container (16rem × 24rem) with gradients
- **InterpretationSection** - Reading text with reflection points
- **ChipsSection** - "Explore Further" question chips
- **ConversationView** - Message threading with XP tracking

### ✅ Theme System
- **AvatarThemeContext** - Body-level theme management
- **Body Classes** - Dynamic avatar background gradients
- **Avatar-specific CSS** - Unique fonts, colors, animations per avatar

### ✅ Data Layer
- **conversationData.ts** - Avatar question chips & personality responses
- **avatarData.ts** - Avatar configurations & metadata
- **cardData.ts** - Tarot card data

### ✅ TypeScript Types
- **reading.types.ts** - Complete interface definitions
- Type-safe props for all components
- Proper enum types for avatars, readings, stages

### ✅ Test Suite
- **AvatarStyling.test.tsx** - Component & styling consistency
- **ReadingConsistency.test.ts** - Personality & data consistency
- 30+ test cases covering all avatars

## 🎨 Avatar Personalities

### Olivia (Earth 🌱)
- **Style:** Conversational, warm, girls-girl energy
- **Font:** System (Apple)
- **Colors:** Olive green (#6b8e23), sage (#8fbc8f)
- **Background:** Light green to white gradient

### Elijah (Air 💨)
- **Style:** Lowercase, philosophical, cyberpunk
- **Font:** Courier New (monospace)
- **Colors:** Purple (#a855f7), pink (#ec4899)
- **Background:** Dark purple/blue gradient
- **Special:** Glitch animation

### Destiny (Water 🌊)
- **Style:** Contemplative, reflective, mystical
- **Font:** Georgia (serif)
- **Colors:** Teal (#0d9488), turquoise (#5eead4)
- **Background:** Teal/dark gradient
- **Special:** Gentle pulse animation

### Casper (Fire 🔥)
- **Style:** Direct, action-oriented, CAPS
- **Font:** System (bold)
- **Colors:** Orange (#f97316), red (#dc2626)
- **Background:** Orange/red dark gradient
- **Special:** Fire pulse animation, UPPERCASE text

## 🏗️ Architecture

See **ARCHITECTURE.md** for complete documentation.

## 🧪 Testing

```bash
npm test                    # Run all tests
npm test AvatarStyling     # Styling tests
npm test ReadingConsistency # Consistency tests
```

## 🚢 Deployment

```bash
npm run build              # Build for production
npm run preview            # Preview build locally
```

Deploy `dist` folder to Netlify/Vercel.

---

**Built with:** React 18 + TypeScript + Vite + Vitest  
**Status:** Production-ready 🚀
