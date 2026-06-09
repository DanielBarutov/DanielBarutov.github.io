// ── Matrix Rain ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const CHARS = (KATAKANA + '01').split('');

const FONT_SIZE = 16;
const RAIN_INTERVAL = 50;   // ms — ~20 fps
let columns = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.floor(canvas.width / FONT_SIZE);

  // preserve existing drop positions when resizing
  const prev = columns.slice();
  columns = Array.from({ length: count }, (_, i) =>
    prev[i] !== undefined ? prev[i] : Math.random() * -canvas.height / FONT_SIZE
  );
}

function drawRain() {
  // semi-transparent black fade — creates the trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${FONT_SIZE}px monospace`;

  columns.forEach((y, i) => {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    const x = i * FONT_SIZE;

    // leading character is bright white-green, rest are #00ff41
    ctx.fillStyle = y < 2 ? '#ccffcc' : '#00ff41';
    ctx.fillText(char, x, y * FONT_SIZE);

    // reset column to top with randomness once it passes the bottom
    if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
      columns[i] = 0;
    }
    columns[i] += 1;
  });
}

if (canvas && ctx) {
  window.addEventListener('resize', resize);
  resize();
  setInterval(drawRain, RAIN_INTERVAL);
}


// ── Typewriter ────────────────────────────────────────────────────────────────
const NAME = 'DANIEL BARUTOV';
const TYPE_DELAY = 100;       // ms per character
const TYPE_START_DELAY = 400; // ms before typing starts

const typedEl = document.getElementById('typed-name');
let charIndex = 0;

function typeWriter() {
  if (charIndex < NAME.length) {
    typedEl.textContent = NAME.slice(0, charIndex + 1);
    charIndex++;
    setTimeout(typeWriter, TYPE_DELAY);
  }
}

if (typedEl) {
  setTimeout(typeWriter, TYPE_START_DELAY);
}
