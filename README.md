# Tridea — Software Studio Landing Page

Landing page for Tridea, a software studio operating under [EduXperts Eğitim Danışmanlık ve Yazılım A.Ş.](https://eduxperts.com.tr) that builds web, mobile, and AI software.

**Live products:**
- [TwinTarım](https://www.twintarim.space) — satellite-data-driven agricultural decision support platform

## About

A single-page, fully **static** site. No framework, build tooling, or backend dependency — the files can be opened directly in a browser or served from any static file host.

### Sections
- **Hero** — typewriter-animated code window
- **Services** (`#hizmetler`) — sticky-scroll card list (web, mobile, AI/backend, enterprise SaaS)
- **Products** (`#urunler`) — TwinTarım portfolio grid
- **TrideaBot** (`#sorular`) — demo chatbot UI with predefined answers
- **Process** (`#nasil`) — pipeline visualization
- **Why Us** (`#neden`) — dark bento grid cards
- **Contact** (`#iletisim`) — contact form

### Features
- TR/EN language toggle (via `data-i18n` attributes)
- Scroll-triggered reveal animations (`IntersectionObserver`)
- Custom cursor, marquee strip, responsive mobile menu
- No external libraries/CDNs besides Google Fonts

## Screenshots

| Hero | TrideaBot |
|---|---|
| ![Hero section](assets/screenshots/hero.jpg) | ![TrideaBot section](assets/screenshots/tridea-bot.jpg) |

![Pipeline section](assets/screenshots/pipeline.jpg)

## Tech Stack

| Layer | Used |
|---|---|
| HTML | Single file, plain HTML5 |
| CSS | `css/style.css` — custom-property-based hand-written CSS, no framework |
| JS | `js/main.js` — plain vanilla JavaScript, no library/framework |
| Fonts | Google Fonts: Cabinet Grotesk, Instrument Sans, JetBrains Mono |

## Project Structure

```
tridea/
├── index.html          All page content and sections
├── css/
│   └── style.css        All styles (design system, animations, responsive)
├── js/
│   └── main.js           i18n, animations, sticky-scroll, TrideaBot, form
└── assets/
    ├── images/            Product mockup/background images
    └── screenshots/        README preview screenshots
```

## Running Locally

No build step required. Any static server works:

```bash
# Simple option
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Developer

Tridea is a site built to showcase projects developed together by three university friends. The website itself (HTML/CSS/JS) was built entirely by Esranil Doğan.

## License

Not specified.
