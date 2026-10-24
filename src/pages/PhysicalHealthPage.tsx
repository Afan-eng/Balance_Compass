import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateWaterPercentage } from '../utils/streakCalculator';
import {
  Activity,
  Droplets,
  Moon,
  Footprints,
  Flame,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  CheckCircle2
} from 'lucide-react';

export const PhysicalHealthPage: React.FC = () => {
  const {
    setCurrentPage,
    waterGlasses,
    waterGoal,
    incrementWater,
    decrementWater,
    sleepHours,
    setSleepHours,
    stepCount,
    setStepCount,
    incrementStreak,
    showToast
  } = useApp();

  const [activeMovementMins, setActiveMovementMins] = useState(35);
  const waterPct = calculateWaterPercentage(waterGlasses, waterGoal);

  const workouts = [
    {
      title: 'Zone-2 Outdoor Jog or Brisk Walk',
      duration: '30 mins',
      benefit: 'Mitochondrial density & aerobic base',
      intensity: 'Moderate (Conversational Pace)',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__2__4130059e.jpeg'
    },
    {
      title: 'Desk Reversal & Spinal Decompression',
      duration: '12 mins',
      benefit: 'Postural alignment & thoracic opening',
      intensity: 'Gentle Restorative',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM__1__b65f3973.jpeg'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Core Pillar 02</span>
          <span>·</span>
          <span>Somatic Vitality</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Physical Health & Biological Rhythms
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-3xl leading-relaxed">
          The mind is embodied. When circadian sleep cycles, cellular hydration, and daily cardiovascular movement are maintained, cognitive resilience follows effortlessly.
        </p>
      </div>

      {/* INTERACTIVE DAILY VITALS DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hydration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0284C7] px-2 py-0.5 bg-[#E0F2FE] rounded-full">
              {waterPct}% Target
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Daily Hydration</div>
            <div className="text-3xl font-black text-[#1A2E1A] font-sans mt-1">
              {waterGlasses} <span className="text-base font-normal text-[#5A6B5A]">/ {waterGoal} glasses</span>
            </div>
          </div>

          {/* Liquid Progress Bar */}
          <div className="w-full bg-[#EAE6DF] h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#0284C7] h-full rounded-full transition-all duration-300"
              style={{ width: `${waterPct}%` }}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={decrementWater}
              className="flex-1 py-2 rounded-xl border border-[#EAE6DF] hover:bg-[#FAF8F5] text-[#5A6B5A] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
              <span>Less</span>
            </button>
            <button
              onClick={incrementWater}
              className="flex-1 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Drink Glass</span>
            </button>
          </div>
        </div>

        {/* Sleep Hours Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#7C3AED] px-2 py-0.5 bg-[#EDE9FE] rounded-full">
              Restorative
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Nightly Sleep Duration</div>
            <div className="text-3xl font-black text-[#1A2E1A] font-sans mt-1">
              {sleepHours} <span className="text-base font-normal text-[#5A6B5A]">hours</span>
            </div>
          </div>

          <div className="space-y-1">
            <input
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={sleepHours}
              onChange={e => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-[#7C3AED] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#5A6B5A]">
              <span>4.0 hrs</span>
              <span>Ideal: 7.5 - 8.5 hrs</span>
              <span>10.0 hrs</span>
            </div>
          </div>

          <div className="text-[11px] text-[#5A6B5A] pt-1">
            {sleepHours >= 7.5
              ? '✅ Deep circadian recovery achieved. Peak executive cognitive stamina.'
              : '⚠️ Sleep debt detected. Consider an earlier digital sunset tonight.'}
          </div>
        </div>

        {/* Step Count Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#15803D] px-2 py-0.5 bg-[#DCFCE7] rounded-full">
              Active Movement
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#5A6B5A] uppercase tracking-wider">Step Count Today</div>
            <div className="text-3xl font-black text-[#1A2E1A] font-sans mt-1">
              {stepCount.toLocaleString()} <span className="text-base font-normal text-[#5A6B5A]">steps</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3">
            <button
              onClick={() => setStepCount(stepCount + 1000)}
              className="flex-1 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1,000 Walk Steps</span>
            </button>
            <button
              onClick={() => {
                showToast('Logged 20m movement session!');
                incrementStreak();
              }}
              className="p-2 rounded-xl border border-[#EAE6DF] hover:bg-[#FAF8F5] text-[#5A6B5A] text-xs font-bold cursor-pointer"
              title="Log Movement Session"
            >
              <Flame className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>
        </div>
      </div>

      {/* WHOLE FOODS & KITCHEN SANCTUARY SECTION */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.03_PM__2__9843523f.jpeg"
              alt="Woman preparing fresh kale and organic salad in sunlit kitchen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Nourishment Ritual</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A] tracking-tight">
                Kitchen as Sanctuary: Grounding Through Whole Foods
              </h2>
              <p className="text-sm text-[#5A6B5A] leading-relaxed">
                Cooking is one of the highest-leverage tactile mindfulness practices. Rhythmic chopping of crisp greens, breathing herbal aromas, and savoring unhurried dining anchors blood sugar and halts cognitive rumination.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#1A2E1A]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <span>Stabilize insulin with dark leafy cruciferous greens and cold-pressed extra virgin olive oil.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#1A2E1A]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <span>Drink 16oz of mineralized water upon waking before your first cup of roasted coffee.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#1A2E1A]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <span>Chew unhurriedly: digestion requires a parasympathetic autonomic state.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('health-tracker')}
                className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Open Full Health Tracker Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDED MOVEMENT BLOCKS */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Daily Movement</span>
          <h2 className="text-2xl font-bold text-[#1A2E1A]">Prescribed Somatic Conditioning</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((w, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-md flex flex-col sm:flex-row items-stretch">
              <img
                src={w.image}
                alt={w.title}
                className="w-full sm:w-44 h-44 sm:h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 flex-1 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#2E7D32]">{w.duration} · {w.intensity}</div>
                  <h3 className="text-base font-bold text-[#1A2E1A] mt-1">{w.title}</h3>
                  <p className="text-xs text-[#5A6B5A] mt-1">{w.benefit}</p>
                </div>
                <button
                  onClick={() => {
                    showToast(`Starting: ${w.title}!`);
                    incrementStreak();
                  }}
                  className="self-start text-xs font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1 cursor-pointer pt-2"
                >
                  <span>Mark Completed Today</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
