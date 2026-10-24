import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import {
  Search,
  X,
  Brain,
  Activity,
  Clock,
  Heart,
  Smartphone,
  Sparkles,
  BookOpen,
  Headphones,
  Video,
  Calendar,
  Users,
  Trophy,
  HandHeart,
  Award,
  FileText,
  Droplets,
  Smile,
  CheckCircle2,
  Target,
  Info,
  Mail,
  ArrowRight,
  Flame,
  Volume2
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tools' | 'Trackers' | 'Pillars' | 'Explore' | 'Community' | 'Company';
  icon: any;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDataModal?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenDataModal }) => {
  const { setCurrentPage, showToast, incrementStreak } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    // Direct interactive tools & widgets
    {
      id: 'tool-breathing',
      title: 'Guided Box Breathing Widget',
      subtitle: '4-4-4-4 box breathing visualizer with real-time countdown & Solfeggio tones',
      category: 'Tools',
      icon: Brain,
      keywords: ['breath', 'breathing', 'inhale', 'exhale', 'meditation', 'stress', 'relax', 'audio', 'solfeggio'],
      action: () => {
        setCurrentPage('mental-wellness');
        onClose();
      }
    },
    {
      id: 'tool-pomodoro',
      title: 'Pomodoro Productivity Clock',
      subtitle: '25m focus / 5m break live ticking countdown with browser tab status',
      category: 'Tools',
      icon: Clock,
      keywords: ['pomodoro', 'timer', 'focus', 'clock', 'countdown', 'productivity', 'deep work'],
      action: () => {
        setCurrentPage('productivity');
        onClose();
      }
    },
    {
      id: 'tool-soundscape',
      title: 'Ambient Synthesizer & Solfeggio Bowls',
      subtitle: 'Live Web Audio ocean pink noise, singing bowls & alpha binaural beats',
      category: 'Tools',
      icon: Headphones,
      keywords: ['sound', 'audio', 'music', 'ambient', 'binaural', 'synthesizer', 'noise', 'waves', 'ocean'],
      action: () => {
        setCurrentPage('podcasts');
        onClose();
      }
    },
    {
      id: 'tool-detox',
      title: '1-Click Digital Detox Zen Sanctuary',
      subtitle: 'Full-screen distraction-free offline mode with countdown timer',
      category: 'Tools',
      icon: Smartphone,
      keywords: ['detox', 'screen time', 'zen', 'offline', 'phone free', 'digital', 'sunset'],
      action: () => {
        setCurrentPage('digital-wellbeing');
        onClose();
      }
    },
    {
      id: 'tool-grounding',
      title: '5-4-3-2-1 Somatic Grounding Checklist',
      subtitle: 'Sensory vagus nerve regulation technique for cognitive overload',
      category: 'Tools',
      icon: Sparkles,
      keywords: ['grounding', 'somatic', 'checklist', 'vagus nerve', 'anxiety', 'panic', 'reset'],
      action: () => {
        setCurrentPage('mental-wellness');
        onClose();
      }
    },
    {
      id: 'tool-shutdown',
      title: '5:15 PM Work Shutdown Ritual',
      subtitle: 'Daily transitional cognitive sign-off routine to safeguard evenings',
      category: 'Tools',
      icon: Clock,
      keywords: ['shutdown', 'evening', 'work-life', 'boundary', 'ritual', 'evening routine'],
      action: () => {
        setCurrentPage('productivity');
        onClose();
      }
    },
    {
      id: 'tool-appreciation',
      title: 'Gratitude & Appreciation Card Generator',
      subtitle: 'Compose tactile appreciation notes for colleagues, partners & mentors',
      category: 'Tools',
      icon: Heart,
      keywords: ['gratitude', 'appreciation', 'card', 'relationship', 'partner', 'friend', 'note'],
      action: () => {
        setCurrentPage('relationships');
        onClose();
      }
    },
    {
      id: 'tool-audit-data',
      title: 'Work-Life Balance Audit & Data Backup',
      subtitle: 'Download complete balance report or export/import JSON state backup',
      category: 'Tools',
      icon: Award,
      keywords: ['audit', 'backup', 'export', 'import', 'json', 'report', 'settings', 'score'],
      action: () => {
        onClose();
        if (onOpenDataModal) onOpenDataModal();
      }
    },

    // Trackers
    {
      id: 'track-habits',
      title: 'Habit Routines & Streak Command Center',
      subtitle: 'Manage daily habits, streak shields, freeze items & mindfulness points',
      category: 'Trackers',
      icon: CheckCircle2,
      keywords: ['habit', 'streak', 'freeze', 'points', 'routine', 'daily'],
      action: () => {
        setCurrentPage('habit-tracker');
        onClose();
      }
    },
    {
      id: 'track-health',
      title: 'Health Vitals & 7-Day History',
      subtitle: 'Real computed averages for hydration glasses, sleep hours, steps & resting HR',
      category: 'Trackers',
      icon: Droplets,
      keywords: ['health', 'water', 'sleep', 'steps', 'heart rate', 'hydration', 'vitals', 'history'],
      action: () => {
        setCurrentPage('health-tracker');
        onClose();
      }
    },
    {
      id: 'track-mood',
      title: 'Mood Tracker & Emotional Weather',
      subtitle: 'Equilibrium score calculation, emotional tag distribution & reflections',
      category: 'Trackers',
      icon: Smile,
      keywords: ['mood', 'emotions', 'weather', 'equilibrium', 'mental health', 'feeling', 'log'],
      action: () => {
        setCurrentPage('mood-tracker');
        onClose();
      }
    },
    {
      id: 'track-goals',
      title: 'Milestone Goal Visualizer',
      subtitle: 'Track quarterly objectives with interactive milestones and completion analytics',
      category: 'Trackers',
      icon: Target,
      keywords: ['goal', 'milestones', 'roadmap', 'objectives', 'progress', 'target'],
      action: () => {
        setCurrentPage('goal-tracker');
        onClose();
      }
    },

    // 6 Core Lifestyle Pillars
    {
      id: 'pillar-mental',
      title: 'Mental Wellness Pillar',
      subtitle: 'Breathing exercises, stress regulation & cognitive restorative protocols',
      category: 'Pillars',
      icon: Brain,
      keywords: ['mental wellness', 'stress', 'mindfulness', 'neuroscience'],
      action: () => {
        setCurrentPage('mental-wellness');
        onClose();
      }
    },
    {
      id: 'pillar-physical',
      title: 'Physical Health Pillar',
      subtitle: 'Circadian biological rhythms, somatic vitality & whole-food kitchen sanctuary',
      category: 'Pillars',
      icon: Activity,
      keywords: ['physical health', 'vitality', 'movement', 'sleep', 'nutrition', 'kitchen'],
      action: () => {
        setCurrentPage('physical-health');
        onClose();
      }
    },
    {
      id: 'pillar-productivity',
      title: 'Time & Productivity Pillar',
      subtitle: 'Pomodoro timer, cognitive energy management & high-leverage boundaries',
      category: 'Pillars',
      icon: Clock,
      keywords: ['productivity', 'pomodoro', 'time', 'focus', 'deep work'],
      action: () => {
        setCurrentPage('productivity');
        onClose();
      }
    },
    {
      id: 'pillar-relationships',
      title: 'Relationships & Social Anchors',
      subtitle: 'Attuned active listening, family presence & appreciation card generator',
      category: 'Pillars',
      icon: Heart,
      keywords: ['relationships', 'family', 'friends', 'connection', 'listening', 'gratitude'],
      action: () => {
        setCurrentPage('relationships');
        onClose();
      }
    },
    {
      id: 'pillar-digital',
      title: 'Digital Well-being Pillar',
      subtitle: 'Screen time visualizer, 1-click digital detox & phone-free evening rituals',
      category: 'Pillars',
      icon: Smartphone,
      keywords: ['digital wellbeing', 'screen time', 'detox', 'social media', 'phone'],
      action: () => {
        setCurrentPage('digital-wellbeing');
        onClose();
      }
    },
    {
      id: 'pillar-growth',
      title: 'Personal Growth & Inquiry',
      subtitle: 'Non-screen hobby development & reflective inquiry journal notebook',
      category: 'Pillars',
      icon: Sparkles,
      keywords: ['personal growth', 'journal', 'reflection', 'hobbies', 'inquiry'],
      action: () => {
        setCurrentPage('personal-growth');
        onClose();
      }
    },

    // Explore & Media
    {
      id: 'explore-articles',
      title: 'Articles & Deep Essays',
      subtitle: 'Neuroscience-backed investigations into human cadence, rest & flow states',
      category: 'Explore',
      icon: BookOpen,
      keywords: ['articles', 'essays', 'reading', 'neuroscience', 'research', 'magazine'],
      action: () => {
        setCurrentPage('articles');
        onClose();
      }
    },
    {
      id: 'explore-podcasts',
      title: 'Audio Conversations & Soundscapes',
      subtitle: 'Masterclasses with researchers and real-time ambient synthesizer',
      category: 'Explore',
      icon: Headphones,
      keywords: ['podcasts', 'audio', 'interviews', 'soundscapes', 'episodes'],
      action: () => {
        setCurrentPage('podcasts');
        onClose();
      }
    },
    {
      id: 'explore-videos',
      title: 'Video Library & Movement Classes',
      subtitle: 'Desk reversal yoga, somatic release & cognitive ergonomic masterclasses',
      category: 'Explore',
      icon: Video,
      keywords: ['videos', 'masterclass', 'yoga', 'movement', 'ergonomics', 'stretches'],
      action: () => {
        setCurrentPage('videos');
        onClose();
      }
    },
    {
      id: 'explore-resources',
      title: 'Downloadable Blueprints & Checklists',
      subtitle: 'Printable worksheets for sleep hygiene, meal prep & boundary architecture',
      category: 'Explore',
      icon: FileText,
      keywords: ['resources', 'checklists', 'blueprints', 'pdf', 'downloads', 'templates'],
      action: () => {
        setCurrentPage('resources');
        onClose();
      }
    },
    {
      id: 'explore-stories',
      title: 'Transformation Stories & Member Victories',
      subtitle: 'Read real member case studies and share your personal balance journey',
      category: 'Explore',
      icon: Award,
      keywords: ['stories', 'success', 'case studies', 'transformation', 'testimonials'],
      action: () => {
        setCurrentPage('success-stories');
        onClose();
      }
    },

    // Community
    {
      id: 'comm-forum',
      title: 'The Balance Community Forum',
      subtitle: 'Real-time discussions, rituals sharing, comments & upvotes',
      category: 'Community',
      icon: Users,
      keywords: ['community', 'forum', 'discussions', 'posts', 'comments', 'chat'],
      action: () => {
        setCurrentPage('community');
        onClose();
      }
    },
    {
      id: 'comm-challenges',
      title: 'Community 30-Day Challenges',
      subtitle: 'Join cohort challenges for habits, digital sunsets & outdoor walking',
      category: 'Community',
      icon: Trophy,
      keywords: ['challenges', 'cohort', '30-day', 'streaks', 'group'],
      action: () => {
        setCurrentPage('challenges');
        onClose();
      }
    },
    {
      id: 'comm-events',
      title: 'Live Gatherings & Masterclass Webinars',
      subtitle: 'RSVP for upcoming virtual symposiums and outdoor nature meetups',
      category: 'Community',
      icon: Calendar,
      keywords: ['events', 'gatherings', 'webinars', 'workshops', 'rsvp'],
      action: () => {
        setCurrentPage('events');
        onClose();
      }
    },
    {
      id: 'comm-volunteer',
      title: 'Volunteer Service & Civic Engagement',
      subtitle: 'Altruistic community garden stewardship, historical walks & elder companionship',
      category: 'Community',
      icon: HandHeart,
      keywords: ['volunteer', 'service', 'civic', 'garden', 'elderly', 'stewardship'],
      action: () => {
        setCurrentPage('volunteer');
        onClose();
      }
    },

    // Company & Connect
    {
      id: 'comp-about',
      title: 'About Balance Compass',
      subtitle: 'Our founding mission, local privacy architecture & research principles',
      category: 'Company',
      icon: Info,
      keywords: ['about', 'mission', 'principles', 'team', 'ethics'],
      action: () => {
        setCurrentPage('about');
        onClose();
      }
    },
    {
      id: 'comp-contact',
      title: 'Contact Guidance Team & FAQs',
      subtitle: 'Get in touch for support, corporate symposiums or question inquiries',
      category: 'Company',
      icon: Mail,
      keywords: ['contact', 'support', 'help', 'email', 'faq', 'inquiries'],
      action: () => {
        setCurrentPage('contact');
        onClose();
      }
    }
  ];

  // Filtering
  const filteredItems = items.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    if (!matchesCat) return false;
    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const titleMatch = item.title.toLowerCase().includes(q);
    const subtitleMatch = item.subtitle.toLowerCase().includes(q);
    const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(q));
    return titleMatch || subtitleMatch || keywordMatch;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : Math.max(0, filteredItems.length - 1)));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Tools', 'Trackers', 'Pillars', 'Explore', 'Community'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full shadow-2xl z-10 border border-[#EAE6DF] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE6DF] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2E7D32] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search across all 22 hubs, tools, trackers, articles..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1A2E1A] placeholder-[#5A6B5A] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#5A6B5A] hover:text-[#1A2E1A] px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE6DF] flex items-center justify-center text-[#5A6B5A] hover:text-[#1A2E1A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#EAE6DF] flex items-center gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === cat
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-white text-[#5A6B5A] hover:text-[#1A2E1A] border border-[#EAE6DF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Search className="w-8 h-8 text-[#5A6B5A]/50 mx-auto" />
              <div className="text-sm font-semibold text-[#1A2E1A]">No matches found for "{query}"</div>
              <p className="text-xs text-[#5A6B5A]">Try searching for "breathing", "pomodoro", "water", "habits", or "challenges"</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#2E7D32] shadow-sm translate-x-1'
                      : 'bg-transparent border-transparent hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#2E7D32] text-white' : 'bg-white text-[#2E7D32] border border-[#EAE6DF]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1A2E1A] truncate">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE6DF] text-[#5A6B5A]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6B5A] truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-[#2E7D32] shrink-0 transition-transform ${
                      isSelected ? 'opacity-100 translate-x-0.5' : 'opacity-0'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-3 bg-white border-t border-[#EAE6DF] flex items-center justify-between text-[11px] text-[#5A6B5A]">
          <div className="flex items-center gap-3">
            <span>
              Use <kbd className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE6DF] font-mono">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE6DF] font-mono">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE6DF] font-mono">Enter</kbd> to select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE6DF] font-mono">Esc</kbd> to close
            </span>
          </div>
          <span className="hidden sm:inline font-semibold text-[#2E7D32]">Balance Compass Directory</span>
        </div>
      </div>
    </div>
  );
};
