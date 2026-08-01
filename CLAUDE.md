# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website showcasing professional experience, education, and qualifications. The site is vanilla HTML5, CSS3, and JavaScript with no build tools or package managers. It's deployed via GitHub Pages to a custom domain (amanshorey.com).

## Development

**Local Testing:**
Since this is a static site, open any HTML file directly in a browser or use a local HTTP server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**No build step required.** All changes are immediately live upon file save.

## Architecture

### Pages
- `index.html` — Landing page with hero section and contact information
- `experience.html` — Professional timeline with role descriptions and company links
- `education.html` — Educational background and qualifications in card layout

All pages share:
- Single `style.css` for styling
- Single `script.js` for interactive features (custom cursor, background particles)
- Consistent navigation bar across all pages
- Dark-themed, premium UI with smooth transitions

### Key Systems

**Custom Cursor (`script.js`, `initCustomCursor`)**
- Replaces default cursor with a dot-and-ring system
- Ring follows mouse with 15% lerp smoothing for trailing effect
- Detects hover on clickable elements (links, buttons, timeline items, education cards)
- Color-aware: cursor changes color based on context:
  - `.experience-blue` → blue cursor
  - `.experience-gold` → gold cursor
  - `.experience-pink` → pink cursor
  - `.experience-red` → red cursor
  - `.edu-card` → blue cursor
- Active/click state adds visual feedback
- Respects `prefers-reduced-motion` preference (disables cursor if set)

**Particle Background (`script.js`, `createParticles`)**
- Creates comet-style particles that drift across the screen
- Starts with 25 particles, spawns 1 new particle every 800ms
- Each particle:
  - Random starting position anywhere on viewport
  - Drifts 15-25 seconds across screen
  - Uses CSS animation for performance
  - Cleaned up after animation completes
- Respects `prefers-reduced-motion` preference (skips if enabled)

### CSS Structure

**Color Variables** (`style.css`, `:root`)
- `--primary-color: #3b82f6` (blue)
- `--primary-hover: #2563eb` (darker blue for hover)
- `--text-dark: #f8fafc` (main text, white-ish)
- `--text-light: #cbd5e1` (secondary text, light gray)
- `--bg-body: #0f172a` (dark slate background)
- `--bg-card: rgba(15, 23, 42, 0.7)` (semi-transparent card background)

**Dark Theme with Layered Background:**
- `body::before` — animated background image layer (background.png) with zoom/drift animation
- `body::after` — dark gradient overlay to ensure text readability
- Results in a premium, subtle dark aesthetic with animated parallax effect

**Responsive Design:**
- Container max-width: 1100px
- Mobile-first approach with media queries
- Uses CSS Grid for education cards, Flexbox for navigation

### Adding New Content

**New Experience Entry:**
1. Add a new `<div class="timeline-item experience-[color]">` to `experience.html`
2. Use color classes: `experience-blue`, `experience-gold`, `experience-pink`, `experience-red`
3. Follow existing structure:
   - `timeline-date` span
   - `timeline-role` h3
   - `timeline-company` p
   - `timeline-desc` p (description)
   - Optional: company logo image
4. Cursor will automatically adopt the color based on class

**New Education Entry:**
1. Add a new `<div class="edu-card">` to `education.html`
2. Include institution logo image with `edu-crest` class
3. Link structure: h3 for degree, p for institution, p for dates
4. Cursor defaults to blue for all education cards

## Deployment

Site auto-deploys from the `main` branch via GitHub Pages.
- DNS configured at Blacknight (CNAME: amanshorey.com)
- GitHub Pages settings point to main branch
- No build step — static assets served directly

## Performance Notes

- Particle system respects `prefers-reduced-motion` for accessibility
- Custom cursor uses `requestAnimationFrame` for smooth 60fps animation
- Background animation uses CSS keyframes (GPU-accelerated)
- Font from system stack (no external font downloads)
- Icons from Font Awesome CDN

## Browser Compatibility

Targets modern browsers:
- CSS Grid, Flexbox, CSS variables all supported
- `requestAnimationFrame`, ES6+ JavaScript features
- CSS animations and transforms
