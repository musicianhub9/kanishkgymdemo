import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { Modal } from '../common/Modal';
import { CalendarCheck, Plus, Search, CheckCircle2, MapPin, Clock } from 'lucide-react';

interface AdminAttendanceProps {
  navigate: (path: string) => void;
}

export const AdminAttendance: React.FC<AdminAttendanceProps> = () => {
  const { attendance, members, checkInToday } = useApp();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');

  const filteredAttendance = attendance.filter((a) =>
    a.memberName.toLowerCase().includes(search.toLowerCase()) || a.date.includes(search)
  );

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMember = members.find((m) => m.id === selectedMemberId);
    if (!targetMember) return;

    checkInToday(targetMember.id);
    showToast(`Turnstile access granted & logged for ${targetMember.name}.`, 'success');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Turnstile Attendance Logs</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time biometric and RFID scan tracking across facility access barriers.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Gate Check-In</span>
        </button>
      </div>

      {/* Filter and Table */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search athlete or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <span className="text-xs font-mono text-neutral-400">
            {filteredAttendance.length} Total Check-in Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Athlete</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Gate Scan Time</th>
                <th className="pb-3 font-semibold">Exit Time</th>
                <th className="pb-3 font-semibold">Gate Location</th>
                <th className="pb-3 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredAttendance.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={log.memberName} size="xs" role="member" />
                      <span className="font-bold text-white">{log.memberName}</span>
                    </div>
                  </td>

                  <td className="py-3 font-mono text-neutral-300">{log.date}</td>
                  <td className="py-3 font-mono font-medium text-emerald-400">{log.checkInTime}</td>
                  <td className="py-3 font-mono text-neutral-400">{log.checkOutTime || 'On Floor'}</td>

                  <td className="py-3 text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Main Turnstile Gate 1</span>
                  </td>

                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Authorized
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Check-In Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Manual Turnstile Override"
        subtitle="Authorize gate entry for a member at the front desk"
        maxWidth="md"
      >
        <form onSubmit={handleManualCheckIn} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Select Member</label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.planName}) - {m.status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Grant Floor Access
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
