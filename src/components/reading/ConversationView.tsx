/**
 * ConversationView Component
 * Message threading interface with XP display and remaining chips
 */

import React, { useState } from 'react';
import type { ConversationViewProps } from '@/types/reading.types';

export const ConversationView: React.FC<ConversationViewProps> = ({
  avatar,
  messages,
  relationshipXP,
  onSendMessage,
  onBack,
  remainingChips,
  onChipClick
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="conversation-view">
      {/* Back Button */}
      <button className="btn back-btn" onClick={onBack}>
        ← Back to Interpretation
      </button>

      {/* XP Display */}
      <div className="xp-display">
        <span className="xp-label">Relationship XP</span>
        <span className="xp-value">{relationshipXP}</span>
      </div>

      {/* Message Thread */}
      <div className="conversation-thread">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">
              {message.text}
              {message.xpGained && (
                <span className="xp-gained">+{message.xpGained} XP</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Remaining Chips */}
      {remainingChips.length > 0 && (
        <div className="remaining-chips">
          {remainingChips.map((chip) => (
            <button
              key={chip.id}
              className="chip"
              onClick={() => onChipClick(chip.id)}
            >
              <span className="chip-icon">{chip.icon}</span>
              <span className="chip-text">{chip.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="input-area">
        <input
          type="text"
          className="input-field"
          placeholder="Ask your own question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-btn" 
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};
