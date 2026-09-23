import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { Award, Clock, Star, Dumbbell, Send, CheckCircle2 } from 'lucide-react';

interface MemberTrainerProps {
  navigate: (path: string) => void;
}

export const MemberTrainer: React.FC<MemberTrainerProps> = () => {
  const { currentMember, trainers } = useApp();
  const { showToast } = useToast();

  const [message, setMessage] = useState('');
  const [messagesSent, setMessagesSent] = useState<string[]>([]);

  if (!currentMember) return null;

  const trainer =
    trainers.find((t) => t.id === currentMember.trainerId) ||
    trainers.find((t) => t.name === currentMember.trainerName) ||
    trainers[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessagesSent((prev) => [...prev, message]);
    setMessage('');
    showToast(`Message dispatched to Coach ${trainer.name}. Response expected in 2 hours.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Trainer Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar name={trainer.name} size="xl" role="trainer" />
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-white uppercase">{trainer.name}</h2>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5">{trainer.specialization}</p>
            </div>
            <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{trainer.rating} / 5.0</span>
            </div>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">{trainer.bio}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
            <span>Experience: <strong className="text-white">{trainer.experience}</strong></span>
            <span>·</span>
            <span>Availability: <strong className="text-white">{trainer.availability}</strong></span>
          </div>
        </div>
      </div>

      {/* Certifications and Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Accreditations & Badges</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            {trainer.certifications.map((c, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <span>Assigned Training Domains</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trainer.programs.map((p, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Messaging Box */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Direct Line to Coach {trainer.name}
          </h3>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Ask technique questions, request weight adjustments, or report joint soreness.
          </p>
        </div>

        {/* Message history */}
        {messagesSent.length > 0 && (
          <div className="space-y-2 p-3 rounded-xl bg-[#12161f] border border-neutral-800 max-h-48 overflow-y-auto">
            {messagesSent.map((msg, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-neutral-800/80 text-xs text-neutral-200">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                  <span>Sent by you</span>
                  <span>Just now</span>
                </div>
                <p>{msg}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="space-y-3">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Type your workout question for ${trainer.name}...`}
            className="w-full bg-[#12161f] border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send To Coach</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
