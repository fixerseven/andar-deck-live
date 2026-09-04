# Andar website · UI/UX specification

Drawing: Company website · Rev A · Interaction design, motion, stack, wireframes
Companion: `website/PLAN.md` (sections and copy). **This document specifies the system, not the words.**
Every piece of copy below is a named slot in `SMALL CAPS BRACKETS` — e.g. `[HERO.H1]`. Fill them from PLAN.md.

Source material read: `index.html` (deck, 166 KB — tokens, primitives, five live mockups),
`demos/dca-shipment-command-center/index.html` (172 KB standalone clickable prototype).

---

## 0. What is being carried over, and what is being left behind

**Carried over unchanged** — these are the site's identity and must not be re-designed:

| Thing | Where it lives in the deck |
|---|---|
| Token set, light + `body.asbuilt` navy | `:root` / `body.asbuilt`, lines 45–80 |
| `--ease: cubic-bezier(.16,1,.3,1)`, `--stampEase: cubic-bezier(.22,.86,.26,1)` | same |
| Sheet frame + 40px drafting grid + A–E/1–4 coordinates | `.sheet`, `.coords` |
| Title block (Drawing / Rev / Sheet / Scale) | `.tblock` |
| Drafting primitives: `.lab` `.balloon` `.dim` `.dimline` `.tick` `.stamp` `.hatch` `.rule` `.datum` `.illus` | "PRIMITIVES" block |
| "Detail E · picking terminal · bay 05" / "· scale 1:1" callouts | sheets 8, 10, 11, 12, 13 |
| Five live mockups, all pure HTML+CSS, zero images: picking terminal (`.scanner`), handset (`.phone`), invoice (`.inv`), service-desk kanban (`.screen` + `.cols` + `.trav`), brokerage command centre (`.screen` + `.cc-*`) | sheets 8, 10, 11, 12, 13 |
| Screens keep the light set on a dark sheet (`.screen,.phone,.inv` re-declare the light tokens) | line 88 |

**Left behind deliberately:**

1. **`--k`, the global scale unit.** `--k: min(100vw/1600, 100vh/900)` is right for a 16:9 presentation and wrong for a website: it scales body text with the viewport, defeats browser zoom and user font-size settings, and produces 9px type on a laptop. On the site, `--k` survives **only scoped inside a mockup** (§5.4). Everything else uses `rem` + `clamp()`.
2. **`overflow:hidden` on `body` + y-mandatory scroll-snap on the deck.** A website scrolls.
3. **Keyboard-driven `data-steps` presenter builds.** No presenter. Those become scroll-triggered or removed.
4. **The `.splash` canvas cover.** 2717 lines of canvas particle work for a cover the web doesn't need. The hero replaces it.

---

## 1. Reference landscape

