import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../common/StatCard';
import { Avatar } from '../common/Avatar';
import {
  CalendarCheck,
  Flame,
  Scale,
  Award,
  Dumbbell,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Megaphone,
} from 'lucide-react';

interface MemberDashboardProps {
  navigate: (path: string) => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ navigate }) => {
  const { currentMember, workouts, markWorkoutCompleted, attendance, checkInToday, announcements } = useApp();
  const { showToast } = useToast();

  const [completingExerciseId, setCompletingExerciseId] = useState<string | null>(null);

  if (!currentMember) {
    return (
      <div className="p-8 text-center text-neutral-400">
        Member record not found. Please log in with a member account.
      </div>
    );
  }

  // Calculate days remaining in membership
  const today = new Date();
  const expiryDate = new Date(currentMember.expiryDate);
  const diffTime = expiryDate.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Today's attendance check
  const todayStr = today.toISOString().split('T')[0];
  const checkedInToday = attendance.some(
    (a) => a.memberId === currentMember.id && a.date === todayStr
  );

  // Today's assigned workout (e.g. w-1 or member's assigned workout)
  const todayWorkout = workouts[0] || null;

  const handleCheckIn = () => {
    checkInToday(currentMember.id);
    showToast('Checked in successfully! Have a powerhouse workout.', 'success');
  };

  const handleToggleExercise = (exerciseId: string) => {
    setCompletingExerciseId(exerciseId);
    setTimeout(() => {
      setCompletingExerciseId(null);
      showToast('Exercise marked completed.', 'info');
    }, 200);
  };

  const handleCompleteWorkout = () => {
    if (todayWorkout) {
      markWorkoutCompleted(todayWorkout.id);
      showToast(`Great job! Completed workout: "${todayWorkout.name}" logged.`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0f171d] via-[#101920] to-[#0c1218] border border-neutral-800 shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <Avatar name={currentMember.name} size="lg" role="member" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Welcome back, {currentMember.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  {currentMember.planName} Plan
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Assigned Coach: <strong className="text-white">{currentMember.trainerName}</strong> ·
                Membership valid until {currentMember.expiryDate} ({daysRemaining} days left)
              </p>
            </div>
          </div>

          {/* Quick Check-in Button */}
          <div className="flex items-center gap-3">
            {checkedInToday ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Checked In Today</span>
              </div>
            ) : (
              <button
                onClick={handleCheckIn}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Check In To Gym Today</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Rate"
          value={`${currentMember.attendanceRate}%`}
          change="+4% vs last month"
          trend="up"
          icon={<CalendarCheck className="w-4 h-4" />}
          subtitle="18 gym visits recorded this month"
        />

        <StatCard
          title="Current Weight"
          value={`${currentMember.currentWeight} kg`}
          change={`${(currentMember.currentWeight - currentMember.startingWeight).toFixed(1)} kg`}
          trend={currentMember.currentWeight <= currentMember.startingWeight ? 'up' : 'down'}
          icon={<Scale className="w-4 h-4" />}
          subtitle={`Goal: ${currentMember.goalWeight} kg`}
        />

        <StatCard
          title="Workout Streak"
          value="4 Days"
          change="Personal Best: 8 Days"
          trend="up"
          icon={<Flame className="w-4 h-4" />}
          subtitle="Consistency on schedule"
        />

        <StatCard
          title="Membership Status"
          value={currentMember.status}
          change={`${daysRemaining} days left`}
          trend="neutral"
          icon={<Award className="w-4 h-4" />}
          subtitle="Auto-renewal enabled"
        />
      </div>

      {/* Main Grid: Workout Plan & Side Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Assigned Workout */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Today's Prescribed Session
                </span>
                <h3 className="text-lg font-bold text-white uppercase mt-0.5">
                  {todayWorkout ? todayWorkout.name : 'Active Recovery & Stretching'}
                </h3>
              </div>

              {todayWorkout && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {todayWorkout.duration}
                  </span>
                  <button
                    onClick={handleCompleteWorkout}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Log Workout Done
                  </button>
                </div>
              )}
            </div>

            {todayWorkout ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Target Muscle: <strong className="text-white">{todayWorkout.targetMuscle}</strong></span>
                  <span>Coach: <strong className="text-white">{todayWorkout.trainerName}</strong></span>
                </div>

                <div className="space-y-2 pt-2">
                  {(todayWorkout.exercises || todayWorkout.days?.[0]?.exercises || []).map((ex: any, idx: number) => (
                    <div
                      key={ex.id || idx}
                      className="p-3 rounded-xl bg-[#12161f] border border-neutral-800/80 flex items-center justify-between hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center text-xs font-mono font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white uppercase">{ex.name}</p>
                          <p className="text-[11px] text-neutral-400">
                            {ex.sets} Sets × {ex.reps} · Rest {ex.restSeconds || ex.rest || 60}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleExercise(ex.id)}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Complete
                      </button>
                    </div>
                  ))}
                </div>

                {todayWorkout.notes && (
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Coach Note:</strong> {todayWorkout.notes}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-500 text-xs">
                No intense workout scheduled for today. Focus on hydration, 10,000 steps, and mobility.
              </div>
            )}
          </div>

          {/* Quick PR Highlights */}
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Personal Records (1 Rep Max)
              </h3>
              <button
                onClick={() => navigate('/member/progress')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Progress</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800 text-center">
                <p className="text-[10px] uppercase font-semibold text-neutral-400">Bench Press</p>
                <p className="text-xl font-black text-white mt-1 tabular-nums">{currentMember.prBench} kg</p>
              </div>
              <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800 text-center">
                <p className="text-[10px] uppercase font-semibold text-neutral-400">Barbell Squat</p>
                <p className="text-xl font-black text-emerald-400 mt-1 tabular-nums">{currentMember.prSquat} kg</p>
              </div>
              <div className="p-3 rounded-xl bg-[#12161f] border border-neutral-800 text-center">
                <p className="text-[10px] uppercase font-semibold text-neutral-400">Conventional Deadlift</p>
                <p className="text-xl font-black text-white mt-1 tabular-nums">{currentMember.prDeadlift} kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Coach & Announcements */}
        <div className="lg:col-span-4 space-y-6">
          {/* Assigned Coach Card */}
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">My Dedicated Coach</h3>
              <button
                onClick={() => navigate('/member/trainer')}
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                Details
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Avatar name={currentMember.trainerName} size="md" role="trainer" />
              <div>
                <p className="text-sm font-bold text-white">{currentMember.trainerName}</p>
                <p className="text-xs text-emerald-400">CSCS / Biomechanics</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/member/trainer')}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold uppercase tracking-wider text-white rounded-lg transition-colors cursor-pointer"
            >
              Message Coach
            </button>
          </div>

          {/* Announcements Widget */}
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                <Megaphone className="w-3.5 h-3.5 text-rose-400" />
                <span>Gym Announcements</span>
              </div>
              <button
                onClick={() => navigate('/member/announcements')}
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                All ({announcements.length})
              </button>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 2).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-[#12161f] border border-neutral-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white truncate">{a.title}</p>
                    <span className="text-[10px] text-neutral-500 whitespace-nowrap">{a.date}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
