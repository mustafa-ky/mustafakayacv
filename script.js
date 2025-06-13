document.addEventListener("DOMContentLoaded", () => {
  // === Tema geçişi ===
  const themeToggle = document.getElementById("theme-toggle");

  function applySavedTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark-mode");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
  }

  applySavedTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // === Görsel Lightbox ===
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const images = document.querySelectorAll(".gallery img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const allImages = Array.from(images);

  function showImage(index) {
    currentIndex = (index + allImages.length) % allImages.length;
    const image = allImages[currentIndex];
    lightboxImg.src = image.src;
    const captionText = image.getAttribute("data-caption") || image.alt || "";
    caption.textContent = captionText;
  }

  if (images.length && lightbox) {
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentIndex = index;
        showImage(currentIndex);
        lightbox.classList.add("active");
        lightbox.style.display = "flex";
      });
    });

    document.querySelector(".close")?.addEventListener("click", () => {
      lightbox.classList.remove("active");
      lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        lightbox.style.display = "none";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;

      switch (e.key) {
        case "ArrowLeft":
          showImage(currentIndex - 1);
          break;
        case "ArrowRight":
          showImage(currentIndex + 1);
          break;
        case "Escape":
          lightbox.classList.remove("active");
          lightbox.style.display = "none";
          break;
      }
    });

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
      nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
    }

    // === Swipe geçişi (Hammer.js yüklüyse)
    if (typeof Hammer !== "undefined") {
      const hammer = new Hammer(lightbox);
      hammer.on("swipeleft", () => showImage(currentIndex + 1));
      hammer.on("swiperight", () => showImage(currentIndex - 1));
    }
  }

  // === Galeri filtreleme ===
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryImages = document.querySelectorAll(".gallery img");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryImages.forEach((img) => {
        const category = img.getAttribute("data-category");
        const show = filterValue === "all" || filterValue === category;
        img.style.display = show ? "block" : "none";
      });
    });
  });

  // === PDF Lightbox ===
  const pdfItems = document.querySelectorAll(".cv-item");
  const pdfLightbox = document.getElementById("pdf-lightbox");
  const pdfFrame = document.getElementById("pdf-frame");
  const pdfDownload = document.getElementById("pdf-download");
  const pdfClose = document.querySelector(".pdf-close");

  if (pdfItems.length && pdfLightbox && pdfFrame && pdfDownload && pdfClose) {
    pdfItems.forEach((item) => {
      item.addEventListener("click", () => {
        const pdfSrc = item.getAttribute("data-pdf");
        pdfFrame.src = pdfSrc;
        pdfDownload.href = pdfSrc;
        pdfDownload.download = pdfSrc.split("/").pop();
        pdfLightbox.classList.add("active");
      });
    });

    pdfClose.addEventListener("click", () => {
      pdfLightbox.classList.remove("active");
      pdfFrame.src = "";
    });
  }
});
