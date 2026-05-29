document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ROOM DETAILS MODAL
  =============================== */

  const modal = document.getElementById("roomModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const roomDetails = {
    standard: {
      titleKey: "hotel_standard_title",
      detailsKey: "hotel_standard_modal",
      title: "Standard Room",
      details:
        "Comfortable room with double or twin beds, TV, desk, coffee and tea station plus a bathroom with shower or bathtub."
    },

    comfort: {
      titleKey: "hotel_comfort_title",
      detailsKey: "hotel_comfort_modal",
      title: "Comfort Room",
      details:
        "Modern room with stylish furnishings, relaxing atmosphere and enhanced comfort for business and leisure travelers."
    },

    studio: {
      titleKey: "hotel_studio_title",
      detailsKey: "hotel_studio_modal",
      title: "Studio Room",
      details:
        "Spacious two-level studio with living area, walk-in closet, twin beds, workspace and modern bathroom."
    },

    single: {
      titleKey: "hotel_single_title",
      detailsKey: "hotel_single_modal",
      title: "Superior Single Room",
      details:
        "Perfect for solo travelers with cozy single bed, free Wi-Fi, TV, coffee station and functional workspace."
    }
  };

  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", () => {

      const key = button.dataset.room;
      const room = roomDetails[key];

      if (!room) return;

      modalTitle.textContent = t(room.titleKey, room.title);
      modalDetails.textContent = t(room.detailsKey, room.details);

      modal.classList.add("active");
    });
  });

  /* CLOSE MODAL */
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  /* ===============================
     ANIMATION
  =============================== */

  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length > 0) {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  /* ===============================
     FILTER SYSTEM
  =============================== */

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".room-card");

  filters.forEach(btn => {

    btn.addEventListener("click", () => {

      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {

        const type = card.dataset.type;

        if (filter === "all" || filter === type) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }

      });
    });

  });

});