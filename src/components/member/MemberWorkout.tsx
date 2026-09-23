import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Dumbbell, Clock, CheckCircle2, AlertCircle, Play, Info } from 'lucide-react';

interface MemberWorkoutProps {
  navigate: (path: string) => void;
}

export const MemberWorkout: React.FC<MemberWorkoutProps> = () => {
  const { workouts, currentMember, markWorkoutCompleted } = useApp();
  const { showToast } = useToast();

  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const workoutList = workouts.length > 0 ? workouts : [];
  const currentWorkout = workoutList[selectedWorkoutIndex] || workoutList[0];

  const handleToggleExercise = (id: string, name: string) => {
    setCompletedExercises((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!prev[id]) {
        showToast(`Completed: ${name}`, 'info');
      }
      return next;
    });
  };

  const handleFinishWorkout = () => {
    if (currentWorkout) {
      markWorkoutCompleted(currentWorkout.id);
      showToast(`Power session completed! Great effort on ${currentWorkout.name}.`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Day / Split Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {workoutList.map((w, idx) => (
          <button
            key={w.id}
            onClick={() => setSelectedWorkoutIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedWorkoutIndex === idx
                ? 'bg-emerald-400 text-black shadow'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            {w.name}
          </button>
        ))}
      </div>

      {currentWorkout && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Target Group: {currentWorkout.targetMuscle}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentWorkout.duration}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase mt-1">{currentWorkout.name}</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Prescribed by <strong className="text-white">{currentWorkout.trainerName}</strong>
              </p>
            </div>

            <button
              onClick={handleFinishWorkout}
              className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Finish & Log Session
            </button>
          </div>

          {/* Coach Notes */}
          {currentWorkout.notes && (
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white uppercase tracking-wider">Coach Prescription: </span>
                <span>{currentWorkout.notes}</span>
              </div>
            </div>
          )}

          {/* Exercise List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Prescribed Exercises ({(currentWorkout.exercises || currentWorkout.days?.[0]?.exercises || []).length})
            </h3>

            {(currentWorkout.exercises || currentWorkout.days?.[0]?.exercises || []).map((ex: any, idx: number) => {
              const isDone = !!completedExercises[ex.id];
              return (
                <div
                  key={ex.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-[#0f1319] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleExercise(ex.id, ex.name)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-emerald-400 border-emerald-400 text-black'
                            : 'border-neutral-700 text-transparent hover:border-neutral-500'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 fill-current" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neutral-500">{idx + 1}.</span>
                          <h4
                            className={`text-sm font-bold uppercase ${
                              isDone ? 'text-neutral-400 line-through' : 'text-white'
                            }`}
                          >
                            {ex.name}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1">
                          <span className="font-semibold text-emerald-400 font-mono">
                            {ex.sets} Sets
                          </span>
                          <span>·</span>
                          <span className="font-mono">{ex.reps} Reps</span>
                          <span>·</span>
                          <span className="text-neutral-500">Rest: {ex.restSeconds}s</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-[11px] text-neutral-500 font-mono">
                        Target RPE 8-9
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
