import {
  Article,
  PodcastEpisode,
  VideoItem,
  CommunityEvent,
  ChallengeItem,
  VolunteerOpportunity,
  SuccessStory,
  ResourceGuide,
  ForumPost,
  HabitItem,
  GoalItem
} from '../types';

export const INITIAL_HABITS: HabitItem[] = [
  { id: 'h1', name: 'Morning Meditation (10 min)', category: 'mindfulness', completed: true, streak: 5 },
  { id: 'h2', name: 'Outdoor Walk or Run', category: 'body', completed: true, streak: 5 },
  { id: 'h3', name: 'Drink 8 Glasses of Fresh Water', category: 'body', completed: false, streak: 4 },
  { id: 'h4', name: 'Read 20 Pages of a Book', category: 'rest', completed: true, streak: 5 },
  { id: 'h5', name: 'Digital Sunset at 9:30 PM', category: 'rest', completed: false, streak: 3 },
  { id: 'h6', name: '2 Deep Work Pomodoro Blocks', category: 'focus', completed: true, streak: 5 }
];

export const INITIAL_GOALS: GoalItem[] = [
  {
    id: 'g1',
    title: 'Establish a Restorative Sleep Cadence (7.5h nightly)',
    category: 'health',
    targetDate: 'Nov 30, 2026',
    progress: 75,
    milestones: [
      { id: 'm1', text: 'No phone in bedroom after 9:30 PM', done: true },
      { id: 'm2', text: 'Magnesium and herbal tea evening routine', done: true },
      { id: 'm3', text: 'Consistent 6:45 AM wake time 6 days/week', done: true },
      { id: 'm4', text: '14 consecutive days of 7.5+ hours tracked', done: false }
    ]
  },
  {
    id: 'g2',
    title: 'Boundary Framework: Firm 5:30 PM Work Sign-Off',
    category: 'work',
    targetDate: 'Dec 15, 2026',
    progress: 60,
    milestones: [
      { id: 'm5', text: 'Communicate schedule to team & mute Slack at 5:30 PM', done: true },
      { id: 'm6', text: 'Daily 5:15 PM shutdown ritual & tomorrow preview', done: true },
      { id: 'm7', text: 'Complete 3 weeks without evening email checking', done: false }
    ]
  },
  {
    id: 'g3',
    title: 'Cultivate Living Garden & Weekend Outdoor Time',
    category: 'personal',
    targetDate: 'Jan 10, 2027',
    progress: 85,
    milestones: [
      { id: 'm8', text: 'Build raised planter boxes for fresh herbs and tomatoes', done: true },
      { id: 'm9', text: 'Weekly Saturday nature trail walk with family', done: true },
      { id: 'm10', text: 'Harvest first organic kitchen salad greens', done: true }
    ]
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-1',
    title: 'The Paradox of Deep Work: Why Rest is the Secret Engine of Focus',
    category: 'Productivity',
    readTime: '6 min read',
    date: 'Oct 20, 2026',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM__1__b65f3973.jpeg',
    author: 'Elena Vance, Cognitive Ergonomist',
    summary: 'High-performing professionals do not grind longer—they protect restorative decompression buffers.',
    tags: ['Deep Work', 'Energy Management', 'Focus'],
    content: [
      'For decades, modern work culture celebrated the endurance marathon: long hours at glowing monitors, calendar Tetris, and pride in exhaustion. Yet cognitive neuroscience shows our executive function operates in rhythmic cycles.',
      'When you intentionally bracket your work into 90-minute ultradian focus bursts followed by deliberate non-screen decompression, neural plasticity consolidates memory and eliminates cognitive residue.',
      'Key takeaway: Treat rest as a biological performance imperative, not a leftover prize when your to-do list is finally empty.'
    ]
  },
  {
    id: 'art-2',
    title: 'Mindful Outdoor Movement: How Green Spaces Reset Cortisol',
    category: 'Mental Health',
    readTime: '5 min read',
    date: 'Oct 18, 2026',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM_8575e226.jpeg',
    author: 'Dr. Marcus Reid, Environmental Psychologist',
    summary: 'Just 20 minutes in contact with natural foliage drops salivary cortisol and restores creative problem solving.',
    tags: ['Mindfulness', 'Stress Reduction', 'Nature Therapy'],
    content: [
      'Attention Restoration Theory (ART) demonstrates that urban and screen environments demand directed attention, which quickly fatigues the prefrontal cortex.',
      'Natural spaces engage involuntary "soft fascination"—the rustle of leaves, shifting sunlight, open horizons—allowing the mind to wander and autonomic tone to shift back to parasympathetic dominance.',
      'A daily walk without headphones or notifications creates an immediate mental buffer that changes how you react to stressful messages.'
    ]
  },
  {
    id: 'art-3',
    title: 'Kitchen as Sanctuary: The Grounding Art of Cooking Whole Foods',
    category: 'Fitness',
    readTime: '7 min read',
    date: 'Oct 15, 2026',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.03_PM__2__9843523f.jpeg',
    author: 'Sora Tanaka, Integrative Nutritionist',
    summary: 'Transforming meal preparation from a hurried chore into a tactile, sensory grounding ritual for the entire family.',
    tags: ['Nutrition', 'Physical Vitality', 'Sensory Grounding'],
    content: [
      'Chopping crisp vegetables, inhaling the fragrance of fresh crushed basil, and listening to the simmer of simmering broth grounds the nervous system through multiple sensory channels.',
      'Nutrient-dense whole greens, colorful polyphenols, and healthy fats stabilize glucose spikes that otherwise cause the notorious 3 PM mental fog.',
      'Invite children or partners to participate. The shared preparation of food creates spontaneous vulnerability and lighthearted connection that screens often isolate.'
    ]
  },
  {
    id: 'art-4',
    title: 'The Digital Sunset: Reclaiming Your Evenings from Blue Light',
    category: 'Digital Well-being',
    readTime: '4 min read',
    date: 'Oct 12, 2026',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.03_PM_6640553f.jpeg',
    author: 'Aria Montgomery, Sleep Researcher',
    summary: 'A step-by-step roadmap to shutting down notifications 90 minutes before sleep without missing anything essential.',
    tags: ['Sleep Hygiene', 'Digital Detox', 'Evening Routine'],
    content: [
      'The modern smartphone functions as a portable crisis transmitter. Even benign notifications prime our limbic system with anticipation.',
      'By establishing a physical docking station outside the bedroom and replacing doom-scrolling with reading, fireside chats, or journaling, sleep latency drops by 45%.',
      'Give yourself permission to be unreachable after dark.'
    ]
  },
  {
    id: 'art-5',
    title: 'Building Multigenerational Bonds: Slow Play in an Accelerated World',
    category: 'Relationships',
    readTime: '6 min read',
    date: 'Oct 08, 2026',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM_0757770b.jpeg',
    author: 'Julian Cross, Family Systems Therapist',
    summary: 'How timeless tabletop games and collaborative crafts bridge generations and nurture profound emotional security.',
    tags: ['Family Connection', 'Slow Living', 'Presence'],
    content: [
      'When grandparents, parents, and children sit on the floor around a simple wooden block tower or leaf-pressing craft, the artificial hierarchies of age dissolve.',
      'Laughter, cooperative problem solving, and unhurried storytelling teach emotional resilience far better than structured extracurricular schedules.',
      'Small rituals—like Sunday tea or backyard fire pit stories—become lifetime anchor memories.'
    ]
  }
];

