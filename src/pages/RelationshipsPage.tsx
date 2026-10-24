import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Users,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Coffee,
  MessageSquare
} from 'lucide-react';

export const RelationshipsPage: React.FC = () => {
  const { showToast, incrementStreak } = useApp();

  const [recipient, setRecipient] = useState<'Partner' | 'Child' | 'Parent' | 'Friend' | 'Colleague'>('Partner');
  const [tone, setTone] = useState<'Warm Gratitude' | 'Proud Recognition' | 'Gentle Reassurance'>('Warm Gratitude');
  const [customNote, setCustomNote] = useState('');
  const [cardGenerated, setCardGenerated] = useState(false);

  const getPresetMessage = () => {
    if (recipient === 'Partner') {
      return "Thank you for the quiet ways you hold our home and life together. I see how much care you pour into our family, and I am deeply grateful for your partnership and love.";
    }
    if (recipient === 'Child') {
      return "I love watching you grow, learn, and express your creative joy. Playing with you and seeing your smile is the absolute highlight of my day.";
    }
    if (recipient === 'Parent') {
      return "Thank you for your steady wisdom, sacrifice, and unconditional love over the years. I treasure the stories and laughter we share around the table.";
    }
    if (recipient === 'Friend') {
      return "Just thinking about you today! Thank you for being such an authentic, grounded anchor in my life. Let's carve out an unhurried walk or coffee soon.";
    }
    return "I truly appreciate your thoughtful collaboration and integrity on our team. You bring calm clarity to complex challenges, and it is a privilege working alongside you.";
  };

  const handleCopyCard = () => {
    const textToCopy = customNote || getPresetMessage();
    navigator.clipboard?.writeText(textToCopy);
    showToast('💌 Appreciation message copied to clipboard! Send it to your loved one.');
    incrementStreak();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Heart className="w-4 h-4" />
          <span>Core Pillar 04</span>
          <span>·</span>
          <span>Interpersonal Presence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Relationships, Family & Community Connection
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-3xl leading-relaxed">
          The Harvard Study of Adult Development—an 85-year longitudinal investigation—revealed the single greatest predictor of health and happiness is not wealth or fame, but the depth and warmth of our human relationships.
        </p>
      </div>

      {/* MULTIGENERATIONAL PHOTO FEATURE */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-24_at_3.54.04_PM_0757770b.jpeg"
              alt="Multigenerational family playing wooden blocks together in bright living room"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                Slow Play Architecture
              </span>
              <h2 className="text-2xl font-bold text-[#1A2E1A]">
                Unhurried Play Bridges Generations
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                When devices are set aside and three generations sit on the living room rug constructing wooden blocks or pressing autumn leaves, biological oxytocin surges and loneliness dissolves.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-2">
              <div className="text-xs font-bold text-[#1A2E1A]">Weekly Connection Anchor</div>
              <p className="text-xs text-[#5A6B5A]">
                Designate 2 phone-free hours every weekend dedicated exclusively to tabletop games, cooperative crafts, or shared baking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE APPRECIATION MESSAGE BUILDER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
            Micro-Connection Practice
          </div>
          <h2 className="text-2xl font-bold text-[#1A2E1A]">
            Interactive Daily Appreciation Builder
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B5A]">
            Sending a 60-second spontaneous note of gratitude activates the reward circuitry in both the sender and receiver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Controls */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1A2E1A] mb-2 uppercase tracking-wider">
                Who are you appreciating?
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Partner', 'Child', 'Parent', 'Friend', 'Colleague'] as const).map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      setRecipient(item);
                      setCustomNote('');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      recipient === item
                        ? 'bg-[#2E7D32] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#5A6B5A] hover:text-[#1A2E1A] border border-[#EAE6DF]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2E1A] mb-2 uppercase tracking-wider">
                Select Intended Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Warm Gratitude', 'Proud Recognition', 'Gentle Reassurance'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      tone === t
                        ? 'bg-[#1A2E1A] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#5A6B5A] border border-[#EAE6DF]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2E1A] mb-1.5 uppercase tracking-wider">
                Personalize Note (Optional)
              </label>
              <textarea
                rows={3}
                placeholder={getPresetMessage()}
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] text-xs sm:text-sm outline-none bg-[#FAF8F5]"
              />
            </div>
          </div>

          {/* Generated Card Preview */}
          <div className="bg-gradient-to-br from-[#FAF8F5] to-[#E8F5E9]/60 rounded-2xl p-6 sm:p-7 border border-[#2E7D32]/25 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#5A6B5A]">
                <span className="font-bold text-[#2E7D32] uppercase">Card Preview · {recipient}</span>
                <span>{tone}</span>
              </div>
              <p className="text-sm sm:text-base text-[#1A2E1A] italic leading-relaxed font-serif bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
                "{customNote || getPresetMessage()}"
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopyCard}
                className="w-full py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Appreciation Note & Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE LISTENING FRAMEWORK */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#1A2E1A]">The 4 Pillars of Attuned Listening</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Put Devices Away', desc: 'A phone on the table—even face down—reduces conversational intimacy by 30%.' },
            { step: '02', title: 'Withhold the Fix', desc: 'Listen to understand feelings before leaping into problem-solving mode.' },
            { step: '03', title: 'Reflect Back', desc: 'Say: "What I hear you saying is that you felt overwhelmed by that deadline."' },
            { step: '04', title: 'Validate Emotion', desc: 'Confirm their emotional reality: "It makes total sense why that felt painful."' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#EAE6DF] shadow-sm space-y-3">
              <div className="text-2xl font-black text-[#2E7D32]">{item.step}</div>
              <h3 className="text-base font-bold text-[#1A2E1A]">{item.title}</h3>
              <p className="text-xs text-[#5A6B5A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
