
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, category, isOpen, onClick, index }) => {
  return (
    <div
      className={`group border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer
        ${isOpen
          ? 'bg-white/[0.04] border-primary/25 shadow-[0_0_30px_rgba(56,224,123,0.06)]'
          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]'
        }`}
      onClick={onClick}
    >
      <button className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Index chip */}
          <span className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300
            ${isOpen ? 'bg-primary text-background-dark' : 'bg-white/5 text-white/30 group-hover:bg-white/10'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <span className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 transition-colors duration-300
              ${isOpen ? 'text-primary' : 'text-white/25 group-hover:text-white/40'}`}>
              {category}
            </span>
            <span className={`block text-base font-semibold leading-snug transition-colors duration-300
              ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
              {question}
            </span>
          </div>
        </div>
        {/* Toggle icon */}
        <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5
          ${isOpen
            ? 'bg-primary/10 border-primary/30 text-primary rotate-45'
            : 'border-white/10 text-white/25 group-hover:border-white/20 group-hover:text-white/60'
          }`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Answer panel */}
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="px-6 pb-6 pl-16">
          <div className="h-px bg-white/5 mb-4" />
          <p className="text-white/55 text-sm leading-relaxed font-normal">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Partnership Model',
      question: "How does the founder-led approach benefit my project?",
      answer: "Unlike traditional agencies where you're handed off to junior managers, at DualSync you work directly with the technical founders. This eliminates communication gaps and ensures that the person designing your architecture is the one who understands your business goals."
    },
    {
      category: 'Timeline & Delivery',
      question: "What is your typical project timeline?",
      answer: "Timelines vary depending on complexity. A premium landing page or MVP can take 2–4 weeks, while complex enterprise systems like PaFood are often long-term strategic partnerships involving iterative launches over several months."
    },
    {
      category: 'AI & Technology',
      question: "How do you use AI in the development process?",
      answer: "We utilize proprietary Generative AI workflows to automate boilerplate code, streamline debugging, and architect complex database schemas. This allows us to focus 100% of our manual effort on unique business logic and high-end UX design."
    },
    {
      category: 'Long-Term Support',
      question: "Do you offer long-term technical guardianship?",
      answer: "Yes. Our partnership with Pak Asian Foods is a prime example. We don't just 'deliver and leave' — we act as your external technical department, managing updates, scaling infrastructure, and evolving the system as your company grows."
    },
    {
      category: 'Tech Stack',
      question: "Which technologies do you specialize in?",
      answer: "Our core stack is built for high-performance and scale: React, Next.js, Node.js, Python (Django), and PostgreSQL. For mobile, we specialize in React Native to provide native performance with cross-platform efficiency."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 relative overflow-hidden" aria-label="Frequently Asked Questions">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-14">
            {/* Label chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Common Questions
            </h2>
            <p className="text-white/40 text-base">
              Everything you need to know about working with DualSync.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 60}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={400}>
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white/35 text-sm">Still have questions?</p>
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors group"
            >
              Talk to a founder directly
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
