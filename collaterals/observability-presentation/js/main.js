'use strict';

// ── Slide manifest ────────────────────────────────────────────────────────────
const SLIDES = [
  'index.html',
  '00-portfolio.html',
  '01-world.html',
  '02-track-record.html',
  '03-platform.html',
  'logs-pitch.html',
  'metrics-pitch.html',
  '04-transition.html',
  '05-ai-driven.html',
  '13-otel-collection.html',
  '06-streams.html',
  '07-ki-demo.html',
  'system-model.html',
  '08-discovery.html',
  '10-gen-obs.html',
  '11-mcp-demo.html',
  '12-gen-dashboard.html',
  'nightshift-intro.html',
  'nightshift-hero.html',
  'nightshift-architecture.html',
  'nightshift-capabilities.html',
  'nightshift-ai-index.html',
  'nightshift-brain.html',
  'nightshift-ai-economics.html',
  '09-nightshift.html',
  'nightshift-business-model.html',
  'nightshift-reveal.html',
  'thank-you.html',
];

function currentSlideIndex() {
  const file = window.location.pathname.split('/').pop() || 'index.html';
  const idx = SLIDES.indexOf(file);
  return idx === -1 ? 0 : idx;
}

// ── Fullscreen ────────────────────────────────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

// ── Keyboard navigation ───────────────────────────────────────────────────────
// Save fullscreen flag BEFORE navigating — by the time pagehide fires the
// browser has already cleared document.fullscreenElement.
function saveFs() {
  if (document.fullscreenElement) sessionStorage.setItem('preso-fs', '1');
}

// When running inside player.html, skip all navigation — player handles it
const inPlayer = window !== window.top;

// Forward keyboard events to player when iframe has focus
if (inPlayer) {
  document.addEventListener('keydown', e => {
    window.parent.postMessage({ type: 'keydown', key: e.key }, '*');
  });
}

if (!inPlayer) {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const idx = currentSlideIndex();
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') && idx < SLIDES.length - 1) {
      e.preventDefault();
      saveFs();
      window.location.href = SLIDES[idx + 1];
    }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && idx > 0) {
      e.preventDefault();
      saveFs();
      window.location.href = SLIDES[idx - 1];
    }
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
  });
}

// ── Inject nav UI ─────────────────────────────────────────────────────────────
function injectNav() {
  const style = document.createElement('style');
  style.textContent = `
    .preso-nav {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      z-index: 9999;
      background: rgba(34,36,44,0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 40px;
      padding: 0.3rem 0.45rem;
    }
    .preso-nav .nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
      cursor: pointer;
    }
    .preso-nav .nav-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
    .preso-nav .nav-btn svg { width: 13px; height: 13px; }
    .preso-nav .nav-btn--disabled { opacity: 0.2; pointer-events: none; }
    .preso-nav .nav-counter {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 0.62rem;
      font-weight: 600;
      color: rgba(255,255,255,0.45);
      letter-spacing: 0.06em;
      padding: 0 0.35rem;
      user-select: none;
    }
  `;
  document.head.appendChild(style);

  const idx = currentSlideIndex();

  const chevL = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L6 8l4 5"/></svg>`;
  const chevR = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l4 5-4 5"/></svg>`;
  const fsIcon = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/></svg>`;

  const prevEl = idx > 0
    ? `<a href="${SLIDES[idx - 1]}" class="nav-btn" title="Previous (←)">${chevL}</a>`
    : `<span class="nav-btn nav-btn--disabled">${chevL}</span>`;

  const nextEl = idx < SLIDES.length - 1
    ? `<a href="${SLIDES[idx + 1]}" class="nav-btn" title="Next (→)">${chevR}</a>`
    : `<span class="nav-btn nav-btn--disabled">${chevR}</span>`;

  const nav = document.createElement('nav');
  nav.className = 'preso-nav';
  nav.innerHTML = `${prevEl}<span class="nav-counter">${idx + 1}&thinsp;/&thinsp;${SLIDES.length}</span><a href="#" id="fs-btn" class="nav-btn" title="Fullscreen (F)">${fsIcon}</a>${nextEl}`;
  document.body.appendChild(nav);

  document.getElementById('fs-btn').addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    toggleFullscreen();
  });

  nav.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', e => {
      e.stopPropagation();
      saveFs();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (inPlayer) return; // player.html owns fullscreen and nav
  if (sessionStorage.getItem('preso-fs')) {
    sessionStorage.removeItem('preso-fs');
    document.documentElement.requestFullscreen().catch(() => {});
  }
  injectNav();
});

// ── Reveal on scroll ──────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Animate stat counters ─────────────────────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;
    el.textContent = prefix + (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
