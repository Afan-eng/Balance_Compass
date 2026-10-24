import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatTimeRemaining, getNextPomodoroState } from '../utils/streakCalculator';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Flame,
  Volume2,
  VolumeX,
  Award,
  Zap,
  Target
} from 'lucide-react';

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
}

export const ProductivityPage: React.FC = () => {
  const { incrementStreak, showToast, addFocusMinutes, totalFocusMinutes } = useApp();

  // Pomodoro Timer State
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Update browser document tab title dynamically
  useEffect(() => {
    if (isRunning) {
      document.title = `(${formatTimeRemaining(timeLeft)}) ${mode === 'work' ? '🎯 Focus' : '🌿 Break'} - Balance Compass`;
    } else {
      document.title = 'Balance Compass — Work-Life Balance & Community';
    }
    return () => {
      document.title = 'Balance Compass — Work-Life Balance & Community';
    };
  }, [isRunning, timeLeft, mode]);

  // Pleasant Web Audio chime on cycle completion
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.8);
    } catch (e) {
      // Audio fallback
    }
  };

  // Real-time ticking interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playChime();
            const { nextMode, durationMinutes, updatedCycles } = getNextPomodoroState(mode, completedCycles);
            setMode(nextMode);
            setCompletedCycles(updatedCycles);
            setIsRunning(false);

            // Execute outside state updater
            setTimeout(() => {
              if (mode === 'work') {
                addFocusMinutes(25);
                incrementStreak();
                showToast('🎯 25-minute deep work block logged! Take a restorative break.');
              } else {
                showToast('🔔 Restorative break completed! Ready for your next focus block?');
              }
            }, 0);

            return durationMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, mode, completedCycles, totalFocusMinutes, soundEnabled, addFocusMinutes, incrementStreak, showToast]);

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'work') setTimeLeft(25 * 60);
    if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'shortBreak') setTimeLeft(5 * 60);
    if (mode === 'longBreak') setTimeLeft(15 * 60);
  };

  // Daily Tasks State with LocalStorage persistence
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('balance_compass_daily_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { id: 't1', text: 'Draft executive summary without email tab open', priority: 'high', done: true },
      { id: 't2', text: '15-minute standing team sync & daily priorities', priority: 'medium', done: false },
      { id: 't3', text: '5:15 PM workspace shutdown & tomorrow prep', priority: 'high', done: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_daily_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [newTaskInput, setNewTaskInput] = useState('');
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask: Task = {
      id: 'task-' + Date.now(),
      text: newTaskInput.trim(),
      priority: newPriority,
      done: false
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskInput('');
    showToast('Task added to daily priority plan.');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // 5:15 PM Shutdown ritual checklist
  const [shutdownSteps, setShutdownSteps] = useState([
    { id: 's1', label: 'Review tomorrow morning’s primary 3 calendar commitments', done: false },
    { id: 's2', label: 'File active browser tabs into bookmarks or close them', done: false },
    { id: 's3', label: 'Write singular critical morning priority on paper desk pad', done: false },
    { id: 's4', label: 'Set Slack / Teams status to "Offline for Evening"', done: false },
    { id: 's5', label: 'Physically close laptop lid and step into the evening', done: false }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Core Pillar 03</span>
          <span>·</span>
          <span>Deep Work Rhythms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Time, Energy & Focused Productivity
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-3xl leading-relaxed">
          Productivity is not frantic multitasking; it is executing high-leverage work in protected focus intervals so you can finish on time with your physiological energy intact.
        </p>
      </div>

      {/* WORKING POMODORO TIMER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-[#2E7D32] animate-ping' : 'bg-[#5A6B5A]'}`} />
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E1A]">
                Focus Flow Pomodoro Timer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A6B5A] mt-0.5">
              Updates your browser tab in real time. 25 min deep work, 5 min restorative pause.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Selector Tabs */}
            <div className="p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF] flex items-center gap-1">
              <button
                onClick={() => switchMode('work')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'work' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#5A6B5A] hover:text-[#1A2E1A]'
                }`}
              >
                Focus (25m)
              </button>
              <button
                onClick={() => switchMode('shortBreak')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'shortBreak' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#5A6B5A] hover:text-[#1A2E1A]'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => switchMode('longBreak')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'longBreak' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#5A6B5A] hover:text-[#1A2E1A]'
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Sound Mute */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-[#EAE6DF] text-[#5A6B5A] hover:text-[#2E7D32] hover:bg-[#FAF8F5] cursor-pointer"
              title={soundEnabled ? 'Mute chimes' : 'Enable chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#2E7D32]" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Big Digital Display */}
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="text-7xl sm:text-8xl md:text-9xl font-black text-[#1A2E1A] font-mono tracking-tighter">
            {formatTimeRemaining(timeLeft)}
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#5A6B5A]">
            <span>{mode === 'work' ? '🎯 Single-Task Deep Work Interval' : '🌿 Restorative Non-Screen Break'}</span>
            <span>·</span>
            <span className="text-[#2E7D32]">{isRunning ? 'Running' : 'Paused'}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isRunning
                  ? 'bg-[#B45309] hover:bg-[#92400E] text-white'
                  : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Focus Session</span>
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

          {/* Live Cumulative Statistics */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#5A6B5A] pt-4 border-t border-[#EAE6DF] w-full max-w-xl">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full">
              <Zap className="w-3.5 h-3.5" />
              <span>Completed Cycles: {completedCycles} blocks</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#EAE6DF] text-[#1A2E1A] rounded-full">
              <Target className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Total Deep Focus Logged: {Math.floor(totalFocusMinutes / 60)}h {totalFocusMinutes % 60}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* DAILY CHECKLIST PLANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Task List */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#1A2E1A]">Daily Essential Priority Planner</h2>
            <p className="text-xs text-[#5A6B5A]">
              Cap your day at 3-5 high-impact items to avoid decision fatigue and overwhelm.
            </p>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              placeholder="What is your singular priority right now?"
              value={newTaskInput}
              onChange={e => setNewTaskInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 text-xs sm:text-sm outline-none"
            />
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-[#EAE6DF] text-xs font-semibold bg-[#FAF8F5] text-[#1A2E1A]"
            >
              <option value="high">High</option>
              <option value="medium">Med</option>
              <option value="low">Low</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Tasks Container */}
          <div className="space-y-2.5">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  task.done
                    ? 'bg-[#FAF8F5] border-[#EAE6DF] opacity-60'
                    : 'bg-white border-[#EAE6DF] hover:border-[#2E7D32]/40 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      task.done
                        ? 'bg-[#2E7D32] border-[#2E7D32] text-white'
                        : 'border-[#5A6B5A]/40 hover:border-[#2E7D32]'
                    }`}
                  >
                    {task.done && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      task.done ? 'line-through text-[#5A6B5A]' : 'text-[#1A2E1A]'
                    }`}
                  >
                    {task.text}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      task.priority === 'high'
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : task.priority === 'medium'
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : 'bg-[#DCFCE7] text-[#15803D]'
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-[#5A6B5A] hover:text-[#DC2626] p-1 cursor-pointer"
                    title="Remove task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5:15 PM Shutdown Protocol Checklist */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
              Evening Boundary Ritual
            </span>
            <h3 className="text-lg font-bold text-[#1A2E1A]">
              5:15 PM Workday Shutdown Checklist
            </h3>
            <p className="text-xs text-[#5A6B5A]">
              Without a formal closing ceremony, work stress lingers into dinner and disrupts biological recovery.
            </p>
          </div>

          <div className="space-y-2.5">
            {shutdownSteps.map(step => (
              <button
                key={step.id}
                onClick={() => {
                  setShutdownSteps(prev =>
                    prev.map(s => (s.id === step.id ? { ...s, done: !s.done } : s))
                  );
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  step.done ? 'bg-[#E8F5E9] border-[#2E7D32]/40 text-[#1B5E20]' : 'bg-white border-[#EAE6DF] text-[#1A2E1A]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                    step.done ? 'bg-[#2E7D32] border-[#2E7D32] text-white' : 'border-[#5A6B5A]/40'
                  }`}
                >
                  {step.done && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className="text-xs font-medium leading-snug">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                showToast('🎉 Workday officially shutdown! Enjoy your evening peace.');
                incrementStreak();
              }}
              className="w-full py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-xs"
            >
              Execute Shutdown Complete (+25 pts)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
