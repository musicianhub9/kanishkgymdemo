export type UserRole = 'member' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  planId?: string;
  trainerId?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  emergencyContact: string;
  planId: string;
  planName: string;
  trainerId: string;
  trainerName: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Paused' | 'Frozen';
  attendanceRate: number;
  currentWeight: number; // in kg
  startingWeight: number; // in kg
  goalWeight: number; // in kg
  height: number; // in cm
  chest: number; // in inches
  waist: number; // in inches
  biceps: number; // in inches
  prBench: number; // in kg
  prSquat: number; // in kg
  prDeadlift: number; // in kg
  avatar?: string;
  notes?: string;
  createdAt: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  rating: number;
  bio: string;
  certifications: string[];
  availability: string;
  assignedMemberIds: string[];
  programs: string[];
  avatar?: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  duration?: string;
  features: string[];
  trainerIncluded?: boolean;
  popular?: boolean;
  status?: 'Active' | 'Inactive';
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  planName: string;
  amount: number;
  date: string;
  method: 'Credit Card' | 'UPI' | 'Net Banking' | 'Cash' | string;
  status: 'Paid' | 'Pending' | 'Failed';
  tax?: number;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string; // YYYY-MM-DD
  checkInTime: string;
  checkOutTime?: string;
  status: 'Present' | 'Absent';
  verifiedBy?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup?: string;
  sets: number;
  reps: string;
  rest?: string;
  restSeconds?: number;
  instructions?: string;
  completed?: boolean;
}

export interface WorkoutDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutProgram {
  id: string;
  name: string;
  targetMuscle: string;
  trainerId: string;
  trainerName: string;
  assignedMemberIds?: string[];
  days?: WorkoutDay[];
  duration?: string;
  notes?: string;
  exercises?: Exercise[];
  status?: 'Active' | 'Draft';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ScheduleItem {
  id: string;
  trainerId: string;
  trainerName: string;
  clientName: string;
  day: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Announcement {
  id: string;
  title: string;
  category?: 'General' | 'Event' | 'Maintenance' | 'Offer' | 'Schedule' | string;
  message: string;
  audience: 'Everyone' | 'Members' | 'Trainers' | 'All' | string;
  priority?: 'Low' | 'Medium' | 'High';
  date: string;
  status?: 'Published' | 'Draft';
  author?: string;
}

export interface GymEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  audience?: 'All' | 'Members' | 'Trainers';
  status?: 'Upcoming' | 'Completed' | 'Cancelled';
  category: 'Fitness Challenge' | 'Competition' | 'Workshop' | 'Group Class' | 'Special Event' | string;
  maxParticipants?: number;
  registeredCount?: number;
}

export interface GymNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'membership' | 'workout' | 'payment' | 'announcement' | 'trainer';
  read: boolean;
  targetRole?: UserRole;
  targetUserId?: string;
}

export interface GymSettings {
  gymName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  website?: string;
  primaryColor?: string;
  secondaryColor?: string;
  defaultDurationMonths?: number;
  reminderPeriodDays?: number;
  emailNotifications?: boolean;
  membershipReminders?: boolean;
  paymentNotifications?: boolean;
  openingHours?: string | any;
  gstNumber?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  socialLinks?: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
}
