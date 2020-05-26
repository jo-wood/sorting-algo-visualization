

const load = document.querySelector('#load');
const randomize = document.querySelector('#randomize');
const boxContainer = document.querySelector('.box-container')
const colorBoxes = document.querySelectorAll('.box');
const squaresNumber = document.querySelector('#squares-amount');
const sortingSpeed = document.querySelector('#sorting-speed');

// sorting buttons
const bubbleSort = document.querySelector('.bubble-sort');
const selectionSort = document.querySelector('.selection-sort');
const insertionSort = document.querySelector('.insertion-sort');

// Features:
// - dynamic changing of number of blocks (probably want to have blocks loaded and randomized already so that changing the range slider will in real time change the amount of blocks)
// - range slider for dynamic changing of speed and block numbers
// - user can change color
// - show alert (add div) when sorting algorithm commences / finishes (not window alerts! - my own)
// - disable sorting buttons while sorting is in progress
// - add more sorting methods!
// - refactor code using ES6 class methods!


// User selects sorting speed in ms
sortingSpeed.addEventListener('input', sortSpeed);
function sortSpeed() {
  speedOfSorting = Math.floor(sortingSpeed.value);
  return speedOfSorting;
}
sortSpeed();



// User selects number of squares wanted
squaresNumber.addEventListener('input', colorScale);
function colorScale() {
  const increment = Math.floor(255 / squaresNumber.value);
  // console.log(increment);
  colorArr = [];
  for (i = 0; i < 255; i += increment) {
    colorArr.push(i);
  }
  return colorArr;
}


// Sorted colorArray:
function sortedArray(arrayToSort) {
  arrayToSort = colorArr.sort(function (a, b) {
    return a - b;
  })
  return arrayToSort;
}


// Add squares to HTML function:
function addSquaresToHTML(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const box = document.createElement('div')
    box.className = `box box-${i}`;
    const colorNumber = arr1[i];
    box.style.background = `rgb(0,${colorNumber},0)`;
    console.log(box)
    boxContainer.appendChild(box);
    console.log(arr1);
  }
}


// LOAD EVENT: produce the series of colored squares by increasing 'g' in rgb;
load.addEventListener('click', loadSquares);
function loadSquares(e) {
  boxContainer.innerHTML = '';
  colorScale();
  addSquaresToHTML(colorArr);

  e.preventDefault();
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


// GENERATE RANDOM ARRAY;
function randomArray() {
  colorScale();
  shuffledColorArray = shuffle(colorArr);
  console.log(shuffledColorArray);
  return shuffledColorArray;
}


// RANDOMIZE EVENT: randomize squares from LOAD event;
randomize.addEventListener('click', randomizeSquares);
function randomizeSquares(e) {
  randomArray();
  boxContainer.innerHTML = '';
  addSquaresToHTML(shuffledColorArray);

  return shuffledColorArray;
  // e.preventDefault();
}


// Check if arrays match function;
function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
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
        addSquaresToHTML(shuffledColorArray);
        console.log(shuffledColorArray);
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
    console.log(combined);
    boxContainer.innerHTML = '';
    addSquaresToHTML(combined);
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
    console.log(shuffledColorArray);
    boxContainer.innerHTML = '';
    addSquaresToHTML(shuffledColorArray);
    await sleep(speedOfSorting);
  }
  console.log('Sorting Complete!')
  alert('Sorting Complete!')
  e.preventDefault();
}



