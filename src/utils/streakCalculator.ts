import { StreakState } from '../types';

/**
 * Pure logic calculations for calendar-date-based streaks, habit completion rates,
 * wellness quiz evaluations, timers, and filtering.
 */

export const INITIAL_STREAK_STATE: StreakState = {
  currentStreak: 5,
  bestStreak: 14,
  lastActiveDate: '2026-10-23',
  streakFreezeAvailable: true,
  totalPoints: 340,
  completedToday: false,
  activityLog: {
    '2026-10-21': ['morning_meditation', 'water_intake', 'pomodoro_focus'],
    '2026-10-22': ['outdoor_run', 'whole_food_lunch', 'evening_journal'],
    '2026-10-23': ['morning_meditation', 'digital_sunset', 'water_intake']
  }
};

/**
 * Evaluates calendar date difference to check if streak is preserved, frozen, or broken on app load.
 */
export function evaluateStreakState(
  prevState: StreakState,
  todayDateStr: string
): { updatedState: StreakState; freezeConsumed: boolean; streakReset: boolean } {
  if (!prevState.lastActiveDate) {
    return {
      updatedState: {
        ...prevState,
        lastActiveDate: todayDateStr,
        currentStreak: 0,
        completedToday: false
      },
      freezeConsumed: false,
      streakReset: false
    };
  }

  if (prevState.lastActiveDate === todayDateStr) {
    return {
      updatedState: {
        ...prevState,
        completedToday: true
      },
      freezeConsumed: false,
      streakReset: false
    };
  }

  // Calculate day difference using UTC midnight dates
  const lastActive = new Date(prevState.lastActiveDate + 'T00:00:00Z');
  const today = new Date(todayDateStr + 'T00:00:00Z');
  const diffDays = Math.round((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Yesterday was active; waiting for today's first activity to increment
    return {
      updatedState: {
        ...prevState,
        completedToday: false
      },
      freezeConsumed: false,
      streakReset: false
    };
  } else if (diffDays === 2 && prevState.streakFreezeAvailable) {
    // Missed yesterday, but streak freeze is available! Consume freeze to protect streak
    return {
      updatedState: {
        ...prevState,
        streakFreezeAvailable: false,
        completedToday: false,
        activityLog: {
          ...prevState.activityLog,
          [todayDateStr]: ['streak_freeze_activated']
        }
      },
      freezeConsumed: true,
      streakReset: false
    };
  } else if (diffDays > 1) {
    // Streak broken without freeze
    return {
      updatedState: {
        ...prevState,
        currentStreak: 0,
        completedToday: false
      },
      freezeConsumed: false,
      streakReset: true
    };
  }

  return {
    updatedState: prevState,
    freezeConsumed: false,
    streakReset: false
  };
}

/**
 * Records an activity for today, extending the streak and rewarding points.
 */
export function recordActivityInStreak(
  prevState: StreakState,
  activityId: string,
  todayDateStr: string,
  pointsAwarded: number = 20
): {
  updatedState: StreakState;
  pointsAdded: number;
  milestoneBonus: number;
  streakIncremented: boolean;
} {
  const todayActivities = prevState.activityLog[todayDateStr] || [];
  const isFirstActivityToday = !prevState.completedToday;

  let newStreak = prevState.currentStreak;
  let streakIncremented = false;
  let milestoneBonus = 0;

  if (isFirstActivityToday) {
    newStreak = prevState.currentStreak + 1;
    streakIncremented = true;

    // Milestone bonus every 7 days
    if (newStreak % 7 === 0) {
      milestoneBonus = 100;
    }
  }

  const newBestStreak = Math.max(prevState.bestStreak, newStreak);
  const totalPointsGained = pointsAwarded + milestoneBonus;

  const updatedState: StreakState = {
    ...prevState,
    currentStreak: newStreak,
    bestStreak: newBestStreak,
    lastActiveDate: todayDateStr,
    completedToday: true,
    totalPoints: prevState.totalPoints + totalPointsGained,
    activityLog: {
      ...prevState.activityLog,
      [todayDateStr]: [...todayActivities, activityId]
    }
  };

  return {
    updatedState,
    pointsAdded: totalPointsGained,
    milestoneBonus,
    streakIncremented
  };
}

/**
 * Purchases or equips a streak freeze shield using earned mindfulness points.
 */
export function purchaseOrEquipFreeze(
  prevState: StreakState,
  costPoints: number = 150
): { success: boolean; updatedState: StreakState; message: string } {
  if (prevState.streakFreezeAvailable) {
    return {
      success: false,
      updatedState: prevState,
      message: 'You already have an active Streak Freeze equipped!'
    };
  }

  if (prevState.totalPoints < costPoints) {
    return {
      success: false,
      updatedState: prevState,
      message: `Need ${costPoints} points. You have ${prevState.totalPoints} points.`
    };
  }

  const updatedState: StreakState = {
    ...prevState,
    streakFreezeAvailable: true,
    totalPoints: prevState.totalPoints - costPoints
  };

  return {
    success: true,
    updatedState,
    message: '❄️ Streak Freeze equipped! Your streak is protected from missed days.'
  };
}

export function calculateStreak(
  lastActiveDateStr: string | null,
  currentStreak: number,
  todayDateStr: string
): { newStreak: number; streakMaintained: boolean; isNewDay: boolean } {
  if (!lastActiveDateStr) {
    return { newStreak: 1, streakMaintained: true, isNewDay: true };
  }

  if (lastActiveDateStr === todayDateStr) {
    return { newStreak: Math.max(1, currentStreak), streakMaintained: true, isNewDay: false };
  }

  const lastActive = new Date(lastActiveDateStr + 'T00:00:00Z');
  const today = new Date(todayDateStr + 'T00:00:00Z');
  const diffDays = Math.round((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { newStreak: currentStreak + 1, streakMaintained: true, isNewDay: true };
  } else if (diffDays <= 0) {
    return { newStreak: Math.max(1, currentStreak), streakMaintained: true, isNewDay: false };
  } else {
    return { newStreak: 1, streakMaintained: false, isNewDay: true };
  }
}

export function calculateHabitCompletionRate(habits: Array<{ completed: boolean }>): number {
  if (!habits || habits.length === 0) return 0;
  const completedCount = habits.filter(h => h.completed).length;
  return Math.round((completedCount / habits.length) * 100);
}

export function calculateWellnessScore(answers: Record<string, number>): {
  score: number;
  percentage: number;
  tier: 'thriving' | 'balanced' | 'needs-care';
  title: string;
  recommendation: string;
} {
  const values = Object.values(answers);
  if (values.length === 0) {
    return {
      score: 0,
      percentage: 0,
      tier: 'needs-care',
      title: 'Not yet assessed',
      recommendation: 'Complete the questions to get personalized balance guidance.'
    };
  }

  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const maxPossible = values.length * 5;
  const percentage = Math.round((sum / maxPossible) * 100);

  if (percentage >= 80) {
    return {
      score: sum,
      percentage,
      tier: 'thriving',
      title: 'Optimal Harmony & Vitality',
      recommendation: 'You have robust balance systems in place. Continue nurturing recovery and mentor peers.'
    };
  } else if (percentage >= 60) {
    return {
      score: sum,
      percentage,
      tier: 'balanced',
      title: 'Stable with Opportunities',
      recommendation: 'Your fundamentals are solid. Prioritize evening digital wind-down and scheduled movement breaks.'
    };
  } else {
    return {
      score: sum,
      percentage,
      tier: 'needs-care',
      title: 'Nearing Overwhelm',
      recommendation: 'Your nervous system is signaling for restorative breaks. Try a 4-minute box breathing session today.'
    };
  }
}

export function calculateWaterPercentage(currentGlasses: number, targetGlasses: number = 8): number {
  if (targetGlasses <= 0) return 0;
  const pct = Math.round((currentGlasses / targetGlasses) * 100);
  return Math.min(100, Math.max(0, pct));
}

export function formatTimeRemaining(seconds: number): string {
  const safeSec = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSec / 60);
  const secs = safeSec % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getNextPomodoroState(
  currentMode: 'work' | 'shortBreak' | 'longBreak',
  completedCycles: number
): {
  nextMode: 'work' | 'shortBreak' | 'longBreak';
  durationMinutes: number;
  updatedCycles: number;
} {
  if (currentMode === 'work') {
    const newCycles = completedCycles + 1;
    if (newCycles % 4 === 0) {
      return {
        nextMode: 'longBreak',
        durationMinutes: 15,
        updatedCycles: newCycles
      };
    } else {
      return {
        nextMode: 'shortBreak',
        durationMinutes: 5,
        updatedCycles: newCycles
      };
    }
  } else {
    // Coming from break to work
    return {
      nextMode: 'work',
      durationMinutes: 25,
      updatedCycles: completedCycles
    };
  }
}

export function filterItems<T extends { title?: string; name?: string; category?: string; tags?: string[] }>(
  items: T[],
  query: string,
  categoryFilter?: string
): T[] {
  const cleanQuery = query.trim().toLowerCase();
  const cleanCat = categoryFilter?.trim().toLowerCase();

  return items.filter(item => {
    const matchesCategory =
      !cleanCat || cleanCat === 'all' || (item.category && item.category.toLowerCase() === cleanCat);

    if (!matchesCategory) return false;

    if (!cleanQuery) return true;

    const titleMatch = (item.title || item.name || '').toLowerCase().includes(cleanQuery);
    const tagsMatch = item.tags ? item.tags.some(t => t.toLowerCase().includes(cleanQuery)) : false;

    return titleMatch || tagsMatch;
  });
}
