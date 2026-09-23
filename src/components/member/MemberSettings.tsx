import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Bell, Lock, Snowflake, Shield, Check } from 'lucide-react';

interface MemberSettingsProps {
  navigate: (path: string) => void;
}

export const MemberSettings: React.FC<MemberSettingsProps> = () => {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    attendanceAlerts: true,
    announcements: true,
    trainerMessages: true,
    marketingPromo: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [freezeDays, setFreezeDays] = useState('14');
  const [freezeReason, setFreezeReason] = useState('Travel / Vacation');

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Notification preferences saved successfully.', 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      showToast('Please fill in current and new password.', 'warning');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    showToast('Account password updated securely.', 'success');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleFreezeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Membership freeze request for ${freezeDays} days submitted to front desk manager.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Notifications */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notification & Dispatch Preferences</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">Control how and when we send workout updates.</p>
        </div>

        <form onSubmit={handleSaveNotifications} className="space-y-3">
          {[
            { key: 'workoutReminders', label: 'Daily Workout Reminders', desc: 'Alert at 7:00 AM if no workout completed' },
            { key: 'attendanceAlerts', label: 'Gym Check-in Verification', desc: 'Instant confirmation when RFID tag is tapped' },
            { key: 'announcements', label: 'Facility Maintenance & Holiday Notices', desc: 'Direct alerts from gym administration' },
            { key: 'trainerMessages', label: 'Direct Coach Feedback & Updates', desc: 'When your assigned trainer modifies your split' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-start justify-between p-3 rounded-xl bg-[#12161f] border border-neutral-800/80 cursor-pointer select-none"
            >
              <div>
                <p className="text-xs font-bold text-white">{item.label}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={(notifications as any)[item.key]}
                onChange={(e) =>
                  setNotifications({ ...notifications, [item.key]: e.target.checked })
                }
                className="mt-1 rounded border-neutral-700 bg-neutral-900 text-emerald-400 focus:ring-0"
              />
            </label>
          ))}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Security & Password</span>
          </h3>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Freeze Membership Policy */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Snowflake className="w-4 h-4 text-sky-400" />
            <span>Temporary Membership Freeze</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Traveling or recovering from an injury? Freeze your plan for up to 30 days per year with zero fees.
          </p>
        </div>

        <form onSubmit={handleFreezeRequest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Freeze Duration</label>
              <select
                value={freezeDays}
                onChange={(e) => setFreezeDays(e.target.value)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="7">7 Days (1 Week)</option>
                <option value="14">14 Days (2 Weeks)</option>
                <option value="21">21 Days (3 Weeks)</option>
                <option value="30">30 Days (Maximum Hold)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Reason for Hold</label>
              <select
                value={freezeReason}
                onChange={(e) => setFreezeReason(e.target.value)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Travel / Vacation">Travel / Vacation</option>
                <option value="Medical / Injury Recovery">Medical / Injury Recovery</option>
                <option value="Work Commitments">Work Commitments</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-sky-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Submit Freeze Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
