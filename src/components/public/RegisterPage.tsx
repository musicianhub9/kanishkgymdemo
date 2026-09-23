import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Dumbbell, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface RegisterPageProps {
  navigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const { plans, trainers, addMember, addPayment, login, settings } = useApp();
  const { showToast } = useToast();

  const [selectedPlanId, setSelectedPlanId] = useState('plan-pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '1996-08-15',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    address: 'Bandra West, Mumbai',
    emergencyContact: 'Family (+91 98111 22222)',
    trainerId: 't-1',
    password: '',
    confirmPassword: '',
    startingWeight: '76',
    goalWeight: '72',
    height: '178',
  });

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const getPrice = () => {
    if (billingCycle === 'yearly') return selectedPlan.yearlyPrice;
    if (billingCycle === 'quarterly') return selectedPlan.quarterlyPrice;
    return selectedPlan.monthlyPrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    if (form.password && form.password !== form.confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    const assignedTrainer = trainers.find((t) => t.id === form.trainerId) || trainers[0];
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + (billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1));

    const newMember = addMember({
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender,
      address: form.address,
      emergencyContact: form.emergencyContact,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      trainerId: assignedTrainer.id,
      trainerName: assignedTrainer.name,
      startDate,
      expiryDate: expiry.toISOString().split('T')[0],
      status: 'Active',
      attendanceRate: 100,
      currentWeight: parseFloat(form.startingWeight) || 75,
      startingWeight: parseFloat(form.startingWeight) || 75,
      goalWeight: parseFloat(form.goalWeight) || 70,
      height: parseFloat(form.height) || 175,
      chest: 38,
      waist: 32,
      biceps: 14,
      prBench: 70,
      prSquat: 95,
      prDeadlift: 120,
      notes: 'Self-registered member via web enrollment.',
    });

    addPayment({
      memberId: newMember.id,
      memberName: newMember.name,
      planName: `${selectedPlan.name} (${billingCycle.toUpperCase()})`,
      amount: getPrice(),
      date: startDate,
      method: 'Online Card / UPI',
      status: 'Paid',
    });

    login('member', newMember.email);
    showToast(`Welcome ${newMember.name}! Your account and membership are active.`, 'success');
    navigate('/member/dashboard');
  };

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <Dumbbell className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black uppercase text-white">Join {settings.gymName}</h1>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Complete your athlete enrollment form and get immediate access to our facility, trainers, and progress tracking dashboard.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#0f1319] border border-neutral-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Select Plan */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              1. Choose Membership Plan & Cadence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plans.map((p) => {
                const isSelected = p.id === selectedPlanId;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400'
                        : 'border-neutral-800 bg-[#12161f] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">{p.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-lg font-black text-white mt-1 tabular-nums">
                      ₹{p.monthlyPrice}
                      <span className="text-[10px] text-neutral-400 font-normal">/mo</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">{p.tagline}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              {(['monthly', 'quarterly', 'yearly'] as const).map((cycle) => (
                <button
                  type="button"
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`py-2 px-4 rounded-lg text-xs font-medium capitalize border transition-all cursor-pointer ${
                    billingCycle === cycle
                      ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300'
                      : 'border-neutral-800 bg-[#12161f] text-neutral-400 hover:text-white'
                  }`}
                >
                  {cycle} billing {cycle === 'yearly' ? '(Save 20%)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Personal Profile */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              2. Personal & Physical Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sameer Kapoor"
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="sameer@example.com"
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98000 00000"
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Assign Coach / Trainer</label>
                <select
                  value={form.trainerId}
                  onChange={(e) => setForm({ ...form, trainerId: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.specialization})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Current Weight (kg)</label>
                <input
                  type="number"
                  value={form.startingWeight}
                  onChange={(e) => setForm({ ...form, startingWeight: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Goal Weight (kg)</label>
                <input
                  type="number"
                  value={form.goalWeight}
                  onChange={(e) => setForm({ ...form, goalWeight: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white uppercase">
                {selectedPlan.name} Membership ({billingCycle})
              </p>
              <p className="text-[11px] text-neutral-400">Includes complete gym access + digital tracking portal</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400 tabular-nums">
                ₹{getPrice().toLocaleString()}
              </span>
              <p className="text-[10px] text-neutral-500">GST inclusive</p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Already a member? Sign In
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Complete Enrollment & Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
