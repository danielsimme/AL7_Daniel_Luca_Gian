const iconPaths = [
  'images/icon/002-dummy.svg',
  'images/icon/003-shoes.svg',
  'images/icon/007-fist.svg',
  'images/icon/012-fight.svg',
  'images/icon/016-boxer.svg',
  'images/icon/022-boxing.svg',
  'images/icon/026-protector.svg',
  'images/icon/032-boxing-gloves.svg',
  'images/icon/033-kettlebell.svg',
];

const iconLayer = document.querySelector('.icon-layer');

if (iconLayer) {
  for (let i = 0; i < 30; i++) {
    const icon = document.createElement('img');
    icon.src = iconPaths[i % iconPaths.length];
    icon.classList.add('floating-icon');
    icon.style.left = Math.random() * 100 + 'vw';
    icon.style.top = Math.random() * 100 + 'vh';
    icon.style.width = (30 + Math.random() * 30) + 'px';
    icon.style.opacity = 0.06 + Math.random() * 0.06;
    icon.dataset.speed = (0.1 + Math.random() * 0.3).toFixed(2);
    iconLayer.appendChild(icon);
  }

  // Parallax scroll effect
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.floating-icon').forEach((icon) => {
      const speed = parseFloat(icon.dataset.speed);
      icon.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}
