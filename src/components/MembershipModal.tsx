import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Flame,
  Award,
  Zap,
  Lock
} from 'lucide-react';

export const MembershipModal: React.FC = () => {
  const {
    isMembershipModalOpen,
    setIsMembershipModalOpen,
    memberTier,
    setMemberTier,
    showToast,
    recordActivity
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'Supporter' | 'Patron' | 'Lifetime'>('Supporter');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [paymentStep, setPaymentStep] = useState<'select' | 'checkout' | 'success'>('select');
  const [buyerName, setBuyerName] = useState('Maya Lin');
  const [buyerEmail, setBuyerEmail] = useState('maya.lin@example.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<{
    orderId: string;
    paymentId: string;
    amount: string;
    tier: string;
    date: string;
  } | null>(null);

  if (!isMembershipModalOpen) return null;

  const plans = [
    {
      id: 'Supporter' as const,
      name: 'Supporter Circle',
      priceINR: '₹499',
      priceUSD: '$6',
      period: '/ month',
      badge: 'Popular',
      benefits: [
        'Full access to all 22 lifestyle hubs & trackers',
        'Unlimited Streak Freeze protections (2 per month)',
        'Priority RSVP for keynote workshops & events',
        'Exclusive digital magazine archives & PDF guides'
      ]
    },
    {
      id: 'Patron' as const,
      name: 'Mindful Patron',
      priceINR: '₹1,499',
      priceUSD: '$18',
      period: '/ month',
      badge: 'Deep Impact',
      benefits: [
        'Everything in Supporter Circle',
        'Direct 1-on-1 Q&A with cognitive ergonomists',
        'Quarterly printed Balance Journal dispatched to your home',
        'Sponsors 2 community garden volunteer seed packs'
      ]
    },
    {
      id: 'Lifetime' as const,
      name: 'Lifetime Balance Pass',
      priceINR: '₹4,999',
      priceUSD: '$60',
      period: 'one-time',
      badge: 'Best Value',
      benefits: [
        'Permanent lifetime access with zero recurring fees',
        'Permanent Golden Streak Badge in discussions',
        'VIP symposium tickets & retreat discounts',
        'All future tool releases & audio masterclasses included'
      ]
    }
  ];

  const currentPlanObj = plans.find(p => p.id === selectedPlan)!;
  const currentPrice = currency === 'INR' ? currentPlanObj.priceINR : currentPlanObj.priceUSD;

  const handleSimulateRazorpay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const paymentId = 'pay_' + Math.random().toString(36).substring(2, 12).toUpperCase();
      const orderId = 'order_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const receipt = {
        orderId,
        paymentId,
        amount: currentPrice,
        tier: selectedPlan,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setReceiptDetails(receipt);
      setMemberTier(selectedPlan);
      localStorage.setItem('balance_compass_member_tier', selectedPlan);
      setPaymentStep('success');
      recordActivity('membership_upgraded', 200);
      showToast(`🎉 Payment verified via Razorpay! Welcome to ${selectedPlan}.`);
    }, 1400);
  };

  const handleClose = () => {
    setIsMembershipModalOpen(false);
    setPaymentStep('select');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={handleClose} className="fixed inset-0 bg-[#1A2E1A]/50 backdrop-blur-xs" />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl z-10 border border-[#EAE6DF] space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] border border-[#EAE6DF] hover:bg-[#EAE6DF] text-[#5A6B5A] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentStep === 'select' && (
          <div className="space-y-6">
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1A]">
                Join the Balance Circle
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6B5A]">
                Support independent, research-backed mindfulness tools with zero algorithmic surveillance.
              </p>

              {/* Currency Toggle */}
              <div className="inline-flex p-1 bg-[#FAF8F5] rounded-full border border-[#EAE6DF] mt-2">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    currency === 'INR' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#5A6B5A]'
                  }`}
                >
                  ₹ INR (Razorpay)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    currency === 'USD' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#5A6B5A]'
                  }`}
                >
                  $ USD
                </button>
              </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map(p => {
                const isSelected = selectedPlan === p.id;
                const price = currency === 'INR' ? p.priceINR : p.priceUSD;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/20 bg-[#FAF8F5] shadow-md'
                        : 'border-[#EAE6DF] hover:border-[#2E7D32]/40 bg-white'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D32] px-2 py-0.5 bg-[#E8F5E9] rounded-md">
                          {p.badge}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />}
                      </div>
                      <h3 className="text-base font-bold text-[#1A2E1A]">{p.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#1A2E1A] font-sans">{price}</span>
                        <span className="text-[11px] text-[#5A6B5A]">{p.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-[11px] text-[#5A6B5A] border-t border-[#EAE6DF] pt-3">
                      {p.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <CheckCircle2 className="w-3 h-3 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#5A6B5A]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Encrypted 256-bit Razorpay Gateway · Instant receipt</span>
              </div>
              <button
                onClick={() => setPaymentStep('checkout')}
                className="px-6 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                Proceed to Checkout ({currentPrice})
              </button>
            </div>
          </div>
        )}

        {paymentStep === 'checkout' && (
          <form onSubmit={handleSimulateRazorpay} className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2E7D32] uppercase">Razorpay Secure Checkout</span>
              <h2 className="text-2xl font-bold text-[#1A2E1A]">Confirm Your Balance Circle Pass</h2>
              <p className="text-xs text-[#5A6B5A]">
                Selected Tier: <strong>{currentPlanObj.name}</strong> ({currentPrice} {currentPlanObj.period})
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Receipt Email</label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={e => setBuyerEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs sm:text-sm outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E1A] mb-1">Card / UPI / NetBanking</label>
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#EAE6DF] text-xs text-[#1A2E1A]">
                  <CreditCard className="w-4 h-4 text-[#2E7D32]" />
                  <span>Razorpay Test Gateway: 4111 •••• •••• 1111 (Pre-authorized sandbox)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setPaymentStep('select')}
                className="px-4 py-2 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A]"
              >
                Back to Plans
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-7 py-3 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying with Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pay {currentPrice} & Activate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {paymentStep === 'success' && receiptDetails && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-[#1A2E1A]">Membership Activated!</h3>
              <p className="text-xs sm:text-sm text-[#5A6B5A]">
                Thank you for anchoring the Balance Compass community. Here is your official Razorpay transaction receipt.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-[#EAE6DF] pb-2 font-bold text-[#1A2E1A]">
                <span>Transaction Status:</span>
                <span className="text-[#2E7D32]">SUCCESS (Captured)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6B5A]">Payment ID:</span>
                <span className="text-[#1A2E1A]">{receiptDetails.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6B5A]">Order ID:</span>
                <span className="text-[#1A2E1A]">{receiptDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6B5A]">Member Tier:</span>
                <span className="text-[#2E7D32] font-bold">{receiptDetails.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6B5A]">Amount Paid:</span>
                <span className="text-[#1A2E1A] font-bold">{receiptDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6B5A]">Date:</span>
                <span className="text-[#1A2E1A]">{receiptDetails.date}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-full shadow-md cursor-pointer transition-colors"
            >
              Continue to Balance Compass
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
