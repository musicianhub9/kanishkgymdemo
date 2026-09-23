import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, X, HelpCircle, ShieldCheck } from 'lucide-react';
import { JoinPlanModal } from './JoinPlanModal';

interface MembershipPageProps {
  navigate: (path: string) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({ navigate }) => {
  const { plans } = useApp();
  const [billingCadence, setBillingCadence] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-pro');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const getDisplayedPrice = (plan: typeof plans[0]) => {
    if (billingCadence === 'yearly') {
      return {
        amount: Math.round(plan.yearlyPrice / 12),
        period: '/ month (billed yearly)',
        total: `₹${plan.yearlyPrice.toLocaleString()} / year`,
      };
    }
    if (billingCadence === 'quarterly') {
      return {
        amount: Math.round(plan.quarterlyPrice / 3),
        period: '/ month (billed quarterly)',
        total: `₹${plan.quarterlyPrice.toLocaleString()} / quarter`,
      };
    }
    return {
      amount: plan.monthlyPrice,
      period: '/ month',
      total: `Billed monthly`,
    };
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setIsJoinModalOpen(true);
  };

  const comparisonFeatures = [
    { name: 'Gym Floor & Weight Room Access', basic: true, pro: true, elite: true },
    { name: 'Cardio Zone & Treadmills', basic: true, pro: true, elite: true },
    { name: 'Locker & Shower Amenities', basic: true, pro: true, elite: true },
    { name: 'Mobile Member Portal & Attendance', basic: true, pro: true, elite: true },
    { name: 'Personalized Workout Plan', basic: false, pro: true, elite: true },
    { name: 'In-App Progress & PR Logging', basic: false, pro: true, elite: true },
    { name: 'Unlimited Group Fitness & HIIT Classes', basic: false, pro: true, elite: true },
    { name: 'Bi-weekly Coach Form Audits', basic: false, pro: true, elite: true },
    { name: 'Dedicated 1-on-1 Personal Trainer', basic: false, basicNote: 'Add-on only', pro: false, elite: true },
    { name: 'Bespoke Nutrition & Macro Protocol', basic: false, pro: false, elite: true },
    { name: 'Weekly InBody Composition Scans', basic: false, pro: false, elite: true },
    { name: 'Sauna & Cold Contrast Recovery Suite', basic: false, pro: false, elite: true },
    { name: 'Priority VIP Trainer Messaging 24/7', basic: false, pro: false, elite: true },
  ];

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Membership Options</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Invest In Your Strength
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Simple, transparent membership tiers with no hidden registration penalties or forced multi-year locks.
          Select the level of coaching that suits your ambitions.
        </p>

        {/* Cadence Toggle */}
        <div className="inline-flex items-center p-1 rounded-xl bg-neutral-900 border border-neutral-800 mt-6">
          <button
            onClick={() => setBillingCadence('monthly')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
              billingCadence === 'monthly'
                ? 'bg-emerald-400 text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCadence('quarterly')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
              billingCadence === 'quarterly'
                ? 'bg-emerald-400 text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Quarterly (Save 10%)
          </button>
          <button
            onClick={() => setBillingCadence('yearly')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
              billingCadence === 'yearly'
                ? 'bg-emerald-400 text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const priceInfo = getDisplayedPrice(plan);
          return (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-[#121824] border-2 border-emerald-400 shadow-2xl relative'
                  : 'bg-[#0f1319] border border-neutral-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-black uppercase tracking-wider shadow">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-2 min-h-[36px]">{plan.tagline}</p>

                <div className="mt-6 pb-6 border-b border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white tabular-nums">
                      ₹{priceInfo.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">{priceInfo.period}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 font-mono">{priceInfo.total}</p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Included Perks:</p>
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-lg'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  Choose {plan.name} Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Comparison Table */}
      <section className="space-y-6 pt-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Detailed Comparison</p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Plan Feature Breakdown
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0c0f14]">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-[#12161f] text-neutral-400 uppercase font-semibold">
                <th className="py-4 px-6">Feature</th>
                <th className="py-4 px-6 text-center">BASIC</th>
                <th className="py-4 px-6 text-center text-emerald-400">PRO</th>
                <th className="py-4 px-6 text-center text-amber-400">ELITE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-3 px-6 font-medium text-neutral-200">{row.name}</td>
                  <td className="py-3 px-6 text-center">
                    {row.basic ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-600 text-[11px]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {row.pro ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-600 text-[11px]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {row.elite ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-600 text-[11px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Membership FAQs */}
      <section className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Frequently Asked Questions</p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Common Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="p-5 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">Can I freeze my membership?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yes. Quarterly and Annual memberships can be placed on hold for up to 30 days per year with zero penalty fees via your member portal settings.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">Are there guest passes included?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              PRO and ELITE members receive 2 complimentary guest passes per month so training partners can accompany you for workouts.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">How do trainer sessions work in ELITE?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              ELITE includes 3 dedicated 1-on-1 private training sessions per week with customized periodization and weekly InBody scans.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">Are locker and shower facilities included?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yes, all tiers include full access to digital RFID secure lockers, rain showers, and post-workout grooming stations.
            </p>
          </div>
        </div>
      </section>

      {/* Join Modal */}
      <JoinPlanModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        defaultPlanId={selectedPlanId}
        navigate={navigate}
      />
    </div>
  );
};
