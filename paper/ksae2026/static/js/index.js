// Scroll animations
AOS.init({ duration: 700, once: true, offset: 80 });

// BibTeX copy
function copyBibtex() {
  const text = document.getElementById('bibtex-block').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const label = document.getElementById('copy-label');
    const prev = label.innerText;
    label.innerText = 'Copied!';
    setTimeout(() => { label.innerText = prev; }, 1500);
  });
}

// Count-up on visible
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0');
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.innerText = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach((c) => observer.observe(c));
