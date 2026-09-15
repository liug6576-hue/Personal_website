/* ============================================================
   GoodThings — Fiverr Affiliate Directory · main.js
   1. Particle background (mouse drag tracking)
   2. Typing tagline rotator (brand slogans)
   3. UI: navbar / mobile menu / animated counters / reveal / back-to-top
   ============================================================ */

/* ============================================================
   一、Particle background: mouse-follow + drag vortex + click pulse
   ============================================================ */
(function particleField() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W, H, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = ["0,240,255", "125,243,255", "167,139,250", "255,255,255"];
  const N = Math.min(150, Math.floor(W * H / 12000));
  const particles = [];

  function spawn(x, y, burst) {
    const a = Math.random() * Math.PI * 2;
    const speed = burst ? 2 + Math.random() * 3.5 : 0.25 + Math.random() * 0.55;
    return {
      x: x !== undefined ? x : Math.random() * W,
      y: y !== undefined ? y : Math.random() * H,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      r: burst ? 1 + Math.random() * 1.8 : 0.8 + Math.random() * 1.7,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      life: burst ? 90 + Math.random() * 60 : Infinity,
    };
  }
  for (let i = 0; i < N; i++) particles.push(spawn());

  const mouse = { x: -9999, y: -9999, down: false, active: false };
  const rings = [];

  function pos(e) {
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX, y: t.clientY };
  }
  function onMove(e) {
    const p = pos(e);
    mouse.x = p.x; mouse.y = p.y; mouse.active = true;
    if (mouse.down && particles.length < 320) {
      particles.push(spawn(p.x + (Math.random() - .5) * 14, p.y + (Math.random() - .5) * 14, true));
    }
  }
  function onDown(e) {
    const p = pos(e);
    mouse.x = p.x; mouse.y = p.y; mouse.down = true; mouse.active = true;
    rings.push({ x: p.x, y: p.y, r: 4, max: 90 + Math.random() * 50 });
  }
  function onUp() { mouse.down = false; }
  function onLeave() { mouse.active = false; mouse.x = mouse.y = -9999; mouse.down = false; }

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mousedown", onDown, { passive: true });
  window.addEventListener("mouseup", onUp, { passive: true });
  window.addEventListener("mouseout", onLeave, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("touchend", onUp, { passive: true });

  const LINK_DIST = 110;
  const MOUSE_DIST = 190;

  function step() {
    ctx.clearRect(0, 0, W, H);

    for (let i = rings.length - 1; i >= 0; i--) {
      const rg = rings[i];
      rg.r += 3.2;
      ctx.beginPath();
      ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,240,255,${Math.max(0, 1 - rg.r / rg.max) * .5})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      if (rg.r >= rg.max) rings.splice(i, 1);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      if (mouse.active) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const d = Math.sqrt(d2) || 1;
          const pull = mouse.down ? 0.045 : 0.012;
          p.vx += (dx / d) * pull * (1 - d / MOUSE_DIST) * 4;
          p.vy += (dy / d) * pull * (1 - d / MOUSE_DIST) * 4;
          if (mouse.down) {
            p.vx += (-dy / d) * 0.16;
            p.vy += (dx / d) * 0.16;
          }
        }
      }

      p.vx *= 0.965; p.vy *= 0.965;
      p.vx += (Math.random() - .5) * 0.02;
      p.vy += (Math.random() - .5) * 0.02;

      p.x += p.vx; p.y += p.vy;

      if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;

      if (p.life !== Infinity && --p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},0.85)`;
      ctx.shadowColor = `rgba(${p.c},0.9)`;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.lineWidth = 0.6;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.28;
          ctx.strokeStyle = `rgba(${a.c},${alpha})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse.active) {
        const dx = a.x - mouse.x, dy = a.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.45;
          ctx.strokeStyle = `rgba(0,240,255,${alpha})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.down ? 16 : 10, 0, Math.PI * 2);
      ctx.strokeStyle = mouse.down ? "rgba(244,114,182,0.8)" : "rgba(0,240,255,0.65)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    requestAnimationFrame(step);
  }
  if (!reduced) requestAnimationFrame(step);
})();

/* ============================================================
   二、Page interactions
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* Navbar scroll shadow + back-to-top */
  const navbar = document.getElementById("navbar");
  const backTop = document.getElementById("back-top");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Mobile hamburger menu */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open")));

  /* Typing tagline rotator (brand slogans) */
  const typingEl = document.getElementById("typing");
  const slogans = [
    "Fiverr Sellers, Vetted by Hand",
    "Honest Reviews, Real Prices",
    "Free Step-by-Step Guides",
    "Hire With Confidence",
  ];
  let sIdx = 0, cIdx = 0, deleting = false;
  (function tick() {
    if (!typingEl || !slogans.length) return;
    const word = slogans[sIdx % slogans.length];
    cIdx += deleting ? -1 : 1;
    typingEl.textContent = word.slice(0, cIdx);
    let delay = deleting ? 45 : 90;
    if (!deleting && cIdx >= word.length) { deleting = true; delay = 1700; }
    else if (deleting && cIdx <= 0) { deleting = false; sIdx++; delay = 350; }
    setTimeout(tick, delay);
  })();

  /* Animated counters (supports decimals, e.g. 4.9★) */
  const counters = document.querySelectorAll(".stat-num");
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count) || 0;
      const dec = parseInt(el.dataset.decimals || "0", 10);
      const t0 = performance.now();
      (function run(t) {
        const k = Math.min((t - t0) / 1400, 1);
        el.textContent = (target * (1 - Math.pow(1 - k, 3))).toFixed(dec);
        if (k < 1) requestAnimationFrame(run);
      })(t0);
      counterObs.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(c => counterObs.observe(c));

  /* Scroll reveal animations */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); revealObs.unobserve(en.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));
});
