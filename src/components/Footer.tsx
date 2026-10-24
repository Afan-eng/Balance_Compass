import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    showToast('Subscribed to Balance Compass weekly digests!');
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 2500);
  };

  return (
    <footer className="bg-[#1A2E1A] text-white pt-16 pb-12 mt-20 border-t border-[#2E7D32]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Balance Compass
              </span>
            </div>
            <p className="text-sm text-[#A9B896] max-w-sm leading-relaxed">
              Helping modern individuals, families, and teams build healthier, happier, and sustainable balanced lives. Productivity meets mindfulness.
            </p>
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email for weekly insights..."
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-full text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#2E7D32] flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded-full transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Joined</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Pillars Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Pillars</h4>
            <ul className="space-y-2 text-xs text-[#A9B896]">
              <li>
                <button onClick={() => setCurrentPage('mental-wellness')} className="hover:text-white transition-colors cursor-pointer">
                  Mental Wellness & Breath
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('physical-health')} className="hover:text-white transition-colors cursor-pointer">
                  Physical Health & Movement
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('productivity')} className="hover:text-white transition-colors cursor-pointer">
                  Time & Pomodoro Focus
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('relationships')} className="hover:text-white transition-colors cursor-pointer">
                  Relationships & Slow Play
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('digital-wellbeing')} className="hover:text-white transition-colors cursor-pointer">
                  Digital Well-being Detox
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('personal-growth')} className="hover:text-white transition-colors cursor-pointer">
                  Personal Growth & Hobbies
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Interactive Tools</h4>
            <ul className="space-y-2 text-xs text-[#A9B896]">
              <li>
                <button onClick={() => setCurrentPage('habit-tracker')} className="hover:text-white transition-colors cursor-pointer">
                  Daily Habit Streaks
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('health-tracker')} className="hover:text-white transition-colors cursor-pointer">
                  Hydration & Sleep Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('mood-tracker')} className="hover:text-white transition-colors cursor-pointer">
                  Daily Mood Logger
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('goal-tracker')} className="hover:text-white transition-colors cursor-pointer">
                  Goal Milestone Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('challenges')} className="hover:text-white transition-colors cursor-pointer">
                  30-Day Healthy Habits
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('resources')} className="hover:text-white transition-colors cursor-pointer">
                  Free Downloadable Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Community & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Community & Team</h4>
            <ul className="space-y-2 text-xs text-[#A9B896]">
              <li>
                <button onClick={() => setCurrentPage('community')} className="hover:text-white transition-colors cursor-pointer">
                  Live Discussion Forum
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('events')} className="hover:text-white transition-colors cursor-pointer">
                  Upcoming Workshops
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('volunteer')} className="hover:text-white transition-colors cursor-pointer">
                  Volunteer Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('success-stories')} className="hover:text-white transition-colors cursor-pointer">
                  Member Stories
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9B896] gap-4">
          <div className="flex items-center gap-1">
            <span>Crafted with intentionality &</span>
            <Heart className="w-3.5 h-3.5 text-[#2E7D32] fill-[#2E7D32]" />
            <span>for a more balanced human experience.</span>
          </div>
          <div>
            © {new Date().getFullYear()} Balance Compass. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
