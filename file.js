const canvas = document.getElementById("myCanvas").getContext("2d");
const label = document.getElementById("label");

const dimensions = 32;

let direction = "Right";
let points = [[1, 1]]; //x, y
let length = 3;

window.addEventListener("keydown", keyDown);

function keyDown(e) {
  if (e.code === "ArrowUp") {
    direction = "Up";
  } else if (e.code === "ArrowLeft") {
    direction = "Left";
  } else if (e.code === "ArrowDown") {
    direction = "Down";
  } else if (e.code === "ArrowRight") {
    direction = "Right";
  }
}

function tick() {
  let newHead = points[0];
  if (direction === "Up") {
    newHead[1]--;
  } else if (direction === "Left") {
    newHead[0]--;
  } else if (direction === "Down") {
    newHead[1]++;
  } else if (direction === "Right") {
    newHead[0]++;
  }
  for (var i = 0; i < points.length; i++) {
    if (i != 0) {
      points[i] = points[i - 1];
    }
  }
  points[0] = newHead;
  for (var point in points) {
    canvas.fillRect(point[0] * 10, point[1] * 10, 10, 10);
  }
  setTimeout(tick, 100);
}

setTimeout(tick, 100);
