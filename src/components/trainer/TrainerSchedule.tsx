import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Calendar, Clock, Plus, CheckCircle2, User, ChevronRight } from 'lucide-react';

interface TrainerScheduleProps {
  navigate: (path: string) => void;
}

export const TrainerSchedule: React.FC<TrainerScheduleProps> = () => {
  const { currentTrainer, schedule, addScheduleItem, updateScheduleItem, members } = useApp();
  const { showToast } = useToast();

  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [clientName, setClientName] = useState(members[0]?.name || '');
  const [sessionDay, setSessionDay] = useState('Monday');
  const [sessionTime, setSessionTime] = useState('09:00 AM');
  const [sessionType, setSessionType] = useState('Strength & Hypertrophy');

  if (!currentTrainer) return null;

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredSchedule = schedule.filter((s) => {
    const isMySession = s.trainerId === currentTrainer.id || s.trainerName === currentTrainer.name;
    if (!isMySession) return false;
    if (selectedDay === 'All') return true;
    return s.day === selectedDay;
  });

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) {
      showToast('Please select a client.', 'warning');
      return;
    }

    addScheduleItem({
      trainerId: currentTrainer.id,
      trainerName: currentTrainer.name,
      clientName,
      day: sessionDay,
      time: sessionTime,
      type: sessionType,
      status: 'Scheduled',
    });

    showToast(`Training slot booked with ${clientName} on ${sessionDay} at ${sessionTime}.`, 'success');
    setModalOpen(false);
  };

  const handleToggleComplete = (id: string, name: string) => {
    updateScheduleItem(id, { status: 'Completed' });
    showToast(`Session with ${name} marked as completed.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Coaching Schedule & Bookings</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Organize personal training appointments, biometric reassessments, and client clinics.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Book Client Slot</span>
        </button>
      </div>

      {/* Day Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedDay === day
                ? 'bg-emerald-400 text-black shadow'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchedule.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-[#0f1319] border border-neutral-800 flex items-center justify-between hover:border-neutral-700 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <span className="text-[10px] font-mono text-neutral-400 block">{s.day.slice(0, 3)}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{s.time}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{s.clientName}</h4>
                <p className="text-xs text-neutral-400 mt-0.5">{s.type}</p>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">{s.day}</span>
              </div>
            </div>

            <div>
              {s.status === 'Completed' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </span>
              ) : (
                <button
                  onClick={() => handleToggleComplete(s.id, s.clientName)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Session Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Book 1-on-1 Coaching Session"
        subtitle="Schedule a private training slot with an assigned athlete"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSession} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Select Client</label>
            <select
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {members.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.planName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Day of Week</label>
              <select
                value={sessionDay}
                onChange={(e) => setSessionDay(e.target.value)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Time Slot</label>
              <input
                type="text"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                placeholder="e.g. 10:30 AM"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Session Type</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Strength & Hypertrophy">Strength & Hypertrophy</option>
              <option value="Olympic Weightlifting Technique">Olympic Weightlifting Technique</option>
              <option value="Metabolic Conditioning / HIIT">Metabolic Conditioning / HIIT</option>
              <option value="Biomechanical Assessment">Biomechanical Assessment</option>
              <option value="InBody Progress Audit">InBody Progress Audit</option>
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
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
