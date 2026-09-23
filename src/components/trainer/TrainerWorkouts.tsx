import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Exercise } from '../../types';
import { Modal } from '../common/Modal';
import { Dumbbell, Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';

interface TrainerWorkoutsProps {
  navigate: (path: string) => void;
}

export const TrainerWorkouts: React.FC<TrainerWorkoutsProps> = () => {
  const { workouts, addWorkout, currentTrainer } = useApp();
  const { showToast } = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [targetMuscle, setTargetMuscle] = useState('Full Body');
  const [duration, setDuration] = useState('60 min');
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>([
    { name: 'Barbell Back Squat', sets: 4, reps: '8-10', restSeconds: 90 },
    { name: 'Romanian Deadlift', sets: 3, reps: '10-12', restSeconds: 75 },
  ]);

  const handleAddExerciseRow = () => {
    setExercises((prev) => [
      ...prev,
      { name: '', sets: 3, reps: '10', restSeconds: 60 },
    ]);
  };

  const handleRemoveExerciseRow = (index: number) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExerciseChange = (index: number, field: string, value: any) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleCreateWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please provide a workout routine title.', 'warning');
      return;
    }

    const validExercises: Exercise[] = exercises
      .filter((ex) => ex.name.trim().length > 0)
      .map((ex, i) => ({
        id: `ex-${Date.now()}-${i}`,
        ...ex,
      }));

    if (validExercises.length === 0) {
      showToast('Please add at least one exercise.', 'warning');
      return;
    }

    addWorkout({
      name,
      trainerId: currentTrainer?.id || 't-1',
      trainerName: currentTrainer?.name || 'Coach Alex Vance',
      targetMuscle,
      duration,
      notes,
      exercises: validExercises,
    });

    showToast(`Workout routine "${name}" created and added to library.`, 'success');
    setCreateModalOpen(false);
    setName('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Workout Routine Library</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Build periodized splits, configure rest intervals, and prescribe routines to your athletes.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Build New Routine</span>
        </button>
      </div>

      {/* Routine Cards Grid */}
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
                  <p className="text-xs text-emerald-400 font-medium">Target: {w.targetMuscle}</p>
                </div>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {w.duration}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Exercises ({(w.exercises || w.days?.[0]?.exercises || []).length}):
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {(w.exercises || w.days?.[0]?.exercises || []).map((ex: any, i: number) => (
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
              </div>

              {w.notes && (
                <p className="text-xs text-neutral-400 italic pt-1 leading-relaxed">
                  "{w.notes}"
                </p>
              )}
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              Prescribed by {w.trainerName}
            </div>
          </div>
        ))}
      </div>

      {/* Build Routine Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Build New Workout Routine"
        subtitle="Define exercises, sets, rep ranges, and rest periods"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateWorkout} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-neutral-300 mb-1">Routine Title *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Upper Body Hypertrophy Split"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 50 min"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Target Muscle Group</label>
              <select
                value={targetMuscle}
                onChange={(e) => setTargetMuscle(e.target.value)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Chest & Triceps (Push)">Chest & Triceps (Push)</option>
                <option value="Back & Biceps (Pull)">Back & Biceps (Pull)</option>
                <option value="Legs & Glutes">Legs & Glutes</option>
                <option value="Full Body Athletic">Full Body Athletic</option>
                <option value="Olympic Snatch & Clean">Olympic Snatch & Clean</option>
                <option value="Core & Functional HIIT">Core & Functional HIIT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Prescription Note</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Warm up rotator cuffs before starting"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Exercise Builder Rows */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Exercise Sequence
              </label>
              <button
                type="button"
                onClick={handleAddExerciseRow}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Exercise</span>
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {exercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#12161f] border border-neutral-800 grid grid-cols-12 gap-2 items-center text-xs"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="Exercise Name"
                      value={ex.name}
                      onChange={(e) => handleExerciseChange(idx, 'name', e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Sets"
                      value={ex.sets}
                      onChange={(e) =>
                        handleExerciseChange(idx, 'sets', parseInt(e.target.value) || 1)
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1.5 text-white text-center focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Reps"
                      value={ex.reps}
                      onChange={(e) => handleExerciseChange(idx, 'reps', e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1.5 text-white text-center focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Rest(s)"
                      value={ex.restSeconds}
                      onChange={(e) =>
                        handleExerciseChange(idx, 'restSeconds', parseInt(e.target.value) || 30)
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1.5 text-white text-center focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveExerciseRow(idx)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Save Routine to Library
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
