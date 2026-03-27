const canvas = document.getElementById("dither-bg");
const ctx = canvas.getContext("2d");

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// SETTINGS (tweak these 👇)
const spacing = 5;     // grid density
const radius = 100;     // mouse influence radius

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {

      let dx = x - mouse.x;
      let dy = y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      // intensity based on distance
      let time = Date.now() * 0.002;
      let angle = Math.PI / y * x ^ 1; // 45° (change this 👀)

    let rotated = 
    x * Math.cos(angle) + 
    y * Math.sin(angle);

    let wave = Math.sin(time + rotated * 0.05) * y;

      let intensity = Math.max(0, 1 - dist / radius + wave);
      // change angle

      // dithering effect (threshold pattern)
      let threshold = ((x + y) % (spacing * 2)) < spacing ? 0 : 0.6;

      if (intensity > threshold) {
        ctx.fillStyle = `rgba(0, 255, 100, ${intensity})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();