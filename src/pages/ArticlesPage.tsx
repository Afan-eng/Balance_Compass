import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data/mockData';
import { filterItems } from '../utils/streakCalculator';
import {
  BookOpen,
  Search,
  Bookmark,
  Clock,
  ArrowRight,
  X,
  Share2,
  CheckCircle2
} from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const { showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const categories = ['All', 'Mental Health', 'Fitness', 'Productivity', 'Relationships', 'Digital Well-being'];

  const filteredArticles = filterItems(
    ARTICLES_DATA,
    searchQuery,
    selectedCategory === 'All' ? '' : selectedCategory
  );

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Article removed from reading list.');
        return prev.filter(b => b !== id);
      } else {
        showToast('Article saved to your personal reading list.');
        return [...prev, id];
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Digital Journal & Magazine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Essays on Balance, Neuroscience & Rest
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Deep, thoughtful investigations into human work patterns, cognitive restoration, and intentional living.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6B5A]" />
          <input
            type="text"
            placeholder="Search articles, topics, authors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] text-xs sm:text-sm focus:outline-none focus:border-[#2E7D32]"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A6B5A] hover:text-[#1A2E1A] border border-[#EAE6DF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map(article => {
          const isBookmarked = bookmarks.includes(article.id);
          return (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EAE6DF] hover:border-[#2E7D32] shadow-xl shadow-black/5 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#2E7D32] shadow-xs">
                    {article.category}
                  </div>
                  <button
                    onClick={e => toggleBookmark(article.id, e)}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      isBookmarked ? 'bg-[#2E7D32] text-white' : 'bg-white/80 text-[#5A6B5A] hover:bg-white hover:text-[#1A2E1A]'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#5A6B5A]">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A2E1A] group-hover:text-[#2E7D32] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#5A6B5A] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#EAE6DF] pt-4 text-xs">
                <span className="text-[#5A6B5A] font-medium">{article.author.split(',')[0]}</span>
                <span className="font-bold text-[#2E7D32] flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 bg-[#1A2E1A]/50 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl z-10 border border-[#EAE6DF] space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] border border-[#EAE6DF] hover:bg-[#EAE6DF] text-[#5A6B5A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase">
                <span>{activeArticle.category}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A] leading-tight">
                {activeArticle.title}
              </h2>
              <div className="text-xs text-[#5A6B5A]">
                By <strong className="text-[#1A2E1A]">{activeArticle.author}</strong> · Published {activeArticle.date}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-72">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#1A2E1A] leading-relaxed font-serif">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#EAE6DF] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {activeArticle.tags.map(t => (
                  <span key={t} className="px-3 py-1 bg-[#FAF8F5] text-[11px] font-semibold text-[#5A6B5A] rounded-full border border-[#EAE6DF]">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Article link copied to clipboard!');
                }}
                className="px-4 py-2 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#C8E6C9] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
