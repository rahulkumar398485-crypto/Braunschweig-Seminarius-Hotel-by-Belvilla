document.addEventListener("DOMContentLoaded", () => {
  const SLIDE_INTERVAL = 6000;
  const DEBOUNCE_DELAY = 200;

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const initPreloader = () => {
    if (sessionStorage.getItem("preloaderShown") !== "true") {
      const preloader = document.querySelector(".preloader");
      if (preloader) {
        document.body.classList.add("preloading");
        document
          .querySelectorAll(".site-header, .hero-slider, section, footer")
          .forEach((el) => {
            el.style.display = "none";
          });

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(interval);
            preloader.style.opacity = "0";
            setTimeout(() => {
              preloader.style.display = "none";
              document.body.classList.remove("preloading");
              document
                .querySelectorAll(".site-header, .hero-slider, section, footer")
                .forEach((el) => {
                  el.style.display = "";
                });
              sessionStorage.setItem("preloaderShown", "true");
            }, 300);
          }
        }, 50);
      }
    } else {
      const preloader = document.querySelector(".preloader");
      if (preloader) preloader.style.display = "none";
      document.body.classList.remove("preloading");
      document
        .querySelectorAll(".site-header, .hero-slider, section, footer")
        .forEach((el) => {
          el.style.display = "";
        });
    }
  };

  const preloadImages = (slides) => {
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (img) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
        preloadImg.onerror = () => {
          img.src = "images/fallback.jpg";
        };
      }
    });
  };

  const initHeroSlider = () => {
    const slider = document.querySelector(".hero-slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    const prevButton = slider.querySelector(".prev-slide");
    const nextButton = slider.querySelector(".next-slide");

    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    preloadImages(slides);

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      currentSlide = index;
    };

    const nextSlide = () => {
      showSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    };

    const stopSlideShow = () => {
      clearInterval(slideInterval);
    };

    if (prevButton) {
      prevButton.addEventListener(
        "click",
        debounce(() => {
          stopSlideShow();
          prevSlide();
          startSlideShow();
        }, DEBOUNCE_DELAY)
      );
    }

    if (nextButton) {
      nextButton.addEventListener(
        "click",
        debounce(() => {
          stopSlideShow();
          nextSlide();
          startSlideShow();
        }, DEBOUNCE_DELAY)
      );
    }

    showSlide(0);
    startSlideShow();

    slider.addEventListener("mouseenter", stopSlideShow);
    slider.addEventListener("mouseleave", startSlideShow);
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".nav-container");
    const dropdowns = document.querySelectorAll(".has-dropdown");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector("a");
      if (link) {
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle("active");
            const submenu = dropdown.querySelector(".dropdown-menu");
            if (submenu) {
              submenu.style.display = dropdown.classList.contains("active")
                ? "flex"
                : "none";
            }
          }
        });
      }
    });
  };

  const initHeaderScroll = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  };

  const initNewsletterForm = () => {
    const form = document.querySelector(".newsletter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      const email = form.querySelector('input[type="email"]').value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
      }
    });
  };

  const initImageModal = () => {
    const images = document.querySelectorAll(
      ".highlight-card img, .thing-card img"
    );

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <img src="" alt="Modal Image">
        <p></p>
        <button>Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    const modalImg = modal.querySelector("img");
    const modalText = modal.querySelector("p");
    const closeButton = modal.querySelector("button");

    images.forEach((img) => {
      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalText.textContent = img.alt;
        modal.classList.add("active");
        document.body.classList.add("no-scroll");
      });
    });

    closeButton.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  };

  initPreloader();
  initHeroSlider();
  initMobileMenu();
  initHeaderScroll();
  initNewsletterForm();
  initImageModal();
});
document.body.classList.add("no-scroll");
setTimeout(() => {
  if (!document.body.classList.contains("preloading")) {
    document.body.classList.remove("no-scroll");
  }
}, 1000);

let currentLang = localStorage.getItem("lang") || "de";

async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const translations = await response.json();

  // ✅ ADD THESE 3 LINES (DO NOT REMOVE ANYTHING ELSE)
  window.translations = window.translations || {};
  window.translations[lang] = translations;
  window.currentLang = lang;

  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  localStorage.setItem("lang", lang);

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.textContent = lang === "en" ? "DE" : "EN";
  }

  document.querySelectorAll("[data-key-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-key-placeholder");
    if (translations[key]) {
      el.placeholder = translations[key];
    }
  });

  // Update placeholder
  document.querySelectorAll("[data-key-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-key-placeholder");
    if (translations[key]) {
      el.placeholder = translations[key];
    }
  });

  // Update alt text
  document.querySelectorAll("[data-key-alt]").forEach((el) => {
    const key = el.getAttribute("data-key-alt");
    if (translations[key]) {
      el.alt = translations[key];
    }
  });

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations["meta_description"]) {
    metaDesc.setAttribute("content", translations["meta_description"]);
  }

  // Update title
  if (translations["page_title"]) {
    document.title = translations["page_title"];
  }

  //  FIX: ensure slider content also updates
  document.querySelectorAll(".slide [data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

// Load on start
loadLanguage(currentLang);

// Toggle button
document.getElementById("langToggle")?.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "de" : "en";
  loadLanguage(currentLang);
});
