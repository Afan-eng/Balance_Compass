/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// 22 Application Pages
import { HomePage } from './pages/HomePage';
import { MentalWellnessPage } from './pages/MentalWellnessPage';
import { PhysicalHealthPage } from './pages/PhysicalHealthPage';
import { ProductivityPage } from './pages/ProductivityPage';
import { RelationshipsPage } from './pages/RelationshipsPage';
import { DigitalWellbeingPage } from './pages/DigitalWellbeingPage';
import { PersonalGrowthPage } from './pages/PersonalGrowthPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { PodcastsPage } from './pages/PodcastsPage';
import { VideosPage } from './pages/VideosPage';
import { EventsPage } from './pages/EventsPage';
import { CommunityPage } from './pages/CommunityPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { HealthTrackerPage } from './pages/HealthTrackerPage';
import { MoodTrackerPage } from './pages/MoodTrackerPage';
import { HabitTrackerPage } from './pages/HabitTrackerPage';
import { GoalTrackerPage } from './pages/GoalTrackerPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const PageRenderer: React.FC = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'mental-wellness':
      return <MentalWellnessPage />;
    case 'physical-health':
      return <PhysicalHealthPage />;
    case 'productivity':
      return <ProductivityPage />;
    case 'relationships':
      return <RelationshipsPage />;
    case 'digital-wellbeing':
      return <DigitalWellbeingPage />;
    case 'personal-growth':
      return <PersonalGrowthPage />;
    case 'articles':
      return <ArticlesPage />;
    case 'podcasts':
      return <PodcastsPage />;
    case 'videos':
      return <VideosPage />;
    case 'events':
      return <EventsPage />;
    case 'community':
      return <CommunityPage />;
    case 'challenges':
      return <ChallengesPage />;
    case 'volunteer':
      return <VolunteerPage />;
    case 'success-stories':
      return <SuccessStoriesPage />;
    case 'resources':
      return <ResourcesPage />;
    case 'health-tracker':
      return <HealthTrackerPage />;
    case 'mood-tracker':
      return <MoodTrackerPage />;
    case 'habit-tracker':
      return <HabitTrackerPage />;
    case 'goal-tracker':
      return <GoalTrackerPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage />;
  }
};

import { MembershipModal } from './components/MembershipModal';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A2E1A]">
        <Navbar />
        <main className="flex-1">
          <PageRenderer />
        </main>
        <Footer />
        <MembershipModal />
      </div>
    </AppProvider>
  );
}
