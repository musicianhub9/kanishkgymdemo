import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  GymSettings,
  Member,
  Trainer,
  MembershipPlan,
  Payment,
  AttendanceRecord,
  WorkoutProgram,
  ScheduleItem,
  Announcement,
  GymEvent,
  GymNotification,
  User,
  UserRole,
} from '../types';
import {
  initialGymSettings,
  initialMembers,
  initialTrainers,
  initialPlans,
  initialPayments,
  initialWorkoutPrograms,
  initialAnnouncements,
  initialEvents,
  initialNotifications,
  generateDemoAttendance,
  demoAccounts,
} from '../data/demoData';

const initialSchedule: ScheduleItem[] = [
  {
    id: 'sch-1',
    trainerId: 't-1',
    trainerName: 'Alex Vance',
    clientName: 'Kanishk Sharma',
    day: 'Monday',
    time: '07:00 AM - 08:00 AM',
    type: 'Heavy Bench & Scapular Stability',
    status: 'Scheduled',
  },
  {
    id: 'sch-2',
    trainerId: 't-1',
    trainerName: 'Alex Vance',
    clientName: 'Vikram Malhotra',
    day: 'Tuesday',
    time: '06:00 PM - 07:00 PM',
    type: 'Squat Biomechanics & Mobility',
    status: 'Scheduled',
  },
  {
    id: 'sch-3',
    trainerId: 't-1',
    trainerName: 'Alex Vance',
    clientName: 'Tanvi Roy',
    day: 'Thursday',
    time: '08:30 AM - 09:30 AM',
    type: 'Form Check & Core Stabilization',
    status: 'Scheduled',
  },
  {
    id: 'sch-4',
    trainerId: 't-1',
    trainerName: 'Alex Vance',
    clientName: 'Arjun Mehta',
    day: 'Friday',
    time: '07:00 PM - 08:00 PM',
    type: 'Deadlift Setup & Posterior Chain',
    status: 'Scheduled',
  },
];

interface AppContextType {
  // User & Auth
  currentUser: User | null;
  currentRole: UserRole;
  currentMember: Member;
  currentTrainer: Trainer;
  login: (role: UserRole, email?: string, password?: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Settings
  settings: GymSettings;
  updateSettings: (newSettings: Partial<GymSettings>) => void;
  resetDemoData: () => void;

  // Members
  members: Member[];
  addMember: (member: Omit<Member, 'id' | 'createdAt'>) => Member;
  updateMember: (idOrMember: string | Member, partial?: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  getMemberById: (id: string) => Member | undefined;

  // Trainers
  trainers: Trainer[];
  addTrainer: (trainer: Omit<Trainer, 'id'>) => Trainer;
  updateTrainer: (idOrTrainer: string | Trainer, partial?: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;
  getTrainerById: (id: string) => Trainer | undefined;

  // Plans
  plans: MembershipPlan[];
  addPlan: (plan: Omit<MembershipPlan, 'id'>) => MembershipPlan;
  updatePlan: (idOrPlan: string | MembershipPlan, partial?: Partial<MembershipPlan>) => void;
  deletePlan: (id: string) => void;

  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id' | 'invoiceNumber'>) => Payment;

  // Attendance
  attendance: AttendanceRecord[];
  recordAttendance: (memberId: string, date: string, status: 'Present' | 'Absent', checkInTime?: string) => void;
  checkInToday: (memberId: string) => void;

  // Workouts
  workouts: WorkoutProgram[];
  addWorkout: (workout: any) => WorkoutProgram;
  updateWorkout: (workout: any) => void;
  deleteWorkout: (id: string) => void;
  toggleExerciseCompleted: (programId: string, dayName: string, exerciseId: string) => void;
  markWorkoutCompleted: (workoutId: string) => void;

  // Schedule
  schedule: ScheduleItem[];
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  updateScheduleItem: (id: string, partial: Partial<ScheduleItem>) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Announcement;
  updateAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  // Events
  events: GymEvent[];
  addEvent: (event: Omit<GymEvent, 'id'>) => GymEvent;
  updateEvent: (event: GymEvent) => void;
  deleteEvent: (id: string) => void;

  // Notifications
  notifications: GymNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'olf_settings_v2',
  USER: 'olf_user_v2',
  MEMBERS: 'olf_members_v2',
  TRAINERS: 'olf_trainers_v2',
  PLANS: 'olf_plans_v2',
  PAYMENTS: 'olf_payments_v2',
  ATTENDANCE: 'olf_attendance_v2',
  WORKOUTS: 'olf_workouts_v2',
  SCHEDULE: 'olf_schedule_v2',
  ANNOUNCEMENTS: 'olf_announcements_v2',
  EVENTS: 'olf_events_v2',
  NOTIFICATIONS: 'olf_notifications_v2',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const loadState = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`Error loading ${key} from localStorage:`, e);
      return fallback;
    }
  };

