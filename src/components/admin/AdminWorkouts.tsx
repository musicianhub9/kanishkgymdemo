import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { WorkoutProgram } from '../../types';
import { Modal } from '../common/Modal';
import { Dumbbell, Plus, Trash2, Clock } from 'lucide-react';

interface AdminWorkoutsProps {
  navigate: (path: string) => void;
}

export const AdminWorkouts: React.FC<AdminWorkoutsProps> = () => {
  const { workouts, addWorkout, deleteWorkout, trainers } = useApp();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [targetMuscle, setTargetMuscle] = useState('Full Body');
  const [duration, setDuration] = useState('60 min');
  const [trainerId, setTrainerId] = useState(trainers[0]?.id || 't-1');
  const [notes, setNotes] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const trainer = trainers.find((t) => t.id === trainerId) || trainers[0];

    addWorkout({
      name,
      trainerId: trainer.id,
      trainerName: trainer.name,
      targetMuscle,
      duration,
      notes,
      exercises: [
        { id: `ex-${Date.now()}-1`, name: 'Barbell Bench Press', sets: 4, reps: '8-10', restSeconds: 90 },
        { id: `ex-${Date.now()}-2`, name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', restSeconds: 60 },
        { id: `ex-${Date.now()}-3`, name: 'Cable Lateral Raise', sets: 4, reps: '15', restSeconds: 45 },
      ],
    });

    showToast(`Workout routine "${name}" added to master library.`, 'success');
    setModalOpen(false);
    setName('');
  };

  const handleDelete = (id: string, routineName: string) => {
    if (window.confirm(`Delete workout template "${routineName}"?`)) {
      deleteWorkout(id);
      showToast(`Routine removed.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Master Workout Templates</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Standard gym programming splits available for trainer prescription and member app sync.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Workout Template</span>
        </button>
      </div>

      {/* Grid of Workouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4 hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white uppercase">{w.name}</h3>
                  <p className="text-xs text-emerald-400 font-medium">{w.targetMuscle}</p>
                </div>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {w.duration}
                </span>
              </div>

              <div className="space-y-1.5">
                {(w.exercises || w.days?.[0]?.exercises || []).map((ex, i) => (
                  <div
                    key={ex.id || i}
                    className="p-2.5 rounded-lg bg-[#12161f] border border-neutral-800/80 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-white">{ex.name}</span>
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {ex.sets} × {ex.reps} ({ex.restSeconds || ex.rest || 60}s rest)
                    </span>
                  </div>
                ))}
              </div>

              {w.notes && (
                <p className="text-xs text-neutral-400 italic pt-1 leading-relaxed">
                  "{w.notes}"
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-850">
              <span className="text-[11px] text-neutral-500 font-mono">
                Coach: {w.trainerName}
              </span>
              <button
                onClick={() => handleDelete(w.id, w.name)}
                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Master Workout Template"
        subtitle="Add a routine to the gym library"
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Routine Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Posterior Chain & Deadlift Split"
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Target Muscle</label>
              <input
                type="text"
                required
                value={targetMuscle}
                onChange={(e) => setTargetMuscle(e.target.value)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Curating Coach</label>
            <select
              value={trainerId}
              onChange={(e) => setTrainerId(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {trainers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.specialization})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Prescription Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Warm-up guidelines, intensity RPE notes..."
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
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
              Save Template
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
