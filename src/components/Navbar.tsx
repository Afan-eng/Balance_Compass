import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import {
  Compass,
  Menu,
  X,
  Flame,
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
  Search,
  Database
} from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { DataManagementModal } from './DataManagementModal';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    streakCount,
    streakFreezeAvailable,
    totalPoints,
    memberTier,
    setIsMembershipModalOpen,
    isNavDrawerOpen,
    setIsNavDrawerOpen,
    toastMessage
  } = useApp();

  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [userNameInput, setUserNameInput] = useState('');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  // Command Palette and Data Management Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live real-time clock ticker
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date());
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const navCategories: {
    category: string;
    items: { id: PageId; label: string; icon: any; desc?: string }[];
  }[] = [
    {
      category: 'WELL-BEING',
      items: [
        { id: 'mental-wellness', label: 'Mental Wellness', icon: Brain, desc: 'Breathing, stress reduction & mindfulness' },
        { id: 'physical-health', label: 'Physical Health', icon: Activity, desc: 'Movement, vitality, sleep & nutrition' },
        { id: 'productivity', label: 'Time & Productivity', icon: Clock, desc: 'Pomodoro timer, focus blocks & boundaries' },
        { id: 'relationships', label: 'Relationships', icon: Heart, desc: 'Family, friends & active listening' },
        { id: 'digital-wellbeing', label: 'Digital Well-being', icon: Smartphone, desc: 'Screen visualizer & 1-click detox' },
        { id: 'personal-growth', label: 'Personal Growth', icon: Sparkles, desc: 'Hobby planning & mindful journaling' }
      ]
    },
    {
      category: 'EXPLORE',
      items: [
        { id: 'articles', label: 'Articles & Essays', icon: BookOpen, desc: 'Insights on neuroscience & balance' },
        { id: 'podcasts', label: 'Audio & Podcasts', icon: Headphones, desc: 'Deep conversations with wellness leaders' },
        { id: 'videos', label: 'Video Library', icon: Video, desc: 'Ergonomics, yoga & guided practices' },
        { id: 'resources', label: 'Guides & Checklists', icon: FileText, desc: 'Printable templates & blueprints' },
        { id: 'success-stories', label: 'Success Stories', icon: Award, desc: 'Real member transformations' }
      ]
    },
    {
      category: 'COMMUNITY',
      items: [
        { id: 'community', label: 'Discussion Forum', icon: Users, desc: 'Share daily wins, advice & rituals' },
        { id: 'challenges', label: 'Active Challenges', icon: Trophy, desc: '30-day habits & digital detox sprints' },
        { id: 'events', label: 'Events & Workshops', icon: Calendar, desc: 'Interactive meetups & symposiums' },
        { id: 'volunteer', label: 'Volunteer Service', icon: HandHeart, desc: 'Community gardens, walks & elder care' }
      ]
    },
    {
      category: 'TOOLS & TRACKERS',
      items: [
        { id: 'health-tracker', label: 'Health Tracker', icon: Droplets, desc: 'Water hydration, sleep & steps' },
        { id: 'mood-tracker', label: 'Mood Tracker', icon: Smile, desc: 'Emotional reflections & 7-day patterns' },
        { id: 'habit-tracker', label: 'Habit Tracker', icon: CheckCircle2, desc: 'Daily interactive streaks & routines' },
        { id: 'goal-tracker', label: 'Goal Visualizer', icon: Target, desc: 'Milestone roadmaps & progress bars' }
      ]
    },
    {
      category: 'ABOUT & CONNECT',
      items: [
        { id: 'about', label: 'About Us', icon: Info, desc: 'Our mission, principles & research team' },
        { id: 'contact', label: 'Contact Us', icon: Mail, desc: 'Inquiries, support & partner reach-out' }
      ]
    }
  ];

  const handleJoinCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNameInput || !userEmailInput) return;
    setJoinedSuccess(true);
    setTimeout(() => {
      setJoinedSuccess(false);
      setCommunityModalOpen(false);
      setUserNameInput('');
      setUserEmailInput('');
      setCurrentPage('community');
    }, 1800);
  };

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-white border border-[#2E7D32]/20 shadow-xl shadow-black/10 rounded-2xl px-5 py-3.5 flex items-center gap-3 text-sm font-medium text-[#1A2E1A] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="flex-1">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE6DF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Wordmark & Icon */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shadow-md shadow-[#2E7D32]/20 group-hover:bg-[#1B5E20] transition-colors">
              <Compass className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#1A2E1A] block font-sans">
                Balance Compass
              </span>
              <span className="text-xs text-[#5A6B5A] tracking-wider uppercase font-semibold hidden sm:block">
                Mindfulness & Harmony
              </span>
            </div>
          </button>

          {/* Quick Nav Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A6B5A]">
            <button
              onClick={() => setCurrentPage('home')}
              className={`hover:text-[#2E7D32] transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-[#2E7D32] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('mental-wellness')}
              className={`hover:text-[#2E7D32] transition-colors cursor-pointer ${
                currentPage.includes('wellness') || currentPage.includes('health') || currentPage.includes('productivity')
                  ? 'text-[#2E7D32] font-semibold'
                  : ''
              }`}
            >
              Pillars
            </button>
            <button
              onClick={() => setCurrentPage('habit-tracker')}
              className={`hover:text-[#2E7D32] transition-colors cursor-pointer ${
                currentPage.includes('tracker') ? 'text-[#2E7D32] font-semibold' : ''
              }`}
            >
              Trackers
            </button>
            <button
              onClick={() => setCurrentPage('community')}
              className={`hover:text-[#2E7D32] transition-colors cursor-pointer ${
                currentPage === 'community' || currentPage === 'challenges' ? 'text-[#2E7D32] font-semibold' : ''
              }`}
            >
              Community
            </button>
            <button
              onClick={() => setCurrentPage('articles')}
              className={`hover:text-[#2E7D32] transition-colors cursor-pointer ${
                currentPage === 'articles' || currentPage === 'resources' ? 'text-[#2E7D32] font-semibold' : ''
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`hover:text-[#2E7D32] transition-colors cursor-pointer ${
                currentPage === 'about' ? 'text-[#2E7D32] font-semibold' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Zone: Search + Clock + Streak Badge + Freeze + Points + Membership CTA + Menu Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Spotlight Search Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              title="Quick Search (⌘K)"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE6DF] hover:border-[#2E7D32] rounded-full text-xs font-semibold text-[#5A6B5A] hover:text-[#1A2E1A] shadow-2xs transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#FAF8F5] border border-[#EAE6DF] rounded text-[10px] text-[#5A6B5A] font-mono leading-none">⌘K</kbd>
            </button>

            {/* Work-Life Balance Audit & Data Backup Trigger */}
            <button
              onClick={() => setIsDataModalOpen(true)}
              title="Work-Life Balance Audit & Local Data Backup"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-white border border-[#EAE6DF] hover:border-[#2E7D32] rounded-full text-xs font-semibold text-[#5A6B5A] hover:text-[#2E7D32] shadow-2xs transition-all cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Audit</span>
            </button>

            {/* Live Real-Time Clock */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE6DF] rounded-full text-xs font-mono font-semibold text-[#1A2E1A] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
              <span>{currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>

            {/* Streak Counter Badge */}
            <button
              onClick={() => setCurrentPage('habit-tracker')}
              title="Daily Balance Streak"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF4E5] border border-[#FFD8A8] text-[#B45309] rounded-full text-xs font-bold shadow-xs hover:bg-[#FFE8CC] transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
              <span>{streakCount}d Streak</span>
            </button>

            {/* Streak Freeze Shield Badge */}
            <button
              onClick={() => setCurrentPage('habit-tracker')}
              title={streakFreezeAvailable ? 'Streak Freeze Shield is Active!' : 'Get a Streak Freeze Shield'}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                streakFreezeAvailable
                  ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7]'
                  : 'bg-[#FAF8F5] border-[#EAE6DF] text-[#5A6B5A] hover:text-[#0284C7]'
              }`}
            >
              <span>❄️</span>
              <span className="hidden md:inline">{streakFreezeAvailable ? 'Freeze Active' : 'No Freeze'}</span>
            </button>

            {/* Mindfulness Points */}
            <button
              onClick={() => setCurrentPage('habit-tracker')}
              title="Total Mindfulness Points Earned"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF8F5] border border-[#EAE6DF] text-[#1A2E1A] rounded-full text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>{totalPoints} pts</span>
            </button>

            {/* Join Community / Upgrade Button */}
            <button
              onClick={() => setIsMembershipModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-[#2E7D32]/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{memberTier === 'Free Explorer' ? 'Join Community' : memberTier}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsNavDrawerOpen(true)}
              aria-label="Open Navigation Directory"
              className="w-10 h-10 rounded-full bg-white border border-[#EAE6DF] hover:border-[#2E7D32] text-[#1A2E1A] flex items-center justify-center shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Menu className="w-5 h-5 text-[#2E7D32]" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Full Application Directory Navigation Drawer */}
      {isNavDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsNavDrawerOpen(false)}
            className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over Panel */}
          <div className="relative w-full max-w-xl bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-5 border-b border-[#EAE6DF] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A2E1A]">Balance Compass Directory</h3>
                  <p className="text-xs text-[#5A6B5A]">Explore all 22 lifestyle & wellness hubs</p>
                </div>
              </div>
              <button
                onClick={() => setIsNavDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#EAE6DF] hover:bg-[#EAE6DF] flex items-center justify-center text-[#5A6B5A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search in Drawer */}
            <div className="px-6 pt-4 pb-1">
              <button
                onClick={() => {
                  setIsNavDrawerOpen(false);
                  setIsCommandPaletteOpen(true);
                }}
                className="w-full px-4 py-2.5 bg-white border border-[#EAE6DF] hover:border-[#2E7D32] rounded-2xl flex items-center justify-between text-xs text-[#5A6B5A] shadow-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#2E7D32]" />
                  <span className="group-hover:text-[#1A2E1A]">Quick Search across all 22 hubs...</span>
                </div>
                <kbd className="px-1.5 py-0.5 bg-[#FAF8F5] border border-[#EAE6DF] rounded text-[10px] font-mono">⌘K</kbd>
              </button>
            </div>

            {/* Drawer Body - Categorized Lists */}
            <div className="p-6 space-y-8 flex-1">
              {navCategories.map((group, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="text-xs font-bold tracking-wider text-[#5A6B5A] uppercase px-1">
                    {group.category}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.items.map(item => {
                      const IconComponent = item.icon;
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setCurrentPage(item.id)}
                          className={`flex items-start gap-3 p-3 text-left rounded-xl transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20] shadow-xs font-semibold'
                              : 'bg-white border-[#EAE6DF] hover:border-[#2E7D32]/50 hover:bg-[#FAF8F5] text-[#1A2E1A]'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              isActive ? 'bg-[#2E7D32] text-white' : 'bg-[#FAF8F5] text-[#2E7D32]'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-tight">{item.label}</div>
                            {item.desc && (
                              <div className="text-[11px] text-[#5A6B5A] line-clamp-1 mt-0.5">
                                {item.desc}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-6 bg-white border-t border-[#EAE6DF] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#5A6B5A]">
                <span>Logged in as Member</span>
                <span className="font-semibold text-[#2E7D32]">🔥 {streakCount} Days Active</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNavDrawerOpen(false);
                    setIsDataModalOpen(true);
                  }}
                  className="flex-1 py-2.5 rounded-full border border-[#EAE6DF] hover:border-[#2E7D32] text-xs font-bold text-[#1A2E1A] flex items-center justify-center gap-1.5 cursor-pointer bg-[#FAF8F5] transition-colors"
                >
                  <Database className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Audit & Backup</span>
                </button>
                <button
                  onClick={() => {
                    setIsNavDrawerOpen(false);
                    setCommunityModalOpen(true);
                  }}
                  className="flex-1 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold rounded-full shadow-md text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Join Community</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Community Modal */}
      {communityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setCommunityModalOpen(false)}
            className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF]">
            <button
              onClick={() => setCommunityModalOpen(false)}
              className="absolute top-4 right-4 text-[#5A6B5A] hover:text-[#1A2E1A]"
            >
              <X className="w-5 h-5" />
            </button>

            {joinedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2E1A]">Welcome to Balance Compass!</h3>
                <p className="text-sm text-[#5A6B5A]">
                  Your free community pass is activated. Enjoy instant access to daily challenges, forum discussions, and mindful habit streaks.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1.5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center mb-2">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A2E1A]">Join the Community</h3>
                  <p className="text-xs text-[#5A6B5A]">
                    Connect with 45,000+ mindful professionals building sustainable rhythms of work and life.
                  </p>
                </div>

                <form onSubmit={handleJoinCommunitySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={userNameInput}
                      onChange={e => setUserNameInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={userEmailInput}
                      onChange={e => setUserEmailInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 text-sm outline-none"
                    />
                  </div>

                  <div className="text-[11px] text-[#5A6B5A] leading-relaxed">
                    By joining, you agree to our respectful community pledge. Free forever; zero spam.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold rounded-full shadow-md text-sm transition-colors cursor-pointer"
                  >
                    Activate Free Membership
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Spotlight Search & Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
      />

      {/* Work-Life Balance Audit & Data Backup Modal */}
      <DataManagementModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
      />
    </>
  );
};
