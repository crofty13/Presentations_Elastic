// Shared timeline helpers for the Elastic Security deck (needs eweb.js).
// Every slide runs one clock; under webdriver (PDF, PPTX, screenshots) it jumps to the final frame.
(function(){
  const S = window.SEC = {};
  S.skip = navigator.webdriver ? 120 : 0;
  S.clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  S.p = (t, start, dur) => EW.ease((t - start) / dur);          // eased progress 0..1
  S.lin = (t, start, dur) => S.clamp((t - start) / dur);         // linear progress 0..1
  S.run = fn => EW.loop(t0 => fn(t0 + S.skip));
  // [[time, selector], …]: toggles .on on everything the selector matches
  S.on = (t, steps) => { for (const [s, sel] of steps) document.querySelectorAll(sel).forEach(e => e.classList.toggle('on', t >= s)); };
  S.fmt = n => Math.round(n).toLocaleString('en-US');
  // draw an SVG path or line in, k in 0..1 (from the start, or from the end when rev)
  S.draw = (el, k, rev) => {
    if (!el.__L) el.__L = el.getTotalLength ? el.getTotalLength() : 0;
    el.style.strokeDasharray = el.__L; el.style.strokeDashoffset = (rev ? -1 : 1) * el.__L * (1 - k);
  };
  S.$ = id => document.getElementById(id);
})();
