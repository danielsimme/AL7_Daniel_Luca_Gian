// Burger-Menü und Navigationselement selektieren
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

// Falls beide Elemente vorhanden sind, Toggle-Klickfunktion aktivieren
if (burger && nav) {
  burger.addEventListener("click", () => {
    // Menü anzeigen/verstecken bei Klick auf das Burger-Icon
    nav.classList.toggle("nav-active");
  });
}

// Icon-Dateinamen, die zufällig im Hintergrund schweben sollen
const icons = ['boxglove.svg', 'muaythai-shorts.svg', 'belt.svg'];

// Container für die Icons im Hintergrund
const layer = document.querySelector('.icon-layer');

// 15 Icons erzeugen und zufällig im Viewport platzieren
for (let i = 0; i < 15; i++) {
  const img = document.createElement('img');

  // Abwechselnd Icon-Quellen zuweisen
  img.src = `images/icons/${icons[i % icons.length]}`;

  // Klasse hinzufügen für allgemeine Styles
  img.classList.add('icon');

  // Zufällige Startposition im sichtbaren Bereich
  img.style.left = Math.random() * 100 + 'vw';
  img.style.top = Math.random() * 100 + 'vh';

  // Zufällige Animationsdauer für Float-Effekt
  img.style.animationDuration = 15 + Math.random() * 10 + 's';

  // Icon dem Hintergrund-Container hinzufügen
  layer.appendChild(img);
}
