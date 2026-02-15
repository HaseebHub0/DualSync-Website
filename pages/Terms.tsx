import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Terms: React.FC = () => {
  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-white/60">Effective Date: February 15, 2026</p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-[2rem] space-y-8 text-white/80 leading-relaxed">
            <section>
              <p>
                Please read these Terms of Service ("Terms") carefully before using the DualSync website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.1 Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.2 User Accounts</h2>
              <p>
                When you create an account, you must provide information that is accurate and complete. You are responsible for safeguarding the password that you use to access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.3 AI Content Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li><strong>Accuracy:</strong> Our Service uses Artificial Intelligence to generate content. We do not guarantee the accuracy, completeness, or usefulness of this content.</li>
                <li><strong>User Responsibility:</strong> You are solely responsible for how you use the AI-generated outputs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.4 Prohibited Uses</h2>
              <p className="mb-2">You agree not to use the Service:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>For any unlawful purpose.</li>
                <li>To generate harmful, threatening, or abusive content.</li>
                <li>To attempt to reverse engineer any part of the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.5 Intellectual Property</h2>
              <p>
                The Service and its original content (excluding content provided by users) are and will remain the exclusive property of DualSync.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.6 Limitation of Liability</h2>
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