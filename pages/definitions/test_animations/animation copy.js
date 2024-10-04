let particles = [];

function setup() {
  const canvas = createCanvas(windowWidth, 400);
  canvas.parent('animation-container');
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 10, 10); // Slight trail effect

  // Add new particles
  for (let i = 0; i < 5; i++) {
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
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.hue = random(0, 360);
    this.size = random(5, 10);
    this.lifespan = 255;
  }

  update() {
    // Apply a curl noise effect
    let angle = noise(this.pos.x * 0.005, this.pos.y * 0.005) * TWO_PI * 2;
    let n = p5.Vector.fromAngle(angle);
    n.mult(0.5);
    this.acc.add(n);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.lifespan -= 2;
  }

  show() {
    fill(this.hue, 80, 100, this.lifespan / 255 * 100);
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
