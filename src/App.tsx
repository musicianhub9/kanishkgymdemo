import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GlobalSearch } from './components/common/GlobalSearch';
import { DashboardLayout } from './components/common/DashboardLayout';

// Public Pages
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { MembershipPage } from './components/public/MembershipPage';
import { TrainersPage } from './components/public/TrainersPage';
import { FacilitiesPage } from './components/public/FacilitiesPage';
import { GalleryPage } from './components/public/GalleryPage';
import { ContactPage } from './components/public/ContactPage';
import { LoginPage } from './components/public/LoginPage';
import { RegisterPage } from './components/public/RegisterPage';
import { JoinPlanModal } from './components/public/JoinPlanModal';
import { TrainerDetailModal } from './components/public/TrainerDetailModal';
import { MembershipPlan, Trainer } from './types';

// Member Components
import { MemberDashboard } from './components/member/MemberDashboard';
import { MemberProfile } from './components/member/MemberProfile';
import { MemberMembership } from './components/member/MemberMembership';
import { MemberAttendance } from './components/member/MemberAttendance';
import { MemberWorkout } from './components/member/MemberWorkout';
import { MemberProgress } from './components/member/MemberProgress';
import { MemberTrainer } from './components/member/MemberTrainer';
import { MemberPayments } from './components/member/MemberPayments';
import { MemberAnnouncements } from './components/member/MemberAnnouncements';
import { MemberSettings } from './components/member/MemberSettings';

// Trainer Components
import { TrainerDashboard } from './components/trainer/TrainerDashboard';
import { TrainerMembers } from './components/trainer/TrainerMembers';
import { TrainerWorkouts } from './components/trainer/TrainerWorkouts';
import { TrainerAttendance } from './components/trainer/TrainerAttendance';
import { TrainerSchedule } from './components/trainer/TrainerSchedule';
import { TrainerProgress } from './components/trainer/TrainerProgress';
import { TrainerProfile } from './components/trainer/TrainerProfile';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminMembers } from './components/admin/AdminMembers';
import { AdminTrainers } from './components/admin/AdminTrainers';
import { AdminPlans } from './components/admin/AdminPlans';
import { AdminMemberships } from './components/admin/AdminMemberships';
import { AdminPayments } from './components/admin/AdminPayments';
import { AdminAttendance } from './components/admin/AdminAttendance';
import { AdminWorkouts } from './components/admin/AdminWorkouts';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AdminEvents } from './components/admin/AdminEvents';
import { AdminReports } from './components/admin/AdminReports';
import { AdminSettings } from './components/admin/AdminSettings';

const AppContent: React.FC = () => {
  const { currentRole, currentUser } = useApp();

  // Navigation state initialized from location or default
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  // Modal states
  const [selectedPlanForJoin, setSelectedPlanForJoin] = useState<MembershipPlan | null>(null);
  const [selectedTrainerForDetail, setSelectedTrainerForDetail] = useState<Trainer | null>(null);

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDashboardRoute =
    currentPath.startsWith('/member/') ||
    currentPath.startsWith('/trainer/') ||
    currentPath.startsWith('/admin/');

  // Render appropriate view based on path
  const renderView = () => {
    // Member Routes
    if (currentPath === '/member/dashboard') return <MemberDashboard navigate={navigate} />;
    if (currentPath === '/member/profile') return <MemberProfile navigate={navigate} />;
    if (currentPath === '/member/membership') return <MemberMembership navigate={navigate} />;
    if (currentPath === '/member/attendance') return <MemberAttendance navigate={navigate} />;
    if (currentPath === '/member/workout') return <MemberWorkout navigate={navigate} />;
    if (currentPath === '/member/progress') return <MemberProgress navigate={navigate} />;
    if (currentPath === '/member/trainer') return <MemberTrainer navigate={navigate} />;
    if (currentPath === '/member/payments') return <MemberPayments navigate={navigate} />;
    if (currentPath === '/member/announcements') return <MemberAnnouncements navigate={navigate} />;
    if (currentPath === '/member/settings') return <MemberSettings navigate={navigate} />;

    // Trainer Routes
    if (currentPath === '/trainer/dashboard') return <TrainerDashboard navigate={navigate} />;
    if (currentPath === '/trainer/members') return <TrainerMembers navigate={navigate} />;
    if (currentPath === '/trainer/workouts') return <TrainerWorkouts navigate={navigate} />;
    if (currentPath === '/trainer/attendance') return <TrainerAttendance navigate={navigate} />;
    if (currentPath === '/trainer/schedule') return <TrainerSchedule navigate={navigate} />;
    if (currentPath === '/trainer/progress') return <TrainerProgress navigate={navigate} />;
    if (currentPath === '/trainer/profile') return <TrainerProfile navigate={navigate} />;

    // Admin Routes
    if (currentPath === '/admin/dashboard') return <AdminDashboard navigate={navigate} />;
    if (currentPath === '/admin/members') return <AdminMembers navigate={navigate} />;
    if (currentPath === '/admin/trainers') return <AdminTrainers navigate={navigate} />;
    if (currentPath === '/admin/plans') return <AdminPlans navigate={navigate} />;
    if (currentPath === '/admin/memberships') return <AdminMemberships navigate={navigate} />;
    if (currentPath === '/admin/payments') return <AdminPayments navigate={navigate} />;
    if (currentPath === '/admin/attendance') return <AdminAttendance navigate={navigate} />;
    if (currentPath === '/admin/workouts') return <AdminWorkouts navigate={navigate} />;
    if (currentPath === '/admin/announcements') return <AdminAnnouncements navigate={navigate} />;
    if (currentPath === '/admin/events') return <AdminEvents navigate={navigate} />;
    if (currentPath === '/admin/reports') return <AdminReports navigate={navigate} />;
    if (currentPath === '/admin/settings') return <AdminSettings navigate={navigate} />;

    // Public Routes
    if (currentPath === '/about') return <AboutPage navigate={navigate} />;
    if (currentPath === '/membership') return <MembershipPage navigate={navigate} />;
    if (currentPath === '/trainers') return <TrainersPage navigate={navigate} />;
    if (currentPath === '/facilities') return <FacilitiesPage navigate={navigate} />;
    if (currentPath === '/gallery') return <GalleryPage navigate={navigate} />;
    if (currentPath === '/contact') return <ContactPage navigate={navigate} />;
    if (currentPath === '/login') return <LoginPage navigate={navigate} />;
    if (currentPath === '/register') return <RegisterPage navigate={navigate} />;

    // Default to Home
    return <HomePage navigate={navigate} />;
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#090b0e] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigate={navigate}
      />

      {/* Dynamic Shell: Dashboard vs Public */}
      {isDashboardRoute ? (
        <DashboardLayout currentPath={currentPath} navigate={navigate}>
          {renderView()}
        </DashboardLayout>
      ) : (
        <>
          <Navbar currentPath={currentPath} navigate={navigate} />
          <main className="flex-1">{renderView()}</main>
          <Footer navigate={navigate} />
        </>
      )}

      {/* Global Modals */}
      <JoinPlanModal
        isOpen={!!selectedPlanForJoin}
        onClose={() => setSelectedPlanForJoin(null)}
        defaultPlanId={selectedPlanForJoin?.id || 'plan-pro'}
        navigate={navigate}
      />

      <TrainerDetailModal
        isOpen={!!selectedTrainerForDetail}
        onClose={() => setSelectedTrainerForDetail(null)}
        trainer={selectedTrainerForDetail}
      />

      {/* Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
}
