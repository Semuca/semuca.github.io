const canvas = document.getElementById("myCanvas").getContext("2d");
const label = document.getElementById("label");

let score = 0;
let direction;
let points = [];
let cherries = [];
let tickTime;
let cherrySpawnTime;

window.addEventListener("keydown", keyDown);

function keyDown(e) {
  switch (e.code) {
    case "ArrowUp":
      if (direction != "Down") {
        direction = "Up";
      }
      break;

    case "ArrowLeft":
    if (direction != "Right") {
      direction = "Left";
    }
      break;

    case "ArrowDown":
    if (direction != "Up") {
      direction = "Down";
    }
      break;

    case "ArrowRight":
    if (direction != "Left") {
      direction = "Right";
    }
      break;

    default:
      break;
  }
}

function Tick() {
  canvas.clearRect(points[points.length - 1][0] * 10, points[points.length - 1][1] * 10, 10, 10);
  let _endValue = [points[points.length - 1][0], points[points.length - 1][1]];
  for (var i = points.length - 1; i > 0; i--) {
    points[i][0] = points[i - 1][0];
    points[i][1] = points[i - 1][1];
  }
  if (direction === "Up") {
    points[0][1]--;
  } else if (direction === "Left") {
    points[0][0]--;
  } else if (direction === "Down") {
    points[0][1]++;
  } else if (direction === "Right") {
    points[0][0]++;
  }
  for (var i = 0; i < cherries.length; i++) {
    if (points[0][0] === cherries[i][0] && points[0][1] === cherries[i][1]) {
      points.push(_endValue);
      cherries.splice(i, 1);
      score++;
      label.textContent = "Score: " + score;
    }
  }
  Render();
  if (points[0][0] < 0 || points[0][0] > 32 || points[0][1] < 0 || points[0][1] > 32) {
    Reset();
    return;
  }
  for (var i = 1; i < points.length; i++) {
    if (points[0][0] === points[i][0] && points[0][1] === points[i][1]) {
      Reset();
      return;
    }
  }
  if (cherries.length < Math.floor(points.length / 2) && Math.floor(Math.random() * 6) == 0) {
    let _temp = false;
    let _poop = true;
    let _random = Math.floor((Math.random() * 1023));
    for (var i = 0; i < 32; i++) {
      for (var j = 0; j < 32; j++) {
        for (var k = 0; k < points.length; k++) {
          if (points[k][0] === i && points[k][1] === j) {
            _poop = false;
          }
        }
        if (_poop) {
          if (_random === 0) {
            cherries.push([i, j]);
            _temp = true;
            break;
          }
        } else {
          _poop = true;
        }
        _random--;
      }
      if (_temp) {
        break;
      }
    }
  }
  setTimeout(Tick, 500 / Math.floor(points.length / 3));
}

function Reset() {
  score = 0;
  direction = "Right";
  points = [[2, 1], [1, 1], [0, 1]]; //x, y
  cherries = [];
  canvas.clearRect(0, 0, 320, 320);
  Render();
  setTimeout(Tick, 500);
}

function Render() {
  for (var i = 0; i < points.length; i++) {
    canvas.fillRect(points[i][0] * 10, points[i][1] * 10, 10, 10);
  }
  canvas.fillStyle = 'red';
  for (var i = 0; i < cherries.length; i++) {
    canvas.fillRect(cherries[i][0] * 10, cherries[i][1] * 10, 10, 10);
  }
  canvas.fillStyle = 'black';
  canvas.strokeRect(0, 0, 320, 320);
}

Reset();
