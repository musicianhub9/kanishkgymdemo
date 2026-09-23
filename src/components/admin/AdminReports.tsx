import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { BarChart3, TrendingUp, Users, DollarSign, Award, Star } from 'lucide-react';

interface AdminReportsProps {
  navigate: (path: string) => void;
}

export const AdminReports: React.FC<AdminReportsProps> = () => {
  const { payments, members, trainers, plans } = useApp();

  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

  // Membership tier counts
  const planDistribution = plans.map((p) => {
    const count = members.filter((m) => m.planId === p.id || m.planName === p.name).length;
    const percentage = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
    return { name: p.name, count, percentage, price: p.monthlyPrice };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800">
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">Executive Business Intelligence</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Revenue velocity, retention metrics, and capacity utilization analytics.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Lifetime Collections"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="+24% YoY"
          trend="up"
          icon={<DollarSign className="w-4 h-4" />}
          subtitle="Tax compliant transactions"
        />

        <StatCard
          title="Average Member ARPU"
          value={`₹${Math.round(totalRevenue / Math.max(members.length, 1)).toLocaleString()}`}
          change="Per active athlete"
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
          subtitle="3.8-month average tenure"
        />

        <StatCard
          title="Floor Retention"
          value="96.2%"
          change="+1.5% this quarter"
          trend="up"
          icon={<Users className="w-4 h-4" />}
          subtitle="Churn rate 3.8%"
        />

        <StatCard
          title="Trainer Utilization"
          value="88%"
          change="Near peak capacity"
          trend="neutral"
          icon={<Award className="w-4 h-4" />}
          subtitle="Average 4.2 sessions / day"
        />
      </div>

      {/* Plan Distribution & Floor Rush Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Membership Tier Breakdown
          </h3>

          <div className="space-y-4">
            {planDistribution.map((tier) => (
              <div key={tier.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white uppercase">{tier.name} Tier</span>
                  <span className="font-mono text-neutral-400">
                    {tier.count} members ({tier.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${tier.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Turnstile Density */}
        <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Peak Facility Density by Hour
          </h3>

          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {[
              { hour: '6 AM', load: 85, color: 'bg-emerald-500' },
              { hour: '8 AM', load: 95, color: 'bg-amber-400' },
              { hour: '11 AM', load: 35, color: 'bg-neutral-700' },
              { hour: '2 PM', load: 25, color: 'bg-neutral-800' },
              { hour: '6 PM', load: 100, color: 'bg-rose-500' },
              { hour: '8 PM', load: 90, color: 'bg-amber-400' },
            ].map((slot) => (
              <div key={slot.hour} className="p-3 rounded-xl bg-[#12161f] border border-neutral-800 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">{slot.hour}</span>
                <div className="h-16 flex items-end justify-center">
                  <div
                    className={`w-full rounded-t ${slot.color}`}
                    style={{ height: `${slot.load}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-white block">{slot.load}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trainer Performance Leaderboard */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Staff Coach Performance & Athlete Allocation
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Coach</th>
                <th className="pb-3 font-semibold">Specialization</th>
                <th className="pb-3 font-semibold">Assigned Athletes</th>
                <th className="pb-3 font-semibold">Member Satisfaction</th>
                <th className="pb-3 text-right font-semibold">Floor Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {trainers.map((t) => {
                const assigned = members.filter((m) => m.trainerId === t.id || m.trainerName === t.name).length;
                return (
                  <tr key={t.id} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="py-3 font-bold text-white">{t.name}</td>
                    <td className="py-3 text-emerald-400">{t.specialization}</td>
                    <td className="py-3 font-mono font-bold text-white">{assigned} Athletes</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{t.rating} / 5.0</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        Top Performer
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
