const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");
const escalationText = document.getElementById("escalationText");

const escalationMessages = [
  "Hmmm…interesting choice 👀",
  "Common now ;)",
  "Are you sure though?",
  "Last chance 😌"
];

let noAttempts = 0;

noBtn.addEventListener("mouseover", () => {
  const container = document.querySelector(".buttons");
  const maxX = container.offsetWidth - noBtn.offsetWidth;
  const maxY = container.offsetHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  if (noAttempts < escalationMessages.length) {
    escalationText.textContent = escalationMessages[noAttempts];
    noAttempts++;
  }
});

yesBtn.addEventListener("click", () => {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }

  questionBox.classList.add("hidden");
  yesBox.classList.remove("hidden");

  const audio = document.getElementById("lovePreview");
  audio.volume = 0.8;
  audio.play().catch(() => {
    console.log("Autoplay blocked on this browser");
  });

  startConfetti();
  startHearts();
});


// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pieces = [];

function startConfetti() {
  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 5 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.d;
  });
  requestAnimationFrame(updateConfetti);
}

// Hearts
function startHearts() {
  if (window.innerWidth > 768) return;

  const emojis = ["❤️", "🌺","✨", "🌹"];

  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 20 + "px";
    heart.style.opacity = Math.random() * 0.5 + 0.5;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);

  setTimeout(() => clearInterval(interval), 6000);
}
