import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useSEO } from '../hooks/useSEO';

const Terms: React.FC = () => {
  useSEO({
    title: 'Terms of Service | DualSync Agency',
    description: 'The terms governing use of the DualSync website and services.',
    canonical: '/terms',
  });

  return (
    <div className="pt-36 md:pt-44 pb-24 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="mb-16 pb-10 border-b border-rule/10">
            <div className="mono-label text-accent mb-6">Legal</div>
            <h1 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl mb-6">Terms of Service</h1>
            <p className="mono-label text-ink/60">Effective February 15, 2026</p>
          </div>

          <div className="space-y-10 text-ink/70 leading-relaxed [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mb-4 [&_h2]:tracking-tight">
            <section>
              <p>
                Please read these Terms of Service ("Terms") carefully before using the DualSync website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">2.1 Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">2.2 User Accounts</h2>
              <p>
                When you create an account, you must provide information that is accurate and complete. You are responsible for safeguarding the password that you use to access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">2.3 AI Content Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li><strong>Accuracy:</strong> Our Service uses Artificial Intelligence to generate content. We do not guarantee the accuracy, completeness, or usefulness of this content.</li>
                <li><strong>User Responsibility:</strong> You are solely responsible for how you use the AI-generated outputs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">2.4 Prohibited Uses</h2>
              <p className="mb-2">You agree not to use the Service:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li>For any unlawful purpose.</li>
                <li>To generate harmful, threatening, or abusive content.</li>
                <li>To attempt to reverse engineer any part of the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">2.5 Intellectual Property</h2>
              <p>
                The Service and its original content (excluding content provided by users) are and will remain the exclusive property of DualSync.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">2.6 Limitation of Liability</h2>
              <p>
                In no event shall DualSync be liable for any indirect, incidental, special, or consequential damages resulting from your use or inability to use the service.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Terms;