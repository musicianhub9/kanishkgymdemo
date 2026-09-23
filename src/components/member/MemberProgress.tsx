import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../common/StatCard';
import { Modal } from '../common/Modal';
import { Scale, TrendingUp, Dumbbell, Award, Plus, Calendar } from 'lucide-react';

interface MemberProgressProps {
  navigate: (path: string) => void;
}

export const MemberProgress: React.FC<MemberProgressProps> = () => {
  const { currentMember, updateMember } = useApp();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weightInput, setWeightInput] = useState(currentMember?.currentWeight || 75);
  const [benchInput, setBenchInput] = useState(currentMember?.prBench || 80);
  const [squatInput, setSquatInput] = useState(currentMember?.prSquat || 110);
  const [deadliftInput, setDeadliftInput] = useState(currentMember?.prDeadlift || 140);
  const [chestInput, setChestInput] = useState(currentMember?.chest || 39);
  const [waistInput, setWaistInput] = useState(currentMember?.waist || 32);
  const [bicepsInput, setBicepsInput] = useState(currentMember?.biceps || 14.5);

  if (!currentMember) return null;

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    updateMember(currentMember.id, {
      currentWeight: Number(weightInput),
      prBench: Number(benchInput),
      prSquat: Number(squatInput),
      prDeadlift: Number(deadliftInput),
      chest: Number(chestInput),
      waist: Number(waistInput),
      biceps: Number(bicepsInput),
    });
    showToast('Athletic records & measurements updated!', 'success');
    setIsModalOpen(false);
  };

  const weightDelta = (currentMember.currentWeight - currentMember.startingWeight).toFixed(1);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header and Log button */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Performance & Biometrics</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Track weight trajectories, circumference measurements, and 1-rep barbell maxes.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Measurement / PR</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Current Bodyweight"
          value={`${currentMember.currentWeight} kg`}
          change={`${weightDelta > '0' ? '+' : ''}${weightDelta} kg since joining`}
          trend="up"
          icon={<Scale className="w-4 h-4" />}
          subtitle={`Goal Target: ${currentMember.goalWeight} kg`}
        />

        <StatCard
          title="Big 3 Total"
          value={`${currentMember.prBench + currentMember.prSquat + currentMember.prDeadlift} kg`}
          change="Powerlifting S/B/D"
          trend="up"
          icon={<Award className="w-4 h-4" />}
          subtitle="Calibrated competition weight"
        />

        <StatCard
          title="Body Recomposition"
          value="Lean Focus"
          change="Waist: 32 in"
          trend="neutral"
          icon={<TrendingUp className="w-4 h-4" />}
          subtitle="InBody audit scheduled weekly"
        />
      </div>

      {/* Personal Records (PRs) */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Verified 1-Rep Max Barbell PRs
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1 text-center">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Flat Bench Press</span>
            <p className="text-3xl font-black text-white tabular-nums">{currentMember.prBench} kg</p>
            <p className="text-[10px] text-emerald-400 font-medium">Verified by {currentMember.trainerName}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1 text-center">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Barbell Back Squat</span>
            <p className="text-3xl font-black text-emerald-400 tabular-nums">{currentMember.prSquat} kg</p>
            <p className="text-[10px] text-emerald-400 font-medium">Depth verified below parallel</p>
          </div>

          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1 text-center">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Conventional Deadlift</span>
            <p className="text-3xl font-black text-white tabular-nums">{currentMember.prDeadlift} kg</p>
            <p className="text-[10px] text-emerald-400 font-medium">Clean lockout</p>
          </div>
        </div>
      </div>

      {/* Body Circumferences */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Body Circumference Measurements (Inches)
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800">
            <p className="text-[10px] uppercase font-bold text-neutral-400">Chest</p>
            <p className="text-2xl font-black text-white mt-1 tabular-nums">{currentMember.chest}"</p>
          </div>
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800">
            <p className="text-[10px] uppercase font-bold text-neutral-400">Waist</p>
            <p className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">{currentMember.waist}"</p>
          </div>
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800">
            <p className="text-[10px] uppercase font-bold text-neutral-400">Flexed Biceps</p>
            <p className="text-2xl font-black text-white mt-1 tabular-nums">{currentMember.biceps}"</p>
          </div>
        </div>
      </div>

      {/* Log Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Progress & Records"
        subtitle="Log your latest scale weight, measurements, or lift PR"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveMetrics} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Bodyweight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={weightInput}
                onChange={(e) => setWeightInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Bench Press PR (kg)</label>
              <input
                type="number"
                required
                value={benchInput}
                onChange={(e) => setBenchInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Squat PR (kg)</label>
              <input
                type="number"
                required
                value={squatInput}
                onChange={(e) => setSquatInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Deadlift PR (kg)</label>
              <input
                type="number"
                required
                value={deadliftInput}
                onChange={(e) => setDeadliftInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Chest (in)</label>
              <input
                type="number"
                step="0.1"
                value={chestInput}
                onChange={(e) => setChestInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Waist (in)</label>
              <input
                type="number"
                step="0.1"
                value={waistInput}
                onChange={(e) => setWaistInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Biceps (in)</label>
              <input
                type="number"
                step="0.1"
                value={bicepsInput}
                onChange={(e) => setBicepsInput(Number(e.target.value))}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Save New Numbers
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
