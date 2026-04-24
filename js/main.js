// INTRO OVERLAY
const introOverlay = document.getElementById('introOverlay');
const introLogo = document.getElementById('introLogo');

document.body.style.overflow = 'hidden';

setTimeout(() => { introLogo.classList.add('fade-out'); }, 1400);
setTimeout(() => {
  introOverlay.classList.add('slide-up');
  document.body.style.overflow = '';
  startTypewriter();
}, 2000);

// COLORIZE — global scope
function colorize(raw) {
  if (!raw) return '';
  // escape HTML first
  const text = raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // comment lines — whole line gray
  if (text.trimStart().startsWith('//')) {
    return `<span class="c-gray">${text}</span>`;
  }
  // string literals
  let result = text.replace(/"([^"]*)"/g, '<span class="c-green">"$1"</span>');
  // keywords
  result = result.replace(/\b(const|return|await)\b/g, '<span class="c-purple">$1</span>');
  // booleans and functions
  result = result.replace(/\b(true|false|imagine|build|deploy|console|log)\b/g, '<span class="c-green">$1</span>');
  // property keys before colon
  result = result.replace(/\b(vision|product|modern|innovative|sustainable)\b/g, '<span class="c-orange">$1</span>');
  return result;
}

// TYPEWRITER
function startTypewriter() {
  const lines = [
    { text: '// atay.h — since: 2020', delay: 0 },
    { text: '// Merhaba!', delay: 400 },
    { text: '', delay: 700 },
    { text: 'const vision = await imagine();', delay: 900 },
    { text: '', delay: 1300 },
    { text: 'const product = await build({', delay: 1400 },
    { text: '  modern:      true,', delay: 1800 },
    { text: '  innovative:  true,', delay: 2100 },
    { text: '  sustainable: true,', delay: 2400 },
    { text: '});', delay: 2700 },
    { text: '', delay: 2900 },
    { text: 'console.log("The best is yet to come.");', delay: 3000 },
    { text: '// ✓ shipped with purpose.', delay: 3600, isLast: true },
  ];

  const codeBody = document.querySelector('.code-body');
  if (!codeBody) return;
  codeBody.innerHTML = '';

  lines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'code-line';
      if (!line.text) { codeBody.appendChild(div); return; }

      const plain = line.text;
      let i = 0;
      codeBody.appendChild(div);

      const timer = setInterval(() => {
        i++;
        const partial = plain.slice(0, i);
        div.innerHTML = colorize(partial);
        if (i >= plain.length) {
          clearInterval(timer);
          if (line.isLast) {
            div.innerHTML = colorize(plain) + '<span class="cursor-blink">|</span>';
          }
        }
      }, 36);
    }, line.delay);
  });
}

// CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .service-card, .why-card, .product-block').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.querySelectorAll('span')[0].style.transform = menuOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
  hamburger.querySelectorAll('span')[1].style.transform = menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
});

document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span')[0].style.transform = '';
    hamburger.querySelectorAll('span')[1].style.transform = '';
  });
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// FORM SUBMIT
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Gönderildi ✓';
    btn.style.opacity = '0.6';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Gönder →';
      btn.style.opacity = '1';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});