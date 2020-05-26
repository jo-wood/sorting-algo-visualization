
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

// Features:
// - style range slider (maybe have knob be same color as color of blocks...)
// - show alert (add div) when sorting algorithm commences / finishes (not window alerts! - my own)
// - disable sorting buttons while sorting is in progress
// - add more sorting methods!
// - refactor code using ES6 class methods!



parentColorButtons.addEventListener('click', pressColorButton);
function pressColorButton(e) {
  if (e.target.id === 'red') {
    isRed = true;
    isGreen = false;
    isBlue = false;

    increment = Math.floor(255 / squaresNumber.value);
    colorArr = [];
    for (i = 0; i < 255; i += increment) {
      colorArr.push(i);
    }
    shuffledColorArray = shuffle(colorArr);
    boxContainer.innerHTML = '';
    addSquaresToHTMLRed(shuffledColorArray);
  }

  if (e.target.id === 'green') {
    isRed = false;
    isGreen = true;
    isBlue = false;

    increment = Math.floor(255 / squaresNumber.value);
    colorArr = [];
    for (i = 0; i < 255; i += increment) {
      colorArr.push(i);
    }
    shuffledColorArray = shuffle(colorArr);
    boxContainer.innerHTML = '';
    addSquaresToHTML(shuffledColorArray);
  }

  if (e.target.id === 'blue') {
    isRed = false;
    isGreen = false;
    isBlue = true;

    increment = Math.floor(255 / squaresNumber.value);
    colorArr = [];
    for (i = 0; i < 255; i += increment) {
      colorArr.push(i);
    }
    shuffledColorArray = shuffle(colorArr);
    boxContainer.innerHTML = '';
    addSquaresToHTMLBlue(shuffledColorArray);
  }

  e.preventDefault();
}



// User selects sorting speed in ms
sortingSpeed.addEventListener('input', sortSpeed);
function sortSpeed() {
  speedOfSorting = Math.floor(sortingSpeed.value);
  return speedOfSorting;
}
sortSpeed();


// Load randomized squares on page reset:
increment = Math.floor(255 / squaresNumber.value);
colorArr = [];
for (i = 0; i < 255; i += increment) {
  colorArr.push(i);
}
shuffledColorArray = shuffle(colorArr);
boxContainer.innerHTML = '';
addSquaresToHTML(shuffledColorArray);
isGreen = true;
isRed = false;
isBlue = false;


// Display value next to range slider for number of blocks
squaresNumber.addEventListener('input', displayNumberBlocks);
function displayNumberBlocks() {
  const value = squaresNumber.value;
  const spanValue = document.querySelector('#squares-value');
  spanValue.textContent = `${value}`;
}

// Display value next to range slider for sorting speed
sortingSpeed.addEventListener('input', displaySpeed);
function displaySpeed() {
  const value = sortingSpeed.value;
  const spanValue = document.querySelector('#speed-value');
  spanValue.textContent = `${value}`;
}


// User selects number of squares wanted
squaresNumber.addEventListener('input', colorScale);
function colorScale() {
  const increment = Math.floor(255 / squaresNumber.value);
  // console.log(increment);
  colorArr = [];
  for (i = 0; i < 255; i += increment) {
    colorArr.push(i);
  }
  shuffledColorArray = shuffle(colorArr);
  boxContainer.innerHTML = '';
  whatColor(shuffledColorArray);
  return shuffledColorArray
}

function whatColor(array) {
  if (isRed === true) {
    addSquaresToHTMLRed(array)
  }
  if (isGreen === true) {
    addSquaresToHTML(array);
  }
  if (isBlue === true) {
    addSquaresToHTMLBlue(array);
  }
}

// Add squares to HTML function GREEN COLOR:
function addSquaresToHTML(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const box = document.createElement('div')
    box.className = `box box-${i}`;
    const colorNumber = arr1[i];
    box.style.background = `rgb(0,${colorNumber},0)`;
    boxContainer.appendChild(box);
  }
}

// Add squares to HTML function RED COLOR:
function addSquaresToHTMLRed(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const box = document.createElement('div')
    box.className = `box box-${i}`;
    const colorNumber = arr1[i];
    box.style.background = `rgb(${colorNumber},0,0)`;
    boxContainer.appendChild(box);
  }
}

// Add squares to HTML function BLUE COLOR:
function addSquaresToHTMLBlue(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const box = document.createElement('div')
    box.className = `box box-${i}`;
    const colorNumber = arr1[i];
    box.style.background = `rgb(0,0,${colorNumber})`;
    boxContainer.appendChild(box);
  }
}


// SHUFFLE FUNCTION colorArray
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

// Sleep timer function:
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ***************** Original bubbleSort code written by me **********************************************************
// async function doBubbleSort(e) {
//   colorScale();
//   while (true) {
//     for (i = 0; i < shuffledColorArray.length - 1; i++) {
//       if (shuffledColorArray[i] > shuffledColorArray[i + 1]) {
//         var j = shuffledColorArray[i];
//         var k = shuffledColorArray[i + 1];
//         shuffledColorArray[i] = k;
//         shuffledColorArray[i + 1] = j;
//         boxContainer.innerHTML = '';
//         addSquaresToHTML(shuffledColorArray);
//       }
//       console.log(shuffledColorArray);
//       await sleep(25);
//     }
//     if (arraysMatch(shuffledColorArray, colorArr) === true) {
//       console.log('Sorting Complete!')
//       alert('Sorting Complete!')
//       break;
//     }
//   }
//   // need to figure out why program crashes if bubblesort if clicked after another sorting method is complete
//   e.preventDefault();
// }
// ***************** Original bubbleSort code written by me **********************************************************



// BUBBLE SORT:
bubbleSort.addEventListener('click', doBubbleSort);
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


// SELECTION SORT:
selectionSort.addEventListener('click', doSelectionSort);
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

// INSERTION SORT
insertionSort.addEventListener('click', doInsertionSort);
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



