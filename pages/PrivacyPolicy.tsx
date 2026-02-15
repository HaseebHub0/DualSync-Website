import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-white/60">Effective Date: February 15, 2026</p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-[2rem] space-y-8 text-white/80 leading-relaxed">
            <section>
              <p>
                At DualSync, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1.1 Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li><strong>Personal Information:</strong> Name, email address, and billing information when you register.</li>
                <li><strong>Usage Data:</strong> Details of your visits to our site, including traffic data, location data, and logs.</li>
                <li><strong>AI Interaction Data:</strong> We may process the prompts and data you input into our AI tools to provide results.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1.2 How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To provide customer support.</li>
                <li>To gather analysis or valuable information so that we can improve our AI models and Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1.3 Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1.4 Third-Party Services</h2>
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