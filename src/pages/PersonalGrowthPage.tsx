import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  Send,
  PenTool
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
}

export const PersonalGrowthPage: React.FC = () => {
  const { showToast, incrementStreak } = useApp();

  const prompts = [
    'What gave you unexpected energy today, and what silently drained it?',
    'What boundary did you honor this week that your past self would have broken?',
    'Describe one sensory moment in nature that made you feel completely grounded.',
    'If tomorrow had no meetings or alarms, what would your soul crave doing?'
  ];

  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [entryContent, setEntryContent] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('balance_compass_journal');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'j1',
            date: 'Oct 23, 2026',
            prompt: 'What gave you unexpected energy today, and what silently drained it?',
            content: 'Working for 2 hours in silence with my phone outside the room gave me tremendous focus. Back-to-back impromptu Zoom calls drained my battery around 3 PM.'
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryContent.trim()) return;
    const newEntry: JournalEntry = {
      id: 'entry-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      prompt: selectedPrompt,
      content: entryContent.trim()
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    setEntryContent('');
    showToast('📖 Journal entry saved to your reflective notebook!');
    incrementStreak();
  };

  const deleteEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
  };

  const hobbies = [
    {
      title: 'Botanical Herb Gardening & Soil Touch',
      tag: 'Tactile Grounding',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__1__64a6e826.jpeg',
      desc: 'Planting heirloom tomatoes, basil, and rosemary connects you with seasonal growth cycles.'
    },
    {
      title: 'Ridge Trail Hiking & High-Elevation Perspective',
      tag: 'Outdoor Adventure',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM__3__247cdffd.jpeg',
      desc: 'Climbing to an open mountain summit triggers the "overview effect", rendering daily worries small.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Core Pillar 06</span>
          <span>·</span>
          <span>Self-Actualization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Personal Growth, Hobbies & Reflective Craft
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-3xl leading-relaxed">
          Growth is not about hustling for optimization metrics; it is cultivating curious hobbies with zero financial return, nurturing your inner life, and reflecting through written prose.
        </p>
      </div>

      {/* HOBBY CURATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hobbies.map((h, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF] flex flex-col justify-between">
            <div className="h-64 overflow-hidden relative">
              <img
                src={h.image}
                alt={h.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#2E7D32] shadow-xs">
                {h.tag}
              </span>
            </div>
            <div className="p-6 sm:p-7 space-y-2">
              <h3 className="text-xl font-bold text-[#1A2E1A]">{h.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE JOURNAL NOTEBOOK */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            <PenTool className="w-4 h-4" />
            <span>Reflective Practice</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1A2E1A]">
            Mindful Journal & Inquiry Notebook
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            Choose a prompt and take 3 minutes to put raw, unedited thoughts onto paper.
          </p>
        </div>

        {/* Prompt Selector Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#5A6B5A]">
            Select Inquiry Prompt:
          </label>
          <div className="flex flex-wrap gap-2">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPrompt(p)}
                className={`text-xs px-3.5 py-2 rounded-xl text-left transition-all cursor-pointer border ${
                  selectedPrompt === p
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32] font-semibold shadow-xs'
                    : 'bg-[#FAF8F5] text-[#1A2E1A] border-[#EAE6DF] hover:border-[#2E7D32]/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Form */}
        <form onSubmit={handleSaveEntry} className="space-y-4">
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF] space-y-2">
            <div className="text-xs font-semibold text-[#2E7D32]">
              Current Focus Prompt:
            </div>
            <div className="text-sm font-serif italic text-[#1A2E1A]">
              "{selectedPrompt}"
            </div>
          </div>

          <textarea
            rows={4}
            required
            placeholder="Write freely here without filtering..."
            value={entryContent}
            onChange={e => setEntryContent(e.target.value)}
            className="w-full p-4 rounded-2xl border border-[#EAE6DF] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 text-sm outline-none bg-white font-sans leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save Journal Reflection</span>
            </button>
          </div>
        </form>

        {/* Past Journal Entries */}
        {journalEntries.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-[#EAE6DF]">
            <h3 className="text-sm font-bold text-[#1A2E1A] uppercase tracking-wider">
              Saved Entries ({journalEntries.length})
            </h3>
            <div className="space-y-3">
              {journalEntries.map(entry => (
                <div key={entry.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-2 relative group">
                  <div className="flex justify-between items-center text-xs text-[#5A6B5A]">
                    <span className="font-semibold text-[#2E7D32]">{entry.date}</span>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-[#5A6B5A] hover:text-[#DC2626] cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-[#1A2E1A] italic">
                    "{entry.prompt}"
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A2E1A] leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
