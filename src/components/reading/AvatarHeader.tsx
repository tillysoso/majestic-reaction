/**
 * AvatarHeader Component
 * Consistent header across all avatar reading views
 */

import React from 'react';
import type { AvatarHeaderProps } from '@/types/reading.types';

export const AvatarHeader: React.FC<AvatarHeaderProps> = ({ config, relationshipXP }) => {
  return (
    <div className="avatar-header">
      <div className="avatar-icon">{config.icon}</div>
      <div className="avatar-info">
        <h2>{config.name}</h2>
        <p>
          {config.element} Guide • Level {config.level}
          {relationshipXP !== undefined && ` • ${relationshipXP} XP`}
        </p>
      </div>
    </div>
  );
};
