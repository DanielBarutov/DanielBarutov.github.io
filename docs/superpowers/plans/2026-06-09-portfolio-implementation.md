# Portfolio — Matrix Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a full-viewport Hero page with Matrix Rain canvas background, typewriter name animation, and terminal-style links to GitHub, Telegram, and Email.

**Architecture:** Three files are fully replaced — `index.html` (structure), `styles.css` (all visual styles), `script.js` (Matrix Rain canvas + typewriter). No frameworks, no build step. Ships as a static GitHub Pages site.

**Tech Stack:** HTML5, CSS3, Vanilla JS, HTML5 Canvas API

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `index.html` | Full rewrite | Page structure: canvas, hero content, links |
| `styles.css` | Full rewrite | Matrix color theme, layout, glow effects, button styles, blink animation |
| `script.js` | Full rewrite | Matrix Rain canvas loop + typewriter effect |

---

### Task 1: Replace index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the entire file content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daniel Barutov</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <canvas id="matrix-canvas"></canvas>

  <main class="hero">
    <div class="hero-content">
      <p class="prompt">&gt; <span id="typed-name"></span><span class="cursor">_</span></p>
      <p class="subtitle">Backend Developer / Microservices</p>
      <p class="bio">Building scalable distributed systems<br>and microservice architectures.</p>
      <div class="links">
        <a class="btn" href="https://github.com/DanielBarutov" target="_blank" rel="noopener">[ GitHub ]</a>
        <a class="btn" href="https://t.me/YOUR_TG_USERNAME" target="_blank" rel="noopener">[ Telegram ]</a>
        <a class="btn" href="mailto:barutovdg@gmail.com">[ Email ]</a>
      </div>
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

> Note: Replace `YOUR_TG_USERNAME` with actual Telegram username before deploy.

- [ ] **Step 2: Open index.html in a browser and verify structure loads without errors**

Expected: page renders, no 404s in DevTools Network tab, canvas element present in DOM.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace index.html with matrix hero structure"
```

---

### Task 2: Replace styles.css

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Replace the entire file content**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #000;
  color: #00ff41;
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  overflow: hidden;
}

/* Matrix Rain canvas — fixed full-screen behind everything */
#matrix-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.30;
}

/* Hero layout — centered in viewport */
.hero {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.hero-content {
  text-align: left;
  padding: 2rem;
}

/* > DANIEL BARUTOV line */
.prompt {
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  font-weight: bold;
  text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

/* Blinking cursor */
.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.subtitle {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: #00cc33;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 6px #00cc33;
}

.bio {
  font-size: clamp(0.85rem, 2vw, 1rem);
  color: #009922;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

/* Terminal-style buttons */
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  color: #00ff41;
  text-decoration: none;
  font-size: clamp(0.85rem, 2vw, 1rem);
  border: 1px solid #00ff41;
  padding: 0.4rem 1rem;
  letter-spacing: 0.08em;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}

.btn:hover {
  background: #00ff41;
  color: #000;
  box-shadow: 0 0 14px #00ff41, 0 0 28px #00ff41;
}

@media (max-width: 480px) {
  .links {
    flex-direction: column;
  }
}
```

- [ ] **Step 2: Hard-reload the browser (Ctrl+Shift+R) and verify**

Expected:
- Black background
- Text is green (`#00ff41`) with visible glow
- Canvas element visible in background (even without JS running)
- Buttons styled as `[ GitHub ]` etc. with border

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: matrix terminal styles — green glow, canvas backdrop, btn styles"
```

---

### Task 3: Replace script.js — Matrix Rain

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Replace the entire file content**

```js
// ── Matrix Rain ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const CHARS = (KATAKANA + '01').split('');

const FONT_SIZE = 16;
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

window.addEventListener('resize', resize);
resize();
setInterval(drawRain, 50); // ~20 fps keeps it readable


// ── Typewriter ────────────────────────────────────────────────────────────────
const NAME = 'DANIEL BARUTOV';
const typedEl = document.getElementById('typed-name');
let charIndex = 0;

function typeWriter() {
  if (charIndex < NAME.length) {
    typedEl.textContent += NAME[charIndex];
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

// slight delay before typing starts
setTimeout(typeWriter, 400);
```

- [ ] **Step 2: Hard-reload and verify Matrix Rain**

Expected:
- Falling green characters visible in background
- Animation runs continuously
- Characters are katakana + `0`/`1`
- Leading character appears slightly brighter
- Canvas resizes correctly when you resize the browser window

- [ ] **Step 3: Verify typewriter animation**

Expected:
- After ~400ms, `DANIEL BARUTOV` types out character by character
- Cursor `_` blinks throughout
- After name is fully typed, cursor continues blinking

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "feat: matrix rain canvas + typewriter name animation"
```

---

### Task 4: Final Polish & Deploy Check

**Files:**
- Modify: `index.html` (Telegram username)

- [ ] **Step 1: Replace Telegram placeholder with real username**

In `index.html`, find:
```html
<a class="btn" href="https://t.me/YOUR_TG_USERNAME" target="_blank" rel="noopener">[ Telegram ]</a>
```
Replace `YOUR_TG_USERNAME` with the actual username.

- [ ] **Step 2: Full visual check in browser**

Open `index.html` locally. Verify:
- [ ] Matrix Rain runs in background at low opacity
- [ ] `> DANIEL BARUTOV` types out on load
- [ ] Cursor blinks after name is complete
- [ ] Subtitle and bio text visible, dimmer than heading
- [ ] All three buttons present: `[ GitHub ]`, `[ Telegram ]`, `[ Email ]`
- [ ] Hover on buttons → green fill + glow
- [ ] GitHub link opens correct profile in new tab
- [ ] Email link opens mail client

- [ ] **Step 3: Commit and push**

```bash
git add index.html
git commit -m "fix: add telegram username to hero links"
git push origin main
```

Expected: GitHub Pages rebuilds and site is live at `https://danielbarutov.github.io`.
