// promotion.js – Formularvalidierung und DB-Speicherung für Promotionseite

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("promoForm");
    const message = document.getElementById("formMessage");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      message.textContent = "";
  
      const vorname = form.vorname.value.trim();
      const nachname = form.nachname.value.trim();
      const email = form.email.value.trim();
      const nachricht = form.nachricht.value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (vorname.length < 2) {
        return showError("Vorname muss mindestens 2 Zeichen lang sein.");
      }
      if (nachname.length < 2) {
        return showError("Nachname muss mindestens 2 Zeichen lang sein.");
      }
      if (!emailRegex.test(email)) {
        return showError("Bitte gib eine gültige E-Mail-Adresse ein.");
      }
      if (nachricht.length > 0 && nachricht.length < 10) {
        return showError("Nachricht muss mindestens 10 Zeichen lang sein oder leer bleiben.");
      }
  
      try {
        const result = await databaseClient.insertInto("kontakt", {
          vorname,
          nachname,
          email,
          nachricht
        });
  
        console.log("Insert-Ergebnis:", result); // Debug-Ausgabe
  
        if (result && result[0]?.affectedRows === 1) {
          message.style.color = "green";
          message.textContent = "Vielen Dank für deine Nachricht!";
          form.reset();
        } else {
          showError("Es gab ein Problem beim Speichern. Bitte versuch es später erneut.");
        }
      } catch (err) {
        console.error(err);
        showError("Technischer Fehler – keine Verbindung zur Datenbank.");
      }
    });
  
    function showError(text) {
      message.style.color = "red";
      message.textContent = text;
    }
  });
  