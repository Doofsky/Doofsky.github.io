let particles = [];

function setup() {
  const canvas = createCanvas(windowWidth, 800);
  canvas.parent('animation-container');
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(30); // Slower frame rate
}

function draw() {
  // Check if dark mode is active
  let isDarkMode = document.body.classList.contains('dark-mode');

  if (isDarkMode) {
    background(30, 10); // Dark background with slight opacity
  } else {
    background(255, 10); // White background with slight opacity
  }

  // Add new particles
  for (let i = 0; i < 3; i++) { // Fewer particles per frame
    particles.push(new Particle());
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();

    // Remove particles that are off-screen or too old
    if (p.isOffScreen() || p.isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    let angle = random(0, TWO_PI);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(0.5); // Set initial speed
    this.acc = createVector(0, 0);
    this.hue = random(0, 360);
    this.size = random(3, 6);
    this.lifespan = 300;
  }

  update() {
    // Direction from center to particle
    let dir = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));

    // Perpendicular vector to create rotational motion
    let perpendicular = createVector(-dir.y, dir.x);
    perpendicular.normalize();

    // Control the strength of the rotation
    perpendicular.mult(0.05);

    // Apply rotational force
    this.acc.add(perpendicular);

    // Apply acceleration and update position
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Slow down particles over time (optional)
    this.vel.mult(0.99);

    // Reset acceleration
    this.acc.mult(0);

    this.lifespan -= 1;
  }

  show() {
    // Adjust particle color based on theme
    let isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
      // Brighter particles on dark background
      fill(this.hue, 80, 100, this.lifespan / 300 * 100);
    } else {
      // Darker particles on white background
      fill(this.hue, 80, 60, this.lifespan / 300 * 100);
    }
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isOffScreen() {
    return (
      this.pos.x < -50 ||
      this.pos.x > width + 50 ||
      this.pos.y < -50 ||
      this.pos.y > height + 50
    );
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
}
