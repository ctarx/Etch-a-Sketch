const DEFAULT_SIZE = 16; // Default grid size 16 x 16

const container = document.querySelector(".container");

// Create buttons variables
const gridButton = document.querySelector(".grid");
const drawButton = document.querySelector(".draw");
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

// Function to add listeners to cells
function addListenersToCells() {
  const cells = document.querySelectorAll(".cell");
  let isDrawing = false;

  // Toggle grid borders
  function grid() {
    cells.forEach((cell) => {
      cell.classList.toggle("cell-border");
    });
  }

  // Draw function
  function draw() {
    isDrawing = true;
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        if (isDrawing) {
          cell.classList.add("color");
        }
      });
    });
  }

  // Erase function
  function erase() {
    isDrawing = false;
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        cell.classList.remove("color");
      });
    });
  }

  function clear() {
    isDrawing = false;
    cells.forEach((cell) => {
      cell.classList.remove("color");
    });
  }

  // Assign functions to buttons
  gridButton.addEventListener("click", grid);
  drawButton.addEventListener("click", draw);
  eraseButton.addEventListener("click", erase);
  clearButton.addEventListener("click", clear);
}

// Listener for the size button to update grid size
sizeButton.addEventListener("click", () => {
  size = Number(prompt("Grid size from 1 - 100"));
  if (size >= 1 && size <= 100) {
    document.documentElement.style.setProperty("--size", size);
    resetGrid(); // Reset the old grid
    createGrid(size); // Create a new grid with the new size
  } else {
    alert("Please enter a number between 1 and 100.");
  }
});

// Load the default grid on page load
document.addEventListener("DOMContentLoaded", () => {
  createGrid(size); // Create the default grid when the page loads
});
