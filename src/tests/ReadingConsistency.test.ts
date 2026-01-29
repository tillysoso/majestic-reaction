/**
 * Reading Interpretation & Conversation Tests
 * Ensures consistency across avatar personalities and reading experiences
 */

import { describe, it, expect } from 'vitest';
import { getAvatarChips, getAvatarResponse } from '@/data/conversationData';
import type { AvatarId } from '@/types/reading.types';

describe('Avatar Question Chips', () => {
  const avatars: AvatarId[] = ['olivia', 'elijah', 'destiny', 'casper'];

  it('should provide 3 question chips for each avatar', () => {
    avatars.forEach(avatarId => {
      const chips = getAvatarChips(avatarId);
      expect(chips).toHaveLength(3);
    });
  });

  it('should have love, stuck, and career chips for all avatars', () => {
    avatars.forEach(avatarId => {
      const chips = getAvatarChips(avatarId);
      const chipIds = chips.map(c => c.id);
      
      expect(chipIds).toContain('love');
      expect(chipIds).toContain('stuck');
      expect(chipIds).toContain('career');
    });
  });

  it('should have unique chip text per avatar (personality-driven)', () => {
    const loveChips = avatars.map(avatar => 
      getAvatarChips(avatar).find(c => c.id === 'love')?.text
    );
    
    // All should be different
    const uniqueTexts = new Set(loveChips);
    expect(uniqueTexts.size).toBe(4);
  });

  it('should have appropriate icons for each chip', () => {
    avatars.forEach(avatarId => {
      const chips = getAvatarChips(avatarId);
      
      chips.forEach(chip => {
        expect(chip.icon).toBeTruthy();
        expect(chip.icon.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Avatar Responses', () => {
  const avatars: AvatarId[] = ['olivia', 'elijah', 'destiny', 'casper'];
  const questionIds = ['love', 'stuck', 'career'];

  it('should provide responses for all avatar-question combinations', () => {
    avatars.forEach(avatarId => {
      questionIds.forEach(questionId => {
        const response = getAvatarResponse(avatarId, questionId);
        
        expect(response).toBeTruthy();
        expect(response.message).toBeTruthy();
        expect(response.xp).toBeGreaterThan(0);
      });
    });
  });

  it('should have substantive responses (min 100 chars)', () => {
    avatars.forEach(avatarId => {
      questionIds.forEach(questionId => {
        const response = getAvatarResponse(avatarId, questionId);
        
        expect(response.message.length).toBeGreaterThan(100);
      });
    });
  });

  it('should award appropriate XP (1-3 points)', () => {
    avatars.forEach(avatarId => {
      questionIds.forEach(questionId => {
        const response = getAvatarResponse(avatarId, questionId);
        
        expect(response.xp).toBeGreaterThanOrEqual(1);
        expect(response.xp).toBeLessThanOrEqual(3);
      });
    });
  });

  it('should reflect unique personality voice per avatar', () => {
    const stuckResponses = avatars.map(avatar => 
      getAvatarResponse(avatar, 'stuck').message
    );
    
    // Check Olivia uses conversational tone
    expect(stuckResponses[0]).toMatch(/I hear|Here's what I'll say/i);
    
    // Check Elijah uses lowercase style
    expect(stuckResponses[1]).toMatch(/oof|yeah/);
    
    // Check Destiny uses contemplative tone
    expect(stuckResponses[2]).toMatch(/observe|information|suggest/i);
    
    // Check Casper uses direct/caps style
    expect(stuckResponses[3]).toMatch(/STUCK|Good\. Let's fix it/);
  });
});

describe('Conversation XP System', () => {
  it('should award more XP for vulnerable questions (stuck)', () => {
    const avatars: AvatarId[] = ['olivia', 'elijah', 'destiny', 'casper'];
    
    avatars.forEach(avatarId => {
      const stuckResponse = getAvatarResponse(avatarId, 'stuck');
      const loveResponse = getAvatarResponse(avatarId, 'love');
      
      // Stuck questions should generally award more XP (deeper vulnerability)
      expect(stuckResponse.xp).toBeGreaterThanOrEqual(loveResponse.xp);
    });
  });

  it('should track cumulative XP across conversation', () => {
    let totalXP = 0;
    const responses = [
      getAvatarResponse('olivia', 'love'),
      getAvatarResponse('olivia', 'stuck'),
      getAvatarResponse('olivia', 'career')
    ];
    
    responses.forEach(response => {
      totalXP += response.xp;
    });
    
    expect(totalXP).toBeGreaterThan(0);
    expect(totalXP).toBeLessThanOrEqual(9); // Max 3 questions × 3 XP
  });
});

describe('Reading Interpretation Consistency', () => {
  it('should ensure all avatars have complete response sets', () => {
    const avatars: AvatarId[] = ['olivia', 'elijah', 'destiny', 'casper'];
    const requiredQuestions = ['love', 'stuck', 'career'];
    
    avatars.forEach(avatarId => {
      requiredQuestions.forEach(questionId => {
        const response = getAvatarResponse(avatarId, questionId);
        
        expect(response).toBeDefined();
        expect(response.message).toBeTruthy();
        expect(response.xp).toBeGreaterThan(0);
      });
    });
  });

  it('should maintain personality consistency across all responses', () => {
    // Olivia - conversational, warm
    const oliviaResponses = [
      getAvatarResponse('olivia', 'love'),
      getAvatarResponse('olivia', 'stuck'),
      getAvatarResponse('olivia', 'career')
    ];
    
    oliviaResponses.forEach(response => {
      expect(response.message).toMatch(/Here's|I'll say|real/i);
    });
    
    // Elijah - lowercase, philosophical
    const elijahResponses = [
      getAvatarResponse('elijah', 'love'),
      getAvatarResponse('elijah', 'stuck'),
      getAvatarResponse('elijah', 'career')
    ];
    
    elijahResponses.forEach(response => {
      // Should have lowercase style markers
      expect(response.message).toMatch(/okay|yeah|oof|actually/);
    });
    
    // Destiny - contemplative, reflective
    const destinyResponses = [
      getAvatarResponse('destiny', 'love'),
      getAvatarResponse('destiny', 'stuck'),
      getAvatarResponse('destiny', 'career')
    ];
    
    destinyResponses.forEach(response => {
      expect(response.message).toMatch(/observe|suggest|consider|clarity/i);
    });
    
    // Casper - direct, action-oriented, caps
    const casperResponses = [
      getAvatarResponse('casper', 'love'),
      getAvatarResponse('casper', 'stuck'),
      getAvatarResponse('casper', 'career')
    ];
    
    casperResponses.forEach(response => {
      expect(response.message).toMatch(/[A-Z]{4,}/); // Has uppercase words
      expect(response.message).toMatch(/▸|action|assignment/i);
    });
  });
});

describe('Cross-Avatar Feature Parity', () => {
  it('should provide same features across all avatars', () => {
    const avatars: AvatarId[] = ['olivia', 'elijah', 'destiny', 'casper'];
    
    avatars.forEach(avatarId => {
      // All should have same number of chips
      const chips = getAvatarChips(avatarId);
      expect(chips.length).toBe(3);
      
      // All should have responses for same question types
      ['love', 'stuck', 'career'].forEach(questionId => {
        const response = getAvatarResponse(avatarId, questionId);
        expect(response).toBeTruthy();
      });
    });
  });

  it('should maintain UX consistency across avatars', () => {
    const avatars: AvatarId[] = ['olivia', 'elijah', 'destiny', 'casper'];
    
    // All avatars should follow same interaction patterns
    avatars.forEach(avatarId => {
      const chips = getAvatarChips(avatarId);
      
      // Each chip should have required properties
      chips.forEach(chip => {
        expect(chip).toHaveProperty('id');
        expect(chip).toHaveProperty('text');
        expect(chip).toHaveProperty('icon');
        expect(chip).toHaveProperty('category');
      });
    });
  });
});
