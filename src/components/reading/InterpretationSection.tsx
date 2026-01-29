/**
 * InterpretationSection Component
 * Displays card interpretation with title, text, and reflection points
 */

import React from 'react';
import type { InterpretationSectionProps } from '@/types/reading.types';

export const InterpretationSection: React.FC<InterpretationSectionProps> = ({
  title,
  text,
  points,
  avatar
}) => {
  return (
    <div className="interpretation-section">
      <h2 className="interpretation-title">{title}</h2>
      <p className="interpretation-text">{text}</p>
      
      {points && points.length > 0 && (
        <ul className="reflection-points">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
