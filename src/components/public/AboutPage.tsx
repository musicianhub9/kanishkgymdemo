import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Target, Eye, Award, CheckCircle2, Dumbbell, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { settings, trainers } = useApp();

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
          <span className="font-semibold uppercase tracking-wider text-emerald-400">Our Heritage</span>
          <span>·</span>
          <span>Founded 2018</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          About {settings.gymName}
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          We built {settings.gymName} with one unyielding premise: every individual possesses untapped
          athletic potential that simply requires expert guidance, world-class equipment, and a culture of relentless consistency.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Origin</p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            From an Underground Barbell Club to a Premier Commercial Hub
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Starting in 2018 with just four power racks and a handful of dedicated lifters, {settings.gymName} grew
            out of frustration with commercial gyms that prioritized sales quotas over member biomechanics and genuine health outcomes.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Today, our facility serves over 500 active fitness enthusiasts, collegiate competitors, and working professionals.
            We combine high-performance Olympic equipment with modern SaaS progress tracking so our lifters never guess whether they are improving.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Our Mission</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                To eliminate guesswork from strength and conditioning by providing structured coaching, transparent tracking,
                and an ego-free environment where members forge lifelong physical resilience.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Our Vision</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                To establish the benchmark for modern gym facilities globally, merging physical training rigor with intuitive digital software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gym Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl bg-[#0c0f14] border border-neutral-800">
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-white tabular-nums">8+ Years</p>
          <p className="text-xs uppercase tracking-wider text-neutral-400">Coaching Excellence</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-emerald-400 tabular-nums">500+</p>
          <p className="text-xs uppercase tracking-wider text-neutral-400">Active Athletes</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-white tabular-nums">15,000 sq ft</p>
          <p className="text-xs uppercase tracking-wider text-neutral-400">Facility Floor</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-emerald-400 tabular-nums">98%</p>
          <p className="text-xs uppercase tracking-wider text-neutral-400">Member Retention</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">The {settings.gymName} Standard</p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            What Sets Us Apart
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase">Certified Biomechanics Specialists</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every trainer undergoes mandatory continuing education in kinetic chain screening and safe loading protocols.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase">Zero Crowd Bottlenecks</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We cap floor admissions to ensure you never wait 20 minutes for a squat rack or dumbbell pair during peak hours.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f1319] border border-neutral-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase">Comprehensive SaaS Portal</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Log daily workouts, track check-ins, view coach notes, and download official invoices directly on your phone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-10 rounded-2xl bg-gradient-to-r from-[#0d161a] to-[#0c131c] border border-emerald-500/30 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">Experience {settings.gymName} in Person</h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
          Schedule a complimentary 30-minute facility walk-through and body composition scan with our head coach.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Book Free Gym Tour
          </button>
        </div>
      </section>
    </div>
  );
};
