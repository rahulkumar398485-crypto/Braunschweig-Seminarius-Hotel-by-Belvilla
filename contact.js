document.addEventListener('DOMContentLoaded', () => {

  // ===== Form Submission (SAFE) =====
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('formModal');
  const closeModal = document.querySelector('.modal-close');

  if (form && modal && closeModal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // remove if using real backend
      modal.classList.add('active');
      form.reset();
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // ===== Collapsible Panels =====
  const collapsibleToggles = document.querySelectorAll('.collapsible-toggle');

  collapsibleToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isActive = toggle.classList.contains('active');

      // Close all
      collapsibleToggles.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');

        if (t.nextElementSibling) {
          t.nextElementSibling.classList.remove('active');
        }
      });

      // Open clicked
      if (!isActive) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');

        if (content) {
          content.classList.add('active');
        }
      }
    });
  });

  // ===== Optional: external scripts safeguard =====
  if (typeof initMagazineCarousels === 'function') {
    initMagazineCarousels();
  }

});