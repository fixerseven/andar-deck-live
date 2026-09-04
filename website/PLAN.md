# Andar website · content and section plan

Drawing: Company website · Rev B · 2026-09-04
Companion: `website/UX-RESEARCH.md` — interaction design, motion, stack, wireframes.

Rev B rebuilds the content from first principles. Rev A borrowed its argument from the
pitch deck (the ₱1,000,000 vendor quote, the APQC and Hackett benchmarks, the NBER 89%
figure, the GCash adoption curve). All of that is retired. It argued *that automation is
worth doing* — a case the reader either already accepts or will not be argued into. This
revision argues something narrower and truer: *this specific thing, in your operation,
should stop depending on somebody remembering.*

---

## 1. Positioning

### The enemy, named in the reader's own words

Every small operation in Cebu is held together by a person remembering. Somebody
remembers which customer is over their terms. Somebody remembers that the container
cleared on Tuesday. Somebody remembers to send the invoice. It works, until that person
is on leave, or busy, or wrong, and it never scales past the number of things one head
can hold.

That is the whole pitch, and it needs no statistic to land. The owner has lived it.

> **Right now, your business runs on someone remembering.**

### The promise

> **We make it run.**
> *andar, v. — to run; to operate; of a machine, to be working.*

One line under it, for the reader who needs the literal version:

> We build the one system your operation is missing, put it in production in weeks, and
> leave every decision it makes in your hands.

### Three pillars

| | Pillar | The line | Why it is defensible |
|---|---|---|---|
| 01 | **Operators, not vendors** | "We run businesses of our own. Both of us are in the room, every engagement." | Not a claim a freelancer or a dev shop can copy. It is a biography. |
| 02 | **Narrow, and actually shipped** | "One bottleneck. In production in weeks, used by your staff on an ordinary Tuesday." | Falsifiable, and the prototype on the page proves the shape. |
| 03 | **You keep every decision** | "Nothing automatic touches your money. The system asks, and waits." | **The ownable one.** Nobody else in this category is selling restraint. |

Pillar 03 is the position. Everyone selling software to an owner promises to take work
off their plate; the owner hears "take control away from me," and that fear is the real
reason the sale dies. Andar is the only one saying: the system does the remembering, you
keep the deciding. The approval gate is not a feature on the list — it is the argument,
and the site should be built so a visitor cannot leave without having pressed it.

### Who this is written for

The owner of a Cebu operation with somewhere between 10 and 200 staff — distribution,
trading, brokerage, service, light manufacturing. They are not technical. They are not
anti-technology; they have simply been sold to badly before. They can sign a cheque
without asking anyone. They will decide about you in ninety seconds.

### What we no longer say

- No borrowed benchmarks. If a number is on the page it is Andar's own, or it is not there.
- The word "AI" appears nowhere in a headline. It is a category the reader distrusts and
  it describes none of the value.
- No "digital transformation," "solutions," "leverage," "streamline," "empower."
- No claim about a client until written permission is in hand.
- No fear-based framing. The reader is running a working business. Insulting it loses them.

---

## 2. Visual language

Carried from the deck unchanged, unless the UX research argues otherwise.

| Token | Light | Dark |
|---|---|---|
| paper | `#FAF9F5` | `#10293A` |
| bone | `#F1EFE8` | `#0B1E2B` |
| ink | `#16181A` | `#DCE8EE` |
| mid | `#5F6469` | `#93AAB8` |
| red — one accent, spent only on the approval gate and the CTA | `#D8401F` | `#F2673C` |

Display: FF DIN → Barlow Semi Condensed. Reading: Barlow. Ease `cubic-bezier(.16,1,.3,1)`.
Nothing bounces.

Motifs from the general-assembly drawing — sheet numbers, title blocks, `Detail E · bay 05
· scale 1:1` callouts, datum lines, the `Illustrative` stamp on every mockup. Used once
per section at most, always carrying information (a real label, a real scale), never as
decoration. The moment a callout labels nothing, it is a gimmick and it comes out.

Device mockups are rebuilt as live HTML, not screenshots. They already exist in the deck.

---

## 3. Page map

