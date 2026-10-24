import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  MessageSquare,
  Heart,
  Plus,
  Send,
  Sparkles,
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { forumPosts, addForumPost, toggleLikePost, addCommentToPost, streakCount } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [newPostModal, setNewPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Mindfulness');
  const [postContent, setPostContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Comment input state per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories = ['All', 'Mindfulness', 'Productivity', 'Relationships', 'Fitness', 'General'];

  const filteredPosts = forumPosts.filter(
    p => activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;
    addForumPost(postTitle, postCategory, postContent, authorName.trim() || 'You');
    setPostTitle('');
    setPostContent('');
    setAuthorName('');
    setNewPostModal(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addCommentToPost(postId, text.trim());
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Community Circle</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
            The Balance Forum
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            A sanctuary for authentic discussions, habit reflections, and mutual accountability.
          </p>
        </div>

        <button
          onClick={() => setNewPostModal(true)}
          className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'bg-white text-[#5A6B5A] hover:text-[#1A2E1A] border border-[#EAE6DF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-5"
          >
            {/* Author row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#EAE6DF]"
                />
                <div>
                  <div className="text-sm font-bold text-[#1A2E1A]">{post.author}</div>
                  <div className="text-[11px] text-[#5A6B5A]">{post.role} · {post.timestamp}</div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#1A2E1A]">{post.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Like & Comments actions */}
            <div className="pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
              <button
                onClick={() => toggleLikePost(post.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  post.likedByUser
                    ? 'bg-[#FEE2E2] text-[#DC2626]'
                    : 'bg-[#FAF8F5] text-[#5A6B5A] hover:text-[#DC2626]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.likedByUser ? 'fill-[#DC2626]' : ''}`} />
                <span>{post.likes} Helpful</span>
              </button>

              <div className="text-xs text-[#5A6B5A] flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.comments.length} Comments</span>
              </div>
            </div>

            {/* Comments Thread */}
            {post.comments.length > 0 && (
              <div className="space-y-2.5 pt-2 pl-4 border-l-2 border-[#E8F5E9]">
                {post.comments.map(c => (
                  <div key={c.id} className="p-3 bg-[#FAF8F5] rounded-xl text-xs space-y-1">
                    <div className="flex justify-between font-bold text-[#1A2E1A]">
                      <span>{c.author}</span>
                      <span className="text-[#5A6B5A] font-normal">{c.timestamp}</span>
                    </div>
                    <p className="text-[#5A6B5A]">{c.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Comment Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Share a thoughtful reply..."
                value={commentInputs[post.id] || ''}
                onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSendComment(post.id);
                }}
                className="flex-1 px-4 py-2 rounded-xl border border-[#EAE6DF] text-xs bg-[#FAF8F5] focus:outline-none focus:border-[#2E7D32]"
              />
              <button
                onClick={() => handleSendComment(post.id)}
                className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE POST MODAL */}
      {newPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setNewPostModal(false)} className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#1A2E1A]">Start a Discussion</h3>
              <button onClick={() => setNewPostModal(false)} className="text-[#5A6B5A] hover:text-[#1A2E1A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Julian Vance"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Topic Category</label>
                <select
                  value={postCategory}
                  onChange={e => setPostCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none bg-white font-medium"
                >
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Fitness">Fitness</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="What insight or question do you want to explore?"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Your Reflection / Story</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your experience, questions, or rituals..."
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPostModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
