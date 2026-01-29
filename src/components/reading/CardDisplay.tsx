/**
 * CardDisplay Component
 * Large card display with avatar-specific gradients
 * Matches onboarding flow styling
 */

import React from 'react';
import type { CardDisplayProps } from '@/types/reading.types';

export const CardDisplay: React.FC<CardDisplayProps> = ({ 
  card, 
  avatar, 
  birthdate, 
  readingType 
}) => {
  return (
    <>
      {/* Large Card Container (16rem × 24rem with gradient) */}
      <div className="card-display">
        <div className="card-content">
          <p className="card-number">{card.emoji}</p>
          <p className="card-name">{card.name}</p>
        </div>
      </div>

      {/* Card Info Below */}
      <div className="card-info">
        <h3>{card.name}</h3>
        {birthdate && <p>Birth Date: {birthdate}</p>}
        {card.keywords && card.keywords.length > 0 && (
          <div className="keywords">
            {card.keywords.map((keyword, index) => (
              <span key={index} className="keyword">
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
