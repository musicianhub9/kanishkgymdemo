import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { GymEvent } from '../../types';
import { Modal } from '../common/Modal';
import { Calendar, Plus, Trash2, MapPin, Users, Clock } from 'lucide-react';

interface AdminEventsProps {
  navigate: (path: string) => void;
}

export const AdminEvents: React.FC<AdminEventsProps> = () => {
  const { events, addEvent, deleteEvent } = useApp();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '2026-10-15',
    time: '10:00 AM - 01:00 PM',
    location: 'Main Lifting Floor & Studio',
    description: '',
    category: 'Workshop',
    maxParticipants: 30,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addEvent({
      title: form.title,
      date: form.date,
      time: form.time,
      location: form.location,
      description: form.description,
      category: form.category,
      maxParticipants: Number(form.maxParticipants),
      registeredCount: 0,
    });

    showToast(`Event "${form.title}" created.`, 'success');
    setModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete event "${title}"?`)) {
      deleteEvent(id);
      showToast('Event deleted.', 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Gym Workshops & Competitions</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Organize athlete seminars, seasonal tournaments, and community lifting challenges.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4 hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  {ev.category}
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {ev.date}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white uppercase">{ev.title}</h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{ev.description}</p>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-400 pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{ev.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                  <span>
                    {ev.registeredCount} / {ev.maxParticipants} Registered Athletes
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-850">
              <button
                onClick={() => handleDelete(ev.id, ev.title)}
                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule New Gym Event"
        subtitle="Publish workshops or lifting challenges"
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Time</label>
              <input
                type="text"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Seminar">Seminar</option>
                <option value="Community">Community</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Max Athletes</label>
              <input
                type="number"
                value={form.maxParticipants}
                onChange={(e) => setForm({ ...form, maxParticipants: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Location Details</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
              Publish Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
