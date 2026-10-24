import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStreak,
  calculateHabitCompletionRate,
  calculateWellnessScore,
  calculateWaterPercentage,
  formatTimeRemaining,
  getNextPomodoroState,
  filterItems,
  evaluateStreakState,
  recordActivityInStreak,
  purchaseOrEquipFreeze,
  INITIAL_STREAK_STATE
} from './streakCalculator.js';
import { StreakState } from '../types';

test('evaluateStreakState handles consecutive day without activity yet', () => {
  const baseState: StreakState = {
    ...INITIAL_STREAK_STATE,
    lastActiveDate: '2026-10-23',
    currentStreak: 5,
    streakFreezeAvailable: true,
    completedToday: true
  };
  const { updatedState, freezeConsumed, streakReset } = evaluateStreakState(baseState, '2026-10-24');
  assert.equal(updatedState.completedToday, false);
  assert.equal(updatedState.currentStreak, 5);
  assert.equal(freezeConsumed, false);
  assert.equal(streakReset, false);
});

test('evaluateStreakState consumes streak freeze if 1 day was missed', () => {
  const baseState: StreakState = {
    ...INITIAL_STREAK_STATE,
    lastActiveDate: '2026-10-22', // missed 2026-10-23, today is 2026-10-24 (diff = 2)
    currentStreak: 8,
    streakFreezeAvailable: true
  };
  const { updatedState, freezeConsumed, streakReset } = evaluateStreakState(baseState, '2026-10-24');
  assert.equal(freezeConsumed, true);
  assert.equal(updatedState.streakFreezeAvailable, false);
  assert.equal(updatedState.currentStreak, 8); // preserved!
  assert.equal(streakReset, false);
});

test('evaluateStreakState resets streak if missed without freeze', () => {
  const baseState: StreakState = {
    ...INITIAL_STREAK_STATE,
    lastActiveDate: '2026-10-20', // missed multiple days
    currentStreak: 12,
    streakFreezeAvailable: false
  };
  const { updatedState, streakReset } = evaluateStreakState(baseState, '2026-10-24');
  assert.equal(streakReset, true);
  assert.equal(updatedState.currentStreak, 0);
});

test('recordActivityInStreak increments streak and awards points on first daily activity', () => {
  const baseState: StreakState = {
    ...INITIAL_STREAK_STATE,
    lastActiveDate: '2026-10-23',
    currentStreak: 5,
    bestStreak: 10,
    totalPoints: 100,
    completedToday: false,
    activityLog: {}
  };
  const { updatedState, pointsAdded, streakIncremented } = recordActivityInStreak(
    baseState,
    'morning_meditation',
    '2026-10-24',
    25
  );

  assert.equal(streakIncremented, true);
  assert.equal(updatedState.currentStreak, 6);
  assert.equal(updatedState.completedToday, true);
  assert.equal(pointsAdded, 25);
  assert.equal(updatedState.totalPoints, 125);
  assert.equal(updatedState.activityLog['2026-10-24'].includes('morning_meditation'), true);
});

test('purchaseOrEquipFreeze handles point costs and inventory state', () => {
  const brokeState: StreakState = {
    ...INITIAL_STREAK_STATE,
    totalPoints: 50,
    streakFreezeAvailable: false
  };
  const brokeAttempt = purchaseOrEquipFreeze(brokeState, 150);
  assert.equal(brokeAttempt.success, false);

  const wealthyState: StreakState = {
    ...INITIAL_STREAK_STATE,
    totalPoints: 300,
    streakFreezeAvailable: false
  };
  const successAttempt = purchaseOrEquipFreeze(wealthyState, 150);
  assert.equal(successAttempt.success, true);
  assert.equal(successAttempt.updatedState.streakFreezeAvailable, true);
  assert.equal(successAttempt.updatedState.totalPoints, 150);
});

test('calculateStreak initializes to 1 if no previous date', () => {
  const result = calculateStreak(null, 0, '2026-10-24');
  assert.equal(result.newStreak, 1);
  assert.equal(result.streakMaintained, true);
  assert.equal(result.isNewDay, true);
});

