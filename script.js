const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 480;
canvas.height = 640;

// Game variables
let birdY = canvas.height / 2;
let birdDY = 0;
const gravity = 0.5;
const jumpStrength = -8;
const pipeGap = 200;
let score = 0;
let pipes = [];

// Main game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird logic
  birdDY += gravity;
  birdY += birdDY;

  // Draw the bird
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(50, birdY, 40, 40);

  // Pipe logic
  if (frames % 100 === 0) {
    const pipeY = Math.random() * (canvas.height - pipeGap);
    pipes.push({ x: canvas.width, y: pipeY });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 3;

    // Collisions
    if (
      birdY < pipes[i].y ||
      birdY + 40 > pipes[i].y + pipeGap ||
      pipes[i].x < 50 + 40
    ) {
      gameOver();
      return;
    }

    // Passed a pipe
    if (pipes[i].x === 50) {
      score++;
    }

    // Draw pipes
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(pipes[i].x, 0, 50, pipes[i].y);
    ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, 50, canvas.height);
  }

  // Draw score
  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Request next animation frame
  requestAnimationFrame(gameLoop);
}

// Game over
function gameOver() {
  alert("Game Over. Score: " + score);
  birdY = canvas.height / 2;
  birdDY = 0;
  score = 0;
  pipes = [];
  gameLoop();
}

// Bird jump
function jump() {
  birdDY = jumpStrength;
}

// Event listeners
document.addEventListener("keydown", jump);

// Start the game loop
gameLoop();
