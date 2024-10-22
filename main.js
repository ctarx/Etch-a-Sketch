const MIN_SIZE = 1;
const MAX_SIZE = 100;
const DEFAULT_SIZE = 16; // Default grid size 16 x 16

const container = document.querySelector(".container");

// Create buttons variables
const gridButton = document.querySelector(".grid");
const drawButton = document.querySelector(".draw");
const colorButton = document.querySelector(".rnd-color");
const eraseButton = document.querySelector(".erase");
const clearButton = document.querySelector(".clear");
const sizeButton = document.querySelector(".size");

let size = DEFAULT_SIZE;
// Set the CSS property --size to the value of the variable size
document.documentElement.style.setProperty("--size", size);

// Function to create the grid
function createGrid(size) {
  for (let i = 0; i < size; i++) {
    const divRow = document.createElement("div");
    for (let j = 0; j < size; j++) {
      const divCell = document.createElement("div");
      divCell.classList.add("cell");
      divRow.appendChild(divCell);
    }
    container.appendChild(divRow);
  }
  addListenersToCells(); // Add listeners to the cells after creating the grid
}

// Functions to reset the grid
function resetGrid() {
  container.innerHTML = "";
}

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

// Function to add listeners to cells
function addListenersToCells() {
  const cells = document.querySelectorAll(".cell");
  let isDrawing = false;
  let isDrawingColor = false;

  // Change cell color based on drawing mode.
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      if (isDrawing) {
        cell.classList.add("color");
      } else if (isDrawingColor) {
        const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
        cell.style.backgroundColor = rndCol;
      } else {
        cell.style.backgroundColor = ""; // For erase
        cell.classList.remove("color");
      }
    });
  });

  // Define functions that set the mode.
  //
  // Draw
  function draw() {
    isDrawingColor = false;
    isDrawing = true;
  }

  // Color draw
  function colorDraw() {
    isDrawing = false;
    isDrawingColor = true;
  }

  // Erase
  function erase() {
    isDrawing = false;
    isDrawingColor = false;
  }

  // Clear function
  function clear() {
    cells.forEach((cell) => {
      cell.classList.remove("color");
      cell.style.backgroundColor = "";
    });
    isDrawing = false;
    isDrawingColor = false;
  }

  // Toggle grid borders
  function grid() {
    cells.forEach((cell) => {
      cell.classList.toggle("cell-border");
    });
  }

  // Assign functions to buttons
  gridButton.addEventListener("click", grid);
  drawButton.addEventListener("click", draw);
  colorButton.addEventListener("click", colorDraw);
  eraseButton.addEventListener("click", erase);
  clearButton.addEventListener("click", clear);
}

// Listener for the size button to update grid size
sizeButton.addEventListener("click", () => {
  size = Number(prompt("Grid size from 1 - 100"));
  if (size >= MIN_SIZE && size <= MAX_SIZE) {
    document.documentElement.style.setProperty("--size", size);
    resetGrid(); // Reset the old grid
    createGrid(size); // Create a new grid with the new size
  } else {
    alert(`Please enter a number between ${MIN_SIZE} and ${MAX_SIZE}.`);
  }
});

// Load the default grid on page load
document.addEventListener("DOMContentLoaded", () => {
  createGrid(size); // Create the default grid when the page loads
});
