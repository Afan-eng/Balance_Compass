import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PILLARS_LIST } from '../data/mockData';
import { calculateWellnessScore } from '../utils/streakCalculator';
import {
  Sparkles,
  ArrowRight,
  Leaf,
  CheckCircle2,
  Calendar,
  Users,
  Trophy,
  Flame,
  Brain,
  Activity,
  Clock,
  Heart,
  Smartphone,
  Compass,
  RotateCcw
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, streakCount, challenges, forumPosts, totalFocusMinutes, totalPoints } = useApp();

  // Quick Wellness Check State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({
    sleep: 4,
    boundaries: 3,
    movement: 4,
    screenTime: 3,
    presence: 4
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    { id: 'sleep', label: '1. Quality of restorative sleep this past week', min: 'Restless', max: 'Deep & Rejuvenating' },
    { id: 'boundaries', label: '2. Firmness of end-of-workday cutoff boundaries', min: 'Non-existent', max: 'Clear & Honored' },
    { id: 'movement', label: '3. Daily intentional outdoor movement or stretching', min: 'Sedentary', max: 'Daily & Energizing' },
    { id: 'screenTime', label: '4. Freedom from evening phone & notification clutter', min: 'Glued to screens', max: 'Peaceful Digital Sunset' },
    { id: 'presence', label: '5. Presence during meals and conversations with loved ones', min: 'Distracted', max: 'Fully Attentive' }
  ];

  const wellnessResult = calculateWellnessScore(quizAnswers);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Activity': return Activity;
      case 'Clock': return Clock;
      case 'Heart': return Heart;
      case 'Smartphone': return Smartphone;
      default: return Compass;
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION (EXACT MATCH TO REFERENCE DESIGN) */}
      <section className="relative min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 shadow-2xl border border-[#EAE6DF]">
        {/* Background photo of woman working at wooden desk with house plants by bright window */}
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM__1__b65f3973.jpeg"
          alt="Woman working mindfully at bright plant-filled desk"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrim for high-contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-between py-12">
          {/* Top Brand Subtitle */}
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
            <span>Balance Compass Platform</span>
            <span className="text-white/40">·</span>
            <span>Est. 2026</span>
          </div>

          {/* Center Headline & Actions */}
          <div className="max-w-2xl space-y-6 my-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans drop-shadow-md">
              Redefine Your <br />
              Work-Life Balance
            </h1>
            <p className="text-lg sm:text-xl text-[#F0FDF4] font-medium max-w-lg leading-relaxed drop-shadow-sm">
              Productivity meets mindfulness. Master deep work rhythms, protect your restorative evenings, and thrive in community.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('habit-tracker')}
                className="px-7 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-full shadow-lg shadow-[#2E7D32]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('mental-wellness')}
                className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full backdrop-blur-md border border-white/30 transition-all text-sm sm:text-base cursor-pointer"
              >
                Explore 6 Pillars
              </button>
            </div>
          </div>

          {/* Bottom Row: Trust points on left + Floating Preview Card on right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6">
            <div className="flex items-center gap-6 text-white/80 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                <span>Zero Slop · Research-Backed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                <span>Local Privacy First</span>
              </div>
            </div>

            {/* FLOATING PREVIEW CARD: Exactly like the reference mockup */}
            <div className="self-end bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 flex items-center gap-4 max-w-xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0 shadow-inner">
                <Leaf className="w-6 h-6 fill-[#2E7D32]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A2E1A] leading-tight">
                  Daily Focus
                </div>
                <div className="text-xs text-[#5A6B5A] mt-0.5 font-medium">
                  {Math.floor(totalFocusMinutes / 60)}h {totalFocusMinutes % 60}m deep work logged
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S BALANCE TIP & STREAK BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">Today's Balance Principle</span>
                <span className="text-xs text-[#5A6B5A]">· Ultradian Rhythm</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1A2E1A]">
                "The 90/20 Buffer: Work for 90 minutes, then physically step away for 20 minutes."
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B5A]">
                Cognitive energy depletes linearly, but recovers exponentially when you step into natural light without audio input.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('productivity')}
              className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm transition-colors cursor-pointer"
            >
              Start 25m Pomodoro
            </button>
            <button
              onClick={() => setCurrentPage('habit-tracker')}
              className="px-4 py-2.5 bg-white border border-[#C8E6C9] text-[#1B5E20] text-xs sm:text-sm font-semibold rounded-full hover:bg-[#F1F8E9] transition-colors cursor-pointer"
            >
              Log Daily Habit (🔥 {streakCount})
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE "QUICK WELLNESS CHECK" TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                Instant Self-Assessment
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A] tracking-tight">
                Quick Wellness Check
              </h2>
              <p className="text-sm text-[#5A6B5A] max-w-xl">
                Rate your past 7 days across 5 core lifestyle anchors. Get immediate, personalized recommendations to recalibrate your week.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setQuizAnswers({ sleep: 3, boundaries: 3, movement: 3, screenTime: 3, presence: 3 });
                  setQuizSubmitted(false);
                }}
                className="px-3.5 py-1.5 rounded-full border border-[#EAE6DF] hover:bg-[#FAF8F5] text-xs font-medium text-[#5A6B5A] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Questions sliders */}
            <div className="lg:col-span-7 space-y-6">
              {quizQuestions.map(q => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#1A2E1A]">{q.label}</label>
                    <span className="text-xs font-bold text-[#2E7D32] px-2 py-0.5 bg-[#E8F5E9] rounded-md">
                      {quizAnswers[q.id]} / 5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={quizAnswers[q.id]}
                    onChange={e => {
                      setQuizAnswers(prev => ({ ...prev, [q.id]: parseInt(e.target.value, 10) }));
                      setQuizSubmitted(true);
                    }}
                    className="w-full accent-[#2E7D32] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#5A6B5A]">
                    <span>{q.min}</span>
                    <span>{q.max}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment Score Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF8F5] to-[#E8F5E9]/50 rounded-2xl p-6 sm:p-8 border border-[#2E7D32]/20 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">
                  Your Balance Index
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-[#1A2E1A] font-sans">
                    {wellnessResult.percentage}%
                  </span>
                  <span className="text-sm font-semibold text-[#2E7D32]">
                    {wellnessResult.title}
                  </span>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="w-full bg-[#EAE6DF] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#2E7D32] h-full rounded-full transition-all duration-500"
                  style={{ width: `${wellnessResult.percentage}%` }}
                />
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EAE6DF] space-y-2">
                <div className="text-xs font-bold text-[#1A2E1A] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                  <span>Immediate Action Recommendation</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                  {wellnessResult.recommendation}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => setCurrentPage('mental-wellness')}
                  className="w-full py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Practice 4-4-4-4 Box Breathing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('health-tracker')}
                  className="w-full py-2.5 bg-white border border-[#EAE6DF] text-[#1A2E1A] text-xs font-medium rounded-full hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Log Daily Health Metrics
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIX CORE PILLARS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            Holistic Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
            Six Pillars of Everyday Harmony
          </h2>
          <p className="text-sm sm:text-base text-[#5A6B5A]">
            Work-life balance is not a rigid 50/50 split. It is an intentional, evolving rhythm across six interconnected dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS_LIST.map(pillar => {
            const Icon = getPillarIcon(pillar.icon);
            return (
              <div
                key={pillar.id}
                onClick={() => setCurrentPage(pillar.id as any)}
                className="group bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-[#EAE6DF] hover:border-[#2E7D32] transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: pillar.bg, color: pillar.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#5A6B5A] px-2.5 py-1 bg-[#FAF8F5] rounded-full border border-[#EAE6DF]">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1A2E1A] group-hover:text-[#2E7D32] transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs text-[#2E7D32] font-semibold mt-0.5">
                      {pillar.tagline}
                    </div>
                    <p className="text-xs sm:text-sm text-[#5A6B5A] mt-2.5 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EAE6DF] flex items-center justify-between text-xs font-bold text-[#2E7D32]">
                  <span>Explore Pillar Hub</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. "30-DAY HEALTHY HABITS CHALLENGE" SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1A2E1A] text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Text & Interaction */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#2E7D32] text-xs font-bold text-white uppercase tracking-wider">
                  Featured Community Challenge
                </span>
                <span className="text-xs text-[#A9B896]">14,250 Active Members</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  30-Day Healthy Habits Journey
                </h2>
                <p className="text-sm sm:text-base text-[#A9B896] leading-relaxed">
                  Join thousands building consistent daily anchors. Daily bite-sized prompts covering hydration, mindful pauses, 20-min movement, and digital sunset.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-[#4ADE80]">Day 12</div>
                  <div className="text-xs text-[#A9B896]">Current Daily Milestone</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-white">4 Anchors</div>
                  <div className="text-xs text-[#A9B896]">Daily Routine Tracking</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-[#FBBF24]">🔥 {streakCount} Days</div>
                  <div className="text-xs text-[#A9B896]">Your Personal Streak</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentPage('challenges')}
                  className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Enter 30-Day Challenge Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('habit-tracker')}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full border border-white/15 transition-all cursor-pointer"
                >
                  View My Daily Check-ins
                </button>
              </div>
            </div>

            {/* Photo column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__2__4130059e.jpeg"
                alt="Active mindful runner in lush park"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E1A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1A2E1A] lg:to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY RECENT ACTIVITY & STORIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
              Real Humans, Real Shifts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A]">
              Live Community Discussions
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('community')}
            className="text-xs sm:text-sm font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Visit Forum & Share Win</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forumPosts.slice(0, 3).map(post => (
            <div
              key={post.id}
              onClick={() => setCurrentPage('community')}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 border border-[#EAE6DF] hover:border-[#2E7D32] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5A6B5A]">
                  <span className="font-semibold text-[#2E7D32]">{post.category}</span>
                  <span>{post.timestamp}</span>
                </div>
                <h3 className="text-base font-bold text-[#1A2E1A] leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[#5A6B5A] line-clamp-3 leading-relaxed">
                  {post.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE6DF] flex items-center justify-between text-xs text-[#5A6B5A]">
                <span className="font-medium text-[#1A2E1A]">{post.author}</span>
                <span className="flex items-center gap-1 font-semibold text-[#2E7D32]">
                  ❤️ {post.likes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
