function setup() {
  const canvas = createCanvas(windowWidth, 400, WEBGL);
  canvas.parent("animation-container");
  noStroke();
}

function draw() {
  background(20);

  // Rotate the torus over time
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Dynamic color based on time
  let r = map(sin(frameCount * 0.01), -1, 1, 100, 255);
  let g = map(sin(frameCount * 0.02), -1, 1, 100, 255);
  let b = map(sin(frameCount * 0.03), -1, 1, 100, 255);

  ambientLight(100);
  pointLight(r, g, b, 0, 0, 300);

  // Draw the torus
  specularMaterial(r, g, b);
  torus(100, 30, 64, 64);
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
}
