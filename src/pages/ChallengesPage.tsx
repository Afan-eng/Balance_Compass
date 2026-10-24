import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Flame,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  const { challenges, toggleJoinChallenge, streakCount, showToast, incrementStreak } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Trophy className="w-4 h-4" />
          <span>Gamified Growth</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Community Challenges & Live Streaks
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Build lasting habits together. Join a cohort of thousands practicing the same daily micro-anchor.
        </p>
      </div>

      {/* User Current Streak Highlight */}
      <div className="bg-[#FFF4E5] border border-[#FFD8A8] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-md">
            <Flame className="w-9 h-9 fill-white" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#92400E]">
              Current Momentum
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#78350F]">
              🔥 {streakCount} Day Consecutive Streak!
            </div>
            <p className="text-xs text-[#B45309]">
              Every habit check-in, breathwork session, or community post extends your streak.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            showToast('Checked in for today! Streak boosted.');
            incrementStreak();
          }}
          className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-all cursor-pointer shrink-0"
        >
          Check In Today +1 🔥
        </button>
      </div>

      {/* Challenges List */}
      <div className="space-y-8">
        {challenges.map(ch => {
          const progressPercent = Math.round((ch.currentDay / ch.totalDays) * 100);
          return (
            <div
              key={ch.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF] grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#2E7D32]">
                  {ch.category}
                </span>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5A6B5A]">
                    <span className="font-semibold">{ch.duration}</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>{ch.participants.toLocaleString()} active members</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1A2E1A]">{ch.title}</h3>
                  <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                    {ch.description}
                  </p>

                  {/* Daily Prompt Banner */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#2E7D32]/20 space-y-1">
                    <div className="text-xs font-bold text-[#2E7D32] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Today's Daily Challenge Prompt</span>
                    </div>
                    <p className="text-xs text-[#1A2E1A] font-medium leading-relaxed">
                      {ch.dailyPrompt}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Progress Bar */}
                  {ch.joined && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-[#5A6B5A]">
                        <span>Day {ch.currentDay} of {ch.totalDays}</span>
                        <span className="text-[#2E7D32]">{progressPercent}% Completed</span>
                      </div>
                      <div className="w-full bg-[#EAE6DF] h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2E7D32] h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => toggleJoinChallenge(ch.id)}
                      className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md ${
                        ch.joined
                          ? 'bg-[#E8F5E9] text-[#1B5E20] border border-[#2E7D32]'
                          : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                      }`}
                    >
                      {ch.joined ? 'Active Challenge (Leave)' : 'Join Challenge Cohort'}
                    </button>

                    {ch.joined && (
                      <button
                        onClick={() => {
                          showToast(`Completed today's prompt for "${ch.title}"!`);
                          incrementStreak();
                        }}
                        className="text-xs font-bold text-[#2E7D32] hover:underline cursor-pointer"
                      >
                        Mark Today Done ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
