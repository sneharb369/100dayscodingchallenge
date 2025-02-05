const text = document.getElementById("text");
const letters = text.innerText;
const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let array = [];
let adjustX = 20;
let adjustY = 15;

const mouse = {
  x: null,
  y: null,
  radius: 250,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  mouse.radius = 150;
  console.log(mouse.x, mouse.y);
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText(letters, 0, 30);
const data = ctx.getImageData(0, 0, 100, 100);
class Letter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirX = dx / distance;
    let forceDirY = dy / distance;
    let maxDis = mouse.radius;
    let force = (maxDis - distance) / maxDis;
    let dirX = forceDirX * force * this.density;
    let dirY = forceDirY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= dirX;
      this.y -= dirY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function init() {
  array = [];
  for (let y = 0, y2 = data.height; y < y2; y++) {
    for (let x = 0, x2 = data.width; x < x2; x++) {
      if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
        let posX = x + adjustX;
        let posY = y + adjustY;
        array.push(new Letter(posX * 10, posY * 10));
      }
    }
  }
}
init();
console.table(array);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < array.length; i++) {
    array[i].draw();
    array[i].update();
  }
  requestAnimationFrame(animate);
}
animate();

function connect() {
  let opacityVal = 1;
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      let dx = array[i].x - array[j].x;
      let dy = array[i].y - array[j].y;
      let dis = Math.sqrt(dx * dx + dy * dy);
      opacityVal = 1 - dis / 50;
      ctx.strokeStyle = "rgba(255,255,255," + opacityVal + ")";
      if (dis < 50) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(array[i].x, array[i].y);
        ctx.lineTo(array[j].x, array[j].y);
        ctx.stroke();
      }
    }
  }
}
