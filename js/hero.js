/*
 * AndarHero — the "cold start" run sequence for the hero general-assembly
 * drawing (site/partials/hero-drawing.html). Plain ES2020, no libraries.
 * See site/BUILD-SPEC.md "Hero" and website/UX-RESEARCH.md §3.1 / §4.
 */
(function () {
  'use strict';

  var LOOP = 7.0, EASE = 'cubic-bezier(.16,1,.3,1)', STAMP_EASE = 'cubic-bezier(.22,.86,.26,1)';
  var STOCK_TICKS = [0.3, 1.0, 1.7];
  var INV_START = 1.9, INV_DUR = 0.42, INV_STAGGER = 0.09;
  var TERMS_AT = 2.3, TERMS_DUR = 0.42;
  var HOLD_START = 2.6, HOLD_END = 4.8, DOT_PULSE = 0.9;
  var OPEN_AT = 4.8, STAMP_DUR = 0.26, SETTLE_DUR = 0.15, BAR_DUR = 0.38;
  var RESET_AT = 7.0, RESET_DUR = 0.3, FLOW_SPEED = 24;

  var svg = null, els = null, raf = null, startTime = null, pausedAt = null;
  var fired = {}, running = false, io = null, visible = true;

  function q(sel) { return svg.querySelector(sel); }

  function collect() {
    svg = document.querySelector('.hero-draw');
    if (!svg) { els = null; return false; }
    els = {
      flow: q('[data-part="flow"]'), flowOut: q('[data-part="flow-out"]'),
      bins: [1, 2, 3].map(function (n) { return q('[data-part="stock-bin-' + n + '"]'); }),
      invLines: [1, 2, 3].map(function (n) { return q('[data-part="inv-line-' + n + '"]'); }),
      termsTag: q('[data-part="terms-tag"]'),
      gateBar: q('[data-part="gate-bar"]'), gateDot: q('[data-part="gate-dot"]'),
      stamp: q('[data-part="stamp"]')
    };
    els.termsRect = els.termsTag ? els.termsTag.querySelector('rect') : null;
    return true;
  }

  function len(el) {
    if (!el) return 0;
    if (el.tagName === 'line') {
      return Math.hypot(el.getAttribute('x2') - el.getAttribute('x1'), el.getAttribute('y2') - el.getAttribute('y1'));
    }
    return 100; // terms-tag rect uses pathLength=100
  }

  function tr(el, prop, dur, ease) { if (el) el.style.transition = prop + ' ' + dur + 's ' + ease; }

  // ---- rest / held state: gate closed, stamp hidden, dot waiting ----
  function resetState(instant) {
    if (!els) return;
    var dur = instant ? 0 : RESET_DUR, ease = instant ? 'none' : EASE;
    els.bins.forEach(function (b) { if (b) { tr(b, 'stroke', dur, ease); b.style.stroke = ''; } });
    els.invLines.forEach(function (l) {
      if (!l) return;
      var L = len(l);
      l.setAttribute('stroke-dasharray', L);
      tr(l, 'stroke-dashoffset', dur, ease);
      l.style.strokeDashoffset = L;
    });
    if (els.termsRect) { tr(els.termsRect, 'stroke-dashoffset', dur, ease); els.termsRect.style.strokeDashoffset = 100; }
    if (els.termsTag) { tr(els.termsTag, 'opacity', dur, ease); els.termsTag.style.opacity = 0; }
    if (els.gateBar) { tr(els.gateBar, 'transform', dur, ease); els.gateBar.style.transform = 'rotate(0deg)'; }
    if (els.gateDot) { tr(els.gateDot, 'opacity,fill', dur, ease); els.gateDot.style.opacity = 1; els.gateDot.style.fill = ''; }
    if (els.stamp) { tr(els.stamp, 'opacity,transform', dur, ease); els.stamp.style.opacity = 0; els.stamp.style.transform = 'scale(.9) rotate(0deg)'; }
    if (els.flow) els.flow.style.strokeDashoffset = 0;
    if (els.flowOut) els.flowOut.style.strokeDashoffset = 0;
    fired = {};
  }

  // ---- the running end state, used for reduced motion ----
  function runningState() {
    resetState(true);
    els.invLines.forEach(function (l) { if (l) l.style.strokeDashoffset = 0; });
    if (els.termsRect) els.termsRect.style.strokeDashoffset = 0;
    if (els.termsTag) els.termsTag.style.opacity = 1;
    if (els.gateBar) els.gateBar.style.transform = 'rotate(-90deg)';
    if (els.gateDot) { els.gateDot.style.opacity = 1; els.gateDot.style.fill = 'var(--mid, #5F6469)'; }
    if (els.stamp) { els.stamp.style.opacity = .92; els.stamp.style.transform = 'scale(1) rotate(0deg)'; }
  }

  function once(key, fn) { if (!fired[key]) { fired[key] = true; fn(); } }

  function tickBin(el) {
    if (!el) return;
    el.style.transition = 'none';
    el.style.stroke = 'var(--red, #D8401F)';
    tr(el, 'stroke', 0.15, EASE);
    void el.getBoundingClientRect(); // force the transition to apply below
    setTimeout(function () { if (el.isConnected) el.style.stroke = ''; }, 150);
  }

  function drawLine(el, delay) {
    if (!el) return;
    setTimeout(function () {
      if (!el.isConnected) return;
      tr(el, 'stroke-dashoffset', INV_DUR, EASE);
      el.style.strokeDashoffset = 0;
    }, delay * 1000);
  }

  function frame(now) {
    if (!running || !els) return;
    var elapsed = (now - startTime) / 1000, t = elapsed % LOOP;

    if (elapsed > 0 && t < 0.05 && !fired.__wrapped) { resetState(true); fired.__wrapped = true; }
    else if (t > 0.1) { fired.__wrapped = false; }

    if (els.flow) els.flow.style.strokeDashoffset = -((elapsed * FLOW_SPEED) % 12);
    if (els.flowOut && t >= OPEN_AT) els.flowOut.style.strokeDashoffset = -(((elapsed - OPEN_AT) * FLOW_SPEED) % 12);

    STOCK_TICKS.forEach(function (at, i) { if (t >= at) once('bin' + i, function () { tickBin(els.bins[i]); }); });

    if (t >= INV_START) once('inv', function () { els.invLines.forEach(function (l, i) { drawLine(l, i * INV_STAGGER); }); });

    if (t >= TERMS_AT) once('terms', function () {
      if (els.termsRect) { tr(els.termsRect, 'stroke-dashoffset', TERMS_DUR, EASE); els.termsRect.style.strokeDashoffset = 0; }
      if (els.termsTag) { tr(els.termsTag, 'opacity', TERMS_DUR, EASE); els.termsTag.style.opacity = 1; }
    });

    if (t >= HOLD_START && t < HOLD_END && els.gateDot) {
      var p = ((t - HOLD_START) % DOT_PULSE) / DOT_PULSE, wave = 0.5 - 0.5 * Math.cos(p * Math.PI * 2);
      els.gateDot.style.transition = 'none';
      els.gateDot.style.opacity = (0.35 + wave * 0.65).toFixed(3);
    }

    if (t >= OPEN_AT) once('open', function () {
      if (els.gateDot) { tr(els.gateDot, 'opacity,fill', 0.2, EASE); els.gateDot.style.opacity = 1; els.gateDot.style.fill = 'var(--mid, #5F6469)'; }
      if (els.stamp) {
        tr(els.stamp, 'opacity,transform', STAMP_DUR, STAMP_EASE);
        els.stamp.style.opacity = .92;
        els.stamp.style.transform = 'scale(1) rotate(4deg)';
        setTimeout(function () {
          if (!els.stamp.isConnected) return;
          tr(els.stamp, 'transform', SETTLE_DUR, 'ease-out');
          els.stamp.style.transform = 'scale(1) rotate(0deg)';
        }, STAMP_DUR * 1000);
      }
      if (els.gateBar) { tr(els.gateBar, 'transform', BAR_DUR, EASE); els.gateBar.style.transform = 'rotate(-90deg)'; }
    });

    if (t >= RESET_AT - RESET_DUR) once('reset', function () { resetState(false); });

    raf = requestAnimationFrame(frame);
  }

  function reduced() { return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches; }

  function pause() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (running && startTime !== null) pausedAt = performance.now();
  }

  function resume() {
    if (!running || raf) return;
    if (pausedAt !== null && startTime !== null) { startTime += performance.now() - pausedAt; pausedAt = null; }
    raf = requestAnimationFrame(frame);
  }

  function onVisibility() { if (document.hidden) pause(); else if (visible) resume(); }

  function watchViewport() {
    if (!svg || typeof IntersectionObserver !== 'function') return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible && !document.hidden) resume(); else pause();
      });
    }, { threshold: 0.01 });
    io.observe(svg);
  }

  function start() {
    if (!collect()) return; // no SVG on the page: do nothing, don't throw
    if (running) return; // idempotent
    running = true;

    if (reduced()) { runningState(); return; }

    resetState(true);
    startTime = performance.now();
    pausedAt = null;
    document.addEventListener('visibilitychange', onVisibility);
    watchViewport();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    document.removeEventListener('visibilitychange', onVisibility);
    if (io) { io.disconnect(); io = null; }
    if (els) resetState(true);
    startTime = null;
    pausedAt = null;
  }

  window.AndarHero = { start: start, stop: stop };
})();
