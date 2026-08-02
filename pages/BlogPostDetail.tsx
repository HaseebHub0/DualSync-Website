import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import Reveal from '../components/anim/Reveal';
import SplitReveal from '../components/anim/SplitReveal';
import { useSEO } from '../hooks/useSEO';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));

  useSEO({
    title: post ? `${post.title} | DualSync Journal` : 'Article not found | DualSync',
    description: post?.excerpt ?? 'This article could not be found.',
    canonical: post ? `/blog/${post.id}` : '/blog',
  });

  if (!post) {
    return (
      <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center pt-36">
        <div className="mono-label text-accent mb-6">404</div>
        <h1 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl mb-8">
          That entry doesn’t exist.
        </h1>
        <Link to="/blog" className="mono-label text-accent hover:text-ink transition-colors">
          ← Back to the journal
        </Link>
      </section>
    );
  }

  const related = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : `https://dualsyncagency.com/blog/${post.id}`;
  const shares = [
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <article>
      {/* Opener */}
      <header className="relative border-b border-rule/10 overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/85 to-canvas/60" />
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 pt-36 md:pt-44 pb-16">
          <Reveal y={20}>
            <Link
              to="/blog"
              className="mono-label text-ink/60 hover:text-accent transition-colors inline-flex items-center gap-2 mb-10"
            >
              ← Journal
            </Link>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <span className="mono-label text-accent">{post.category}</span>
              <span className="mono-label text-ink/60">{post.readTime}</span>
              <span className="mono-label text-ink/60">{post.date}</span>
            </div>
          </Reveal>

          <SplitReveal
            as="h1"
            type="words"
            trigger="load"
            stagger={0.05}
            className="font-display font-black tracking-tighter text-ink text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] max-w-5xl"
          >
            {post.title}
          </SplitReveal>

          <Reveal y={24} delay={0.3}>
            <div className="flex items-center gap-4 mt-12 pt-8 border-t border-rule/10">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="size-12 object-cover border border-rule/15"
              />
              <div>
                <div className="text-ink font-bold">{post.author.name}</div>
                <div className="mono-label text-ink/60 mt-1">{post.author.role}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 sm:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <Reveal y={30}>
            <div
              className="prose prose-lg prose-invert max-w-none text-ink/75 leading-relaxed font-sans prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-a:text-accent prose-strong:text-ink"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Reveal>

          {/* Share */}
          <div className="flex flex-wrap items-center justify-between gap-6 mt-20 pt-8 border-t border-rule/10">
            <span className="mono-label text-ink/60">Share this entry</span>
            <div className="flex gap-3">
              {shares.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label px-4 py-2.5 border border-rule/15 text-ink/60 hover:text-accent hover:border-primary/50 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 sm:px-10 py-20 md:py-28 border-t border-rule/10">
          <div className="max-w-[90rem] mx-auto">
            <Reveal y={24}>
              <div className="mono-label text-accent mb-6">Keep reading</div>
              <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-14 shine">
                Related entries
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {related.map((p, i) => (
                <Reveal key={p.id} y={40} delay={i * 0.06}>
                  <Link to={`/blog/${p.id}`} className="group block">
                    <div className="border border-rule/10 group-hover:border-primary/40 transition-colors overflow-hidden mb-5">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="mono-label text-accent mb-3">{p.category}</div>
                    <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPostDetail;
