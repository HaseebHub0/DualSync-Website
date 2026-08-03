import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './anim/Reveal';

const faqs = [
  {
    category: 'Partnership',
    question: 'How does founder-led actually change anything?',
    answer:
      'You work directly with the technical founders — no junior account manager in between. The person designing your architecture is the person who heard your business goals first-hand, so nothing is lost in translation.',
  },
  {
    category: 'Timeline',
    question: 'How long does a project take?',
    answer:
      'It depends on complexity. A premium landing page or MVP runs 2–4 weeks. Enterprise systems like PaFood are long-term partnerships with iterative launches over several months.',
  },
  {
    category: 'Technology',
    question: 'How do you use AI in the build?',
    answer:
      'We use generative AI workflows to automate boilerplate, streamline debugging, and draft complex database schemas. That frees our manual effort for the part that is actually yours — business logic and interface design.',
  },
  {
    category: 'Support',
    question: 'Do you stay on after launch?',
    answer:
      'Yes. Our four-year partnership with Pak Asian Foods is the model: we act as your external technical department, managing updates, scaling infrastructure, and evolving the system as the company grows.',
  },
  {
    category: 'Stack',
    question: 'What do you build on?',
    answer:
      'React, Next.js, Node.js, Python and Django, with PostgreSQL underneath. React Native for mobile — native performance without maintaining two codebases.',
  },
];

/**
 * FAQ as a ruled accordion. Height is animated by Framer Motion rather than
 * a max-height guess, so long answers can never be clipped.
 */
const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10" aria-label="Frequently asked questions">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal y={24}>
              <div className="mono-label text-accent mb-6">FAQ</div>
              <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] shine">
                Common
                <br />
                questions
              </h2>
              <p className="text-ink/50 text-sm md:text-base leading-relaxed max-w-xs mt-6">
                Everything worth knowing before you get in touch.
              </p>
              <Link
                to="/contact"
                className="mono-label text-accent inline-flex items-center gap-2 mt-8 hover:gap-3 transition-all"
              >
                Ask a founder directly
                <span aria-hidden="true" className="material-symbols-outlined text-sm">north_east</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-rule/10">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.question} y={30} delay={i * 0.04}>
                  <div className="border-b border-rule/10">
                    <h3>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="group w-full flex items-start justify-between gap-6 py-7 text-left"
                      >
                        <span className="flex items-start gap-5 min-w-0">
                          <span className={`mono-label shrink-0 mt-1.5 transition-colors ${isOpen ? 'text-accent' : 'text-ink/60'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="min-w-0">
                            <span className={`mono-label block mb-2 transition-colors ${isOpen ? 'text-accent' : 'text-ink/60'}`}>
                              {faq.category}
                            </span>
                            <span
                              className={`block font-display font-bold tracking-tight text-lg md:text-2xl transition-colors ${
                                isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'
                              }`}
                            >
                              {faq.question}
                            </span>
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 mt-1 size-7 border flex items-center justify-center transition-all duration-500 ${
                            isOpen
                              ? 'border-primary text-accent rotate-45'
                              : 'border-rule/15 text-ink/40 group-hover:border-primary/50 group-hover:text-accent'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">add</span>
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-ink/55 text-sm md:text-base leading-relaxed pb-8 pl-[3.4rem] pr-10 max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
