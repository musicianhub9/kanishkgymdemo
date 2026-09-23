import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from './Avatar';
import { GlobalSearch } from './GlobalSearch';
import {
  LayoutDashboard,
  User,
  CreditCard,
  CalendarCheck,
  Dumbbell,
  TrendingUp,
  Shield,
  Receipt,
  Bell,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Users,
  Award,
  Layers,
  BarChart3,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
  allowedRole?: UserRole;
  title?: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentPath,
  navigate,
  children,
  allowedRole,
  title = 'Kanishk Gym Demo Portal',
  subtitle,
}) => {
  const { currentUser, logout, switchRole, settings, notifications, markNotificationRead } = useApp();
  const { showToast } = useToast();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Role Guard
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#090b0e] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-8 rounded-xl bg-[#0f1319] border border-neutral-800">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Please log in with a demo account to access the {allowedRole || ''} portal.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Go to Login Page
            </button>
            <button
              onClick={() => {
                switchRole(allowedRole || 'member');
              }}
              className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Sign In as {allowedRole || 'Member'} Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return (
      <div className="min-h-screen bg-[#090b0e] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-8 rounded-xl bg-[#0f1319] border border-rose-500/30">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-sm text-neutral-400 mt-2">
            You are logged in as <span className="text-white font-medium capitalize">{currentUser.role}</span>. You do not have permissions to access the {allowedRole} portal.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => {
                if (currentUser.role === 'admin') navigate('/admin/dashboard');
                else if (currentUser.role === 'trainer') navigate('/trainer/dashboard');
                else navigate('/member/dashboard');
              }}
              className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Return to Your Dashboard
            </button>
            <button
              onClick={() => {
                switchRole(allowedRole);
                showToast(`Switched account to ${allowedRole.toUpperCase()} demo.`, 'info');
              }}
              className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Switch to {allowedRole.toUpperCase()} Demo Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Define sidebar navigation items based on role
  const getNavItems = () => {
    if (currentUser.role === 'member') {
      return [
        { label: 'Dashboard', path: '/member/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'My Profile', path: '/member/profile', icon: <User className="w-4 h-4" /> },
        { label: 'My Membership', path: '/member/membership', icon: <Award className="w-4 h-4" /> },
        { label: 'Attendance', path: '/member/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
        { label: 'Workout Plan', path: '/member/workout', icon: <Dumbbell className="w-4 h-4" /> },
        { label: 'Progress', path: '/member/progress', icon: <TrendingUp className="w-4 h-4" /> },
        { label: 'My Trainer', path: '/member/trainer', icon: <Shield className="w-4 h-4" /> },
        { label: 'Payments', path: '/member/payments', icon: <Receipt className="w-4 h-4" /> },
        { label: 'Notifications', path: '/member/notifications', icon: <Bell className="w-4 h-4" /> },
        { label: 'Announcements', path: '/member/announcements', icon: <Megaphone className="w-4 h-4" /> },
        { label: 'Settings', path: '/member/settings', icon: <Settings className="w-4 h-4" /> },
      ];
    } else if (currentUser.role === 'trainer') {
      return [
        { label: 'Dashboard', path: '/trainer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'My Members', path: '/trainer/members', icon: <Users className="w-4 h-4" /> },
        { label: 'Workout Plans', path: '/trainer/workouts', icon: <Dumbbell className="w-4 h-4" /> },
        { label: 'Attendance', path: '/trainer/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
        { label: 'Schedule', path: '/trainer/schedule', icon: <Calendar className="w-4 h-4" /> },
        { label: 'Progress', path: '/trainer/progress', icon: <TrendingUp className="w-4 h-4" /> },
        { label: 'Profile', path: '/trainer/profile', icon: <User className="w-4 h-4" /> },
        { label: 'Notifications', path: '/member/notifications', icon: <Bell className="w-4 h-4" /> },
        { label: 'Settings', path: '/member/settings', icon: <Settings className="w-4 h-4" /> },
      ];
    } else {
      // Admin
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'Members', path: '/admin/members', icon: <Users className="w-4 h-4" /> },
        { label: 'Trainers', path: '/admin/trainers', icon: <Shield className="w-4 h-4" /> },
        { label: 'Membership Plans', path: '/admin/plans', icon: <Award className="w-4 h-4" /> },
        { label: 'Memberships', path: '/admin/memberships', icon: <Layers className="w-4 h-4" /> },
        { label: 'Payments', path: '/admin/payments', icon: <CreditCard className="w-4 h-4" /> },
        { label: 'Attendance', path: '/admin/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
        { label: 'Workouts', path: '/admin/workouts', icon: <Dumbbell className="w-4 h-4" /> },
        { label: 'Announcements', path: '/admin/announcements', icon: <Megaphone className="w-4 h-4" /> },
        { label: 'Events', path: '/admin/events', icon: <Calendar className="w-4 h-4" /> },
        { label: 'Reports', path: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
      ];
    }
  };

  const navItems = getNavItems();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.', 'info');
    navigate('/login');
  };

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    showToast(`Switched active view to ${role.toUpperCase()}.`, 'success');
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'trainer') navigate('/trainer/dashboard');
    else navigate('/member/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-neutral-200 flex flex-col">
      {/* Top Bar Contract for Dashboard */}
      <header className="h-16 bg-[#0c0f14] border-b border-neutral-800/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile trigger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <button
              onClick={() => navigate('/')}
              className="font-bold text-white hover:text-emerald-400 transition-colors uppercase tracking-tight flex items-center gap-1.5"
            >
              <Dumbbell className="w-4 h-4 text-emerald-400" />
              <span>{settings.gymName}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="capitalize font-semibold text-emerald-400">{currentUser.role} Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-300 font-medium truncate max-w-[140px] sm:max-w-xs">{title}</span>
          </div>
        </div>

        {/* Right: Search, Quick Switcher, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Pill for Testing */}
          <div className="hidden md:flex items-center bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-[11px] font-medium text-neutral-400">
            <span className="px-2 text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Role:</span>
            <button
              onClick={() => handleRoleChange('member')}
              className={`px-2 py-1 rounded transition-colors ${
                currentUser.role === 'member'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Member
            </button>
            <button
              onClick={() => handleRoleChange('trainer')}
              className={`px-2 py-1 rounded transition-colors ${
                currentUser.role === 'trainer'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Trainer
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`px-2 py-1 rounded transition-colors ${
                currentUser.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Global Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs text-neutral-400 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <span className="hidden sm:inline text-[10px] font-mono bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
              ⌘K
            </span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-850 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0c0f14]" />
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0f1319] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-[#12161f]">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Notifications ({unreadCount} new)
                  </span>
                  <button
                    onClick={() => {
                      navigate(
                        currentUser.role === 'admin'
                          ? '/admin/dashboard'
                          : currentUser.role === 'trainer'
                          ? '/trainer/dashboard'
                          : '/member/notifications'
                      );
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-850">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs cursor-pointer hover:bg-neutral-850 transition-colors ${
                        !n.read ? 'bg-emerald-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-white tracking-tight">{n.title}</p>
                        <span className="text-[10px] text-neutral-500 whitespace-nowrap">{n.date}</span>
                      </div>
                      <p className="text-neutral-400 text-[11px] mt-1 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-850 transition-colors text-left"
            >
              <Avatar name={currentUser.name} size="sm" role={currentUser.role} />
              <div className="hidden lg:block text-left pr-1">
                <p className="text-xs font-semibold text-white leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider capitalize">
                  {currentUser.role}
                </p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[#0f1319] border border-neutral-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-100"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-neutral-800 mb-1">
                  <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                  <p className="text-[11px] text-neutral-400 truncate">{currentUser.email}</p>
                </div>

                <button
                  onClick={() => {
                    navigate(
                      currentUser.role === 'admin'
                        ? '/admin/settings'
                        : currentUser.role === 'trainer'
                        ? '/trainer/profile'
                        : '/member/profile'
                    );
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors text-left"
                >
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate(
                      currentUser.role === 'admin' ? '/admin/settings' : '/member/settings'
                    );
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors text-left"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  <span>View Public Website</span>
                </button>

                <div className="border-t border-neutral-800 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-left font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col bg-[#0b0e13] border-r border-neutral-800/80 transition-all duration-200 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Sidebar Collapse Toggle */}
          <div className="p-3 border-b border-neutral-800/60 flex items-center justify-end">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-white'}>
                    {item.icon}
                  </span>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Action */}
          <div className="p-3 border-t border-neutral-800/60">
            <button
              onClick={() => navigate('/')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-neutral-850 rounded-lg transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              title="Return to website"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Public Website</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-72 h-full bg-[#0b0e13] border-r border-neutral-800 p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-white uppercase tracking-tight">{settings.gymName}</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-neutral-400 hover:text-white rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-neutral-800 pt-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#090b0e]">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-850">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-neutral-400 mt-1">{subtitle}</p>}
              </div>
            </div>

            {/* Injected View Content */}
            {children}
          </div>
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
    </div>
  );
};
