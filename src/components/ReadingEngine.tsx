import { useState } from 'react';
import { useAvatarSelection } from '@/hooks/useAvatarTheme';
import { getRandomCards } from '@/shared/cardData';
import { generateGenericReading, prepareForPersonalization } from '@/services/readingService';
import './ReadingEngine.css';

type SpreadType = 'daily' | 'threespread' | 'birthcard';

const ReadingEngine = () => {
  const { selectedAvatar, avatarData, selectAvatar } = useAvatarSelection('destiny');
  const [spreadType, setSpreadType] = useState<SpreadType>('daily');
  const [reading, setReading] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const avatars = [
    { id: 'olivia', name: 'Olivia', element: 'Earth', icon: '🌱', color: '#7ED321' },
    { id: 'elijah', name: 'Elijah', element: 'Air', icon: '🌬️', color: '#9E9E9E' },
    { id: 'destiny', name: 'Destiny', element: 'Water', icon: '🌊', color: '#4A90E2' },
    { id: 'casper', name: 'Casper', element: 'Fire', icon: '🔥', color: '#E53E3E' },
  ];

  const generateReading = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const cardCount = spreadType === 'daily' || spreadType === 'birthcard' ? 1 : 3;
      const cards = getRandomCards(cardCount);
      const cardIds = cards.map(c => c.id);
      
      const genericReading = generateGenericReading(cardIds, spreadType);
      
      if (genericReading) {
        const prepared = prepareForPersonalization(genericReading);
        setReading({
          ...genericReading,
          prepared,
          avatarId: selectedAvatar
        });
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className="reading-engine">
      <div className="container">
        <header className="reading-header">
          <h1>🔮 Majestic Tarot</h1>
          <p>The Co-Star for Intuition</p>
        </header>

        {/* Avatar Selection */}
        <section className="avatar-selection">
          <h2>Choose Your Guide</h2>
          <div className="avatar-grid">
            {avatars.map(avatar => (
              <button
                key={avatar.id}
                className={`avatar-card ${selectedAvatar === avatar.id ? 'active' : ''}`}
                onClick={() => selectAvatar(avatar.id)}
                style={{
                  borderColor: selectedAvatar === avatar.id ? avatar.color : 'transparent'
                }}
              >
                <div className="avatar-icon" style={{ fontSize: '48px' }}>{avatar.icon}</div>
                <div className="avatar-name">{avatar.name}</div>
                <div className="avatar-element">{avatar.element}</div>
              </button>
            ))}
          </div>
          
          {avatarData && (
            <div className="avatar-info" style={{ borderLeftColor: avatarData.theme.colors.primary }}>
              <div className="avatar-tagline">{avatarData.personality.tagline}</div>
              <div className="avatar-archetype">{avatarData.personality.archetype}</div>
            </div>
          )}
        </section>

        {/* Spread Type Selection */}
        <section className="spread-selection">
          <h2>Choose Your Reading</h2>
          <div className="spread-types">
            <button 
              className={`spread-btn ${spreadType === 'daily' ? 'active' : ''}`}
              onClick={() => setSpreadType('daily')}
            >
              <span className="spread-icon">☀️</span>
              <span>Daily Card</span>
            </button>
            <button 
              className={`spread-btn ${spreadType === 'threespread' ? 'active' : ''}`}
              onClick={() => setSpreadType('threespread')}
            >
              <span className="spread-icon">🎴</span>
              <span>Three-Card Spread</span>
            </button>
            <button 
              className={`spread-btn ${spreadType === 'birthcard' ? 'active' : ''}`}
              onClick={() => setSpreadType('birthcard')}
            >
              <span className="spread-icon">🎂</span>
              <span>Birth Card</span>
            </button>
          </div>
        </section>

        {/* Generate Button */}
        <div className="generate-section">
          <button 
            className="generate-btn"
            onClick={generateReading}
            disabled={loading}
            style={{
              backgroundColor: avatarData?.theme.colors.primary,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Drawing Cards...' : 'Generate Reading'}
          </button>
        </div>

        {/* Reading Display */}
        {reading && (
          <section className="reading-display">
            <div className="reading-header">
              <h2>Your {spreadType === 'daily' ? 'Daily' : spreadType === 'birthcard' ? 'Birth Card' : 'Three-Card'} Reading</h2>
              <p className="reading-theme">{reading.overallTheme}</p>
            </div>

            <div className="cards-display">
              {reading.cards.map((card: any, index: number) => (
                <div key={index} className="card-result">
                  <div className="card-position">{card.position.name}</div>
                  <div className="card-emoji">{card.keywords[0] === 'new beginnings' ? '🃏' : 
                    card.keywords[0] === 'love' ? '🍷' :
                    card.keywords[0] === 'challenge' ? '🔥' :
                    card.keywords[0] === 'generosity' ? '🪙' : '⚔️'}</div>
                  <div className="card-name">{card.cardName}</div>
                  <div className="card-keywords">{card.keywords.slice(0, 3).join(' • ')}</div>
                  <div className="card-meaning">{card.genericMeaning}</div>
                </div>
              ))}
            </div>

            <div className="avatar-note">
              <strong>Note:</strong> In production, this would be personalized by {avatarData?.name} 
              using Claude API. Currently showing generic interpretation.
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReadingEngine;
