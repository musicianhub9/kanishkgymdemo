import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Megaphone, Plus, Trash2, Calendar } from 'lucide-react';

interface AdminAnnouncementsProps {
  navigate: (path: string) => void;
}

export const AdminAnnouncements: React.FC<AdminAnnouncementsProps> = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useApp();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [audience, setAudience] = useState<'All' | 'Members' | 'Trainers'>('All');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      showToast('Title and message are required.', 'warning');
      return;
    }

    addAnnouncement({
      title,
      message,
      priority,
      audience,
      date: new Date().toISOString().split('T')[0],
    });

    showToast('Announcement broadcasted to gym network.', 'success');
    setModalOpen(false);
    setTitle('');
    setMessage('');
  };

  const handleDelete = (id: string, annTitle: string) => {
    if (window.confirm(`Delete announcement "${annTitle}"?`)) {
      deleteAnnouncement(id);
      showToast('Announcement removed.', 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Facility Bulletin Broadcast</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Dispatch urgent notices, holiday schedules, and event invitations to members and staff.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
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
                <span className="text-xs text-neutral-400 font-mono">Audience: {a.audience}</span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-neutral-500 font-mono">{a.date}</span>
                <button
                  onClick={() => handleDelete(a.id, a.title)}
                  className="p-1 rounded hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h3 className="text-base font-bold text-white">{a.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{a.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Broadcast Announcement"
        subtitle="Publish a bulletin notice to the gym dashboard"
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Notice Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Powerlifting Meet Registration"
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High (Red Banner)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="All">All Portal Users</option>
                <option value="Members">Members Only</option>
                <option value="Trainers">Coaching Staff Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Notice Content *</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write the full announcement copy here..."
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Publish Broadcast
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
