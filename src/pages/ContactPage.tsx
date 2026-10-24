import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Balance Compass protect my private habit and health data?',
      a: 'All personal journal entries, streak counts, and vitals are stored locally in your browser storage. We do not sell user profiles or run ad networks.'
    },
    {
      q: 'What is the science behind the 25-minute Pomodoro and 4-4-4-4 Box Breathing?',
      a: 'The 25-minute interval aligns with human working-memory attention spans, avoiding dopamine exhaustion. Box breathing stimulates the vagus nerve, rapidly reducing systemic cortisol and lowering elevated heart rate.'
    },
    {
      q: 'Can organizations bring Balance Compass workshops to their teams?',
      a: 'Yes. Our clinical psychologists and cognitive ergonomists lead keynote symposiums and 4-week corporate restorative sprints. Select "Corporate Wellness" in the form below.'
    },
    {
      q: 'Is Balance Compass completely free to use?',
      a: 'Yes! The 6 core pillars, habit streaks, guided breathing widgets, and community forums are completely free and open to everyone.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('✨ Message received! Our team will respond within 24 hours.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>Reach Out</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Get in Touch with Our Guidance Team
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Whether you have a question about our methodology, want to host a community workshop, or need assistance, we are here to support your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF]">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2E1A]">Thank You, {name}!</h2>
              <p className="text-sm text-[#5A6B5A] max-w-md mx-auto">
                Your message regarding <strong>{topic}</strong> has been transmitted. A wellness advisor will reply to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-full bg-[#2E7D32] text-white text-xs font-bold hover:bg-[#1B5E20] cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-[#1A2E1A]">Send an Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] text-xs sm:text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Inquiry Topic</label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none bg-white font-medium"
                >
                  <option value="General Inquiry">General Balance Inquiry</option>
                  <option value="Corporate Wellness">Corporate Team Workshop</option>
                  <option value="Community Gathering">Host a Local Meetup</option>
                  <option value="Research & Press">Research Collaboration / Media</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with your balance practices?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#EAE6DF] focus:border-[#2E7D32] text-xs sm:text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-full shadow-md text-xs sm:text-sm cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Office & Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] space-y-5">
            <h3 className="text-lg font-bold text-[#1A2E1A]">Sanctuary Headquarters</h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5A6B5A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A2E1A]">Balance Compass Collective</div>
                  <div>428 Pine Needle Way, Suite 300</div>
                  <div>Boulder, Colorado 80302</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A2E1A]">Response Cadence</div>
                  <div>Monday – Friday: 9:00 AM – 5:00 PM MST</div>
                  <div className="text-xs text-[#2E7D32]">Guaranteed reply within 24 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A2E1A]">Direct Email</div>
                  <div>hello@balancecompass.org</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#EAE6DF] space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Common Inquiries</span>
          <h2 className="text-2xl font-bold text-[#1A2E1A]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#EAE6DF] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#1A2E1A] flex items-center justify-between gap-4 bg-[#FAF8F5] hover:bg-[#F5F2EB] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5A6B5A] transform transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#2E7D32]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 text-xs sm:text-sm text-[#5A6B5A] leading-relaxed bg-white border-t border-[#EAE6DF]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