Twelve sites, each verified to exist via search before citing. Grouped by what they teach. `ohmd.com`
(the founder's reference) is blocked by this environment's egress proxy — noted below from the brief and
from what is publicly documented, not from inspection.

### 1.1 The rail mechanic (pinned section, horizontal card travel)

**1. OhMD — https://www.ohmd.com/** *(the founder's reference; page confirmed live and carrying the "100M patient interactions" line, but blocked from direct inspection here)*
- **Technique:** full-viewport hero, then a pinned section whose headline is held in place while a row of mixed-width cards (tall image cards, wide white cards) translates right-to-left as the user scrolls vertically. The headline is glimpsed *between* cards.
- **Borrow:** the occlusion trick — the headline is a background layer, cards are opaque foreground; nothing else is needed to make the effect read. Mixed card widths, so the rhythm is not a metronome. Cards are the section's whole content, so there is no competing scroll region.
- **Avoid:** copying the healthcare photography register. Andar has no stock photography and should not acquire any — the cards' "image" is a live mockup, which is a stronger asset than a photo.

**2. Chipsa — https://www.awwwards.com/sites/chipsa/ (site: chipsa.design)** *Awwwards SOTD, 30 Sept 2025, + Developer Award*
- **Technique:** portfolio built on long scroll-linked sequences and horizontal travel; WebGL-heavy (their own six-year WebGL retrospective documents the approach).
- **Borrow:** their pacing discipline — each horizontal beat is one idea and the scroll distance per beat is short.
- **Avoid:** the WebGL. Andar's differentiator is that the drawings are *real DOM*, crisp at any zoom, indexable and printable. A canvas would throw that away and add 200 KB.

**3. Awwwards "Horizontal Layout Websites" collection — https://www.awwwards.com/awwwards_collections/collections/horizontal-layout-websites/**
- **Technique:** the curated set of full-horizontal sites, plus Awwwards' own caveat: *"horizontal scrolling works well with portfolios and gallery websites, but not so much with text-driven sites."*
- **Borrow:** the warning. Andar's rail is text-driven. Therefore the rail must be **one bounded section**, not the site's navigation model — the page above and below it scrolls normally.
- **Avoid:** full-page horizontal. It kills deep links, breaks Ctrl+F expectations, and reads as 2019.

**4. Lusion v3 — https://www.awwwards.com/sites/lusion-v3/ (site: lusion.co)** *Awwwards SOTD; the earlier Lusion site was Site of the Month*
- **Technique:** scroll-linked choreography where the scroll input drives a continuous timeline rather than triggering discrete states.
- **Borrow:** `ease: none` on anything scroll-linked. Scrubbed motion that has its own easing feels like the page is arguing with your hand.
- **Avoid:** their load budget. Lusion is a rendering studio proving a point; Andar is selling to a distributor's owner on a Cebu 4G connection.

### 1.2 Pinned storytelling and scroll-driven sequencing

**5. Apple AirPods Pro — https://www.apple.com/airpods-pro/**
- **Technique:** the canonical pinned scrollytelling product page — chapters of text, pack shots and video alternate, each frame synchronised to scroll position so the animation plays as you scroll either direction. Documented to death (CSS-Tricks: *"Let's Make One of Those Fancy Scrolling Animations Used on Apple Product Pages"*, https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/).
- **Borrow:** reversibility. Every scroll-linked state on the Andar site must be exactly as correct scrolling up as scrolling down. And: **specs are never in the story.** Apple puts them on a separate Tech Specs page.
- **Avoid:** the image-sequence technique itself (hundreds of JPEGs scrubbed on a canvas). Andar's equivalent motion is CSS on real DOM and costs kilobytes.

**6. Opal Tadpole — https://www.awwwards.com/sites/opal-tadpole/ (site: opalcamera.com)** *Awwwards Site of the Year 2024 + Developer Award*
- **Technique:** a product page whose scroll animations demonstrate the product's features rather than decorate them. Notably, it has been publicly **rebuilt using only modern CSS scroll-driven animations** — Frontend.fyi, *"Rebuilding Opal Tadpole's website with modern CSS"*, https://www.frontend.fyi/tutorials/rebuilding-opal-tadpoles-website-with-modern-css
- **Borrow:** the proof that an SOTY-grade scroll page does not require a JS animation runtime. And the principle: **the animation is the argument.** Andar's version is "the drawing starts running".
- **Avoid:** cuteness. Opal is a consumer webcam; Andar is talking to someone whose stock is walking out the door.

**7. Igloo Inc — https://www.awwwards.com/sites/igloo-inc/ (site: igloo.inc)** *Awwwards Site of the Year 2025 + Developer Site of the Year*
- **Technique:** an uninterrupted scroll-driven world; the highest-scoring recent example of scroll as narrative.
- **Borrow:** the confidence to give one idea an entire viewport with nothing else on screen.
- **Avoid:** everything else. It is a 3D crypto-brand experience; Andar's jury argument is restraint, and imitating Igloo is how a two-person studio loses on Usability (30% of the score, §8.4).

**8. Stripe — https://www.awwwards.com/sites/stripe/ and Stripe Dot Dev — https://www.awwwards.com/sites/stripe-dot-dev/** *Awwwards Nominee / SOTD*
- **Technique:** dynamic vector illustration as the primary visual, no photography; a house illustration language applied at every scale.
- **Borrow:** the discipline of an owned illustration system. Andar already has one (the general-assembly drawing). Stripe is the proof that this beats photography for a technical B2B audience.
- **Avoid:** Stripe's gradient/gloss register. Andar's drawing is matte, monochrome and red-accented; adding gradients would dissolve the whole thesis.

### 1.3 Technical-drawing and instrument aesthetics

**9. Anduril Industries — https://www.awwwards.com/sites/anduril-industries/ (site: anduril.com)** *Awwwards Honorable Mention*
- **Technique:** near-monochrome black/white, typographic-first, technical/retro-industrial register applied to hardware.
- **Borrow:** the *tone* — hardware seriousness without theatre; small typographic labels doing the work that decoration usually does.
- **Avoid:** the defence-sector coldness. Andar's reader is a family-business owner; the site needs the drawing's precision with a warm paper ground, which is exactly what `#FAF9F5` already delivers.

**10. Teenage Engineering — https://teenage.engineering/**
- **Technique:** product-manual typography, orthographic product views, dense small-caps labelling, catalogue-grid layouts. The reference case for "technical drawing as brand".
- **Borrow:** labels are set at 9–11px in a condensed grotesque with 0.16–0.2em tracking, and there is *a lot* of white space around them — which is exactly what `.lab` already is in the deck. Also: they never explain the device with prose when a callout will do.
- **Avoid:** their density. TE sells to people who enjoy manuals. Andar's owner does not; the drawing language must be a frame around plain sentences, never a substitute for them.

**11. Playdate — https://play.date/ (build documented by Little Workshop, https://www.littleworkshop.fr/projects/playdate/; One Page Love award, https://onepagelove.com/playdate)**
- **Technique:** a 15k-polygon device model **built from the actual technical drawings**, under 1 MB, embedded in a one-pager you can rotate and inspect.
- **Borrow:** the framing — "here is the object, inspect it." That is what a live mockup card should feel like. Also the budget discipline: a hero object under 1 MB.
- **Avoid:** 3D. Andar's objects are already built in CSS (`.phone`, `.scanner` — six real faces, machined rails, perspective). They cost ~2 KB and are already better than a model for this purpose.

**12. Awwwards "Interactive WebGL Exploded View" (IYO) — https://www.awwwards.com/inspiration/interactive-webgl-exploded-view-iyo**
- **Technique:** scroll-driven explode/assemble of a product into labelled parts.
- **Borrow:** the confirmation that exploded-view-on-scroll is a recognised, jury-legible device — and Andar's deck already has it in CSS (`.asm`, `@keyframes assemble`, `--zo`/`--zc` explode/nest offsets).
- **Avoid:** doing it in WebGL, and doing it more than once on the page. The hero owns the explode; nothing else may.

### 1.4 What the landscape says, in one line

Nobody in Andar's category (small ops-software studios) is using drafting language, and the two things
juries reward hardest right now — scroll-driven narrative and an owned illustration system — Andar
already has as **static, printable, 2 KB CSS assets**. The site's job is to not waste that.

---

## 2. The horizontal rail, in depth

### 2.1 The three candidate techniques

| | **A. Pin + translate** (GSAP ScrollTrigger) | **B. Native CSS scroll-snap** (`overflow-x`) | **C. CSS scroll-driven animations** (`animation-timeline`) |
|---|---|---|---|
| Mechanism | Section pinned; track's `x` scrubbed against vertical scroll progress | Real horizontal scroll container; user scrolls it directly | Tall spacer + `position:sticky` stage; track animated on `scroll()`/`view()` timeline |
| Headline glimpsed between cards | Yes, trivially | No — the headline would have to scroll with the track | Yes, same as A |
| Vertical scroll drives horizontal travel | Yes | No | Yes |
| Runs off main thread | No (JS per frame, but transform-only) | Yes (native) | Yes (compositor, incl. Safari 26.4+ threaded) |
| Browser support | Universal | Universal | ~83% global. Chrome/Edge 115+, Safari 26+ (Sept 2025), Firefox still behind `layout.css.scroll-driven-animations.enabled`. **Not Baseline.** (WebKit: https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) |
| Works with no JS | No | Yes | Yes |
| Resize handling | Manual (`invalidateOnRefresh`, `matchMedia`) | Free | Free |
| Keyboard / AT | **Must be built by hand** | Free (it's a scroll container: Tab, arrows, scrollbar) | Must be built by hand |
| Cost | ~25 KB gz (gsap + ScrollTrigger). **Free for commercial use since April 2025** (Webflow: https://webflow.com/blog/gsap-becomes-free) | 0 KB | 0 KB |
| Failure mode if it breaks | Section collapses / double scrollbars | None | Animation simply doesn't run; track sits at frame 0 |

### 2.2 Card sizing and mixed widths

Cards are sized in **viewport-inline units with clamps**, never raw `vw`, and never in `vh`:

```css
--card-h:      min(70svh, 620px);          /* svh, never vh — see §2.7 */
--card-tall:   clamp(17rem, 27vw, 24rem);  /* portrait: handset, scanner        */
--card-wide:   clamp(26rem, 46vw, 44rem);  /* landscape: kanban, command centre */
--card-note:   clamp(15rem, 22vw, 20rem);  /* text-only interstitial            */
--rail-gap:    clamp(1rem, 2.2vw, 2rem);
```

Three widths in a repeating-but-not-periodic order — `wide, tall, note, tall, wide, tall, note` — so the
eye never predicts the next edge. All cards share **one height** (`--card-h`); mixing heights as well as
widths turns the rail into confetti and destroys the "row of drawings pinned to a board" reading.

Total track width must be **measured, never assumed** — cards contain live mockups whose intrinsic width
depends on the loaded font. Everything downstream reads `track.scrollWidth` after `document.fonts.ready`.

### 2.3 Progress indicator

Reuse the deck's own furniture rather than inventing a widget — this is the single highest-value
carry-over on the page:

- **The datum line.** The deck's `.prog` is a 1px hairline with a red `scaleX` fill. In the rail it sits on the stage's bottom edge, full bleed, and its `scaleX` is the rail's own progress. It is the same object the hero hands off (§3.4).
- **The sheet counter.** A title-block cell reading `[RAIL.REF] 03 / 07` — tabular numerals, `.lab` styling, updates on card change only (not per frame).
- **Tick marks.** One 7px tick per card on the datum line, at each card's centre position. They are the drawing's own dimension ticks and they double as click targets (§2.6).

No dots. No arrows-only. A drafting sheet indicates position with a dimension line, so this one does too.

### 2.4 Feel: trackpad vs wheel vs touch

The single variable that decides feel is the **scroll-distance-to-travel ratio**. Set it to **1:1** —
one pixel of vertical scroll moves the track one pixel left:

```js
end: () => "+=" + (track.scrollWidth - stage.clientWidth)
```

- **Trackpad (macOS/iPadOS):** 1:1 feels like dragging the row directly. Anything above ~1.3:1 immediately reads as scroll-jacking, because the user's flick no longer buys the distance their hand asked for.
- **Wheel mouse:** ~100px per notch, so a `--card-tall` of 380px + gap takes ~4 notches per card. That is a good rhythm. At 2:1 it becomes 8 notches per card and the section feels stuck — this is the classic complaint and it is a *ratio* bug, not a smoothing bug.
- **Touch:** do not pin on touch at all (§2.5). A native horizontal swipe is what a phone user's thumb already expects.

Add a short **lead-in and lead-out**: `start: "top top"` with roughly 10svh of empty travel at each end,
so a trackpad flick that overshoots the pin start doesn't skip the first card, and the section releases
cleanly instead of snapping the moment the last card lands.

**Do not add smoothing by default** (§7.3). If wheel-mouse testing on a real Windows machine demands it,
add GSAP `ScrollSmoother` at `smooth: 0.8` — never a second scroll system alongside ScrollTrigger.

### 2.5 Mobile fallback

Below 900px the rail **is not pinned at all**. The same markup becomes a native horizontal scroller:

- `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scroll-snap-align: center`, `scroll-snap-stop: always`, `scroll-padding-inline: var(--page-inset)`.
- Cards go to `width: 82vw` so the next card's edge is always visible — the universal affordance that says "there is more this way".
- `overscroll-behavior-inline: contain` so a horizontal swipe doesn't trigger browser back-navigation.
- Ambient loops inside mockups pause when off-screen; only the centred card animates.

This is not a degraded experience, it is the *correct* experience for a thumb, and it is also the no-JS
and reduced-motion experience on desktop. One markup, three drivers.

### 2.6 Keyboard, focus and screen readers

The failure that sinks pinned rails on Usability (30% of the Awwwards score) is that a `Tab` press moves
focus to a card that is 3000px off-screen and the browser's native `scrollIntoView` fights the pin.

Required:

1. **Semantics.** `<section aria-labelledby="rail-h">`, headline is a real `<h2 id="rail-h">` **placed before the list in DOM order**, cards are `<li>` inside an `<ol class="rail-track">`. A screen-reader user reads headline-then-seven-cards in order and never knows there was a rail.
2. **Focus-driven scrolling.** Listen for `focusin` on a card; compute that card's rail progress `p` and `window.scrollTo({ top: st.start + p * (st.end - st.start) })`. Also `preventScroll: true` on the native focus so the browser doesn't try first.
3. **Explicit controls.** Prev / next buttons in the stage's title block, styled as `.btn-ghost`. They animate the page's scroll position, not the track. These are also the tick-mark click targets. They are the only way a switch-access or voice-control user drives the rail, and they cost 20 lines.
4. **Announce discretely.** `<p class="visually-hidden" aria-live="polite">` updated with `[RAIL.CARD_ANNOUNCE] 3 of 7` **on card change only**. Never per frame — a scrubbed live region is a screen-reader denial-of-service.
5. **Never trap.** No `wheel` `preventDefault`, ever. The user can always scroll out of the section in both directions at normal speed.
6. **Fragment links.** No in-page anchor may target anything *inside* the pinned range; nav anchors target the section's pin start.

### 2.7 The classic failure modes, and the fix for each

| Failure | Cause | Fix |
|---|---|---|
| **Feels hijacked** | Travel ratio > ~1.3:1; too many cards | 1:1 mapping; **cap the rail at 7 cards**. Beyond that the section outstays its welcome regardless of ratio. |
| **Resize jump** | Pin-spacer height baked at init | Function-based `end`, `invalidateOnRefresh: true`, and wrap everything in `gsap.matchMedia()` so crossing 900px tears down and rebuilds cleanly. |
| **Layout shift (CLS)** | Fonts and mockups settle after measurement | `aspect-ratio` on every figure slot; `document.fonts.ready.then(() => ScrollTrigger.refresh())`; self-host fonts with a metric-matched fallback (§8.2). |
| **iOS Safari address bar** | `100vh` on the pinned stage; bar hide/show fires resize → refresh → visible jump | `height: 100svh` on the stage (small viewport height — the *stable* one), plus `ScrollTrigger.config({ ignoreMobileResize: true })`. Never `100vh`, never `100dvh` on a pinned element. |
| **Double scrollbar** | `overflow-x: auto` still active while pinned | The enhanced branch sets `overflow: clip` on the track; the base branch owns `overflow-x: auto`. Exactly one of them is ever active. |
| **Back-button lands mid-pin** | Scroll restored before ScrollTrigger measures | `ScrollTrigger.refresh()` on `window.load` and after fonts; leave `history.scrollRestoration` at `auto`. |
| **Track jitters at 60fps** | Layout reads inside `onUpdate`; animating anything but transform | Only `x`/`transform`; zero DOM reads in the scrub callback; `will-change: transform` added on pin-enter and **removed on pin-leave**. |
| **First card missed** | Pin starts exactly at card 1 | 10svh lead-in of empty travel. |

### 2.8 Recommendation

> **Ship technique A (GSAP ScrollTrigger pin + translate) as a progressive enhancement layered on top of technique B (a native horizontal scroll-snap container), gated by `gsap.matchMedia()`. Do not use technique C for the rail.**

Reasoning, in order of weight:

1. **The base layer has to be a real scroll container anyway** — that is the mobile experience, the no-JS experience and the reduced-motion experience, and it is where all the keyboard and AT behaviour comes for free. Once that exists, the desktop enhancement is ~40 lines.
2. **Technique C is not ready for the load-bearing element of the page.** At ~83% global support and with Firefox stable still behind a flag, roughly one visitor in six would get the fallback for the site's signature moment. C is the right tool for the *decorative* scroll-linked motions (§4), where the fallback is "it's just static" and nobody notices.
3. **GSAP's pin is the part that's genuinely hard.** Pin-spacer arithmetic, refresh ordering, and `matchMedia` teardown are exactly the code two founders should not be maintaining by hand, and GSAP has been free for commercial use since April 2025.
4. **Its failure mode is survivable.** If the GSAP bundle 404s, `matchMedia` never runs, the base branch keeps `overflow-x: auto`, and the rail is a perfectly good horizontal scroller.

### 2.9 Implementation sketch

**HTML** — semantic, ordered, headline before the list:

```html
<section class="rail" id="work" aria-labelledby="rail-h">
  <div class="rail-stage">                      <!-- sticky/pinned viewport -->

    <div class="rail-bg" aria-hidden="true">    <!-- the held headline, occluded by cards -->
      <p class="lab">[RAIL.EYEBROW]</p>
      <p class="head-xl">[RAIL.H2]</p>
    </div>
    <h2 id="rail-h" class="visually-hidden">[RAIL.H2]</h2>

    <ol class="rail-track" tabindex="0" role="group" aria-label="[RAIL.TRACK_LABEL]">
      <li class="card card--wide">
        <p class="lab card-ref">[CARD.REF]</p>            <!-- "DETAIL A · 01/07"       -->
        <p class="lab card-eyebrow">[CARD.EYEBROW]</p>    <!-- sector                   -->
        <h3 class="card-h">[CARD.HEADLINE]</h3>           <!-- 3–6 words                -->
        <p class="card-out">[CARD.OUTCOME]</p>            <!-- one sentence, the result -->
        <p class="card-rep"><b>[CARD.REPLACES_LABEL]</b> [CARD.REPLACES]</p>
        <figure class="card-fig">
          <!-- live mockup component, verbatim from the deck -->
          <figcaption class="lab">[CARD.FIG_CAPTION]</figcaption>  <!-- "· scale 1:1"   -->
        </figure>
        <span class="illus">[CARD.STAMP]</span>           <!-- "Illustrative" / "Live"  -->
      </li>
      <!-- … max 7 … -->
    </ol>

    <div class="rail-hud">                       <!-- title block + datum progress -->
      <button class="btn-ghost" data-rail="prev" aria-label="[RAIL.PREV_LABEL]">←</button>
      <span class="lab tn"><b data-rail="idx">01</b> / <span data-rail="total">07</span></span>
      <button class="btn-ghost" data-rail="next" aria-label="[RAIL.NEXT_LABEL]">→</button>
    </div>
    <div class="prog" aria-hidden="true"><i data-rail="fill"></i></div>
    <p class="visually-hidden" aria-live="polite" data-rail="live"></p>

  </div>
</section>
```

**CSS** — the base layer is the whole experience; the enhancement only removes things:

```css
.rail-stage{
  position: sticky; top: 0;
  height: 100svh;                       /* svh: never resizes with the iOS bar */
  display: grid; align-content: center;
  overflow: clip;                       /* clips the track, not the page */
  background: var(--paper);
}

/* the held headline, behind the cards */
.rail-bg{
  position: absolute; inset-inline: var(--page-inset); top: 22svh;
  z-index: 0; pointer-events: none; max-width: 18ch;
}

.rail-track{
  position: relative; z-index: 1;
  display: flex; gap: var(--rail-gap);
  margin: 0; padding-inline: var(--page-inset); list-style: none;

  /* BASE: a real horizontal scroll container. Mobile, no-JS, reduced-motion. */
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--page-inset);
  overscroll-behavior-inline: contain;
}
.card{
  flex: 0 0 auto;
  inline-size: var(--card-tall);
  block-size: var(--card-h);
  scroll-snap-align: center; scroll-snap-stop: always;
  background: var(--paper);             /* opaque — this is what occludes the headline */
  border: 1px solid var(--faint);
  container-type: inline-size;          /* mockups scale off this — see §5.4 */
  display: flex; flex-direction: column;
}
.card--wide{ inline-size: var(--card-wide) }
.card--note{ inline-size: var(--card-note); background: var(--bone) }

@media (max-width: 900px){ .card{ inline-size: 82vw } }

/* ENHANCED: JS adds .is-pinned to the section. Only then do we take the scroller away. */
.rail.is-pinned .rail-track{ overflow: clip; scroll-snap-type: none; will-change: transform }

/* Reduced motion: no pin, no rail — a plain grid. Honest, not "the same but faster". */
@media (prefers-reduced-motion: reduce){
  .rail-stage{ position: static; height: auto; padding-block: 8rem }
  .rail-track{ display: grid; grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
               overflow: visible; scroll-snap-type: none }
  .card{ inline-size: auto; block-size: auto }
  .rail-bg{ position: static; margin-bottom: 3rem }
  .prog, .rail-hud{ display: none }
}
```

**JS** — ~40 lines, all of it guarded:

```js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });   // iOS address bar

const rail  = document.querySelector(".rail");
const stage = rail.querySelector(".rail-stage");
const track = rail.querySelector(".rail-track");
const cards = [...track.children];

const fill = rail.querySelector('[data-rail="fill"]');
const idx  = rail.querySelector('[data-rail="idx"]');
const live = rail.querySelector('[data-rail="live"]');
const prev = rail.querySelector('[data-rail="prev"]');
const next = rail.querySelector('[data-rail="next"]');
rail.querySelector('[data-rail="total"]').textContent = String(cards.length).padStart(2, "0");
let current = 0;

gsap.matchMedia().add(
  "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
  () => {
    rail.classList.add("is-pinned");

    const distance = () => track.scrollWidth - stage.clientWidth;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",                                    // scrubbed motion never eases
      scrollTrigger: {
        trigger: rail,
        start: "top top",
        end: () => "+=" + distance(),                  // 1:1 — the whole feel lives here
        pin: stage,
        scrub: true,
        invalidateOnRefresh: true,                     // recompute on every refresh
        anticipatePin: 1,
        onUpdate: (self) => {                          // transform + text only; no reads
          fill.style.transform = `scaleX(${self.progress})`;
          const i = Math.min(cards.length - 1, Math.round(self.progress * (cards.length - 1)));
          if (i !== current) { current = i; idx.textContent = String(i + 1).padStart(2, "0");
                               live.textContent = `${i + 1} of ${cards.length}`; }
        }
      }
    });

    // focus must move the page, not fight the pin
    track.addEventListener("focusin", (e) => {
      const i = cards.indexOf(e.target.closest(".card")); if (i < 0) return;
      goTo(i);
    });
    prev.onclick = () => goTo(current - 1);
    next.onclick = () => goTo(current + 1);

    function goTo(i){
      const st = tween.scrollTrigger, p = gsap.utils.clamp(0, 1, i / (cards.length - 1));
      window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: "smooth" });
    }

    return () => rail.classList.remove("is-pinned");   // matchMedia teardown
  }
);

document.fonts.ready.then(() => ScrollTrigger.refresh());
addEventListener("load", () => ScrollTrigger.refresh());
```

**No-JS fallback:** nothing extra is required — `.is-pinned` is never added, the track keeps
`overflow-x: auto` and `scroll-snap`, and the rail is a swipeable, keyboard-scrollable, screen-reader-
correct list of cards with a visible scrollbar. Add one line for polish:

```html
<noscript><style>.rail-hud{display:none} .prog{display:none}</style></noscript>
```

Verify by loading the page with JS disabled: every card must be reachable and every sentence readable.

---

## 3. Hero

Three concepts. All three are consistent with the general-assembly language; they differ in what they
make the tagline *mean*.

### 3.1 Concept A — "Cold start" ★ recommended

The general-assembly drawing (the deck's `.asm` exploded axonometric, four ballooned parts) renders
**still**. It is a drawing of a stopped machine. Then it starts:

`t=0ms` sheet frame, coordinates and title block are painted (server HTML, no motion).
`t=0ms` `[HERO.H1]` is already there — it is the LCP element and it never animates in.
`t=650ms` the four balloon leader lines draw left-to-right, 130ms apart (`draw`, §4.1).
`t=900ms` the assembly begins its explode/nest loop; dashed flow lines start advancing.
`t=1500ms` the approval gate at balloon 04 holds; the `[HERO.STAMP]` stamp lands (`stamp`, §4.3).
The drawing then loops indefinitely at `run` speed (§4.6).

**Why it wins:** it is the tagline performed, not illustrated. The reader watches a machine that was
stopped begin to operate, which is the literal dictionary sense of *andar*, before reading a word.
It is also the only one of the three whose motion is entirely decorative in the technical sense —
the page is complete and readable at `t=0`, so it costs nothing in LCP and nothing under reduced motion.
The drawing already exists in the deck as ~2 KB of CSS.

### 3.2 Concept B — "The title block types itself"

The sheet is drawn; the title block fills field by field — DRAWING, REV, SHEET, SCALE, DATE — and the
last field typed is `[HERO.H1]`.

**Rank: 3rd.** Charming and very on-brand, but: typewriter effects are a 2021 cliché that juries mark
down on Creativity; the headline arriving late makes the H1 the *last* thing painted, which is an LCP
own-goal on the site's most important element; and animated text is hostile to screen readers unless
duplicated, which means shipping the headline twice. Keep the idea, demote it: the title block in the
**footer** (§9.7) fills in on scroll-into-view. Same delight, zero cost.

### 3.3 Concept C — "The datum becomes the progress bar"

A full-width datum line sits under the wordmark. As the user scrolls out of the hero, that same line
detaches from the drawing, travels to the bottom edge, and becomes the site's scroll progress rail —
the same `.prog` element, one continuous object.

**Rank: 2nd.** Genuinely elegant and unmistakably drafting — a datum *is* a reference line, so making it
the site's reference line is a real idea rather than a decoration. But it is a **transition**, not a
first viewport: it says nothing in the first 3 seconds, which is where the owner decides whether to stay.

### 3.4 Decision

> **Ship A, and fold C in as the hero's exit.** The drawing starts running (A); when the reader leaves
> the hero, the drawing's own datum line becomes the rail's progress line (C) and stays there for the
> rest of the page. Two ideas, one object, no extra weight. B is demoted to the footer title block.

### 3.5 Hero type scale and specification

| Slot | Role | Size | Face / weight | Notes |
|---|---|---|---|---|
| `[HERO.EYEBROW]` | sheet reference | `0.688rem` (11px) | Display 500, `0.2em` tracking, uppercase | `.lab` |
| `[HERO.H1]` | the tagline | `clamp(3.25rem, 8.5vw, 7.5rem)` | Display 800, `line-height .86`, `-.03em` | **LCP element** |
| `[HERO.SUB]` | the one-sentence what | `clamp(1.0625rem, 1.5vw, 1.375rem)` | Reading 400, `line-height 1.55`, `max-width 38ch` | |
| `[HERO.DEF]` | the dictionary line | `0.9375rem` | Reading 400 italic, `--mid` | sits under the datum |
| `[HERO.CTA_PRIMARY]` | | `0.75rem`, `0.2em` | Display 600 uppercase | `.btn-red` |
| `[HERO.CTA_SECONDARY]` | | `0.75rem`, `0.2em` | Display 500 uppercase | `.btn-ghost` |
| `[HERO.KEY_01..04]` | balloon callouts | `0.75rem`, `0.16em` | Display 600 uppercase | `.key em` |

**Motion timing:** balloons 700ms `--ease`, stagger 130ms, starting at 650ms. Stamp 500ms `--stampEase`
at 1500ms. Assembly loop 17s `--ease` infinite (as `@keyframes assemble`). Under
`prefers-reduced-motion: reduce`, the drawing renders in its **assembled** state with the stamp already
applied, and nothing moves.

**LCP element: `[HERO.H1]`, a text node.** Protect it: the display font is preloaded and self-hosted, the
drawing is inline SVG/CSS with no network request, there is no hero image or video, and no JS is required
to paint the first viewport. Target LCP ≤ 1.5s on a 4G Cebu connection.

---

## 4. Motion system

Seven named motions. Anything not on this list does not ship. Each has one easing, one duration, and one
reason to exist. **Functional** = it carries meaning; removing it loses information. **Decorative** =
removing it loses only pleasure.

| # | Name | Driver | Easing | Duration | Kind | Used for |
|---|---|---|---|---|---|---|
| 1 | **`draw`** | scroll-triggered, once | `--ease` | 700ms | Functional | Any rule, leader, datum or dimension line arriving. `transform: scaleX(0→1)`, `transform-origin: left`. Already `.dimline::before` / `.key i`. |
| 2 | **`settle`** | scroll-triggered, once | `--ease` | 600ms opacity / 720ms transform, 70ms stagger | Functional | Section entrance. `opacity 0→1`, `translateY(12px→0)`. Already `.en`. Max 6 staggered children — beyond that the last item arrives after the reader has left. |
| 3 | **`stamp`** | triggered, once | `--stampEase` | 500ms (opacity 300ms) | Functional | A state becoming true: Approved, Live, Illustrative. `scale(1.32→1)` + `rotate(-6deg)`, no overshoot — a stamp hits paper and stops dead. Already `.stamp` / `.applied`. |
| 4 | **`travel`** | **scroll-linked** | `none` | n/a (1:1 with scroll) | Functional | The rail. The only long-form scrubbed motion on the site. Ease must be `none` (§1.1, ref. 4). |
| 5 | **`tick`** | triggered, once | `1-(1-p)⁴` | 1100ms | Functional | A figure counting to its value. Must land on the true number within 2.2s even in a backgrounded tab (the deck's `roll()` already has this guard) and must render instantly under reduced motion. |
| 6 | **`run`** | time-based loop | `--ease` or `linear` | 8–24s, infinite | **Decorative** | The ambient life inside a live mockup: the kanban card crossing three columns (`travel`, 11s), the scanner beam (`beam`, 8s), the assembly explode/nest (`assemble`, 17s), the mark radiating (`radiate`, 7.5s). **Must pause via IntersectionObserver when off-screen** and must not run under reduced motion. |
| 7 | **`handoff`** | **scroll-linked** | `none` | n/a | Functional | The hero datum line becoming the page progress line (§3.4), and the rail progress fill. `scaleX` only. |

**Rules that bind all seven:**

- Only `transform` and `opacity`. Never `width`, `height`, `top`, `left`, `filter` or `box-shadow` in a running animation.
- Nothing bounces, nothing overshoots. `--ease` is a hard decelerate; `--stampEase` is harder still. This is a drafting instrument, not a toy.
- Scroll-linked motions (4, 7) are `ease: none` and perfectly reversible.
- Time-based motions (1, 2, 3, 5) fire **once** and never replay on scroll-back. Replaying entrance animations is the single most common reason a scroll site feels cheap.
- Under `prefers-reduced-motion: reduce`: 1, 2, 3, 5 render in their **end state** immediately; 4 and 7 are not created at all (the rail becomes a grid); 6 does not run.
- Total simultaneous animated elements on screen: **≤ 12**. Count them.

---

## 5. Type and layout system

### 5.1 The pairing

- **Display: FF DIN → Barlow Semi Condensed.** DIN is the German technical-drawing standard, used in the room it was drawn for; that is the whole argument and it is worth keeping.
- **Reading: Barlow.** A slightly grotesque, low-contrast, highly legible text face that sits under DIN without arguing with it. Already the deck's `--read`.

**One strong opinion on shipping.** The deck's stack begins `local('FF DIN')`, which means the site
renders in DIN on the founders' machines and in Barlow Semi Condensed on everyone else's — including
every Awwwards juror. Two bad outcomes: the founders never see what the world sees, and the design is
tuned against a face nobody receives. **Remove `local()` from the website stack.** Then choose:

- **(a) Ship Barlow Semi Condensed as the display face, for everyone.** Free, self-hostable, metric-stable, ~18 KB per weight subset. Recommended. The drafting reading comes from the *layout language* — labels, callouts, title blocks, hairlines — far more than from the specific face.
- **(b) License FF DIN Web** (Monotype/FontFont) for exactly two weights (700, 800), self-host, and keep Barlow Semi Condensed as the metric-matched fallback. Do this only if the budget is already agreed; it is a genuine upgrade, not a requirement.

### 5.2 Modular scale

Root `16px`. Body `1.0625rem` / `1.55`. Two ratios: **1.25 (major third)** for text, **1.333 (perfect
fourth)** for display, because display needs bigger jumps to read as hierarchy at a glance.

| Token | Size | Fluid | Use |
|---|---|---|---|
| `--t-label` | 0.6875rem (11px) | fixed | `.lab`, callouts, title-block keys. `0.2em` tracking, uppercase, `--mid`. |
| `--t-micro` | 0.8125rem (13px) | fixed | figcaptions, sources, footnotes |
| `--t-small` | 0.9375rem (15px) | fixed | card outcome lines, table cells |
| `--t-body` | 1.0625rem (17px) | fixed | body copy, `max-width: 62ch` |
| `--t-lead` | `clamp(1.125rem, 1.4vw, 1.375rem)` | fluid | section intros, `max-width: 40ch` |
| `--t-h3` | `clamp(1.5rem, 2.4vw, 2.125rem)` | fluid | card headlines, `line-height 1.05` |
| `--t-h2` | `clamp(2.25rem, 4.6vw, 4rem)` | fluid | section headlines, `line-height .92`, `-.022em` |
| `--t-h1` | `clamp(3.25rem, 8.5vw, 7.5rem)` | fluid | hero only, `line-height .86`, `-.03em` |
| `--t-mon` | `clamp(3rem, 7vw, 6.5rem)` | fluid | monumental figures, `font-variant-numeric: tabular-nums` |

Every fluid size uses `clamp()` with a `rem` minimum so browser zoom and user font-size settings still
work — this is precisely what `--k` broke, and it is a Usability score item.

### 5.3 Grid and spacing

```
--page-inset: clamp(1rem, 3.2vw, 2.75rem);   /* also the sheet-frame inset */
--maxw:       87.5rem;                        /* 1400px content max        */
--col:        12;  --gutter: clamp(1rem, 1.6vw, 1.5rem);
```

Spacing scale, 8px-based: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`. Section vertical
rhythm: `clamp(6rem, 12vh, 11rem)` top and bottom. Nothing between two sections but paper.

**The sheet frame.** The deck's `.sheet` (fixed inset, 1px border, 40px drafting grid, soft shadow) is
carried over as a **fixed, `pointer-events: none`, `aria-hidden` page frame at `z-index: 0`**, inset by
`--page-inset`. It is the single strongest identity carry-over and costs one div. Two adjustments for web:
drop the grid opacity from `.045` to `.03` (a website is read for minutes, not glanced at for seconds),
and drop the frame entirely below 700px, where it eats 12% of the screen width.

### 5.4 Reusing the deck's mockups inside cards

The mockups are pure HTML+CSS and can be pasted verbatim. One change makes them portable:

```css
.card{ container-type: inline-size }
/* the deck sized everything off a viewport-derived --k;
   inside a card, re-derive it from the card's own width */
.card .screen, .card .phone, .card .scanner, .card .inv{
  --k: calc(1cqi / 440);          /* 440 ≈ the deck's design width for these components */
}
```

That is the whole port. `--k` is a plain custom property, every mockup dimension is
`calc(var(--k) * n)`, and the mockups already re-declare the light token set (`.screen,.phone,.inv`),
so they stay lit even on a navy `body.asbuilt` section. Verify each mockup at its card's minimum inline
size and clamp `--k` with a floor if any label falls below 8px.

**The DCA command-centre prototype** (`demos/dca-shipment-command-center/`, 172 KB, its own cobalt token
system) is a different class of object. It must **not** be inlined into a card or iframed on load — it
would double the page weight and wreck INP. Its card carries the deck's static `.cc-*` command-centre
mockup and a `[CARD.LINK]` that opens the prototype in a new tab, or lazily injects
`<iframe loading="lazy">` into a `<dialog>` **after the click**.

### 5.5 The drafting motifs, without gimmick

The failure mode of this aesthetic is decoration: hairlines and callouts scattered everywhere until they
mean nothing. Four rules, all testable:

1. **A motif is used when it is doing its job, or not at all.** A sheet number numbers something. A "Detail A · scale 1:1" callout points at an actual detail at an actual relative scale. A stamp marks a state that is actually true. If you cannot say what a callout is annotating, delete it.
2. **One motif per section, maximum.** A section may have a sheet reference *or* a dimension line *or* a stamp. Never two. (The rail is one section, so its per-card `[CARD.REF]` counts once.)
3. **Red is spent, never sprinkled.** `--red` marks exactly two things across the whole page: the one thing being pointed at in a drawing, and the CTA. Budget: **no more than three red marks visible in any one viewport.**
4. **Motifs are labels, never containers.** The title block labels a section; it does not become a card layout. Balloons number parts; they are not bullet points. The moment a drafting device is used as a generic UI container, the drawing stops being a drawing and becomes a theme.

---

## 6. Clarity rules for non-technical readers

The reader is an owner of a Cebu distributor, trading firm or brokerage. They are not technical, they are
busy, and they are reading on a phone. Every rule below is testable by a second person in under a minute.

**R1 · One idea per viewport.** If a screen needs two headlines, it is two screens.
*Test:* screenshot any viewport; a stranger states its single point in one sentence. Apple's product
pages are built this way — each scroll chapter carries exactly one claim and one visual.

**R2 · Headline ≤ 8 words, and it is a claim, not a category.** "Stock stops walking out the door" is a
headline; "Inventory Management" is a filing label.
*Test:* read the headline alone. Does it say something that could be false? If not, rewrite.

**R3 · Every headline is followed by one plain sentence that says what actually happens.**
Apple's triad — headline, one subhead, one visual — never a headline sitting alone over a picture.
*Test:* cover the visual. Is the point still made?

**R4 · Grade-8 reading level. Concrete nouns from the reader's world.** Pesos, weeks, Tuesday, a delivery
receipt, a group chat, a notebook. Never "solution", "leverage", "streamline", "platform".
*Test:* paste the page into a readability checker; Flesch-Kincaid grade ≤ 8. Any sentence over 25 words
gets split.

**R5 · No specification lives inside the story.** Stack, integrations, hosting, security, tooling — none
of it appears in the rail or in the argument sections. Apple's answer is a separate **Tech Specs** page;
Andar's is one collapsed `<details>` block near the footer, or nothing.
*Test:* Ctrl+F the page for "API", "cloud", "integration", "AI". Zero hits above the footer.

**R6 · Every card names what it replaces, using an object the reader touches.**
`[CARD.REPLACES]` is where the owner recognises themself. "A WhatsApp group and somebody's memory" beats
any feature list ever written.
*Test:* can the reader point to that object in their own office right now?

**R7 · Every number carries a unit, a period and a source.** "₱1.2M" is a rumour. "₱1.2M in stock
written off in FY2025 — client's own figures" is evidence.
*Test:* every numeral on the page has a visible unit and a visible attribution or an `.illus` stamp.

**R8 · Nothing important is legible only in motion.** A card must be fully readable when it is stationary
at the centre of the rail. The motion delivers it; the motion never *is* it.
*Test:* pause the rail (or open with JS off) and read every card. Nothing is lost.

**R9 · Illustrative data is stamped as illustrative, every time.** The deck's `.illus` stamp appears on
every mockup that shows invented numbers. A jury and a buyer both read an unstamped fake number as a lie.
*Test:* every mockup carries either `[CARD.STAMP]` = "Illustrative" or a real, sourced figure.

**R10 · One primary CTA, everywhere, with the same words.** Apple's sticky nav carries exactly one buy
button. Andar's carries exactly one `[CTA.PRIMARY]`, identically worded in nav, hero, rail-end and CTA
section. Four different phrasings for one action reads as four different actions.

**R11 · The page must survive being read in three pieces.** Hero, one card, CTA. That is what a busy
owner actually reads.
*Test:* read only those three. Do you know what Andar does, what it costs you not to call, and what
happens next?

---

## 7. Stack

### 7.1 Framework: Astro vs Next vs plain Vite/HTML

| | **Astro** | **Next.js** | **Plain Vite + HTML** |
|---|---|---|---|
| Output | Static HTML, **zero JS by default** | Static export possible; React runtime ships regardless | Static HTML |
| Fit for one marketing page | Excellent | Overbuilt — App Router, RSC, hydration for a page with no app in it | Good |
| Copy edits without touching layout | Content collections / a `cards.json` — a founder edits data, not markup | Same, plus React ceremony | None — copy is welded into markup |
| The 7 rail cards | One `<Card>` component + a data file | Same | Seven hand-maintained copy-pasted blocks |
| Five reusable deck mockups | Five `.astro` components, importable into cards *and* into sections | Five components | Five copy-pasted HTML blobs that drift |
| Images | `astro:assets` — resize, AVIF/WebP, `width`/`height` emitted (CLS protection) | `next/image` (needs a loader for static export) | Manual, by hand, forever |
| GitHub Pages deploy | First-class, documented, `site` + `base` config | Works with `output: 'export'`, with caveats | Trivial |
| Maintenance load for two non-full-time founders | Low — it is HTML with imports | Medium-high — framework churn is the tax | Lowest at first, highest after the third edit |
| Baseline JS shipped | 0 KB | ~90 KB gz React + runtime | 0 KB |

> **Pick Astro.** It produces exactly what plain HTML produces — static files with no runtime — while
> giving the two things hand-written HTML cannot: a component for each mockup (used in a card *and* in a
> section, defined once) and copy in a data file so a wording change never risks the layout. Next ships a
> React runtime to render a page that has no interactivity beyond a scroll animation; that is 90 KB of
> tax on the LCP of a page whose entire argument is that things should just run.

Shape:

```
website/
  src/pages/index.astro          — the page, section by section
  src/content/cards.json         — the 7 rail cards, slot by slot (copy lives here)
  src/components/mockups/        — Scanner · Handset · Invoice · Kanban · CommandCentre .astro
  src/components/{Card,Rail,Hero,TitleBlock,SheetFrame}.astro
  src/styles/tokens.css          — lifted verbatim from the deck's :root + body.asbuilt
  src/scripts/rail.js            — the ~40 lines from §2.9
  public/fonts/                  — self-hosted woff2 subsets
```

### 7.2 Animation: GSAP ScrollTrigger vs Motion vs native CSS

- **GSAP + ScrollTrigger — yes, for the rail only.** ~25 KB gz for both, free for all commercial use since April 2025 (https://webflow.com/blog/gsap-becomes-free). It is the only one of the three whose `pin` handles pin-spacer arithmetic, `invalidateOnRefresh` and `matchMedia` teardown for you, and that is the code you least want to own.
- **Motion (motion.dev) — no.** Genuinely smaller (its `scroll` is ~75% the size of GSAP's, its mini `animate` is 2.3 KB) and built on WAAPI + ScrollTimeline, but its centre of gravity is React, and it has no equivalent of ScrollTrigger's pinning. Wrong shape for this one problem.
- **Native CSS scroll-driven animations — yes, for everything else.** `animation-timeline: view()` handles every `settle` / `draw` / `stamp` entrance on the page with zero JS, runs on the compositor, and degrades to "element is simply visible" in Firefox. That is a perfect fallback for entrance motion and an unacceptable one for the rail (§2.8).

```css
/* every non-rail entrance, no JS at all */
@media (prefers-reduced-motion: no-preference){
  @supports (animation-timeline: view()){
    .en{ animation: settle .72s var(--ease) both;
         animation-timeline: view(); animation-range: entry 8% cover 26% }
  }
}
@keyframes settle{ from{ opacity:0; transform:translateY(12px) } to{ opacity:1; transform:none } }
```

Net JS on the site: **GSAP core + ScrollTrigger + ~2 KB of our own.**

### 7.3 Lenis: no

Reasons, in order:

1. **The aesthetic is precision.** A drafting instrument does not have inertia. Momentum smoothing makes a page feel *soft*, which is the opposite of what this brand is claiming about itself.
2. **Two scroll systems is the most common source of pinned-rail jank.** Lenis + ScrollTrigger requires wiring Lenis's RAF into `ScrollTrigger.update` and keeping them in sync across refreshes. It is a permanent maintenance surface for two founders.
3. **The pinned rail is already the smoothing.** The 1:1 scrub is what makes the motion feel continuous; a wheel notch moves the track a quarter of a card either way.
4. **It is not free of risk.** Lenis does honour `prefers-reduced-motion` and does not fake a translated container (per its own README, https://github.com/darkroomengineering/lenis), so it is far better behaved than 2019-era smooth-scroll libraries — but "well-behaved scroll-jacking" is still scroll-jacking on a jury's Usability score.

**If** wheel-mouse testing on a real Windows machine proves the rail steppy, the correct addition is GSAP
`ScrollSmoother` at `smooth: 0.8`, `normalizeScroll: false` — the same vendor as ScrollTrigger, one
system, also now free. Ship without it first and measure.

### 7.4 Images and video

**There is no hero image and no video.** That is a competitive advantage, not a gap:

- Drawings: **inline SVG**, ink from `currentColor` so `body.asbuilt` flips them for free (the deck already does this with `.markwash`).
- Mockups: **DOM + CSS**, as they already are. Crisp at any zoom, selectable, printable, ~2 KB each.
- Founder portraits (the only real photographs): AVIF + WebP + JPEG via `astro:assets`, `width`/`height` always emitted, `loading="lazy"`, `decoding="async"`, greyscale via CSS `filter` (as the deck does) so one file serves both themes. Budget: **≤ 60 KB each**, max width 900px.
- Any future screen recording: `<video muted playsinline loop preload="none" poster>` with an explicit poster, `IntersectionObserver`-gated `play()`, and never on the critical path. Budget ≤ 1.5 MB, and only below the fold.

### 7.5 Hosting: GitHub Pages holds

Yes — keep it. Static output, free, custom domain with automatic HTTPS, and it is where the deck already
lives, so the founders already know the deploy. Astro's static build drops straight into a Pages workflow.

Three constraints to design around, not fight:
- **No custom response headers.** So no CSP header (use a `<meta http-equiv>` if wanted), no cache-control tuning, no `Link: rel=preload`. Consequence: **font preloads must be `<link>` tags in the HTML head.** Already the plan (§8.2).
- **No server-side redirects.** Fine — one page.
- **Soft limits:** 1 GB repo, 100 GB/month bandwidth, 10 builds/hour. Irrelevant at this scale.

Move to **Cloudflare Pages** only if the founders want per-PR preview deploys (genuinely useful when two
people review copy changes) or custom headers. It is a 10-minute migration and can wait.

---

## 8. Performance and quality budget

### 8.1 Targets

Field targets at p75, which is how Core Web Vitals are actually assessed:

| Metric | Target | Hard ceiling ("good") |
|---|---|---|
| **LCP** (`[HERO.H1]`, text) | **≤ 1.5s** | 2.5s |
| **CLS** | **≤ 0.02** | 0.1 |
| **INP** | **≤ 100ms** | 200ms |
| TTFB | ≤ 0.4s | 0.8s |
| Rail frame time while scrubbing | ≤ 8ms | 16.7ms (60fps) |

Asset budget, first view, gzipped:

| | Budget |
|---|---|
| HTML | 20 KB |
| CSS | 30 KB |
| JS (GSAP + ScrollTrigger + ours) | 30 KB |
| Fonts (4 woff2 latin subsets) | 90 KB |
| Images (portraits, below fold) | 120 KB |
| **Total first view** | **≤ 300 KB** |

A page whose thesis is "we make it run" that takes 4 seconds to run has lost the argument before the
first sentence.

### 8.2 Font loading

1. **Self-host.** Drop the two `fonts.googleapis.com` `<link>`s the deck uses. They cost a DNS lookup, a TCP connect and a TLS handshake to a second origin before the first byte of font CSS, then a third-party fetch for the font itself — two extra round trips directly in front of the LCP text.
2. **Subset.** `latin` only, and subset by used glyphs where the display face is uppercase-only. Four files: Barlow 400, Barlow 600, Barlow Semi Condensed 700, Barlow Semi Condensed 800.
3. **Preload the two that paint first**, in the HTML head (GitHub Pages cannot send `Link:` headers):
   ```html
   <link rel="preload" as="font" type="font/woff2" crossorigin
         href="/fonts/barlow-semicondensed-800.woff2">
   <link rel="preload" as="font" type="font/woff2" crossorigin
         href="/fonts/barlow-400.woff2">
   ```
4. **`font-display: swap`**, plus a metric-matched fallback so the swap causes no reflow — this is where CLS on a type-led page actually comes from:
   ```css
   @font-face{ font-family:"Barlow SC Fallback"; src:local("Arial Narrow"),local("Helvetica Neue");
               size-adjust:88%; ascent-override:96%; descent-override:24%; line-gap-override:0% }
   ```
5. **`ScrollTrigger.refresh()` after `document.fonts.ready`** — font swap changes `track.scrollWidth`, and a rail measured against the fallback metrics is a rail that stops short of its last card.
6. Cache-bust by filename hash; Astro does this.

### 8.3 Keeping the rail at 60fps

- The scrub tween touches **`x` only**. No `width`, no `left`, no `filter`.
- **Zero DOM reads inside `onUpdate`.** Card offsets and `scrollWidth` are cached at refresh and recomputed only on refresh (`invalidateOnRefresh`).
- `will-change: transform` on the track is added on pin-enter and **removed on pin-leave**. Left on permanently it holds a compositor layer for the whole page and costs memory on low-end Android.
- **Ambient `run` loops pause off-screen.** One `IntersectionObserver` toggling `animation-play-state: paused` on non-visible cards. Five simultaneous CSS keyframe loops inside five mockups is the most likely source of dropped frames on this page.
- `content-visibility: auto` + `contain-intrinsic-size` on sections below the fold.
- Verify in **Chrome DevTools → Performance → 4× CPU throttle**, scrubbing the rail end to end. Every frame under 8ms of scripting. Then verify on a real mid-range Android, not a simulator.

### 8.4 Awwwards checklist

Awwwards scores **Design 40% · Usability 30% · Creativity 20% · Content 10%**, judged by a minimum of 18
jurors with the three most-outlying scores dropped (https://www.awwwards.com/about-evaluation/). Recent
SOTD winners land roughly 7.45–8.65. What each weighting implies here:

**Design — 40%.** The largest block, and the one the drafting language exists to win.
- [ ] Type scale is a system, not a set of decisions (§5.2). Nothing is set at an off-scale size.
- [ ] `--red` appears ≤ 3 times per viewport, and only on a pointed-at thing or a CTA (§5.5 R3).
- [ ] Every hairline is exactly 1px at every DPR (`vector-effect: non-scaling-stroke` on SVG, `1px` not `0.5px` in CSS).
- [ ] The sheet frame, title block and coordinates are on **every** viewport — the drawing is the page, not a hero treatment.
- [ ] Dark (`body.asbuilt`) is a genuine, tested second state, not an afterthought.
- [ ] Print stylesheet exists. A drawing that cannot be printed is not a drawing. This is a cheap, memorable jury moment.

**Usability — 30%.** Where pinned-rail sites lose, and the reason §2.6 exists.
- [ ] Rail is fully operable by keyboard: Tab reaches every card, prev/next buttons work, focus never lands off-screen.
- [ ] `prefers-reduced-motion: reduce` gives a real, complete, non-pinned layout.
- [ ] Page is complete and readable with JS disabled.
- [ ] Every scroll-linked state is correct in reverse.
- [ ] Contrast: `--mid #5F6469` on `--paper #FAF9F5` passes AA for body; `--red #D8401F` on paper passes AA for large text only — **never set body copy in red**.
- [ ] No scroll trapping anywhere; the user can always leave a section at normal speed.
- [ ] Visible `:focus-visible` on everything focusable (the deck already has `2px solid var(--red)`).
- [ ] Touch targets ≥ 44px.
- [ ] Tested: iOS Safari, Android Chrome, desktop Safari/Chrome/Firefox, trackpad and wheel mouse.

**Creativity — 20%.** The point of difference, which must be an *idea*, not an effect.
- [ ] The hero performs the tagline rather than stating it (§3.1).
- [ ] The rail's cards are **live, running software**, not screenshots — this is the thing no competitor on the board will have.
- [ ] The datum-line handoff (§3.4) is one continuous object, and a juror can notice it.
- [ ] No borrowed effect is present without a reason a stranger could name.

**Content — 10%.** Smallest weight, but it is what turns a juror's 8 into a buyer's email.
- [ ] Every rule in §6 passes.
- [ ] No claimed client name without written permission (carried from the deck's own `.todo` discipline).
- [ ] Every number sourced or stamped `Illustrative` (§6 R9).
- [ ] Real contact details, a real registered entity, a real place: Cebu, GMT+8.

---

## 9. Wireframe specification

Slots in `[BRACKETS]`. Desktop ≥ 1024px unless noted. `⌐` marks the fixed sheet frame.

### 9.1 Nav — 64px, transparent over hero, gains paper fill + hairline once the rail pins

```
⌐──────────────────────────────────────────────────────────────────────────⌐
│ [MARK]  ANDAR          [NAV.1] [NAV.2] [NAV.3]    CEBU · GMT+8 · [CLOCK] │
│                                                        ┌───────────────┐ │
│                                                        │[CTA.PRIMARY] │ │  ← .btn-red
│                                                        └───────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤ ← hairline, on scroll
```
Live clock is the deck's own (GMT+8, updates every 20s). It says "a real place, contactable now" without
a sentence. Mobile: mark + CTA only; nav links collapse into the footer, no hamburger — three links do
not need a menu.

### 9.2 Hero — 100svh, LCP is `[HERO.H1]`

```
⌐──────────────────────────────────────────────────────────────────────────⌐
│ A          B          C          D          E                            │
│1                                                                         │
│   [HERO.EYEBROW]                          ╭─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ╮        │
│                                           │    ┌─────────┐      │        │
│2  ██████ ██████ ████                     │   ┌┴────────┐│  ①──[KEY.01] │
│   [HERO.H1] — clamp 3.25→7.5rem          │  ┌┴────────┐├┘   ②──[KEY.02] │
│   display 800 / lh .86                   │  │  .asm   ││    ③──[KEY.03] │
│                                          │  └─────────┘│    ④──[KEY.04] │← red
│   [HERO.SUB] ................ 38ch max   ╰─ ─ ─ ─ ─ ─ ─ ╯      [STAMP]  │
│3                                                                         │
│   ┌──────────────┐ ┌──────────────┐                                      │
│   │[CTA.PRIMARY] │ │[CTA.SECOND'Y]│                                      │
│   └──────────────┘ └──────────────┘                                      │
│   ─────────────────────────────────────────  ← DATUM (becomes §9.4 prog) │
│4  [HERO.DEF]  andar, v. — ...                                            │
│                                                  ┌──────┬────┬─────┬───┐ │
│                                                  │DRAWING│REV │SHEET│SC │ │
│                                                  └──────┴────┴─────┴───┘ │
⌐──────────────────────────────────────────────────────────────────────────⌐
```

### 9.3 The rail — pinned, 100svh, headline held and occluded

```
   ▼ scroll down ──────────────────────────────────────────────────────────
⌐──────────────────────────────────────────────────────────────────────────⌐
│                                                                          │
│    [RAIL.EYEBROW]                                                        │
│    ██████ ███  ← [RAIL.H2] held in place, z-0, glimpsed BETWEEN cards    │
│    ██████                                                                │
│                                                                          │
│  ┌──────────────────┐ ┌────────────┐ ┌────────┐ ┌────────────┐          │
│  │  card --wide     │ │card --tall │ │--note  │ │card --tall │  ───────► │
│  │                  │ │            │ │        │ │            │  travels  │
│  │                  │ │            │ │        │ │            │  R → L    │
│  └──────────────────┘ └────────────┘ └────────┘ └────────────┘          │
│                                                                          │
│  ┌───┬─────────┬───┐                                                     │
│  │ ← │ 03 / 07 │ → │                                          [RAIL.HUD] │
│  └───┴─────────┴───┘                                                     │
│══════════════▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│← datum
│  ┆      ┆       ┆        ┆         ┆        ┆         ┆                  │← one tick per card
⌐──────────────────────────────────────────────────────────────────────────⌐
```

**Card anatomy** — every card, every slot, in DOM order:

```
┌──────────────────────────────────────────────┐
│ [CARD.REF]              [CARD.EYEBROW]       │  .lab · 11px · 0.2em · --mid
│ ──────────────────────────────────────────── │  hairline
│                                              │
│ [CARD.HEADLINE]                              │  --t-h3 · display 700 · ≤6 words
│                                              │
│ [CARD.OUTCOME]                               │  --t-small · --mid · ≤2 lines · 34ch
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │  the LIVE MOCKUP
│ │  [CARD.FIGURE]  ← .scanner / .phone /    │ │  aspect-ratio locked
│ │                   .inv / .screen+.cols / │ │  --k: calc(1cqi / 440)
│ │                   .screen+.cc-*          │ │  ambient loop pauses off-screen
│ │                              [CARD.STAMP]│ │  .illus, top-right of the figure
│ └──────────────────────────────────────────┘ │
│ [CARD.FIG_CAPTION]  Detail A · scale 1:1     │  .lab · 11px
│ ──────────────────────────────────────────── │
│ [CARD.REPLACES_LABEL]  [CARD.REPLACES]       │  bold label + plain sentence
│ [CARD.LINK] →                                │  optional; only the DCA card has one
└──────────────────────────────────────────────┘
```

`--note` cards carry `REF · HEADLINE · OUTCOME` only (no figure, no stamp) on a `--bone` ground. They are
the rail's breathing room and its rhythm break.

### 9.4 Generic content section — the argument sections all use this

```
⌐──────────────────────────────────────────────────────────────────────────⌐
│  [SEC.REF]  Sheet 04 · [SEC.MOTIF]              ← ONE motif, per §5.5 R2 │
│  ────────────────────────────────────────────                            │
│                                                                          │
│  [SEC.H2]                          │  ┌─────────────────────────────┐    │
│  ██████████ ██████                 │  │                             │    │
│  ██████████                        │  │   [SEC.FIGURE]              │    │
│                                    │  │   drawing / mockup / table  │    │
│  [SEC.LEAD] ............ 40ch      │  │                             │    │
│                                    │  │                  [SEC.STAMP]│    │
│  [SEC.BODY] ............ 62ch      │  └─────────────────────────────┘    │
│                                    │  [SEC.FIG_CAPTION]                  │
│  7fr                                  5fr                                │
⌐──────────────────────────────────────────────────────────────────────────⌐
```
Variants, all from the deck: `.rank` (three magnitudes), `.notes` (numbered clauses), `.tiers`
(three columns), `.tlrow`/`.seg` (proportional timeline), `.crew` (two personnel plates). Alternate the
7fr/5fr split direction between consecutive sections; never three sections with the figure on the same side.
Mobile: one column, figure after text, always.

### 9.5 CTA — full viewport, one action

```
⌐──────────────────────────────────────────────────────────────────────────⌐
│                                                                          │
│  [CTA.EYEBROW]                                                           │
│                                                                          │
│  ████████████████                                                        │
│  ████████████  ← [CTA.H2], --t-h1 scale                                  │
│                                                                          │
│  [CTA.SUB] ...................... 30ch                                   │
│                                                                          │
│  ┌────────────────────┐   [CTA.SECONDARY] →                              │
│  │  [CTA.PRIMARY]     │   ← same words as nav + hero, per §6 R10         │
│  └────────────────────┘                                                  │
│                                                                          │
│  ─────────────────────────────────────────────────────  datum            │
│  [CTA.REASSURE]   ← one line: what happens after they click              │
⌐──────────────────────────────────────────────────────────────────────────⌐
```

### 9.6 Footer — the title block, at full size, filling itself in

```
⌐──────────────────────────────────────────────────────────────────────────⌐
│ [MARK]              [FOOT.NAV.1] [FOOT.NAV.2] [FOOT.NAV.3] [FOOT.NAV.4]  │
│ ──────────────────────────────────────────────────────────────────────── │
│ ┌────────────┬──────────┬──────────────┬──────────────┬────────────────┐ │
│ │ DRAWING    │ REV      │ SHEET        │ SCALE        │ DATE           │ │
│ │[FOOT.DWG]  │[FOOT.REV]│[FOOT.SHEET]  │ NTS          │[FOOT.DATE]     │ │
│ ├────────────┴──────────┼──────────────┴──────────────┴────────────────┤ │
│ │ [FOOT.ENTITY]         │ [FOOT.EMAIL]   [FOOT.PHONE]   [FOOT.ADDRESS] │ │
│ └───────────────────────┴───────────────────────────────────────────────┘ │
│ [FOOT.LEGAL]                                     CEBU · GMT+8 · [CLOCK]  │
⌐──────────────────────────────────────────────────────────────────────────⌐
```
This is where Concept B lands (§3.2): on scroll-into-view the title-block cells fill in field by field,
120ms apart, `settle`. Delight with no cost, at the one point on the page where nothing is at stake.

### 9.7 Mobile, the whole page

```
┌────────────────────┐  Nav: mark + CTA only, 56px
│ ▣            [CTA] │
├────────────────────┤
│ [HERO.EYEBROW]     │  Hero: 100svh, drawing ABOVE headline,
│  ┌──────────────┐  │  scaled to ~38svh so the H1 is never
│  │   .asm       │  │  pushed below the fold
│  └──────────────┘  │
│ [HERO.H1]          │
│ [HERO.SUB]         │
│ [CTA.PRIMARY]      │
│ ─────────────────  │
│ [HERO.DEF]         │
├────────────────────┤
│ [RAIL.H2]          │  Rail: NOT pinned. Headline is static
│                    │  above a native scroll-snap row.
│ ┌────────┐┌───────►│  Cards 82vw so the next edge shows.
│ │ card 1 ││ card 2 │  Horizontal scrollbar left visible.
│ └────────┘└───────►│
│ ●○○○○○○   01 / 07  │
├────────────────────┤
│ sections, 1 column │  figure always after text
│ …                  │
├────────────────────┤
│ CTA                │
│ Footer title block │  title block stacks 2×3
└────────────────────┘
```

---

## 10. Build order

1. **Tokens + sheet frame + type scale.** No motion. The page must be beautiful and readable dead still — if it is not, no amount of scroll animation will fix it.
2. **Every section in static HTML, mobile-first, with real slots wired to `cards.json`.** Ship it internally. Run the §6 tests on a non-technical reader before a single animation exists.
3. **The five mockups ported into cards** (`--k: calc(1cqi / 440)`), ambient loops off.
4. **The rail's base layer** — native scroll-snap, keyboard, prev/next, live region. Test with JS disabled and with a screen reader. This is the layer that must never break.
5. **The pin enhancement** (§2.9). Test resize, iOS bar, back button, focus, reduced motion.
6. **The hero** (§3.1) and the datum handoff (§3.4).
7. **CSS scroll-driven entrances** for everything else (§7.2), ambient loops on with the IntersectionObserver gate.
8. **Budget audit** (§8), print stylesheet, dark set, then submit.

Steps 1–4 are a complete, shippable, honest website. Everything after is the part that wins the award.
