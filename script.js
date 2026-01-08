// Full-screen slider controller
const slidesWrap = document.getElementById('slidesFull');
const total = slidesWrap ? slidesWrap.children.length : 0;
const prevBtn = document.getElementById('prevFull');
const nextBtn = document.getElementById('nextFull');
const dotsWrap = document.getElementById('dotsFull');

let index = 0;

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  }
}

function setActive(i) {
  index = Math.max(0, Math.min(i, total - 1));
  if (slidesWrap) slidesWrap.style.transform = `translateX(-${index * 100}%)`;
  if (dotsWrap) {
    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach((d, j) => d.setAttribute('aria-selected', j === index ? 'true' : 'false'));
  }
}

function go(i) { setActive(i); }
function next() { setActive(index + 1); }
function prev() { setActive(index - 1); }

function initEvents() {
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Touch/swipe
  let startX = 0, dx = 0;
  slidesWrap.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slidesWrap.addEventListener('touchmove', (e) => { dx = e.touches[0].clientX - startX; }, { passive: true });
  slidesWrap.addEventListener('touchend', () => {
    if (dx > 50) prev();
    else if (dx < -50) next();
    dx = 0;
  });
}

// Init
buildDots();
setActive(0);
initEvents();
