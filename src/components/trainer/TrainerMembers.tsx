import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Member } from '../../types';
import { Avatar } from '../common/Avatar';
import { Modal } from '../common/Modal';
import { Search, Dumbbell, Award, Edit3, CheckCircle2, ChevronRight } from 'lucide-react';

interface TrainerMembersProps {
  navigate: (path: string) => void;
}

export const TrainerMembers: React.FC<TrainerMembersProps> = () => {
  const { currentTrainer, members, workouts, updateMember } = useApp();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(workouts[0]?.id || '');
  const [coachNotes, setCoachNotes] = useState('');

  if (!currentTrainer) return null;

  const assignedMembers = members.filter(
    (m) =>
      (m.trainerId === currentTrainer.id || m.trainerName === currentTrainer.name) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenAssign = (member: Member) => {
    setSelectedMember(member);
    setCoachNotes(member.notes || '');
    setAssignModalOpen(true);
  };

  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    updateMember(selectedMember.id, {
      notes: coachNotes,
    });

    showToast(`Workout routine and coaching notes updated for ${selectedMember.name}.`, 'success');
    setAssignModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Assigned Athlete Roster</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage training plans, monitor weight trajectories, and adjust prescribed volume.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search athlete by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12161f] border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Athletes Table */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Athlete</th>
                <th className="pb-3 font-semibold">Membership</th>
                <th className="pb-3 font-semibold">Attendance</th>
                <th className="pb-3 font-semibold">Weight (Current / Goal)</th>
                <th className="pb-3 font-semibold">Bench / Squat / Deadlift</th>
                <th className="pb-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {assignedMembers.map((m) => (
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

                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400">{m.attendanceRate}%</span>
                      <div className="w-16 bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${m.attendanceRate}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 font-mono">
                    <span className="text-white font-bold">{m.currentWeight} kg</span>
                    <span className="text-neutral-500 text-[11px]"> / {m.goalWeight} kg</span>
                  </td>

                  <td className="py-3 font-mono text-[11px]">
                    <span className="text-neutral-300">{m.prBench}</span> /{' '}
                    <span className="text-emerald-400">{m.prSquat}</span> /{' '}
                    <span className="text-neutral-300">{m.prDeadlift} kg</span>
                  </td>

                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleOpenAssign(m)}
                      className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Update Split
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Routine Modal */}
      <Modal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        title={selectedMember ? `Update Programming: ${selectedMember.name}` : 'Assign Routine'}
        subtitle="Select a workout split and write coaching prescriptions"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAssignment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Select Workout Split Routine
            </label>
            <select
              value={selectedWorkoutId}
              onChange={(e) => setSelectedWorkoutId(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {workouts.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.targetMuscle} - {w.duration})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Coach Prescription & Form Notes
            </label>
            <textarea
              rows={4}
              value={coachNotes}
              onChange={(e) => setCoachNotes(e.target.value)}
              placeholder="e.g. Focus on pausing 1 second at the bottom of back squats. Keep warm-up sets light..."
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setAssignModalOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
