// Savvly — main.js

// ── Mobile Nav Toggle ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}

// ── Copy HR Email ─────────────────────────────────
const copyBtn = document.getElementById('copy-email-btn');

const HR_EMAIL = `Subject: I'd like to add a longevity benefit

Hi [HR/Benefits contact],

I recently came across Savvly, a longevity benefit that helps employees protect against the risk of outliving their savings. It takes less than a week to set up and requires no discrimination testing.

I'd love to see if it's something [Company] could offer. You can learn more at savvly.com.

Thank you!`;

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(HR_EMAIL).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'COPIED ✓';
      copyBtn.classList.add('opacity-70');
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.classList.remove('opacity-70');
      }, 2200);
    }).catch(() => {
      // Fallback for browsers without clipboard API
      const ta = document.createElement('textarea');
      ta.value = HR_EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  });
}

// ── Scroll-triggered fade-ups ─────────────────────
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scroll-fade').forEach(el => {
    el.style.animationPlayState = 'paused';
    el.classList.add('fade-up');
    observer.observe(el);
  });
}
