/**
 * Journal article metadata (titles, summaries, short answers, dates).
 * Kept separate from the article bodies (journal-bodies.ts) so SEO data and
 * the home page never download the full text of every article.
 *
 * Rule: no invented numbers, clients or results. Where an article describes
 * PaFood it describes how the system is actually built.
 */

export type Post = {
  slug: string;
  title: string;
  /** One-sentence summary: meta description, card text and AI answer snippet. */
  description: string;
  category: string;
  /** Short tag shown on the card. */
  topic: string;
  published: string; // ISO date
  updated: string; // ISO date
  /** Direct answer to the question the title asks (shown first, used for AEO). */
  answer: string;
};

export const POST_AUTHORS = [
  "Muhammad Haseeb",
  "Muhammad Siddique"
];

export const POSTS: Post[] = [
  {
    "slug": "offline-first-field-app-no-signal",
    "title": "How we made PaFood work with no signal",
    "description": "How the PaFood order app keeps every visit, order and payment safe on the phone when the network drops, and delivers each one to the server exactly once.",
    "category": "ERP",
    "topic": "Offline-first sync",
    "published": "2026-11-27",
    "updated": "2026-11-27",
    "answer": "Every record is written to the phone first and sent later. Each one carries an ID created on the handset, and the server has a unique index on that ID, so a retried upload can never create a duplicate. That makes it safe to retry until the record arrives."
  },
  {
    "slug": "ai-agent-human-in-the-loop",
    "title": "The agent that knew when to stop and ask a human",
    "description": "How we design AI agents for back-office work so they act on their own where mistakes are cheap and hand over to a person, with context, where they are not.",
    "category": "AI agents",
    "topic": "Human-in-the-loop",
    "published": "2026-11-27",
    "updated": "2026-11-27",
    "answer": "Decide in advance which actions an agent may take alone, based on how costly and how reversible a mistake would be. Let it act freely on cheap, reversible steps, make it draft and wait for approval on money or customer-facing steps, and when it hands over, give the person everything they need to decide in one screen."
  },
  {
    "slug": "ai-receptionist-retell-n8n",
    "title": "Building a receptionist with Retell AI and n8n",
    "description": "The architecture behind a phone receptionist that answers calls, books appointments and writes every call back to the business’s systems, using Retell AI for voice and n8n for the workflows.",
    "category": "Voice AI",
    "topic": "Voice + booking",
    "published": "2026-11-27",
    "updated": "2026-11-27",
    "answer": "Retell AI runs the conversation on the phone line, and when the caller needs something done, it calls custom functions. Those functions are n8n webhooks that check availability, create the booking and log the call, so the voice layer stays thin and the business logic lives in workflows the team can read and change."
  },
  {
    "slug": "postgresql-schema-orders-routes-targets",
    "title": "Designing a PostgreSQL schema for orders, routes and targets",
    "description": "The principles behind the PaFood database: separating plan from reality, keeping history instead of overwriting it, and making retries safe with idempotency keys.",
    "category": "Data",
    "topic": "Schema first",
    "published": "2026-11-27",
    "updated": "2026-11-27",
    "answer": "Model the plan and what actually happened as separate tables, keep history instead of overwriting rows, and make every write from the field safe to repeat. For a distribution business that means routes versus route sessions and visits, soft-deleted orders and edit requests, an append-only ledger, and idempotency keys on incoming requests."
  },
  {
    "slug": "weekly-friday-builds",
    "title": "Why we ship a build every Friday",
    "description": "Why every DualSync project produces a working build each week instead of status reports, and what that changes for the client.",
    "category": "Process",
    "topic": "Weekly builds",
    "published": "2026-11-27",
    "updated": "2026-11-27",
    "answer": "A build you can click shows progress more honestly than any report, surfaces misunderstandings while they are cheap to fix, and gives the client a fixed moment each week to steer. So every project gets a working release on a staging link every Friday."
  },
  {
    "slug": "whatsapp-cloud-api-order-updates",
    "title": "WhatsApp order updates on the official Cloud API",
    "description": "How to send order confirmations and shipping updates on WhatsApp the reliable way: the official Cloud API, approved templates, the 24-hour window and delivery webhooks.",
    "category": "Automation",
    "topic": "Messaging",
    "published": "2026-11-27",
    "updated": "2026-11-27",
    "answer": "Use Meta’s official WhatsApp Cloud API, not an unofficial bridge. Messages a business starts must use pre-approved templates, free-form replies are allowed within 24 hours of the customer’s last message, and delivery and read statuses arrive by webhook, so log every message and its status."
  }
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
