import React from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface MemberAnnouncementsProps {
  navigate: (path: string) => void;
}

export const MemberAnnouncements: React.FC<MemberAnnouncementsProps> = () => {
  const { announcements } = useApp();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800">
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">Gym Bulletin & Announcements</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Stay informed on holiday operating hours, facility maintenance, and athlete workshop schedules.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`p-6 rounded-2xl border transition-all ${
              a.priority === 'High'
                ? 'bg-[#141219] border-rose-500/40'
                : 'bg-[#0f1319] border-neutral-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    a.priority === 'High'
                      ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {a.priority} Priority
                </span>
                <span className="text-xs text-neutral-500 font-mono">Audience: {a.audience}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{a.date}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h3 className="text-base font-bold text-white">{a.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{a.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
