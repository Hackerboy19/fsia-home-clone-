import React, { useState } from 'react';
import { ARTICLES } from '../data/fsiaData';
import { ArticleItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface LatestNewsSectionProps {
  onReadArticle?: (article: ArticleItem) => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({ onReadArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pageants', 'Awards', 'Fashion Shows', 'Events'];

  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter((art) => art.category === selectedCategory);

  const leadArticle = filteredArticles[0] || ARTICLES[0];
  const sideArticles = filteredArticles.slice(1, 4);

  return (
    <section id="news" className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#EADBAC]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>EDITORIAL JOURNAL &amp; PRESS DISPATCHES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
              LATEST FROM FSIA
            </h2>
            <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
              Official press releases, crowning announcements, audition circulars, and media coverage from the FSIA national network.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0C1322] text-[#EADBAC]'
                    : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL NEWS LAYOUT: Lead Feature + Secondary Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEAD ARTICLE (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-[#EADBAC] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#D4AF37] transition-colors">
            <div>
              <a
                href={leadArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-[#D4AF37]/30 mb-6"
                aria-label={`Read ${leadArticle.title}`}
              >
                <FSIAImage
                  src={leadArticle.image}
                  alt={leadArticle.title}
                  className="w-full h-full"
                  objectPosition="top"
                />
                <span className="absolute top-3 left-3 text-[10px] font-sans font-bold uppercase tracking-wider text-white bg-[#0C1322]/90 px-2.5 py-1 border border-[#D4AF37]/40">
                  {leadArticle.category}
                </span>
              </a>

              <div className="flex items-center gap-4 text-xs text-[#64748B] mb-2.5 font-sans">
                <span>{leadArticle.date}</span>
                <span>•</span>
                <span>{leadArticle.readTime}</span>
                <span>•</span>
                <span className="text-[#7E591B] font-semibold uppercase">Featured Editorial</span>
              </div>

              <a
                href={leadArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-2xl sm:text-3xl font-display font-bold text-[#0C1322] hover:text-[#7E591B] transition-colors leading-snug mb-3"
              >
                {leadArticle.title}
              </a>

              <p className="text-sm text-[#475569] font-sans leading-relaxed">
                {leadArticle.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EADBAC] flex items-center justify-between">
              <a
                href={leadArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-[#0C1322] hover:text-[#B8860B] transition-colors"
              >
                READ FULL ARTICLE &rarr;
              </a>
              <span className="text-xs text-[#64748B] font-sans">
                Official FSIA Portal
              </span>
            </div>
          </div>

          {/* SECONDARY ARTICLES STACK (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-[#EADBAC] p-5 flex flex-col justify-between shadow-2xs hover:border-[#D4AF37] transition-colors flex-1"
              >
                <div className="flex gap-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-28 sm:w-32 aspect-square shrink-0 overflow-hidden bg-neutral-900 border border-[#EADBAC]"
                    aria-label={`Read ${article.title}`}
                  >
                    <FSIAImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full"
                      objectPosition="top"
                    />
                  </a>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-[#7E591B] font-sans font-semibold uppercase tracking-wider mb-1">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span className="text-[#64748B]">{article.date}</span>
                      </div>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm sm:text-base font-display font-bold text-[#0C1322] hover:text-[#7E591B] transition-colors leading-snug line-clamp-2"
                      >
                        {article.title}
                      </a>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#0C1322] hover:text-[#B8860B] transition-colors pt-2"
                    >
                      READ STORY &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <a
              href="https://www.fsia.in/news.php"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#FAF8F2] border border-[#D4AF37]/40 text-center text-xs font-bold uppercase tracking-wider text-[#0C1322] hover:bg-[#F6F0DA] transition-colors block"
            >
              VIEW ALL PRESS &amp; MEDIA ARCHIVES &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
