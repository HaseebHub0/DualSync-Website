import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import Icon from '../../components/v3/Icon';
import NotFound from './NotFound';
import { useSEO } from '../../hooks/useSEO';
import { seoProps } from '../../data/seo';
import { POSTS, POST_AUTHORS, getPost } from '../../data/journal';
import { BODIES, readMinutes, type Block } from '../../data/journal-bodies';
import { useV3Motion } from '../../hooks/useV3Motion';
import { TOPIC_ICON, formatDate } from './Journal';

/** Renders `inline code` spans inside a plain string. */
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(`[^`]+`)/g).map((part, i) =>
      part.startsWith('`') && part.endsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : <React.Fragment key={i}>{part}</React.Fragment>,
    )}
  </>
);

const BlockView: React.FC<{ b: Block }> = ({ b }) => {
  switch (b.t) {
    case 'h2':
      return <h2>{b.c}</h2>;
    case 'p':
      return <p><Inline text={b.c} /></p>;
    case 'quote':
      return <blockquote>{b.c}</blockquote>;
    case 'ul':
      return <ul>{b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ul>;
    case 'ol':
      return <ol>{b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ol>;
  }
};

const Article: React.FC<{ slug: string }> = ({ slug }) => {
  const root = useRef<HTMLDivElement>(null);
  const post = getPost(slug)!;
  useSEO(seoProps(`/journal/${post.slug}`));
  useV3Motion(root);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <nav className="sx-ph-label v3-crumbs" aria-label="Breadcrumb">
            <Link to="/journal">Journal</Link>
            <span aria-hidden="true">/</span>
            <span>{post.category}</span>
          </nav>
          <h1 className="sx-ph-title v3-post-h1">{post.title}</h1>
          <p className="sx-ph-lead">{post.description}</p>
          <div className="v3-post-byline">
            <span>{POST_AUTHORS.join(' & ')}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{formatDate(post.published)}</time>
            <span aria-hidden="true">·</span>
            <span>{readMinutes(post)} min read</span>
          </div>
        </div>
      </section>

      <section className="v3-sec v3-article-sec">
        <div className="sx-wrap v3-article-wrap">
          <article className="v3-article">
            <aside className="v3-answer" aria-label="Short answer">
              <span className="v3-cell-ic"><Icon name={TOPIC_ICON[post.category] ?? 'spark'} /></span>
              <div>
                <div className="v3-answer-k">The short answer</div>
                <p>{post.answer}</p>
              </div>
            </aside>
            {(BODIES[post.slug] ?? []).map((b, i) => <BlockView key={i} b={b} />)}
          </article>

          <div className="v3-article-end">
            <div className="v3-cell v3-cell-mist v3-article-cta">
              <div className="v3-cell-t">Have a system like this in mind?</div>
              <p className="v3-cell-p">Tell us what is breaking. A founder replies within one business day.</p>
              <Link to="/contact" className="sx-btn-ink">Start a project<span className="sx-btn-dot-g">→</span></Link>
            </div>
          </div>

          <div className="sx-label v3-related-label">Keep reading</div>
          <div className="v3-bento v3-related">
            {related.map((p, i) => (
              <Link key={p.slug} to={`/journal/${p.slug}`} className={`v3-cell v3-c-6 ${i ? 'v3-cell-sky' : 'v3-cell-white'}`}>
                <div className="v3-post-top">
                  <span className="v3-cell-ic"><Icon name={TOPIC_ICON[p.category] ?? 'spark'} /></span>
                  <span className="v3-post-meta">{p.category} · {readMinutes(p)} min read</span>
                </div>
                <h2 className="v3-post-title">{p.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

/** /journal/:slug — unknown slugs fall through to the 404 page. */
const JournalPost: React.FC = () => {
  const { slug = '' } = useParams();
  if (!getPost(slug)) return <NotFound />;
  return <Article key={slug} slug={slug} />;
};

export default JournalPost;
