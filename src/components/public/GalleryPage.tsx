import React, { useState, useEffect } from 'react';
import { Dumbbell, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryPageProps {
  navigate: (path: string) => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Gym' | 'Equipment' | 'Training' | 'Events' | 'Facilities';
  aspect: string;
  gradient: string;
  description: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Gym', 'Equipment', 'Training', 'Events', 'Facilities'];

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Main Barbell Floor & Competition Platforms',
      category: 'Gym',
      aspect: 'col-span-1 md:col-span-2',
      gradient: 'from-emerald-950/40 via-neutral-900 to-black',
      description: 'Tournament-ready Eleiko power racks with shock-dampening deadlift wood platforms.',
    },
    {
      id: 'gal-2',
      title: 'Dumbbell Rack & Free Weights Bay',
      category: 'Equipment',
      aspect: 'col-span-1',
      gradient: 'from-neutral-900 via-neutral-950 to-black',
      description: 'Full row of urethane dumbbells starting from 2.5kg up to 60kg.',
    },
    {
      id: 'gal-3',
      title: 'Sprint Turf Lane & Prowler Sleds',
      category: 'Facilities',
      aspect: 'col-span-1',
      gradient: 'from-emerald-950/30 via-neutral-900 to-black',
      description: '30-meter indoor astroturf lane designed for sled drives and interval work.',
    },
    {
      id: 'gal-4',
      title: 'Morning CSCS Strength Class in Action',
      category: 'Training',
      aspect: 'col-span-1 md:col-span-2',
      gradient: 'from-neutral-850 via-neutral-900 to-black',
      description: 'Athletes refining clean-and-jerk mechanics with Coach Marcus Sterling.',
    },
    {
      id: 'gal-5',
      title: 'Annual Fall Bench Championship',
      category: 'Events',
      aspect: 'col-span-1',
      gradient: 'from-amber-950/30 via-neutral-900 to-black',
      description: 'Kanishk Gym Demo lifters competing in raw bench press with official referees.',
    },
    {
      id: 'gal-6',
      title: 'Finnish Cedar Sauna & Contrast Plunge',
      category: 'Facilities',
      aspect: 'col-span-1',
      gradient: 'from-sky-950/30 via-neutral-900 to-black',
      description: 'Post-workout recovery suite featuring dry sauna and cold immersion tubs.',
    },
    {
      id: 'gal-7',
      title: 'Concept2 Cardio Fleet & SkiErgs',
      category: 'Equipment',
      aspect: 'col-span-1 md:col-span-2',
      gradient: 'from-neutral-900 via-neutral-950 to-black',
      description: 'Aerobic zone equipped with calibrated PM5 monitor rowing machines.',
    },
    {
      id: 'gal-8',
      title: 'Nutrition & Macro Masterclass',
      category: 'Events',
      aspect: 'col-span-1',
      gradient: 'from-emerald-950/20 via-neutral-900 to-black',
      description: 'Coach Priya Roy breaking down lean bulking meal prep in the wellness studio.',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Visual Tour</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Facility & Training Gallery
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Take a look inside our high-performance facility, equipment bays, member workshops, and competition events.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-black shadow'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(idx)}
            className={`group relative rounded-2xl bg-gradient-to-br ${item.gradient} border border-neutral-800 hover:border-emerald-500/50 p-6 min-h-[260px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-700/80 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {item.category}
              </span>
              <div className="w-8 h-8 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 group-hover:bg-neutral-800 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2 z-10 pt-16">
              <h3 className="text-base font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0c0f14] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Visual Display */}
            <div className="relative rounded-xl bg-gradient-to-br from-neutral-850 via-[#10141c] to-black border border-neutral-800 min-h-[380px] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Dumbbell className="w-10 h-10" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                {filteredItems[activeLightboxIndex].category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white max-w-xl">
                {filteredItems[activeLightboxIndex].title}
              </h2>
              <p className="text-sm text-neutral-300 max-w-lg mt-3 leading-relaxed">
                {filteredItems[activeLightboxIndex].description}
              </p>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-850">
              <button
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
                  )
                }
                className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-neutral-500 tabular-nums">
                {activeLightboxIndex + 1} of {filteredItems.length}
              </span>

              <button
                onClick={() =>
                  setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length)
                }
                className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
