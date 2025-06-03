const multiplierEl = document.getElementById("multiplier");
const cashOutBtn = document.getElementById("cashOutBtn");
const resultEl = document.getElementById("result");

let currentMultiplier = 1.0;
let crashPoint = 0;
let interval;
let hasCashedOut = false;

function generateCrashPoint() {
  const rand = Math.random();
  return Math.floor((1 / (1 - rand)) * 100) / 100;
}

function startRound() {
  currentMultiplier = 1.0;
  crashPoint = generateCrashPoint();
  hasCashedOut = false;
  cashOutBtn.disabled = false;
  resultEl.textContent = "";
  multiplierEl.textContent = currentMultiplier.toFixed(2) + "x";

  interval = setInterval(() => {
    currentMultiplier += 0.01;
    multiplierEl.textContent = currentMultiplier.toFixed(2) + "x";

    if (currentMultiplier >= crashPoint) {
      clearInterval(interval);
      if (!hasCashedOut) {
        resultEl.textContent = `💥 CRASHED at ${crashPoint.toFixed(2)}x`;
        cashOutBtn.disabled = true;
      }
      setTimeout(startRound, 3000);
    }
  }, 100);
}

cashOutBtn.addEventListener("click", () => {
  if (!hasCashedOut) {
    hasCashedOut = true;
    cashOutBtn.disabled = true;
    clearInterval(interval);
    resultEl.textContent = `✅ You cashed out at ${currentMultiplier.toFixed(2)}x`;
    setTimeout(startRound, 3000);
  }
});

startRound();
