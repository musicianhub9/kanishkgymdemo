import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { Save, User, Mail, Phone, MapPin, Calendar, Heart, Dumbbell } from 'lucide-react';

interface MemberProfileProps {
  navigate: (path: string) => void;
}

export const MemberProfile: React.FC<MemberProfileProps> = () => {
  const { currentMember, updateMember } = useApp();
  const { showToast } = useToast();

  if (!currentMember) {
    return <div className="p-8 text-neutral-400">Member not logged in.</div>;
  }

  const [form, setForm] = useState({
    name: currentMember.name,
    email: currentMember.email,
    phone: currentMember.phone,
    address: currentMember.address,
    emergencyContact: currentMember.emergencyContact,
    dob: currentMember.dob,
    gender: currentMember.gender,
    currentWeight: currentMember.currentWeight,
    goalWeight: currentMember.goalWeight,
    height: currentMember.height,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMember(currentMember.id, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      emergencyContact: form.emergencyContact,
      dob: form.dob,
      gender: form.gender,
      currentWeight: Number(form.currentWeight),
      goalWeight: Number(form.goalWeight),
      height: Number(form.height),
    });
    showToast('Profile information updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Profile Summary Card */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row items-center gap-6">
        <Avatar name={currentMember.name} size="xl" role="member" />
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-black text-white uppercase">{currentMember.name}</h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              {currentMember.planName}
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Member ID: <span className="font-mono text-neutral-300">{currentMember.id}</span> · Joined: {currentMember.startDate}
          </p>
          <p className="text-xs text-neutral-400">
            Trainer: <strong className="text-white">{currentMember.trainerName}</strong>
          </p>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Edit Personal Information</h3>
          <p className="text-xs text-neutral-400 mt-0.5">Keep your contact and biometric data updated for your coach.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Residential Address</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Emergency Contact</label>
              <div className="relative">
                <Heart className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={form.emergencyContact}
                  onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Biometrics */}
          <div className="pt-4 border-t border-neutral-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Biometrics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Current Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.currentWeight}
                  onChange={(e) => setForm({ ...form, currentWeight: Number(e.target.value) })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Goal Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.goalWeight}
                  onChange={(e) => setForm({ ...form, goalWeight: Number(e.target.value) })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
