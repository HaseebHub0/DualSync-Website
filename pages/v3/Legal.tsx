import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { seoProps } from '../../data/seo';
import { useV3Motion } from '../../hooks/useV3Motion';

/**
 * Privacy Policy and Terms of Use.
 * They describe what this site actually does: keep them in step with
 * netlify/functions/messages.mts and any analytics you add.
 */
export const LEGAL_UPDATED = '28 November 2026';

type Section = { h: string; p?: string[]; ul?: string[] };

const PRIVACY: Section[] = [
  { h: 'Who we are', p: ['DualSync is a software studio based in Rawalpindi, Pakistan, run by Muhammad Haseeb and Muhammad Siddique. “We” in this policy means DualSync. You can reach us at contact@dualsyncagency.com.'] },
  { h: 'What we collect', p: ['We only collect what you send us or what is needed to keep the site working and safe.'], ul: [
    'When you use the contact form: your name, email address, the kind of project you selected and your message, with the time it was sent.',
    'Your IP address, stored with your message and used for a few minutes in a counter that limits how often one address can send messages. This protects the form from spam.',
    'If something breaks in your browser while you use the site, an error report with the page address, the error text and your browser type. It contains no form data.',
    'Anonymous usage counts: each page view, click on a contact link or form submission adds one to a daily total for that page. We store only the totals, never your IP address, browser or any identifier, and we use no cookies. If your browser sends Do Not Track or Global Privacy Control, nothing is counted.',
    'Our host keeps standard server logs (such as IP address, the page requested and the time) to run and secure the service.',
  ] },
  { h: 'What we do not do', ul: [
    'We do not use advertising or tracking cookies, and we do not sell or rent your information.',
    'We do not load fonts, scripts or trackers from third parties: everything on the site is served from our own domain.',
    'We do not add you to a mailing list. We only email you to answer your message.',
  ] },
  { h: 'How we use your information', ul: [
    'To read and reply to your enquiry, and to continue the conversation if you become a client.',
    'To protect the site and the form from abuse.',
    'To find and fix errors on the site.',
  ] },
  { h: 'Who processes it for us', ul: [
    'Netlify hosts the website, runs the contact form and stores messages. Its servers may be outside Pakistan.',
    'Zoho Mail sends and receives our email, including replies to your message and our internal alert that a message arrived.',
  ] },
  { h: 'How long we keep it', p: ['Messages are kept while we are discussing your enquiry and for as long as we work together, then deleted when no longer needed. Rate-limit counters are deleted within minutes. Error reports are kept in our host’s logs for its standard log period. You can ask us to delete your message at any time.'] },
  { h: 'Your choices', p: ['You can ask what information we hold about you, ask us to correct it, or ask us to delete it, by emailing contact@dualsyncagency.com. We will reply within one business day and act on the request without charging you.'] },
  { h: 'Security', p: ['The site is served only over HTTPS. Messages are readable only by the founders through a password-protected inbox, and the form limits how often it can be used.'] },
  { h: 'Children', p: ['This site is for businesses and is not directed at children.'] },
  { h: 'Changes', p: ['If we change how we handle information, we will update this page and the date above.'] },
];

const TERMS: Section[] = [
  { h: 'About these terms', p: ['These terms cover your use of dualsyncagency.com. Work we do for clients is governed by a separate written agreement, which takes priority over these terms.'] },
  { h: 'Using the site', ul: [
    'You may read, share and link to the pages on this site.',
    'Do not try to break, overload or gain unauthorised access to the site, the contact form or the admin area, and do not use the form to send spam.',
  ] },
  { h: 'Our content', p: ['The text, design, code, case studies and images on this site belong to DualSync or are used with permission. Client names, logos and screenshots belong to their owners; sensitive figures in screenshots are blurred. You may quote short passages with a link back to the page.'] },
  { h: 'Information, not advice', p: ['Articles and pages describe how we work and what we have built. They are general information, not professional advice for your situation, and we do not guarantee results from following them.'] },
  { h: 'Links to other sites', p: ['We link to sites we do not control, such as Google Play, Behance and LinkedIn. We are not responsible for their content or privacy practices.'] },
  { h: 'Availability and liability', p: ['We aim to keep the site available and accurate, but it is provided “as is”. To the extent the law allows, DualSync is not liable for losses arising from use of the site.'] },
  { h: 'Law', p: ['These terms are governed by the laws of Pakistan.'] },
  { h: 'Contact', p: ['Questions about these terms: contact@dualsyncagency.com.'] },
];

const LegalPage: React.FC<{ path: '/privacy' | '/terms'; title: string; lead: string; sections: Section[] }> = ({ path, title, lead, sections }) => {
  const root = useRef<HTMLDivElement>(null);
  useSEO(seoProps(path));
  useV3Motion(root);
  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">Last updated {LEGAL_UPDATED}</div>
          <h1 className="sx-ph-title v3-post-h1">{title}</h1>
          <p className="sx-ph-lead">{lead}</p>
        </div>
      </section>
      <section className="v3-sec v3-article-sec">
        <div className="sx-wrap v3-article-wrap">
          <article className="v3-article">
            {sections.map((s) => (
              <React.Fragment key={s.h}>
                <h2>{s.h}</h2>
                {s.p?.map((t, i) => <p key={i}>{t}</p>)}
                {s.ul && <ul>{s.ul.map((t, i) => <li key={i}>{t}</li>)}</ul>}
              </React.Fragment>
            ))}
            <p>
              Questions? <Link to="/contact" className="v3-inline-link">Contact us</Link> or email contact@dualsyncagency.com.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const Privacy: React.FC = () => (
  <LegalPage path="/privacy" title="Privacy Policy" lead="What we collect when you use this site, why, and how to have it deleted. Short version: only what you send us, no tracking." sections={PRIVACY} />
);

export const Terms: React.FC = () => (
  <LegalPage path="/terms" title="Terms of Use" lead="The rules for using dualsyncagency.com. Client work is covered by a separate agreement." sections={TERMS} />
);
