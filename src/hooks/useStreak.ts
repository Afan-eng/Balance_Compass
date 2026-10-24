import { useState, useEffect, useCallback } from 'react';
import { StreakState } from '../types';
import {
  INITIAL_STREAK_STATE,
  evaluateStreakState,
  recordActivityInStreak,
  purchaseOrEquipFreeze
} from '../utils/streakCalculator';

const STORAGE_KEY = 'balance_compass_streak_v2';

export function useStreak() {
  const [streakState, setStreakState] = useState<StreakState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_STREAK_STATE;
  });

  const getTodayStr = () => new Date().toISOString().split('T')[0];

  // Evaluate date transitions on mount
  useEffect(() => {
    const today = getTodayStr();
    const { updatedState, freezeConsumed, streakReset } = evaluateStreakState(streakState, today);
    if (freezeConsumed || streakReset || updatedState.completedToday !== streakState.completedToday) {
      setStreakState(updatedState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    }
  }, []);

  const saveState = (newState: StreakState) => {
    setStreakState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const recordActivity = useCallback(
    (activityId: string, pointsAwarded: number = 20): { pointsGained: number; milestoneBonus: number } => {
      const today = getTodayStr();
      const { updatedState, pointsAdded, milestoneBonus } = recordActivityInStreak(
        streakState,
        activityId,
        today,
        pointsAwarded
      );
      saveState(updatedState);
      return { pointsGained: pointsAdded, milestoneBonus };
    },
    [streakState]
  );

  const equipFreeze = useCallback(
    (costPoints: number = 150): { success: boolean; message: string } => {
      const result = purchaseOrEquipFreeze(streakState, costPoints);
      if (result.success) {
        saveState(result.updatedState);
      }
      return { success: result.success, message: result.message };
    },
    [streakState]
  );

  const manualIncrement = useCallback(() => {
    const today = getTodayStr();
    return recordActivity('manual_checkin', 25);
  }, [recordActivity]);

  return {
    streakState,
    currentStreak: streakState.currentStreak,
    bestStreak: streakState.bestStreak,
    streakFreezeAvailable: streakState.streakFreezeAvailable,
    totalPoints: streakState.totalPoints,
    completedToday: streakState.completedToday,
    activityLog: streakState.activityLog,
    recordActivity,
    equipFreeze,
    manualIncrement
  };
}
