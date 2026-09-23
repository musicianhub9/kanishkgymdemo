import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trainer } from '../../types';
import { Star, Award, Clock, Dumbbell, Filter } from 'lucide-react';
import { TrainerDetailModal } from './TrainerDetailModal';

interface TrainersPageProps {
  navigate: (path: string) => void;
}

export const TrainersPage: React.FC<TrainersPageProps> = ({ navigate }) => {
  const { trainers } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specialties = ['All', 'Strength', 'Functional', 'Olympic', 'Fat Loss', 'Mobility'];

  const filteredTrainers = trainers.filter((t) => {
    if (selectedSpecialty === 'All') return true;
    return t.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase());
  });

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Coaching Excellence</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Meet Our Certified Trainers
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Our coaches are not salesmen. They are accredited biomechanists, Olympic lifters, and nutrition
          specialists dedicated to building athletes of all skill levels.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-emerald-400 text-black shadow'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTrainers.map((trainer) => (
          <div
            key={trainer.id}
            className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Trainer Card Banner */}
              <div className="h-52 w-full rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-[#0a0d13] border border-neutral-750 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black text-2xl mb-3 shadow-inner">
                  {trainer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="text-base font-bold text-white uppercase">{trainer.name}</h3>
                <span className="text-xs font-semibold text-emerald-400 mt-0.5">{trainer.experience} Experience</span>
              </div>

              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">{trainer.specialization}</p>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">{trainer.bio}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-850">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="text-neutral-500 font-medium">Rating:</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{trainer.rating} / 5.0</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="text-neutral-500 font-medium">Availability:</span>
                  <span className="font-mono text-neutral-400 truncate max-w-[180px]">{trainer.availability}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setSelectedTrainer(trainer);
                  setIsModalOpen(true);
                }}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Profile & Philosophy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Detail Modal */}
      <TrainerDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trainer={selectedTrainer}
      />
    </div>
  );
};
