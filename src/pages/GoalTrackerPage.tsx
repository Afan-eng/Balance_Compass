import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GoalItem } from '../types';
import {
  Target,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  Trash2,
  Award
} from 'lucide-react';

export const GoalTrackerPage: React.FC = () => {
  const { goals, updateGoalProgress, toggleGoalMilestone, addGoal, deleteGoal, incrementStreak, showToast } = useApp();

  const [addGoalModal, setAddGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<GoalItem['category']>('health');
  const [goalTargetDate, setGoalTargetDate] = useState('Dec 31, 2026');

  // Real-time derived analytics
  const totalGoals = goals.length;
  const totalMilestones = goals.reduce((acc, g) => acc + g.milestones.length, 0);
  const completedMilestones = goals.reduce((acc, g) => acc + g.milestones.filter(m => m.done).length, 0);
  const overallAvgProgress = totalGoals > 0 ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / totalGoals) : 0;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    addGoal(goalTitle.trim(), goalCategory, goalTargetDate);
    setGoalTitle('');
    setAddGoalModal(false);
    incrementStreak();
    showToast(`Created new goal roadmap: "${goalTitle.trim()}"`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Intentional Trajectories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
            Goal Roadmaps & Milestone Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            Define clear, sustainable milestones across your body, professional boundaries, and creative pursuits.
          </p>
        </div>

        <button
          onClick={() => setAddGoalModal(true)}
          className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Set New Goal</span>
        </button>
      </div>

      {/* REAL-TIME OVERALL PROGRESS BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">Aggregate Completion</span>
          <div className="text-3xl font-black text-[#2E7D32] font-sans">
            {overallAvgProgress}%
          </div>
          <div className="text-xs text-[#5A6B5A]">Across all {totalGoals} active roadmaps</div>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">Milestones Achieved</span>
          <div className="text-3xl font-black text-[#1A2E1A] font-sans">
            {completedMilestones} / {totalMilestones}
          </div>
          <div className="text-xs text-[#5A6B5A]">
            {totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0}% of action steps checked
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#5A6B5A]">
            <span>Roadmap Completion Bar</span>
            <span className="text-[#2E7D32]">{overallAvgProgress}%</span>
          </div>
          <div className="w-full bg-[#EAE6DF] h-3.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2E7D32] h-full rounded-full transition-all duration-500"
              style={{ width: `${overallAvgProgress}%` }}
            />
          </div>
          <div className="text-[11px] text-[#5A6B5A]">
            {goals.filter(g => g.progress === 100).length} of {totalGoals} roadmaps 100% completed
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-8">
        {goals.map(goal => (
          <div
            key={goal.id}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      goal.category === 'health'
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : goal.category === 'work'
                        ? 'bg-[#FEF3C7] text-[#B45309]'
                        : 'bg-[#EEF2FF] text-[#4338CA]'
                    }`}
                  >
                    {goal.category}
                  </span>
                  <span className="text-xs text-[#5A6B5A] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target: {goal.targetDate}</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E1A] mt-1">{goal.title}</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-3xl font-black text-[#2E7D32] font-sans">{goal.progress}%</span>
                  <div className="text-xs text-[#5A6B5A]">Progress Achieved</div>
                </div>
                <button
                  onClick={() => {
                    deleteGoal(goal.id);
                    showToast('Goal removed.');
                  }}
                  className="p-2 text-[#5A6B5A] hover:text-[#DC2626] cursor-pointer"
                  title="Delete goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Slider Bar */}
            <div className="space-y-2">
              <div className="w-full bg-[#EAE6DF] h-3.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2E7D32] h-full rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-[#5A6B5A]">
                <span>Fine-tune slider or check milestones below:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={e => updateGoalProgress(goal.id, parseInt(e.target.value, 10))}
                  className="w-36 accent-[#2E7D32] cursor-pointer"
                />
              </div>
            </div>

            {/* Sub-Milestones Checklist */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF] space-y-3">
              <div className="text-xs font-bold text-[#1A2E1A] uppercase tracking-wider">
                Concrete Action Steps & Milestones:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {goal.milestones.map(m => (
                  <button
                    key={m.id}
                    onClick={() => toggleGoalMilestone(goal.id, m.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      m.done
                        ? 'bg-[#E8F5E9] border-[#2E7D32]/40 text-[#1B5E20]'
                        : 'bg-white border-[#EAE6DF] text-[#1A2E1A]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        m.done ? 'bg-[#2E7D32] border-[#2E7D32] text-white' : 'border-[#5A6B5A]/40'
                      }`}
                    >
                      {m.done && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs font-medium leading-snug ${m.done ? 'line-through text-[#5A6B5A]' : ''}`}>
                      {m.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD GOAL MODAL */}
      {addGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setAddGoalModal(false)} className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#1A2E1A]">Set a New Balance Goal</h3>
              <button onClick={() => setAddGoalModal(false)} className="text-[#5A6B5A] hover:text-[#1A2E1A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Goal Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 30 Consecutive Days of No Phone in Bedroom"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Category</label>
                <select
                  value={goalCategory}
                  onChange={e => setGoalCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none bg-white font-medium"
                >
                  <option value="health">Physical Health & Sleep</option>
                  <option value="work">Workday Boundaries & Focus</option>
                  <option value="personal">Personal Growth & Creative Play</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Target Completion Date</label>
                <input
                  type="text"
                  placeholder="e.g. Dec 31, 2026"
                  value={goalTargetDate}
                  onChange={e => setGoalTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddGoalModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Create Goal Roadmap (+20 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
