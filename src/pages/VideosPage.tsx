import React, { useState } from 'react';
import { VideoItem } from '../types';
import { VIDEOS_DATA } from '../data/mockData';
import {
  Video,
  Play,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VideosPage: React.FC = () => {
  const { showToast, incrementStreak } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const categories = ['All', 'Physical Health', 'Mental Wellness', 'Fitness', 'Personal Growth'];

  const filteredVideos = VIDEOS_DATA.filter(
    v => selectedCategory === 'All' || v.category === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Video className="w-4 h-4" />
          <span>Cinematic Masterclasses</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Visual Practices, Yoga Flows & Ergonomics
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Follow along with certified movement practitioners, breath specialists, and cognitive ergonomic coaches.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'bg-white text-[#5A6B5A] hover:text-[#1A2E1A] border border-[#EAE6DF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF] hover:border-[#2E7D32] transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-60 overflow-hidden relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-[#2E7D32] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#2E7D32]">
                  {video.category}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="text-xs font-semibold text-[#5A6B5A]">
                  Instructor: <span className="text-[#1A2E1A] font-bold">{video.instructor}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A2E1A] group-hover:text-[#2E7D32] transition-colors leading-snug">
                  {video.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#EAE6DF] pt-4 text-xs font-bold text-[#2E7D32]">
              <span>Watch Masterclass</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] space-y-6">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5] text-[#5A6B5A] hover:bg-[#EAE6DF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Canvas Simulation */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex flex-col items-center justify-center text-white">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-[#2E7D32] text-white flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                </div>
                <div className="text-lg font-bold">{activeVideo.title}</div>
                <div className="text-xs text-white/80">Guided by {activeVideo.instructor} · Full HD Stream</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#2E7D32] uppercase">{activeVideo.category}</span>
                  <h3 className="text-xl font-bold text-[#1A2E1A] mt-0.5">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => {
                    showToast('Masterclass marked completed! +1 to daily streak.');
                    incrementStreak();
                    setActiveVideo(null);
                  }}
                  className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-full cursor-pointer shadow-xs"
                >
                  Mark Session Completed
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