export const PODCASTS_DATA: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'Episode 42: The Architecture of Sustainable Energy',
    duration: '38:15',
    durationSeconds: 2295,
    guest: 'Dr. Aris Thorne (Circadian Chronobiologist)',
    category: 'Energy & Sleep',
    description: 'Why morning light exposure within 30 minutes of waking resets your master body clock and doubles afternoon stamina.',
    published: 'Oct 22, 2026'
  },
  {
    id: 'pod-2',
    title: 'Episode 41: Saying No Without Guilt: Masterclass in Boundaries',
    duration: '44:10',
    durationSeconds: 2650,
    guest: 'Maya Lin (Organizational Psychologist)',
    category: 'Productivity',
    description: 'Specific conversational scripts to decline low-value demands gracefully while preserving collaborative goodwill.',
    published: 'Oct 15, 2026'
  },
  {
    id: 'pod-3',
    title: 'Episode 40: Community, Solitude, and the Loneliness Epidemic',
    duration: '35:20',
    durationSeconds: 2120,
    guest: 'David O’Connor (Sociologist & Author)',
    category: 'Relationships',
    description: 'Distinguishing restorative solitude from chronic isolation, and practical ways to build third places in your local neighborhood.',
    published: 'Oct 08, 2026'
  },
  {
    id: 'pod-4',
    title: 'Episode 39: Micro-Mindfulness: 60-Second Neurological Resets',
    duration: '27:45',
    durationSeconds: 1665,
    guest: 'Claire Chen (Mindfulness Instructor)',
    category: 'Mental Wellness',
    description: 'You do not need a 45-minute meditation retreat to lower sympathetic arousal. How micro-practices transform your workday.',
    published: 'Oct 01, 2026'
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-1',
    title: '15-Minute Desk Ergonomics & Spine Mobility Flow',
    duration: '15:20',
    category: 'Physical Health',
    instructor: 'Maya Sterling (Physical Therapist)',
    thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM__1__b65f3973.jpeg',
    description: 'Targeted neck, thoracic spine, and hip flexor releases to reverse the strain of prolonged desk posture.',
    embedId: 'desk-flow'
  },
  {
    id: 'vid-2',
    title: 'Guided Box Breathing for Acute Stress & Overwhelm',
    duration: '08:45',
    category: 'Mental Wellness',
    instructor: 'Liam Gallagher (Breathwork Specialist)',
    thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM_8575e226.jpeg',
    description: 'Calm your vagus nerve in under 10 minutes with the 4-4-4-4 box breathing pacing technique.',
    embedId: 'box-breath'
  },
  {
    id: 'vid-3',
    title: 'Outdoor Interval Jogging: Building Aerobic Base Safely',
    duration: '22:10',
    category: 'Fitness',
    instructor: 'Coach Naomi Brooks',
    thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__2__4130059e.jpeg',
    description: 'Low-impact heart-rate zone 2 aerobic conditioning to build mental stamina and cardio health.',
    embedId: 'outdoor-jog'
  },
  {
    id: 'vid-4',
    title: 'Mindful Plant Care & Soil Grounding Therapy',
    duration: '18:30',
    category: 'Personal Growth',
    instructor: 'Sarah Jenkins (Horticulturalist)',
    thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__1__64a6e826.jpeg',
    description: 'How tending living plants and hands-in-dirt microbiome contact elevates mood and reduces rumination.',
    embedId: 'soil-grounding'
  }
];

