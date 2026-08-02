import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/v2/PageHero';
import Glyph, { type GlyphName } from '../components/v2/Glyph';
import Reveal from '../components/anim/Reveal';
import SplitReveal from '../components/anim/SplitReveal';
import MagneticButton from '../components/ui/MagneticButton';
import Button from '../components/v2/Button';
import { useSEO } from '../hooks/useSEO';

type Service = {
  num: string;
  glyph: GlyphName;
  title: string;
  line: string;
  details: string[];
  tags: string[];
};

const services: Service[] = [
  {
    num: '01',
    glyph: 'agent',
    title: 'AI Agents',
    line: 'Intelligent automation for the work that eats your team’s week. Systems that close a loop end to end — not demos.',
    details: [
      'Custom LLM fine-tuning',
      'Autonomous customer support agents',
      'Workflow automation & integration',
      'Data science & visualisation',
    ],
    tags: ['OpenAI', 'Agentic Workflows', 'NLP', 'Computer Vision'],
  },
  {
    num: '02',
    glyph: 'voice',
    title: 'Voice AI',
    line: 'Human-sounding voice agents for inbound and outbound calling. Support, outreach, and qualification — answered every time.',
    details: [
      'Inbound customer support voice agents',
      'Outbound sales & lead qualification',
      'Voice cloning and latency optimisation',
      'Direct CRM and ERP integration',
    ],
    tags: ['Retell AI', 'VAPI', 'Bland.ai', 'CRM Sync'],
  },
  {
    num: '03',
    glyph: 'automation',
    title: 'Automation',
    line: 'Your tools, connected. Secure self-hosted n8n workflows that delete manual data entry from the job description.',
    details: [
      'Custom n8n nodes & JavaScript transforms',
      'Automated lead routing & CRM updates',
      'Invoice, reporting and email automation',
      'Self-hosted instances on AWS or Hetzner',
    ],
    tags: ['n8n', 'API Integrations', 'Webhooks', 'Self-Hosted'],
  },
  {
    num: '04',
    glyph: 'chat',
    title: 'WhatsApp Systems',
    line: 'Conversations at scale on the channel your customers already use, through the official Cloud API.',
    details: [
      'Order confirmations & shipping updates',
      'Interactive button & list routing',
      'Multi-agent shared inbox',
      'Broadcast campaigns with analytics',
    ],
    tags: ['WhatsApp Cloud API', 'Chatbots', 'Meta Business'],
  },
  {
    num: '05',
    glyph: 'saas',
    title: 'Custom SaaS',
    line: 'From first sketch to paying customers. Fast, scalable platforms built for performance and found by search.',
    details: [
      'Headless e-commerce',
      'Enterprise dashboards',
      'Serverless architectures',
      'Performance optimisation',
    ],
    tags: ['React', 'Next.js', 'PostgreSQL', 'Cloud Native'],
  },
  {
    num: '06',
    glyph: 'devices',
    title: 'Mobile Apps',
    line: 'Cross-platform apps that solve real operational problems — built to work when the signal doesn’t.',
    details: [
      'Real-time data synchronisation',
      'Offline-first architecture',
      'Inventory management apps',
      'Field operation tools',
    ],
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    num: '07',
    glyph: 'enterprise',
    title: 'Enterprise Systems',
    line: 'ERP and CRM shaped to how your business actually runs, instead of bending operations to fit someone else’s product.',
    details: [
      'Complex logistics systems (ERP)',
      'Inventory management platforms',
      'Legacy system modernisation',
      'Cloud migration strategy',
    ],
    tags: ['Django', 'Python', 'Microservices', 'DevOps'],
  },
  {
    num: '08',
    glyph: 'design',
    title: 'Product Design',
    line: 'Interfaces people don’t have to think about. Clarity first, decoration never.',
    details: [
      'Interactive prototypes',
      'Dashboard layouts',
      'Mobile-first design',
      'User journey mapping',
    ],
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    num: '09',
    glyph: 'render',
    title: '3D & Motion',
    line: 'Cinematic visuals that change how a brand is perceived — from product renders to character animation.',
    details: [
      'Photorealistic product renders',
      'Character modelling & animation',
      'Game-ready asset production',
      'Unreal Engine environment art',
    ],
    tags: ['Blender', 'Unreal Engine', 'Product Viz'],
  },
];

