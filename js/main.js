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
   二、Floating Lofi Audio Player
   - Royalty-free Pixabay tracks · starts PAUSED (no autoplay)
   - Self-injects site-wide: any page that loads main.js gets it
   ============================================================ */
(function lofiPlayer() {
  /* ---- Playlist: replace src here to swap tracks ---- */
  const TRACKS = [
    {
      title: "Cozy Coffee House",
      src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    },
    {
      title: "Midnight Chill Beat",
      src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3",
    },
    {
      title: "Lazy Afternoon Lofi",
      /* NOTE: original 2022 CDN key was removed from Pixabay (S3 403); this is
         the current official download URL of the same track (id 267117) */
      src: "https://cdn.pixabay.com/download/audio/2024/11/21/audio_458affa25f.mp3?filename=lofcosmos-lazy-afternoon-lofi-267117.mp3",
    },
  ];

  /* ---- Inline SVG icons (fill: currentColor unless noted) ---- */
  const ICONS = {
    play:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.79-6.86a1.04 1.04 0 0 0 0-1.76L9.56 4.26A1.04 1.04 0 0 0 8 5.14z"/></svg>',
    pause:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z"/></svg>',
    prev:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 6a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1z"/><path d="M19 6.32v11.36c0 .79-.87 1.27-1.54.84l-8.1-5.68a1 1 0 0 1 0-1.68l8.1-5.68c.67-.43 1.54.05 1.54.84z"/></svg>',
    next:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1z"/><path d="M5 6.32v11.36c0 .79.87 1.27 1.54.84l8.1-5.68a1 1 0 0 0 0-1.68L6.54 5.48C5.87 5.05 5 5.53 5 6.32z"/></svg>',
    volOn:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="lp-ic-fill" d="M11 5 6 9H3.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H6l5 4V5z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path d="M18 6.8a7.5 7.5 0 0 1 0 10.4"/></svg>',
    volOff:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="lp-ic-fill" d="M11 5 6 9H3.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H6l5 4V5z"/><path d="m16 9.5 4.5 5M20.5 9.5 16 14.5"/></svg>',
    chevron:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>',
    note:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
  };

  /* localStorage may throw in privacy mode — guard every access */
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, val) {
      try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
    },
  };

  /* ---- Mount (auto-create root on pages without the HTML node) ---- */
  let root = document.getElementById("lofi-player-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "lofi-player-root";
    document.body.appendChild(root);
  }

  root.innerHTML =
    '<div class="lofi-player" role="region" aria-label="Lofi music player">' +
      '<div class="lp-head">' +
        '<div class="lp-disc-wrap">' +
          '<div class="lp-disc">' + ICONS.note + "</div>" +
          '<button type="button" class="lp-play-mini" aria-label="Play">' + ICONS.play + "</button>" +
        "</div>" +
        '<div class="lp-meta">' +
          '<p class="lp-tag"><span class="lp-live">LOFI MIX</span><span class="lp-index">01 / 03</span></p>' +
          '<p class="lp-title"></p>' +
        "</div>" +
        '<button type="button" class="lp-collapse" aria-label="Expand player" aria-expanded="false">' + ICONS.chevron + "</button>" +
      "</div>" +
      '<div class="lp-body">' +
        '<div class="lp-controls">' +
          '<button type="button" class="lp-btn lp-prev" aria-label="Previous track">' + ICONS.prev + "</button>" +
          '<button type="button" class="lp-btn lp-main lp-toggle" aria-label="Play">' + ICONS.play + "</button>" +
          '<button type="button" class="lp-btn lp-next" aria-label="Next track">' + ICONS.next + "</button>" +
          '<button type="button" class="lp-btn lp-mute" aria-label="Mute" aria-pressed="false">' + ICONS.volOn + "</button>" +
        "</div>" +
      "</div>" +
    "</div>";

  const player  = root.querySelector(".lofi-player");
  const titleEl = root.querySelector(".lp-title");
  const indexEl = root.querySelector(".lp-index");
  const liveEl  = root.querySelector(".lp-live");
  const toggleBtn = root.querySelector(".lp-toggle");
  const miniBtn   = root.querySelector(".lp-play-mini");
  const prevBtn   = root.querySelector(".lp-prev");
  const nextBtn   = root.querySelector(".lp-next");
  const muteBtn   = root.querySelector(".lp-mute");
  const collapseBtn = root.querySelector(".lp-collapse");

  /* ---- Audio core: no autoplay, no preload (zero traffic until play) ---- */
  const audio = new Audio();
  audio.preload = "none";
  let current = 0;

  function pad(n) { return String(n).padStart(2, "0"); }

  function loadTrack(i, autoplay) {
    current = (i + TRACKS.length) % TRACKS.length;
    const track = TRACKS[current];
    player.classList.remove("is-error");
    liveEl.textContent = "LOFI MIX";
    titleEl.textContent = track.title;
    indexEl.textContent = pad(current + 1) + " / " + pad(TRACKS.length);
    audio.src = track.src;
    if (autoplay) {
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(function () { /* error event handles UI */ });
    }
  }

  function setPlayingUI(playing) {
    player.classList.toggle("is-playing", playing);
    toggleBtn.innerHTML = playing ? ICONS.pause : ICONS.play;
    miniBtn.innerHTML   = playing ? ICONS.pause : ICONS.play;
    toggleBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
    miniBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  function togglePlay() {
    if (audio.paused) {
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(function () { /* error event handles UI */ });
    } else {
      audio.pause();
    }
  }

  /* ---- Events ---- */
  audio.addEventListener("play", function () { setPlayingUI(true); });
  audio.addEventListener("pause", function () { setPlayingUI(false); });
  audio.addEventListener("ended", function () { loadTrack(current + 1, true); });
  audio.addEventListener("error", function () {
    if (!audio.src) return;
    player.classList.add("is-error");
    liveEl.textContent = "LOAD ERROR";
  });

  toggleBtn.addEventListener("click", togglePlay);
  miniBtn.addEventListener("click", togglePlay);

  nextBtn.addEventListener("click", function () {
    loadTrack(current + 1, !audio.paused);
  });
  prevBtn.addEventListener("click", function () {
    /* Restart current track if it is already 3s in; otherwise jump back */
    if (audio.src && audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      loadTrack(current - 1, !audio.paused);
    }
  });

  muteBtn.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteBtn.classList.toggle("is-muted", audio.muted);
    muteBtn.innerHTML = audio.muted ? ICONS.volOff : ICONS.volOn;
    muteBtn.setAttribute("aria-pressed", String(audio.muted));
    muteBtn.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
  });

  function setCollapsed(collapsed) {
    player.classList.toggle("is-collapsed", collapsed);
    collapseBtn.setAttribute("aria-expanded", String(!collapsed));
    collapseBtn.setAttribute("aria-label", collapsed ? "Expand player" : "Collapse player");
    storage.set("lofi-collapsed", collapsed ? "1" : "0");
  }
  collapseBtn.addEventListener("click", function () {
    setCollapsed(!player.classList.contains("is-collapsed"));
  });

  /* ---- Initial state: paused; collapsed on mobile unless user chose otherwise ---- */
  loadTrack(0, false);
  const saved = storage.get("lofi-collapsed");
  const startCollapsed =
    saved !== null ? saved === "1" : window.matchMedia("(max-width: 600px)").matches;
  setCollapsed(startCollapsed);
})();

/* ============================================================
   三、Page interactions
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
