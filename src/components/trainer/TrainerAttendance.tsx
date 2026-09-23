import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { CalendarCheck, CheckCircle2, Search, UserCheck } from 'lucide-react';

interface TrainerAttendanceProps {
  navigate: (path: string) => void;
}

export const TrainerAttendance: React.FC<TrainerAttendanceProps> = () => {
  const { currentTrainer, members, attendance, checkInToday } = useApp();
  const { showToast } = useToast();

  const [query, setQuery] = useState('');

  if (!currentTrainer) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const assignedMembers = members.filter(
    (m) =>
      (m.trainerId === currentTrainer.id || m.trainerName === currentTrainer.name) &&
      (m.name.toLowerCase().includes(query.toLowerCase()) || m.email.toLowerCase().includes(query.toLowerCase()))
  );

  const handleManualCheckIn = (memberId: string, memberName: string) => {
    checkInToday(memberId);
    showToast(`Checked in ${memberName} for today's session.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Client Session Check-In</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Verify and log attendance for your assigned personal training athletes.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search client name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#12161f] border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Athlete list */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Assigned Clients Attendance Status (Today: {todayStr})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Athlete</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Overall Attendance</th>
                <th className="pb-3 font-semibold">Today's Check-in</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {assignedMembers.map((m) => {
                const isCheckedIn = attendance.some(
                  (a) => a.memberId === m.id && a.date === todayStr
                );
                return (
                  <tr key={m.id} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={m.name} size="sm" role="member" />
                        <div>
                          <p className="font-bold text-white">{m.name}</p>
                          <p className="text-[11px] text-neutral-400">{m.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-neutral-300 border border-neutral-800">
                        {m.planName}
                      </span>
                    </td>

                    <td className="py-3 font-mono font-bold text-emerald-400">
                      {m.attendanceRate}%
                    </td>

                    <td className="py-3">
                      {isCheckedIn ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Present Today
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-[11px]">Not Checked In Yet</span>
                      )}
                    </td>

                    <td className="py-3 text-right">
                      {isCheckedIn ? (
                        <span className="text-[11px] text-neutral-500 font-mono">Logged</span>
                      ) : (
                        <button
                          onClick={() => handleManualCheckIn(m.id, m.name)}
                          className="px-3 py-1 bg-emerald-400 hover:bg-emerald-300 text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Check In
                        </button>
                      )}
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
