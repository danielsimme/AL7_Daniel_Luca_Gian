// === Burger Menü Toggle ===
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });
}

// === Produktsuche (Sortiment Seite) ===
const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    productCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = title.includes(value) ? 'block' : 'none';
    });
  });
}

// === Bonus: Slider Autoplay (Startseite) ===
const slider = document.querySelector('.slider');
if (slider) {
  let scrollAmount = 0;
  setInterval(() => {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
    scrollAmount += 300;
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 3000);
}
