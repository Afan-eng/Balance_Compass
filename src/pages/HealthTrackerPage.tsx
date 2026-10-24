import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateWaterPercentage } from '../utils/streakCalculator';
import {
  Droplets,
  Moon,
  Footprints,
  Heart,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Flame,
  Calendar,
  Activity,
  Award
} from 'lucide-react';

export const HealthTrackerPage: React.FC = () => {
  const {
    waterGlasses,
    waterGoal,
    incrementWater,
    decrementWater,
    sleepHours,
    setSleepHours,
    stepCount,
    setStepCount,
    restingHr,
    setRestingHr,
    healthHistory,
    saveHealthHistoryDay,
    incrementStreak,
    showToast
  } = useApp();

  const waterPct = calculateWaterPercentage(waterGlasses, waterGoal);

  // Compute real dynamic averages from the persistent healthHistory array
  const totalWater = healthHistory.reduce((acc, cur) => acc + (cur.dayName === 'Today' ? waterGlasses : cur.water), 0);
  const avgWater = (totalWater / (healthHistory.length || 1)).toFixed(1);

  const totalSleep = healthHistory.reduce((acc, cur) => acc + (cur.dayName === 'Today' ? sleepHours : cur.sleep), 0);
  const avgSleep = (totalSleep / (healthHistory.length || 1)).toFixed(1);

  const totalSteps = healthHistory.reduce((acc, cur) => acc + (cur.dayName === 'Today' ? stepCount : cur.steps), 0);
  const avgSteps = Math.round(totalSteps / (healthHistory.length || 1));

  const totalHr = healthHistory.reduce((acc, cur) => acc + (cur.dayName === 'Today' ? restingHr : cur.restingHr), 0);
  const avgHr = Math.round(totalHr / (healthHistory.length || 1));

  const handleSaveTodayVitals = () => {
    saveHealthHistoryDay({
      id: 'h-today-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayName: 'Today',
      water: waterGlasses,
      sleep: sleepHours,
      steps: stepCount,
      restingHr: restingHr
    });
    incrementStreak();
    showToast("✨ Today's biometric vitals saved to history! Streak updated.");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Droplets className="w-4 h-4" />
          <span>Biometric Dashboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Comprehensive Health & Vitality Tracker
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Log hydration, sleep quality, and physical movement daily. All averages and charts below update in real time from your live input.
        </p>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Water */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0284C7]">{waterPct}%</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Water Intake</span>
              <div className="text-2xl font-black text-[#1A2E1A] font-sans mt-0.5">
                {waterGlasses} / {waterGoal} <span className="text-xs font-normal text-[#5A6B5A]">glasses</span>
              </div>
            </div>
            <div className="w-full bg-[#EAE6DF] h-2 rounded-full overflow-hidden">
              <div className="bg-[#0284C7] h-full rounded-full transition-all duration-300" style={{ width: `${waterPct}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={decrementWater}
              className="flex-1 py-1.5 rounded-lg border border-[#EAE6DF] hover:bg-[#FAF8F5] text-xs font-bold text-[#5A6B5A] flex items-center justify-center cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={incrementWater}
              className="flex-1 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center justify-center cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sleep */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#7C3AED]">Circadian</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Sleep Duration</span>
              <div className="text-2xl font-black text-[#1A2E1A] font-sans mt-0.5">
                {sleepHours} <span className="text-xs font-normal text-[#5A6B5A]">hours</span>
              </div>
            </div>
            <input
              type="range"
              min="4"
              max="11"
              step="0.5"
              value={sleepHours}
              onChange={e => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-[#7C3AED] cursor-pointer"
            />
          </div>

          <div className="text-[11px] text-[#5A6B5A] pt-1">
            Goal: 7.5 - 8.5 hours nightly
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                <Footprints className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#15803D]">Daily Walk</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Step Count</span>
              <div className="text-2xl font-black text-[#1A2E1A] font-sans mt-0.5">
                {stepCount.toLocaleString()}
              </div>
            </div>
            <div className="w-full bg-[#EAE6DF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#15803D] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((stepCount / 10000) * 100))}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setStepCount(stepCount + 1000)}
            className="w-full py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add 1,000 Steps</span>
          </button>
        </div>

        {/* Resting Heart Rate */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#DC2626]">Autonomic</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Resting Heart Rate</span>
              <div className="text-2xl font-black text-[#1A2E1A] font-sans mt-0.5">
                {restingHr} <span className="text-xs font-normal text-[#5A6B5A]">BPM</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="45"
                max="100"
                value={restingHr}
                onChange={e => setRestingHr(parseInt(e.target.value, 10) || 60)}
                className="w-full px-3 py-1 text-xs border border-[#EAE6DF] rounded-lg"
              />
            </div>
          </div>

          <div className="text-[11px] text-[#5A6B5A] pt-1">
            Parasympathetic baseline: 55-70 BPM
          </div>
        </div>
      </div>

      {/* DYNAMIC REAL-TIME 7-DAY VISUALIZER BARS */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#1A2E1A]">7-Day Real-Time Activity Visualizer</h3>
            <p className="text-xs text-[#5A6B5A]">Live derived bar graph reflecting your daily hydration & step cadence.</p>
          </div>

          {/* Aggregate Derived Averages */}
          <div className="flex items-center gap-3 text-xs bg-[#FAF8F5] p-2 rounded-2xl border border-[#EAE6DF]">
            <div className="px-3 py-1 bg-white rounded-xl border border-[#EAE6DF]">
              <span className="text-[#5A6B5A]">Avg Water: </span>
              <strong className="text-[#0284C7]">{avgWater} gl</strong>
            </div>
            <div className="px-3 py-1 bg-white rounded-xl border border-[#EAE6DF]">
              <span className="text-[#5A6B5A]">Avg Sleep: </span>
              <strong className="text-[#7C3AED]">{avgSleep} hrs</strong>
            </div>
            <div className="px-3 py-1 bg-white rounded-xl border border-[#EAE6DF]">
              <span className="text-[#5A6B5A]">Avg Steps: </span>
              <strong className="text-[#15803D]">{avgSteps.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Step Height Bars */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-6 border-b border-[#EAE6DF] pb-2">
          {healthHistory.map((item, idx) => {
            const isToday = item.dayName === 'Today';
            const currentSteps = isToday ? stepCount : item.steps;
            const barHeightPct = Math.min(100, Math.max(15, Math.round((currentSteps / 12000) * 100)));
            const goalMet = currentSteps >= 8000;

            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-[#5A6B5A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {currentSteps.toLocaleString()}
                </span>
                <div className="w-full bg-[#FAF8F5] rounded-t-xl overflow-hidden h-full flex items-end">
                  <div
                    style={{ height: `${barHeightPct}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isToday
                        ? 'bg-[#2E7D32] ring-2 ring-[#2E7D32]/30 shadow-md'
                        : goalMet
                        ? 'bg-[#81C784]'
                        : 'bg-[#C8E6C9]'
                    }`}
                  />
                </div>
                <span className={`text-[11px] font-bold ${isToday ? 'text-[#2E7D32]' : 'text-[#5A6B5A]'}`}>
                  {item.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-DAY HISTORICAL LOG TABLE WITH DYNAMIC VALUES */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#1A2E1A]">Verified Historical Log</h3>
            <p className="text-xs text-[#5A6B5A]">Persisted in your local storage. Click below to lock in today's log.</p>
          </div>
          <button
            onClick={handleSaveTodayVitals}
            className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Lock & Save Today's Vitals (+35 pts)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#EAE6DF] text-[#5A6B5A] font-bold uppercase text-[11px]">
                <th className="pb-3">Day / Date</th>
                <th className="pb-3">Water Intake</th>
                <th className="pb-3">Sleep Duration</th>
                <th className="pb-3">Daily Steps</th>
                <th className="pb-3">Resting HR</th>
                <th className="pb-3">Vital Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {healthHistory.map((log, idx) => {
                const isToday = log.dayName === 'Today';
                const curWater = isToday ? waterGlasses : log.water;
                const curSleep = isToday ? sleepHours : log.sleep;
                const curSteps = isToday ? stepCount : log.steps;
                const curHr = isToday ? restingHr : log.restingHr;

                return (
                  <tr key={idx} className={isToday ? 'bg-[#E8F5E9]/50 font-semibold' : 'hover:bg-[#FAF8F5]'}>
                    <td className="py-3 font-semibold text-[#1A2E1A]">
                      {log.dayName} {isToday ? `(${log.date})` : `· ${log.date}`}
                    </td>
                    <td className="py-3 text-[#0284C7] font-mono font-medium">{curWater} glasses</td>
                    <td className="py-3 text-[#7C3AED] font-mono font-medium">{curSleep} hrs</td>
                    <td className="py-3 text-[#15803D] font-mono font-medium">{curSteps.toLocaleString()}</td>
                    <td className="py-3 text-[#DC2626] font-mono font-medium">{curHr} BPM</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold">
                        {curSteps >= 8000 && curWater >= 7 ? 'Optimal' : 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
