const canvas = document.getElementById('canvas');
const stats = document.getElementById('stats');
const context = canvas.getContext('2d');

function drawPixel(x, y, r, g, b, a) {
  drawRect(x, y, 1, 1, r, g, b, a);
}

function drawRect(x, y, width, height, r, g, b, a) {
  context.beginPath();
  context.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  context.fillRect(x, y, width, height);
}

function lerp(x, min1, max1, min2, max2) {
  return (x - min1) / (max1 - min1) * (max2 - min2) + min2;
}

function textBar(size) {
  var s = '';
  for (var i = 0; i < size; i++) {
    s += '*';
  }
  return s;
}

function toScreenX(x) {
  return Math.floor(lerp(x, -4, 4, 0, width));
}

function toScreenY(y) {
  return Math.floor(lerp(y, -4, 4, 0, height));
}

const width = 500, height = 500;
const targetDt = 1 / 30 * 1000;
const a = Math.random() * Math.PI;
const b = Math.random() * Math.PI;
const c = Math.random() * Math.PI;
const d = Math.random() * Math.PI;
const e = Math.random() * Math.PI;
const f = Math.random() * Math.PI;
var x = 0, y = 0, z = 0;
var pointsPerCycle = 1000, maxPointsPerCycle = pointsPerCycle;
var startTime = new Date, dt = targetDt;
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
const drawNext = function() {
  for (var i = 0; i < pointsPerCycle; i++) {
    const xn = Math.sin(a * y) + Math.cos(b * x) - Math.cos(c * z);
    const yn = Math.sin(d * x) + Math.cos(e * y) - Math.cos(f * z);

    drawPixel(toScreenX(x), toScreenY(y), 0, 0, 0, 255);

    x = xn;
    y = yn;
    z = z + 0.000005;
  }
  drawRect(
      0, 0, width, height - 1, 255, 255, 255,
      1 - Math.exp(Math.log(0.1) / (1000 / dt)));

  dt = (new Date) - startTime;
  pointsPerCycle =
      Math.min(1000000, Math.max(1, pointsPerCycle * (targetDt / dt)));
  maxPointsPerCycle = Math.max(maxPointsPerCycle, pointsPerCycle);
  drawRect(0, height - 1, width, 1, 255, 255, 255, 0.5);
  drawRect(
      0, height - 1, width * (pointsPerCycle / maxPointsPerCycle), 1, 0, 0, 0,
      1);
  startTime = new Date;

  requestAnimationFrame(drawNext);
};
requestAnimationFrame(drawNext);
