# Andar website · content and section plan

Drawing: Company website · Rev A · 2026-09-03
Companion: `website/UX-RESEARCH.md` (interaction design, motion, stack, wireframes)

## 1. What the site has to do

One page. Two readers, one job each.

| Reader | What they must get | Test |
|---|---|---|
| Owner of a Cebu operation, not technical | "These two build the thing that stops my stock leaving unpaid, and they'll do it in weeks." | Can they say what Andar does after the hero and one card? |
| Creative director / awards jury | A visual language nobody else in the category has: the general-assembly drawing, used with restraint, that starts to run. | Do they stop at the hero, and does the rail feel inevitable rather than borrowed? |

The reference video (OhMD, "100M patient interactions") gives the skeleton: a headline held in place, then a pinned section where mixed-width cards slide right-to-left across it. We keep that mechanic and replace the healthcare photography with Andar's drawings and live device mockups.

Copy rules, from the deck and kept for the web:

- One idea per viewport. If a screen needs two headlines it is two screens.
- Plain words. Grade-8 reading level. Pesos, weeks, Tuesday.
- Show the outcome, not the feature. "You stop asking how much stock you have," never "real-time inventory API."
- Every use-case card carries a "What it replaces" line. That line is where the owner recognises themself.
- The word "AI" does not appear in a headline anywhere on the page. (The deck's whole argument is that nobody diagnosed the problem first.)
- Nothing on the page claims a client name until written permission is in hand.

## 2. Visual language, inherited from the deck

Everything below already exists in `index.html` and carries over unchanged unless the UX research argues otherwise.

| Token | Light | Dark (navy sheet) |
|---|---|---|
| paper | `#FAF9F5` | `#10293A` |
| bone (panels) | `#F1EFE8` | `#0B1E2B` |
| ink | `#16181A` | `#DCE8EE` |
| mid | `#5F6469` | `#93AAB8` |
| red (one accent, spent on the approval gate and CTAs only) | `#D8401F` | `#F2673C` |
| hair / faint / grid | 8% / 14% / 4.5% ink | 12% / 22% / 5.5% ink |

- Display: FF DIN, falling back to Barlow Semi Condensed. Reading: Barlow.
- Ease: `cubic-bezier(.16, 1, .3, 1)`. Nothing bounces.
- Motifs: sheet number, title block, "Detail E · bay 05 · scale 1:1" callouts, datum lines, "Illustrative" stamp on every mockup. On the web these are used once per section at most, as labels, never as decoration.
- Mockups are rebuilt as live HTML components (picking terminal, handset, invoice, kanban board, command center), not screenshots. They already exist in the deck's markup.

## 3. Page map

```
00  Nav            mark · Work · Method · Who · [Book a diagnostic]
01  Hero           "We make it run."  + the assembly drawing that starts running
02  Rail (pinned)  six use-case cards + three stat interstitials, right to left
03  The ₱1M        the cold open, one number, one week
04  By hand        what manual is already costing you · three benchmarks
05  Problem first  tool-first vs problem-first routing · the 89% stat
06  Method         Diagnose · Narrow · Ship · Hold, drawn to scale
07  Who            two founders
08  Engagements    Diagnostic · Sprint · Retainer
09  Move first     "You have done this before" · GCash
10  CTA            "Let's map your operation."
11  Footer         title block · registered entity · Cebu
```

Sections 03 to 05 are the argument. Sections 06 to 08 are the offer. An owner who reads only 01, 02 and 10 still gets the whole pitch. That is the Apple test and it is the reason the rail comes second, not fifth.

## 4. Section by section

### 00 · Nav

- Left: Andar mark. Right: Work, Method, Who, then the one red pill: "Book a diagnostic".
- Far right, small and monospace-ish: "Cebu · GMT+8 · 14:22" (live clock, from the deck's header). It says "we are a real place, contactable now" without a sentence.
- Nav is transparent over the hero, gains a hairline and paper fill once the rail pins.

### 01 · Hero

- Eyebrow: `Sheet 01 · General assembly`
- H1: **We make it run.**
- Sub (max 2 lines): "Software for the part of your business that still runs by hand. Built in Cebu by two people who run businesses of their own. Weeks, not quarters."
- Primary CTA: Book a diagnostic. Secondary: "See what we've built ↓" (scrolls to the rail).
- Dictionary line, small, below the fold line: *andar, v. — to run; to operate; of a machine, to be working.*
- Visual: the deck's title-sheet drawing, the four numbered parts of an operation (01 Stock, 02 Invoice, 03 Terms, 04 Approval gate) as a line drawing. At load it is a still drawing. On the first scroll tick or after 1.5 s idle, it starts running: the dashed flow lines advance, the parts tick through their states, and the gate at 04 holds until a small "Approved" stamp lands. The whole thing is the tagline, drawn.
- Three hero concepts are ranked in the UX research. This is the content brief; the mechanism is theirs to pick.

### 02 · The rail

The reference mechanic, exactly: the section pins; a headline sits centred on the sheet grid; cards enter from the right and travel left across it; the headline is glimpsed between cards; the section releases when the last card clears.

- Headline held behind the cards: **Built for our own operation first. Then for yours.**
- Sub, under it: "Five systems in production. Four run our business. One runs somebody else's."
- Progress: a datum line along the bottom with card numbers as ticks, `01 — 06`, and the current card's label. This replaces the reference's dots and stays in the drawing language.
- Card anatomy (same on every card, same positions): label top-left in the callout style, headline, one outcome sentence, a "Replaces:" line, and the device mockup. Tall cards put the device beside the text; wide cards put it under.
- Interstitials: three narrow stat cards between the big ones, like the reference's logo cards. They give the rail its rhythm and mixed widths.
- Mobile: agent to decide between a vertical stack and native horizontal snap. The copy is written so either works: every card stands alone.

#### Card 01 · Stock & terms · wide

- Label: `Detail E · picking terminal · bay 05`
- Headline: **Stock doesn't leave until the terms are met.**
- Outcome: "Terms unmet, stock does not move. Nobody argues with a customer they like. The only way past it is a named person approving it on the record."
- Replaces: a payment policy your warehouse staff have to win against the customer.
- Mockup: the picking terminal, three states cycling. `SO-2291 · Checking terms · Release blocked · Overdue ₱312,880.00 · Request approval`.
- For: distributors, traders, anyone who has released stock and then chased the payment for three months.

#### Interstitial A · stat

- `1 week` against `1 quarter` quoted. Build time.

#### Card 02 · Live numbers · tall

- Label: `Detail D · handset · scale 1:1`
- Headline: **You stop asking how much stock you have.**
- Outcome: "Stock, receivables, payables and the approvals waiting on you. On your phone, between deliveries, true as of a second ago."
- Replaces: the end-of-day call to the warehouse, and the spreadsheet somebody updates on Friday.
- Mockup: the handset. `Updated 12s ago · Receivables open · Stock on hand · Payables due 7 days · 1 release awaiting your approval`.

#### Card 03 · Billing · wide

- Label: `Detail A · billing desk · scale 1:2`
- Headline: **Invoices out the same day.**
- Outcome: "Branded PDF. Scan to pay from the document. Rate booked automatically. Nobody retypes a figure, so nobody mistypes one."
- Replaces: spreadsheet math, and the three-day admin backlog your money waits behind.
- Mockup: `INV-2026-0418`, the line items, `Booked at USD 1 = ₱58.40 · Auto`, the QR, `Amount due ₱249,088.00`.

#### Interstitial B · stat

- `₱0` licence, per seat, ever. "Source code: ours. And yours, when we build for you."

#### Card 04 · Service desk · wide · the external proof

- Label: `Detail C · live for a Cebu client · scale 1:1`
- Headline: **Every problem in the business, written down in one place.**
- Outcome: "A driver's GPS drops. A count doesn't match. A receipt needs reprinting. Each becomes a card with a name on it, and the owner stops being the person everyone rings."
- Replaces: group chats, sticky notes, and "I thought you were handling that."
- Mockup: the board. `Problems open 14 · Sorted today 38 · Typical time to first reply 6m`, three columns.
- Client name is `[client]` until written permission. Strongest version names them and says in one sentence what they do.

#### Card 05 · Customs brokerage · wide · worked example

- Label: `Worked example · drawn, not built`
- Headline: **A customs brokerage, on one board.**
- Outcome: "Eight stages from arrival to closed. Every document scored against the checklist that case needs. Every field errand with a name against it."
- Replaces: an inbox, a Viber thread, and a folder on somebody's desk.
- Mockup: the command center header and the "Waiting for you" task, unassigned on purpose. Button: "Open the prototype" (new tab, `demos/dca-shipment-command-center`, runs offline).
- This is the card that says "this is what the diagnostic hands you."

#### Interstitial C · stat

- `5` systems in production. `4` inside our own operation. `1` live for a client.

#### Card 06 · The approval gate · tall · the closer

- Label: `Detail B · the rule under all of it`
- Headline: **Nothing automatic touches your money.**
- Outcome: "You never open the software. It messages you. You answer it like you'd answer your foreman, and nothing moves until you do."
- Replaces: trusting a system you can't see with a number you can't get back.
- Mockup: the phone message `Release control · SO-2291 · Release stock · Bay 05 · ₱482,400.00 · Held · waiting on you`. Interactive: the visitor presses Approve, the stamp lands, the card reads "Approved". Then "Run it again". This is the one card that asks the visitor to do something, and it is the last one, so the rail ends on their fingerprint.

### 03 · The ₱1 million question

- One idea, one number. Headline: **A vendor quoted us ₱1,000,000 and a quarter. We built it in a week.**
- Body: "Inventory and accounting, for our own materials business. It is still running. The gap was never the software. It was knowing what to build, and that gap exists in almost every operation in Cebu."
- Visual: the bill of materials as quoted, two lines, `Total, first year ₱1,000,000+`, next to a counter still climbing labelled "the licence and renewals you never signed."

### 04 · What manual is already costing you

- Headline: **What doing it by hand already costs you.**
- Sub: "Not one of these numbers mentions software. They measure what a business pays to keep retyping numbers."
- Three counters on scroll, each with a plain caption and the source in the datum line:
  - `5×` cost per invoice, top vs bottom performers. APQC.
  - `days` gap in days sales outstanding, top quartile vs median. Hackett 2025.
  - `65%` of stock records wrong on the shelf. DeHoratius & Raman, 2008.
- Footnote in the deck's voice: "The point is the order of magnitude, not the decimal. Multiply it against your own invoice volume and you have done the arithmetic yourself."

### 05 · Problem first

- Headline: **Most of this fails. Here is why ours doesn't.**
- Stat, put up by us: `89%` of firms report no productivity gain from AI over three years (NBER, 6,000 executives). "We are putting this on the screen ourselves."
- The routing diagram, animated as a drawing: Tool first → Buy the tool → Look for a use → Nothing changes → repeats until the budget is gone → ✕. Problem first → Walk the operation → Find the bottleneck → Build one rule → It runs.
- One line under it: "Nobody walked their operation first."

### 06 · The Andar Method

- Headline: **Four stages. Each with a ceiling in writing.**
- Timeline drawn to scale, horizontal, progress tied to scroll: Day 0 · Diagnose 1 week · Narrow days · Ship 2–4 weeks · Hold ongoing.
- Each stage: one sentence and one promise.
  - Diagnose: "We walk your operation and follow the paper." Promise: a written operations map, yours whether or not you hire us.
  - Narrow: "One bottleneck. Not a transformation roadmap."
  - Ship: "In production, used by your staff on an ordinary Tuesday. Not a pilot." Promise: a written pass/fail standard handed over with it.
  - Hold: "Software nobody maintains quietly dies."

### 07 · Who

- Headline: **Two Cebu business owners who build.**
- Two panels, photo plus three facts each, from the deck:
  - Ac Co · Delivery & systems. 15+ years running his own businesses. Built the system that replaced the ₱1M quote. Five systems in production.
  - Nath Ybañez · Experience & marketing. Almost 15 years running his own businesses. Worked with Rockwell Land and the Ayala group. "Has sat on the other side of this table."
- Close: "We run operations of our own. That is the qualification, and both of us are in the room on every engagement."
- The three "why that matters" points become one row of short lines: Operator credibility · Legitimacy, not gig risk · Shipping speed.

### 08 · Engagements

- Headline: **Three ways in. Stop after any one and still be holding something you can use.**
- Three columns: Diagnostic 1 week · Sprint 2–4 weeks · Retainer monthly. One sentence each, from the deck.
- Footer line: "No prices on this page. Ask either of us and you'll get a straight number."

### 09 · Move first

- Short. Headline: **You have done this before.**
- "You never decided to accept GCash. Your customers started paying that way, and you adapted. Last time your customers decided for you. This time you can move first."
- One counter: share of Philippine retail payments made digitally, 2013 to 2024 (BSP). The other two survey stats stay in the deck; one number is enough here.

### 10 · CTA

- Headline: **Let's map your operation.**
- "One week. We come to you. You get a written map of where your money and your hours actually go, yours to keep whether or not you ever work with us."
- The honest line, kept: "If we look and don't find something worth automating, we'll tell you that, and we'll stop there."
- Button: Book a diagnostic. Beside it: email and mobile as plain text. No form in v1; a form is a place for a lead to die.

### 11 · Footer

- Drawn as a title block: Drawing · Company website · Rev A · Scale NTS · Cebu City, Philippines · registered entity and number · © year.
- Links: the deck (`/`), the prototype, email.

## 5. Assets and inputs still needed

| Item | Status | Owner |
|---|---|---|
| Domain and hosting decision | Open. Deck is on GitHub Pages; UX research to confirm it holds for the site. | Nath |
| Founder photos | In `assets/` (AC CO.jpg, NATH YBANEZ.jpeg). Need consistent crops and a colour treatment that sits on paper. | Nath |
| Client name for card 04 | Pending written permission. Ship with `[client]` hidden, not a placeholder. | Ac |
| Email, mobile, registered entity | "To confirm" in the deck. Must be real before launch. | Both |
| Decision on publishing the 89% stat | Recommended yes. It is the most creative-director-stopping content on the page. | Both |
| Mockup components | Extract from `index.html` into reusable components. | Build |
| Hero drawing | New. The four-part assembly as SVG with animatable strokes. | Build |

## 6. Phases

1. **Foundation, week 1.** Design tokens, type scale, nav, hero with the running drawing, the rail with two real cards. This is the awards moment and the thing to get right before anything else is built.
2. **The page, week 2.** All six cards and interstitials, sections 03 to 11, mobile behaviour, reduced-motion path.
3. **Polish, week 3.** Performance budget (LCP, CLS, INP targets in the UX research), font loading, copy pass with an owner who has never seen the deck, then Awwwards submission checklist.

Phase 2 of the site itself, not this plan: one page per use case at `/work/…`, each the long-form version of its card, and the diagnostic booking flow.