```
00  Nav              mark · Work · Method · Who · [Book a diagnostic]
01  Hero             "We make it run."          — the assembly drawing that starts running
02  Recognition      "Right now, it runs on someone remembering."   — one screen, one idea
03  Rail  (pinned)   six use-case cards, right to left              — THE MOMENT
04  The gate         "Nothing moves until you say so."              — interactive, the position
05  In writing       four promises, drawn as a title block          — replaces the old stats
06  Method           Diagnose · Narrow · Ship · Hold, drawn to scale
07  Who              two operators
08  Engagements      Diagnostic · Sprint · Retainer
09  CTA              "Let's map your operation."
10  Footer           title block
```

An owner who reads only 01, 02 and 09 still gets the entire pitch. That is the Apple test,
and it is why the rail sits third rather than sixth. Sections 04 and 05 are the trust
argument, and they are made of Andar's own conduct rather than anybody's research.

---

## 4. Section by section

### 00 · Nav

Left, the Andar mark. Centre-right, three words: Work, Method, Who. Right, one red pill:
**Book a diagnostic**. Far right, small: `Cebu · GMT+8 · 14:22`, a live clock.

That clock is doing real work. It says *we are a real place in your time zone and you can
reach us now*, which is the single largest objection to hiring anyone for software, and it
says it without a sentence of copy.

Transparent over the hero; gains a hairline and a paper fill the moment the rail pins.

### 01 · Hero

- Eyebrow: `Sheet 01 · General assembly`
- H1: **We make it run.**
- Sub, two lines maximum:
  > Software for the part of your business that still runs on someone remembering.
  > Built in Cebu by two people who run operations of their own.
- Primary: **Book a diagnostic**. Secondary: **See what we've built ↓**
- Below the fold line, small: *andar, v. — to run; to operate; of a machine, to be working.*

**The visual.** The four numbered parts of an operation as a line drawing — `01 Stock`,
`02 Invoice`, `03 Terms`, `04 Approval gate`. At load it is a still technical drawing, and
it must be readable as one in a screenshot. Then it starts running: dashed flow lines
advance, each part ticks through its states, and the gate at `04` holds — everything
upstream keeps moving, the gate does not open, until a small stamp lands and it releases.

The tagline is the drawing. The position is in the drawing. Nobody has to read a word.

Three hero concepts are ranked in the UX research; this is the content brief, and the
mechanism is theirs to choose.

### 02 · Recognition — one screen, one idea

The screen where the owner recognises themself. It must be short enough to read standing up.

- H2: **Right now, it runs on someone remembering.**
- Three lines, each one a person and a thing held in their head — set as a list, no prose:
  > Somebody remembers which customer is over their terms.
  > Somebody remembers that the delivery went out but the invoice didn't.
  > Somebody remembers what actually happened last Tuesday.
- The turn, one line, weighted:
  > It works. It just doesn't scale past one person's memory — and it goes on leave.

No statistics. No fear. The reader supplies the evidence, because it is their own week.

### 03 · The rail — the awwwards moment

The reference mechanic (ohmd.com), rebuilt in Andar's language. The section pins; a
headline is held on the sheet grid behind the cards; cards enter from the right and travel
left across it, so the headline is read in fragments between them; the section releases
when the last card clears.

- Held headline: **Built so nobody has to remember.**
- Sub: *Five systems in production. Four run our own businesses. One runs somebody else's.*
- Progress: a datum line across the bottom, card numbers as ticks `01 — 06`, current card
  labelled. This is the drawing's own idiom, and it replaces the reference's dots.

**Card anatomy** — identical positions on every card, so the eye learns it once:

```
┌──────────────────────────────────────────────┐
│ Detail E · picking terminal · bay 05         │  ← callout label, mono, mid
│                                              │
│ Stock doesn't leave until                    │  ← headline, display, 2 lines max
│ the terms are met.                           │
│                                              │
│ Terms unmet, stock does not move. Nobody     │  ← outcome, one sentence, plain
│ has to argue with a customer they like.      │
│                                              │
│ Replaces  the policy your warehouse staff    │  ← the recognition line
│           have to win an argument to enforce │
│                                              │
│ ┌────────────────────────┐      Illustrative │  ← live mockup, not a screenshot
│ │  SO-2291   Release     │                   │
│ │  blocked · ₱312,880    │                   │
│ └────────────────────────┘                   │
└──────────────────────────────────────────────┘
```

Every card carries a `Replaces` line. That line is where the owner recognises their own
operation, and it is the single most important sentence on each card — write it before
writing the headline.

Mixed widths give the rail its rhythm, as in the reference: wide cards for boards and
desks, tall cards for handsets, narrow fact cards between them.

---

