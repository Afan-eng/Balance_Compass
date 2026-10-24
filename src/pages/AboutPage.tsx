import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const impactStats = [
    { label: 'Active Mindful Members', value: '45,000+' },
    { label: 'Deep Work Focus Hours Logged', value: '1.2M+' },
    { label: 'Reported Balance Improvement', value: '98%' },
    { label: 'Global Cities & Neighborhoods', value: '85+' }
  ];

  const values = [
    {
      title: 'Neuroscience Over Hustle Dogma',
      desc: 'We reject the toxic burnout ideology that glorifies exhaustion. Our principles are anchored in chronobiology, autonomic regulation, and cognitive psychology.'
    },
    {
      title: 'Local Privacy First',
      desc: 'Your personal reflections, daily habits, and emotional logs live securely in your browser storage. No intrusive surveillance or third-party ad brokers.'
    },
    {
      title: 'The Beauty of Organic Minimalism',
      desc: 'Our interfaces are designed with warm, organic natural palettes to calm the nervous system rather than trigger slot-machine dopamine loops.'
    },
    {
      title: 'Intergenerational Community',
      desc: 'Work-life balance extends beyond individual productivity to how we show up for our partners, children, elders, and local civic neighborhoods.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Our North Star Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2E1A] tracking-tight leading-tight">
          "Helping people build healthier, happier, and more balanced lives."
        </h1>
        <p className="text-base sm:text-lg text-[#5A6B5A] leading-relaxed">
          Productivity without mindfulness is frantic exhaustion. Mindfulness without grounded output is directionless. Balance Compass unites both into a sustainable human cadence.
        </p>
      </div>

      {/* Impact Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {impactStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-[#EAE6DF] text-center space-y-1"
          >
            <div className="text-3xl sm:text-4xl font-black text-[#2E7D32] font-sans">
              {stat.value}
            </div>
            <div className="text-xs text-[#5A6B5A] font-medium leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Story & Vision */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.02_PM_8c255819.jpeg"
              alt="Woman working in serene natural lighting by wooden desk and plants"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
              The Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A] leading-tight">
              Why We Built Balance Compass
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
              In 2026, technology connected everything yet fragmented our biological rhythms. Professionals worked 60 hours while feeling chronically behind; families sat in the same room gazing at isolated screens.
            </p>
            <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
              We asked a foundational question: What if technology was redesigned not to monopolize attention, but to orchestrate restorative departures from the screen? Balance Compass was born from that quiet rebellion.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Connect With Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Foundational Anchors</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A]">The Principles We Live By</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-[#1A2E1A]">{v.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
