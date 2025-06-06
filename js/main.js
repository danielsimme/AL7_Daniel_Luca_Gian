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