export const EVENTS_DATA: CommunityEvent[] = [
  {
    id: 'evt-1',
    title: 'Peak Performance: Balancing High Output with Deep Rest',
    date: 'Saturday, Nov 14, 2026',
    time: '10:00 AM - 1:00 PM EST',
    location: 'Metropolitan Wellness Auditorium & Virtual Stream',
    type: 'Workshop',
    attendees: 342,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM__2__32a71ab7.jpeg',
    host: 'Elena Vance & Dr. Marcus Reid',
    description: 'An immersive live symposium on neuro-ergonomics, boundary contracts with leadership, and energy cadence mapping.'
  },
  {
    id: 'evt-2',
    title: 'Community Green Trail Walk & Mindful Socializing',
    date: 'Sunday, Nov 22, 2026',
    time: '9:00 AM - 11:30 AM EST',
    location: 'Pine Valley Nature Reserve - Trailhead B',
    type: 'Meetup',
    attendees: 88,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM_932462c0.jpeg',
    host: 'Balance Compass Community Ambassadors',
    description: 'A gentle 4-mile guided nature walk followed by warm herbal tea, artisan pastries, and mindful conversation.'
  },
  {
    id: 'evt-3',
    title: 'Family Autumn Creative Craft & Nature Jam',
    date: 'Saturday, Dec 05, 2026',
    time: '2:00 PM - 4:30 PM EST',
    location: 'Oakridge Community Center Pavilion',
    type: 'Workshop',
    attendees: 120,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.03_PM__3__e7b42b67.jpeg',
    host: 'Family Systems Guild',
    description: 'Bring kids, parents, and grandparents for an afternoon of botanical leaf-pressing, wooden crafts, and warm apple cider.'
  }
];

