import React from 'react';

/** Accordion of questions (native <details>, so it works without JS and in the prerendered HTML). */
const FaqList: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="v3-faq">
    {items.map(({ q, a }, i) => (
      <details key={q} className="v3-faq-item" open={i === 0}>
        <summary><span>{q}</span><span className="v3-faq-x" aria-hidden="true" /></summary>
        <p>{a}</p>
      </details>
    ))}
  </div>
);

export default FaqList;