  const [settings, setSettings] = useState<GymSettings>(() => {
    const loaded = loadState(STORAGE_KEYS.SETTINGS, initialGymSettings);
    if (!loaded || loaded.gymName === 'ONE LIFE FITNESS') {
      return {
        ...loaded,
        gymName: 'KANISHK GYM DEMO',
        email: 'contact@kanishkgymdemo.com',
        website: 'https://kanishkgymdemo.com',
      };
    }
    return loaded;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    loadState(STORAGE_KEYS.USER, demoAccounts.member.user)
  );

  const [members, setMembers] = useState<Member[]>(() =>
    loadState(STORAGE_KEYS.MEMBERS, initialMembers)
  );

  const [trainers, setTrainers] = useState<Trainer[]>(() =>
    loadState(STORAGE_KEYS.TRAINERS, initialTrainers)
  );

  const [plans, setPlans] = useState<MembershipPlan[]>(() =>
    loadState(STORAGE_KEYS.PLANS, initialPlans)
  );

  const [payments, setPayments] = useState<Payment[]>(() =>
    loadState(STORAGE_KEYS.PAYMENTS, initialPayments)
  );

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    loadState(STORAGE_KEYS.ATTENDANCE, generateDemoAttendance())
  );

  const [workouts, setWorkouts] = useState<WorkoutProgram[]>(() =>
    loadState(STORAGE_KEYS.WORKOUTS, initialWorkoutPrograms)
  );

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() =>
    loadState(STORAGE_KEYS.SCHEDULE, initialSchedule)
  );

  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    loadState(STORAGE_KEYS.ANNOUNCEMENTS, initialAnnouncements)
  );

  const [events, setEvents] = useState<GymEvent[]>(() =>
    loadState(STORAGE_KEYS.EVENTS, initialEvents)
  );

  const [notifications, setNotifications] = useState<GymNotification[]>(() =>
    loadState(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  );

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    if (document) {
      document.title = `${settings.gymName} - Gym Management & Member Portal`;
    }
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Derived current roles
  const currentRole: UserRole = currentUser?.role || 'member';

  const currentMember: Member =
    members.find((m) => m.id === currentUser?.id || m.email === currentUser?.email) ||
    members[0] ||
    initialMembers[0];

  const currentTrainer: Trainer =
    trainers.find((t) => t.id === currentUser?.id || t.email === currentUser?.email) ||
    trainers[0] ||
    initialTrainers[0];

  // Auth functions
  const login = (role: UserRole, email?: string, _password?: string): boolean => {
    const demo = demoAccounts[role];
    if (demo) {
      if (email && email.trim()) {
        const foundMember = members.find((m) => m.email.toLowerCase() === email.toLowerCase());
        if (foundMember && role === 'member') {
          setCurrentUser({
            id: foundMember.id,
            name: foundMember.name,
            email: foundMember.email,
            role: 'member',
            phone: foundMember.phone,
            planId: foundMember.planId,
            trainerId: foundMember.trainerId,
          });
          return true;
        }

        const foundTrainer = trainers.find((t) => t.email.toLowerCase() === email.toLowerCase());
        if (foundTrainer && role === 'trainer') {
          setCurrentUser({
            id: foundTrainer.id,
            name: foundTrainer.name,
            email: foundTrainer.email,
            role: 'trainer',
            phone: foundTrainer.phone,
          });
          return true;
        }
      }

      setCurrentUser(demo.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const demo = demoAccounts[role];
    if (demo) {
      setCurrentUser(demo.user);
    }
  };

  // Settings
  const updateSettings = (newSettings: Partial<GymSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setSettings(initialGymSettings);
    setCurrentUser(demoAccounts.member.user);
    setMembers(initialMembers);
    setTrainers(initialTrainers);
    setPlans(initialPlans);
    setPayments(initialPayments);
    setAttendance(generateDemoAttendance());
    setWorkouts(initialWorkoutPrograms);
    setSchedule(initialSchedule);
    setAnnouncements(initialAnnouncements);
    setEvents(initialEvents);
    setNotifications(initialNotifications);
  };

  // Member CRUD with flexible overload
  const addMember = (data: Omit<Member, 'id' | 'createdAt'>): Member => {
    const id = `m-${Date.now().toString().slice(-4)}`;
    const newMember: Member = {
      ...data,
      id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setMembers((prev) => [newMember, ...prev]);

    const welcomeNotif: GymNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Member Registered',
      message: `${newMember.name} joined with ${newMember.planName} plan.`,
      date: new Date().toISOString().split('T')[0],
      type: 'membership',
      read: false,
      targetRole: 'admin',
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);

    return newMember;
  };

  const updateMember = (idOrMember: string | Member, partial?: Partial<Member>) => {
    if (typeof idOrMember === 'string') {
      setMembers((prev) =>
        prev.map((m) => (m.id === idOrMember ? { ...m, ...(partial || {}) } : m))
      );
      if (currentUser && currentUser.id === idOrMember && partial) {
        setCurrentUser((prev) => (prev ? { ...prev, ...partial } : null));
      }
    } else {
      const updated = idOrMember;
      setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      if (currentUser && currentUser.id === updated.id) {
        setCurrentUser((prev) =>
          prev
            ? {
                ...prev,
                name: updated.name,
                email: updated.email,
                phone: updated.phone,
              }
            : null
        );
      }
    }
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const getMemberById = (id: string) => {
    return members.find((m) => m.id === id);
  };

  // Trainer CRUD
  const addTrainer = (data: Omit<Trainer, 'id'>): Trainer => {
    const id = `t-${Date.now().toString().slice(-3)}`;
    const newTrainer: Trainer = {
      ...data,
      id,
    };
    setTrainers((prev) => [...prev, newTrainer]);
    return newTrainer;
  };

  const updateTrainer = (idOrTrainer: string | Trainer, partial?: Partial<Trainer>) => {
    if (typeof idOrTrainer === 'string') {
      setTrainers((prev) =>
        prev.map((t) => (t.id === idOrTrainer ? { ...t, ...(partial || {}) } : t))
      );
    } else {
      setTrainers((prev) => prev.map((t) => (t.id === idOrTrainer.id ? idOrTrainer : t)));
    }
  };

  const deleteTrainer = (id: string) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
  };

  const getTrainerById = (id: string) => {
    return trainers.find((t) => t.id === id);
  };

  // Plan CRUD
  const addPlan = (data: Omit<MembershipPlan, 'id'>): MembershipPlan => {
    const id = `plan-${Date.now().toString().slice(-4)}`;
    const newPlan: MembershipPlan = {
      ...data,
      id,
    };
    setPlans((prev) => [...prev, newPlan]);
    return newPlan;
  };

  const updatePlan = (idOrPlan: string | MembershipPlan, partial?: Partial<MembershipPlan>) => {
    if (typeof idOrPlan === 'string') {
      setPlans((prev) =>
        prev.map((p) => (p.id === idOrPlan ? { ...p, ...(partial || {}) } : p))
      );
    } else {
      setPlans((prev) => prev.map((p) => (p.id === idOrPlan.id ? idOrPlan : p)));
    }
  };

  const deletePlan = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  // Payments
  const addPayment = (data: Omit<Payment, 'id' | 'invoiceNumber'>): Payment => {
    const randomInvoiceNum = Math.floor(1000 + Math.random() * 9000);
    const invoiceNumber = `INV-${new Date().getFullYear()}-${randomInvoiceNum}`;
    const newPayment: Payment = {
      ...data,
      id: `pay-${Date.now()}`,
      invoiceNumber,
    };
    setPayments((prev) => [newPayment, ...prev]);
    return newPayment;
  };

  // Attendance
  const recordAttendance = (
    memberId: string,
    date: string,
    status: 'Present' | 'Absent',
    checkInTime: string = '07:30 AM'
  ) => {
    const member = members.find((m) => m.id === memberId);
    setAttendance((prev) => {
      const existingIdx = prev.findIndex((a) => a.memberId === memberId && a.date === date);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          status,
          checkInTime: status === 'Present' ? checkInTime : '-',
        };
        return copy;
      } else {
        const newRecord: AttendanceRecord = {
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          memberId,
          memberName: member?.name || 'Member',
          date,
          checkInTime: status === 'Present' ? checkInTime : '-',
          status,
          verifiedBy: 'Staff Check-In',
        };
        return [newRecord, ...prev];
      }
    });
  };

  const checkInToday = (memberId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const hours = new Date().getHours();
    const mins = String(new Date().getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const timeStr = `${String(formattedHours).padStart(2, '0')}:${mins} ${ampm}`;
    recordAttendance(memberId, todayStr, 'Present', timeStr);
  };

  // Workouts
  const addWorkout = (data: any): WorkoutProgram => {
    const id = `prog-${Date.now().toString().slice(-4)}`;
    const newProgram: WorkoutProgram = {
      ...data,
      id,
      exercises: data.exercises || [],
      days: data.days || [
        {
          day: 'Monday',
          focus: data.targetMuscle || 'Full Body',
          exercises: data.exercises || [],
        },
      ],
    };
    setWorkouts((prev) => [newProgram, ...prev]);
    return newProgram;
  };

  const updateWorkout = (updated: any) => {
    setWorkouts((prev) => prev.map((w) => (w.id === updated.id ? { ...w, ...updated } : w)));
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleExerciseCompleted = (programId: string, dayName: string, exerciseId: string) => {
    setWorkouts((prev) =>
      prev.map((prog) => {
        if (prog.id !== programId) return prog;

        // Toggle in exercises list if present
        let updatedExercises = prog.exercises;
        if (updatedExercises && updatedExercises.length > 0) {
          updatedExercises = updatedExercises.map((e) =>
            e.id === exerciseId ? { ...e, completed: !e.completed } : e
          );
        }

        // Toggle in days list if present
        const updatedDays = prog.days?.map((d) => {
          if (d.day !== dayName) return d;
          return {
            ...d,
            exercises: d.exercises.map((ex) => {
              if (ex.id !== exerciseId) return ex;
              return { ...ex, completed: !ex.completed };
            }),
          };
        });

        return {
          ...prog,
          exercises: updatedExercises,
          days: updatedDays,
        };
      })
    );
  };

  const markWorkoutCompleted = (workoutId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newNotif: GymNotification = {
      id: `notif-${Date.now()}`,
      title: 'Workout Logged',
      message: `Workout routine successfully checked off for ${todayStr}. Keep up the discipline!`,
      date: todayStr,
      type: 'workout',
      read: false,
      targetRole: 'member',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Schedule CRUD
  const addScheduleItem = (item: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...item,
      id: `sch-${Date.now()}`,
    };
    setSchedule((prev) => [...prev, newItem]);
  };

  const updateScheduleItem = (id: string, partial: Partial<ScheduleItem>) => {
    setSchedule((prev) => prev.map((s) => (s.id === id ? { ...s, ...partial } : s)));
  };

  // Announcements
  const addAnnouncement = (data: Omit<Announcement, 'id'>): Announcement => {
    const id = `ann-${Date.now().toString().slice(-4)}`;
    const newAnnouncement: Announcement = {
      ...data,
      id,
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    return newAnnouncement;
  };

  const updateAnnouncement = (updated: Announcement) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Events
  const addEvent = (data: Omit<GymEvent, 'id'>): GymEvent => {
    const id = `evt-${Date.now().toString().slice(-4)}`;
    const newEvent: GymEvent = {
      ...data,
      id,
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (updated: GymEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentMember,
        currentTrainer,
        login,
        logout,
        switchRole,
        settings,
        updateSettings,
        resetDemoData,
        members,
        addMember,
        updateMember,
        deleteMember,
        getMemberById,
        trainers,
        addTrainer,
        updateTrainer,
        deleteTrainer,
        getTrainerById,
        plans,
        addPlan,
        updatePlan,
        deletePlan,
        payments,
        addPayment,
        attendance,
        recordAttendance,
        checkInToday,
        workouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        toggleExerciseCompleted,
        markWorkoutCompleted,
        schedule,
        addScheduleItem,
        updateScheduleItem,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
