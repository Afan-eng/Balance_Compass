export type PageId =
  | 'home'
  | 'mental-wellness'
  | 'physical-health'
  | 'productivity'
  | 'relationships'
  | 'digital-wellbeing'
  | 'personal-growth'
  | 'articles'
  | 'podcasts'
  | 'videos'
  | 'events'
  | 'community'
  | 'challenges'
  | 'volunteer'
  | 'success-stories'
  | 'resources'
  | 'health-tracker'
  | 'mood-tracker'
  | 'habit-tracker'
  | 'goal-tracker'
  | 'about'
  | 'contact';

export interface StreakState {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // "YYYY-MM-DD"
  streakFreezeAvailable: boolean;
  totalPoints: number;
  completedToday: boolean;
  activityLog: Record<string, string[]>; // e.g. "2026-10-24": ["water_goal", "meditation_10m"]
}

export interface HabitItem {
  id: string;
  name: string;
  category: 'mindfulness' | 'body' | 'focus' | 'rest' | 'custom';
  completed: boolean;
  streak: number;
}

export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'stressed';

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  tags: string[];
  note: string;
  timestamp: number;
}

export interface GoalItem {
  id: string;
  title: string;
  category: 'health' | 'work' | 'personal';
  targetDate: string;
  progress: number; // 0 to 100
  milestones: { id: string; text: string; done: boolean }[];
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  likedByUser?: boolean;
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  category: 'Mental Health' | 'Fitness' | 'Productivity' | 'Relationships' | 'Digital Well-being';
  readTime: string;
  date: string;
  image: string;
  summary: string;
  content: string[];
  author: string;
  tags: string[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  guest: string;
  description: string;
  category: string;
  audioUrl?: string;
  published: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  instructor: string;
  thumbnail: string;
  description: string;
  embedId: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Workshop' | 'Meetup' | 'Webinar' | 'Retreat';
  attendees: number;
  image: string;
  description: string;
  host: string;
  isJoined?: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  duration: string;
  participants: number;
  category: string;
  description: string;
  image: string;
  dailyPrompt: string;
  joined: boolean;
  currentDay: number;
  totalDays: number;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  location: string;
  organization: string;
  date: string;
  spotsLeft: number;
  description: string;
  image: string;
  requirements: string[];
  impactArea: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  headline: string;
  quote: string;
  story: string;
  keyShift: string;
  stat: string;
}

export interface ResourceGuide {
  id: string;
  title: string;
  category: 'Checklist' | 'Guide' | 'Planner' | 'Infographic';
  format: string;
  pages: string;
  downloads: number;
  description: string;
  highlights: string[];
}

export interface HealthRecord {
  id: string;
  date: string;
  dayName: string;
  water: number;
  sleep: number;
  steps: number;
  restingHr: number;
}

