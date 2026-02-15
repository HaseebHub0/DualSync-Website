
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 border-white/5 ${isOpen ? 'border-primary/30 bg-white/[0.05]' : 'hover:border-white/20'}`}>
      <button 
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left gap-4"
      >
        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white'}`}>
          {question}
        </span>
        <div className={`size-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isOpen ? 'bg-primary border-primary text-background-dark rotate-180' : 'border-white/10 text-white/40'}`}>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </div>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out px-8 overflow-hidden ${isOpen ? 'max-h-60 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-white/50 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the founder-led approach benefit my project?",
      answer: "Unlike traditional agencies where you're handed off to junior managers, at DualSync you work directly with the technical founders. This eliminates communication gaps and ensures that the person designing your architecture is the one who understands your business goals."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Timelines vary depending on complexity. A premium landing page or MVP can take 2-4 weeks, while complex enterprise systems like PaFood are often long-term strategic partnerships involving iterative launches over several months."
    },
    {
      question: "How do you use AI in the development process?",
      answer: "We utilize proprietary Generative AI workflows to automate boilerplate code, streamline debugging, and architect complex database schemas. This allows us to focus 100% of our manual effort on unique business logic and high-end UX design."
    },
    {
      question: "Do you offer long-term technical guardianship?",
      answer: "Yes. Our partnership with Pak Asian Foods is a prime example. We don't just 'deliver and leave'—we act as your external technical department, managing updates, scaling infrastructure, and evolving the system as your company grows."
    },
    {
      question: "Which technologies do you specialize in?",
      answer: "Our core stack is built for high-performance and scale: React, Next.js, Node.js, Python (Django), and PostgreSQL. For mobile, we specialize in React Native to provide native performance with cross-platform efficiency."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Support & Clarity</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">Frequently Asked <span className="text-white/30">Questions</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">Everything you need to know about our technical process and partnership model.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <FAQItem 
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
