/* ============================================================
   个人品牌官网 · 主脚本
   1. 粒子背景（鼠标拖动粒子追踪）
   2. 中英文切换（translations 对象，替换占位文字在这里改）
   3. 页面交互：导航 / 打字机 / 数字滚动 / 入场动画 / 返回顶部
   ============================================================ */

/* ============================================================
   一、中英文文案（所有占位文字在这里统一修改）
   ============================================================ */
const translations = {
  zh: {
    "logo": "你的名字",
    "nav.about": "关于我",
    "nav.video": "个人视频",
    "nav.articles": "文章",
    "nav.works": "作品展示",

    "hero.hello": "你好，欢迎来到我的数字空间",
    "hero.cta1": "查看作品",
    "hero.cta2": "了解我",
    "hero.stat1": "年经验",
    "hero.stat2": "项目",
    "hero.stat3": "文章",

    "about.title": "关于我",
    "about.photoTag": "// ID CARD · 001",
    "about.name": "我是你的名字",
    "about.role": "[ 科幻创作者 / 数字体验设计师 ]",
    "about.bio1": "【占位文字】这里写你的个人介绍第一段：你是谁、从事什么领域、有什么独特经历。建议 2~3 句话，突出你的个人标签与专业方向。",
    "about.bio2": "【占位文字】这里写第二段：你的理念、擅长技能或正在探索的方向，让访客快速建立对你的认知与信任。",

    "video.title": "个人视频",
    "video.note": "[ 视频文件：images/my-video.mp4 · 封面：images/video-poster.jpg ]",
    "video.desc": "【占位文字】视频简介：一句话介绍这个视频的内容，例如个人宣传片、作品混剪或演讲记录。",

    "articles.title": "文章",
    "articles.tag1": "随笔",
    "articles.tag2": "技术",
    "articles.tag3": "创作",
    "articles.read": "阅读更多 →",
    "articles.a1.title": "【占位标题】文章标题一：关于未来的一百种想象",
    "articles.a1.excerpt": "【占位摘要】这里是文章摘要占位文字，写 1~2 句吸引读者点击的内容概述，说明文章主题与价值。",
    "articles.a2.title": "【占位标题】文章标题二：粒子系统的设计与实现",
    "articles.a2.excerpt": "【占位摘要】这里是文章摘要占位文字，写 1~2 句吸引读者点击的内容概述，说明文章主题与价值。",
    "articles.a3.title": "【占位标题】文章标题三：我的科幻创作手记",
    "articles.a3.excerpt": "【占位摘要】这里是文章摘要占位文字，写 1~2 句吸引读者点击的内容概述，说明文章主题与价值。",

    "works.title": "作品展示",
    "works.w1.title": "【占位】作品名称一",
    "works.w1.desc": "作品简介占位：一句话说明这个作品是什么、用了什么技术。",
    "works.w2.title": "【占位】作品名称二",
    "works.w2.desc": "作品简介占位：一句话说明这个作品是什么、用了什么技术。",
    "works.w3.title": "【占位】作品名称三",
    "works.w3.desc": "作品简介占位：一句话说明这个作品是什么、用了什么技术。",
    "works.w4.title": "【占位】作品名称四",
    "works.w4.desc": "作品简介占位：一句话说明这个作品是什么、用了什么技术。",
    "works.w5.title": "【占位】作品名称五",
    "works.w5.desc": "作品简介占位：一句话说明这个作品是什么、用了什么技术。",
    "works.w6.title": "【占位】作品名称六",
    "works.w6.desc": "作品简介占位：一句话说明这个作品是什么、用了什么技术。",

    "footer.title": "建立连接",
    "footer.desc": "【占位文字】欢迎合作与交流，可以通过以下方式找到我。",
    "footer.rights": "保留所有权利",

    /* 打字机轮播文案 */
    "typing": ["数字体验设计师", "科幻内容创作者", "粒子与光的探索者"],
  },
  en: {
    "logo": "YOUR NAME",
    "nav.about": "About",
    "nav.video": "Video",
    "nav.articles": "Articles",
    "nav.works": "Works",

    "hero.hello": "Hello, welcome to my digital space",
    "hero.cta1": "View Works",
    "hero.cta2": "About Me",
    "hero.stat1": "Years Experience",
    "hero.stat2": "Projects",
    "hero.stat3": "Articles",

    "about.title": "About Me",
    "about.photoTag": "// ID CARD · 001",
    "about.name": "I'm Your Name",
    "about.role": "[ Sci-fi Creator / Digital Experience Designer ]",
    "about.bio1": "[Placeholder] First paragraph of your bio: who you are, what field you work in, and what makes your journey unique. Keep it to 2-3 sentences highlighting your identity.",
    "about.bio2": "[Placeholder] Second paragraph: your philosophy, core skills, or what you are currently exploring, so visitors can quickly build trust in you.",

    "video.title": "Featured Video",
    "video.note": "[ Video file: images/my-video.mp4 · Poster: images/video-poster.jpg ]",
    "video.desc": "[Placeholder] Video description: one sentence introducing this video, e.g. a personal showreel, works montage or a talk recording.",

    "articles.title": "Articles",
    "articles.tag1": "Essay",
    "articles.tag2": "Tech",
    "articles.tag3": "Creation",
    "articles.read": "Read More →",
    "articles.a1.title": "[Placeholder] Article One: A Hundred Imaginations of the Future",
    "articles.a1.excerpt": "[Placeholder] Article excerpt placeholder. Write 1-2 sentences summarizing the topic and value to attract readers.",
    "articles.a2.title": "[Placeholder] Article Two: Designing a Particle System",
    "articles.a2.excerpt": "[Placeholder] Article excerpt placeholder. Write 1-2 sentences summarizing the topic and value to attract readers.",
    "articles.a3.title": "[Placeholder] Article Three: My Sci-fi Creation Notes",
    "articles.a3.excerpt": "[Placeholder] Article excerpt placeholder. Write 1-2 sentences summarizing the topic and value to attract readers.",

    "works.title": "Works",
    "works.w1.title": "[Placeholder] Project One",
    "works.w1.desc": "Placeholder: one sentence about what this work is and the tech behind it.",
    "works.w2.title": "[Placeholder] Project Two",
    "works.w2.desc": "Placeholder: one sentence about what this work is and the tech behind it.",
    "works.w3.title": "[Placeholder] Project Three",
    "works.w3.desc": "Placeholder: one sentence about what this work is and the tech behind it.",
    "works.w4.title": "[Placeholder] Project Four",
    "works.w4.desc": "Placeholder: one sentence about what this work is and the tech behind it.",
    "works.w5.title": "[Placeholder] Project Five",
    "works.w5.desc": "Placeholder: one sentence about what this work is and the tech behind it.",
    "works.w6.title": "[Placeholder] Project Six",
    "works.w6.desc": "Placeholder: one sentence about what this work is and the tech behind it.",

    "footer.title": "Connect",
    "footer.desc": "[Placeholder] Open for collaboration — reach me through the channels below.",
    "footer.rights": "All rights reserved",

    "typing": ["Digital Experience Designer", "Sci-fi Content Creator", "Explorer of Particles & Light"],
  }
};

