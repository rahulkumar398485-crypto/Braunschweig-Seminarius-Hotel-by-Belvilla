document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("attractionModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const attractionDetails = {
    cathedral: {
      titleKey: "ta_cathedral_title",
      detailsKey: "ta_cathedral_modal",
      title: "Braunschweig Cathedral",
      details:
        "Braunschweig Cathedral is one of the city's most important historical landmarks and a masterpiece of Romanesque architecture.",
    },

    castle: {
      titleKey: "ta_castle_title",
      detailsKey: "ta_castle_modal",
      title: "Dankwarderode Castle",
      details:
        "Dankwarderode Castle offers visitors a glimpse into medieval history and the heritage of Braunschweig.",
    },

    autostadt: {
      titleKey: "ta_autostadt_title",
      detailsKey: "ta_autostadt_modal",
      title: "Autostadt Wolfsburg",
      details:
        "Autostadt Wolfsburg combines automotive innovation, exhibitions, museums and entertainment experiences for all ages.",
    },

    riddagshausen: {
      titleKey: "ta_riddagshausen_title",
      detailsKey: "ta_riddagshausen_modal",
      title: "Riddagshausen Nature Area",
      details:
        "Riddagshausen is a peaceful nature reserve with scenic walking trails, lakes and relaxing green landscapes.",
    },

    burgerpark: {
      titleKey: "ta_burgerpark_title",
      detailsKey: "ta_burgerpark_modal",
      title: "Bürgerpark",
      details:
        "Bürgerpark is one of Braunschweig’s most popular parks, ideal for jogging, cycling and enjoying nature.",
    },
  };

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.attraction;
      const item = attractionDetails[key];

      if (!item) return;

      modalTitle.textContent = t(item.titleKey, item.title);
      modalDetails.textContent = t(item.detailsKey, item.details);

      modal.classList.add("active");
    });
  });

  closeModal.onclick = () => modal.classList.remove("active");

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  };
});