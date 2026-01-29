import { useState } from 'react';
import './CasperFirstReading.css';

type Stage = 'welcome' | 'shuffling' | 'card-reveal' | 'interpretation' | 'conversation';

interface Message {
  speaker: 'user' | 'casper';
  text: string;
  xp?: number;
}

interface QuestionChip {
  id: string;
  text: string;
  icon: string;
}

const CasperFirstReading = () => {
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
      { label: 'Control', description: 'The ability to harness opposing forces', symbol: '🎯' },
      { label: 'Initiative', description: 'Taking decisive action', symbol: '⚡' },
      { label: 'Momentum', description: 'Using forward motion to maintain progress', symbol: '🔥' }
    ],
    weaknesses: [
      { label: 'Rigidity', description: 'Being too focused on the destination', symbol: '🪨' },
      { label: 'Burnout', description: 'Pushing too hard', symbol: '💥' },
      { label: 'Aggression', description: 'Letting drive override compassion', symbol: '⚔️' }
    ]
  };

  const casperContent = {
    dailyDrawIntro: `Here's the deal:

The Chariot is about taking the wheel and actually driving. Not planning to drive. Not thinking about driving. DRIVING.

Your Move Today:
• Identify one thing you've been circling
• Make a decision about it
• Take the first action—even if it's small

What to Watch:
Don't confuse movement with progress. The Chariot isn't about going fast—it's about going FORWARD. Big difference.

If you're pushing and nothing's moving? You're either pushing in the wrong direction or you need to align your internal forces first. Stop. Assess. Adjust.

Bottom Line:
You know what needs to happen. Now go.`,
    affirmation: "I MOVE WITH PURPOSE. I TRUST MY DIRECTION."
  };

  const questionChips: QuestionChip[] = [
    { id: 'love', text: 'What about love?', icon: '❤️' },
    { id: 'stuck', text: "I'm stuck. Help.", icon: '🚧' },
    { id: 'career', text: 'Career application?', icon: '💼' }
  ];

  const responses: Record<string, { message: string; xp: number }> = {
    love: {
      message: "Love. The Chariot.\n\nHere's what this means: Stop waiting for the other person to make a move. Stop hoping things will magically get clearer. If you want something, say it. If you need something, ask for it. If something isn't working, address it.\n\nThe Control strength here? It's about being clear on what you want and moving toward it with intention. Not manipulation—intention.\n\nThe trap? Trying to control HOW it unfolds. You can control your direction and your actions. You can't control their response. Accept that or you'll drive yourself insane.\n\nSo: What do you actually want? And what's one honest conversation you've been avoiding?",
      xp: 2
    },
    stuck: {
      message: "Stuck? Good. Let's fix it.\n\nFirst: Are you actually stuck, or are you just scared to move?\n\nBecause The Chariot showing up means the path is there. You might not like the path. It might be hard. But it's there.\n\nHere's what's probably happening: You're waiting for more information. More certainty. The \"perfect moment.\" None of that is coming. You already have enough to take the next step.\n\nSo here's your assignment:\n▸ Write down the three actions you KNOW you should take\n▸ Pick the smallest one\n▸ Do it today\n\nMovement creates clarity. Not the other way around.",
      xp: 3
    },
    career: {
      message: "Career + The Chariot = It's time to lead.\n\nEven if you're not \"leadership level\" yet. Even if you don't have the title. Leadership is a decision, not a permission slip.\n\nThis card is telling you:\n▸ Stop waiting to be given opportunities—create them\n▸ Stop asking for permission—show results\n▸ Stop hoping someone notices—make your work undeniable\n\nThe Initiative strength is your superpower right now. Use it.\n\nWarning: Don't steamroll your team to get ahead. The best leaders bring people with them. Channel that Momentum into lifting others while you rise.\n\nWhat's the one project you could take ownership of right now?",
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
        { speaker: 'casper', text: response.message, xp: response.xp }
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
          speaker: 'casper',
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
    <div className="casper-first-reading">
      {stage === 'welcome' && (
        <div className="container">
          <div className="header">
            <div className="avatar-icon glitch">🔥</div>
            <div className="avatar-info">
              <h2>Casper</h2>
              <p>Fire Guide • Level 1</p>
            </div>
          </div>

          <div className="content">
            <div className="message-box">
              <p>yo! okay so I'm Casper and I'm gonna be real with you—</p>
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
            <div className="avatar-icon glitch">🔥</div>
            <div className="avatar-info">
              <h2>Casper</h2>
              <p>Fire Guide • Level 1</p>
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
              <div className="avatar-icon glitch">🔥</div>
              <div className="avatar-info">
                <h2>Casper</h2>
                <p>Fire Guide • Level 1</p>
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
                <div className="casper-message">
                  <div className="casper-avatar">🔥</div>
                  <div className="casper-text" dangerouslySetInnerHTML={{ __html: casperContent.dailyDrawIntro }} />
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
                <p>{casperContent.affirmation}</p>
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
                <div className="avatar-icon glitch">🔥</div>
                <div className="avatar-info">
                  <h2>Casper</h2>
                  <p>Fire Guide • Level 1</p>
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

export default CasperFirstReading;
