import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { Award, AlertTriangle, CheckCircle2, Clock, Send, RefreshCw } from 'lucide-react';

interface AdminMembershipsProps {
  navigate: (path: string) => void;
}

export const AdminMemberships: React.FC<AdminMembershipsProps> = () => {
  const { members, updateMember, addPayment, plans } = useApp();
  const { showToast } = useToast();

  const [tab, setTab] = useState<'all' | 'expiring' | 'expired'>('all');

  const today = new Date();

  const membersWithDays = members.map((m) => {
    const exp = new Date(m.expiryDate);
    const diff = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { ...m, daysRemaining: diff };
  });

  const filtered = membersWithDays.filter((m) => {
    if (tab === 'expiring') return m.daysRemaining >= 0 && m.daysRemaining <= 15;
    if (tab === 'expired') return m.daysRemaining < 0 || m.status === 'Expired';
    return true;
  });

  const handleSendReminder = (name: string, email: string) => {
    showToast(`Renewal payment reminder dispatched to ${name} (${email}).`, 'success');
  };

  const handleExtend30Days = (memberId: string, name: string, planName: string) => {
    const targetPlan = plans.find((p) => p.name === planName) || plans[0];
    const newExpiry = new Date(today);
    newExpiry.setDate(newExpiry.getDate() + 30);

    updateMember(memberId, {
      expiryDate: newExpiry.toISOString().split('T')[0],
      status: 'Active',
    });

    addPayment({
      memberId,
      memberName: name,
      planName: `${planName} Admin Renewal (30 Days)`,
      amount: targetPlan.monthlyPrice,
      date: today.toISOString().split('T')[0],
      method: 'Admin Manual Cash/POS',
      status: 'Paid',
    });

    showToast(`Membership for ${name} extended by 30 days. Ledger updated.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">
            Membership Subscriptions & Renewals
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Track subscription lifecycles, monitor upcoming expiries, and automate renewal reminders.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
          {(['all', 'expiring', 'expired'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                tab === t ? 'bg-emerald-400 text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t} {t === 'expiring' ? '(≤15 Days)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Memberships Table */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Member</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Start Date</th>
                <th className="pb-3 font-semibold">Expiry Date</th>
                <th className="pb-3 font-semibold">Term Remaining</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={m.name} size="xs" role="member" />
                      <div>
                        <p className="font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-neutral-400">{m.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 font-medium text-white">{m.planName}</td>
                  <td className="py-3 font-mono text-neutral-400">{m.startDate}</td>
                  <td className="py-3 font-mono text-neutral-300">{m.expiryDate}</td>

                  <td className="py-3">
                    <span
                      className={`font-mono font-bold ${
                        m.daysRemaining <= 0
                          ? 'text-rose-400'
                          : m.daysRemaining <= 7
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {m.daysRemaining <= 0 ? 'Expired' : `${m.daysRemaining} Days`}
                    </span>
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        m.status === 'Active'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>

                  <td className="py-3 text-right space-x-2">
                    <button
                      onClick={() => handleSendReminder(m.name, m.email)}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Send renewal reminder"
                    >
                      Notify
                    </button>
                    <button
                      onClick={() => handleExtend30Days(m.id, m.name, m.planName)}
                      className="px-2.5 py-1 rounded bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      title="Extend 30 days"
                    >
                      +30 Days
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
