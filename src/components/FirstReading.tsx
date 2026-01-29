import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAvatarData } from '@/shared/avatarData';
import './FirstReading.css';

type Stage = 'welcome' | 'shuffling' | 'reveal' | 'interpretation' | 'conversation';

interface Message {
  type: 'user' | 'avatar';
  text: string;
}

const CARD_DATA = {
  id: 'the-chariot',
  name: 'The Chariot',
  number: 7,
  emoji: '🏇',
  keywords: ['willpower', 'determination', 'control', 'victory'],
  strengths: [
    { label: 'Control', description: 'The ability to harness opposing forces' },
    { label: 'Initiative', description: 'Taking decisive action' },
    { label: 'Victory', description: 'Triumph through focused energy' }
  ],
  watchOut: [
    { label: 'Burnout', description: 'Pushing too hard without rest' },
    { label: 'Control Issues', description: 'Trying to control everything' }
  ],
  affirmation: 'I harness my inner strength to move forward with purpose and grace.'
};

const FirstReading = () => {
  const { avatarId } = useParams<{ avatarId: string }>();
  const navigate = useNavigate();
  const avatarData = avatarId ? getAvatarData(avatarId) : null;
  
  const [stage, setStage] = useState<Stage>('welcome');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [xp, setXp] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!avatarData) {
      navigate('/onboarding');
    }
  }, [avatarData, navigate]);

  if (!avatarData) return null;

  const handleContinue = () => {
    if (stage === 'welcome') {
      setStage('shuffling');
      setTimeout(() => setStage('reveal'), 2000);
    } else if (stage === 'reveal') {
      setStage('interpretation');
    } else if (stage === 'interpretation') {
      setStage('conversation');
      setXp(10);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In production, save to localStorage or backend
  };

  const renderWelcomeScreen = () => (
    <div className="container">
      <div className="header">
        <div 
          className="avatar-icon" 
          style={{ background: `linear-gradient(135deg, ${avatarData.theme.colors.primary}, ${avatarData.theme.colors.secondary})` }}
        >
          {avatarData.element === 'Earth' && '🌿'}
          {avatarData.element === 'Air' && '💨'}
          {avatarData.element === 'Water' && '🌊'}
          {avatarData.element === 'Fire' && '🔥'}
        </div>
        <div className="avatar-info">
          <h2 style={{ color: avatarData.theme.colors.primary }}>{avatarData.name}</h2>
          <p style={{ color: avatarData.theme.colors.secondary }}>
            {avatarData.element} • {avatarData.personality.archetype}
          </p>
        </div>
      </div>

      <div className="content">
        <div className="message-box">
          <p>Hey! I'm {avatarData.name}, your {avatarData.element} guide.</p>
          <p>{avatarData.personality.tagline}</p>
          <p>Ready to pull your first card with me? This is where our journey begins.</p>
        </div>

        <button 
          className="btn-primary"
          style={{ background: avatarData.theme.colors.primary }}
          onClick={handleContinue}
        >
          Let's do this
        </button>
      </div>
    </div>
  );

  const renderShufflingScreen = () => (
    <div className="shuffling-screen">
      <div 
        className="shuffling-card"
        style={{ background: `linear-gradient(to bottom right, ${avatarData.theme.colors.primary}, ${avatarData.theme.colors.secondary})` }}
      />
      <div className="shuffling-text">Shuffling the deck...</div>
    </div>
  );

  const renderRevealScreen = () => (
    <div className="container">
      <button className="back-button" onClick={() => setStage('welcome')}>
        ← <span>Back</span>
      </button>

      <div className="content">
        <div 
          className="card-display"
          style={{ background: `linear-gradient(to bottom right, ${avatarData.theme.colors.primary}, ${avatarData.theme.colors.secondary})` }}
        >
          <div className="card-content">
            <div className="card-number">{CARD_DATA.emoji}</div>
            <div className="card-name">{CARD_DATA.name}</div>
          </div>
        </div>

        <div className="card-info">
          <h3>{CARD_DATA.name}</h3>
          <div className="keywords">
            {CARD_DATA.keywords.map(kw => (
              <span 
                key={kw} 
                className="keyword"
                style={{ background: avatarData.theme.colors.accent }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="message-box">
          <p>This is {CARD_DATA.name}. Strong card. Let me break down what this means for you.</p>
        </div>

        <button 
          className="btn-primary"
          style={{ background: avatarData.theme.colors.primary }}
          onClick={handleContinue}
        >
          Show me
        </button>
      </div>
    </div>
  );

  const renderInterpretationScreen = () => (
    <div className="container">
      <button className="back-button" onClick={() => setStage('reveal')}>
        ← <span>Back</span>
      </button>

      <div className="content scrollable">
        <div className="mini-card">
          <div 
            className="mini-card-img"
            style={{ background: `linear-gradient(to bottom right, ${avatarData.theme.colors.primary}, ${avatarData.theme.colors.secondary})` }}
          >
            {CARD_DATA.number}
          </div>
          <div className="mini-card-info">
            <h3>{CARD_DATA.name}</h3>
            <p>{CARD_DATA.keywords.join(' • ')}</p>
          </div>
        </div>

        <div className="interpretation-box">
          <div className="olivia-message">
            <div 
              className="olivia-avatar"
              style={{ background: avatarData.theme.colors.accent }}
            >
              {avatarData.element === 'Earth' && '🌿'}
              {avatarData.element === 'Air' && '💨'}
              {avatarData.element === 'Water' && '🌊'}
              {avatarData.element === 'Fire' && '🔥'}
            </div>
            <div className="olivia-text">
              <h4>{CARD_DATA.name}</h4>
              <p>This card is about moving forward with purpose. You've got opposing forces in your life right now, and {CARD_DATA.name} says you have what it takes to harness them.</p>
            </div>
          </div>
        </div>

        <div className="section-title">
          <h3 style={{ color: avatarData.theme.colors.primary }}>STRENGTHS</h3>
          <p>What's working for you</p>
        </div>

        {CARD_DATA.strengths.map(item => (
          <div key={item.label} className="list-item">
            <div className="item-icon" style={{ color: avatarData.theme.colors.primary }}>✓</div>
            <div className="item-content">
              <p>{item.label}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

        <div className="section-title">
          <h3 style={{ color: avatarData.theme.colors.primary }}>THINGS TO WATCH</h3>
          <p>Potential challenges</p>
        </div>

        {CARD_DATA.watchOut.map(item => (
          <div key={item.label} className="list-item">
            <div className="item-icon" style={{ color: avatarData.theme.colors.secondary }}>⚠</div>
            <div className="item-content">
              <p>{item.label}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

        <div 
          className="affirmation-box"
          style={{ background: `linear-gradient(to bottom right, ${avatarData.theme.colors.primary}, ${avatarData.theme.colors.secondary})` }}
        >
          <p>"{CARD_DATA.affirmation}"</p>
        </div>

        <button 
          className="btn-primary"
          style={{ background: avatarData.theme.colors.primary }}
          onClick={handleContinue}
        >
          Got it
        </button>
      </div>
    </div>
  );

  const renderConversationScreen = () => (
    <div className="container">
      <div className="conversation-header">
        <div className="header">
          <div 
            className="avatar-icon"
            style={{ background: `linear-gradient(135deg, ${avatarData.theme.colors.primary}, ${avatarData.theme.colors.secondary})` }}
          >
            {avatarData.element === 'Earth' && '🌿'}
            {avatarData.element === 'Air' && '💨'}
            {avatarData.element === 'Water' && '🌊'}
            {avatarData.element === 'Fire' && '🔥'}
          </div>
          <div className="avatar-info">
            <h2 style={{ color: avatarData.theme.colors.primary }}>{avatarData.name}</h2>
            <p style={{ color: avatarData.theme.colors.secondary }}>Here to guide you</p>
          </div>
        </div>
        <div className="xp-display">
          <p>Connection</p>
          <p style={{ color: avatarData.theme.colors.primary }}>{xp} XP</p>
        </div>
      </div>

      <div className="conversation-thread scrollable">
        <div className="context-card">
          <p>Current Card</p>
          <p>{CARD_DATA.name}</p>
        </div>

        {conversation.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            <div 
              className="message-bubble"
              style={msg.type === 'user' ? { background: avatarData.theme.colors.primary } : {}}
            >
              <div className="message-text">{msg.text}</div>
            </div>
          </div>
        ))}

        {conversation.length === 0 && (
          <div className="message avatar">
            <div className="message-bubble">
              <div className="message-text">
                Want to go deeper on {CARD_DATA.name}? Ask me anything about what this card means for you.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chips-section">
        <div className="chips-label">Quick questions:</div>
        <button className="chip" onClick={() => {}}>
          <span className="chip-icon">🎯</span>
          <span className="chip-text">How do I move forward?</span>
        </button>
        <button className="chip" onClick={() => {}}>
          <span className="chip-icon">💭</span>
          <span className="chip-text">What should I focus on?</span>
        </button>
        <button className="chip" onClick={() => {}}>
          <span className="chip-icon">🌟</span>
          <span className="chip-text">What's my biggest strength here?</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="first-reading">
      <button 
        className={`save-button ${isSaved ? 'saved' : ''}`}
        onClick={handleSave}
        style={isSaved ? { 
          background: avatarData.theme.colors.primary,
          borderColor: avatarData.theme.colors.primary 
        } : {
          borderColor: avatarData.theme.colors.primary,
          color: avatarData.theme.colors.primary
        }}
      >
        <span className="save-icon">{isSaved ? '✓' : '📌'}</span>
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </button>

      {stage === 'welcome' && renderWelcomeScreen()}
      {stage === 'shuffling' && renderShufflingScreen()}
      {stage === 'reveal' && renderRevealScreen()}
      {stage === 'interpretation' && renderInterpretationScreen()}
      {stage === 'conversation' && renderConversationScreen()}
    </div>
  );
};

export default FirstReading;