test('calculateStreak increments on consecutive day', () => {
  const result = calculateStreak('2026-10-23', 5, '2026-10-24');
  assert.equal(result.newStreak, 6);
  assert.equal(result.streakMaintained, true);
  assert.equal(result.isNewDay, true);
});

test('calculateStreak maintains streak on same day activity', () => {
  const result = calculateStreak('2026-10-24', 6, '2026-10-24');
  assert.equal(result.newStreak, 6);
  assert.equal(result.isNewDay, false);
});

test('calculateStreak resets to 1 if missed more than 1 day', () => {
  const result = calculateStreak('2026-10-20', 12, '2026-10-24');
  assert.equal(result.newStreak, 1);
  assert.equal(result.streakMaintained, false);
});

test('calculateHabitCompletionRate computes rounded percentage', () => {
  assert.equal(calculateHabitCompletionRate([]), 0);
  const habits = [
    { completed: true },
    { completed: true },
    { completed: false },
    { completed: false }
  ];
  assert.equal(calculateHabitCompletionRate(habits), 50);

  const habits2 = [
    { completed: true },
    { completed: true },
    { completed: true }
  ];
  assert.equal(calculateHabitCompletionRate(habits2), 100);
});

test('calculateWellnessScore categorizes score appropriately', () => {
  // Thriving
  const thrivingResult = calculateWellnessScore({
    q1: 5,
    q2: 5,
    q3: 4,
    q4: 5,
    q5: 4
  });
  assert.equal(thrivingResult.tier, 'thriving');
  assert.equal(thrivingResult.percentage >= 80, true);

  // Needs care
  const lowResult = calculateWellnessScore({
    q1: 2,
    q2: 1,
    q3: 2,
    q4: 2,
    q5: 1
  });
  assert.equal(lowResult.tier, 'needs-care');
});

test('calculateWaterPercentage clamps between 0 and 100', () => {
  assert.equal(calculateWaterPercentage(4, 8), 50);
  assert.equal(calculateWaterPercentage(8, 8), 100);
  assert.equal(calculateWaterPercentage(12, 8), 100);
  assert.equal(calculateWaterPercentage(0, 8), 0);
});

test('formatTimeRemaining formats mm:ss correctly', () => {
  assert.equal(formatTimeRemaining(1500), '25:00');
  assert.equal(formatTimeRemaining(65), '01:05');
  assert.equal(formatTimeRemaining(0), '00:00');
});

test('getNextPomodoroState cycles correctly', () => {
  // 1st work session ends -> short break
  const res1 = getNextPomodoroState('work', 0);
  assert.equal(res1.nextMode, 'shortBreak');
  assert.equal(res1.durationMinutes, 5);
  assert.equal(res1.updatedCycles, 1);

  // Short break ends -> work
  const res2 = getNextPomodoroState('shortBreak', 1);
  assert.equal(res2.nextMode, 'work');
  assert.equal(res2.durationMinutes, 25);

  // 4th work session ends -> long break (15 min)
  const res4 = getNextPomodoroState('work', 3);
  assert.equal(res4.nextMode, 'longBreak');
  assert.equal(res4.durationMinutes, 15);
  assert.equal(res4.updatedCycles, 4);
});

test('filterItems matches search query and category', () => {
  const items = [
    { title: 'Morning Mindfulness', category: 'Mindfulness', tags: ['breath', 'calm'] },
    { title: 'HIIT Workout', category: 'Fitness', tags: ['cardio', 'strength'] },
    { title: 'Sleep Rituals', category: 'Mindfulness', tags: ['night', 'rest'] }
  ];

  const searchBreath = filterItems(items, 'breath', 'all');
  assert.equal(searchBreath.length, 1);
  assert.equal(searchBreath[0].title, 'Morning Mindfulness');

  const catMindfulness = filterItems(items, '', 'Mindfulness');
  assert.equal(catMindfulness.length, 2);
});
