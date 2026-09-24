import React, { useState } from 'react';
import { Sparkles, ArrowRight, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { CURRENT_PROJECTS, ProjectItem } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';

interface CurrentProjectsSectionProps {
  onApply?: (projectName?: string) => void;
}

export const CurrentProjectsSection: React.FC<CurrentProjectsSectionProps> = ({ onApply }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Pageant', 'Award Show', 'Fashion'];

  const filteredProjects = filter === 'All'
    ? CURRENT_PROJECTS
    : CURRENT_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-[#FAF9F5] relative border-t border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/30 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-3 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#B8860B]" />
              <span>National & International Portfolios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0C1322] tracking-tight">
              Current FSIA Projects
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 font-sans">
              Active 2026 initiatives currently conducting auditions, jury assessments, and designer registrations across India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xs text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37] shadow-2xs'
                    : 'bg-white text-[#475569] border border-neutral-200 hover:border-[#D4AF37]/50'
                }`}
              >
                {cat === 'All' ? 'All Initiatives' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Inspired by Veekay Plast recent projects presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              className="bg-white rounded-md border border-[#EADBAC]/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col group"
            >
              {/* Project Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                <FSIAImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full"
                  objectPosition="top"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/90 via-[#0C1322]/25 to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xs bg-[#0C1322]/90 border border-[#D4AF37]/50 text-[#EADBAC] text-[10px] font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-xs bg-[#D4AF37] text-[#0C1322] text-[10px] font-bold uppercase tracking-wider">
                    {project.status}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-3 right-3 bg-white/95 px-2 py-0.5 rounded-xs text-[10px] font-bold text-[#0C1322] border border-[#EADBAC]">
                  {project.year}
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#EADBAC] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#526077] font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#334155]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 mt-5 border-t border-[#EADBAC]/60 flex items-center justify-between">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0C1322] hover:text-[#B8860B] transition-colors uppercase tracking-wider"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8860B]" />
                  </a>

                  <a
                    href="https://www.fsia.in/quickapply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xs bg-[#FAF7F0] hover:bg-[#0C1322] text-[#7E591B] hover:text-[#EADBAC] border border-[#D4AF37]/40 text-[11px] font-semibold tracking-wider uppercase transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
