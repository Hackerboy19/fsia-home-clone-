import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/fsiaData';
import { GalleryItem } from '../types';
import { FSIAImage } from './FSIAImage';

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Stage & Crowning', 'Fashion Shows', 'Coronation', 'Awards'];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#EADBAC]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>OFFICIAL EVENT ARCHIVE • ZEE STUDIO ARENA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
              MOMENTS THAT INSPIRE
            </h2>
            <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
              Authentic visual archive capturing coronation stage grandeur, crowning moments, designer runway walks, and Zee Studio national arena ambiance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#0C1322] text-[#EADBAC]'
                    : 'bg-[#FAF9F5] text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className={`group relative overflow-hidden bg-neutral-900 border border-[#EADBAC] shadow-2xs hover:border-[#D4AF37] transition-all duration-300 cursor-pointer ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-2 h-96 sm:h-[480px]' : 'h-64 sm:h-72 lg:h-[228px]'
              }`}
            >
              <FSIAImage
                src={item.image}
                alt={item.title}
                className="w-full h-full"
                objectPosition="center"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/90 via-[#0C1322]/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Tag */}
              <span className="absolute top-3 left-3 text-[10px] font-sans font-bold uppercase tracking-wider text-[#EADBAC] bg-[#0C1322]/90 px-2.5 py-1 border border-[#D4AF37]/40">
                {item.category}
              </span>

              {/* Inspect Icon on Hover */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 text-[#0C1322] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] font-semibold block">
                  {item.event}
                </span>
                <h3 className="text-sm font-display font-bold leading-snug text-white mt-0.5">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Footer Action */}
        <div className="mt-12 text-center">
          <a
            href="https://www.fsia.in/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3.5 bg-[#FAF7F0] hover:bg-[#F6F0DA] text-[#0C1322] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/50 transition-colors"
          >
            VIEW COMPLETE PHOTO ARCHIVE ON FSIA.IN &rarr;
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0C1322] border border-[#D4AF37]/40 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] sm:max-h-[75vh] overflow-hidden bg-black flex items-center justify-center p-2 sm:p-4">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[55vh] sm:max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#0C1322] text-white border-t border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {activePhoto.event} • {activePhoto.category}
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-sans">
                  {activePhoto.caption}
                </p>
              </div>

              <span className="text-[11px] font-sans text-neutral-400 border border-neutral-700 px-3 py-1 shrink-0 self-start sm:self-auto">
                Official FSIA Photograph
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