export const CHALLENGES_DATA: ChallengeItem[] = [
  {
    id: 'ch-1',
    title: '30-Day Healthy Habits Journey',
    duration: '30 Days',
    participants: 14250,
    category: 'Whole-Life Balance',
    description: 'Daily bite-sized habits spanning mindful breathing, 20-min daily movement, hydration, and an evening screen curfew.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.02_PM_8c255819.jpeg',
    dailyPrompt: 'Day 12: Complete 1 full Pomodoro block in silence with all browser tabs closed except your primary document.',
    joined: true,
    currentDay: 12,
    totalDays: 30
  },
  {
    id: 'ch-2',
    title: '7-Day Digital Sunset Sprint',
    duration: '7 Days',
    participants: 6810,
    category: 'Digital Well-being',
    description: 'Dock your phone in the kitchen by 9:00 PM every night for 7 consecutive evenings and replace it with physical reading or stretching.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.03_PM_6640553f.jpeg',
    dailyPrompt: 'Day 5: Leave your phone in another room while having dinner tonight with zero exceptions.',
    joined: false,
    currentDay: 1,
    totalDays: 7
  },
  {
    id: 'ch-3',
    title: '10,000 Mindful Steps in Nature',
    duration: '14 Days',
    participants: 9420,
    category: 'Physical Health',
    description: 'Accumulate 10k steps daily with at least 3,000 steps taken in a park, garden, or quiet tree-lined street without headphones.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__2__4130059e.jpeg',
    dailyPrompt: 'Day 3: Notice 5 distinct bird calls or natural sounds during your morning 20-minute loop.',
    joined: true,
    currentDay: 3,
    totalDays: 14
  }
];

