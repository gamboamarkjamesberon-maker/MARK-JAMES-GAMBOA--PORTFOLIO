// =========================================================
// MARK JAMES B. GAMBOA — INTERACTIVE FX & CURSOR ENGINE
// =========================================================

const THEMES = {
  cyber: { label: "⚡ 01 · CYBER NEON GRID · 2026", symbol: "⚡", primary: "#00f3ff", color1: "rgba(0, 243, 255, 0.35)", color2: "rgba(176, 0, 255, 0.25)" },
  aurora: { label: "🌿 02 · AURORA PLASMA · 2026", symbol: "🟢", primary: "#00ff9d", color1: "rgba(0, 255, 157, 0.35)", color2: "rgba(0, 184, 255, 0.25)" },
  matrix: { label: "💻 03 · MATRIX BINARY · 2026", symbol: "👾", primary: "#00ff41", color1: "rgba(0, 255, 65, 0.38)", color2: "rgba(0, 143, 17, 0.25)" },
  galaxy: { label: "🌌 04 · QUANTUM GAVITY · 2026", symbol: "✨", primary: "#ff00dd", color1: "rgba(255, 0, 221, 0.35)", color2: "rgba(112, 0, 255, 0.25)" }
};

let currentTheme = "cyber";
const htmlEl = document.documentElement;
const badgeEl = document.getElementById("themeBadge");
const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-theme");
    if (!THEMES[target]) return;
    currentTheme = target;
    htmlEl.setAttribute("data-theme", target);
    badgeEl.textContent = THEMES[target].label;

    themeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    particles.forEach((p) => {
      p.symbol = THEMES[target].symbol;
    });
  });
});

// Interactive Full HD Canvas with Cursor Attraction & Neon Particles
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const mouse = { x: width / 2, y: height / 2, active: false };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

window.addEventListener("mouseleave", () => {
  mouse.active = false;
});

const particles = Array.from({ length: 42 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 3 + 1.5,
  speedX: (Math.random() - 0.5) * 1.2,
  speedY: (Math.random() - 0.5) * 1.2,
  symbol: THEMES.cyber.symbol
}));

let t = 0;
function animateCanvas() {
  t += 0.03;
  ctx.clearRect(0, 0, width, height);

  const cfg = THEMES[currentTheme];

  // Draw Dynamic Neon Plasma Waves following Cursor
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    let baseY = height * (0.3 + i * 0.2);
    ctx.moveTo(0, baseY);
    for (let x = 0; x <= width; x += 40) {
      let dist = Math.hypot(x - mouse.x, baseY - mouse.y);
      let pull = mouse.active ? Math.max(0, 1 - dist / 350) * (mouse.y - baseY) * 0.4 : 0;
      let wave = Math.sin(x * 0.003 + t + i) * 45;
      ctx.lineTo(x, baseY + wave + pull);
    }
    ctx.strokeStyle = i === 0 ? cfg.color1 : cfg.color2;
    ctx.lineWidth = 3 - i * 0.6;
    ctx.stroke();
  }

  // Draw Floating Neon Particles & Cursor connection lines
  particles.forEach((p, idx) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // Connect to cursor if nearby
    if (mouse.active) {
      let d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (d < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = cfg.primary;
        ctx.globalAlpha = (1 - d / 160) * 0.35;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    ctx.fillStyle = cfg.primary;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Tilt Effect on Cards
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-5px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Certificate Modal Functions
function openModal(type) {
  const modal = document.getElementById("certModal");
  const body = document.getElementById("modalBody");
  modal.classList.add("active");

  if (type === 'csharp') {
    body.innerHTML = `
      <div style="padding: 1rem;">
        <span class="badge-pill">CODECHUM CERTIFICATE</span>
        <h2 style="font-family:'Space Grotesk',sans-serif; color:var(--primary); margin:1rem 0;">C# Programming 1</h2>
        <p style="color:var(--text-main); font-weight:600; margin-bottom:0.5rem;">Awarded to: Mark James Gamboa</p>
        <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:1.25rem;">Score: <strong>1312/1315</strong> in 1F3-ITC112-CSharp (MinSU)<br>Date Issued: November 8, 2026</p>
        <div style="background:rgba(255,255,255,0.04); border:1px solid var(--card-border); padding:1.25rem; border-radius:16px; margin-bottom:1.5rem;">
          <p style="color:var(--primary); font-family:monospace; word-break:break-all;">https://minsu.codechum.com/certificates/32405</p>
        </div>
        <a href="https://minsu.codechum.com/certificates/32405" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Verify Official Certificate ↗</a>
      </div>
    `;
  } else if (type === 'cprog') {
    body.innerHTML = `
      <div style="padding: 1rem;">
        <span class="badge-pill">CODECHUM CERTIFICATE</span>
        <h2 style="font-family:'Space Grotesk',sans-serif; color:var(--primary); margin:1rem 0;">C Programming 1</h2>
        <p style="color:var(--text-main); font-weight:600; margin-bottom:0.5rem;">Awarded to: Mark James Gamboa</p>
        <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:1.25rem;">Score: <strong>1352/1365</strong> in 1F3-ITC112 (MinSU)<br>Date Issued: November 8, 2026</p>
        <div style="background:rgba(255,255,255,0.04); border:1px solid var(--card-border); padding:1.25rem; border-radius:16px; margin-bottom:1.5rem;">
          <p style="color:var(--primary); font-family:monospace; word-break:break-all;">https://minsu.codechum.com/certificates/32362</p>
        </div>
        <a href="https://minsu.codechum.com/certificates/32362" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Verify Official Certificate ↗</a>
      </div>
    `;
  }
}

function closeModal(e) {
  if (e.target.id === 'certModal') {
    document.getElementById("certModal").classList.remove("active");
  }
}

function closeModalBtn() {
  document.getElementById("certModal").classList.remove("active");
}
