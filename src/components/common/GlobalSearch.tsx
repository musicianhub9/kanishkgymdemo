import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, User, Shield, Dumbbell, Megaphone, FileText, X, ArrowRight } from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, navigate }) => {
  const { members, trainers, plans, announcements, workouts } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedMembers = members
      .filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q))
      .slice(0, 4);

    const matchedTrainers = trainers
      .filter((t) => t.name.toLowerCase().includes(q) || t.specialization.toLowerCase().includes(q))
      .slice(0, 3);

    const matchedPlans = plans
      .filter((p) => p.name.toLowerCase().includes(q) || p.features.some((f) => f.toLowerCase().includes(q)))
      .slice(0, 3);

    const matchedWorkouts = workouts
      .filter((w) => w.name.toLowerCase().includes(q) || w.targetMuscle.toLowerCase().includes(q))
      .slice(0, 3);

    const matchedAnnouncements = announcements
      .filter((a) => a.title.toLowerCase().includes(q) || a.message.toLowerCase().includes(q))
      .slice(0, 3);

    return {
      members: matchedMembers,
      trainers: matchedTrainers,
      plans: matchedPlans,
      workouts: matchedWorkouts,
      announcements: matchedAnnouncements,
      total:
        matchedMembers.length +
        matchedTrainers.length +
        matchedPlans.length +
        matchedWorkouts.length +
        matchedAnnouncements.length,
    };
  }, [query, members, trainers, plans, workouts, announcements]);

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0e1218] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-800 bg-[#12161f]">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search members, trainers, plans, workouts, announcements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {!query.trim() && (
            <div className="py-8 text-center text-neutral-500">
              <p>Type to search across the gym management database</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-neutral-400">
                <span>Try "Kanishk"</span>
                <span>·</span>
                <span>"Alex Vance"</span>
                <span>·</span>
                <span>"PRO"</span>
                <span>·</span>
                <span>"Bench Press"</span>
              </div>
            </div>
          )}

          {results && results.total === 0 && (
            <div className="py-8 text-center text-neutral-400">
              No matching records found for "{query}"
            </div>
          )}

          {/* Members */}
          {results && results.members.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-neutral-400 mb-2 uppercase tracking-wider text-[10px]">
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Members ({results.members.length})</span>
              </div>
              <div className="space-y-1">
                {results.members.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(`/admin/members`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {m.name}
                      </p>
                      <p className="text-neutral-400 text-[11px]">
                        {m.email} · {m.planName} Plan · Trainer: {m.trainerName}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trainers */}
          {results && results.trainers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-neutral-400 mb-2 uppercase tracking-wider text-[10px]">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trainers ({results.trainers.length})</span>
              </div>
              <div className="space-y-1">
                {results.trainers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(`/trainers`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {t.name}
                      </p>
                      <p className="text-neutral-400 text-[11px]">
                        {t.specialization} · {t.experience} Experience
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Membership Plans */}
          {results && results.plans.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-neutral-400 mb-2 uppercase tracking-wider text-[10px]">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Plans ({results.plans.length})</span>
              </div>
              <div className="space-y-1">
                {results.plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/membership`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {p.name} Plan
                      </p>
                      <p className="text-neutral-400 text-[11px]">
                        ₹{p.monthlyPrice}/mo · {p.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Workouts */}
          {results && results.workouts.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-neutral-400 mb-2 uppercase tracking-wider text-[10px]">
                <Dumbbell className="w-3.5 h-3.5 text-purple-400" />
                <span>Workouts ({results.workouts.length})</span>
              </div>
              <div className="space-y-1">
                {results.workouts.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleSelect(`/member/workout`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {w.name}
                      </p>
                      <p className="text-neutral-400 text-[11px]">
                        {w.targetMuscle} · Coach: {w.trainerName}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {results && results.announcements.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-neutral-400 mb-2 uppercase tracking-wider text-[10px]">
                <Megaphone className="w-3.5 h-3.5 text-rose-400" />
                <span>Announcements ({results.announcements.length})</span>
              </div>
              <div className="space-y-1">
                {results.announcements.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(`/member/announcements`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {a.title}
                      </p>
                      <p className="text-neutral-400 text-[11px]">
                        {a.date} · Audience: {a.audience}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
