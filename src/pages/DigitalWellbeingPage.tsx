import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatTimeRemaining } from '../utils/streakCalculator';
import {
  Smartphone,
  Sparkles,
  ShieldCheck,
  Moon,
  Clock,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
  Shuffle
} from 'lucide-react';

export const DigitalWellbeingPage: React.FC = () => {
  const { showToast, incrementStreak } = useApp();

  // Screen time interactive state
  const [workHours, setWorkHours] = useState(5.5);
  const [socialHours, setSocialHours] = useState(2.0);
  const [mediaHours, setMediaHours] = useState(1.5);
  const totalHours = (workHours + socialHours + mediaHours).toFixed(1);

  // 1-Click Digital Detox State
  const [detoxDuration, setDetoxDuration] = useState<number>(15 * 60); // 15 mins
  const [detoxActive, setDetoxActive] = useState(false);
  const [detoxSecondsLeft, setDetoxSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    let timer: any = null;
    if (detoxActive && detoxSecondsLeft > 0) {
      timer = setInterval(() => {
        setDetoxSecondsLeft(prev => {
          if (prev <= 1) {
            setDetoxActive(false);
            showToast('🌿 Digital Detox completed! You just gifted yourself offline presence.');
            incrementStreak();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [detoxActive, detoxSecondsLeft]);

  const startDetox = (mins: number) => {
    setDetoxDuration(mins * 60);
    setDetoxSecondsLeft(mins * 60);
    setDetoxActive(true);
    showToast(`Entering ${mins}-minute Digital Detox. Breathe and be present.`);
  };

  // Screen-free activity generator
  const offlineActivities = [
    'Brew a warm cup of herbal chamomile tea in complete silence, observing the rising steam.',
    'Sketch a living house plant on paper using just a pencil for 10 minutes.',
    'Step outside barefoot onto the grass and take 10 slow conscious breaths.',
    'Write a heartfelt handwritten postcard or letter to an old friend.',
    'Fold your clean laundry slowly with undivided sensory attention.',
    'Pick up a physical novel and read 15 pages in a cozy reading chair.',
    'Roast marshmallows or light a candle and watch the flickering golden flame.'
  ];
  const [currentOfflinePrompt, setCurrentOfflinePrompt] = useState(offlineActivities[0]);

  const generateNewPrompt = () => {
    const nextIdx = Math.floor(Math.random() * offlineActivities.length);
    setCurrentOfflinePrompt(offlineActivities[nextIdx]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Full-screen Zen Mode Modal for Digital Detox */}
      {detoxActive && (
        <div className="fixed inset-0 z-50 bg-[#1A2E1A] text-white flex flex-col items-center justify-between p-8 sm:p-12 animate-in fade-in duration-500">
          <div className="w-full flex justify-between items-center max-w-4xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A9B896]">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
              <span>Offline Zen Sanctuary Active</span>
            </div>
            <button
              onClick={() => setDetoxActive(false)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-white"
            >
              <X className="w-4 h-4" />
              <span>End Early</span>
            </button>
          </div>

          <div className="text-center space-y-6 max-w-lg">
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
              <div className="w-36 h-36 rounded-full bg-white/5 border border-white/30 flex items-center justify-center backdrop-blur-md">
                <span className="text-4xl sm:text-5xl font-mono font-bold">
                  {formatTimeRemaining(detoxSecondsLeft)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-serif">Rest Your Eyes, Awaken Your Senses</h2>
              <p className="text-xs sm:text-sm text-[#A9B896] leading-relaxed">
                Step away from this monitor. Stretch your shoulders, gaze at the outdoor sky, or sit with your eyes gently closed.
              </p>
            </div>
          </div>

          <div className="text-xs text-[#A9B896]/70">
            Press ESC or click End Early to return to Balance Compass anytime.
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Smartphone className="w-4 h-4" />
          <span>Core Pillar 05</span>
          <span>·</span>
          <span>Conscious Tech</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Digital Well-being & Screen Equilibrium
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-3xl leading-relaxed">
          Technology is an extraordinary tool when used with intentional agency, but a catastrophic master when driven by algorithmic addiction. Reclaim your biological attention spans.
        </p>
      </div>

      {/* 1-CLICK DIGITAL DETOX BAR */}
      <div className="bg-[#1A2E1A] text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4ADE80]">
              Instant Nervous System Reset
            </span>
            <h2 className="text-2xl font-bold">1-Click Digital Detox Zen Timer</h2>
            <p className="text-xs sm:text-sm text-[#A9B896]">
              Instantly lock away distractions and launch a full-screen restorative pause.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => startDetox(15)}
              className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-md"
            >
              15 Min Quick Reset
            </button>
            <button
              onClick={() => startDetox(30)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-full border border-white/20 transition-all cursor-pointer"
            >
              30 Min Deep Detox
            </button>
            <button
              onClick={() => startDetox(60)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-full border border-white/20 transition-all cursor-pointer"
            >
              60 Min Evening Sunset
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN TIME BREAKDOWN VISUALIZER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1A2E1A]">Interactive Screen Time Visualizer</h2>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            Adjust the sliders to mirror your average day and see your true digital allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#1A2E1A]">
                <span>1. Deep Work & Professional Output</span>
                <span className="text-[#2E7D32]">{workHours} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={workHours}
                onChange={e => setWorkHours(parseFloat(e.target.value))}
                className="w-full accent-[#2E7D32] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#1A2E1A]">
                <span>2. Social Media & Infinite Feeds</span>
                <span className="text-[#D97706]">{socialHours} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={socialHours}
                onChange={e => setSocialHours(parseFloat(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#1A2E1A]">
                <span>3. Passive Video & Entertainment</span>
                <span className="text-[#6366F1]">{mediaHours} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={mediaHours}
                onChange={e => setMediaHours(parseFloat(e.target.value))}
                className="w-full accent-[#6366F1] cursor-pointer"
              />
            </div>
          </div>

          {/* Aggregate Breakdown Stat */}
          <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#EAE6DF] space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">
              Daily Aggregate
            </div>
            <div className="text-4xl font-black text-[#1A2E1A]">
              {totalHours} <span className="text-base font-normal text-[#5A6B5A]">hours screen time</span>
            </div>

            <div className="space-y-2 text-xs text-[#5A6B5A]">
              <div className="flex justify-between">
                <span>Conscious Work Ratio:</span>
                <span className="font-bold text-[#2E7D32]">
                  {Math.round((workHours / parseFloat(totalHours)) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Passive Consumption Ratio:</span>
                <span className="font-bold text-[#D97706]">
                  {Math.round(((socialHours + mediaHours) / parseFloat(totalHours)) * 100)}%
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EAE6DF] text-xs text-[#1A2E1A] leading-relaxed">
              💡 <strong>Action Insight:</strong> Shifting just 45 minutes of evening social scrolling into outdoor reading recovers over 270 hours of cognitive presence annually.
            </div>
          </div>
        </div>
      </div>

      {/* OFFLINE ACTIVITY GENERATOR & FIRE PIT FEATURE */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.03_PM_6640553f.jpeg"
              alt="Family gathered by garden fire pit roasting marshmallows at dusk"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                Tactile Offline Realities
              </span>
              <h2 className="text-2xl font-bold text-[#1A2E1A]">
                Screen-Free Idea Generator
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6B5A]">
                Stuck in a boredom reflex reaching for your phone? Click below for an unhurried analogue alternative.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#2E7D32]/20 font-serif italic text-sm text-[#1A2E1A] leading-relaxed">
              "{currentOfflinePrompt}"
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={generateNewPrompt}
                className="px-5 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Shuffle className="w-4 h-4" />
                <span>Give Me Another Activity</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
