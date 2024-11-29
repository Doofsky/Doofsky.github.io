// animation.js

let particles = [];
let attractors = []; // Array to store attractor points

// Customizable parameters
let pointWeight = 10;
let velocityMultiplier = 1;
let curlStrength = 1;
let divergenceStrength = 0;

function setup() {
  const canvas = createCanvas(windowWidth, 800);
  canvas.parent("animation-container");
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(30); // Slower frame rate

  // Event listeners for controls
  setupControls();

  // Ensure that mouse interactions are confined to the canvas
  canvas.mousePressed(canvasMousePressed);
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

  // Draw attractors
  drawAttractors();
}

function canvasMousePressed() {
  // Add attractor at mouse position with specified weight
  attractors.push({
    position: createVector(mouseX, mouseY),
    weight: pointWeight,
  });
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
    circle(attractor.position.x, attractor.position.y, attractor.weight);
  }
}

class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    let angle = random(0, TWO_PI);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(0.5 * velocityMultiplier); // Adjust initial speed
    this.acc = createVector(0, 0);

    this.hue = random(0, 360);
    this.size = random(2, 4);
    this.lifespan = 300;
    this.mass = 2;
  }

  update() {
    // Direction from center to particle
    let dir = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));

    // Perpendicular vector to create rotational motion (curl)
    let perpendicular = createVector(-dir.y, dir.x);
    perpendicular.normalize();
    perpendicular.mult(0.1 * curlStrength);

    // Apply rotational force
    this.acc.add(perpendicular);

    // Attraction towards attractors
    for (let attractor of attractors) {
      let force = p5.Vector.sub(attractor.position, this.pos);
      let distance = force.mag();
      distance = constrain(distance, 5, 100); // Avoid extreme forces
      force.normalize();
      let strength = (100 * this.mass * attractor.weight/10) / (distance * distance);

      force.mult(strength);
      this.acc.add(force);
    }

    // Apply divergence
    let center = createVector(width / 2, height / 2);
    let fromCenter = p5.Vector.sub(this.pos, center);
    fromCenter.normalize();
    fromCenter.mult(divergenceStrength * 0.1);
    this.acc.add(fromCenter);

    // Apply acceleration and update position
    this.vel.add(this.acc);
    this.vel.mult(0.99); // Slow down particles over time (optional)
    this.pos.add(this.vel);

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
  resizeCanvas(windowWidth, 800);
}

// Function to set up event listeners for the controls
function setupControls() {
  // Point Weight Slider
  const pointWeightSlider = document.getElementById("pointWeight");
  pointWeightSlider.addEventListener("input", function () {
    pointWeight = parseFloat(this.value);
  });

  // Velocity Slider
  const velocitySlider = document.getElementById("velocity");
  velocitySlider.addEventListener("input", function () {
    velocityMultiplier = parseFloat(this.value);
  });

  // Curl Slider
  const curlSlider = document.getElementById("curl");
  curlSlider.addEventListener("input", function () {
    curlStrength = parseFloat(this.value);
  });

  // Divergence Slider
  const divergenceSlider = document.getElementById("divergence");
  divergenceSlider.addEventListener("input", function () {
    divergenceStrength = parseFloat(this.value);
  });
}
