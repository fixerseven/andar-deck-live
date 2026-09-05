/* The hero board plays one Tuesday, 06:00 to 18:00, in eleven seconds.
   At 14:22 a release is held and the board asks; two beats later the
   stamp lands and the day carries on. Reduced motion: rests on the ask. */
(function(){
  var root=document.querySelector('.hero .board'); if(!root) return;
  var q=function(s){return root.querySelector(s)};
  var clock=q('[data-b-clock]'), tick=q('[data-b-tick]'), deliv=q('[data-b-deliv]'), delivS=q('[data-b-deliv-s]'),
      inv=q('[data-b-inv]'), courts=q('[data-b-courts]'), owed=q('[data-b-owed]'),
      gate=q('[data-b-gate]'), gk=q('[data-b-gate-k]'), gv=q('[data-b-gate-v]'), gs=q('[data-b-gate-s]'), gb=q('[data-b-gate-b]'),
      port=q('[data-b-port]'), portS=q('[data-b-port-s]');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T=11000, t0=null, raf=null, paused=false;
  function pad(n){return (n<10?'0':'')+n}
  function state(p){
    var mins=360+p*720, h=Math.floor(mins/60), m=Math.floor(mins%60);
    clock.textContent=pad(h)+':'+pad(m); tick.style.left=(p*100)+'%';
    deliv.textContent=Math.min(18,Math.floor(p*22)); delivS.textContent=p<.08?'vans loading':(p<.9?'3 vans out':'all back');
    var n=Math.min(9,Math.floor(Math.max(0,p-.15)*20)); inv.textContent=n;
    courts.textContent=Math.min(12,2+Math.floor(Math.max(0,p-.4)*22));
    owed.textContent='₱'+(2840620-n*38000).toLocaleString('en-PH');
    var held=p>.70&&p<.86, done=p>=.86;
    if(held||done){ gate.classList.add('is-ask'); gk.textContent='Waiting on you'; gv.textContent='Release stock · ₱482,400'; gs.textContent=done?'Approved 14:24 · released':'Bay 05 · customer over terms · 14:22'; }
    else{ gate.classList.remove('is-ask','is-done'); gk.textContent='Stock, both warehouses'; gv.textContent='4,182 items'; gs.textContent='2 running low'; }
    gate.classList.toggle('is-done',done);
    port.textContent=p<.5?'3 shipments':'2 shipments'; portS.textContent=p<.3?'1 needs a document':(p<.5?'document received':'1 delivered');
  }
  function frame(now){ if(paused) return; if(t0===null) t0=now; state(((now-t0)%T)/T); raf=requestAnimationFrame(frame); }
  function start(){ if(reduce){ state(.78); return; } if(!raf){ paused=false; raf=requestAnimationFrame(frame); } }
  function stop(){ paused=true; if(raf){ cancelAnimationFrame(raf); raf=null; } }
  document.addEventListener('visibilitychange',function(){ document.hidden?stop():start(); });
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es[0].isIntersecting?start():stop(); },{threshold:.05}).observe(root); } else start();
  // entrance: tiles fly in from where they belong
  root.querySelectorAll('.bd-tile').forEach(function(t,i){ t.style.setProperty('--i',i); t.classList.add('fly'); });
  start();
})();
