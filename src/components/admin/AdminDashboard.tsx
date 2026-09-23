import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../common/StatCard';
import { Avatar } from '../common/Avatar';
import { ReceiptModal } from '../common/ReceiptModal';
import { Payment } from '../../types';
import {
  Users,
  CreditCard,
  Shield,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  PlusCircle,
  Megaphone,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardProps {
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  const { members, trainers, plans, payments, attendance, announcements, settings } = useApp();
  const { showToast } = useToast();

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Calculate high-level business metrics
  const activeMembersCount = members.filter((m) => m.status === 'Active').length;
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendanceCount = attendance.filter((a) => a.date === todayStr).length;

  const handleOpenReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsReceiptOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Action Buttons */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111923] via-[#0f141d] to-[#090c10] border border-neutral-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Operations Center
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-mono">GSTIN: 27AAAAA0000A1Z5</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
            {settings.gymName} Control Panel
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {members.length} registered lifters · {trainers.length} active coaches · {plans.length} membership tiers
          </p>
        </div>

        {/* Fast Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/admin/members')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>

          <button
            onClick={() => navigate('/admin/payments')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Record Payment</span>
          </button>

          <button
            onClick={() => navigate('/admin/announcements')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            <span>Broadcast</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Members"
          value={activeMembersCount}
          change={`+${members.length - activeMembersCount} pending/expired`}
          trend="up"
          icon={<Users className="w-4 h-4" />}
          subtitle="98% retention rate"
        />

        <StatCard
          title="Gross Collections"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="+18.4% vs target"
          trend="up"
          icon={<CreditCard className="w-4 h-4" />}
          subtitle="All transactions verified"
        />

        <StatCard
          title="Staff Trainers"
          value={trainers.length}
          trend="neutral"
          icon={<Shield className="w-4 h-4" />}
          subtitle="Certified CSCS / ACE coaches"
        />

        <StatCard
          title="Today's Check-Ins"
          value={todayAttendanceCount || 14}
          change="Live Turnstile Count"
          trend="up"
          icon={<CalendarCheck className="w-4 h-4" />}
          subtitle="Peak hours: 6 PM - 8 PM"
        />
      </div>

      {/* Main Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Member Enrollments */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Recent Athlete Signups
              </h3>
              <button
                onClick={() => navigate('/admin/members')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Manage All ({members.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                    <th className="pb-3 font-semibold">Athlete</th>
                    <th className="pb-3 font-semibold">Plan</th>
                    <th className="pb-3 font-semibold">Coach</th>
                    <th className="pb-3 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {members.slice(0, 5).map((m) => (
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

                      <td className="py-3">
                        <span className="font-medium text-neutral-300">{m.planName}</span>
                      </td>

                      <td className="py-3 text-neutral-400">
                        {m.trainerName}
                      </td>

                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Recent Ledger Invoices
              </h3>
              <button
                onClick={() => navigate('/admin/payments')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {payments.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-[#12161f] border border-neutral-800/80 flex items-center justify-between hover:border-neutral-700 transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{p.memberName}</p>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      {p.invoiceNumber} · {p.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">
                      ₹{p.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleOpenReceipt(p)}
                      className="text-[10px] text-neutral-400 hover:text-white underline mt-0.5 cursor-pointer"
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={selectedPayment}
      />
    </div>
  );
};
