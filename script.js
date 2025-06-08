const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const images = document.querySelectorAll('.gallery img');


images.forEach(image => {
  image.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = image.src;
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

closeBtn.addEventListener('click', () => {
  closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  switch (e.key) {
    case 'ArrowLeft':
      showImage(currentIndex - 1);
      break;
    case 'ArrowRight':
      showImage(currentIndex + 1);
      break;
    case 'Escape':
      closeLightbox(); // burada class+style birlikte kaldırılır
      break;
  }
});

// Filtreleme işlemi
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryImages = document.querySelectorAll('.gallery img');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Aktif butonu güncelle
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    galleryImages.forEach(img => {
      const category = img.getAttribute('data-category');
      if (filterValue === 'all' || filterValue === category) {
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    });
  });
});

// === Tema Değiştirici ===
const themeToggle = document.getElementById('theme-toggle');

// Sayfa yüklendiğinde tema kontrolü
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

// Tema butonuna tıklanırsa değiştir
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Simge güncelle
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

let currentIndex = 0;
const allImages = Array.from(images);

// Lightbox’ta gösterilecek görseli güncelle
function showImage(index) {
  currentIndex = (index + allImages.length) % allImages.length;
  const image = allImages[currentIndex];
  lightboxImg.src = image.src;

  const captionText = image.getAttribute('data-caption') || image.alt || '';
  document.getElementById('lightbox-caption').textContent = captionText;
}

// Ok butonları
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

prevBtn.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  showImage(currentIndex + 1);
});

// Görsele tıklanınca lightbox’ı aç ve index’i ayarla
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('active');
  });
});
