import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Member } from '../../types';
import { Avatar } from '../common/Avatar';
import { Modal } from '../common/Modal';
import { Search, Plus, Trash2, Edit2, Download, UserCheck, ShieldAlert } from 'lucide-react';

interface AdminMembersProps {
  navigate: (path: string) => void;
}

export const AdminMembers: React.FC<AdminMembersProps> = () => {
  const { members, plans, trainers, addMember, updateMember, deleteMember } = useApp();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '1995-05-15',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    address: 'Mumbai',
    emergencyContact: 'Emergency (+91 98000 00000)',
    planId: plans[1]?.id || 'plan-pro',
    trainerId: trainers[0]?.id || 't-1',
    status: 'Active' as 'Active' | 'Expired' | 'Frozen',
    currentWeight: 75,
    goalWeight: 70,
  });

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);

    const matchesPlan = filterPlan === 'All' || m.planName.toLowerCase().includes(filterPlan.toLowerCase());
    const matchesStatus = filterStatus === 'All' || m.status === filterStatus;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: '1995-05-15',
      gender: 'Male',
      address: 'Mumbai',
      emergencyContact: 'Emergency (+91 98000 00000)',
      planId: plans[1]?.id || 'plan-pro',
      trainerId: trainers[0]?.id || 't-1',
      status: 'Active',
      currentWeight: 75,
      goalWeight: 70,
    });
    setAddModalOpen(true);
  };

  const handleOpenEdit = (m: Member) => {
    setSelectedMember(m);
    setFormData({
      name: m.name,
      email: m.email,
      phone: m.phone,
      dob: m.dob,
      gender: m.gender,
      address: m.address,
      emergencyContact: m.emergencyContact,
      planId: m.planId,
      trainerId: m.trainerId,
      status: m.status as any,
      currentWeight: m.currentWeight,
      goalWeight: m.goalWeight,
    });
    setEditModalOpen(true);
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Name and email are required.', 'warning');
      return;
    }

    const plan = plans.find((p) => p.id === formData.planId) || plans[0];
    const trainer = trainers.find((t) => t.id === formData.trainerId) || trainers[0];

    const today = new Date();
    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + 1);

    addMember({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      planId: plan.id,
      planName: plan.name,
      trainerId: trainer.id,
      trainerName: trainer.name,
      startDate: today.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      status: formData.status,
      attendanceRate: 100,
      currentWeight: Number(formData.currentWeight),
      startingWeight: Number(formData.currentWeight),
      goalWeight: Number(formData.goalWeight),
      height: 175,
      chest: 38,
      waist: 32,
      biceps: 14,
      prBench: 70,
      prSquat: 90,
      prDeadlift: 120,
    });

    showToast(`Member ${formData.name} successfully registered.`, 'success');
    setAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const plan = plans.find((p) => p.id === formData.planId) || plans[0];
    const trainer = trainers.find((t) => t.id === formData.trainerId) || trainers[0];

    updateMember(selectedMember.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      planId: plan.id,
      planName: plan.name,
      trainerId: trainer.id,
      trainerName: trainer.name,
      status: formData.status,
      currentWeight: Number(formData.currentWeight),
      goalWeight: Number(formData.goalWeight),
    });

    showToast(`Member details for ${formData.name} updated.`, 'success');
    setEditModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove member ${name}? This action cannot be undone.`)) {
      deleteMember(id);
      showToast(`Member ${name} removed from registry.`, 'info');
    }
  };

  const exportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Plan,Trainer,Status,Attendance\n';
    const rows = filteredMembers
      .map(
        (m) =>
          `"${m.id}","${m.name}","${m.email}","${m.phone}","${m.planName}","${m.trainerName}","${m.status}",${m.attendanceRate}%`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `one-life-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Member roster exported to CSV file.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Controls & Search */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Athlete Registry</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Add, update, and manage member profiles, membership durations, and assigned coaches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="w-full bg-[#12161f] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="All">All Plans</option>
            <option value="Basic">Basic Plan</option>
            <option value="Pro">Pro Plan</option>
            <option value="Elite">Elite Plan</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-[#12161f] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>
      </div>

      {/* Member Table */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Athletes ({filteredMembers.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Athlete</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Assigned Coach</th>
                <th className="pb-3 font-semibold">Expiry Date</th>
                <th className="pb-3 font-semibold">Attendance</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={m.name} size="xs" role="member" />
                      <div>
                        <p className="font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">{m.phone}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 font-medium text-neutral-200">{m.planName}</td>
                  <td className="py-3 text-neutral-400">{m.trainerName}</td>
                  <td className="py-3 font-mono text-neutral-300">{m.expiryDate}</td>
                  <td className="py-3 font-mono text-emerald-400 font-bold">{m.attendanceRate}%</td>

                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        m.status === 'Active'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : m.status === 'Frozen'
                          ? 'bg-sky-950/60 text-sky-400 border border-sky-500/30'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>

                  <td className="py-3 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title="Edit member"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
                      className="p-1.5 rounded hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={addModalOpen || editModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setEditModalOpen(false);
        }}
        title={addModalOpen ? 'Register New Athlete' : `Edit Athlete: ${selectedMember?.name}`}
        subtitle="Configure profile, tier, coach, and membership standing"
        maxWidth="xl"
      >
        <form onSubmit={addModalOpen ? handleSaveNew : handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Membership Plan</label>
              <select
                value={formData.planId}
                onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (₹{p.monthlyPrice}/mo)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Assigned Coach</label>
              <select
                value={formData.trainerId}
                onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
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
              <label className="block text-xs text-neutral-300 mb-1">Standing Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Frozen">Frozen</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Current Weight (kg)</label>
              <input
                type="number"
                value={formData.currentWeight}
                onChange={(e) => setFormData({ ...formData, currentWeight: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Goal Weight (kg)</label>
              <input
                type="number"
                value={formData.goalWeight}
                onChange={(e) => setFormData({ ...formData, goalWeight: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => {
                setAddModalOpen(false);
                setEditModalOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              {addModalOpen ? 'Create Member Record' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
