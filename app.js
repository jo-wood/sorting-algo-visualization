const boxContainer = document.querySelector('.box-container')
const colorBoxes = document.querySelectorAll('.box');
const squaresNumber = document.querySelector('#squares-amount');
const sortingSpeed = document.querySelector('#sorting-speed');

// Color buttons
const parentColorButtons = document.querySelector('.main-nav');
const redButton = document.querySelector('#red');
const greenButton = document.querySelector('#green');
const blueButton = document.querySelector('#blue');

// Sorting buttons
const bubbleSort = document.querySelector('.bubble-sort');
const selectionSort = document.querySelector('.selection-sort');
const insertionSort = document.querySelector('.insertion-sort');

// Color Options
const redColor = 'red';
const blueColor = 'blue';
const greenColor = 'green';

let selectedColor;

// Listeners
redButton.addEventListener('click', changeSelectedColor(redColor));
blueButton.addEventListener('click', changeSelectedColor(blueColor));
greenButton.addEventListener('click', changeSelectedColor(greenColor));

bubbleSort.addEventListener('click', doBubbleSort);
selectionSort.addEventListener('click', doSelectionSort);
insertionSort.addEventListener('click', doInsertionSort);

sortingSpeed.addEventListener('input', displaySpeed);
squaresNumber.addEventListener('input', displayNumberBlocks);

// User selects sorting speed in ms
sortingSpeed.addEventListener('input', changeCounts);
// User selects number of squares wanted
squaresNumber.addEventListener('input', changeCounts);


// FUNCTIONS

function changeSelectedColor(color) {
    selectedColor = color
    shuffledArray = getShuffledArray();
    boxContainer.innerHTML = '';
    addSquaresToHTML(shuffledArray);
}

function changeCounts() {
  shuffledArray = getShuffledArray();
  boxContainer.innerHTML = '';
  addSquaresToHTML(shuffledArray);
}

function getShuffledArray() {
  increment = Math.floor(255 / squaresNumber.value);
  colorArr = [];
  for (i = 0; i < 255; i += increment) {
    colorArr.push(i);
  }
  shuffledColorArray = shuffle(colorArr);
  return shuffledColorArray
}

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function displayColor(colorNumber) {

  switch (selectedColor) {
    case redColor:
      barColor = `rgb(${colorNumber},0,0)`
      break;
    case blueColor:
      barColor = `rgb(0,0,${colorNumber})`
      break;
    default:
      barColor = `rgb(0,${colorNumber},0)`
      break;
  }
  return barColor
}

function displayNumberBlocks() {
  const spanValue = document.querySelector('#squares-value');
  spanValue.textContent = `${squaresNumber.value}`;
}

function displaySpeed() {
  const spanValue = document.querySelector('#speed-value');
  spanValue.textContent = `${sortingSpeed.value}`;
}

function addSquaresToHTML(arr) {
  for (i = 0; i < arr.length; i++) {
    const box = document.createElement('div')
    box.className = `box box-${i}`;
    const colorNumber = arr[i];
    box.style.background = displayColor(colorNumber);
    boxContainer.appendChild(box);
  }
}

// Sleep timer function:
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function doBubbleSort(e) {
  let len = shuffledColorArray.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (shuffledColorArray[j] > shuffledColorArray[j + 1]) {
        let tmp = shuffledColorArray[j];
        shuffledColorArray[j] = shuffledColorArray[j + 1];
        shuffledColorArray[j + 1] = tmp;
        boxContainer.innerHTML = '';
        whatColor(shuffledColorArray);
        await sleep(speedOfSorting);
      }
    }
  }
  console.log('Sorting Complete!')
  alert('Sorting Complete!')

  e.preventDefault();
}

async function doSelectionSort(e) {
  var count = 0;
  var answer = [];
  while (shuffledColorArray.length > 0) {
    count = shuffledColorArray[0];
    for (i = 0; i < shuffledColorArray.length; i++) {
      if (shuffledColorArray[i] < count) {
        count = shuffledColorArray[i];
      }
    }
    answer.push(count);
    shuffledColorArray.splice(shuffledColorArray.indexOf(count), 1);
    var combined = answer.concat(shuffledColorArray);
    boxContainer.innerHTML = '';
    whatColor(combined);
    await sleep(speedOfSorting);
  }
  console.log('Sorting Complete!')
  alert('Sorting Complete!')

  e.preventDefault();
}

async function doInsertionSort(e) {
  console.log('hi');
  const len = shuffledColorArray.length;
  for (let i = 0; i < len; i++) {
    let el = shuffledColorArray[i];
    let j;
    for (j = i - 1; j >= 0 && shuffledColorArray[j] > el; j--) {
      shuffledColorArray[j + 1] = shuffledColorArray[j];
    }
    shuffledColorArray[j + 1] = el;
    boxContainer.innerHTML = '';
    whatColor(shuffledColorArray);
    await sleep(speedOfSorting);
  }
  console.log('Sorting Complete!')
  alert('Sorting Complete!')
  e.preventDefault();
}