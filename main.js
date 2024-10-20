const container = document.querySelector(".container");

const gridButton = document.querySelector(".grid");
const drawButton = document.querySelector(".draw");
const eraseButton = document.querySelector(".erase");
const clearButton = document.querySelector(".clear");

// Create 16x16 grid of divs
for (let i = 1; i <= 256; i++) {
  const div = document.createElement("div");
  div.classList.add("cell", "cell-border");
  container.appendChild(div);
}

// Add buttons events

// Add grid on/off function
const cells = document.querySelectorAll(".cell");
let isDrawing = false;

function grid() {
  cells.forEach((cell) => {
    cell.classList.toggle("cell-border");
  });
}
gridButton.addEventListener("click", grid);

// Add draw function
function draw() {
  isDrawing = true;
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      if (isDrawing) {
        cell.classList.add("color");
      }
    });
  });
}
drawButton.addEventListener("click", draw);

// Add erase function
function erase() {
  isDrawing = false;
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      cell.classList.remove("color");
    });
  });
}
eraseButton.addEventListener("click", erase);

// Add clear function
function clear() {
  isDrawing = false;
  cells.forEach((cell) => {
    cell.classList.remove("color");
    cell.removeEventListener("mousenter", draw);
  });
}
clearButton.addEventListener("click", clear);
