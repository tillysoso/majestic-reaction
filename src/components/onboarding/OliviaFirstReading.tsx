import { useState } from 'react';
import './OliviaFirstReading.css';

type Stage = 'welcome' | 'shuffling' | 'card-reveal' | 'interpretation' | 'conversation';

interface Message {
  speaker: 'user' | 'olivia';
  text: string;
  xp?: number;
}

interface QuestionChip {
  id: string;
  text: string;
}

const OliviaFirstReading = () => {
  const [stage, setStage] = useState<Stage>('welcome');
  const [isSaved, setIsSaved] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [relationshipXP, setRelationshipXP] = useState(0);
  const [isFirstTime] = useState(true);

  const drawnCard = {
    id: 'the-chariot',
    name: 'The Chariot',
    number: 'VII',
    keywords: ['willpower', 'determination', 'control', 'victory'],
    strengths: [
      { label: 'Control', description: 'The ability to harness opposing forces and direct them toward a goal' },
      { label: 'Initiative', description: 'Taking decisive action when it matters most' },
      { label: 'Focus', description: 'Maintaining clarity and direction even in chaos' }
    ],
    weaknesses: [
      { label: 'Rigidity', description: 'Being so focused on control that you miss opportunities for flow' },
      { label: 'Burnout', description: 'Pushing forward without allowing time to rest and recharge' }
    ]
  };

  const oliviaContent = {
    dailyDrawIntro: `Okay babe, The Chariot is showing up and honestly? This is your moment to own your power.

Like — you've been doing the work. You've been balancing all these different parts of your life, right? And this card is basically saying: you're ready. You're in the driver's seat now.

The real question isn't "can I do this?" — it's "what am I actually trying to control here?"

Because here's the thing: The Chariot isn't about bulldozing through. It's about alignment. It's about getting all your different energies moving in the same direction.`,
    affirmation: 'I trust my ability to move forward with intention. I am in control of my direction, even when the path isn\'t clear.'
  };

  const questionChips: QuestionChip[] = [
    { id: 'action', text: 'What action should I take today?' },
    { id: 'obstacle', text: "What's blocking me?" },
    { id: 'trust', text: 'How do I trust my intuition more?' }
  ];

  const responses: Record<string, { message: string; xp: number }> = {
    action: {
      message: "Here's what I'd say — start with something that feels aligned, not forced. The Chariot isn't about pushing; it's about moving with purpose. What's one thing you could do today that would make you feel more in control of your direction?",
      xp: 2
    },
    obstacle: {
      message: "Sometimes the thing blocking us is our own need for perfect control. The Chariot wants you to lead, but it also wants you to trust the process. What would happen if you loosened your grip just a little?",
      xp: 2
    },
    trust: {
      message: "Trusting your intuition is like trusting your ability to drive — you can't overthink every tiny adjustment. You just... know. Start paying attention to what feels right in your body, not just what makes sense in your head.",
      xp: 2
    }
  };

  const nextStage = (newStage: Stage) => {
    setStage(newStage);
  };

  const handleDrawCard = () => {
    nextStage('shuffling');
    setTimeout(() => nextStage('card-reveal'), 2000);
  };

  const saveReading = () => {
    setIsSaved(true);
    setTimeout(() => {
      alert('✓ Reading saved! You can find it in your journal.');
    }, 100);
  };

  const handleChipClick = (chipId: string) => {
    const chip = questionChips.find(c => c.id === chipId);
    const response = responses[chipId];
    
    if (chip && response) {
      setConversation(prev => [
        ...prev,
        { speaker: 'user', text: chip.text },
        { speaker: 'olivia', text: response.message, xp: response.xp }
      ]);
      setRelationshipXP(prev => prev + response.xp);
      nextStage('conversation');
    }
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    setConversation(prev => [...prev, { speaker: 'user', text: message }]);
    
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        {
          speaker: 'olivia',
          text: "I'm listening. Tell me more about that—what's coming up for you?",
          xp: 1
        }
      ]);
      setRelationshipXP(prev => prev + 1);
    }, 1000);
  };

  const goBack = () => {
    setStage('interpretation');
  };

  return (
    <div className="olivia-first-reading">
      {stage === 'welcome' && (
        <div className="container">
          <div className="header">
            <div className="avatar-icon">🌿</div>
            <div className="avatar-info">
              <h2>Olivia</h2>
              <p>Earth Guide • Level 1</p>
            </div>
          </div>

          <div className="content">
            <div className="message-box">
              <p>Hey! 💚 So glad you're here. I'm Olivia, and I'm here to help you understand what your cards are trying to tell you.</p>
              <p>Here's the thing—I'm not here to tell you what to do. I'm here to help you trust yourself. The cards? They're just a mirror for what you already know deep down.</p>
              <p>Ready for your first reading?</p>
            </div>

            <button className="btn-primary" onClick={handleDrawCard}>
              Draw My Card
            </button>
          </div>
        </div>
      )}

      {stage === 'shuffling' && (
        <div className="shuffling-screen">
          <div className="shuffling-card"></div>
          <p className="shuffling-text">Shuffling your cards...</p>
        </div>
      )}

      {stage === 'card-reveal' && (
        <div className="container">
          <div className="header">
            <div className="avatar-icon">🌿</div>
            <div className="avatar-info">
              <h2>Olivia</h2>
              <p>Earth Guide • Level 1</p>
            </div>
          </div>

          <div className="content">
            <div className="card-display">
              <div className="card-content">
                <p className="card-number">{drawnCard.number}</p>
                <p className="card-name">THE CHARIOT</p>
              </div>
            </div>

            <div className="card-info">
              <h3>The Chariot</h3>
              <div className="keywords">
                {drawnCard.keywords.map(k => (
                  <span key={k} className="keyword">{k}</span>
                ))}
              </div>
            </div>

            <button className="btn-primary" onClick={() => nextStage('interpretation')}>
              What Does This Mean?
            </button>
          </div>
        </div>
      )}

      {stage === 'interpretation' && (
        <>
          {!isFirstTime && (
            <button className={`save-button ${isSaved ? 'saved' : ''}`} onClick={saveReading}>
              <span className="save-icon">{isSaved ? '✓' : '♡'}</span>
              <span>{isSaved ? 'Saved' : 'Save Reading'}</span>
            </button>
          )}
          
          <div className="container">
            <div className="header">
              <div className="avatar-icon">🌿</div>
              <div className="avatar-info">
                <h2>Olivia</h2>
                <p>Earth Guide • Level 1</p>
              </div>
            </div>

            <div className="scrollable">
              <div className="mini-card">
                <div className="mini-card-img">{drawnCard.number}</div>
                <div className="mini-card-info">
                  <h3>The Chariot</h3>
                  <p>Card 7 of 22 • Major Arcana</p>
                </div>
              </div>

              <div className="interpretation-box">
                <div className="olivia-message">
                  <div className="olivia-avatar">🌿</div>
                  <div className="olivia-text">{oliviaContent.dailyDrawIntro}</div>
                </div>
              </div>

              <div className="strengths-box">
                <h4>What to lean into</h4>
                {drawnCard.strengths.map((s, i) => (
                  <div key={i} className="item">
                    <div className="dot dot-olive"></div>
                    <div className="item-content">
                      <p>{s.label}</p>
                      <p>{s.description}</p>
                    </div>
                  </div>
                ))}
                
                <h4 style={{ marginTop: '1.5rem' }}>What to watch for</h4>
                {drawnCard.weaknesses.map((w, i) => (
                  <div key={i} className="item">
                    <div className="dot dot-amber"></div>
                    <div className="item-content">
                      <p>{w.label}</p>
                      <p>{w.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="affirmation-box">
                <p>"{oliviaContent.affirmation}"</p>
              </div>
            </div>

            <div className="chips-section">
              <p className="chips-label">Ask me anything about this card</p>
              {questionChips.map(chip => (
                <button key={chip.id} className="chip" onClick={() => handleChipClick(chip.id)}>
                  <span className="chip-icon">💬</span>
                  <span className="chip-text">{chip.text}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {stage === 'conversation' && (
        <>
          {!isFirstTime && (
            <button className={`save-button ${isSaved ? 'saved' : ''}`} onClick={saveReading}>
              <span className="save-icon">{isSaved ? '✓' : '♡'}</span>
              <span>{isSaved ? 'Saved' : 'Save Reading'}</span>
            </button>
          )}
          
          <div className="container">
            <button className="back-button" onClick={goBack}>
              <span>←</span>
              <span>Back to reading</span>
            </button>
            
            <div className="conversation-header">
              <div className="header" style={{ margin: 0 }}>
                <div className="avatar-icon">🌿</div>
                <div className="avatar-info">
                  <h2>Olivia</h2>
                  <p>Earth Guide • Level 1</p>
                </div>
              </div>
              <div className="xp-display">
                <p>Relationship</p>
                <p>{relationshipXP} XP</p>
              </div>
            </div>

            <div className="conversation-thread">
              <div className="context-card">
                <p>You drew</p>
                <p>The Chariot</p>
              </div>

              {conversation.map((msg, i) => (
                <div key={i} className={`message ${msg.speaker}`}>
                  <div className="message-bubble">
                    <p className="message-text">{msg.text}</p>
                    {msg.xp && <p className="xp-badge">+{msg.xp} XP</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="chips-section" style={{ marginBottom: '1rem' }}>
              {questionChips
                .filter(chip => !conversation.some(msg => msg.text === chip.text))
                .map(chip => (
                  <button key={chip.id} className="chip" onClick={() => handleChipClick(chip.id)}>
                    <span className="chip-icon">💬</span>
                    <span className="chip-text">{chip.text}</span>
                  </button>
                ))}
            </div>

            <div className="input-area">
              <input 
                type="text" 
                className="input-field" 
                placeholder="Type your question..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button className="send-btn" onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                sendMessage(input.value);
                input.value = '';
              }}>
                ➤
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OliviaFirstReading;
