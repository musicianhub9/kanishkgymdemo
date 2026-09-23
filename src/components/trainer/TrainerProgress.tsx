import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { TrendingUp, Scale, Award, MessageSquarePlus } from 'lucide-react';

interface TrainerProgressProps {
  navigate: (path: string) => void;
}

export const TrainerProgress: React.FC<TrainerProgressProps> = () => {
  const { currentTrainer, members, updateMember } = useApp();
  const { showToast } = useToast();

  const [activeNoteMemberId, setActiveNoteMemberId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  if (!currentTrainer) return null;

  const assignedMembers = members.filter(
    (m) => m.trainerId === currentTrainer.id || m.trainerName === currentTrainer.name
  );

  const handleSaveNote = (memberId: string) => {
    updateMember(memberId, { notes: noteText });
    showToast('Coaching feedback logged for athlete profile.', 'success');
    setActiveNoteMemberId(null);
    setNoteText('');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800">
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">Athlete Progress Reviews</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Monitor weight recomposition, lift personal records, and document technical audits.
        </p>
      </div>

      <div className="space-y-4">
        {assignedMembers.map((m) => {
          const delta = (m.currentWeight - m.startingWeight).toFixed(1);
          return (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} size="md" role="member" />
                  <div>
                    <h3 className="text-base font-bold text-white uppercase">{m.name}</h3>
                    <p className="text-xs text-neutral-400">{m.planName} · Joined {m.startDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right">
                    <span className="text-neutral-500 uppercase text-[10px] block">Weight Change</span>
                    <span className="text-white font-bold">{m.currentWeight} kg ({delta > '0' ? `+${delta}` : delta} kg)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 uppercase text-[10px] block">Target Goal</span>
                    <span className="text-emerald-400 font-bold">{m.goalWeight} kg</span>
                  </div>
                </div>
              </div>

              {/* Verified Lift PRs */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Bench Press</span>
                  <p className="text-xl font-black text-white mt-1 tabular-nums">{m.prBench} kg</p>
                </div>
                <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Back Squat</span>
                  <p className="text-xl font-black text-emerald-400 mt-1 tabular-nums">{m.prSquat} kg</p>
                </div>
                <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Deadlift</span>
                  <p className="text-xl font-black text-white mt-1 tabular-nums">{m.prDeadlift} kg</p>
                </div>
              </div>

              {/* Coach Remarks */}
              <div className="pt-2">
                {activeNoteMemberId === m.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add coaching assessment remarks..."
                      className="w-full bg-[#12161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveNoteMemberId(null)}
                        className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNote(m.id)}
                        className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-lg"
                      >
                        Save Remarks
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#12161f] border border-neutral-800 text-xs">
                    <p className="text-neutral-300">
                      <strong className="text-white">Coach Notes: </strong>
                      {m.notes || 'No remarks recorded yet.'}
                    </p>
                    <button
                      onClick={() => {
                        setActiveNoteMemberId(m.id);
                        setNoteText(m.notes || '');
                      }}
                      className="text-xs text-emerald-400 font-semibold hover:underline ml-4 whitespace-nowrap cursor-pointer"
                    >
                      Edit Notes
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
