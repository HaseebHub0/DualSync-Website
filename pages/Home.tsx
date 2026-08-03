import React from 'react';
import Preloader from '../components/v2/Preloader';
import HeroV2 from '../components/v2/HeroV2';
import ProofBar from '../components/v2/ProofBar';
import Manifesto from '../components/v2/Manifesto';
import CapabilityIndex from '../components/v2/CapabilityIndex';
import WorkShowcase from '../components/v2/WorkShowcase';
import Protocol from '../components/v2/Protocol';
import FoundersStrip from '../components/v2/FoundersStrip';
import PullQuote from '../components/v2/PullQuote';
import FinalCTA from '../components/v2/FinalCTA';
import { useSEO } from '../hooks/useSEO';

/**
 * Homepage v2 — "Precision Studio".
 * One continuous editorial narrative instead of stacked widgets:
 * statement → proof → position → capabilities → work → protocol →
 * people → voice → close. Numbered sections, ruled hairlines, mono
 * engineering labels against massive display type.
 */
const Home: React.FC = () => {
  useSEO({
    title: 'DualSync Agency | AI Agents, Custom SaaS & Enterprise Systems',
    description:
      'DualSync is a two-founder AI & SaaS engineering studio. AI agents, voice AI, custom SaaS platforms, and enterprise ERP/CRM systems — designed and engineered end to end, with zero handoffs.',
    canonical: '/',
    keywords:
      'DualSync Agency, AI Agents, Voice AI, Custom SaaS, ERP Software, Enterprise Systems, Software Engineering Studio, Automation',
  });

  return (
    <>
      <Preloader />
      <HeroV2 />
      <ProofBar />
      <Manifesto />
      <CapabilityIndex />
      <WorkShowcase />
      <Protocol />
      <FoundersStrip />
      <PullQuote />
      <FinalCTA />
    </>
  );
};

export default Home;
