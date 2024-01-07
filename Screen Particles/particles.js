const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const pixelRatio = window.devicePixelRatio || 1;

canvas.width = window.innerWidth * pixelRatio;
canvas.height = window.innerHeight * pixelRatio;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

ctx.scale(pixelRatio, pixelRatio);

let lines = [];
const center = { x: canvas.width / 2, y: canvas.height / 2 };
const numLines = 200;
const centerRadius = 50; // Radius of the central circle
let loadingPercent = 0; // Initial loading percentage

class Line {
  constructor() {
    this.angle = Math.random() * Math.PI * 2;
    this.length = 0;
    this.speed = Math.random() * 10 + 5;
    this.maxLength = Math.max(canvas.width, canvas.height);
  }

  update() {
    this.length += this.speed;
    if (this.length > this.maxLength) {
      // Reset the line
      this.length = 0;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 10 + 5;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(
      center.x + centerRadius * Math.cos(this.angle),
      center.y + centerRadius * Math.sin(this.angle)
    );
    ctx.lineTo(
      center.x + this.length * Math.cos(this.angle),
      center.y + this.length * Math.sin(this.angle)
    );
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
}

function init() {
  for (let i = 0; i < numLines; i++) {
    lines.push(new Line());
  }
}

function drawLoadingText() {
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    `${Math.min(loadingPercent, 100)}%`,
    canvas.width / 2 / pixelRatio,
    canvas.height / 2 / pixelRatio
  );
}

function animate() {
  ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
  lines.forEach((line) => {
    line.update();
    line.draw();
  });

  // Draw central circle
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(center.x, center.y, centerRadius, 0, Math.PI * 2);
  ctx.fill();

  // Update and draw loading text
  loadingPercent += 0.5; // Increase loading percent (adjust speed as needed)
  drawLoadingText();

  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  center.x = canvas.width / 2;
  center.y = canvas.height / 2;
  lines = [];
  init();
});
