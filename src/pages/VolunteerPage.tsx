import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VolunteerOpportunity } from '../types';
import { VOLUNTEER_DATA } from '../data/mockData';
import {
  HandHeart,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  X,
  ArrowRight
} from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { showToast, incrementStreak } = useApp();
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>(VOLUNTEER_DATA);
  const [selectedOpp, setSelectedOpp] = useState<VolunteerOpportunity | null>(null);

  // Form input
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState('Weekends');
  const [signedUpSuccess, setSignedUpSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !selectedOpp) return;
    setOpportunities(prev =>
      prev.map(o => (o.id === selectedOpp.id ? { ...o, spotsLeft: Math.max(0, o.spotsLeft - 1) } : o))
    );
    setSignedUpSuccess(true);
    showToast(`Volunteer application submitted for ${selectedOpp.title}!`);
    incrementStreak();
    setTimeout(() => {
      setSignedUpSuccess(false);
      setSelectedOpp(null);
      setFullName('');
      setEmail('');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <HandHeart className="w-4 h-4" />
          <span>Generative Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Community Service & Civic Stewardship
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Scientific research confirms that altruistic contribution directly dampens the amygdala's threat response and generates durable life meaning.
        </p>
      </div>

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {opportunities.map(opp => (
          <div
            key={opp.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF] hover:border-[#2E7D32] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src={opp.image}
                  alt={opp.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#2E7D32]">
                  {opp.impactArea}
                </span>
                <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-xs font-bold text-white">
                  {opp.spotsLeft} spots left
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1A2E1A] leading-snug">{opp.title}</h3>
                  <div className="text-xs font-semibold text-[#2E7D32] mt-1">{opp.organization}</div>
                  <p className="text-xs text-[#5A6B5A] mt-2 leading-relaxed">{opp.description}</p>
                </div>

                <div className="space-y-1.5 text-xs text-[#5A6B5A]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{opp.date}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-[#1A2E1A] uppercase tracking-wider mb-1.5">
                    What to expect:
                  </div>
                  <ul className="space-y-1 text-xs text-[#5A6B5A]">
                    {opp.requirements.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#EAE6DF] pt-4">
              <button
                onClick={() => setSelectedOpp(opp)}
                disabled={opp.spotsLeft === 0}
                className={`w-full py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  opp.spotsLeft === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                }`}
              >
                {opp.spotsLeft === 0 ? 'Cohort Filled' : 'Apply to Volunteer'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SIGN UP MODAL */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedOpp(null)} className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] space-y-5">
            <button
              onClick={() => setSelectedOpp(null)}
              className="absolute top-4 right-4 text-[#5A6B5A] hover:text-[#1A2E1A]"
            >
              <X className="w-5 h-5" />
            </button>

            {signedUpSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2E1A]">Application Received!</h3>
                <p className="text-xs text-[#5A6B5A]">
                  Thank you for contributing your presence. The volunteer coordinator will email onboarding instructions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#2E7D32] uppercase">Volunteer Service Sign Up</span>
                  <h3 className="text-xl font-bold text-[#1A2E1A] mt-0.5">{selectedOpp.title}</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Lee"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2E1A] mb-1">General Availability</label>
                  <select
                    value={availability}
                    onChange={e => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs sm:text-sm outline-none bg-white font-medium"
                  >
                    <option value="Weekends">Saturdays / Sundays</option>
                    <option value="Weekday Mornings">Weekday Mornings</option>
                    <option value="Weekday Evenings">Weekday Evenings</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-full shadow-md text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Submit Volunteer Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
