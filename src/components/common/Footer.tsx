import React from 'react';
import { useApp } from '../../context/AppContext';
import { Dumbbell, Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = useApp();

  return (
    <footer className="bg-[#06080a] border-t border-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                {settings.gymName}
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {settings.tagline} A modern fitness sanctuary dedicated to athletic transformation,
              elite strength coaching, and personalized performance tracking.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialLinks?.instagram || settings.instagram || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.facebook || settings.facebook || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.youtube || settings.youtube || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Our Gym
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/membership')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Membership Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/trainers')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Expert Trainers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/facilities')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Gym Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/gallery')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Portals & Access</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Member Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Trainer Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/register')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  New Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Helpdesk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Visit & Contact</h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Fri: {settings.openingHours.monday}</p>
                  <p>Sat: {settings.openingHours.saturday}</p>
                  <p>Sun: {settings.openingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {settings.gymName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>ISO 9001:2015 Certified Facility</span>
            <span>·</span>
            <span>Enterprise Gym Management SaaS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