#### Card 01 · Stock and terms · wide

- `Detail E · picking terminal · bay 05`
- **Stock doesn't leave until the terms are met.**
- Terms unmet, stock does not move. Nobody has to argue with a customer they like, and the
  only way past it is a named person approving it on the record.
- Replaces — the policy your warehouse staff have to win an argument to enforce.
- Mockup: the picking terminal cycling `SO-2291 · checking terms · release blocked ·
  overdue ₱312,880.00 · request approval`.
- Reads to: distributors and traders who have released stock and then chased the payment
  for three months.

#### Fact A · narrow

`5` systems in production. Four run our own businesses. One runs somebody else's.

#### Card 02 · Live numbers · tall

- `Detail D · handset · scale 1:1`
- **You stop asking how much stock you have.**
- Stock, receivables, payables, and whatever is waiting on your approval. On your phone,
  between deliveries, true as of a second ago.
- Replaces — the end-of-day call to the warehouse, and the spreadsheet somebody updates on
  Friday.
- Mockup: the handset, `Updated 12s ago`, four figures, `1 release awaiting your approval`.

#### Card 03 · Billing · wide

- `Detail A · billing desk · scale 1:2`
- **Invoices out the same day.**
- Branded PDF, scan-to-pay from the document itself, the rate booked automatically. Nobody
  retypes a figure, so nobody mistypes one.
- Replaces — the admin backlog your money is sitting behind.
- Mockup: `INV-2026-0418`, line items, `Booked at USD 1 = ₱58.40 · Auto`, QR, amount due.

#### Fact B · narrow

`2–4 weeks` to production. The ceiling goes in the contract, not the pitch.

#### Card 04 · Service desk · wide · the external proof

- `Detail C · live for a Cebu client · scale 1:1`
- **Every problem in the business, written down in one place.**
- A driver's GPS drops out. A branch count doesn't match. A customer wants a receipt
  reprinted. Each becomes a card with a name against it, and the owner stops being the
  person everybody has to ring.
- Replaces — group chats, sticky notes, and "I thought you were handling that."
- Mockup: the board. `Problems open 14 · Sorted today 38 · Time to first reply 6m`.
- Client shown as `[client]` until written permission. The strongest version names them and
  says in one sentence what they do.

#### Card 05 · Customs brokerage · wide · worked example

- `Worked example · drawn, not built`
- **A shipment on one board, not in three places.**
- Eight stages from arrival to closed. Every document scored against the checklist that
  case actually needs. Every field errand with a name against it.
- Replaces — an inbox, a Viber thread, and a folder on somebody's desk.
- Mockup: the command centre header and the *Waiting for you* task, left unassigned on
  purpose. Button: **Open the prototype** → `demos/dca-shipment-command-center`, new tab,
  runs offline.
- The honest label stays: it is a working prototype with invented data, and it touches no
  customs, carrier or bank system. Saying so is worth more than the claim it gives up.

#### Fact C · narrow

`Source code: yours.` No per-seat licence. No renewal you didn't sign.

#### Card 06 · The gate · tall · the closer

- `Detail B · the rule under all of it`
- **Nothing automatic touches your money.**
- You never open the software. It messages you, you answer it the way you'd answer your
  foreman, and nothing moves until you do.
- Replaces — trusting software with a decision you would normally make yourself.
- Mockup, and it is **interactive**: `Release control · SO-2291 · Bay 05 · ₱482,400.00 ·
  Held · waiting on you`. The visitor presses **Approve**; the stamp lands; the card reads
  `Approved`. Then: *Run it again.*

The rail ends on the visitor's own fingerprint. That is deliberate: the last thing they do
before leaving the section is exercise control, which is the thing they were afraid of losing.

### 04 · The gate, full width

The rail's last card, given a whole screen because it is the position rather than a feature.

- H2: **Nothing moves until you say so.**
- Body: Every consequential action — releasing stock, issuing a credit, changing a price —
  stops and waits for a named person. The system does the remembering. You do the deciding.
- The phone, larger, live, and it will wait there all afternoon if the visitor doesn't press
  it. That patience is the demonstration; do not time it out.
- One line under: *It will wait all afternoon if it has to. That is the whole design.*

### 05 · What we put in writing

This is the section that replaces the old benchmark stats. Borrowed research proved a
general case; these four promises prove Andar's, and they are checkable.

- H2: **Four things we put in writing.**
- Drawn as a title block, four cells:

