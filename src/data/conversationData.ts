/**
 * Avatar Question Chips & Responses
 * Personality-driven conversation data for Explore Further feature
 */

import type { QuestionChip, AvatarResponse, AvatarId } from '@/types/reading.types';

export const avatarQuestionChips: Record<AvatarId, QuestionChip[]> = {
  olivia: [
    { id: 'love', text: 'What does this mean for love?', icon: '🌸', category: 'love' },
    { id: 'stuck', text: "I feel stuck though...", icon: '🌾', category: 'stuck' },
    { id: 'career', text: 'How does this apply to my career?', icon: '🌳', category: 'career' }
  ],
  
  elijah: [
    { id: 'love', text: 'what about love?', icon: '💭', category: 'love' },
    { id: 'stuck', text: "i'm feeling stuck...", icon: '🌀', category: 'stuck' },
    { id: 'career', text: 'career implications?', icon: '⚡', category: 'career' }
  ],
  
  destiny: [
    { id: 'love', text: 'Love and relationships?', icon: '🌙', category: 'love' },
    { id: 'stuck', text: 'Feeling uncertain...', icon: '🌊', category: 'stuck' },
    { id: 'career', text: 'Professional path?', icon: '✨', category: 'career' }
  ],
  
  casper: [
    { id: 'love', text: 'LOVE SITUATION?', icon: '❤️‍🔥', category: 'love' },
    { id: 'stuck', text: "I'M STUCK. HELP.", icon: '💥', category: 'stuck' },
    { id: 'career', text: 'CAREER MOVE?', icon: '🎯', category: 'career' }
  ]
};

