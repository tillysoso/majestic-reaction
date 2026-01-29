/**
 * ChipsSection Component
 * Displays question chips for "Explore Further" feature
 */

import React from 'react';
import type { ChipsSectionProps } from '@/types/reading.types';

export const ChipsSection: React.FC<ChipsSectionProps> = ({
  avatar,
  chips,
  onChipClick,
  selectedChips
}) => {
  // Avatar-specific labels
  const chipLabels: Record<string, string> = {
    olivia: 'got questions? hit me',
    elijah: 'got questions? hit me',
    destiny: 'questions for reflection',
    casper: 'got questions? speak up'
  };

  const label = chipLabels[avatar] || 'got questions?';

  return (
    <div className="chips-section">
      <p className="chips-label">{label}</p>
      <div className="chips-container">
        {chips.map((chip) => (
          <button
            key={chip.id}
            className={`chip ${selectedChips.includes(chip.id) ? 'selected' : ''}`}
            onClick={() => onChipClick(chip.id)}
            disabled={selectedChips.includes(chip.id)}
          >
            <span className="chip-icon">{chip.icon}</span>
            <span className="chip-text">{chip.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
