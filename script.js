// Define default setting, link to window initial load
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

// Assign default setting to variable, for easier changes later
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

// Define UI elements
const colorPicker   = document.getElementById("colorPicker");
const colorBtn      = document.getElementById("colorBtn");
const rainbowBtn    = document.getElementById("rainbowBtn");
const eraserBtn     = document.getElementById("eraserBtn");
const clearBtn      = document.getElementById("clearBtn");
const sizeValue     = document.getElementById("sizeValue");
const sizeSlider    = document.getElementById("sizeSlider");
const grid          = document.getElementById("grid");

// Assign logic to UI elements
colorPicker.addEventListener("input", (e) => setCurrentColor(e.target.value));
colorBtn.addEventListener("click", () => setMode("color"));
rainbowBtn.addEventListener("click", () => setMode("rainbow"));
eraserBtn.addEventListener("click", () => setMode("eraser"));
clearBtn.addEventListener("click", () => reloadGrid());
sizeSlider.addEventListener("mousemove", (e) => updateSizeValue(e.target.value));
sizeSlider.addEventListener("change", (e) => changeSize(e.target.value));

// Assign and apply new selected color
function setCurrentColor(newColor) {
  currentColor = newColor;
}

// Assign and apply mode based on selection
function setMode(newMode) {
  removeCurrentMode(currentMode);
  addNewMode(newMode);
  currentMode = newMode;
}

// Remove button highlight when selecting another button
function removeCurrentMode(currentMode) {
  if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }
}

// Add highlight to new button selected
function addNewMode(newMode) {
  if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

// Clear colored grid elements & re-setup grid size
function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

// Remove grid color
function clearGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  // Setup gird size based on slider choice on size value
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Create & append gird elements based on grid size
  // Colored gird element using mouse
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    // Mouse move to apply color
    gridElement.addEventListener("mouseover", (e) => changeColor(e));
    // Mouse click to apply color
    gridElement.addEventListener("mousedown", (e) => changeColor(e));
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  // Mouse move within gird but not click will not apply color
  // To apply this function, must click & move simultaneously
  if (e.type === 'mouseover' && !mouseDown) return;

  if (currentMode === 'rainbow') {
    // Maximum possibilities of RGB values = 256
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    // e.target.style.backgroundColor = Changing the element color from mouseover / mousedown
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = "#F7ECDE";
  }
}

// Related to click & drag function to apply color
let mouseDown = false;
// While holding mousedown, activate mousedown
grid.addEventListener("mousedown", () => (mouseDown = true));
// While release mouseup, de-active mousedown
grid.addEventListener("mouseup", () => (mouseDown = false));

// Change size value display based on slider
function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

// Change the grid size & size display value
// Reset grid layout upon changes
function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

// Assign and apply new size selected
function setCurrentSize(newSize) {
  currentSize = newSize;
}

// Load necessary default setup once open window
window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  removeCurrentMode(DEFAULT_MODE);
  addNewMode(DEFAULT_MODE);
}