import { useState } from 'react';
import './ElijahFirstReading.css';

type Stage = 'welcome' | 'shuffling' | 'card-reveal' | 'interpretation' | 'conversation';

interface Message {
  speaker: 'user' | 'elijah';
  text: string;
  xp?: number;
}

interface QuestionChip {
  id: string;
  text: string;
  icon: string;
}

const ElijahFirstReading = () => {
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
      { label: 'Control', description: 'The ability to harness opposing forces', symbol: '⚡' },
      { label: 'Initiative', description: 'Taking decisive action', symbol: '🎯' },
      { label: 'Momentum', description: 'Using forward motion to maintain progress', symbol: '🚀' }
    ],
    weaknesses: [
      { label: 'Rigidity', description: 'Being too focused on the destination', symbol: '🧱' },
      { label: 'Burnout', description: 'Pushing too hard', symbol: '🔥' },
      { label: 'Aggression', description: 'Letting drive override compassion', symbol: '⚔️' }
    ]
  };

  const elijahContent = {
    dailyDrawIntro: `hear me out—

The Chariot is basically that moment when you stop asking permission and just... <strong>GO</strong>. 

<div style="background: rgba(168, 85, 247, 0.1); padding: 0.75rem; border-left: 3px solid #a855f7; margin: 1rem 0; font-family: 'Courier New', monospace;">
    ╔═══════════╗
    ║  ⚡YOU→→→  ║
    ╚═══════════╝
</div>

But here's the thing: it's not about brute force. It's about <em>alignment</em>. Like when you're listening to music and suddenly the beat drops EXACTLY when you need it to. That's Chariot energy.

<div style="background: rgba(168, 85, 247, 0.1); padding: 0.75rem; margin: 1rem 0; font-style: italic;">
🌀 riddle for you: what moves fastest? the one who pushes hardest, or the one who removes friction?
</div>

<div style="background: rgba(168, 85, 247, 0.2); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
<strong>tl;dr:</strong>
<p style="margin-top: 0.5rem;">You already know what to do. The universe is literally giving you the green light. The only question is: are you gonna sit there or are you gonna DRIVE? 💨</p>
</div>`,
    affirmation: "I'm the driver AND the destination // momentum finds me when I stop waiting"
  };

  const questionChips: QuestionChip[] = [
    { id: 'love', text: 'What does this mean for love?', icon: '💕' },
    { id: 'stuck', text: 'I feel stuck though...', icon: '🌀' },
    { id: 'career', text: 'How does this apply to my career?', icon: '✨' }
  ];

  const responses: Record<string, { message: string; xp: number }> = {
    love: {
      message: "okay so The Chariot in love is FASCINATING because... *gestures wildly* ...it's not about chasing someone. It's about knowing your direction and letting the right people catch up to you?\n\nLike think about it: when you're truly moving toward something (not away from something, big difference), you naturally attract people who are going the same direction. The ones who aren't? They fall away. Not because you're pushing them—just physics.\n\nBut watch out for the Rigidity trap: sometimes we get so locked into our \"perfect relationship vision\" that we miss what's actually happening right in front of us. Are you driving toward love or toward a fantasy? 🎭",
      xp: 2
    },
    stuck: {
      message: "oof yeah that's the WORST. Getting a movement card when you feel like you're in cement.\n\nBut here's where it gets interesting: The Chariot isn't always about external movement. Sometimes it's about *internal alignment*. Like... imagine you're trying to move forward but your front wheels are pointing left and your back wheels are pointing right. You're not stuck because you're weak—you're stuck because your forces are canceling each other out.\n\nSo the question isn't \"how do I move?\" The question is: \"what part of me is pulling in a different direction, and why?\" 🧩\n\nOnce you align those internal forces? You won't even have to push. You'll just... go.",
      xp: 3
    },
    career: {
      message: "Career + Chariot = main character energy at work\n\nThis is the card that shows up when you're done waiting for someone to give you permission. Whether that's pitching the idea, asking for the raise, starting the side project, or just *deciding* you're leadership material now.\n\nThe Momentum strength is KEY here: sometimes you don't need the perfect plan. You need to start moving, because motion creates its own opportunities. (See also: every successful startup ever.)\n\nJust watch the Aggression shadow: steamrolling your team to hit your goals is... not it. Channel that drive into creating space for everyone to level up together. 🎯",
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
        { speaker: 'elijah', text: response.message, xp: response.xp }
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
          speaker: 'elijah',
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
    <div className="elijah-first-reading">
      {stage === 'welcome' && (
        <div className="container">
          <div className="header">
            <div className="avatar-icon glitch">💨</div>
            <div className="avatar-info">
              <h2>Elijah</h2>
              <p>Air Guide • Level 1</p>
            </div>
          </div>

          <div className="content">
            <div className="message-box">
              <p>yo! okay so I'm Elijah and I'm gonna be real with you—</p>
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
            <div className="avatar-icon glitch">💨</div>
            <div className="avatar-info">
              <h2>Elijah</h2>
              <p>Air Guide • Level 1</p>
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
              <div className="avatar-icon glitch">💨</div>
              <div className="avatar-info">
                <h2>Elijah</h2>
                <p>Air Guide • Level 1</p>
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
                <div className="elijah-message">
                  <div className="elijah-avatar">💨</div>
                  <div className="elijah-text" dangerouslySetInnerHTML={{ __html: elijahContent.dailyDrawIntro }} />
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
                <p>{elijahContent.affirmation}</p>
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
                <div className="avatar-icon glitch">💨</div>
                <div className="avatar-info">
                  <h2>Elijah</h2>
                  <p>Air Guide • Level 1</p>
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

export default ElijahFirstReading;
