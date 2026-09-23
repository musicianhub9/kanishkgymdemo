import React from 'react';
import { Dumbbell, HeartPulse, Activity, Shield, Sparkles, UserCheck, Flame, Moon } from 'lucide-react';

interface FacilitiesPageProps {
  navigate: (path: string) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ navigate }) => {
  const facilities = [
    {
      title: 'Strength Training Zone',
      subtitle: 'Barbell & Heavy Resistance',
      icon: <Dumbbell className="w-5 h-5 text-emerald-400" />,
      desc: 'Equipped with 6 Olympic lifting platforms, heavy-duty Eleiko power racks, calibrated steel plates, and specialized bars (Safety Squat, Trap, Swiss).',
      equipment: ['Eleiko IPF Power Bars', 'Calibrated Plates (450kg+)', 'Deadlift Jacks & Chalk Stations', 'GHD & Reverse Hypers'],
    },
    {
      title: 'Cardio Zone',
      subtitle: 'Aerobic & High-Volume Conditioning',
      icon: <HeartPulse className="w-5 h-5 text-emerald-400" />,
      desc: 'A full fleet of commercial treadmills with shock-absorption decks, curved manual runners, Concept2 rowers, SkiErgs, and Echo bikes.',
      equipment: ['Woodway Curve Treadmills', 'Concept2 Model D Rowers', 'Rogue Echo Bikes', 'StairMaster 10G Gauntlet'],
    },
    {
      title: 'Functional Training Turf',
      subtitle: 'Athletic Agility & Ballistics',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      desc: '30-meter high-density turf track suited for prowler sled pushes, farmers walks, agility ladders, plyometric boxes, and battle ropes.',
      equipment: ['Heavy Prowler Sleds', 'Rogue Medicine Balls', 'Competition Kettlebells (8-48kg)', 'Speed Cones & Hurdle Sets'],
    },
    {
      title: 'Free Weights Deck',
      subtitle: 'Dumbbells & Adjustable Benches',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      desc: 'Urethane dumbbells ranging from 2.5kg to 60kg in 2.5kg increments with ten commercial adjustable benches and mirrors.',
      equipment: ['Urethane Dumbbells (2.5kg - 60kg)', 'Preacher Curl Stations', 'Zero-Gap Adjustable Benches', 'Fixed EZ-Curl Barbells'],
    },
    {
      title: 'Executive Locker Rooms',
      subtitle: 'Showers & Digital RFID Lockers',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      desc: 'Spacious male and female private changing rooms featuring heated floors, luxury rainfall shower stalls, complimentary towel service, and digital locks.',
      equipment: ['RFID Wristband Lockers', 'Rain Shower Enclosures', 'Dyson Supersonic Dryers', 'Shaving & Grooming Vanity'],
    },
    {
      title: 'Personal Training Bay',
      subtitle: '1-on-1 Assessment & Biomechanics',
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
      desc: 'Private dedicated zones for trainer assessments, InBody body-composition scanning, posture screening, and focused client coaching.',
      equipment: ['InBody 570 Composition Analyzer', 'FMS Movement Screen Kit', 'Dual Adjustable Pulley Stack', 'Video Biomechanics Screen'],
    },
    {
      title: 'Group Fitness Studio',
      subtitle: 'HIIT, Strength Circuits & Mobility',
      icon: <Flame className="w-5 h-5 text-emerald-400" />,
      desc: 'Sprung wooden flooring and acoustic surround sound system hosting daily coach-led metabolic HIIT sessions, mobility flows, and core clinics.',
      equipment: ['Studio Barbell Sets', 'TRX Suspension Trainers', 'Resistance Loop Bands', 'Anti-Burst Swiss Balls'],
    },
    {
      title: 'Recovery Suite',
      subtitle: 'Finnish Sauna & Cold Contrast',
      icon: <Moon className="w-5 h-5 text-emerald-400" />,
      desc: 'Dry cedar Finnish sauna heated to 90°C alongside cold immersion plunge baths designed to accelerate muscle repair and nervous system recovery.',
      equipment: ['90°C Cedar Dry Sauna', 'Dual Cold Plunge Tubs (8°C)', 'Normatec Compression Boots', 'Infrared Heat Lamps'],
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Elite Architecture</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Our Facilities & Equipment
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Engineered for lifters, runners, and athletes. Every apparatus is chosen for mechanical durability,
          joint ergonomics, and safety.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {facilities.map((fac, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  {fac.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase">{fac.title}</h3>
                  <p className="text-[11px] text-emerald-400 font-semibold">{fac.subtitle}</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">{fac.desc}</p>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Featured Hardware:</p>
                <div className="flex flex-wrap gap-1.5">
                  {fac.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-medium"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-[#0c0f14] border border-neutral-800 text-center space-y-3">
        <h3 className="text-xl font-bold uppercase text-white">Want to test the equipment before joining?</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          We welcome serious athletes to test-drive our platforms and turf during non-peak hours with a day guest pass.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Request Day Pass
          </button>
        </div>
      </div>
    </div>
  );
};