let currentLang = localStorage.getItem("site-lang") || "zh";

/* 打字机（顶层定义，供 applyLang 调用） */
let typeTimer = null;
function restartTyping() {
  clearTimeout(typeTimer);
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;
  const words = translations[currentLang].typing || [];
  let wi = 0, ci = 0, deleting = false;
  (function tick() {
    if (!words.length) return;
    const word = words[wi % words.length];
    ci += deleting ? -1 : 1;
    typingEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 95;
    if (!deleting && ci >= word.length) { deleting = true; delay = 1600; }
    else if (deleting && ci <= 0) { deleting = false; wi++; delay = 350; }
    typeTimer = setTimeout(tick, delay);
  })();
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("site-lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = lang === "zh" ? "YOUR NAME | 个人品牌官网" : "YOUR NAME | Personal Brand Site";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = translations[lang][key];
    if (val !== undefined) el.textContent = val;
  });

  const label = document.getElementById("lang-label");
  if (label) label.textContent = lang === "zh" ? "EN" : "中文";

  restartTyping();
}

/* ============================================================
   二、粒子背景：鼠标拖动 · 粒子追踪
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

  const COLORS = ["34,211,238", "167,139,250", "244,114,182", "255,255,255"];
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

  /* 鼠标状态：追踪 / 拖拽吸引 */
  const mouse = { x: -9999, y: -9999, down: false, active: false };
  const rings = []; // 点击脉冲

  function pos(e) {
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX, y: t.clientY };
  }
  function onMove(e) {
    const p = pos(e);
    mouse.x = p.x; mouse.y = p.y; mouse.active = true;
    /* 拖动时沿途喷射粒子 → 拖动粒子追踪效果 */
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

  const LINK_DIST = 110;        // 粒子连线距离
  const MOUSE_DIST = 190;       // 鼠标影响范围

  function step() {
    ctx.clearRect(0, 0, W, H);

    /* 脉冲圆环 */
    for (let i = rings.length - 1; i >= 0; i--) {
      const rg = rings[i];
      rg.r += 3.2;
      ctx.beginPath();
      ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34,211,238,${Math.max(0, 1 - rg.r / rg.max) * .5})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      if (rg.r >= rg.max) rings.splice(i, 1);
    }

    /* 更新粒子 */
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      if (mouse.active) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const d = Math.sqrt(d2) || 1;
          /* 未按下：轻微追踪跟随；按下拖动：强力吸引形成漩涡 */
          const pull = mouse.down ? 0.045 : 0.012;
          p.vx += (dx / d) * pull * (1 - d / MOUSE_DIST) * 4;
          p.vy += (dy / d) * pull * (1 - d / MOUSE_DIST) * 4;
          /* 拖动时加一点切向力 → 漩涡感 */
          if (mouse.down) {
            p.vx += (-dy / d) * 0.16;
            p.vy += (dx / d) * 0.16;
          }
        }
      }

      /* 摩擦 + 微漂移 */
      p.vx *= 0.965; p.vy *= 0.965;
      p.vx += (Math.random() - .5) * 0.02;
      p.vy += (Math.random() - .5) * 0.02;

      p.x += p.vx; p.y += p.vy;

      /* 边缘环绕 */
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

    /* 粒子连线 */
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
      /* 粒子 → 鼠标连线 */
      if (mouse.active) {
        const dx = a.x - mouse.x, dy = a.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.45;
          ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    /* 鼠标光标环 */
    if (mouse.active) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.down ? 16 : 10, 0, Math.PI * 2);
      ctx.strokeStyle = mouse.down ? "rgba(244,114,182,0.8)" : "rgba(34,211,238,0.65)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    requestAnimationFrame(step);
  }
  if (!reduced) requestAnimationFrame(step);
})();

/* ============================================================
   三、页面交互
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  /* 语言切换 */
  applyLang(currentLang);
  document.getElementById("lang-toggle").addEventListener("click", () => {
    applyLang(currentLang === "zh" ? "en" : "zh");
  });

  /* 导航栏滚动阴影 */
  const navbar = document.getElementById("navbar");
  const backTop = document.getElementById("back-top");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* 移动端菜单 */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open")));

  /* 打字机 */
  restartTyping();

  /* 数字滚动 */
  const counters = document.querySelectorAll(".stat-num");
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.count;
      const t0 = performance.now();
      (function run(t) {
        const k = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(run);
      })(t0);
      counterObs.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(c => counterObs.observe(c));

  /* 入场动画 */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); revealObs.unobserve(en.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));
});