| | Promise |
|---|---|
| 01 | **The map is yours.** The written operations map from the diagnostic is yours to keep, whether or not you hire us. |
| 02 | **You own the code.** Source code delivered to you. No per-seat licence, no renewal. |
| 03 | **A date you can hold us to.** Every stage has a ceiling, and it goes in the contract. |
| 04 | **A written pass/fail standard.** We hand you the test the system has to pass, and it either passes or we are not finished. |

Closing line, and it belongs on the page:
> And if we look at your operation and don't find something worth building, we'll tell you
> that, and we'll stop there.

### 06 · Method

- H2: **Four stages. Each with a ceiling.**
- Drawn to real proportion, horizontal, progress tied to scroll.

| Stage | Ceiling | One sentence |
|---|---|---|
| Diagnose | 1 week | We walk your operation, follow the paper, and sit with your people. |
| Narrow | days | One bottleneck. Not a transformation roadmap. |
| Ship | 2–4 weeks | In production, used by your staff on an ordinary Tuesday. Not a pilot. |
| Hold | ongoing | Support and the next thing on the list. Software nobody maintains quietly dies. |

### 07 · Who

- H2: **Two Cebu operators who build.**
- **Ac Co** · Delivery and systems. 15+ years running his own businesses — materials trading
  and a fitness brand, both still trading, his own stock and his own payroll. Owns every
  technical decision and the approval-gate standard.
- **Nath Ybañez** · Experience and marketing. Almost 15 years running his own businesses
  across agriculture, technology and marketing. Has worked with Rockwell Land and the Ayala
  group. Has bought the software, hired the freelancer, and paid for the pilot that never
  shipped — and will say so.
- Close: *We run operations of our own. That is the qualification, and both of us are in the
  room on every engagement.*

### 08 · Engagements

- H2: **Three ways in. Stop after any one and you're still holding something you can use.**
- Diagnostic · 1 week — we walk your operation and hand you the written map.
- Sprint · 2–4 weeks — one working system, in production, verified against the written standard.
- Retainer · monthly — support, monitoring, and the next thing on the list.
- Foot: *No prices on this page. Ask either of us and you'll get a straight number.*

### 09 · CTA

- H2: **Let's map your operation.**
- One week. We come to you. You get a written map of where your money and your hours
  actually go — yours to keep whether or not you ever work with us.
- Button: **Book a diagnostic**, with email and mobile beside it as plain text.
- No form in v1. A form is a place for a lead to die; these are two people who can answer a
  phone.

### 10 · Footer

Drawn as a title block: `Drawing · Company website · Rev B · Scale NTS · Cebu City,
Philippines`, registered entity and number, year. Links: the deck, the prototype, email.

---

## 5. Copy rules

1. One idea per viewport. Two headlines means two screens.
2. Plain words, grade-8 reading level. Pesos, weeks, Tuesday, foreman.
3. Show the outcome, never the mechanism. "You stop asking how much stock you have," not
   "real-time inventory sync."
4. Every card carries a `Replaces` line, written before its headline.
5. Numbers on the page are Andar's own or they are not on the page.
6. No "AI" in any headline.
7. Name nothing we don't have permission to name.
8. Read every headline aloud. If it sounds like a brochure, it is one.

---

## 6. Open inputs

| Item | Status | Owner |
|---|---|---|
| Email, mobile, registered entity and number | `To confirm` in the deck. Must be real before launch. | Both |
| Client name for card 04 | Pending written permission. Ships as `[client]`, not as a placeholder. | Ac |
| Founder photographs | In `assets/`. Need matched crops and a treatment that sits on paper. | Nath |
| Domain and hosting | Deck is on GitHub Pages. UX research confirms or replaces. | Nath |
| Hero assembly drawing | New build. SVG with animatable strokes. | Build |
| Mockup components | Extract from `index.html` into reusable pieces. | Build |

## 7. Phases

1. **Foundation.** Tokens, type scale, nav, hero with the running drawing, the rail with two
   real cards. This is the awards moment; nothing else is built until it is right.
2. **The page.** Remaining cards, sections 04–10, mobile behaviour, reduced-motion path.
3. **Polish.** Performance budget, font loading, and a copy pass read aloud to an owner who
   has never seen the deck. If they can't say what Andar does afterwards, the copy failed,
   not the listener.

Later, not now: one page per use case at `/work/…`, each the long-form version of its card.
