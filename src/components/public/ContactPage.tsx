import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { settings } = useApp();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in your name, email, and message.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Message sent! Our front desk team will contact you within 2 business hours.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Reach Out</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Contact {settings.gymName}
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Have questions about memberships, private trainer availability, or corporate packages?
          Our team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Facility Details</h3>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Gym Address</p>
                  <p className="text-neutral-400 mt-0.5">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Direct Phone</p>
                  <p className="text-neutral-400 mt-0.5">{settings.phone}</p>
                  <p className="text-[11px] text-neutral-500">Call / WhatsApp available</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email Inquiries</p>
                  <p className="text-neutral-400 mt-0.5">{settings.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Operating Hours</span>
              </div>
              <div className="space-y-1 text-xs text-neutral-400">
                <div className="flex justify-between py-1 border-b border-neutral-850">
                  <span>Monday - Friday</span>
                  <span className="text-white font-mono">{settings.openingHours.monday}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-850">
                  <span>Saturday</span>
                  <span className="text-white font-mono">{settings.openingHours.saturday}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday</span>
                  <span className="text-white font-mono">{settings.openingHours.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Graphic Card */}
          <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">Getting Here</h4>
            <div className="h-40 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <MapPin className="w-8 h-8 text-emerald-400 mb-2 animate-bounce" />
              <p className="text-xs font-bold text-white uppercase">{settings.gymName} Location</p>
              <p className="text-[11px] text-neutral-400 mt-1">Valet parking available for all active members</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Send Us a Message</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill out the form below and a membership coordinator will reply within a few hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white uppercase">Inquiry Received!</h4>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you for reaching out. We have logged your request and our front desk manager will reach you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Pricing">Membership Pricing</option>
                      <option value="Personal Training Consultation">Personal Training Consultation</option>
                      <option value="Free Gym Tour Request">Free Gym Tour Request</option>
                      <option value="Corporate Wellness Package">Corporate Wellness Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your fitness goals or questions..."
                    className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
