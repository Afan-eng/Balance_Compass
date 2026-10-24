import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MoodType, MoodEntry } from '../types';
import {
  Smile,
  Frown,
  Meh,
  Zap,
  AlertCircle,
  Plus,
  Send,
  Calendar,
  Sparkles,
  CheckCircle2,
  Trash2,
  TrendingUp,
  Activity
} from 'lucide-react';

export const MoodTrackerPage: React.FC = () => {
  const { moodEntries, logMood, deleteMoodEntry, incrementStreak, showToast } = useApp();

  const [selectedMood, setSelectedMood] = useState<MoodType>('great');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Grounded', 'Calm']);
  const [reflectionNote, setReflectionNote] = useState('');

  const moodOptions: { type: MoodType; label: string; icon: string; color: string; bg: string; score: number }[] = [
    { type: 'great', label: 'Great', icon: '😄', color: '#15803D', bg: '#DCFCE7', score: 100 },
    { type: 'good', label: 'Good', icon: '🙂', color: '#2E7D32', bg: '#E8F5E9', score: 80 },
    { type: 'okay', label: 'Okay', icon: '😐', color: '#0284C7', bg: '#E0F2FE', score: 60 },
    { type: 'low', label: 'Low', icon: '😔', color: '#D97706', bg: '#FEF3C7', score: 40 },
    { type: 'stressed', label: 'Stressed', icon: '😣', color: '#DC2626', bg: '#FEE2E2', score: 20 }
  ];

  const availableTags = [
    'Grounded',
    'Calm',
    'Focused',
    'Energized',
    'Grateful',
    'Anxious',
    'Fatigued',
    'Overwhelmed',
    'Creative',
    'Restored'
  ];

  // Derived real-time metrics
  const totalEntries = moodEntries.length;
  const moodCounts = moodEntries.reduce((acc, cur) => {
    acc[cur.mood] = (acc[cur.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const positiveCount = (moodCounts['great'] || 0) + (moodCounts['good'] || 0);
  const positiveRatio = totalEntries > 0 ? Math.round((positiveCount / totalEntries) * 100) : 100;

  // Calculate average emotional equilibrium score
  const totalScore = moodEntries.reduce((sum, item) => {
    const opt = moodOptions.find(o => o.type === item.mood);
    return sum + (opt ? opt.score : 60);
  }, 0);
  const averageEquilibriumScore = totalEntries > 0 ? Math.round(totalScore / totalEntries) : 85;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitMood = (e: React.FormEvent) => {
    e.preventDefault();
    logMood(selectedMood, selectedTags, reflectionNote.trim());
    setReflectionNote('');
    incrementStreak();
    showToast(`Logged today's emotional weather as "${selectedMood.toUpperCase()}"!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Smile className="w-4 h-4" />
          <span>Emotional Calibration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Daily Mood & Emotional Weather Log
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Name it to tame it. Tracking your inner state without judgment builds cognitive defusion and uncovers subconscious triggers.
        </p>
      </div>

      {/* REAL-TIME EQUILIBRIUM INSIGHTS BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">Emotional Equilibrium</span>
          <div className="text-3xl font-black text-[#2E7D32] font-sans">
            {averageEquilibriumScore}/100
          </div>
          <p className="text-xs text-[#5A6B5A]">Derived from your {totalEntries} recorded logs</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">Positive State Ratio</span>
          <div className="text-3xl font-black text-[#1A2E1A] font-sans">
            {positiveRatio}%
          </div>
          <p className="text-xs text-[#5A6B5A]">Great / Good emotional sessions</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">Mood Distribution</span>
          <div className="w-full bg-[#EAE6DF] h-3 rounded-full flex overflow-hidden">
            <div style={{ width: `${((moodCounts['great'] || 0) / totalEntries) * 100}%` }} className="bg-[#15803D]" title="Great" />
            <div style={{ width: `${((moodCounts['good'] || 0) / totalEntries) * 100}%` }} className="bg-[#4CAF50]" title="Good" />
            <div style={{ width: `${((moodCounts['okay'] || 0) / totalEntries) * 100}%` }} className="bg-[#0284C7]" title="Okay" />
            <div style={{ width: `${((moodCounts['low'] || 0) / totalEntries) * 100}%` }} className="bg-[#D97706]" title="Low" />
            <div style={{ width: `${((moodCounts['stressed'] || 0) / totalEntries) * 100}%` }} className="bg-[#DC2626]" title="Stressed" />
          </div>
          <div className="flex justify-between text-[10px] text-[#5A6B5A] font-semibold">
            <span>😄 {moodCounts['great'] || 0}</span>
            <span>🙂 {moodCounts['good'] || 0}</span>
            <span>😐 {moodCounts['okay'] || 0}</span>
            <span>😔 {moodCounts['low'] || 0}</span>
            <span>😣 {moodCounts['stressed'] || 0}</span>
          </div>
        </div>
      </div>

      {/* TODAY'S MOOD LOGGING CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E1A]">
            How is your emotional weather right now?
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            Select your primary state and tag corresponding somatic sensations.
          </p>
        </div>

        {/* 5 Mood Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {moodOptions.map(opt => {
            const isSelected = selectedMood === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setSelectedMood(opt.type)}
                className={`p-5 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                  isSelected
                    ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/20 shadow-md scale-102'
                    : 'border-[#EAE6DF] hover:border-[#2E7D32]/40 bg-[#FAF8F5]'
                }`}
                style={{ backgroundColor: isSelected ? opt.bg : undefined }}
              >
                <span className="text-4xl">{opt.icon}</span>
                <span className="text-sm font-bold" style={{ color: opt.color }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tags Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">
            What sensations or factors describe today?
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
              const isTagSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isTagSelected
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5A6B5A] border-[#EAE6DF] hover:border-[#2E7D32]/50'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note & Submit Form */}
        <form onSubmit={handleSubmitMood} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6B5A] mb-1.5">
              Personal Reflection Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="What triggered this mood? Any wins, boundaries honored, or unexpected stresses?"
              value={reflectionNote}
              onChange={e => setReflectionNote(e.target.value)}
              className="w-full p-4 rounded-2xl border border-[#EAE6DF] focus:border-[#2E7D32] text-xs sm:text-sm outline-none bg-[#FAF8F5]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-7 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Log Mood for Today (+25 pts)</span>
            </button>
          </div>
        </form>
      </div>

      {/* HISTORICAL MOOD LOGS */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A2E1A]">Your Verified Mood History</h3>
          <span className="text-xs font-semibold text-[#5A6B5A]">{moodEntries.length} entries recorded</span>
        </div>

        <div className="space-y-4">
          {moodEntries.map(entry => (
            <div
              key={entry.id}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {entry.mood === 'great'
                      ? '😄'
                      : entry.mood === 'good'
                      ? '🙂'
                      : entry.mood === 'okay'
                      ? '😐'
                      : entry.mood === 'low'
                      ? '😔'
                      : '😣'}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-[#1A2E1A] capitalize">
                      {entry.mood}
                    </span>
                    <div className="text-xs text-[#5A6B5A]">{entry.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-white text-[11px] font-semibold text-[#5A6B5A] border border-[#EAE6DF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => deleteMoodEntry(entry.id)}
                    className="text-[#5A6B5A] hover:text-[#DC2626] p-1 cursor-pointer transition-colors"
                    title="Delete mood log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {entry.note && (
                <p className="text-xs sm:text-sm text-[#1A2E1A] italic border-l-2 border-[#2E7D32]/40 pl-3">
                  "{entry.note}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
