/**
 * SERRALHERIA FILADÉLFIA
 * Configuração principal
 *
 * Troque somente o número abaixo:
 * - Use DDI + DDD + número, apenas dígitos.
 * - Exemplo: 5562999999999
 */
const WHATSAPP_NUMBER = "5562999999999";

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Serralheria Filadélfia e gostaria de solicitar um orçamento.";

function buildWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

// Aplica o mesmo link de WhatsApp em todos os botões do site.
document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = buildWhatsAppUrl();
});

// Ano automático no rodapé.
const yearElement = document.querySelector("#currentYear");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Cabeçalho com fundo ao rolar a página.
const header = document.querySelector(".header");

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Menu mobile.
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

function closeMenu() {
  menu?.classList.remove("open");
  menuToggle?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("open");
  menuToggle.classList.toggle("active", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("menu-open", Boolean(isOpen));
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Fecha o menu com ESC.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

// Animações leves de entrada.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// -------------------------------------------------------------------------------------------------
// Carrossel responsivo de fotos e vídeos
// -------------------------------------------------------------------------------------------------
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const slides = Array.from(carousel.querySelectorAll(".carousel-card"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const currentLabel = carousel.querySelector("[data-carousel-current]");
  const totalLabel = carousel.querySelector("[data-carousel-total]");
  const videos = Array.from(carousel.querySelectorAll("video"));

  if (!viewport || slides.length === 0) return;

  if (totalLabel) {
    totalLabel.textContent = String(slides.length).padStart(2, "0");
  }

  let currentIndex = 0;
  let scrollTimer;

  const getClosestIndex = () => {
    const left = viewport.scrollLeft;
    let closest = 0;
    let smallestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - left);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closest = index;
      }
    });

    return closest;
  };

  const updateControls = () => {
    currentIndex = getClosestIndex();
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const atStart = viewport.scrollLeft <= 4;
    const atEnd = viewport.scrollLeft >= maxScroll - 4;

    if (currentLabel) {
      currentLabel.textContent = String(currentIndex + 1).padStart(2, "0");
    }

    if (prevButton) prevButton.disabled = atStart;
    if (nextButton) nextButton.disabled = atEnd;
  };

  const goTo = (index) => {
    const safeIndex = Math.min(Math.max(index, 0), slides.length - 1);
    viewport.scrollTo({
      left: slides[safeIndex].offsetLeft,
      behavior: "smooth",
    });
  };

  prevButton?.addEventListener("click", () => {
    goTo(Math.max(0, getClosestIndex() - 1));
  });

  nextButton?.addEventListener("click", () => {
    goTo(Math.min(slides.length - 1, getClosestIndex() + 1));
  });

  viewport.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(updateControls, 80);
    },
    { passive: true }
  );

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(Math.max(0, getClosestIndex() - 1));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(Math.min(slides.length - 1, getClosestIndex() + 1));
    }
  });

  videos.forEach((video) => {
    video.addEventListener("play", () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });

  window.addEventListener("resize", updateControls, { passive: true });
  updateControls();
});


// -------------------------------------------------------------------------------------------------
// Ampliação das fotos do carrossel
// -------------------------------------------------------------------------------------------------
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCloseElements = document.querySelectorAll("[data-lightbox-close]");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

let lastLightboxTrigger = null;

function openLightbox(image) {
  if (!lightbox || !lightboxImage || !image) return;

  lastLightboxTrigger = image;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Projeto da Serralheria Filadélfia";

  const card = image.closest(".carousel-card");
  const category = card?.querySelector(".carousel-caption > span")?.textContent?.trim();
  const title = card?.querySelector(".carousel-caption h3")?.textContent?.trim();

  if (lightboxCaption) {
    lightboxCaption.textContent = [category, title].filter(Boolean).join(" — ");
  }

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightbox.querySelector(".image-lightbox-close")?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");

  if (lightboxImage) {
    lightboxImage.removeAttribute("src");
  }

  lastLightboxTrigger?.focus();
}

lightboxTriggers.forEach((image) => {
  image.addEventListener("click", () => openLightbox(image));

  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightboxCloseElements.forEach((element) => {
  element.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});
