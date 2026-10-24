import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateHabitCompletionRate } from '../utils/streakCalculator';
import {
  CheckCircle2,
  Plus,
  Flame,
  Sparkles,
  ShieldCheck,
  Calendar,
  X,
  Target,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const HabitTrackerPage: React.FC = () => {
  const {
    habits,
    toggleHabit,
    addHabit,
    streakCount,
    bestStreak,
    streakFreezeAvailable,
    totalPoints,
    activityLog,
    equipStreakFreeze,
    showToast
  } = useApp();

  const [newHabitModal, setNewHabitModal] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState<'mindfulness' | 'body' | 'focus' | 'rest' | 'custom'>('mindfulness');

  const completionRate = calculateHabitCompletionRate(habits);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    addHabit(habitName.trim(), habitCategory);
    setHabitName('');
    setNewHabitModal(false);
    showToast(`Added new habit anchor: "${habitName.trim()}"`);
  };

  const handleEquipFreeze = () => {
    equipStreakFreeze(150);
  };

  // Convert activity log entries to display list
  const activityEntries = Object.entries(activityLog).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Daily Anchors & Streaks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
            Habit Routines & Streak Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            Consistency compounds silently. Maintain your consecutive days, earn points, and protect with Streak Freezes.
          </p>
        </div>

        <button
          onClick={() => setNewHabitModal(true)}
          className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Habit</span>
        </button>
      </div>

      {/* STREAK & POINTS HERO METRICS BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Current Streak */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF4E5] border border-[#FFD8A8] text-[#D97706] flex items-center justify-center shrink-0 shadow-xs">
            <Flame className="w-8 h-8 fill-[#D97706]" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A6B5A]">Current Streak</div>
            <div className="text-2xl font-black text-[#1A2E1A] font-sans">
              🔥 {streakCount} Days
            </div>
            <div className="text-[11px] text-[#5A6B5A]">Personal Best: {bestStreak}d</div>
          </div>
        </div>

        {/* Streak Freeze Shield */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-xs border ${
              streakFreezeAvailable
                ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7]'
                : 'bg-[#FAF8F5] border-[#EAE6DF] text-[#5A6B5A]'
            }`}
          >
            ❄️
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A6B5A]">Streak Freeze</div>
            <div className="text-sm font-bold text-[#1A2E1A]">
              {streakFreezeAvailable ? (
                <span className="text-[#0284C7]">Shield Active ✓</span>
              ) : (
                <span className="text-[#5A6B5A]">Not Equipped</span>
              )}
            </div>
            {!streakFreezeAvailable && (
              <button
                onClick={handleEquipFreeze}
                disabled={totalPoints < 150}
                className="text-[11px] font-bold text-[#2E7D32] hover:underline disabled:opacity-40 cursor-pointer"
              >
                Equip (150 pts)
              </button>
            )}
          </div>
        </div>

        {/* Total Points */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A6B5A]">Mindfulness Points</div>
            <div className="text-2xl font-black text-[#1A2E1A] font-sans">
              {totalPoints} pts
            </div>
            <div className="text-[11px] text-[#2E7D32]">+25 pts per habit</div>
          </div>
        </div>

        {/* Anchor Completion Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-[#5A6B5A]">
            <span>Today's Completion</span>
            <span className="text-[#2E7D32]">{completionRate}%</span>
          </div>
          <div className="w-full bg-[#EAE6DF] h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#2E7D32] h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="text-[11px] text-[#5A6B5A]">
            {habits.filter(h => h.completed).length} of {habits.length} anchors completed
          </div>
        </div>
      </div>

      {/* Habits Interactive Checkbox List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1A2E1A]">Today's Daily Anchors</h2>
          <span className="text-xs text-[#5A6B5A]">Tap to check off & advance streak</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map(habit => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                habit.completed
                  ? 'bg-[#E8F5E9] border-[#2E7D32]/50 shadow-xs'
                  : 'bg-white border-[#EAE6DF] hover:border-[#2E7D32]/40 hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                    habit.completed
                      ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-xs'
                      : 'border-[#5A6B5A]/40'
                  }`}
                >
                  {habit.completed && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                </div>

                <div>
                  <div
                    className={`text-sm sm:text-base font-semibold ${
                      habit.completed ? 'text-[#1B5E20]' : 'text-[#1A2E1A]'
                    }`}
                  >
                    {habit.name}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6B5A]">
                    {habit.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706] bg-white px-2.5 py-1 rounded-full border border-[#EAE6DF] shrink-0">
                <Flame className="w-3.5 h-3.5 fill-[#D97706]" />
                <span>{habit.streak}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITY LOG & HISTORY CALENDAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#1A2E1A]">Verified Activity Log</h3>
            <p className="text-xs text-[#5A6B5A]">
              Calendar date records stored in your browser's persistent storage.
            </p>
          </div>
          <span className="text-xs font-bold text-[#2E7D32] px-3 py-1 bg-[#E8F5E9] rounded-full">
            {activityEntries.length} Active Days Tracked
          </span>
        </div>

        <div className="space-y-3">
          {activityEntries.map(([dateStr, activities]) => (
            <div
              key={dateStr}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#EAE6DF] flex items-center justify-center font-bold text-xs text-[#2E7D32]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1A2E1A]">{dateStr}</div>
                  <div className="text-xs text-[#5A6B5A]">
                    {activities.length} mindful actions recorded
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activities.map((act, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-[#1A2E1A] border border-[#EAE6DF] flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                    <span className="capitalize">{act.replace(/_/g, ' ')}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD CUSTOM HABIT MODAL */}
      {newHabitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setNewHabitModal(false)} className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#1A2E1A]">Add Custom Habit Anchor</h3>
              <button onClick={() => setNewHabitModal(false)} className="text-[#5A6B5A] hover:text-[#1A2E1A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Habit Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15-Minute Evening Reading"
                  value={habitName}
                  onChange={e => setHabitName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Pillar Category</label>
                <select
                  value={habitCategory}
                  onChange={e => setHabitCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none bg-white font-medium"
                >
                  <option value="mindfulness">Mindfulness</option>
                  <option value="body">Body & Vitality</option>
                  <option value="focus">Deep Focus</option>
                  <option value="rest">Rest & Digital Sunset</option>
                  <option value="custom">Personal Growth</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewHabitModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
