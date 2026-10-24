import React, { useState, useEffect } from 'react';
import { SUCCESS_STORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { SuccessStory } from '../types';
import {
  Award,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  TrendingUp,
  Plus,
  Heart,
  X,
  Share2
} from 'lucide-react';

const USER_STORIES_KEY = 'balance_compass_user_stories_v1';

export const SuccessStoriesPage: React.FC = () => {
  const { setCurrentPage, showToast, incrementStreak } = useApp();

  // Load custom stories from localStorage
  const [userStories, setUserStories] = useState<SuccessStory[]>(() => {
    try {
      const saved = localStorage.getItem(USER_STORIES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Story likes tracking
  const [likedStories, setLikedStories] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('balance_compass_story_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [headline, setHeadline] = useState('');
  const [stat, setStat] = useState('');
  const [keyShift, setKeyShift] = useState('');
  const [storyNarrative, setStoryNarrative] = useState('');

  const handleLike = (storyId: string) => {
    setLikedStories(prev => {
      const nextLikes = { ...prev, [storyId]: (prev[storyId] || 0) + 1 };
      localStorage.setItem('balance_compass_story_likes', JSON.stringify(nextLikes));
      return nextLikes;
    });
    showToast('Appreciated this community transformation! ❤️');
  };

  const handleShareStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !headline.trim() || !storyNarrative.trim()) return;

    const newStory: SuccessStory = {
      id: `user-story-${Date.now()}`,
      name: authorName.trim(),
      role: authorRole.trim() || 'Mindful Member',
      location: authorLocation.trim() || 'Global Community',
      headline: headline.trim(),
      quote: storyNarrative.trim().slice(0, 140) + '...',
      story: storyNarrative.trim(),
      keyShift: keyShift.trim() || 'Cultivated intentional daily balance anchors',
      stat: stat.trim() || '+100% daily mindfulness presence',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.02_PM_8c255819.jpeg'
    };

    const updated = [newStory, ...userStories];
    setUserStories(updated);
    try {
      localStorage.setItem(USER_STORIES_KEY, JSON.stringify(updated));
    } catch (err) {
      // storage error
    }

    showToast('🎉 Your transformation story is now published to the community feed!');
    incrementStreak();
    setIsShareModalOpen(false);

    // Reset fields
    setAuthorName('');
    setAuthorRole('');
    setAuthorLocation('');
    setHeadline('');
    setStat('');
    setKeyShift('');
    setStoryNarrative('');
  };

  // Combine user stories and curated stories
  const allStories = [...userStories, ...SUCCESS_STORIES];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Real Transformation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
            Community Transformation Journeys
          </h1>
          <p className="text-base text-[#5A6B5A] max-w-2xl leading-relaxed">
            Read candid reflections from professionals, healthcare providers, and parents who restructured their boundaries and recovered vitality with Balance Compass.
          </p>
        </div>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="px-6 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg flex items-center gap-2 cursor-pointer self-start sm:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Share Your Story</span>
        </button>
      </div>

      {/* Stories List */}
      <div className="space-y-16">
        {allStories.map((story, idx) => {
          const isUserSubmitted = story.id.startsWith('user-story');
          const isReversed = idx % 2 === 1;
          const currentLikes = (likedStories[story.id] || 0) + (isUserSubmitted ? 1 : 24 + idx * 7);

          return (
            <div
              key={story.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border ${
                isUserSubmitted ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/20' : 'border-[#EAE6DF]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Photo */}
                <div className={`lg:col-span-5 relative min-h-[340px] lg:min-h-full ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isUserSubmitted && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#2E7D32] text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Member Community Post</span>
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-5 h-5 text-[#2E7D32] shrink-0" />
                      <span className="text-xs font-bold text-[#1A2E1A]">{story.stat}</span>
                    </div>
                    <button
                      onClick={() => handleLike(story.id)}
                      className="flex items-center gap-1 text-xs font-bold text-[#D97706] hover:text-[#B45309] px-2.5 py-1 bg-[#FFF4E5] rounded-full cursor-pointer transition-colors"
                      title="Cheer for this story"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#D97706]" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                      {story.location} · {story.role}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A] leading-tight">
                      {story.headline}
                    </h2>
                  </div>

                  <blockquote className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#2E7D32] text-sm sm:text-base italic text-[#1A2E1A] font-serif leading-relaxed">
                    "{story.quote}"
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                    {story.story}
                  </p>

                  <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#2E7D32]/20 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#1B5E20]">
                      <strong className="font-bold">Core Shift: </strong>
                      {story.keyShift}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs font-bold text-[#1A2E1A]">
                      Written by {story.name}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        showToast('Transformation story link copied to clipboard!');
                      }}
                      className="text-xs font-semibold text-[#5A6B5A] hover:text-[#2E7D32] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Story</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Bottom Banner */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#EAE6DF]">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1A2E1A]">
          Ready to Write Your Own Balance Transformation?
        </h3>
        <p className="text-sm text-[#5A6B5A] max-w-lg mx-auto">
          Start by establishing your daily habit anchors. Join our active 30-Day Healthy Habits Challenge or launch your daily routine tracker.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('habit-tracker')}
            className="px-8 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-bold rounded-full shadow-lg transition-all cursor-pointer"
          >
            Launch Your Daily Tracker
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-8 py-3.5 bg-white border border-[#EAE6DF] hover:border-[#2E7D32] text-[#1A2E1A] text-sm font-bold rounded-full shadow-sm transition-all cursor-pointer"
          >
            Share Your Journey
          </button>
        </div>
      </div>

      {/* SHARE YOUR TRANSFORMATION MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsShareModalOpen(false)}
            className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-[#5A6B5A] hover:text-[#1A2E1A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Member Reflection</span>
              <h3 className="text-2xl font-bold text-[#1A2E1A]">Share Your Transformation</h3>
              <p className="text-xs text-[#5A6B5A]">
                Inspire thousands of members who are striving to restore rhythm, boundaries, and peaceful presence.
              </p>
            </div>

            <form onSubmit={handleShareStorySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">Role / Vocation</label>
                  <input
                    type="text"
                    placeholder="e.g. Architect & Parent"
                    value={authorRole}
                    onChange={e => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">City / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Portland, OR"
                    value={authorLocation}
                    onChange={e => setAuthorLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">Key Victory Metric</label>
                  <input
                    type="text"
                    placeholder="e.g. -15hrs weekly screen time"
                    value={stat}
                    onChange={e => setStat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">Story Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Replacing Late-Night Email with Herbal Tea and Deep Rest"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">Single Highest-Impact Shift</label>
                <input
                  type="text"
                  placeholder="e.g. Leaving my work laptop docked in the home office by 5:15 PM"
                  value={keyShift}
                  onChange={e => setKeyShift(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2E1A] mb-1">Your Transformation Narrative</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What was your daily routine before, and what specific mindfulness habits or boundary rituals helped you reclaim mental peace?"
                  value={storyNarrative}
                  onChange={e => setStoryNarrative(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none focus:border-[#2E7D32] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-full shadow-md cursor-pointer transition-colors"
                >
                  Publish Transformation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
