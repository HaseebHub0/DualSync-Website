import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import PageHero from '../components/v2/PageHero';
import Reveal from '../components/anim/Reveal';
import GlareHover from '../components/reactbits/GlareHover';
import { useSEO } from '../hooks/useSEO';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  useSEO({
    title: 'Journal | DualSync — Notes on AI, SaaS & Enterprise Engineering',
    description:
      'Engineering notes from DualSync: AI agents, SaaS architecture, enterprise systems, and what we learned shipping them.',
    canonical: '/blog',
    keywords:
      'ERP Blog, AI Software Blog, Software Engineering Insights, DualSync Journal, Tech Blog Pakistan',
  });

  const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const filtered =
    activeCategory === 'All' ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  const [lead, ...rest] = filtered;

  return (
    <>
      <PageHero
        label="Journal"
        title="What we shipped,"
        titleOutline="and what broke."
        lead="Engineering notes on AI agents, SaaS architecture, and enterprise systems — written by the people who built them, not a content team."
        meta={[['Entries', String(blogPosts.length)]]}
      />

      {/* Category rail */}
      <div className="sticky top-20 z-40 border-b border-rule/10 bg-canvas/80 backdrop-blur-xl">
        <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative mono-label whitespace-nowrap transition-colors pb-1 ${
                  activeCategory === cat ? 'text-accent' : 'text-ink/60 hover:text-ink/70'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="blog-filter-rule"
                    className="absolute -bottom-[1.35rem] left-0 right-0 h-px bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="px-6 sm:px-10 py-20 md:py-28">
        <div className="max-w-[90rem] mx-auto">
          {/* Keyed remount rather than AnimatePresence — see Work.tsx: a stalled
              exit under mode="wait" would hold the previous category on screen. */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
              {/* Lead entry */}
              {lead && (
                <Reveal y={50}>
                  <Link
                    to={`/blog/${lead.id}`}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-16 mb-16 border-b border-rule/10"
                  >
                    <div className="relative lg:col-span-7 border border-rule/10 group-hover:border-primary/40 transition-colors overflow-hidden">
                      <GlareHover />
                      <img
                        src={lead.image}
                        alt={lead.title}
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="mono-label text-accent">{lead.category}</span>
                        <span className="mono-label text-ink/60">{lead.readTime}</span>
                      </div>
                      <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] mb-6 group-hover:text-accent transition-colors shine">
                        {lead.title}
                      </h2>
                      <p className="text-ink/55 text-base md:text-lg leading-relaxed mb-8">
                        {lead.excerpt}
                      </p>
                      <div className="flex items-center gap-4 pt-6 border-t border-rule/10">
                        <img
                          src={lead.author.avatar}
                          alt={lead.author.name}
                          loading="lazy"
                          className="size-9 object-cover border border-rule/10"
                        />
                        <div>
                          <div className="text-ink text-sm font-bold">{lead.author.name}</div>
                          <div className="mono-label text-ink/60 mt-1">{lead.date}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Index */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {rest.map((post, i) => (
                  <Reveal key={post.id} y={40} delay={i * 0.05}>
                    <Link to={`/blog/${post.id}`} className="group flex flex-col h-full">
                      <div className="relative border border-rule/10 group-hover:border-primary/40 transition-colors overflow-hidden mb-5">
                        <GlareHover />
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="mono-label text-accent">{post.category}</span>
                        <span className="mono-label text-ink/60">{post.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl leading-snug mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-ink/50 text-sm leading-relaxed mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-5 border-t border-rule/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            loading="lazy"
                            className="size-6 object-cover border border-rule/10"
                          />
                          <span className="mono-label text-ink/60">{post.date}</span>
                        </div>
                        <span
                          aria-hidden="true"
                          className="material-symbols-outlined text-accent text-base opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          north_east
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-ink/40 mb-5">Nothing filed under this category yet.</p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="mono-label text-accent hover:text-ink transition-colors"
                  >
                    View all entries
                  </button>
                </div>
              )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;
