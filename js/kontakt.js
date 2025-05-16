// === kontakt.js ===

import { DatabaseClient } from "./databaseClient.js";

const db = new DatabaseClient("al7", "j4x3y68radaf1air");

const form = document.getElementById("contactForm");
const messageEl = document.getElementById("formMessage");

const spinner = document.createElement("div");
spinner.id = "spinner";
spinner.textContent = "Wird gesendet...";
spinner.style.display = "none";
spinner.style.textAlign = "center";
spinner.style.marginTop = "1rem";
form.insertAdjacentElement("afterend", spinner);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // Validation
  if (!/^[A-Za-zÀ-ÿ\s'-]{2,}$/.test(name)) {
    return showError(
      "Bitte gib einen gültigen Namen ein (mind. 2 Buchstaben)."
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return showError("Bitte gib eine gültige E-Mail-Adresse ein.");
  }

  if (subject.length > 100) {
    return showError("Betreff darf maximal 100 Zeichen lang sein.");
  }

  if (message.length > 1000) {
    return showError("Die Nachricht ist zu lang (max. 1000 Zeichen).");
  }

  // Check for duplicate email
  spinner.style.display = "block";
  const allData = await db.getAll();
  const duplicate = allData.find((entry) => entry.email === email);
  if (duplicate) {
    spinner.style.display = "none";
    return showError("Diese E-Mail-Adresse wurde bereits verwendet.");
  }

  // Save to DB
  const newEntry = { name, email, subject, message };
  try {
    await db.insert(newEntry);
    spinner.style.display = "none";
    form.reset();
    messageEl.style.color = "green";
    messageEl.textContent = "Danke für deine Nachricht!";
  } catch (err) {
    spinner.style.display = "none";
    showError("Fehler beim Speichern. Bitte versuche es erneut.");
  }
});

function showError(msg) {
  messageEl.style.color = "red";
  messageEl.textContent = msg;
}
