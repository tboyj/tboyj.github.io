const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let mouse = { x: w, y: h};

let t = 1;

// simple pseudo noise (fast + stable)
function noise(x, y) {
return Math.sin(x * 15.9898 + y * 75.233) * 43758.5453 % 1;
}

function draw() {
ctx.clearRect(0, 0, w, h);

const spacing = 8; // bigger = cleaner
const scale = 1;

for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {

    // base noise (animated)
    let n = noise(x * scale + t, y * scale + t);

    // normalize noise
    n = Math.abs(n);

    // mouse influence (soft)




    // dithering threshold
    if (n > 0.55) {
        const brightness = 45 + n * 50;

        // subtle red tint
        ctx.fillStyle = `rgb(${brightness}, ${brightness * 0.3}, ${brightness * 0.3})`;

        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
    }
    }
}

t += 0.0000000001; // slow movement
requestAnimationFrame(draw);
}

draw();

function openModal(src) {
    document.getElementById("img01").src = src;
    document.getElementById("imageModal").style.display = "flex";
}