import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import Icon from '../../components/v3/Icon';
import Illo from '../../components/v3/Illo';
import { Em } from '../../components/v3/Type';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/process"]). */
const Process: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "Process — DualSync",
    description: "Listen, Architect, Build, Run. How the work actually happens.",
    canonical: "/process",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ Process ]</div>
          <h1 className="sx-ph-title">How the work <span className="sx-green">actually happens.</span></h1>
          <p className="sx-ph-lead">Four phases, one fixed price, and a working build every Friday. No surprises, no account managers, no lock-in.</p>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-pp sx-reveal">
            <div className="sx-pp-n">01</div>
            <div>
              <div className="sx-pp-when">Week 0 · free</div>
              <h2 className="sx-pp-t">Listen</h2>
              <p className="sx-pp-p">A 45-minute call with both founders. We ask what is breaking, who it hurts, and what it costs you today. Sometimes the answer is that you do not need software at all.</p>
            </div>
            <div className="sx-pp-get">
              <div className="sx-pp-get-l">You get</div>
              <div className="sx-pp-get-v">A written problem statement</div>
            </div>
          </div>
          <div className="sx-pp sx-reveal">
            <div className="sx-pp-n">02</div>
            <div>
              <div className="sx-pp-when">Week 1</div>
              <h2 className="sx-pp-t">Architect</h2>
              <p className="sx-pp-p">We design the data model and integrations, and agree a fixed timeline and a fixed price before any code is written.</p>
            </div>
            <div className="sx-pp-get">
              <div className="sx-pp-get-l">You get</div>
              <div className="sx-pp-get-v">An architecture doc and a scoped plan</div>
            </div>
          </div>
          <div className="sx-pp sx-reveal">
            <div className="sx-pp-n">03</div>
            <div>
              <div className="sx-pp-when">Every Friday</div>
              <h2 className="sx-pp-t">Build</h2>
              <p className="sx-pp-p">Weekly builds on a live staging link you can click, test and show your team. You see progress, not status reports.</p>
            </div>
            <div className="sx-pp-get">
              <div className="sx-pp-get-l">You get</div>
              <div className="sx-pp-get-v">A working system that grows weekly</div>
            </div>
          </div>
          <div className="sx-pp sx-reveal">
            <div className="sx-pp-n">04</div>
            <div>
              <div className="sx-pp-when">Ongoing</div>
              <h2 className="sx-pp-t">Run</h2>
              <p className="sx-pp-p">Monitoring, patches and scaling after launch. We stay on, and you can leave any time with everything.</p>
            </div>
            <div className="sx-pp-get">
              <div className="sx-pp-get-l">You get</div>
              <div className="sx-pp-get-v">Full source and infrastructure, no lock-in</div>
            </div>
          </div>
        </div>
      </section>
      <section className="v3-sec">
        <div className="sx-wrap">
          <div className="sx-label">House rules</div>
          <h2 className="sx-h2">What you can <Em>count on.</Em></h2>
          <div className="v3-bento">
            <div className="v3-cell v3-c-7 v3-r-2 v3-cell-big v3-cell-mist">
              <Illo name="sync" />
              <div className="v3-cell-t">We will talk you out of things.</div>
              <p className="v3-cell-p">If it does not need building, we will say so before you pay for it.</p>
            </div>
            <div className="v3-cell v3-c-5 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="person" /></span>
              <div className="v3-cell-t">No account managers.</div>
              <p className="v3-cell-p">You message the people writing the code. Always.</p>
            </div>
            <div className="v3-cell v3-c-5 v3-cell-sky">
              <span className="v3-cell-ic"><Icon name="key" /></span>
              <div className="v3-cell-t">You own everything.</div>
              <p className="v3-cell-p">Source, infrastructure, accounts and data are yours from day one.</p>
            </div>
            <div className="v3-cell v3-c-5">
              <span className="v3-cell-ic"><Icon name="clock" /></span>
              <div className="v3-cell-t">One business day.</div>
              <p className="v3-cell-p">A founder replies to every message within one business day.</p>
            </div>
            <div className="v3-cell v3-c-7 v3-cell-white">
              <div className="v3-cell-t">What we need from you</div>
              <div className="v3-cell-row">
                <span className="v3-tag"><Icon name="person" />One decision-maker</span>
                <span className="v3-tag"><Icon name="calendar" />Two hours a week</span>
                <span className="v3-tag"><Icon name="layers" />Early access to data</span>
                <span className="v3-tag"><Icon name="compass" />Honest constraints</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-cta-sec">
        <div className="sx-ring sx-ring-l" />
        <div className="sx-ring sx-ring-r" />
        <div className="sx-cta-inner">
          <div className="sx-label sx-label-ink">Phase one</div>
          <h2 className="sx-cta-title">is a <Em>conversation.</Em></h2>
          <p className="sx-cta-p">Book the 45-minute call. It is free, and you keep the problem statement either way.</p>
          <Link to="/contact" className="sx-btn-ink">Book the call<span className="sx-btn-dot-g">→</span></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Process;
