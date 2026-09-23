import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Award, CheckCircle2, Calendar, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Modal } from '../common/Modal';

interface MemberMembershipProps {
  navigate: (path: string) => void;
}

export const MemberMembership: React.FC<MemberMembershipProps> = ({ navigate }) => {
  const { currentMember, plans, updateMember, addPayment } = useApp();
  const { showToast } = useToast();

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-elite');

  if (!currentMember) return null;

  const currentPlan = plans.find((p) => p.id === currentMember.planId) || plans[1];

  const today = new Date();
  const expiry = new Date(currentMember.expiryDate);
  const daysLeft = Math.max(0, Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const handleUpgrade = () => {
    const newPlan = plans.find((p) => p.id === selectedPlanId);
    if (!newPlan) return;

    // Extend 30 days
    const nextExpiry = new Date(today);
    nextExpiry.setDate(nextExpiry.getDate() + 30);

    updateMember(currentMember.id, {
      planId: newPlan.id,
      planName: newPlan.name,
      expiryDate: nextExpiry.toISOString().split('T')[0],
      status: 'Active',
    });

    addPayment({
      memberId: currentMember.id,
      memberName: currentMember.name,
      planName: `${newPlan.name} Upgrade (Monthly)`,
      amount: newPlan.monthlyPrice,
      date: today.toISOString().split('T')[0],
      method: 'Saved Card',
      status: 'Paid',
    });

    showToast(`Membership successfully upgraded to ${newPlan.name}!`, 'success');
    setUpgradeModalOpen(false);
  };

  const handleRenew = () => {
    const nextExpiry = new Date(expiry > today ? expiry : today);
    nextExpiry.setDate(nextExpiry.getDate() + 30);

    updateMember(currentMember.id, {
      expiryDate: nextExpiry.toISOString().split('T')[0],
      status: 'Active',
    });

    addPayment({
      memberId: currentMember.id,
      memberName: currentMember.name,
      planName: `${currentPlan.name} Renewal (30 Days)`,
      amount: currentPlan.monthlyPrice,
      date: today.toISOString().split('T')[0],
      method: 'Saved Card',
      status: 'Paid',
    });

    showToast('Membership renewed for 30 days! Thank you for staying strong.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Active Membership Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#111923] via-[#0f141d] to-[#090c10] border border-emerald-500/30 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Current Plan</span>
              <h2 className="text-2xl font-black text-white uppercase">{currentMember.planName} Tier</h2>
              <p className="text-xs text-neutral-400 mt-0.5">{currentPlan.tagline}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-white tabular-nums">
              ₹{currentPlan.monthlyPrice.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-400"> / month</span>
          </div>
        </div>

        {/* Date and Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1">
            <p className="text-neutral-500 font-semibold uppercase">Started On</p>
            <p className="font-bold text-white font-mono">{currentMember.startDate}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1">
            <p className="text-neutral-500 font-semibold uppercase">Valid Until</p>
            <p className="font-bold text-white font-mono">{currentMember.expiryDate}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1">
            <p className="text-neutral-500 font-semibold uppercase">Remaining Term</p>
            <p className="font-bold text-emerald-400 font-mono">{daysLeft} Days Left</p>
          </div>
        </div>

        {/* Plan Features */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Active Plan Privileges:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
            {currentPlan.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800">
          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Upgrade Tier</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleRenew}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
          >
            Renew 30 Days Early (₹{currentPlan.monthlyPrice})
          </button>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Modal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Upgrade Membership Tier"
        subtitle="Step up your fitness routine with higher coaching support"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {plans.map((p) => {
              const isSelected = p.id === selectedPlanId;
              const isCurrent = p.id === currentMember.planId;
              return (
                <div
                  key={p.id}
                  onClick={() => !isCurrent && setSelectedPlanId(p.id)}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isCurrent
                      ? 'border-neutral-800 bg-neutral-900/40 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'border-emerald-400 bg-emerald-950/30'
                      : 'border-neutral-800 bg-[#12161f] hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase">{p.name}</span>
                      {isCurrent && (
                        <span className="text-[10px] text-neutral-400 uppercase font-mono">(Current)</span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{p.tagline}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-400 tabular-nums">
                    ₹{p.monthlyPrice}/mo
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpgrade}
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Confirm Tier Upgrade
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
