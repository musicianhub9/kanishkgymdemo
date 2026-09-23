import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../common/StatCard';
import { CalendarCheck, Clock, CheckCircle2, Flame, MapPin } from 'lucide-react';

interface MemberAttendanceProps {
  navigate: (path: string) => void;
}

export const MemberAttendance: React.FC<MemberAttendanceProps> = () => {
  const { currentMember, attendance, checkInToday } = useApp();
  const { showToast } = useToast();

  if (!currentMember) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const memberAttendance = attendance.filter((a) => a.memberId === currentMember.id);
  const checkedInToday = memberAttendance.some((a) => a.date === todayStr);

  const handleCheckIn = () => {
    checkInToday(currentMember.id);
    showToast('Check-in logged! Enjoy your workout session.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Action Box */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Gym Floor Attendance</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Tap to record your physical check-in when arriving at {currentMember.name}'s gym home.
          </p>
        </div>

        {checkedInToday ? (
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Checked In Today</span>
          </div>
        ) : (
          <button
            onClick={handleCheckIn}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Check In Right Now</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Attendance Rate"
          value={`${currentMember.attendanceRate}%`}
          change="+6% vs last month"
          trend="up"
          icon={<CalendarCheck className="w-4 h-4" />}
          subtitle="Calculated over 30 days"
        />

        <StatCard
          title="Total Recorded Visits"
          value={memberAttendance.length}
          trend="neutral"
          icon={<Clock className="w-4 h-4" />}
          subtitle="Official door scan records"
        />

        <StatCard
          title="Active Streak"
          value="4 Days"
          change="Personal Best: 8"
          trend="up"
          icon={<Flame className="w-4 h-4" />}
          subtitle="Consecutive training days"
        />
      </div>

      {/* Attendance History Table */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Check-In Logs</h3>
          <span className="text-[11px] font-mono text-neutral-400">{memberAttendance.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Time In</th>
                <th className="pb-3 font-semibold">Time Out</th>
                <th className="pb-3 font-semibold">Access Point</th>
                <th className="pb-3 text-right font-semibold">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {memberAttendance.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3 font-medium text-white font-mono">{log.date}</td>
                  <td className="py-3 text-neutral-300 font-mono">{log.checkInTime}</td>
                  <td className="py-3 text-neutral-400 font-mono">{log.checkOutTime || '—'}</td>
                  <td className="py-3 text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Turnstile Gate A</span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
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
