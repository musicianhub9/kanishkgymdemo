import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface JoinPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanId?: string;
  navigate: (path: string) => void;
}

export const JoinPlanModal: React.FC<JoinPlanModalProps> = ({
  isOpen,
  onClose,
  defaultPlanId = 'plan-pro',
  navigate,
}) => {
  const { settings, plans, trainers, addMember, addPayment, login } = useApp();
  const { showToast } = useToast();

  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '1998-05-12',
    address: 'Mumbai, Maharashtra',
    emergencyContact: 'Emergency Contact (+91 98000 00000)',
    trainerId: 't-1',
    termsAccepted: true,
  });

  useEffect(() => {
    if (defaultPlanId) {
      setSelectedPlanId(defaultPlanId);
    }
  }, [defaultPlanId]);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const getPrice = () => {
    if (billingCycle === 'yearly') return selectedPlan.yearlyPrice;
    if (billingCycle === 'quarterly') return selectedPlan.quarterlyPrice;
    return selectedPlan.monthlyPrice;
  };

  const getDurationMonths = () => {
    if (billingCycle === 'yearly') return 12;
    if (billingCycle === 'quarterly') return 3;
    return 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showToast('Please fill in your name, email, and phone number.', 'warning');
      return;
    }

    const assignedTrainer = trainers.find((t) => t.id === formData.trainerId) || trainers[0];

    const today = new Date();
    const startDate = today.toISOString().split('T')[0];

    const expiryDateObj = new Date(today);
    expiryDateObj.setMonth(expiryDateObj.getMonth() + getDurationMonths());
    const expiryDate = expiryDateObj.toISOString().split('T')[0];

    const newMember = addMember({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      trainerId: assignedTrainer.id,
      trainerName: assignedTrainer.name,
      startDate,
      expiryDate,
      status: 'Active',
      attendanceRate: 100,
      currentWeight: 75.0,
      startingWeight: 75.0,
      goalWeight: 70.0,
      height: 175,
      chest: 38,
      waist: 32,
      biceps: 14,
      prBench: 80,
      prSquat: 100,
      prDeadlift: 130,
      notes: 'New member registered via online portal.',
    });

    // Record invoice
    addPayment({
      memberId: newMember.id,
      memberName: newMember.name,
      planName: `${selectedPlan.name} ${billingCycle.toUpperCase()} Membership`,
      amount: getPrice(),
      date: startDate,
      method: 'Credit Card',
      status: 'Paid',
    });

    // Auto login as member
    login('member', newMember.email);

    showToast(`Welcome to ${settings.gymName}, ${newMember.name}! Your membership is active.`, 'success');
    onClose();
    navigate('/member/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Join ${settings.gymName}`}
      subtitle="Complete your registration and start training immediately"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tier Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            1. Select Membership Tier
          </label>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((p) => {
              const isSelected = p.id === selectedPlanId;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400'
                      : 'border-neutral-800 bg-[#12161f] hover:border-neutral-700'
                  }`}
                >
                  <p className="text-xs font-bold text-white uppercase">{p.name}</p>
                  <p className="text-base font-black text-emerald-400 mt-1 tabular-nums">
                    ₹{p.monthlyPrice}
                    <span className="text-[10px] text-neutral-400 font-normal">/mo</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Billing Cadence Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            2. Billing Cadence
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['monthly', 'quarterly', 'yearly'] as const).map((cycle) => (
              <button
                type="button"
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`py-2 px-3 rounded-lg text-xs font-medium capitalize border transition-all ${
                  billingCycle === cycle
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300'
                    : 'border-neutral-800 bg-[#12161f] text-neutral-400 hover:text-white'
                }`}
              >
                {cycle} {cycle === 'yearly' ? '(Best Value)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Member Details */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            3. Member Personal Details
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vikram Malhotra"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vikram@example.com"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98200 00000"
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assigned Trainer */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
            4. Preferred Coach / Trainer
          </label>
          <select
            value={formData.trainerId}
            onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
            className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.specialization} ({t.experience})
              </option>
            ))}
          </select>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white uppercase">Total Due Today</p>
            <p className="text-[11px] text-neutral-400">Includes 18% GST and gym RFID tag</p>
          </div>
          <span className="text-2xl font-black text-emerald-400 tabular-nums">
            ₹{getPrice().toLocaleString()}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Confirm & Activate Membership</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </Modal>
  );
};
