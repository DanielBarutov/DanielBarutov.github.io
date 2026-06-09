# Portfolio Design — Daniel Barutov

## Overview

Single-page portfolio website with Matrix/Terminal Green aesthetic. Minimalist Hero-only layout for now; additional sections (Skills, Projects) to be added later.

## Visual Style

- Background: `#000000` (pure black)
- Accent color: `#00ff41` (Matrix green)
- Font: monospace (e.g. `'Courier New'`, or system monospace stack)
- Text effects: `text-shadow` glow on headings and interactive elements
- Background animation: Matrix Rain — falling columns of Japanese katakana characters and binary digits at ~30% opacity via Canvas

## Layout

One-page scroll. Currently only one section: Hero (full-viewport).

## Hero Section

Full viewport height. Content centered vertically and horizontally (or slightly above center).

### Content

```
> DANIEL BARUTOV
  Backend Developer / Microservices

  Building scalable distributed systems
  and microservice architectures.

  [ GitHub ]  [ Telegram ]  [ Email ]
```

### Interactions

- **Name**: typewriter animation on page load (characters appear one by one)
- **Subtitle**: blinking cursor `_` at end, terminal style
- **Buttons**: styled as `[ LABEL ]`, hover state glows brighter green

### Links

| Button | Target |
|--------|--------|
| GitHub | https://github.com/DanielBarutov |
| Telegram | user's Telegram (placeholder until provided) |
| Email | mailto:barutovdg@gmail.com |

## Animation — Matrix Rain

- HTML5 Canvas, full-screen, positioned fixed behind content
- Characters: Japanese katakana (`ア`–`ン` range) + binary digits (`0`, `1`)
- Columns of falling characters, each column at random speed
- Opacity: ~30% so it doesn't overpower the foreground text
- Color: `#00ff41`
- Leading character of each column slightly brighter (classic Matrix look)

## Technical Constraints

- Pure HTML / CSS / JS — no frameworks, no build tools
- Single `index.html` entry point
- `styles.css` for all styling
- `script.js` for Matrix Rain canvas + typewriter effect
- Must work as a static GitHub Pages site
