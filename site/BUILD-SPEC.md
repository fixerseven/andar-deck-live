# andar.ph · build spec (contract between build agents)

Read `website/PLAN.md` (copy, sections, cards) and `website/UX-RESEARCH.md` (the how) before
touching anything. The deck at `/index.html` is the source of the visual language and of the
screen mockups. Everything below is the contract; where this file and the research disagree,
this file wins.

## Stack decision

Plain static HTML + CSS + JS in `site/`. No framework, no build step. GSAP 3 + ScrollTrigger
from cdnjs (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` and
`.../3.12.5/ScrollTrigger.min.js`), loaded with `defer`. Fonts from Google Fonts
(Barlow Semi Condensed 400/500/600/700, Barlow 400/500/600). No images except the two
founder photographs and the SVG mark. GitHub Pages serves `site/` as-is.

## Files and who owns them

| File | Owner | Purpose |
|---|---|---|
| `site/index.html` | Agent A | The whole page. All copy from PLAN.md §4, verbatim. Contains `<!-- @include: partials/NAME.html -->` markers where partials go. |
| `site/css/base.css` | Agent A | Tokens, reset, type scale, layout primitives (`.wrap`, `.lab`, `.datum`, `.tblock`, `.stamp`, `.illus`, `.btn`, `.btn-ghost`, `.visually-hidden`), nav, footer. |
| `site/css/sections.css` | Agent A | Hero (layout only; the drawing is a partial), recognition, rail + card anatomy, gate section layout, promises, how-it-goes, who, ways-in, ask. |
| `site/js/main.js` | Agent A | Nav state on scroll, Cebu clock, the rail (GSAP pin + travel as progressive enhancement over native scroll-snap, per research §2.8–2.9), section entrances, gate interaction, `prefers-reduced-motion` handling. |
| `site/css/screens.css` | Agent B | All card screens and the gate phone. Self-contained; every selector is prefixed `.scr-` and scoped under a `.screen` root. |
| `site/partials/screen-*.html` | Agent B | One file per screen (list below). Each is a single root `<div class="screen screen--NAME">…</div>` with no scripts, no external CSS, no ids. |
| `site/partials/hero-drawing.html` | Agent C | Inline `<svg>` of the four-part assembly. Root `<svg class="hero-draw" …>`. |
| `site/js/hero.js` | Agent C | The "cold start" run sequence for the drawing. Exposes `window.AndarHero = { start(), stop() }`. |

Nobody edits another agent's file. The orchestrator inlines partials with a script after all
agents finish; Agent A's markers must be exactly `<!-- @include: partials/screen-pick.html -->`
on their own line.

## Tokens (in `base.css`, on `:root`; dark set under `@media (prefers-color-scheme: dark)`)

```
--paper:#FAF9F5  --bone:#F1EFE8  --ink:#16181A  --mid:#5F6469  --red:#D8401F
--hair:rgba(22,24,26,.08)  --faint:rgba(22,24,26,.14)  --grid:rgba(22,24,26,.045)
dark: --paper:#10293A --bone:#0B1E2B --ink:#DCE8EE --mid:#93AAB8 --red:#F2673C
      --hair:rgba(220,232,238,.12) --faint:rgba(220,232,238,.22) --grid:rgba(220,232,238,.055)
--din:'Barlow Semi Condensed','Helvetica Neue',Arial,sans-serif
--read:'Barlow','Helvetica Neue',Arial,sans-serif
--ease:cubic-bezier(.16,1,.3,1)   --stampEase:cubic-bezier(.22,.86,.26,1)
--page-inset:clamp(20px,5vw,72px)  --rail-gap:clamp(16px,2vw,28px)
```
Screens always keep the LIGHT set regardless of theme (they are paper objects on the sheet):
`.screen{ --paper:#FAF9F5; --bone:#F1EFE8; --ink:#16181A; --mid:#5F6469; --red:#D8401F; … }`.
The red is spent on exactly three things: the primary button, the gate's "waiting" state, and
the stamp. Nowhere else.

Type: no global `--k`. `rem` + `clamp()` everywhere. Inside a `.screen`, `--k: calc(1cqi / 440)`
with `container-type: inline-size` on the screen root, so the deck's mockup CSS ports as-is.

## Section ids and order (Agent A)

`nav` · `#hero` · `#now` (recognition) · `#work` (the rail) · `#gate` · `#promise` · `#how` ·
`#who` · `#ways` · `#ask` · `footer`. Nav links: Work → `#work`, How it goes → `#how`,
Who → `#who`, button "Book a walk-through" → `mailto:work@andar.ph?subject=Come%20and%20look`.

## The rail cards (Agent A markup, Agent B screens)

Seven `<li class="card">` in this order. `card--wide` for 1,3,4,5,6; `card--tall` for 2;
`card--ask` for 7. Each card: `.card-ref` (e.g. `Detail A · 01 / 07`), `.card-eyebrow` (the
business), `.card-need`, `.card-h`, `.card-out`, `.card-fig` (the include), `.card-truth`.

| # | Partial | Business | Screen |
|---|---|---|---|
| 1 | `screen-pick` | Hardware distributor | Picking terminal (deck `.scanner`, sheet 8): SO-2291 · Release held · ₱312,880 overdue · **Ask the boss** button. Three states cycling via CSS animation only. |
| 2 | `screen-book` | Sports club | The club's OWN booking page. NOT in Andar's palette: invent a club brand (name e.g. "Talamban Racquet Club", deep green + off-white, its own rounded type feel using Barlow at heavier weight). Sport picker (Pickleball · Tennis · Pool) → court grid → "Tennis · Court 2 · Tonight 7–8 · Member · Booked". Small "Membership renews 12 Oct" line. |
| 3 | `screen-phone` | Materials trader | Handset (deck `.phone`, sheet 10): four numbers + "1 waiting on you". Plain-language labels: "Stock, both warehouses" / "Owed to you" / "You owe, next 7 days" / "Waiting on you". |
| 4 | `screen-inv` | Furniture exporter | Invoice (deck `.inv`, sheet 11): INV-2026-0418, USD and PHP lines, "Today's rate", QR, "Scan to pay", amount due. |
| 5 | `screen-desk` | Delivery company | Kanban (deck sheet 12): 14 open · 38 sorted today · three columns with names on cards. Company name shown as "[ their name ]" placeholder in mid colour. |
| 6 | `screen-cc` | Customs brokerage | Command centre header (deck sheet 13): counts, eight stage chips, one "Waiting for you" task. Plus a small **Click the working sample** link → `../demos/dca-shipment-command-center/` target=_blank. |
| 7 | none | Your business | No screen. Big headline + Book a walk-through button. |

Gate phone: `screen-gate` — the message "Release stock · Bay 05 · ₱482,400 · Waiting on you"
with a **Yes** button and a **Not yet** ghost button. Agent B provides the markup and the
`.is-approved` state styling (stamp lands, "Approved · 14:22"). Agent A's `main.js` toggles
the class on click and wires "Try it again".

Every screen carries `<span class="illus">Illustrative</span>` bottom-right.

## Hero (Agent A layout, Agent C drawing)

Layout: two columns on desktop (text left ~45%, drawing right), stacked on mobile with the
drawing below. H1 "Make it run." at `clamp(3.4rem, 9vw, 8.5rem)`, weight 600, line-height .92,
letter-spacing -.02em. Sub at `clamp(1.05rem, 1.4vw, 1.3rem)` max 34ch. Two buttons. The
dictionary line in `.lab` under them. The drawing partial goes at
`<!-- @include: partials/hero-drawing.html -->`; Agent A gives it a container
`<div class="hero-fig" aria-hidden="true">` sized to fill its column.

Drawing (Agent C): the four numbered parts of a business as a general-assembly line drawing —
01 Stock (a rack/bin), 02 Invoice (a document), 03 Terms (a calendar/ledger), 04 the Gate (a
valve or a barrier with a stamp). Flow lines connect them left→right with balloons 01–04 and a
dim line. Strokes only, `currentColor`, 1.25px, no fills except the stamp. Viewbox around
800×520. At rest it is a complete still drawing. `AndarHero.start()` runs the sequence: flow
lines march (dash offset), 01→02→03 tick through a state each (a small check or a number
flips), the gate HOLDS (a red "waiting" dot pulses) while upstream keeps moving, then after
~2.4s the stamp lands (scale .9→1, `--stampEase`, 260ms) and the gate opens, the last line
runs through, loop after a 3s pause. Total loop ~7s. Under `prefers-reduced-motion`,
`start()` sets the final "running" state with no animation. No JS libraries.

## Motion (Agent A)

Seven named motions from research §4: `draw` (strokes), `settle` (entrance: 16px up, 480ms,
--ease), `stamp`, `travel` (the rail), `tick`, `run`, `handoff`. Entrances use CSS
scroll-driven animations with a JS IntersectionObserver fallback that adds `.is-in`; nothing
is ever parked at opacity 0 without a fallback. Cap: ≤12 animations simultaneously. Rail:
`gsap.matchMedia()` desktop ≥1024px & no reduced-motion → pin the `.rail-stage` and scrub
the track `x` with a 1:1 scroll-to-travel ratio (`end: () => '+=' + (track.scrollWidth -
window.innerWidth)`), `ScrollTrigger.config({ ignoreMobileResize: true })`; otherwise the
native `overflow-x:auto; scroll-snap-type:x mandatory` base does everything. Prev/next
buttons and progress datum work in both modes. `focusin` on a card scrolls the page to that
card's rail progress in pinned mode.

## Quality bar

- Everything is readable at rest with JS disabled.
- No horizontal page scroll on any viewport ≥320px.
- Lighthouse-ish: LCP is the H1 text; fonts `display=swap` with preconnect; total first-view
  under 300 KB excluding fonts.
- Keyboard: every control focusable with a visible 2px `--red` outline offset 3px.
- Copy is copied from PLAN.md exactly; do not paraphrase, do not add sections.
- No word from the banned list (PLAN.md §5 rule 4) anywhere in visible text.
