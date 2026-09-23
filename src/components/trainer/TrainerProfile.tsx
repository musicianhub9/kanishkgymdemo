import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { Save, Award, Star, Clock, Dumbbell } from 'lucide-react';

interface TrainerProfileProps {
  navigate: (path: string) => void;
}

export const TrainerProfile: React.FC<TrainerProfileProps> = () => {
  const { currentTrainer, updateTrainer } = useApp();
  const { showToast } = useToast();

  if (!currentTrainer) return null;

  const [form, setForm] = useState({
    name: currentTrainer.name,
    specialization: currentTrainer.specialization,
    experience: currentTrainer.experience,
    bio: currentTrainer.bio,
    availability: currentTrainer.availability,
    phone: currentTrainer.phone,
    email: currentTrainer.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTrainer(currentTrainer.id, form);
    showToast('Coach profile details saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row items-center gap-6">
        <Avatar name={currentTrainer.name} size="xl" role="trainer" />
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-black text-white uppercase">{currentTrainer.name}</h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              Staff Coach
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Specialization: <strong className="text-white">{currentTrainer.specialization}</strong> · {currentTrainer.experience} Experience
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 text-xs font-bold pt-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{currentTrainer.rating} / 5.0 Rating</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Public Coach Credentials</h3>
          <p className="text-xs text-neutral-400 mt-0.5">These details appear on the website and client dashboards.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Specialization Focus</label>
              <input
                type="text"
                required
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Years of Coaching Experience</label>
              <input
                type="text"
                required
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Weekly Training Availability</label>
              <input
                type="text"
                required
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Official Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Coach Biography & Philosophy</label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-400 leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Coach Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
