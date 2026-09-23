import React from 'react';
import { Trainer } from '../../types';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { Star, Award, Clock, Dumbbell, Calendar, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface TrainerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer | null;
  onBookSession?: (trainer: Trainer) => void;
}

export const TrainerDetailModal: React.FC<TrainerDetailModalProps> = ({
  isOpen,
  onClose,
  trainer,
}) => {
  const { showToast } = useToast();

  if (!trainer) return null;

  const handleBook = () => {
    showToast(`Introductory consultation booked with ${trainer.name}! Check your email for confirmation.`, 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${trainer.name} · Coach Profile`}
      subtitle={trainer.specialization}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Top Trainer Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-[#12161f] border border-neutral-800">
          <Avatar name={trainer.name} size="xl" role="trainer" />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
              <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="tabular-nums">{trainer.rating} / 5.0</span>
              </div>
            </div>
            <p className="text-emerald-400 text-xs font-medium mt-0.5">{trainer.specialization}</p>
            <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{trainer.bio}</p>
          </div>
        </div>

        {/* Credentials & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Certifications</span>
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              {trainer.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Training Availability</span>
            </div>
            <p className="text-xs text-neutral-300">{trainer.availability}</p>
            <p className="text-[11px] text-neutral-400 mt-2">
              Experience: <strong className="text-white">{trainer.experience}</strong> active coaching
            </p>
          </div>
        </div>

        {/* Assigned Programs */}
        <div className="p-4 rounded-xl bg-[#12161f] border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <span>Specialized Training Programs</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {trainer.programs.map((prog, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
              >
                {prog}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleBook}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Free 1-on-1 Consultation</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