const horizons = [
  {
    title: 'Blockchain Systems',
    line: 'Smart contracts, dApps, and secure ledger integrations.',
  },
  {
    title: 'Technical SEO',
    line: 'Programmatic content strategy and ranking infrastructure.',
  },
];

const ServicesPage: React.FC = () => {
  useSEO({
    title: 'Services | DualSync — AI Agents, Voice AI, SaaS & Enterprise Systems',
    description:
      'DualSync builds AI agents, voice AI, n8n and WhatsApp automation, custom SaaS, mobile apps, enterprise ERP/CRM, product design, and 3D motion. Founder-led engineering, end to end.',
    canonical: '/services',
    keywords:
      'AI Agents, Voice AI, Retell AI, VAPI, n8n Automation, WhatsApp Automation, Custom SaaS, ERP Development, React Native, Django, Product Design, 3D Animation',
  });

  return (
    <>
      <PageHero
        label="Services"
        title="Nine ways we"
        titleOutline="ship."
        lead="Every engagement is run by the founders. No account managers, no offshore relay, no handoff between the person who scoped it and the person who builds it."
        meta={[
          ['Disciplines', '09'],
          ['Reply time', '1 day'],
        ]}
      />

      {/* Capability detail */}
      <section className="px-6 sm:px-10">
        <div className="max-w-[90rem] mx-auto">
          {services.map((s, i) => (
            <Reveal key={s.num} y={50}>
              <article
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 md:py-20 ${
                  i > 0 ? 'border-t border-rule/10' : ''
                }`}
              >
                {/* Glyph */}
                <div className="lg:col-span-3 flex lg:block items-center gap-6">
                  <div className="size-24 md:size-32 shrink-0 border border-rule/10 group-hover:border-primary/40 transition-colors p-4 md:p-5 bg-surface/[0.02]">
                    <Glyph name={s.glyph} className="w-full h-full" />
                  </div>
                  <span className="mono-label text-ink/60 lg:block lg:mt-5">{s.num} / 09</span>
                </div>

                {/* Statement */}
                <div className="lg:col-span-5">
                  <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl group-hover:text-accent transition-colors shine">
                    {s.title}
                  </h2>
                  <p className="text-ink/55 text-base md:text-lg leading-relaxed mt-5 max-w-md">
                    {s.line}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-7">
                    {s.tags.map((t) => (
                      <span key={t} className="mono-label text-ink/60">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="lg:col-span-4">
                  <div className="mono-label text-ink/60 mb-5">Deliverables</div>
                  <ul className="flex flex-col">
                    {s.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-4 py-3 border-b border-rule/[0.07] text-ink/60 text-sm md:text-base"
                      >
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Horizons */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <div className="mono-label text-accent mb-6">Next</div>
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-14 shine">
              Currently in the lab
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface/10 border border-rule/10">
            {horizons.map((h, i) => (
              <Reveal key={h.title} y={40} delay={i * 0.06}>
                <div className="relative shimmer-card bg-canvas p-8 md:p-12 h-full group hover:bg-surface/[0.02] transition-colors">
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl group-hover:text-accent transition-colors">
                      {h.title}
                    </h3>
                    <span className="mono-label text-accent/60 shrink-0">Soon</span>
                  </div>
                  <p className="text-ink/50 text-sm md:text-base leading-relaxed">{h.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="px-6 sm:px-10 py-28 md:py-40 border-t border-rule/10 text-center relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <SplitReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="font-display font-black tracking-tighter leading-[0.95] text-ink text-[clamp(2rem,6vw,5rem)] max-w-4xl mx-auto"
          >
            Not sure which one you need?
          </SplitReveal>
          <Reveal y={24} delay={0.25}>
            <p className="text-ink/50 text-base md:text-lg max-w-xl mx-auto mt-8">
              Most projects cross two or three of these. Tell us the problem and
              we’ll tell you what it actually takes.
            </p>
          </Reveal>
          <Reveal y={24} delay={0.35}>
            <div className="flex justify-center mt-12">
              <MagneticButton strength={0.45}>
                <Button as={Link} to="/contact">
                  Start a project
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[16rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none"
        />
      </section>
    </>
  );
};

export default ServicesPage;
