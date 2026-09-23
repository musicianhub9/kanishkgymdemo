import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MembershipPlan } from '../../types';
import { Modal } from '../common/Modal';
import { Award, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

interface AdminPlansProps {
  navigate: (path: string) => void;
}

export const AdminPlans: React.FC<AdminPlansProps> = () => {
  const { plans, addPlan, updatePlan, deletePlan, members } = useApp();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    monthlyPrice: 1999,
    quarterlyPrice: 5399,
    yearlyPrice: 19190,
    popular: false,
    features: '',
  });

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setForm({
      name: '',
      tagline: '',
      monthlyPrice: 1999,
      quarterlyPrice: 5399,
      yearlyPrice: 19190,
      popular: false,
      features: 'Full Gym Access, Locker Room, Mobile App',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      tagline: plan.tagline,
      monthlyPrice: plan.monthlyPrice,
      quarterlyPrice: plan.quarterlyPrice,
      yearlyPrice: plan.yearlyPrice,
      popular: !!plan.popular,
      features: plan.features.join(', '),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast('Plan name is required.', 'warning');
      return;
    }

    const featureList = form.features.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingPlan) {
      updatePlan(editingPlan.id, {
        name: form.name,
        tagline: form.tagline,
        monthlyPrice: Number(form.monthlyPrice),
        quarterlyPrice: Number(form.quarterlyPrice),
        yearlyPrice: Number(form.yearlyPrice),
        popular: form.popular,
        features: featureList,
      });
      showToast(`Plan ${form.name} updated.`, 'success');
    } else {
      addPlan({
        name: form.name,
        tagline: form.tagline,
        monthlyPrice: Number(form.monthlyPrice),
        quarterlyPrice: Number(form.quarterlyPrice),
        yearlyPrice: Number(form.yearlyPrice),
        popular: form.popular,
        features: featureList,
      });
      showToast(`New tier ${form.name} created.`, 'success');
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove plan tier "${name}"?`)) {
      deletePlan(id);
      showToast(`Plan ${name} removed.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Membership Packages & Pricing</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Configure monthly, quarterly, and annual subscription tiers with feature privileges.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Tier</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const subscriberCount = members.filter((m) => m.planId === p.id || m.planName === p.name).length;
          return (
            <div
              key={p.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${
                p.popular
                  ? 'bg-gradient-to-b from-[#141d24] to-[#0f1319] border-emerald-500/50'
                  : 'bg-[#0f1319] border-neutral-800'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {p.name}
                  </span>
                  {p.popular && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-black">
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white tabular-nums">
                      ₹{p.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400">/ month</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{p.tagline}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800/80 text-[11px] text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Quarterly:</span>
                    <span className="font-mono font-semibold text-white">₹{p.quarterlyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Annual (20% off):</span>
                    <span className="font-mono font-semibold text-emerald-400">₹{p.yearlyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-neutral-800">
                    <span className="text-neutral-500">Active Athletes:</span>
                    <span className="font-mono font-bold text-white">{subscriberCount} members</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Features Included:</p>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-850">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPlan ? `Edit Tier: ${editingPlan.name}` : 'Create Membership Plan'}
        subtitle="Set pricing tiers and privileges"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Tier Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Pro, Elite, Student"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="e.g. Dedicated coaching for lifters"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Monthly (₹)</label>
              <input
                type="number"
                required
                value={form.monthlyPrice}
                onChange={(e) => setForm({ ...form, monthlyPrice: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Quarterly (₹)</label>
              <input
                type="number"
                required
                value={form.quarterlyPrice}
                onChange={(e) => setForm({ ...form, quarterlyPrice: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Annual (₹)</label>
              <input
                type="number"
                required
                value={form.yearlyPrice}
                onChange={(e) => setForm({ ...form, yearlyPrice: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Features (comma separated)</label>
            <input
              type="text"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              className="rounded border-neutral-700 bg-neutral-900 text-emerald-400 focus:ring-0"
            />
            <span className="text-xs text-white">Highlight as "Most Popular"</span>
          </label>

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
              {editingPlan ? 'Save Tier Changes' : 'Create Tier'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