export const avatarResponses: Record<AvatarId, Record<string, AvatarResponse>> = {
  olivia: {
    love: {
      message: "Okay, love. Here's the thing—this card in a relationship context is asking you to be really honest about what you're bringing to the table. Not in a harsh way, but in a 'let's get real' way. Are you showing up as your full self? Are you asking for what you need? Because this energy is about partnership, sure, but it's also about not losing yourself in the process. If you're single, it's saying get clear on what you actually want, not what you think you should want. And if you're coupled up, it might be time for a check-in conversation. The uncomfortable kind that actually makes things better.",
      xp: 2
    },
    stuck: {
      message: "I hear that. Getting guidance about movement when you feel stuck can be frustrating, right? Here's what I'll say: sometimes the movement isn't external yet—it's about internal resolve. Like, you might be stuck because you're waiting for the perfect conditions, but this card is saying the conditions become perfect when you decide to move. Even tiny action breaks the stuck feeling. What's one small thing you could do today that future-you would thank you for? Start there.",
      xp: 3
    },
    career: {
      message: "Career-wise, this is actually pretty exciting. This card suggests you're in a position to take more ownership than you think. Maybe you've been waiting for permission or validation, but the energy here is about stepping into your own authority. That could mean pitching the idea you've been sitting on, setting a boundary with a difficult colleague, or just owning your expertise more publicly. People are watching—show them what you've got. And if you're job hunting, approach it like you're interviewing them too. You're the catch here.",
      xp: 2
    }
  },
  
  elijah: {
    love: {
      message: "oof yeah love stuff. okay so here's the deal: this card in relationships is basically saying 'stop performing and start being'. like you might be so busy trying to be the perfect partner or the cool mysterious person that you're forgetting to actually...connect. if you're dating, stop trying to figure out what they want to hear and just say what you actually think. be weird. be specific. if you're in a relationship, this might be your sign to have that conversation you've been avoiding. not the one about dishes—the real one. about what you both actually want from this. scary? yeah. necessary? absolutely.",
      xp: 2
    },
    stuck: {
      message: "oof yeah that's the WORST. getting a movement card when you feel like you're in cement. but here's where it gets interesting: this card isn't always about external movement. sometimes it's about *internal alignment*. like maybe you're stuck because part of you knows the path you're on isn't quite right. and that stuck feeling? that's actually your intuition being like 'hey. hey. stop. recalibrate.' so before you force yourself to move, ask: what if this pause is the move? what if being stuck is your subconscious protecting you from going further down the wrong path? just a thought.",
      xp: 3
    },
    career: {
      message: "career stuff—okay so this card is basically your cosmic permission slip to stop waiting for someone else to validate your ideas. you know that thing you've been thinking about but haven't said out loud because you're worried it sounds weird or impractical? yeah that thing. this is your sign to say it. put it in the meeting. send the email. pitch the concept. the energy here is about trusting your unique perspective is actually valuable, not something to sand down until it's acceptable. be the person who asks the question everyone else was thinking. that's your power move right now.",
      xp: 2
    }
  },
  
  destiny: {
    love: {
      message: "In matters of the heart, this card asks you to consider: what patterns are you repeating? Not as judgment, but as information. We often seek in relationships what we needed but didn't receive earlier in life. This card suggests you're ready to see those patterns clearly now—and that awareness is how they begin to shift. Whether partnered or seeking partnership, the question isn't 'who completes me' but 'what wholeness am I building within myself?' Because the love that finds you reflects the love you've found within. That's not spiritual bypassing—it's just how it works.",
      xp: 2
    },
    stuck: {
      message: "Uncertainty is information. Let's work with it rather than against it. This card appearing during a period of feeling stuck suggests you may be waiting for perfect clarity before taking action. But here's what I observe: Clarity often emerges through movement, not before it. The stuck feeling might be less about external circumstances and more about internal conflict—perhaps part of you knows something needs to change, but another part fears that change. Both are valid. The question is: which part are you allowing to guide your decisions? Not which part should guide them. Which part actually is.",
      xp: 3
    },
    career: {
      message: "Professional questions with this card point to a need for integration. You may be compartmentalizing—showing one version of yourself at work, another everywhere else. That split requires tremendous energy to maintain. This card suggests it might be time to bring more of your authentic self into your professional space. Not recklessly, but intentionally. What would it mean to let your values guide your career decisions, rather than only security or status? I'm not saying quit your job—I'm asking what would shift if your work became an expression of who you are rather than a role you perform. That's the real question here.",
      xp: 2
    }
  },
  
  casper: {
    love: {
      message: "LOVE. Right. Here's the deal: this card says stop waiting for someone to read your mind and TELL THEM WHAT YOU WANT. Directly. No hints. No 'well if they really cared they'd know.' That's not communication, that's a test they don't know they're taking. If you're dating someone—tell them what you need. If you're single—get brutally clear on your non-negotiables and STICK TO THEM. Don't date potential. Don't date their representative. Date the actual person showing up. And if that person isn't showing up the way you need? NEXT. You're not here to fix people. You're here to find YOUR person.",
      xp: 2
    },
    stuck: {
      message: "Stuck? Good. Let's fix it. First: are you actually stuck, or are you just scared to move? Because this card showing up means the path is there. You might not like the path. It might be hard. But it's there. Here's your assignment: ▸ Write down the three actions you KNOW you should take ▸ Pick the one that scares you most ▸ Do that one FIRST tomorrow Not next week. Not when you feel ready. Tomorrow. Because you know what's keeping you stuck? Analysis paralysis. Waiting for perfect. This card is saying MOVE IMPERFECTLY. Move scared. But MOVE. That's how you get unstuck—through action, not thought.",
      xp: 3
    },
    career: {
      message: "CAREER. Listen: this card is basically your wake-up call to stop playing small. You're either underpaid, underutilized, or under-challenged. Maybe all three. Time to fix it. Specific actions: ▸ If you deserve more money—ASK FOR IT. Not next review cycle. Now. ▸ If you're bored—take on the scary project everyone else is avoiding ▸ If you're stuck—start interviewing. Even if you don't leave, you'll remember your value Stop waiting for someone to notice you're ready. TELL them you're ready. Better yet: SHOW them you're already doing the next level work. Then demand the next level title and pay. This card says you've got the goods. Now ACT like it.",
      xp: 2
    }
  }
};

/**
 * Get question chips for specific avatar
 */
export function getAvatarChips(avatarId: AvatarId): QuestionChip[] {
  return avatarQuestionChips[avatarId] || avatarQuestionChips.destiny;
}

/**
 * Get response for specific avatar and question
 */
export function getAvatarResponse(avatarId: AvatarId, questionId: string): AvatarResponse {
  const responses = avatarResponses[avatarId];
  return responses?.[questionId] || {
    message: "That's an interesting question. Let me think about that...",
    xp: 1
  };
}
