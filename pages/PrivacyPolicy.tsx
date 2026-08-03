import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useSEO } from '../hooks/useSEO';

const PrivacyPolicy: React.FC = () => {
  useSEO({
    title: 'Privacy Policy | DualSync Agency',
    description: 'How DualSync collects, uses, and safeguards your information.',
    canonical: '/privacy',
  });

  return (
    <div className="pt-36 md:pt-44 pb-24 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="mb-16 pb-10 border-b border-rule/10">
            <div className="mono-label text-accent mb-6">Legal</div>
            <h1 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl mb-6">Privacy Policy</h1>
            <p className="mono-label text-ink/60">Effective February 15, 2026</p>
          </div>

          <div className="space-y-10 text-ink/70 leading-relaxed [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mb-4 [&_h2]:tracking-tight">
            <section>
              <p>
                At DualSync, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">1.1 Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li><strong>Personal Information:</strong> Name, email address, and billing information when you register.</li>
                <li><strong>Usage Data:</strong> Details of your visits to our site, including traffic data, location data, and logs.</li>
                <li><strong>AI Interaction Data:</strong> We may process the prompts and data you input into our AI tools to provide results.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">1.2 How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To provide customer support.</li>
                <li>To gather analysis or valuable information so that we can improve our AI models and Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">1.3 Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-ink mb-4">1.4 Third-Party Services</h2>
              <p>
                We may use third-party providers (like Google Analytics or payment processors). These third parties have access to your Personal Data only to perform these tasks on our behalf.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PrivacyPolicy;