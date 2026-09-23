import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Trainer } from '../../types';
import { Avatar } from '../common/Avatar';
import { Modal } from '../common/Modal';
import { Plus, Edit2, Trash2, Star, Award, Shield } from 'lucide-react';

interface AdminTrainersProps {
  navigate: (path: string) => void;
}

export const AdminTrainers: React.FC<AdminTrainersProps> = () => {
  const { trainers, addTrainer, updateTrainer, deleteTrainer, members } = useApp();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);

  const [form, setForm] = useState({
    name: '',
    specialization: 'Strength & Conditioning',
    experience: '5+ Years',
    bio: '',
    rating: 4.9,
    availability: 'Mon - Fri (6 AM - 2 PM)',
    phone: '+91 98000 11111',
    email: '',
    certifications: 'CSCS, ACE-CPT',
    programs: 'Hypertrophy, Powerlifting',
  });

  const handleOpenAdd = () => {
    setEditingTrainer(null);
    setForm({
      name: '',
      specialization: 'Strength & Conditioning',
      experience: '5+ Years',
      bio: '',
      rating: 4.9,
      availability: 'Mon - Fri (6 AM - 2 PM)',
      phone: '+91 98000 11111',
      email: '',
      certifications: 'CSCS, ACE-CPT',
      programs: 'Hypertrophy, Powerlifting',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t: Trainer) => {
    setEditingTrainer(t);
    setForm({
      name: t.name,
      specialization: t.specialization,
      experience: t.experience,
      bio: t.bio,
      rating: t.rating,
      availability: t.availability,
      phone: t.phone,
      email: t.email,
      certifications: t.certifications.join(', '),
      programs: t.programs.join(', '),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast('Trainer name is required.', 'warning');
      return;
    }

    const certList = form.certifications.split(',').map((c) => c.trim()).filter(Boolean);
    const progList = form.programs.split(',').map((p) => p.trim()).filter(Boolean);

    if (editingTrainer) {
      updateTrainer(editingTrainer.id, {
        name: form.name,
        specialization: form.specialization,
        experience: form.experience,
        bio: form.bio,
        rating: Number(form.rating),
        availability: form.availability,
        phone: form.phone,
        email: form.email,
        certifications: certList,
        programs: progList,
      });
      showToast(`Coach ${form.name} credentials updated.`, 'success');
    } else {
      addTrainer({
        name: form.name,
        specialization: form.specialization,
        experience: form.experience,
        bio: form.bio,
        rating: Number(form.rating),
        availability: form.availability,
        phone: form.phone,
        email: form.email || `${form.name.toLowerCase().replace(/\s+/g, '')}@kanishkgymdemo.com`,
        certifications: certList,
        programs: progList,
        assignedMemberIds: [],
        status: 'Active',
      });
      showToast(`Coach ${form.name} appointed to training staff.`, 'success');
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove coach ${name}?`)) {
      deleteTrainer(id);
      showToast(`Coach ${name} removed.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Coaching Staff & Faculty</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Maintain trainer certifications, roster allocations, and client booking schedules.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Appoint Coach</span>
        </button>
      </div>

      {/* Trainers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainers.map((t) => {
          const clientCount = members.filter(
            (m) => m.trainerId === t.id || m.trainerName === t.name
          ).length;

          return (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={t.name} size="md" role="trainer" />
                    <div>
                      <h3 className="text-base font-bold text-white uppercase">{t.name}</h3>
                      <p className="text-xs font-semibold text-emerald-400 mt-0.5">{t.specialization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{t.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">{t.bio}</p>

                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
                  <div className="p-2.5 rounded-lg bg-[#12161f] border border-neutral-800">
                    <span className="text-[10px] uppercase text-neutral-500 block">Experience</span>
                    <span className="text-white font-semibold">{t.experience}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#12161f] border border-neutral-800">
                    <span className="text-[10px] uppercase text-neutral-500 block">Assigned Clients</span>
                    <span className="text-emerald-400 font-bold">{clientCount} Athletes</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-850">
                <span className="text-[11px] text-neutral-500 font-mono">{t.availability}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="p-1.5 rounded hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTrainer ? `Update Coach: ${editingTrainer.name}` : 'Appoint New Trainer'}
        subtitle="Manage credentials, bio, and operational specialization"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Coach Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Specialization</label>
              <input
                type="text"
                required
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Experience</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Shift / Availability</label>
              <input
                type="text"
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Certifications (comma separated)</label>
            <input
              type="text"
              value={form.certifications}
              onChange={(e) => setForm({ ...form, certifications: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Bio / Philosophy</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
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
              {editingTrainer ? 'Save Credentials' : 'Add Coach'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
