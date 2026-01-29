import { useState } from 'react';
import './DestinyFirstReading.css';

type Stage = 'welcome' | 'shuffling' | 'card-reveal' | 'interpretation' | 'conversation';

interface Message {
  speaker: 'user' | 'destiny';
  text: string;
  xp?: number;
}

interface QuestionChip {
  id: string;
  text: string;
  icon: string;
}

const DestinyFirstReading = () => {
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
      { label: 'Control', description: 'The ability to harness opposing forces', symbol: '💧' },
      { label: 'Initiative', description: 'Taking decisive action', symbol: '🌱' },
      { label: 'Momentum', description: 'Using forward motion to maintain progress', symbol: '🍃' }
    ],
    weaknesses: [
      { label: 'Rigidity', description: 'Being too focused on the destination', symbol: '🪨' },
      { label: 'Burnout', description: 'Pushing too hard', symbol: '🔥' },
      { label: 'Aggression', description: 'Letting drive override compassion', symbol: '⚡' }
    ]
  };

  const destinyContent = {
    dailyDrawIntro: `The Chariot: A Study in Directed Will

The Chariot speaks to the convergence of intention and action. This is not impulsive movement—it is purposeful momentum. Consider it the difference between scattered effort and focused trajectory.

The Three-Phase Framework:
1. Clarity: Define the destination with precision
2. Commitment: Align your resources toward that endpoint
3. Course Correction: Adjust as needed without losing direction

The card invites you to examine: What would it look like to move forward with both confidence and flexibility?

Reflection: The Chariot doesn't promise an easy path. It promises that the path exists—and that you have what you need to walk it.`,
    affirmation: "I trust my direction. I adjust my approach without losing my way."
  };

  const questionChips: QuestionChip[] = [
    { id: 'love', text: 'How does this apply to relationships?', icon: '🌸' },
    { id: 'stuck', text: "I'm feeling uncertain...", icon: '🌾' },
    { id: 'career', text: 'What about my career path?', icon: '🌳' }
  ];

  const responses: Record<string, { message: string; xp: number }> = {
    love: {
      message: "In the context of relationships, The Chariot suggests a moment where clarity about your needs becomes paramount.\n\nThe Control strength here relates to emotional sovereignty—understanding what you want from partnership and being able to communicate it with grace and firmness.\n\nA pattern to watch: The Rigidity shadow manifests when we become so attached to our vision of the relationship that we stop seeing the actual person in front of us. True partnership requires both direction and adaptation.\n\nConsider: What conversation would bring more clarity to your relationship right now? And are you prepared to both speak your truth and hear theirs?",
      xp: 2
    },
    stuck: {
      message: "Uncertainty is information. Let's work with it rather than against it.\n\nThe Chariot appearing during a period of uncertainty suggests that you may be waiting for perfect clarity before taking action. But here's what I've observed: Clarity often emerges through movement, not before it.\n\nA useful framework:\n\n1. Identify what you DO know (even if it's small)\n2. Take one action based on that knowledge\n3. Observe what that action reveals\n4. Adjust and repeat\n\nThis isn't about forcing a decision. It's about recognizing that sometimes the path becomes visible only when we start walking it. What's one small step you could take today that feels aligned, even if you can't see the full journey?",
      xp: 3
    },
    career: {
      message: "Career-wise, The Chariot is an invitation to step into a more active role in shaping your professional trajectory.\n\nThe Initiative strength is particularly relevant here. It asks: What would it look like to create opportunities rather than wait for them? To position yourself intentionally rather than hope to be noticed?\n\nA note on the Aggression shadow: In professional contexts, this can manifest as achieving results while damaging relationships. The most sustainable career growth happens when you can build momentum while building bridges.\n\nReflection: Is there a project or position you've been considering but haven't pursued? What's holding you back—is it a genuine obstacle or a story you're telling yourself about what's possible?\n\nThe Chariot suggests the path is clearer than you think. Sometimes we just need permission to claim it.",
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
        { speaker: 'destiny', text: response.message, xp: response.xp }
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
          speaker: 'destiny',
          text: "yo that's deep... let me think about that for a sec. *taps fingers on desk* okay so here's my take—",
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
    <div className="destiny-first-reading">
      {stage === 'welcome' && (
        <div className="container">
          <div className="header">
            <div className="avatar-icon glitch">🌊</div>
            <div className="avatar-info">
              <h2>Destiny</h2>
              <p>Water Guide • Level 1</p>
            </div>
          </div>

          <div className="content">
            <div className="message-box">
              <p>yo! okay so I'm Destiny and I'm gonna be real with you—</p>
              <p>tarot isn't magic. it's a mirror. it's a way to trick your brain into admitting things you already know but won't say out loud. cool? cool.</p>
              <div className="meme-reference">
                📱 [insert that Spider-Man pointing meme but it's you and the cards]
              </div>
              <p>ready to see what your subconscious has been trying to tell you?</p>
            </div>

            <button className="btn-primary" onClick={handleDrawCard}>
              shuffle the deck
            </button>
          </div>
        </div>
      )}

      {stage === 'shuffling' && (
        <div className="shuffling-screen">
          <div className="shuffling-card"></div>
          <p className="shuffling-text">shuffling the chaos...</p>
        </div>
      )}

      {stage === 'card-reveal' && (
        <div className="container">
          <div className="header">
            <div className="avatar-icon glitch">🌊</div>
            <div className="avatar-info">
              <h2>Destiny</h2>
              <p>Water Guide • Level 1</p>
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
              decode this
            </button>
          </div>
        </div>
      )}

      {stage === 'interpretation' && (
        <>
          {!isFirstTime && (
            <button className={`save-button ${isSaved ? 'saved' : ''}`} onClick={saveReading}>
              <span className="save-icon">{isSaved ? '✓' : '♡'}</span>
              <span>{isSaved ? 'saved' : 'save reading'}</span>
            </button>
          )}
          
          <div className="container">
            <div className="header">
              <div className="avatar-icon glitch">🌊</div>
              <div className="avatar-info">
                <h2>Destiny</h2>
                <p>Water Guide • Level 1</p>
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
                <div className="destiny-message">
                  <div className="destiny-avatar">🌊</div>
                  <div className="destiny-text" dangerouslySetInnerHTML={{ __html: destinyContent.dailyDrawIntro }} />
                </div>
              </div>

              <div className="strengths-box">
                <h4>strengths to channel</h4>
                {drawnCard.strengths.map((s, i) => (
                  <div key={i} className="item">
                    <div className="symbol">{s.symbol}</div>
                    <div className="item-content">
                      <p>{s.label}</p>
                      <p>{s.description}</p>
                    </div>
                  </div>
                ))}
                
                <h4 style={{ marginTop: '1.5rem' }}>shadows to watch</h4>
                {drawnCard.weaknesses.map((w, i) => (
                  <div key={i} className="item">
                    <div className="symbol">{w.symbol}</div>
                    <div className="item-content">
                      <p>{w.label}</p>
                      <p>{w.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="affirmation-box">
                <p>{destinyContent.affirmation}</p>
              </div>
            </div>

            <div className="chips-section">
              <p className="chips-label">ask me anything about this card</p>
              {questionChips.map(chip => (
                <button key={chip.id} className="chip" onClick={() => handleChipClick(chip.id)}>
                  <span className="chip-icon">{chip.icon}</span>
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
              <span>{isSaved ? 'saved' : 'save reading'}</span>
            </button>
          )}
          
          <div className="container">
            <button className="back-button" onClick={goBack}>
              <span>←</span>
              <span>back to reading</span>
            </button>
            
            <div className="conversation-header">
              <div className="header" style={{ margin: 0 }}>
                <div className="avatar-icon glitch">🌊</div>
                <div className="avatar-info">
                  <h2>Destiny</h2>
                  <p>Water Guide • Level 1</p>
                </div>
              </div>
              <div className="xp-display">
                <p>relationship</p>
                <p>{relationshipXP} xp</p>
              </div>
            </div>

            <div className="conversation-thread">
              <div className="context-card">
                <p>your card</p>
                <p>The Chariot</p>
              </div>

              {conversation.map((msg, i) => (
                <div key={i} className={`message ${msg.speaker}`}>
                  <div className="message-bubble">
                    <p className="message-text">{msg.text}</p>
                    {msg.xp && <p className="xp-badge">+{msg.xp} xp</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="chips-section" style={{ marginBottom: '1rem' }}>
              {questionChips
                .filter(chip => !conversation.some(msg => msg.text === chip.text))
                .map(chip => (
                  <button key={chip.id} className="chip" onClick={() => handleChipClick(chip.id)}>
                    <span className="chip-icon">{chip.icon}</span>
                    <span className="chip-text">{chip.text}</span>
                  </button>
                ))}
            </div>

            <div className="input-area">
              <input 
                type="text" 
                className="input-field" 
                placeholder="type your question..."
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

export default DestinyFirstReading;
