import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Brain,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const MentalWellnessPage: React.FC = () => {
  const { setCurrentPage, incrementStreak, showToast, recordActivity } = useApp();

  // Breathing Timer State
  // Modes: Box (4-4-4-4), Calming (4-7-8), Deep Calm (5-5-5-5)
  const [breathPattern, setBreathPattern] = useState<'box' | 'calm' | 'deep'>('box');
  const [isRunning, setIsRunning] = useState(false);
  
  // Box breathing phases: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Hold (4s)
  type BreathPhase = 'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)';
  const [phaseIndex, setPhaseIndex] = useState(0); // 0, 1, 2, 3
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [totalBreathingSeconds, setTotalBreathingSeconds] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Phase configurations based on pattern
  const getPatternPhases = (pattern: 'box' | 'calm' | 'deep'): { phase: BreathPhase; duration: number; guidance: string }[] => {
    if (pattern === 'box') {
      return [
        { phase: 'Inhale', duration: 4, guidance: 'Deep nasal inhale, expand belly' },
        { phase: 'Hold (Full)', duration: 4, guidance: 'Retain gentle chest fullness' },
        { phase: 'Exhale', duration: 4, guidance: 'Slow smooth release through lips' },
        { phase: 'Hold (Empty)', duration: 4, guidance: 'Rest quietly in empty stillness' }
      ];
    }
    if (pattern === 'calm') {
      return [
        { phase: 'Inhale', duration: 4, guidance: 'Inhale quietly through nose' },
        { phase: 'Hold (Full)', duration: 7, guidance: 'Sustain gentle retention' },
        { phase: 'Exhale', duration: 8, guidance: 'Whoosh exhale completely through mouth' },
        { phase: 'Hold (Empty)', duration: 1, guidance: 'Brief transitional pause' }
      ];
    }
    return [
      { phase: 'Inhale', duration: 5, guidance: 'Long rhythmic inhalation' },
      { phase: 'Hold (Full)', duration: 5, guidance: 'Soft heart retention' },
      { phase: 'Exhale', duration: 5, guidance: 'Even, relaxed exhalation' },
      { phase: 'Hold (Empty)', duration: 5, guidance: 'Somatic stillness' }
    ];
  };

  const currentPhases = getPatternPhases(breathPattern);
  const activeStep = currentPhases[phaseIndex] || currentPhases[0];

  // Pleasant Web Audio harmonic tone synthesizer
  const playTone = (freq: number, type: OscillatorType = 'sine', duration: number = 1.2) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext policy fallback
    }
  };

  // Real-time ticking interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTotalBreathingSeconds(prev => prev + 1);

        setSecondsRemaining(prev => {
          if (prev <= 1) {
            const nextIdx = (phaseIndex + 1) % currentPhases.length;
            setPhaseIndex(nextIdx);

            if (nextIdx === 0) {
              setCyclesCompleted(c => c + 1);
              playTone(528, 'sine', 1.8);
            } else if (currentPhases[nextIdx].phase.startsWith('Hold')) {
              playTone(432, 'triangle', 1.0);
            } else {
              playTone(396, 'sine', 1.5);
            }

            return currentPhases[nextIdx].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, phaseIndex, breathPattern, currentPhases, soundEnabled]);

  // Check cycles in dedicated effect
  useEffect(() => {
    if (cyclesCompleted === 4) {
      showToast('🌟 4 Box Breathing cycles completed! Parasympathetic nervous system restored.');
      recordActivity('completed_box_breathing', 30);
      incrementStreak();
    } else if (cyclesCompleted > 0 && cyclesCompleted % 2 === 0) {
      showToast(`Completed breathwork cycle ${cyclesCompleted}! Keep steady.`);
    }
  }, [cyclesCompleted]);

  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      playTone(528, 'sine', 1.5);
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setSecondsRemaining(currentPhases[0].duration);
    setCyclesCompleted(0);
  };

  const handlePatternChange = (pat: 'box' | 'calm' | 'deep') => {
    setBreathPattern(pat);
    setIsRunning(false);
    setPhaseIndex(0);
    const phases = getPatternPhases(pat);
    setSecondsRemaining(phases[0].duration);
  };

  // SVG Progress Ring calculations
  const totalPhaseDuration = activeStep.duration;
  const elapsed = totalPhaseDuration - secondsRemaining;
  const strokeDashoffset = 565 - (565 * elapsed) / totalPhaseDuration;

  // 5-4-3-2-1 Grounding Tool State
  const [groundingStep, setGroundingStep] = useState(0);
  const groundingSteps = [
    { count: '5', label: 'Things you can SEE around you right now (plants, wooden grain, sky, colors)' },
    { count: '4', label: 'Things you can physically FEEL (feet on floor, linen shirt, cool air on skin)' },
    { count: '3', label: 'Things you can HEAR (distant birds, humming fan, your rhythmic breath)' },
    { count: '2', label: 'Things you can SMELL (herbal tea, outdoor rain, fresh air)' },
    { count: '1', label: 'Thing you can TASTE or a genuine thought of GRATITUDE' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          <span>Core Pillar 01</span>
          <span>·</span>
          <span>Neuro-Restoration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Mental Wellness & Nervous System Regulation
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-3xl leading-relaxed">
          Chronic stress locks the autonomic nervous system into fight-or-flight sympathetic dominance. Use research-backed box breathing, cognitive defusion, and somatic grounding to regain biological calm.
        </p>
      </div>

      {/* INTERACTIVE GUIDED BREATHING WIDGET */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E1A]">
                Guided Breathing Clock & Visualizer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A6B5A] mt-0.5">
              Sequence: <strong className="text-[#2E7D32]">Inhale (4s) ➔ Hold (4s) ➔ Exhale (4s) ➔ Hold (4s)</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Pattern Switcher */}
            <div className="p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF] flex items-center gap-1">
              <button
                onClick={() => handlePatternChange('box')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  breathPattern === 'box'
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-[#5A6B5A] hover:text-[#1A2E1A]'
                }`}
              >
                Box (4-4-4-4)
              </button>
              <button
                onClick={() => handlePatternChange('calm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  breathPattern === 'calm'
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-[#5A6B5A] hover:text-[#1A2E1A]'
                }`}
              >
                Relaxing (4-7-8)
              </button>
              <button
                onClick={() => handlePatternChange('deep')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  breathPattern === 'deep'
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-[#5A6B5A] hover:text-[#1A2E1A]'
                }`}
              >
                Deep Calm (5-5-5-5)
              </button>
            </div>

            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-[#EAE6DF] text-[#5A6B5A] hover:text-[#2E7D32] hover:bg-[#FAF8F5] cursor-pointer transition-colors"
              title={soundEnabled ? 'Mute tone chimes' : 'Enable tone chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#2E7D32]" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Real-time Breathing Sphere with Circular Progress Ring */}
        <div className="flex flex-col items-center justify-center py-6 space-y-8">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-[#EAE6DF]"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Active countdown stroke */}
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-[#2E7D32] transition-all duration-1000 ease-linear"
                strokeWidth="6"
                strokeDasharray="565"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Dynamic Scaling Central Circle */}
            <div
              className={`rounded-full flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out shadow-2xl ${
                activeStep.phase === 'Inhale'
                  ? 'w-56 h-56 sm:w-60 sm:h-60 bg-gradient-to-br from-[#81C784] to-[#2E7D32] text-white scale-105'
                  : activeStep.phase === 'Hold (Full)'
                  ? 'w-56 h-56 sm:w-60 sm:h-60 bg-gradient-to-br from-[#4CAF50] to-[#1B5E20] text-white scale-100 ring-4 ring-[#81C784]/30'
                  : activeStep.phase === 'Exhale'
                  ? 'w-44 h-44 sm:w-48 sm:h-48 bg-gradient-to-br from-[#C8E6C9] to-[#66BB6A] text-[#1A2E1A] scale-90'
                  : 'w-40 h-40 sm:w-44 sm:h-44 bg-[#E8F5E9] text-[#1A2E1A] scale-85 ring-2 ring-[#2E7D32]/20'
              }`}
            >
              <span className="text-xs uppercase tracking-widest font-extrabold opacity-90">
                {activeStep.phase}
              </span>
              <span className="text-5xl sm:text-6xl font-black my-1 font-mono tracking-tighter">
                {isRunning ? secondsRemaining : 'Ready'}
              </span>
              <span className="text-[11px] px-3 opacity-80 font-medium line-clamp-1">
                {activeStep.guidance}
              </span>
            </div>
          </div>

          {/* Real-time Indicator Steps Bar */}
          <div className="grid grid-cols-4 gap-2 max-w-lg w-full">
            {currentPhases.map((p, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  phaseIndex === idx && isRunning
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm font-bold'
                    : 'bg-[#FAF8F5] border-[#EAE6DF] text-[#5A6B5A]'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider">{p.phase}</div>
                <div className="text-xs font-mono font-bold mt-0.5">{p.duration}s</div>
              </div>
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleStartStop}
              className={`px-9 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isRunning
                  ? 'bg-[#B45309] hover:bg-[#92400E] text-white'
                  : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Practice</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{cyclesCompleted > 0 ? 'Resume Breathwork' : 'Start Live Breathing'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-3.5 rounded-full border border-[#EAE6DF] hover:bg-[#FAF8F5] text-[#5A6B5A] text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Real-time Session Statistics */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#5A6B5A]">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Completed Cycles: {cyclesCompleted}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#EAE6DF] text-[#1A2E1A] rounded-full">
              <Activity className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Total Active Practice: {Math.floor(totalBreathingSeconds / 60)}m {totalBreathingSeconds % 60}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-4-3-2-1 SENSORY GROUNDING TOOL */}
      <div className="bg-[#FAF8F5] border border-[#EAE6DF] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            Acute Anxiety Protocol
          </span>
          <h2 className="text-2xl font-bold text-[#1A2E1A]">
            5-4-3-2-1 Somatic Grounding Checklist
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            When racing thoughts hijack your attention, use this sensory checklist to return to physical presence.
          </p>
        </div>

        <div className="space-y-3">
          {groundingSteps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setGroundingStep(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                groundingStep === idx
                  ? 'bg-white border-[#2E7D32] shadow-sm'
                  : 'bg-white/60 border-[#EAE6DF] hover:bg-white text-[#5A6B5A]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${
                  groundingStep === idx
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-[#E8F5E9] text-[#2E7D32]'
                }`}
              >
                {step.count}
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#1A2E1A] flex-1">
                {step.label}
              </div>
              {groundingStep > idx && (
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setGroundingStep(prev => Math.max(0, prev - 1))}
            disabled={groundingStep === 0}
            className="px-4 py-2 text-xs font-semibold rounded-full border border-[#EAE6DF] text-[#5A6B5A] disabled:opacity-40 cursor-pointer"
          >
            Previous Sense
          </button>
          <button
            onClick={() => {
              if (groundingStep < groundingSteps.length - 1) {
                setGroundingStep(prev => prev + 1);
              } else {
                showToast('✨ Grounding complete! Your nervous system is recalibrated.');
                recordActivity('completed_grounding_protocol', 25);
                incrementStreak();
              }
            }}
            className="px-5 py-2 text-xs font-semibold rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white cursor-pointer"
          >
            {groundingStep === groundingSteps.length - 1 ? 'Complete Grounding (+25 pts)' : 'Next Sense'}
          </button>
        </div>
      </div>

      {/* MANDATORY SAFETY DISCLAIMER */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#92400E] leading-relaxed">
          <h4 className="font-bold text-sm text-[#78350F]">Clinical Wellness & Medical Safety Notice</h4>
          <p>
            The mindfulness exercises, guided breathing tools, and lifestyle prompts provided by Balance Compass are for educational and self-regulation purposes only. They do not constitute psychotherapy, psychiatric care, or medical diagnosis. If you are experiencing acute psychological distress, panic disorder, or depression, please reach out to a licensed healthcare practitioner or local crisis line (in the US/Canada: 988 Suicide & Crisis Lifeline).
          </p>
        </div>
      </div>
    </div>
  );
};