export const VOLUNTEER_DATA: VolunteerOpportunity[] = [
  {
    id: 'vol-1',
    title: 'Heritage Walking Tour Guide & City Docent',
    location: 'Historic Cultural District',
    organization: 'Civic Cultural Trust',
    date: 'Bi-weekly Saturdays',
    spotsLeft: 4,
    description: 'Lead leisurely historical architectural walks for visitors, seniors, and school groups while fostering civic pride and storytelling.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM__1__2c16b57c.jpeg',
    requirements: ['Friendly interpersonal demeanor', 'Passion for history & architecture', 'Able to walk 2.5 miles comfortably'],
    impactArea: 'Civic Culture & Community Engagement'
  },
  {
    id: 'vol-2',
    title: 'Community Urban Garden & Seed Bank Keeper',
    location: 'Westside Community Garden Plots',
    organization: 'Green Roots Urban Agriculture',
    date: 'Wednesday Mornings & Saturdays',
    spotsLeft: 8,
    description: 'Help cultivate organic heirloom vegetables, tend compost stations, and distribute fresh harvests to local food pantries.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.05_PM__1__64a6e826.jpeg',
    requirements: ['Love of soil and plants', 'No experience necessary; tools provided', '2 hours/week commitment'],
    impactArea: 'Food Security & Urban Ecology'
  },
  {
    id: 'vol-3',
    title: 'Senior Companionship & Memory Book Storyteller',
    location: 'Sunnyside Elder Living Village',
    organization: 'Generations Connected',
    date: 'Flexible Weekday Afternoons',
    spotsLeft: 6,
    description: 'Spend unhurried hours playing board games, recording oral family histories, and sharing warm afternoon tea with resident elders.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM_0757770b.jpeg',
    requirements: ['Empathetic listener', 'Background check clearance', 'Reliability and warmth'],
    impactArea: 'Elder Care & Intergenerational Health'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    name: 'Kendra Morales',
    role: 'Product Director & Mother of Two',
    location: 'Denver, Colorado',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.06_PM__1__b65f3973.jpeg',
    headline: 'From Chronic Burnout & Late Night Slack to Present Family Evenings',
    quote: '"Balance Compass gave me the permission structure and tools to close my laptop at 5:30 PM. My kids noticed the difference within 10 days."',
    story: 'Kendra was drowning in back-to-back video calls and checking emails from bed until midnight. After committing to the 30-Day Healthy Habits Challenge and adopting the Pomodoro Deep Work protocol, she consolidated her core deliverables into 3 daily focus hours. She now has evenings free for cooking with her family and restful sleep.',
    keyShift: 'Swapped reactive availability for scheduled deep work blocks and a strict 9:30 PM digital sunset.',
    stat: 'Reclaimed 14 hours/week for personal vitality & family'
  },
  {
    id: 'story-2',
    name: 'Marcus & Evelyn Wright',
    role: 'Retired Architect & Elementary Educator',
    location: 'Savannah, Georgia',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM_0757770b.jpeg',
    headline: 'Revitalizing Intergenerational Connection Through Mindful Play',
    quote: '"We replaced screen-centric weekends with block building, pressed leaves, and garden harvests. The house feels alive with laughter again."',
    story: 'Marcus and Evelyn felt their grandchildren were slipping into isolated tablet consumption whenever they visited. Using Balance Compass family blueprints, they initiated weekly tabletop block challenges and backyard nature foraging.',
    keyShift: 'Instituted screen-free "Slow Sunday" afternoons with cooperative building and campfire storytelling.',
    stat: '100% phone-free family gatherings for 6 consecutive months'
  },
  {
    id: 'story-3',
    name: 'Dr. Tariq Al-Mansoor',
    role: 'Cardiology Resident & Trail Runner',
    location: 'Seattle, Washington',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM__3__247cdffd.jpeg',
    headline: 'Conquering Hospital Shift Fatigue with Nature Conditioning',
    quote: '"Micro-breathing in between surgical rounds and Saturday mountain trails kept my empathy intact when hospital stress was at its peak."',
    story: 'High-stress medical residency pushed Tariq into chronic insomnia. Implementing box-breathing resets between shifts and consistent hydration tracking restored his recovery baseline.',
    keyShift: 'Integrated 4-minute physiological sighs and weekly summit trail hikes.',
    stat: 'Restored deep sleep from 45 min to 1 hour 45 min nightly'
  }
];

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: 'res-1',
    title: 'The Ergonomic Workstation & Eye-Rest Blueprint',
    category: 'Checklist',
    format: 'Printable PDF & Interactive Checklist',
    pages: '4 Pages',
    downloads: 12450,
    description: 'Calibrate your monitor height, lumbar angle, lighting temperature, and the 20-20-20 rule to eliminate end-of-day migraines.',
    highlights: ['Monitor distance & focal angle guide', '90-degree arm and hip alignment', 'Natural lighting placement to eliminate screen glare']
  },
  {
    id: 'res-2',
    title: 'The Mindful Morning Cadence (0 to 60 Minutes)',
    category: 'Guide',
    format: 'Illustrated PDF Guide',
    pages: '8 Pages',
    downloads: 18900,
    description: 'Transform frantic mornings into calm, grounded launches with hydration rituals, light movement, and intentional journaling.',
    highlights: ['Hydration with minerals before caffeine', 'Natural light circadian alignment', '3-item priority framing before checking email']
  },
  {
    id: 'res-3',
    title: 'Weekly Time-Blocking & Boundary Template',
    category: 'Planner',
    format: 'Fillable Sheet & Notion/PDF',
    pages: '2 Pages',
    downloads: 9800,
    description: 'A visual weekly map for categorizing deep work, buffer zones, restorative lunch hours, and non-negotiable family time.',
    highlights: ['Buffer space between critical commitments', 'Theme days to reduce context switching', 'End-of-day shutdown routine checklist']
  },
  {
    id: 'res-4',
    title: 'Nutrient-Dense Whole Foods Weekly Meal Architecture',
    category: 'Infographic',
    format: 'Full-Color Cheat Sheet',
    pages: '3 Pages',
    downloads: 15300,
    description: 'Quick-prep colorful meals rich in omega-3s, magnesium, and prebiotic fibers that banish the 3 PM sugar crash.',
    highlights: ['Anti-inflammatory grocery staples', '15-minute quick pantry grain bowls', 'Hydration timing rules around digestion']
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Seraphina Bloom',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Community Guide',
    category: 'Mindfulness',
    title: 'How I replaced my 6:30 AM morning phone doom-scroll with 10 deep breaths',
    content: 'For three years, the first light hitting my eyes was an algorithm designed for outrage. Last week, I bought a $12 analog alarm clock and left my phone charging downstairs. The difference in my baseline morning anxiety is shocking. Has anyone else made this switch?',
    timestamp: '2 hours ago',
    likes: 42,
    likedByUser: false,
    comments: [
      {
        id: 'c1',
        author: 'Daniel Vance',
        content: 'Did the exact same thing 3 months ago! It completely transformed my morning coffee time into a peaceful ritual.',
        timestamp: '1 hour ago'
      },
      {
        id: 'c2',
        author: 'Maria Lin',
        content: 'I also keep a physical notepad next to my bed now. If a work thought pops up, I write it down on paper and let it go.',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Jameson Thorne',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'Member · 18 Day Streak',
    category: 'Productivity',
    title: 'The 25-minute Pomodoro changed how our engineering team operates',
    content: 'We instituted "Pomodoro Power Hours" every Tuesday and Thursday morning where the whole team goes on Do Not Disturb. We accomplished two weeks of sprint backlog in three sessions. Guard your team’s focus!',
    timestamp: '5 hours ago',
    likes: 67,
    likedByUser: true,
    comments: [
      {
        id: 'c3',
        author: 'Leila Farouk',
        content: 'We need this at my agency. Do you communicate it with clients or just block out the calendar?',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    author: 'Grace Kowalski',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    role: 'Member · 31 Day Streak',
    category: 'Relationships',
    title: 'Sunday Tabletop Board Games: Our family’s non-negotiable anchor',
    content: 'No tablets, no televisions, no work laptops. We lay out tea, wooden blocks, and board games for 2 hours every Sunday afternoon. My teenagers actually look forward to it. Simplicity is deeply underrated.',
    timestamp: '1 day ago',
    likes: 89,
    likedByUser: false,
    comments: [
      {
        id: 'c4',
        author: 'Marcus Wright',
        content: 'Wholeheartedly agree, Grace. Unhurried presence creates the richest memories.',
        timestamp: '18 hours ago'
      }
    ]
  }
];

export const PILLARS_LIST = [
  {
    id: 'mental-wellness',
    title: 'Mental Wellness',
    tagline: 'Mindfulness & Inner Clarity',
    desc: 'Regulate your nervous system with guided box-breathing, cognitive defusion, and stress reduction guides.',
    badge: 'Restorative',
    color: '#2E7D32',
    bg: '#E8F5E9',
    icon: 'Brain'
  },
  {
    id: 'physical-health',
    title: 'Physical Health',
    tagline: 'Vitality, Movement & Nourishment',
    desc: 'Track daily hydration, aerobic conditioning, sleep cycles, and whole-food nutritional balance.',
    badge: 'Energizing',
    color: '#15803D',
    bg: '#DCFCE7',
    icon: 'Activity'
  },
  {
    id: 'productivity',
    title: 'Time & Productivity',
    tagline: 'Intentional Focus & Deep Work',
    desc: 'Master the Pomodoro method, eliminate context-switching residue, and set unshakeable workday boundaries.',
    badge: 'Focus',
    color: '#0D9488',
    bg: '#CCFBF1',
    icon: 'Clock'
  },
  {
    id: 'relationships',
    title: 'Relationships',
    tagline: 'Family, Friendship & Presence',
    desc: 'Foster deep empathy, slow play with loved ones, and active community bonds in an accelerated world.',
    badge: 'Connection',
    color: '#B45309',
    bg: '#FEF3C7',
    icon: 'Heart'
  },
  {
    id: 'digital-wellbeing',
    title: 'Digital Well-being',
    tagline: 'Conscious Technology Use',
    desc: 'Reclaim your evenings with 1-click digital detox zen sessions, screen audits, and phone-free rituals.',
    badge: 'Equilibrium',
    color: '#4338CA',
    bg: '#EEF2FF',
    icon: 'Smartphone'
  },
  {
    id: 'personal-growth',
    title: 'Personal Growth',
    tagline: 'Hobby Craft & Guided Journaling',
    desc: 'Set soul-fulfilling milestones, cultivate botanical hobbies, and reflect through structured journaling prompts.',
    badge: 'Evolution',
    color: '#047857',
    bg: '#D1FAE5',
    icon: 'Compass'
  }
];
