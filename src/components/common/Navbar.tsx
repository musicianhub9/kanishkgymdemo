import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Dumbbell, Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { settings, currentUser } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Membership', path: '/membership' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'admin') return '/admin/dashboard';
    if (currentUser.role === 'trainer') return '/trainer/dashboard';
    return '/member/dashboard';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#090b0e]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-lg'
          : 'bg-transparent border-b border-neutral-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase font-sans">
              {settings.gymName}
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`transition-colors py-1 relative hover:text-white ${
                    isActive ? 'text-emerald-400 font-semibold' : 'text-neutral-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => handleNavClick(getDashboardPath())}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-lg transition-all"
              >
                <UserIcon className="w-4 h-4" />
                <span>My Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/login')}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('/membership')}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-sm"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0f14] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-neutral-800/80 text-emerald-400'
                    : 'text-neutral-300 hover:bg-neutral-800/40 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => handleNavClick(getDashboardPath())}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 rounded-lg"
              >
                <UserIcon className="w-4 h-4" />
                Go to Dashboard ({currentUser.role})
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/login')}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-200 border border-neutral-800 rounded-lg hover:bg-neutral-800/50"
                >
                  Member / Staff Login
                </button>
                <button
                  onClick={() => handleNavClick('/membership')}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg"
                >
                  Join {settings.gymName}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
