
import React from 'react';
import { TestimonialItem } from '../types';
import ScrollReveal from './ScrollReveal';

const testimonials: TestimonialItem[] = [
  {
    name: "Abdullah Akhtar",
    role: "Director of Strategy",
    company: "Pak Asian Foods",
    content: "DualSync is our most trusted technical partner. They have successfully engineered 3 major systems for Pak Asian Foods, and we are currently co-developing several more. Their ability to sync complex business logic with high-end code is why they handle our entire digital infrastructure.",
    // No photo: this previously used a stock stranger's portrait, which
    // misattributes a real person. Use a monogram until a real, permitted
    // photo is supplied.
    image: ""
  }
];

/** Initials monogram — honest stand-in for a portrait we don't have rights to. */
const Monogram: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="size-16 md:size-20 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-bold text-xl md:text-2xl tracking-tight shrink-0"
    >
      {initials}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const item = testimonials[0];

  return (
    <section className="py-20 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col gap-4 mb-16 text-center">
            <div className="inline-block mx-auto px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-2">Key Partner Story</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Success Story</h2>
            <p className="text-white/40 max-w-xl mx-auto">High-impact results delivered through long-term technical guardianship.</p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={150}>
            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative flex flex-col gap-8 hover:bg-white/5 transition-all duration-500 group border-white/5 hover:border-primary/20 shadow-2xl">
              <span className="material-symbols-outlined text-primary/20 group-hover:text-primary/40 transition-colors text-6xl absolute top-8 right-10">format_quote</span>

              <p className="text-white/90 leading-relaxed relative z-10 italic text-lg md:text-2xl font-medium">
                "{item.content}"
              </p>

              <div className="flex items-center gap-5 pt-6 border-t border-white/5">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`${item.name}, ${item.role} at ${item.company}`}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="size-16 md:size-20 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-colors shrink-0"
                  />
                ) : (
                  <Monogram name={item.name} />
                )}
                <div>
                  <h4 className="text-white font-bold text-xl">{item.name}</h4>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider">{item.role}, {item.company}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
