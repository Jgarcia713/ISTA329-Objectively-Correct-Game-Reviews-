function displayTip() {
  const tips = [
    "Always check corners in FPS games.",
    "Explore every path—hidden items await!",
    "Save often in RPGs.",
    "Upgrade your gear before boss fights."
  ];
  const randomIndex = Math.floor(Math.random() * tips.length);
  document.getElementById("game-tip").textContent = tips[randomIndex];
}