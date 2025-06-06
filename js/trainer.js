const prompts = ['A', 'S', 'D'];
const totalRounds = 5;
let currentPrompt = '';
let currentRound = 0;
let startTime = 0;
let reactionTimes = [];

const promptEl = document.getElementById('prompt');
const resultEl = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const gloveLeft = document.querySelector('.glove-left');
const gloveRight = document.querySelector('.glove-right');

function startCountdown(seconds = 3) {
  promptEl.textContent = seconds;
  const countdownInterval = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      promptEl.textContent = seconds;
    } else {
      clearInterval(countdownInterval);
      promptEl.textContent = 'LOS!';
      setTimeout(startRound, 500);
    }
  }, 1000);
}

function startRound() {
  if (currentRound >= totalRounds) {
    const avg = (
      reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
    ).toFixed(3);
    promptEl.textContent = 'Fertig!';
    resultEl.textContent = `Durchschnittliche Reaktionszeit: ${avg} Sekunden`;
    startBtn.disabled = false;
    return;
  }

  resultEl.textContent = `Runde ${currentRound + 1} von ${totalRounds}`;
  currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  setTimeout(() => {
    promptEl.textContent = currentPrompt;
    startTime = performance.now();
  }, 500 + Math.random() * 1000);
}

function triggerPunch(side) {
  const glove = side === 'left' ? gloveLeft : gloveRight;
  if (!glove) return;
  glove.classList.remove(`punch-${side}`);
  void glove.offsetWidth; // Trigger Reflow
  glove.classList.add(`punch-${side}`);
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  reactionTimes = [];
  currentRound = 0;
  resultEl.textContent = '';
  startCountdown();
});

document.addEventListener('keydown', (e) => {
  if (!currentPrompt) return;

  const keyPressed = e.key.toUpperCase();
  if (keyPressed === currentPrompt) {
    const reactionTime = (performance.now() - startTime) / 1000;
    reactionTimes.push(reactionTime);
    resultEl.textContent = `Runde ${currentRound + 1}: ${reactionTime.toFixed(
      3
    )} Sekunden`;

    // Punch trigger
    if (currentPrompt === 'A') triggerPunch('left');
    if (currentPrompt === 'D') triggerPunch('right');

    currentRound++;
    currentPrompt = '';
    promptEl.textContent = '';
    setTimeout(startRound, 1000);
  } else {
    resultEl.textContent = 'Falsche Taste!';
  }
});
