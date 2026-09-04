/* ═══════════════════════════════════════════════════════════════
   andar.ph · main.js — nav state, Cebu clock, the rail (pin + travel
   as progressive enhancement over native scroll-snap), section
   entrances, gate interaction, #how progress, prefers-reduced-motion
   handling throughout. Agent A.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  // Parked entrance states only apply once JS is confirmed present.
  document.documentElement.classList.add("js");

  var motionOK = function(){
    return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  };

  /* ═══════════════════════ NAV ═══════════════════════ */
  var nav = document.getElementById("nav");
  function paintNav(){
    if (!nav) return;
    nav.classList.toggle("is-solid", window.scrollY > 40);
  }

  /* ═══════════════════════ CEBU CLOCK ═══════════════════════ */
  var clockEls = [document.getElementById("clock"), document.getElementById("clock-foot")]
    .filter(Boolean);
  function pad(n){ return String(n).padStart(2, "0"); }
  function cebuLabel(){
    var now = new Date();
    var utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    var cebu = new Date(utcMs + 8 * 60 * 60000);
    return "Cebu · " + pad(cebu.getHours()) + ":" + pad(cebu.getMinutes());
  }
  function tickClock(){
    var label = cebuLabel();
    clockEls.forEach(function(el){ el.textContent = label; });
  }
  tickClock();
  setInterval(tickClock, 20000);

  /* ═══════════════════════ SCROLL-TO ═══════════════════════ */
  document.querySelectorAll("[data-scroll-to]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = document.querySelector(btn.getAttribute("data-scroll-to"));
      if (!target) return;
      target.scrollIntoView({ behavior: motionOK() ? "smooth" : "auto", block: "start" });
    });
  });

  /* ═══════════════════════ ENTRANCES ═══════════════════════ */
  var enEls = document.querySelectorAll(".en");
  if ("IntersectionObserver" in window && enEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    enEls.forEach(function(el){ io.observe(el); });
  } else {
    // no IO support: never leave anything parked at opacity 0
    enEls.forEach(function(el){ el.classList.add("is-in"); });
  }

  /* ═══════════════════════ THE RAIL ═══════════════════════ */
  (function(){
    var rail = document.querySelector(".rail");
    if (!rail) return;
    var stage = rail.querySelector("[data-rail-stage]");
    var track = rail.querySelector(".rail-track");
    var cards = Array.prototype.slice.call(track.children);
    var fillEl = rail.querySelector('[data-rail="fill"]');
    var idxEl = rail.querySelector('[data-rail="idx"]');
    var totalEl = rail.querySelector('[data-rail="total"]');
    var liveEl = rail.querySelector('[data-rail="live"]');
    var prevBtn = rail.querySelector('[data-rail="prev"]');
    var nextBtn = rail.querySelector('[data-rail="next"]');
    var n = cards.length;

    if (totalEl) totalEl.textContent = String(n).padStart(2, "0");
    var cardNames = cards.map(function(c){
      var eb = c.querySelector(".card-eyebrow");
      return eb ? eb.textContent.trim() : "";
    });

    // seed --tint from data-tint once, per card
    cards.forEach(function(c){
      if (c.dataset.tint) c.style.setProperty("--tint", c.dataset.tint);
    });

    // one tick per card on the datum line, evenly spaced by index — the
    // same i/(n-1) mapping used everywhere else progress maps to a card.
    var ticksWrap = document.createElement("div");
    ticksWrap.className = "rail-ticks";
    ticksWrap.setAttribute("aria-hidden", "true");
    var tickEls = cards.map(function(_, i){
      var tick = document.createElement("i");
      tick.className = "rail-tick";
      tick.style.left = (n > 1 ? (i / (n - 1)) * 100 : 0) + "%";
      ticksWrap.appendChild(tick);
      return tick;
    });
    var railProgEl = rail.querySelector(".rail-prog");
    if (railProgEl) railProgEl.appendChild(ticksWrap);
    function resetTicksEven(){
      tickEls.forEach(function(t, i){
        t.style.left = (n > 1 ? (i / (n - 1)) * 100 : 0) + "%";
      });
    }

    var currentIdx = -1;
    function setCounter(i){
      if (i === currentIdx) return;
      currentIdx = i;
      if (idxEl) idxEl.textContent = String(i + 1).padStart(2, "0");
      liveEl.textContent = "Card " + (i + 1) + " of " + n + ", " + cardNames[i];
      var tint = (cards[i] && cards[i].dataset.tint) || "transparent";
      stage.style.setProperty("--stage-tint", tint);
      tickEls.forEach(function(t, k){ t.classList.toggle("is-active", k === i); });
    }
    function setFill(p){
      fillEl.style.transform = "scaleX(" + p + ")";
    }
    function setWipe(i, p){
      cards[i].style.setProperty("--p", String(Math.max(0, Math.min(1, p))));
    }

    // pinnedGoTo is populated only while the desktop/no-reduced-motion
    // enhancement is active; step() falls back to native scroll otherwise.
    var pinnedGoTo = null;
    function nativeGoTo(i){
      i = Math.max(0, Math.min(n - 1, i));
      cards[i].scrollIntoView({
        behavior: motionOK() ? "smooth" : "auto",
        inline: "center",
        block: "nearest"
      });
    }
    function step(dir){
      var target = (currentIdx < 0 ? 0 : currentIdx) + dir;
      if (pinnedGoTo) pinnedGoTo(target); else nativeGoTo(target);
    }
    if (prevBtn) prevBtn.addEventListener("click", function(){ step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function(){ step(1); });

    // BASE layer: native horizontal scroll-snap drives idx/fill/wipe
    // whenever the pin enhancement is not the active driver.
    var baseTicking = false;
    function onTrackScroll(){
      if (baseTicking) return;
      baseTicking = true;
      requestAnimationFrame(function(){
        baseTicking = false;
        if (rail.classList.contains("is-pinned")) return;
        var viewport = track.clientWidth;
        var scrollLeft = track.scrollLeft;
        var maxScroll = track.scrollWidth - track.clientWidth;
        setFill(maxScroll > 0 ? scrollLeft / maxScroll : 0);

        var closest = 0, closestDist = Infinity;
        cards.forEach(function(c, k){
          var center = c.offsetLeft + c.offsetWidth / 2 - scrollLeft;
          var dist = Math.abs(center - viewport / 2);
          if (dist < closestDist){ closestDist = dist; closest = k; }
        });
        setCounter(closest);

        if (motionOK()){
          cards.forEach(function(c, k){
            var left = c.offsetLeft - scrollLeft;
            setWipe(k, 1 - left / viewport);
          });
        }
      });
    }
    track.addEventListener("scroll", onTrackScroll, { passive: true });
    onTrackScroll();

    // PIN ENHANCEMENT: desktop, no reduced motion, GSAP present.
    if (window.gsap && window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      gsap.matchMedia().add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        function(){
          rail.classList.add("is-pinned");

          // The track starts translated fully off-screen right (x = stage
          // width) so the held headline is seen alone before the first
          // card enters; it ends at the normal fully-scrolled rest
          // position. Total x travel is therefore exactly track.scrollWidth,
          // which is also what keeps the scroll-to-travel ratio at 1:1.
          var cardOffsets = [], cardWidths = [];
          var stageWidth = 0, trackScrollWidth = 0;
          function measure(){
            stageWidth = stage.clientWidth;
            trackScrollWidth = track.scrollWidth;
            cardOffsets = cards.map(function(c){ return c.offsetLeft; });
            cardWidths = cards.map(function(c){ return c.offsetWidth; });
            // tick position = the scroll progress at which that card is
            // centred in the stage, given the lead-in offset above.
            cards.forEach(function(c, k){
              var p = (cardOffsets[k] + cardWidths[k] / 2 + stageWidth / 2) / trackScrollWidth;
              tickEls[k].style.left = (Math.max(0, Math.min(1, p)) * 100) + "%";
            });
          }
          measure();

          var tween = gsap.fromTo(track,
            { x: function(){ return stage.clientWidth; } },
            {
              x: function(){ return -(track.scrollWidth - stage.clientWidth); },
              ease: "none",
              scrollTrigger: {
                trigger: rail,
                start: "top top",
                end: function(){ return "+=" + track.scrollWidth; },
                pin: stage,
                scrub: 1.1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onRefresh: measure,
                onUpdate: function(self){
                  setFill(self.progress);
                  var trackX = stageWidth - self.progress * trackScrollWidth;
                  var bestI = 0, bestDist = Infinity;
                  for (var k = 0; k < n; k++){
                    var left = cardOffsets[k] + trackX;
                    setWipe(k, stageWidth ? 1 - left / stageWidth : 1);
                    var center = left + cardWidths[k] / 2;
                    var dist = Math.abs(center - stageWidth / 2);
                    if (dist < bestDist){ bestDist = dist; bestI = k; }
                  }
                  setCounter(bestI);
                }
              }
            }
          );

          track.addEventListener("focusin", onFocusIn);
          function onFocusIn(e){
            var card = e.target.closest(".card");
            var i = cards.indexOf(card);
            if (i < 0) return;
            goTo(i);
          }

          function goTo(i){
            i = gsap.utils.clamp(0, n - 1, i);
            var st = tween.scrollTrigger;
            var p = gsap.utils.clamp(0, 1,
              (cardOffsets[i] + cardWidths[i] / 2 + stageWidth / 2) / trackScrollWidth);
            window.scrollTo({
              top: st.start + p * (st.end - st.start),
              behavior: motionOK() ? "smooth" : "auto"
            });
          }
          pinnedGoTo = goTo;

          return function(){
            rail.classList.remove("is-pinned");
            track.removeEventListener("focusin", onFocusIn);
            pinnedGoTo = null;
            resetTicksEven();
          };
        }
      );

      var refresh = function(){ ScrollTrigger.refresh(); };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
    }
  })();

  /* ═══════════════════════ FIT CARD SCREENS ═══════════════════════
     Cards keep a fixed height on desktop (≥1024px), so the mockup must
     be scaled down to the figure's available height rather than clip.
     Below 1024px cards are height:auto — no fit needed. ═══ */
  (function(){
    var figs = Array.prototype.slice.call(document.querySelectorAll(".card-fig"));
    if (!figs.length) return;
    var desktopMQ = window.matchMedia("(min-width: 1024px)");

    function fitOne(fig){
      var screen = fig.querySelector(".screen");
      if (!screen) return;
      if (!desktopMQ.matches){
        fig.style.setProperty("--fit", 1);
        return;
      }
      fig.style.setProperty("--fit", 1); // reset to natural size before measuring
      var h = screen.getBoundingClientRect().height; // includes transforms
      if (h <= 0) return;
      // shrink to fit, but never below 72% width: past that the screen crops at the frame's bottom edge instead
      var s = Math.max(0.8, Math.min(1, (fig.clientHeight - 2) / h));
      fig.style.setProperty("--fit", s);
    }
    function fitAll(){ figs.forEach(fitOne); }

    fitAll();
    if ("ResizeObserver" in window){
      var ro = new ResizeObserver(function(){ fitAll(); });
      figs.forEach(function(f){ ro.observe(f); });
    } else {
      window.addEventListener("resize", fitAll);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    window.addEventListener("load", fitAll);
  })();

  /* ═══════════════════════ THE GATE ═══════════════════════ */
  (function(){
    var gateFig = document.querySelector(".gate-fig");
    if (!gateFig) return;
    gateFig.addEventListener("click", function(e){
      if (e.target.closest(".gate-yes")){
        var root = gateFig.querySelector(".screen--gate");
        if (root) root.classList.add("is-approved");
      }
    });
    var resetBtn = gateFig.querySelector('[data-gate="reset"]');
    if (resetBtn){
      resetBtn.addEventListener("click", function(){
        var root = gateFig.querySelector(".screen--gate");
        if (root) root.classList.remove("is-approved");
      });
    }
  })();

  /* ═══════════════════════ HOW IT GOES ═══════════════════════ */
  (function(){
    var section = document.getElementById("how");
    if (!section) return;
    var fillEl = section.querySelector('[data-how="fill"]');
    var stages = Array.prototype.slice.call(section.querySelectorAll("[data-how-stage]"));
    var ticking = false;
    function paint(){
      ticking = false;
      if (!motionOK()){
        fillEl.style.transform = "scaleX(1)";
        stages.forEach(function(s){ s.classList.add("is-active"); });
        return;
      }
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = rect.height + vh;
      var traveled = vh - rect.top;
      var p = Math.max(0, Math.min(1, total > 0 ? traveled / total : 0));
      fillEl.style.transform = "scaleX(" + p + ")";
      var activeCount = Math.round(p * stages.length);
      stages.forEach(function(s, i){ s.classList.toggle("is-active", i < activeCount); });
    }
    function onScroll(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();
  })();

  /* ═══════════════════════ GLOBAL SCROLL ═══════════════════════ */
  var navTicking = false;
  window.addEventListener("scroll", function(){
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(function(){ navTicking = false; paintNav(); });
  }, { passive: true });
  paintNav();

  /* ═══════════════════════ HERO DRAWING HANDOFF ═══════════════════════ */
  window.addEventListener("load", function(){
    if (window.AndarHero && typeof window.AndarHero.start === "function"){
      window.AndarHero.start();
    }
  });

})();

  /* ═══════════════════════ HERO DATUM ═══════════════════════
     The dashed line that continues past the drawing sits exactly on
     the drawing's own flow line. */
  (function(){
    var svg=document.querySelector('.hero-draw');
    var band=document.querySelector('.hero-draw-band');
    var flow=svg&&svg.querySelector('[data-part="flow"]');
    if(!svg||!band||!flow) return;
    function set(){
      var f=flow.getBoundingClientRect(), b=band.getBoundingClientRect();
      if(!f.height&&!f.width) return;
      band.style.setProperty('--flow-y', ((f.top+f.height/2)-b.top)+'px');
    }
    set(); window.addEventListener('resize', set);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(set);
    window.addEventListener('load', set);
  })();

  /* ═══════════════════════ NAVY OPENING ═══════════════════════
     nav goes light-on-navy over the hero and the pinned stage; hero
     parallax; sections 2 and 3 play as one pinned sequence. */
  (function(){
    var nav=document.querySelector('.nav'), hero=document.getElementById('hero');
    var stack=document.getElementById('now-stack');
    if(nav && stack){
      function tone(){ nav.classList.toggle('on-navy', stack.getBoundingClientRect().bottom > 48); }
      tone(); window.addEventListener('scroll', tone, {passive:true}); window.addEventListener('resize', tone);
    }
    function splitWords(el){
      var out=[];
      Array.prototype.slice.call(el.childNodes).forEach(function(n){
        if(n.nodeType!==3 || !n.textContent.trim()) return;
        var frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function(tok){
          if(!tok) return;
          if(/^\s+$/.test(tok)){ frag.appendChild(document.createTextNode(' ')); return; }
          var sp=document.createElement('span'); sp.className='w'; sp.textContent=tok; frag.appendChild(sp); out.push(sp);
        });
        el.replaceChild(frag,n);
      });
      return out;
    }
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ok=window.gsap && window.ScrollTrigger && !reduce;
    if(ok) gsap.registerPlugin(ScrollTrigger);
    if(stack){
      if(!ok){ stack.classList.add('is-static'); }
      else{
        var A=stack.querySelector('.now-layer--a'), B=stack.querySelector('.now-layer--b');
        var aWords=[], bWords=[], hand=B.querySelector('.now-hand');
        A.querySelectorAll('.now-h2, .now-list li').forEach(function(el){ aWords=aWords.concat(splitWords(el)); });
        B.querySelectorAll('.now-turn').forEach(function(el){ bWords=bWords.concat(splitWords(el)); });
        gsap.set(hand,{opacity:0,y:16});
        var tl=gsap.timeline({scrollTrigger:{trigger:stack,start:'top top',end:'bottom bottom',scrub:0.8}});
        tl.to(aWords,{opacity:1,ease:'none',stagger:{each:1},duration:aWords.length},0)
          .to({},{duration:12},'>')
          .to(A,{opacity:0,y:-90,ease:'power2.in',duration:16},'>')
          .fromTo(B,{opacity:0,y:110},{opacity:1,y:0,ease:'power2.out',duration:16},'<+=6')
          .to(bWords,{opacity:1,ease:'none',stagger:{each:1},duration:bWords.length},'>-=4')
          .to({},{duration:8},'>')
          .to(hand,{opacity:1,y:0,ease:'power2.out',duration:10},'>')
          .to({},{duration:14},'>');
      }
    }
    if(hero && ok){
      var img=hero.querySelector('.hero-bg img'), centre=hero.querySelector('.hero-center'), dev=hero.querySelector('.hero-device');
      var htl=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
      if(img) htl.fromTo(img,{scale:1.06,yPercent:0},{scale:1.14,yPercent:10,ease:'none'},0);
      if(centre) htl.to(centre,{opacity:0,y:-60,ease:'none'},0);
      if(dev) htl.to(dev,{y:-40,ease:'none'},0);
      var fg=hero.querySelector('.hero-fg'); if(fg) htl.to(fg,{y:-64,ease:'none'},0);
    }
  })();
