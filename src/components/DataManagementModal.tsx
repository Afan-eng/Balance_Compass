import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Flame,
  ShieldCheck,
  Droplets,
  Moon,
  Footprints,
  Clock,
  Target
} from 'lucide-react';

interface DataManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataManagementModal: React.FC<DataManagementModalProps> = ({ isOpen, onClose }) => {
  const {
    streakState,
    streakCount,
    bestStreak,
    totalPoints,
    habits,
    goals,
    moodEntries,
    healthHistory,
    waterGlasses,
    waterGoal,
    sleepHours,
    stepCount,
    totalFocusMinutes,
    forumPosts,
    showToast
  } = useApp();

  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  // Calculate Real-Time Work-Life Equilibrium Score (0 - 100)
  const habitsDone = habits.filter(h => h.completed).length;
  const habitScore = habits.length > 0 ? (habitsDone / habits.length) * 25 : 20;

  const waterRatio = Math.min(1, waterGlasses / Math.max(1, waterGoal));
  const waterScore = waterRatio * 15;

  // Sleep score: 7.5 to 8.5 is optimal (100%), drops if <6 or >10
  const sleepDeviation = Math.abs(sleepHours - 8);
  const sleepScore = Math.max(0, 20 - sleepDeviation * 5);

  const stepRatio = Math.min(1, stepCount / 10000);
  const stepScore = stepRatio * 15;

  const focusScore = Math.min(15, (totalFocusMinutes / 50) * 15);
  const streakScore = Math.min(10, streakCount * 2);

  const equilibriumScore = Math.min(100, Math.round(habitScore + waterScore + sleepScore + stepScore + focusScore + streakScore));

  const getScoreVerdict = (score: number) => {
    if (score >= 85) return { label: 'Optimal Harmonious Flow', color: 'text-[#2E7D32]', bg: 'bg-[#E8F5E9]' };
    if (score >= 65) return { label: 'Balanced Daily Cadence', color: 'text-[#0284C7]', bg: 'bg-[#E0F2FE]' };
    return { label: 'Restoration Needed', color: 'text-[#D97706]', bg: 'bg-[#FFF4E5]' };
  };

  const verdict = getScoreVerdict(equilibriumScore);

  // Generate & Download Markdown Balance Audit Report
  const handleDownloadReport = () => {
    const todayStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const reportContent = `# Balance Compass — Work-Life Equilibrium Audit Report
Generated: ${todayStr}
Platform: Balance Compass (Mindfulness & Work-Life Architecture)

---

## EXECUTIVE SUMMARY
- **Overall Equilibrium Score:** ${equilibriumScore} / 100 (${verdict.label})
- **Active Daily Streak:** ${streakCount} consecutive days (Personal Best: ${bestStreak} days)
- **Mindfulness Points Earned:** ${totalPoints} pts
- **Streak Freeze Shield Status:** ${streakState.streakFreezeAvailable ? 'Equipped & Active ❄️' : 'Not Equipped'}

---

## 1. SOMATIC & PHYSICAL VITALS
- **Hydration:** ${waterGlasses} / ${waterGoal} glasses (${Math.round((waterGlasses / waterGoal) * 100)}% of daily target)
- **Sleep Duration:** ${sleepHours} hours recorded (Target: 7.5 - 8.5 hrs)
- **Movement:** ${stepCount.toLocaleString()} steps logged today
- **Total Deep Focus Time:** ${totalFocusMinutes} minutes (${(totalFocusMinutes / 60).toFixed(1)} hours)

---

## 2. DAILY HABIT ANCHORS (${habitsDone}/${habits.length} Completed Today)
${habits.map(h => `- [${h.completed ? 'x' : ' '}] ${h.name} (${h.category}) — ${h.streak} day streak`).join('\n')}

---

## 3. ACTIVE STRATEGIC GOALS & MILESTONES
${goals.map(g => {
  const completedMilestones = g.milestones.filter(m => m.done).length;
  return `### ${g.title} (${g.category})
- Progress: ${g.progress}%
- Milestones: ${completedMilestones}/${g.milestones.length} completed
- Target Date: ${g.targetDate}
${g.milestones.map(m => `  * [${m.done ? 'x' : ' '}] ${m.text}`).join('\n')}`;
}).join('\n\n')}

---

## 4. EMOTIONAL REFLECTIONS (${moodEntries.length} entries recorded)
${moodEntries.slice(0, 5).map(m => `- ${m.date}: Mood ${m.mood.toUpperCase()} | Tags: ${m.tags.join(', ')} | Note: "${m.note || 'None'}"`).join('\n')}

---

## ARCHITECTURAL RECOMMENDATIONS:
${equilibriumScore < 70
  ? '- Prioritize a digital sunset 60 minutes before bedtime to eliminate sleep debt.\n- Schedule two 25-minute Pomodoro focus blocks to alleviate mental fragmentation.'
  : '- Your biological cadence is robust. Continue reinforcing your morning hydration and nature walks.'}

---
Exported securely from your local device. Balance Compass preserves your private health sovereignty.
`;

    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `balance_compass_audit_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded complete Work-Life Balance Audit Report!');
  };

  // Full JSON State Export
  const handleExportJSON = () => {
    const fullBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      streakState,
      habits,
      goals,
      moodEntries,
      healthHistory,
      totalFocusMinutes,
      waterGlasses,
      sleepHours,
      stepCount,
      forumPosts
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `balance_compass_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported complete Balance Compass JSON backup file!');
  };

