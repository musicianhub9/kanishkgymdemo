import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import { Dumbbell, Shield, User, ArrowRight, Lock, Mail, CheckCircle2, KeyRound } from 'lucide-react';
import { Modal } from '../common/Modal';

interface LoginPageProps {
  navigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login, settings } = useApp();
  const { showToast } = useToast();

  const [role, setRole] = useState<UserRole>('member');
  const [email, setEmail] = useState('member@kanishkgymdemo.com');
  const [password, setPassword] = useState('Demo@123');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleRoleTabChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'member') {
      setEmail('member@kanishkgymdemo.com');
    } else if (newRole === 'trainer') {
      setEmail('trainer@kanishkgymdemo.com');
    } else {
      setEmail('admin@kanishkgymdemo.com');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(role, email, password);
    if (success) {
      showToast(`Welcome back! Logged in as ${role.toUpperCase()}.`, 'success');
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'trainer') navigate('/trainer/dashboard');
      else navigate('/member/dashboard');
    } else {
      showToast('Invalid credentials. Please select a demo account.', 'error');
    }
  };

  const quickDemoLogin = (targetRole: UserRole) => {
    handleRoleTabChange(targetRole);
    login(targetRole);
    showToast(`Logged in directly as ${targetRole.toUpperCase()} demo user.`, 'success');
    if (targetRole === 'admin') navigate('/admin/dashboard');
    else if (targetRole === 'trainer') navigate('/trainer/dashboard');
    else navigate('/member/dashboard');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your account email address.', 'warning');
      return;
    }
    showToast(`Password reset link dispatched to ${forgotEmail}.`, 'success');
    setForgotPasswordOpen(false);
    setForgotEmail('');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            Sign In to {settings.gymName}
          </h2>
          <p className="text-xs text-neutral-400">
            Access your personalized fitness portal, attendance logs, and workouts.
          </p>
        </div>

        {/* Demo Accounts Callout with 1-Click Buttons */}
        <div className="p-4 rounded-xl bg-[#0f141d] border border-emerald-500/30 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Demo Credentials (1-Click Login)
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">Password: Demo@123</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => quickDemoLogin('member')}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-850 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase group-hover:text-emerald-400">
                  Member
                </span>
                <User className="w-3 h-3 text-neutral-500 group-hover:text-emerald-400" />
              </div>
              <p className="text-[9px] text-neutral-400 truncate mt-0.5">Kanishk (Pro)</p>
            </button>

            <button
              type="button"
              onClick={() => quickDemoLogin('trainer')}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-850 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase group-hover:text-emerald-400">
                  Trainer
                </span>
                <Dumbbell className="w-3 h-3 text-neutral-500 group-hover:text-emerald-400" />
              </div>
              <p className="text-[9px] text-neutral-400 truncate mt-0.5">Alex Vance</p>
            </button>

            <button
              type="button"
              onClick={() => quickDemoLogin('admin')}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-850 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase group-hover:text-amber-400">
                  Admin
                </span>
                <Shield className="w-3 h-3 text-neutral-500 group-hover:text-amber-400" />
              </div>
              <p className="text-[9px] text-neutral-400 truncate mt-0.5">Manager</p>
            </button>
          </div>
        </div>

        {/* Login Form Box */}
        <div className="p-8 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-6 shadow-xl">
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
              {(['member', 'trainer', 'admin'] as const).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => handleRoleTabChange(r)}
                  className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    role === r
                      ? 'bg-emerald-400 text-black shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@kanishkgymdemo.com"
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-300">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#12161f] border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-emerald-400 focus:ring-0"
                />
                <span className="text-xs text-neutral-400">Remember credentials</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to {role.toUpperCase()} Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* New Member Registration Link */}
          <div className="pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
            Don't have an active membership yet?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-emerald-400 font-semibold hover:underline cursor-pointer"
            >
              Register Here
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Reset Account Password"
        subtitle="We will send you a password recovery instructions link"
        maxWidth="md"
      >
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Registered Email Address
            </label>
            <input
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="e.g. member@kanishkgymdemo.com"
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setForgotPasswordOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs uppercase tracking-wider rounded-lg"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Send Reset Instructions</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
