'use strict';

const grid = document.querySelector('.grid');

const inputPen = document.querySelector('input#pen');
const inputBg = document.querySelector('input#bg');

const slider = document.querySelectorAll('input.slider');
const colSlider = document.querySelector('input#col-number');
const rowSlider = document.querySelector('input#row-number');
const labelColNumber = document.querySelector('label[for="col-number"]');
const labelRowNumber = document.querySelector('label[for="row-number"]');

const btnClassic = document.querySelector('.btn-classic');
const btnRainbow = document.querySelector('.btn-rainbow');
const btnEraser = document.querySelector('.btn-eraser');
const btnClear = document.querySelector('.btn-clear');

// Default Values
let currentMode = 'classic';
let currentSound = Math.floor(Math.random() * 89 + 1);

// Events
btnClassic.addEventListener('click', () => changeMode('classic'));
btnRainbow.addEventListener('click', () => changeMode('rainbow'));
btnEraser.addEventListener('click', () => changeMode('eraser'));
btnClear.addEventListener('click', () => clearGrid());
inputPen.addEventListener('change', () => changeMode('classic'));
inputBg.addEventListener('input', () => changeBgColor());

slider.forEach(size => updateGrid(size));

// Functions
function createGrid(column, row) {
  // Set the number of columns and rows of grid
  grid.style['grid-template-columns'] = `repeat(${column}, 1fr)`;
  grid.style['grid-template-rows'] = `repeat(${row}, 1fr)`;

  // Delete old one before creating new grid
  grid.innerHTML = '';

  // Creating new grid
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      const el = document.createElement('div');

      // Adding classes in all grid div elements
      el.classList.add('gridEl');
      el.classList.add(`col-${i + 1}`);
      el.classList.add(`row-${j + 1}`);

      grid.appendChild(el);
    }
  }
  const gridElements = document.querySelectorAll('.gridEl');
  gridElements.forEach(function (el) {
    // Take background color picker value as reference
    el.style['background-color'] = `${inputBg.value}`;
    // Add button events
    el.addEventListener('mouseover', setColorMode);
    // audio
    el.addEventListener('mouseover', setPiano);
  });
}

function setPiano() {
  let audio;
  if (currentMode === 'classic') {
    audio = new Audio(`piano/${currentSound}.mp3`);
  } else if (currentMode === 'rainbow') {
    let random = Math.floor(Math.random() * 89 + 1);
    audio = new Audio(`piano/${random}.mp3`);
  } else if (currentMode === 'eraser') {
    audio = new Audio(`piano/89.mp3`);
  }
  audio.load();
  audio.play();
}

function changeMode(newMode) {
  currentSound = Math.floor(Math.random() * 89 + 1);
  changeActiveBtn(newMode);
  currentMode = newMode;
}

function clearGrid() {
  document.querySelectorAll('.gridEl').forEach(function (el) {
    el.style['background-color'] = `${inputBg.value}`;
  });
}

function updateGrid(el) {
  el.addEventListener('change', () => {
    let col = colSlider.value;
    let row = rowSlider.value;
    createGrid(col, row);
    labelColNumber.textContent = `Column: ${col}`;
    labelRowNumber.textContent = `Row: ${row}`;
  });
}

function changeActiveBtn(newMode) {
  if (currentMode === newMode) return;

  if (currentMode === 'rainbow') {
    btnRainbow.classList.remove('active');
  } else if (currentMode === 'eraser') {
    btnEraser.classList.remove('active');
  } else if (currentMode === 'classic') {
    btnClassic.classList.remove('active');
  }

  if (newMode === 'rainbow') {
    btnRainbow.classList.add('active');
  } else if (newMode === 'eraser') {
    btnEraser.classList.add('active');
  } else if (newMode === 'classic') {
    btnClassic.classList.add('active');
  }
}

function setColorMode() {
  if (currentMode === 'classic') {
    this.style['background-color'] = `${inputPen.value}`;
  } else if (currentMode === 'rainbow') {
    let hex = '#' + (Math.random().toString(16) + '000000').substring(2, 8);
    this.style['background-color'] = `${hex}`;
  } else if (currentMode === 'eraser') {
    this.style['background-color'] = `${inputBg.value}`;
  }
}

function changeBgColor() {
  document.querySelectorAll('.gridEl').forEach(function (el) {
    el.style['background-color'] = `${inputBg.value}`;
  });
}

window.onload = () => {
  createGrid(colSlider.value, rowSlider.value);
};