  // Full JSON State Import
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed || typeof parsed !== 'object') {
          showToast('Invalid backup file format.');
          return;
        }

        // Restore known keys to localStorage
        if (parsed.streakState) localStorage.setItem('balance_compass_streak_state_v2', JSON.stringify(parsed.streakState));
        if (parsed.habits) localStorage.setItem('balance_compass_habits', JSON.stringify(parsed.habits));
        if (parsed.goals) localStorage.setItem('balance_compass_goals', JSON.stringify(parsed.goals));
        if (parsed.moodEntries) localStorage.setItem('balance_compass_mood_entries', JSON.stringify(parsed.moodEntries));
        if (parsed.healthHistory) localStorage.setItem('balance_compass_health_history', JSON.stringify(parsed.healthHistory));
        if (parsed.totalFocusMinutes !== undefined) localStorage.setItem('balance_compass_focus_minutes', String(parsed.totalFocusMinutes));
        if (parsed.waterGlasses !== undefined) localStorage.setItem('balance_compass_water_glasses', String(parsed.waterGlasses));
        if (parsed.sleepHours !== undefined) localStorage.setItem('balance_compass_sleep_hours', String(parsed.sleepHours));
        if (parsed.stepCount !== undefined) localStorage.setItem('balance_compass_step_count', String(parsed.stepCount));

        showToast('✅ Backup restored successfully! Refreshing view...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        showToast('Error reading backup file.');
      }
    };
    reader.readAsText(file);
  };

  // Reset Data to Defaults
  const handleResetData = () => {
    localStorage.clear();
    showToast('Reset data to defaults. Reloading...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs" />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5A6B5A] hover:text-[#1A2E1A] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Health & Data Sovereignty</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1A2E1A]">
            Work-Life Equilibrium & Data Portability
          </h2>
          <p className="text-xs text-[#5A6B5A]">
            Your data is 100% private and stored locally. Download comprehensive wellness audit reports or export complete offline backups.
          </p>
        </div>

        {/* Real-time Equilibrium Score Banner */}
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#EAE6DF] shadow-xs flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#2E7D32] font-sans leading-none">{equilibriumScore}</span>
              <span className="text-[10px] text-[#5A6B5A] font-bold uppercase mt-0.5">/ 100</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1A2E1A]">Work-Life Equilibrium Score</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${verdict.bg} ${verdict.color}`}>
                  {verdict.label}
                </span>
              </div>
              <p className="text-xs text-[#5A6B5A] mt-0.5">
                Computed from streak continuity, hydration, sleep hygiene, steps, and habit check-ins.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadReport}
            className="px-4 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer shrink-0 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Audit Report (.md)</span>
          </button>
        </div>

        {/* Live Snapshot Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
            <div className="text-xs text-[#5A6B5A]">Consecutive Streak</div>
            <div className="text-lg font-bold text-[#1A2E1A] mt-0.5">🔥 {streakCount} Days</div>
          </div>
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
            <div className="text-xs text-[#5A6B5A]">Habits Done Today</div>
            <div className="text-lg font-bold text-[#1A2E1A] mt-0.5">{habitsDone} / {habits.length}</div>
          </div>
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
            <div className="text-xs text-[#5A6B5A]">Focus Time Logged</div>
            <div className="text-lg font-bold text-[#1A2E1A] mt-0.5">{totalFocusMinutes} mins</div>
          </div>
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
            <div className="text-xs text-[#5A6B5A]">Points Earned</div>
            <div className="text-lg font-bold text-[#1A2E1A] mt-0.5">✨ {totalPoints}</div>
          </div>
        </div>

        {/* Data Portability Tools */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A]">Data Backup & Portability</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Export JSON */}
            <button
              onClick={handleExportJSON}
              className="p-4 rounded-2xl bg-white border border-[#EAE6DF] hover:border-[#2E7D32] text-left space-y-1.5 cursor-pointer shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A2E1A] group-hover:text-[#2E7D32]">
                <Download className="w-4 h-4 text-[#2E7D32]" />
                <span>Export Full JSON Backup</span>
              </div>
              <p className="text-[11px] text-[#5A6B5A]">
                Download your habits, goals, mood reflections, and streak states as a single JSON file.
              </p>
            </button>

            {/* Import JSON */}
            <label className="p-4 rounded-2xl bg-white border border-[#EAE6DF] hover:border-[#2E7D32] text-left space-y-1.5 cursor-pointer shadow-xs transition-all group block">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A2E1A] group-hover:text-[#2E7D32]">
                <Upload className="w-4 h-4 text-[#2E7D32]" />
                <span>Restore from JSON File</span>
              </div>
              <p className="text-[11px] text-[#5A6B5A]">
                Upload an existing backup to synchronize across another browser or device.
              </p>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>

        {/* Reset Confirmation */}
        <div className="pt-3 border-t border-[#EAE6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          {confirmReset ? (
            <div className="flex items-center gap-3 w-full justify-between">
              <span className="text-xs font-bold text-[#DC2626] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Are you sure? This erases all local habits and streaks.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetData}
                  className="px-4 py-1.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold cursor-pointer"
                >
                  Yes, Reset All
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setConfirmReset(true)}
                className="text-xs text-[#DC2626] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset all local tracker data</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#1A2E1A] hover:bg-[#FAF8F5] cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
