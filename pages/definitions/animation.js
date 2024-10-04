let particles = [];
let attractors = []; // Array to store attractor points

function setup() {
  const canvas = createCanvas(windowWidth, 800);
  canvas.parent("animation-container");
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(30); // Slower frame rate

  // Optionally, add predefined attractors
  // attractors.push(createVector(windowWidth / 2 - 100, 200));
  // attractors.push(createVector(windowWidth / 2 + 100, 200));
}

function draw() {
  // Check if dark mode is active
  let isDarkMode = document.body.classList.contains("dark-mode");

  if (isDarkMode) {
    background(30, 10); // Dark background with slight opacity
  } else {
    background(255, 10); // White background with slight opacity
  }

  // Add new particles
  for (let i = 0; i < 3; i++) {
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

  // Optionally, draw attractors
  drawAttractors();
}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

function drawAttractors() {
  let isDarkMode = document.body.classList.contains("dark-mode");
  if (isDarkMode) {
    fill(210, 255, 100); // Yellow color in dark mode
  } else {
    fill(200, 100, 100); // Color in light mode
  }
  noStroke();
  for (let attractor of attractors) {
    circle(attractor.x, attractor.y, 10);

  }
}

class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    let angle = random(0, TWO_PI);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(0.5); // Set initial speed
    this.acc = createVector(0, 0);

    // Hue based on speed
    // let speed = this.vel.mag();
    // let hue = map(speed, 0, 5, 0, 360);
    // fill(hue, 80, 80, this.lifespan / 300 * 100);

    this.hue = random(0, 360);
    this.size = random(2, 4);
    // this.size = random(2, 4); // Smaller particles
    // this.size = random(5, 8); // Larger particles

    this.lifespan = 300;
    // this.lifespan = 200; // Shorter lifespan
    // this.lifespan = 400; // Longer lifespan

    this.mass = 2; // Add mass property
  }

  update() {
    // Direction from center to particle
    let dir = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));

    // Perpendicular vector to create rotational motion
    let perpendicular = createVector(-dir.y, dir.x);
    perpendicular.normalize();

    // Control the strength of the rotation
    perpendicular.mult(0.1);

    // Apply rotational force
    this.acc.add(perpendicular);

    // Attraction towards attractors
    for (let attractor of attractors) {
      let force = p5.Vector.sub(attractor, this.pos);
      let distance = force.mag();
      distance = constrain(distance, 5, 100); // Avoid extreme forces
      force.normalize();
      let strength = (100 * this.mass) / (distance * distance);

      force.mult(strength);
      this.acc.add(force);
    }

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
    let isDarkMode = document.body.classList.contains("dark-mode");
    if (isDarkMode) {
      fill(this.hue, 80, 100, (this.lifespan / 300) * 100);
    } else {
      fill(this.hue, 80, 60, (this.lifespan / 300) * 100);
    }
    circle(this.pos.x, this.pos.y, this.size);
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
