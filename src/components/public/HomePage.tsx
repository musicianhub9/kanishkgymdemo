import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Shield,
  Activity,
  Award,
  Zap,
  Star,
  Users,
  Calendar,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { JoinPlanModal } from './JoinPlanModal';
import { TrainerDetailModal } from './TrainerDetailModal';
import { Trainer } from '../../types';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { settings, plans, trainers } = useApp();

  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string>('plan-pro');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);

  const testimonials = [
    {
      name: 'Riya Gupta',
      role: 'Member since Jan 2026',
      rating: 5,
      quote:
        'Kanishk Gym Demo completely transformed my relationship with strength training. Coach Sarah fixed my squat posture and I gained 3kg of lean muscle in 5 months.',
      metrics: '-7.5 kg Fat · +15 kg Deadlift PR',
    },
    {
      name: 'Vikram Malhotra',
      role: 'Elite Member',
      rating: 5,
      quote:
        'The Eleiko power bars and dedicated Olympic platforms are unmatched in the city. The trainer programming and app tracking make accountability effortless.',
      metrics: 'Bench 120 kg · Squat 160 kg',
    },
    {
      name: 'Arjun Mehta',
      role: 'Pro Member',
      rating: 5,
      quote:
        'Between long work hours, having my workout plan ready on my phone with exact sets and reps keeps me disciplined. Best gym investment I have ever made.',
      metrics: '76% Attendance Streak in 6 Months',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Athletic Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Subtitle */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-emerald-400">
                  Apex Athletic Performance
                </span>
                <span className="text-neutral-500">·</span>
                <span>Open 7 Days</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] text-balance">
                TRAIN HARD. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-lime-300">
                  LIVE STRONG.
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Your complete fitness journey starts here. Train with expert coaches, track your progress
                with our real-time member portal, and build lifelong strength in a world-class facility.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={() => {
                    setSelectedPlanForModal('plan-pro');
                    setIsJoinModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/membership')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white font-semibold uppercase tracking-wider text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Explore Memberships
                </button>
              </div>

              {/* Quick social proof */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Lock-in Contracts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Free Initial PT Session</span>
                </div>
              </div>
            </div>

            {/* Right Athletic Feature Hero Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#141a24] to-[#0c1017] border border-neutral-800 p-6 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {settings.gymName} Live Status
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 tabular-nums">● LIVE</span>
                </div>

                {/* Simulated Athletic Visual Graphic */}
                <div className="my-6 p-6 rounded-xl bg-[#090b0e] border border-neutral-850 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Current Floor Capacity</span>
                    <span className="text-white font-mono font-bold">58% (Moderate)</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[58%]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                      <p className="text-[10px] text-neutral-400 uppercase">Today's Focus</p>
                      <p className="text-xs font-bold text-white mt-0.5">Heavy Upper & HIIT</p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                      <p className="text-[10px] text-neutral-400 uppercase">Coaches on Duty</p>
                      <p className="text-xs font-bold text-emerald-400 mt-0.5">5 Certified Trainers</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase">Member Portal Integrated</p>
                      <p className="text-[11px] text-neutral-400">Track workouts & attendance 24/7</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
                  >
                    Login →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gym Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl bg-[#0d1017] border border-neutral-800/80">
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">500+</p>
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Active Members</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums">12</p>
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Expert Trainers</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">25+</p>
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Training Programs</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums">7 Days</p>
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Open Every Week</p>
          </div>
        </div>
      </section>

      {/* Why Kanishk Gym Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Why Train With Us</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Built For Real Athletic Transformation
          </h2>
          <p className="text-sm text-neutral-400">
            We reject gimmick workouts and empty promises. Every square foot of our gym is engineered for measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Expert Trainers</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Certified strength and conditioning specialists (CSCS, ACE, USAW) providing hands-on biomechanics coaching and zero ego.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Modern Equipment</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tournament Eleiko bars, competition calibrated plates, custom power racks, Assault bikes, and sprint turf lanes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Personalized Plans</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Hypertrophy, fat loss, or strength regimes tailored to your body type, schedule, and joint mechanics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Progress Tracking</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Interactive Member Portal records daily workout completions, check-in streaks, weight trajectories, and PRs.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Membership Tiers</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Transparent, Flexible Plans
            </h2>
          </div>
          <button
            onClick={() => navigate('/membership')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View All Plans & Features</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-[#121824] border-2 border-emerald-400 shadow-xl shadow-emerald-950/20'
                  : 'bg-[#0f1319] border border-neutral-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">{plan.name}</h3>
                  {plan.popular && (
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-black">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-2 min-h-[32px]">{plan.tagline}</p>

                <div className="mt-4 pb-4 border-b border-neutral-800">
                  <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                    ₹{plan.monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium"> / month</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-neutral-300">
                  {plan.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setSelectedPlanForModal(plan.id);
                    setIsJoinModalOpen(true);
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-md'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Coaching Staff</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Learn From Elite Coaches
            </h2>
          </div>
          <button
            onClick={() => navigate('/trainers')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View All Trainers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.slice(0, 4).map((trainer) => (
            <div
              key={trainer.id}
              className="p-5 rounded-xl bg-[#0f1319] border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all group"
            >
              <div className="space-y-3">
                <div className="h-44 w-full rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-750 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-lg mb-2">
                    {trainer.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="text-xs font-bold text-white uppercase">{trainer.name}</span>
                  <span className="text-[11px] text-emerald-400">{trainer.experience} Experience</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{trainer.name}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-1">{trainer.specialization}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-850">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{trainer.rating}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">CSCS / ACE Certified</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setIsTrainerModalOpen(true);
                  }}
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Gym Zones</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            World-Class Facilities
          </h2>
          <p className="text-sm text-neutral-400">
            Dedicated spaces optimized for every training modality, from powerlifting to recovery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Strength Zone', desc: 'Power racks & platforms' },
            { title: 'Cardio Deck', desc: 'Concept2 & Assault' },
            { title: 'Functional Turf', desc: 'Prowler sleds & kettlebells' },
            { title: 'Free Weights', desc: 'Dumbbells up to 60kg' },
            { title: 'Sauna Recovery', desc: 'Contrast therapy' },
            { title: 'PT Private Bay', desc: '1-on-1 assessment zone' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/facilities')}
              className="p-4 rounded-xl bg-[#0f1319] border border-neutral-800 hover:border-emerald-500/40 transition-colors text-center cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 mx-auto mb-3 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Verified Member Results</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Real Athletes. Real Transformations.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="pt-4 border-t border-neutral-850">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{t.name}</h5>
                    <p className="text-[11px] text-neutral-500">{t.role}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t.metrics}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big Conversion Call-to-Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d161a] via-[#101c1f] to-[#0d1716] border border-emerald-500/30 p-8 sm:p-14 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              READY TO START YOUR FITNESS JOURNEY?
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Join {settings.gymName} today. Get instant access to our modern strength floor, digital
              workout plans, and certified personal trainers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedPlanForModal('plan-pro');
                setIsJoinModalOpen(true);
              }}
              className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Join {settings.gymName}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold uppercase tracking-wider text-xs rounded-xl transition-colors cursor-pointer"
            >
              Schedule Gym Tour
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <JoinPlanModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        defaultPlanId={selectedPlanForModal}
        navigate={navigate}
      />

      <TrainerDetailModal
        isOpen={isTrainerModalOpen}
        onClose={() => setIsTrainerModalOpen(false)}
        trainer={selectedTrainer}
      />
    </div>
  );
};
