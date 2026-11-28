/**
 * Article bodies as structured blocks (no raw HTML), rendered by
 * pages/v3/JournalPost.tsx. Inline `code` in backticks is rendered as <code>.
 */

import type { Post } from './journal';

export type Block =
  | { t: 'p'; c: string }
  | { t: 'h2'; c: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'quote'; c: string };

export const BODIES: Record<string, Block[]> = {
  "offline-first-field-app-no-signal": [
    {
      "t": "p",
      "c": "Order bookers for Pak Asian Foods work in markets, side streets and towns where signal comes and goes. A field app that needs a connection to save anything fails exactly where it is used. So PaFood follows one rule: the phone is the first place a record lives, and the network is just how it travels."
    },
    {
      "t": "h2",
      "c": "Write first, send later"
    },
    {
      "t": "p",
      "c": "A visit is written to a local outbox the instant the booker checks in, before any network call is attempted. From that moment the record exists on the device. A crash, a flat battery or a week with no signal all end the same way once the phone reconnects: the visit arrives."
    },
    {
      "t": "p",
      "c": "The outbox is read and written one operation at a time. Without that, a check-out landing in the middle of a sync could be overwritten by the sync’s older copy, and the visit would quietly go back to “checked in”."
    },
    {
      "t": "h2",
      "c": "Exactly once, not at least once"
    },
    {
      "t": "p",
      "c": "Retrying is easy. Retrying without creating duplicates is the real problem. Each visit carries a `client_visit_id`, a UUID generated on the handset. The server has a unique index on that column, so a replayed upload is a no-op rather than a second visit."
    },
    {
      "t": "p",
      "c": "Because a retry can never do harm, the app can retry forever. That single property removes a whole class of “did it send or not?” bugs."
    },
    {
      "t": "h2",
      "c": "Show what has not been sent yet"
    },
    {
      "t": "p",
      "c": "The offline queue holds requests, but the booker needs to see their work. A separate list keeps shops and orders created on the device that the server has not accepted yet. Without it, a shop created with no signal vanished until the phone reconnected, and the booker could not book the order they were standing in the shop to take."
    },
    {
      "t": "p",
      "c": "Those records are marked as not synced. When the server accepts them they gain their real shop code and order number, and the lists refresh on their own, without anyone pulling to refresh."
    },
    {
      "t": "h2",
      "c": "When the server says “not yet”"
    },
    {
      "t": "p",
      "c": "Some money entries cannot be posted straight away, for example when the office has closed the day. Those entries are never dropped and never re-dated. They are kept with their original time and request ID and shown to the booker as held."
    },
    {
      "t": "ul",
      "items": [
        "Held: recoverable once the office re-opens the day, so it is retried with a growing pause.",
        "Blocked: a person has to act first. It is sent again only when the office has approved it, never because someone pressed retry."
      ]
    },
    {
      "t": "h2",
      "c": "The bug that kept bookers offline"
    },
    {
      "t": "p",
      "c": "The app checks connectivity with a quick probe. That probe used to time out after three seconds. On a weak field connection, a cold request (DNS, TCP and TLS from scratch) often takes longer than that, so the probe was cut off mid-handshake and the app decided it was offline."
    },
    {
      "t": "p",
      "c": "Once it believed it was offline it stopped making real requests, so no connection was ever warmed up, and every later probe was cold as well. Bookers stayed “offline” until they signed out and back in. The fix was longer probe timeouts and trusting a result for a short while instead of re-probing constantly."
    },
    {
      "t": "quote",
      "c": "An offline detector can cause the outage it is trying to detect."
    },
    {
      "t": "h2",
      "c": "Checks that need no network"
    },
    {
      "t": "p",
      "c": "Check-in is only allowed near the shop. GPS needs no network, so the distance and accuracy rules run on the handset; otherwise a booker in a dead zone could never check in. The server runs the identical rule again when the visit arrives. The copy on the phone is a convenience for the user, and the server stays the authority."
    },
    {
      "t": "h2",
      "c": "When the queue drains"
    },
    {
      "t": "ol",
      "items": [
        "On app start, to send anything left from the last session.",
        "When the app returns to the foreground, the usual moment a booker regains signal.",
        "On a periodic tick, to catch a reconnect while the app is open.",
        "Immediately, when the connectivity probe sees offline turn into online."
      ]
    },
    {
      "t": "h2",
      "c": "What we would tell anyone building a field app"
    },
    {
      "t": "ul",
      "items": [
        "Save locally before any network call. Treat the network as optional.",
        "Give every record an ID on the device and enforce it with a unique index on the server.",
        "Separate what is queued from what the user sees.",
        "Never drop or re-date money. Hold it, explain why, and let a person release it.",
        "Run safety rules on the device and again on the server."
      ]
    }
  ],
  "ai-agent-human-in-the-loop": [
    {
      "t": "p",
      "c": "The most useful thing an agent can do is often to stop. An agent that routes leads, answers support questions or prepares invoices will meet cases it should not decide alone. Designing for those moments is most of the work, and it is the part that decides whether a team trusts the agent after the first week."
    },
    {
      "t": "h2",
      "c": "Sort actions by consequence, not by difficulty"
    },
    {
      "t": "p",
      "c": "We start by listing every action the agent can take and asking two questions about each: what does a mistake cost, and can it be undone?"
    },
    {
      "t": "ul",
      "items": [
        "Cheap and reversible, such as tagging a lead or drafting a reply: the agent acts alone.",
        "Costly but reversible, such as changing a booking: the agent acts and tells someone.",
        "Costly or irreversible, such as refunds, payments or messages to a customer: the agent drafts and a person approves."
      ]
    },
    {
      "t": "p",
      "c": "Confidence scores help, but they are not the boundary. A model can be very confident and still wrong, so the boundary is set by consequence."
    },
    {
      "t": "h2",
      "c": "Make the stop conditions explicit"
    },
    {
      "t": "p",
      "c": "Beyond the action list, we write down the situations that always go to a person: the customer is upset, the request involves money above a set amount, the data the agent needs is missing or contradictory, or the request matches nothing it has seen before. These are rules in code, not hopes in a prompt."
    },
    {
      "t": "h2",
      "c": "Hand over with context"
    },
    {
      "t": "p",
      "c": "A handoff that says “please review” just moves the work. A good one arrives as a small packet: what was asked, what the agent found, what it proposes and why it stopped. The person should be able to approve, edit or reject in one screen without reopening five systems."
    },
    {
      "t": "h2",
      "c": "Log every decision"
    },
    {
      "t": "p",
      "c": "Every action the agent takes and every handoff it makes is logged with its inputs. When something goes wrong you can see why, and when a type of handoff is always approved unchanged, you have evidence to let the agent do it alone."
    },
    {
      "t": "h2",
      "c": "Widen the boundary slowly"
    },
    {
      "t": "p",
      "c": "We launch with a narrow set of solo actions and widen it as the logs show which approvals were routine. Trust is earned per action, not granted to the agent as a whole."
    },
    {
      "t": "quote",
      "c": "An agent that asks at the right moment is worth more than one that is right most of the time."
    }
  ],
  "ai-receptionist-retell-n8n": [
    {
      "t": "p",
      "c": "A clinic misses calls when the front desk is busy or closed, and every missed call can be a lost appointment. We built an AI receptionist for a dental practice that answers every call, books appointments and writes each call back to the practice’s systems. This is how it is put together."
    },
    {
      "t": "h2",
      "c": "Two layers: voice and workflow"
    },
    {
      "t": "p",
      "c": "Retell AI handles the call itself: speech recognition, the language model that drives the conversation, and the voice the caller hears. It does not hold the business logic. When the caller wants something done, the agent calls a custom function, and each function is an n8n webhook."
    },
    {
      "t": "p",
      "c": "Keeping the two apart means the practice can change opening hours, appointment types or where data goes by editing a workflow, without touching the conversation design."
    },
    {
      "t": "h2",
      "c": "The functions the agent can call"
    },
    {
      "t": "ul",
      "items": [
        "Check availability: n8n reads the calendar and returns open slots for the requested day and treatment.",
        "Book: n8n creates the appointment and returns a confirmation the agent reads back.",
        "Take a message: for anything the agent should not handle, n8n records it for the team."
      ]
    },
    {
      "t": "p",
      "c": "After the call, a webhook sends the call summary and outcome to n8n, which stores it with the booking so the team can see what was said."
    },
    {
      "t": "h2",
      "c": "Designing the conversation"
    },
    {
      "t": "ul",
      "items": [
        "Read back every date and time before booking. Misheard times are the most common failure in voice booking.",
        "Let callers interrupt. People change their mind mid-sentence, and the agent has to follow.",
        "Know the limits. Medical questions and complaints are taken as messages for a person, not answered.",
        "Handle after-hours calls on purpose, with a clear promise about when someone will call back."
      ]
    },
    {
      "t": "h2",
      "c": "Testing before go-live"
    },
    {
      "t": "p",
      "c": "We script test calls for the awkward cases: a caller who gives a date as “next Friday”, one who wants two family members booked together, one who goes silent, one who asks something medical. Each must end in a correct booking or a clear handoff."
    },
    {
      "t": "quote",
      "c": "Keep the voice layer thin and the logic in workflows you can read."
    }
  ],
  "postgresql-schema-orders-routes-targets": [
    {
      "t": "p",
      "c": "We design the schema before the screens, because everything else sits on it. PaFood runs orders, routes, targets and cash for a food distributor, and the decisions below are the ones that kept it understandable as it grew."
    },
    {
      "t": "h2",
      "c": "Separate the plan from what happened"
    },
    {
      "t": "p",
      "c": "A route is a plan: which shops a booker should visit. What happened on a given day is different: when the route was started, which shops were actually visited, and where the phone was. PaFood keeps these apart, with `routes` and `route_shops` for the plan and `route_sessions` and `visits` for reality."
    },
    {
      "t": "p",
      "c": "Mixing the two is the classic mistake. Once a plan row is updated to record what happened, you can no longer answer the most useful question a manager asks: how did the day compare to the plan?"
    },
    {
      "t": "h2",
      "c": "Keep history, do not overwrite it"
    },
    {
      "t": "p",
      "c": "Orders are soft-deleted rather than removed, and changes to a submitted order go through an `edit_requests` table instead of editing the row in place. Money movements are recorded in a `ledger`. When someone asks why a balance is what it is, the answer is in the data, not in someone’s memory."
    },
    {
      "t": "h2",
      "c": "Make every write safe to repeat"
    },
    {
      "t": "p",
      "c": "Field devices retry. The server keeps `idempotency_keys` for incoming requests, and visits carry an ID generated on the phone with a unique index on the server. A request that arrives twice is recognised the second time instead of creating a second order or visit."
    },
    {
      "t": "h2",
      "c": "Targets are data, not code"
    },
    {
      "t": "p",
      "c": "Sales targets change every month and differ by person, so they live in tables (`targets`, and daily targets for bookers) rather than in application logic. Reports compare actual orders against these rows, and changing a target never needs a deploy."
    },
    {
      "t": "h2",
      "c": "Organise around how the business is shaped"
    },
    {
      "t": "p",
      "c": "Regions, branches, users and shops reflect how the company is actually organised, and every order can be traced back through them. That is what lets the web admin show performance by region, by branch and by salesman without special cases."
    },
    {
      "t": "h2",
      "c": "Our checklist"
    },
    {
      "t": "ul",
      "items": [
        "Plan and actual live in different tables.",
        "Nothing important is updated in place without a record of the change.",
        "Every write from a device is idempotent.",
        "Business rules that change often are rows, not code.",
        "The schema mirrors the organisation, so reports need no special cases."
      ]
    }
  ],
  "weekly-friday-builds": [
    {
      "t": "p",
      "c": "From the third week of a project, our clients get a link every Friday to a working version of their system. Not a slide, not a status update: software they can open and use. It is the habit that does the most to keep projects on track."
    },
    {
      "t": "h2",
      "c": "Reports describe, builds prove"
    },
    {
      "t": "p",
      "c": "A status report says a feature is “90% done”. A build shows whether it works. When the client can click through the order screen themselves, there is no gap between what we say and what exists."
    },
    {
      "t": "h2",
      "c": "Misunderstandings surface early"
    },
    {
      "t": "p",
      "c": "Most expensive problems in software are not bugs but misunderstandings: a screen built to the spec that does not match how the team actually works. A weekly build turns those into a five-minute conversation in week three instead of a rewrite in month three."
    },
    {
      "t": "h2",
      "c": "A fixed moment to steer"
    },
    {
      "t": "p",
      "c": "Friday gives the week a shape. We plan the slice on Monday, build through the week and walk through it with the client on a short call. Feedback goes straight into the next slice. Priorities can change every week without the project losing its way."
    },
    {
      "t": "h2",
      "c": "What it asks of us"
    },
    {
      "t": "ul",
      "items": [
        "Work is cut into slices that are useful on their own, not layers that only work at the end.",
        "Every build is deployable, so deployment is routine rather than an event.",
        "A founder is on every walkthrough, because the person who built it should hear the feedback."
      ]
    },
    {
      "t": "h2",
      "c": "What it asks of the client"
    },
    {
      "t": "p",
      "c": "About two hours a week: a short call and some time to try the build. Of everything we ask a client for, this is the one that matters most, because the build is only useful if someone who knows the business looks at it."
    },
    {
      "t": "quote",
      "c": "If it cannot be clicked, it has not shipped."
    }
  ],
  "whatsapp-cloud-api-order-updates": [
    {
      "t": "p",
      "c": "Customers read WhatsApp far more reliably than email, which makes it the natural channel for order confirmations and delivery updates. Doing it properly on the official Cloud API takes a little more setup than an unofficial tool, and saves a business from having its number blocked."
    },
    {
      "t": "h2",
      "c": "Why the official API"
    },
    {
      "t": "p",
      "c": "Unofficial tools automate a normal WhatsApp account, which breaks WhatsApp’s terms and can get the number banned with no warning. The Cloud API is Meta’s supported route for businesses: it is stable, it has proper delivery reporting, and the number stays safe."
    },
    {
      "t": "h2",
      "c": "Templates for messages you start"
    },
    {
      "t": "p",
      "c": "When the business starts the conversation, such as an order confirmation or a dispatch notice, the message must use a template approved by Meta in advance. Templates have placeholders for details like the customer’s name or order number. Write them early, because approval is part of the timeline."
    },
    {
      "t": "h2",
      "c": "The 24-hour window"
    },
    {
      "t": "p",
      "c": "When a customer messages the business, a 24-hour window opens in which the business can reply freely, without a template. Outside that window, only templates can be sent. Design the flows around this: updates are templates, conversations happen inside the window."
    },
    {
      "t": "h2",
      "c": "Know what was delivered"
    },
    {
      "t": "p",
      "c": "The API reports each message’s status by webhook: sent, delivered, read or failed. We store every outgoing message and update its status as these arrive, and keep templates in the database alongside the log. When a customer says they never got the update, the answer takes seconds."
    },
    {
      "t": "h2",
      "c": "Practical details"
    },
    {
      "t": "ul",
      "items": [
        "Store phone numbers in international format, so every message is addressed correctly.",
        "Only message customers who have agreed to receive WhatsApp updates.",
        "Retry failed sends with a pause, and alert a person if a message keeps failing.",
        "Use buttons and lists in templates to let customers answer without typing."
      ]
    }
  ]
};

/** Minutes to read at ~220 words a minute. */
export function readMinutes(post: Post): number {
  const body = BODIES[post.slug] ?? [];
  const text = [post.answer, ...body.flatMap((b) => ('c' in b ? [b.c] : b.items))].join(' ');
  return Math.max(2, Math.round(text.split(/s+/).length / 220));
}
