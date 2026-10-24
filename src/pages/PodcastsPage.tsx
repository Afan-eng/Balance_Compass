import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PodcastEpisode } from '../types';
import { PODCASTS_DATA } from '../data/mockData';
import { formatTimeRemaining } from '../utils/streakCalculator';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Sparkles,
  ArrowRight,
  Radio,
  Sliders,
  Music
} from 'lucide-react';

export const PodcastsPage: React.FC = () => {
  const { showToast, incrementStreak, recordActivity } = useApp();

  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(PODCASTS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.25 | 1.5>(1);
  const [volume, setVolume] = useState(70);
  const [soundscapeMode, setSoundscapeMode] = useState<'Tibetan Bowl' | 'Ocean Waves' | 'Alpha Waves'>('Tibetan Bowl');

  // Web Audio ambient sound synthesizer references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Initialize or update Web Audio synthesis
  const startAudioSynthesis = () => {
    try {
      stopAudioSynthesis();
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime((volume / 100) * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (soundscapeMode === 'Tibetan Bowl') {
        // Multi-frequency harmonic chords (432Hz root, 648Hz fifth, 864Hz octave)
        const freqs = [432, 648, 864];
        oscillatorsRef.current = freqs.map((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          oscGain.gain.setValueAtTime(0.06 / (idx + 1), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          return osc;
        });
      } else if (soundscapeMode === 'Ocean Waves') {
        // Modulated pink noise buffer
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        // Low frequency oscillation for rhythmic waves
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();
        lfo.start();
        noiseNodeRef.current = whiteNoise;
      } else {
        // Alpha Waves (10Hz binaural beat: 216Hz left, 226Hz right)
        const leftOsc = ctx.createOscillator();
        leftOsc.type = 'sine';
        leftOsc.frequency.setValueAtTime(216, ctx.currentTime);

        const rightOsc = ctx.createOscillator();
        rightOsc.type = 'sine';
        rightOsc.frequency.setValueAtTime(226, ctx.currentTime);

        const merger = ctx.createChannelMerger(2);
        leftOsc.connect(merger, 0, 0);
        rightOsc.connect(merger, 0, 1);
        merger.connect(masterGain);

        leftOsc.start();
        rightOsc.start();
        oscillatorsRef.current = [leftOsc, rightOsc];
      }
    } catch (e) {
      // AudioContext policy
    }
  };

  const stopAudioSynthesis = () => {
    try {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      oscillatorsRef.current = [];
      if (noiseNodeRef.current) {
        try { (noiseNodeRef.current as any).stop?.(); noiseNodeRef.current.disconnect(); } catch (e) {}
        noiseNodeRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
      audioCtxRef.current = null;
    } catch (e) {}
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime((volume / 100) * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Audio Playback timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      startAudioSynthesis();
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= currentEpisode.durationSeconds) {
            setIsPlaying(false);
            stopAudioSynthesis();
            showToast(`Completed listening to: ${currentEpisode.title}! (+25 pts)`);
            recordActivity('listened_podcast', 25);
            incrementStreak();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      stopAudioSynthesis();
    }
    return () => {
      if (interval) clearInterval(interval);
      stopAudioSynthesis();
    };
  }, [isPlaying, playbackRate, currentEpisode, soundscapeMode]);

  const togglePlay = (episode?: PodcastEpisode) => {
    if (episode && episode.id !== currentEpisode.id) {
      setCurrentEpisode(episode);
      setCurrentTimeSec(0);
      setIsPlaying(true);
      showToast(`Now playing: ${episode.title}`);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const seekRelative = (delta: number) => {
    setCurrentTimeSec(prev => Math.max(0, Math.min(currentEpisode.durationSeconds, prev + delta)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Headphones className="w-4 h-4" />
          <span>The Balance Frequency Audio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Curated Conversations with Masters of Mind & Work
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Deep, unhurried audio dialogues with circadian chronobiologists and psychologists. Features a live ambient Web Audio synthesizer for deep focus.
        </p>
      </div>

      {/* EMBEDDED INTERACTIVE AUDIO PLAYER BANNER */}
      <div className="bg-[#1A2E1A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#2E7D32]/30 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center text-white shrink-0 shadow-lg relative">
              <Headphones className="w-10 h-10" />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4ADE80] rounded-full animate-ping" />
              )}
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#4ADE80]">
                  Now Playing · {currentEpisode.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#A9B896]">
                  Live Ambient: {soundscapeMode}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold leading-tight">
                {currentEpisode.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#A9B896]">
                Guest: {currentEpisode.guest}
              </p>
            </div>
          </div>

          {/* Soundscape Mode & Controls */}
          <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
            {/* Mode switch */}
            <div className="p-1 bg-white/10 rounded-xl flex items-center gap-1 text-xs">
              {(['Tibetan Bowl', 'Ocean Waves', 'Alpha Waves'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSoundscapeMode(mode)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    soundscapeMode === mode ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#A9B896] hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Rate */}
            <button
              onClick={() => setPlaybackRate(playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white border border-white/15 cursor-pointer"
            >
              {playbackRate}x Speed
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#A9B896]" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={e => setVolume(parseInt(e.target.value, 10))}
                className="w-20 accent-[#4ADE80] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Progress Scrubber */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={currentEpisode.durationSeconds}
            value={currentTimeSec}
            onChange={e => setCurrentTimeSec(parseInt(e.target.value, 10))}
            className="w-full accent-[#4ADE80] cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-[#A9B896]">
            <span>{formatTimeRemaining(currentTimeSec)}</span>
            <span>{currentEpisode.duration}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            onClick={() => seekRelative(-15)}
            className="p-2.5 rounded-full hover:bg-white/10 text-[#A9B896] hover:text-white transition-colors cursor-pointer"
            title="Rewind 15 seconds"
          >
            <Rewind className="w-5 h-5" />
          </button>

          <button
            onClick={() => togglePlay()}
            className="w-14 h-14 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </button>

          <button
            onClick={() => seekRelative(15)}
            className="p-2.5 rounded-full hover:bg-white/10 text-[#A9B896] hover:text-white transition-colors cursor-pointer"
            title="Fast forward 15 seconds"
          >
            <FastForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* EPISODE LIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6">
        <h3 className="text-xl font-bold text-[#1A2E1A]">All Episodes & Sound Archive</h3>
        <div className="space-y-3">
          {PODCASTS_DATA.map(episode => {
            const isSelected = episode.id === currentEpisode.id;
            return (
              <div
                key={episode.id}
                onClick={() => togglePlay(episode)}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F5E9] border-[#2E7D32] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#EAE6DF] hover:border-[#2E7D32]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected && isPlaying
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-white text-[#2E7D32] border border-[#EAE6DF]'
                    }`}
                  >
                    {isSelected && isPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#5A6B5A]">
                      <span className="font-semibold text-[#2E7D32]">{episode.category}</span>
                      <span>·</span>
                      <span>{episode.duration}</span>
                      <span>·</span>
                      <span>{episode.published}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#1A2E1A] mt-1">{episode.title}</h4>
                    <p className="text-xs text-[#5A6B5A] mt-1 line-clamp-2">{episode.description}</p>
                  </div>
                </div>

                <button className="self-end sm:self-center px-4 py-2 rounded-full bg-white border border-[#EAE6DF] text-xs font-bold text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-colors cursor-pointer shrink-0">
                  {isSelected && isPlaying ? 'Pause' : 'Play Episode'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
