import { useState } from 'react';
import { 
  getRandomCard, 
  getRandomCards, 
  getAllCardIds,
  getCardsBySuit 
} from '@/shared/cardData';
import { 
  calculateBirthCard, 
  calculateDailyCard,
  getBirthCardId,
  getDailyCardId,
  isCardImplemented,
  formatBirthDate 
} from '@/shared/spreadCalculations';
import { useAllAvatars, useAvatarData } from '@/hooks/useAvatarTheme';
import './SystemDemo.css';

const SystemDemo = () => {
  const [birthDate, setBirthDate] = useState('1990-03-15');
  const [dailyDate, setDailyDate] = useState(new Date().toISOString().split('T')[0]);
  const [output, setOutput] = useState('');
  const [selectedDemoAvatar, setSelectedDemoAvatar] = useState('destiny');
  
  const avatarIds = useAllAvatars();
  const avatarData = useAvatarData(selectedDemoAvatar);

  const runDemo = (demoFn: () => string) => {
    const result = demoFn();
    setOutput(result);
  };

  return (
    <div className="system-demo">
      <div className="container">
        <header className="demo-header">
          <h1>⚙️ System Utilities Demo</h1>
          <p>Interactive testing of all Majestic utilities</p>
        </header>

        {/* Card Data Utilities */}
        <section className="demo-section">
          <h2>1. Card Data Utilities</h2>
          <div className="demo-controls">
            <button 
              className="demo-btn"
              onClick={() => runDemo(() => {
                const cardIds = getAllCardIds();
                return `=== ALL CARDS ===\n\nTotal: ${cardIds.length} cards\n\n${
                  cardIds.map(id => {
                    const card = getRandomCard();
                    return `${card.name} - ${card.suit} - ${card.element}`;
                  }).join('\n')
                }`;
              })}
            >
              Show All Cards
            </button>
            
            <button 
              className="demo-btn"
              onClick={() => runDemo(() => {
                const card = getRandomCard();
                return `=== RANDOM CARD ===\n\n${card.name}\n\nKeywords: ${card.keywords.join(', ')}\n\n${card.uprightMeaning}`;
              })}
            >
              Draw Random Card
            </button>
            
            <button 
              className="demo-btn"
              onClick={() => runDemo(() => {
                const cards = getRandomCards(3);
                return `=== THREE CARDS ===\n\n${
                  cards.map((c, i) => `${i + 1}. ${c.name} - ${c.keywords.slice(0, 2).join(', ')}`).join('\n')
                }`;
              })}
            >
              Draw 3 Cards
            </button>

            <button 
              className="demo-btn"
              onClick={() => runDemo(() => {
                const suits = ['major', 'cups', 'wands', 'pentacles', 'swords'];
                return `=== CARDS BY SUIT ===\n\n${
                  suits.map(suit => {
                    const cards = getCardsBySuit(suit as any);
                    return `${suit.toUpperCase()}: ${cards.length} card(s)`;
                  }).join('\n')
                }`;
              })}
            >
              Filter by Suit
            </button>
          </div>
        </section>

        {/* Birth Card Calculator */}
        <section className="demo-section">
          <h2>2. Birth Card Calculator</h2>
          <div className="demo-controls">
            <input 
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="demo-input"
              max="2010-01-01"
            />
            <button 
              className="demo-btn primary"
              onClick={() => runDemo(() => {
                const date = new Date(birthDate);
                const birthCardNum = calculateBirthCard(date);
                const birthCardId = getBirthCardId(date);
                const implemented = isCardImplemented(birthCardNum);
                
                return `=== BIRTH CARD ===\n\nDate: ${formatBirthDate(date)}\nCard Number: ${birthCardNum}\nCard ID: ${birthCardId || 'NOT IMPLEMENTED'}\nAvailable: ${implemented ? 'Yes ✅' : 'No (coming soon)'}`;
              })}
            >
              Calculate Birth Card
            </button>
          </div>
        </section>

        {/* Daily Card Calculator */}
        <section className="demo-section">
          <h2>3. Daily Card Calculator</h2>
          <div className="demo-controls">
            <input 
              type="date"
              value={dailyDate}
              onChange={(e) => setDailyDate(e.target.value)}
              className="demo-input"
            />
            <button 
              className="demo-btn primary"
              onClick={() => runDemo(() => {
                const birth = new Date(birthDate);
                const daily = new Date(dailyDate);
                const birthCardNum = calculateBirthCard(birth);
                const dailyCardNum = calculateDailyCard(birthCardNum, daily);
                const dailyCardId = getDailyCardId(birth, daily);
                const implemented = isCardImplemented(dailyCardNum);
                
                return `=== DAILY CARD ===\n\nBirth Date: ${formatBirthDate(birth)}\nDaily Date: ${formatBirthDate(daily)}\n\nBirth Card #: ${birthCardNum}\nDaily Card #: ${dailyCardNum}\nDaily Card ID: ${dailyCardId || 'NOT IMPLEMENTED'}\nAvailable: ${implemented ? 'Yes ✅' : 'No (coming soon)'}`;
              })}
            >
              Calculate Daily Card
            </button>
          </div>
        </section>

        {/* Avatar Theme Viewer */}
        <section className="demo-section">
          <h2>4. Avatar Theme System</h2>
          <div className="avatar-selector">
            {avatarIds.map(id => (
              <button
                key={id}
                className={`avatar-option ${selectedDemoAvatar === id ? 'active' : ''}`}
                onClick={() => setSelectedDemoAvatar(id)}
              >
                {id}
              </button>
            ))}
          </div>
          
          <button 
            className="demo-btn primary"
            onClick={() => runDemo(() => {
              if (!avatarData) return 'No avatar data';
              
              return `=== ${avatarData.name.toUpperCase()} THEME ===\n\nElement: ${avatarData.element}\nSuit: ${avatarData.suit}\n\n--- COLORS ---\nPrimary: ${avatarData.theme.colors.primary}\nSecondary: ${avatarData.theme.colors.secondary}\nAccent: ${avatarData.theme.colors.accent}\n\n--- PERSONALITY ---\nTagline: ${avatarData.personality.tagline}\nArchetype: ${avatarData.personality.archetype}\nTheme Song: ${avatarData.personality.themeSong}\n\nBest For: ${avatarData.personality.bestFor}`;
            })}
          >
            Show Avatar Theme
          </button>
        </section>

        {/* Output Display */}
        {output && (
          <section className="output-section">
            <h2>Output</h2>
            <pre className="output-display">{output}</pre>
          </section>
        )}
      </div>
    </div>
  );
};

export default SystemDemo;
