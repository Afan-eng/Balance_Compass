import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PageId,
  StreakState,
  HabitItem,
  MoodEntry,
  GoalItem,
  ForumPost,
  CommunityEvent,
  ChallengeItem,
  HealthRecord
} from '../types';
import {
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_FORUM_POSTS,
  EVENTS_DATA,
  CHALLENGES_DATA
} from '../data/mockData';
import {
  INITIAL_STREAK_STATE,
  evaluateStreakState,
  recordActivityInStreak,
  purchaseOrEquipFreeze
} from '../utils/streakCalculator';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;

  // Streak & Points System (Specification Compliant)
  streakState: StreakState;
  streakCount: number;
  bestStreak: number;
  streakFreezeAvailable: boolean;
  totalPoints: number;
  completedToday: boolean;
  activityLog: Record<string, string[]>;
  recordActivity: (activityId: string, points?: number) => void;
  equipStreakFreeze: (cost?: number) => { success: boolean; message: string };
  incrementStreak: () => void;
  lastActiveDate: string;

  // Habits
  habits: HabitItem[];
  toggleHabit: (id: string) => void;
  addHabit: (name: string, category: HabitItem['category']) => void;

  // Focus & Productivity Timer
  totalFocusMinutes: number;
  addFocusMinutes: (minutes: number) => void;

  // Health Metrics & History
  waterGlasses: number;
  waterGoal: number;
  setWaterGlasses: React.Dispatch<React.SetStateAction<number>>;
  incrementWater: () => void;
  decrementWater: () => void;
  sleepHours: number;
  setSleepHours: (hours: number) => void;
  stepCount: number;
  setStepCount: (steps: number) => void;
  restingHr: number;
  setRestingHr: (hr: number) => void;
  healthHistory: HealthRecord[];
  saveHealthHistoryDay: (record: HealthRecord) => void;

  // Mood
  moodEntries: MoodEntry[];
  logMood: (mood: MoodEntry['mood'], tags: string[], note: string) => void;
  deleteMoodEntry: (id: string) => void;

  // Goals
  goals: GoalItem[];
  updateGoalProgress: (id: string, progress: number) => void;
  toggleGoalMilestone: (goalId: string, milestoneId: string) => void;
  addGoal: (title: string, category: GoalItem['category'], targetDate: string) => void;
  deleteGoal: (id: string) => void;

  // Forum
  forumPosts: ForumPost[];
  addForumPost: (title: string, category: string, content: string, authorName?: string) => void;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, content: string, authorName?: string) => void;

  // Events & Challenges
  events: CommunityEvent[];
  toggleJoinEvent: (eventId: string) => void;
  challenges: ChallengeItem[];
  toggleJoinChallenge: (challengeId: string) => void;

  // Membership & Payments (Razorpay modal)
  isMembershipModalOpen: boolean;
  setIsMembershipModalOpen: (open: boolean) => void;
  memberTier: 'Free Explorer' | 'Supporter' | 'Patron' | 'Lifetime';
  setMemberTier: (tier: 'Free Explorer' | 'Supporter' | 'Patron' | 'Lifetime') => void;

  // Global Navigation & Feedback
  isNavDrawerOpen: boolean;
  setIsNavDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STREAK_KEY = 'balance_compass_streak_state_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPageRaw] = useState<PageId>('home');
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [memberTier, setMemberTier] = useState<'Free Explorer' | 'Supporter' | 'Patron' | 'Lifetime'>(() => {
    return (localStorage.getItem('balance_compass_member_tier') as any) || 'Free Explorer';
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const setCurrentPage = (page: PageId) => {
    setCurrentPageRaw(page);
    setIsNavDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Streak State with Calendar Verification
  const [streakState, setStreakState] = useState<StreakState>(() => {
    const saved = localStorage.getItem(STREAK_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_STREAK_STATE;
  });

  const getTodayStr = () => new Date().toISOString().split('T')[0];

  // Daily calendar evaluation
  useEffect(() => {
    const today = getTodayStr();
    const { updatedState, freezeConsumed, streakReset } = evaluateStreakState(streakState, today);
    if (freezeConsumed) {
      showToast('❄️ Streak Freeze activated yesterday! Your streak was preserved.');
    } else if (streakReset) {
      showToast('⚠️ A day was missed. Starting fresh streak today!');
    }
    setStreakState(updatedState);
    localStorage.setItem(STREAK_KEY, JSON.stringify(updatedState));
  }, []);

  const saveStreakState = (newState: StreakState) => {
    setStreakState(newState);
    localStorage.setItem(STREAK_KEY, JSON.stringify(newState));
  };

  const recordActivity = useCallback(
    (activityId: string, pointsAwarded: number = 20) => {
      const today = getTodayStr();
      const { updatedState, pointsAdded, milestoneBonus, streakIncremented } = recordActivityInStreak(
        streakState,
        activityId,
        today,
        pointsAwarded
      );
      saveStreakState(updatedState);

      if (milestoneBonus > 0) {
        showToast(`🎉 Milestone reached! +${pointsAdded} points (including +${milestoneBonus} bonus)!`);
      } else if (streakIncremented) {
        showToast(`🔥 Streak extended to ${updatedState.currentStreak} days! (+${pointsAdded} pts)`);
      } else {
        showToast(`Activity recorded! (+${pointsAdded} pts)`);
      }
    },
    [streakState]
  );

  const equipStreakFreeze = useCallback(
    (costPoints: number = 150): { success: boolean; message: string } => {
      const result = purchaseOrEquipFreeze(streakState, costPoints);
      if (result.success) {
        saveStreakState(result.updatedState);
        showToast(result.message);
      } else {
        showToast(result.message);
      }
      return { success: result.success, message: result.message };
    },
    [streakState]
  );

  const incrementStreak = useCallback(() => {
    recordActivity('manual_checkin', 25);
  }, [recordActivity]);

  // Habits
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('balance_compass_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_habits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === id) {
          const nextCompleted = !h.completed;
          if (nextCompleted) {
            recordActivity(`habit_${h.id}`, 25);
          }
          return {
            ...h,
            completed: nextCompleted,
            streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      })
    );
  };

  const addHabit = (name: string, category: HabitItem['category']) => {
    const newH: HabitItem = {
      id: 'h-' + Date.now(),
      name,
      category,
      completed: false,
      streak: 0
    };
    setHabits(prev => [...prev, newH]);
    recordActivity('created_custom_habit', 15);
  };

  // Focus & Productivity Timer
  const [totalFocusMinutes, setTotalFocusMinutes] = useState<number>(() => {
    const saved = localStorage.getItem('balance_compass_focus_minutes');
    return saved ? parseInt(saved, 10) : 125;
  });

  const addFocusMinutes = useCallback((minutes: number) => {
    setTotalFocusMinutes(prev => {
      const next = prev + minutes;
      localStorage.setItem('balance_compass_focus_minutes', next.toString());
      return next;
    });
    recordActivity('completed_pomodoro_focus', Math.max(20, Math.round(minutes * 1.5)));
  }, [recordActivity]);

  // Health Metrics & History
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    const saved = localStorage.getItem('balance_compass_water');
    return saved ? parseInt(saved, 10) : 6;
  });
  const waterGoal = 8;

  useEffect(() => {
    localStorage.setItem('balance_compass_water', waterGlasses.toString());
  }, [waterGlasses]);

  const incrementWater = () => {
    setWaterGlasses(prev => {
      const next = prev + 1;
      if (next === waterGoal) {
        recordActivity('hydration_target_met', 30);
      } else {
        recordActivity('logged_water_glass', 5);
      }
      return next;
    });
  };

  const decrementWater = () => {
    setWaterGlasses(prev => Math.max(0, prev - 1));
  };

  const [sleepHours, setSleepHoursRaw] = useState<number>(() => {
    const saved = localStorage.getItem('balance_compass_sleep');
    return saved ? parseFloat(saved) : 7.5;
  });
  const setSleepHours = (hours: number) => {
    setSleepHoursRaw(hours);
    localStorage.setItem('balance_compass_sleep', hours.toString());
    recordActivity('logged_sleep_hours', 15);
  };

  const [stepCount, setStepCountRaw] = useState<number>(() => {
    const saved = localStorage.getItem('balance_compass_steps');
    return saved ? parseInt(saved, 10) : 8420;
  });
  const setStepCount = (steps: number) => {
    setStepCountRaw(steps);
    localStorage.setItem('balance_compass_steps', steps.toString());
    recordActivity('logged_daily_steps', 20);
  };

  const [restingHr, setRestingHrRaw] = useState<number>(() => {
    const saved = localStorage.getItem('balance_compass_resting_hr');
    return saved ? parseInt(saved, 10) : 62;
  });
  const setRestingHr = (hr: number) => {
    setRestingHrRaw(hr);
    localStorage.setItem('balance_compass_resting_hr', hr.toString());
  };

  // 7-day health history with actual storage and dynamic updates
  const [healthHistory, setHealthHistory] = useState<HealthRecord[]>(() => {
    const saved = localStorage.getItem('balance_compass_health_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { id: 'h-1', date: 'Oct 18', dayName: 'Mon', water: 8, sleep: 7.5, steps: 9400, restingHr: 62 },
      { id: 'h-2', date: 'Oct 19', dayName: 'Tue', water: 7, sleep: 8.0, steps: 8100, restingHr: 64 },
      { id: 'h-3', date: 'Oct 20', dayName: 'Wed', water: 8, sleep: 7.0, steps: 10200, restingHr: 61 },
      { id: 'h-4', date: 'Oct 21', dayName: 'Thu', water: 6, sleep: 6.5, steps: 7800, restingHr: 66 },
      { id: 'h-5', date: 'Oct 22', dayName: 'Fri', water: 8, sleep: 7.5, steps: 9100, restingHr: 63 },
      { id: 'h-6', date: 'Oct 23', dayName: 'Sat', water: 9, sleep: 8.5, steps: 11400, restingHr: 60 },
      { id: 'h-7', date: 'Oct 24', dayName: 'Today', water: 6, sleep: 7.5, steps: 8420, restingHr: 62 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_health_history', JSON.stringify(healthHistory));
  }, [healthHistory]);

  const saveHealthHistoryDay = (record: HealthRecord) => {
    setHealthHistory(prev => {
      const idx = prev.findIndex(item => item.dayName === 'Today' || item.date === record.date);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = record;
        return copy;
      }
      return [...prev.slice(1), record];
    });
    recordActivity('saved_daily_vitals', 35);
  };

  // Mood Entries
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('balance_compass_moods');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'm-1',
        date: 'Oct 23',
        mood: 'great',
        tags: ['Grounded', 'Calm', 'Outdoor Run'],
        note: 'Felt very energized after outdoor movement and good sleep.',
        timestamp: Date.now() - 86400000
      },
      {
        id: 'm-2',
        date: 'Oct 22',
        mood: 'good',
        tags: ['Deep Focus', 'Productive'],
        note: 'Completed 3 Pomodoros without checking email.',
        timestamp: Date.now() - 172800000
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_moods', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const logMood = (mood: MoodEntry['mood'], tags: string[], note: string) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const newEntry: MoodEntry = {
      id: 'mood-' + Date.now(),
      date: today,
      mood,
      tags,
      note,
      timestamp: Date.now()
    };
    setMoodEntries(prev => [newEntry, ...prev]);
    recordActivity(`logged_mood_${mood}`, 25);
  };

  const deleteMoodEntry = (id: string) => {
    setMoodEntries(prev => prev.filter(m => m.id !== id));
  };

  // Goals
  const [goals, setGoals] = useState<GoalItem[]>(() => {
    const saved = localStorage.getItem('balance_compass_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_goals', JSON.stringify(goals));
  }, [goals]);

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, progress } : g)));
    recordActivity('updated_goal_progress', 10);
  };

  const toggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id !== goalId) return g;
        const updatedMilestones = g.milestones.map(m =>
          m.id === milestoneId ? { ...m, done: !m.done } : m
        );
        const doneCount = updatedMilestones.filter(m => m.done).length;
        const calculatedProgress = Math.round((doneCount / updatedMilestones.length) * 100);
        return {
          ...g,
          milestones: updatedMilestones,
          progress: calculatedProgress
        };
      })
    );
    recordActivity('completed_milestone', 25);
  };

  const addGoal = (title: string, category: GoalItem['category'], targetDate: string) => {
    const newG: GoalItem = {
      id: 'goal-' + Date.now(),
      title,
      category,
      targetDate: targetDate || 'Dec 31, 2026',
      progress: 0,
      milestones: [
        { id: 'm-' + Date.now() + '-1', text: 'Step 1: Set up dedicated daily time buffer', done: false },
        { id: 'm-' + Date.now() + '-2', text: 'Step 2: Track first 7 consecutive days', done: false }
      ]
    };
    setGoals(prev => [newG, ...prev]);
    recordActivity('created_goal', 20);
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Forum Posts
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('balance_compass_forum');
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('balance_compass_forum', JSON.stringify(forumPosts));
  }, [forumPosts]);

  const addForumPost = (title: string, category: string, content: string, authorName = 'You') => {
    const newPost: ForumPost = {
      id: 'post-' + Date.now(),
      author: authorName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: `Member · ${streakState.currentStreak} Day Streak`,
      category,
      title,
      content,
      timestamp: 'Just now',
      likes: 0,
      likedByUser: false,
      comments: []
    };
    setForumPosts(prev => [newPost, ...prev]);
    recordActivity('published_forum_post', 35);
  };

  const toggleLikePost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const wasLiked = p.likedByUser;
          return {
            ...p,
            likedByUser: !wasLiked,
            likes: wasLiked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId: string, content: string, authorName = 'You') => {
    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: 'comm-' + Date.now(),
                author: authorName,
                content,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return p;
      })
    );
    recordActivity('commented_on_forum', 15);
  };

  // Events & Challenges
  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('balance_compass_events');
    return saved ? JSON.parse(saved) : EVENTS_DATA;
  });

  const toggleJoinEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === eventId) {
          const nextJoined = !e.isJoined;
          if (nextJoined) {
            recordActivity('rsvpd_event', 30);
          }
          return {
            ...e,
            isJoined: nextJoined,
            attendees: nextJoined ? e.attendees + 1 : e.attendees - 1
          };
        }
        return e;
      })
    );
  };

  const [challenges, setChallenges] = useState<ChallengeItem[]>(() => {
    const saved = localStorage.getItem('balance_compass_challenges');
    return saved ? JSON.parse(saved) : CHALLENGES_DATA;
  });

  const toggleJoinChallenge = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(c => {
        if (c.id === challengeId) {
          const nextJoined = !c.joined;
          if (nextJoined) {
            recordActivity('joined_challenge', 30);
          }
          return {
            ...c,
            joined: nextJoined,
            participants: nextJoined ? c.participants + 1 : c.participants - 1
          };
        }
        return c;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        streakState,
        streakCount: streakState.currentStreak,
        bestStreak: streakState.bestStreak,
        streakFreezeAvailable: streakState.streakFreezeAvailable,
        totalPoints: streakState.totalPoints,
        completedToday: streakState.completedToday,
        activityLog: streakState.activityLog,
        recordActivity,
        equipStreakFreeze,
        incrementStreak,
        lastActiveDate: streakState.lastActiveDate,
        habits,
        toggleHabit,
        addHabit,
        totalFocusMinutes,
        addFocusMinutes,
        waterGlasses,
        waterGoal,
        setWaterGlasses,
        incrementWater,
        decrementWater,
        sleepHours,
        setSleepHours,
        stepCount,
        setStepCount,
        restingHr,
        setRestingHr,
        healthHistory,
        saveHealthHistoryDay,
        moodEntries,
        logMood,
        deleteMoodEntry,
        goals,
        updateGoalProgress,
        toggleGoalMilestone,
        addGoal,
        deleteGoal,
        forumPosts,
        addForumPost,
        toggleLikePost,
        addCommentToPost,
        events,
        toggleJoinEvent,
        challenges,
        toggleJoinChallenge,
        isMembershipModalOpen,
        setIsMembershipModalOpen,
        memberTier,
        setMemberTier,
        isNavDrawerOpen,
        setIsNavDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
