import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../common/StatCard';
import { Avatar } from '../common/Avatar';
import {
  Users,
  Calendar,
  Dumbbell,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Plus,
} from 'lucide-react';

interface TrainerDashboardProps {
  navigate: (path: string) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({ navigate }) => {
  const { currentTrainer, members, workouts, schedule, updateScheduleItem } = useApp();
  const { showToast } = useToast();

  if (!currentTrainer) return null;

  // Filter members assigned to this trainer
  const assignedMembers = members.filter(
    (m) => m.trainerId === currentTrainer.id || m.trainerName === currentTrainer.name
  );

  // Filter schedule for this trainer
  const trainerSessions = schedule.filter(
    (s) => s.trainerId === currentTrainer.id || s.trainerName === currentTrainer.name
  );

  const handleMarkSessionComplete = (id: string, clientName: string) => {
    updateScheduleItem(id, { status: 'Completed' });
    showToast(`Training session with ${clientName} marked as completed.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111923] via-[#0f141d] to-[#0a0d12] border border-neutral-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={currentTrainer.name} size="lg" role="trainer" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Coach {currentTrainer.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  {currentTrainer.specialization}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                {assignedMembers.length} active clients assigned · {trainerSessions.length} total scheduled bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/trainer/workouts')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workout Split</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Athletes"
          value={assignedMembers.length}
          change="+2 this month"
          trend="up"
          icon={<Users className="w-4 h-4" />}
          subtitle="Active roster capacity"
        />

        <StatCard
          title="Scheduled Sessions"
          value={trainerSessions.length}
          change="Today: 4 slots"
          trend="neutral"
          icon={<Calendar className="w-4 h-4" />}
          subtitle="1-on-1 & Assessment bookings"
        />

        <StatCard
          title="Active Workout Routines"
          value={workouts.length}
          trend="up"
          icon={<Dumbbell className="w-4 h-4" />}
          subtitle="Prescribed strength plans"
        />

        <StatCard
          title="Client Avg Attendance"
          value="84%"
          change="+5% vs floor avg"
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
          subtitle="Top tier client consistency"
        />
      </div>

      {/* Grid: Schedule & Assigned Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Upcoming Client Sessions
                </h3>
              </div>
              <button
                onClick={() => navigate('/trainer/schedule')}
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                View Full Calendar
              </button>
            </div>

            <div className="space-y-3">
              {trainerSessions.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-xl bg-[#12161f] border border-neutral-800/80 flex items-center justify-between hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 py-1 rounded bg-neutral-900 border border-neutral-800 text-center">
                      <p className="text-[10px] font-mono text-neutral-400">{s.time.split(' ')[0]}</p>
                      <p className="text-[9px] font-bold text-emerald-400 uppercase">{s.time.split(' ')[1]}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">{s.clientName}</p>
                      <p className="text-[11px] text-neutral-400">
                        {s.type} · {s.day}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {s.status === 'Completed' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkSessionComplete(s.id, s.clientName)}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-emerald-400 transition-colors cursor-pointer"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Clients Quick Roster */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Assigned Clients ({assignedMembers.length})
              </h3>
              <button
                onClick={() => navigate('/trainer/members')}
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                Roster
              </button>
            </div>

            <div className="space-y-3">
              {assignedMembers.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-xl bg-[#12161f] border border-neutral-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} size="sm" role="member" />
                    <div>
                      <p className="text-xs font-bold text-white">{m.name}</p>
                      <p className="text-[10px] text-neutral-400">
                        {m.planName} · Attendance: {m.attendanceRate}%
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-white">{m.currentWeight} kg</span>
                    <p className="text-[10px] text-neutral-500">Goal: {m.goalWeight} kg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
