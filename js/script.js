// IMPORTS
import {
    getRandomInt,
    isSquare,
    convertToArray,
} from './utils.js';

// SETUP
const gridRows = 50;
const gridCols = 50;
const checkSliceSize = 5;
const gridContainer = document.querySelector('#grid');


function isFibo(value) {
    return isSquare(5 * (value * value) - 4) || isSquare(5 * (value * value) + 4);
}
function isFiboSequence(array) {
    let fibo = true;
    array.forEach((value, i, arr) => {
        if (i < arr.length - 2) {
            if (arr[i] + arr[i + 1] !== arr[i + 2]) {
                // console.log(i);
                fibo = false;
            } else {
                // console.log(`${arr[i]} + ${arr[i + 1]} = ${arr[i + 2]}`);
            }
        }
    });
    return fibo;
}
function checkArraySlices(array, sliceSize) {
    array.forEach((value, index, arr) => {
        if (index < arr.length - (sliceSize - 1)) {
            const slice = arr.slice(index, (index + sliceSize)).map((x) => parseInt(x.getAttribute('data-num'), 10));
            if (isFiboSequence(slice) && slice.every((x) => isFibo(x))) {
                //make cells empty
                console.log(slice);
                console.log(`index: ${index}`);
            }
        }
    });
}


function highlightColumn() {
    const colPos = this.getAttribute('data-column');
    const highlightedCols = document.querySelectorAll(`[data-column="${colPos}"]`);
    highlightedCols.forEach((cell) => {
        cell.classList.add('is-hover');
    });
}
function resetColumns() {
    const highlightedCols = document.querySelectorAll('td.is-hover');
    highlightedCols.forEach((highlight) => {
        highlight.classList.remove('is-hover');
    });
}
function getRowCells(rowNr) {
    return document.querySelectorAll(`td[data-row="${rowNr}"]`);
}
function getColCells(colNr) {
    return document.querySelectorAll(`td[data-column="${colNr}"]`);
}

function addOne(cell) {
    const currentNumber = parseInt(cell.getAttribute('data-num'), 10);
    cell.classList.remove('is-empty');
    cell.setAttribute('data-num', currentNumber + 1);
    cell.innerText = currentNumber + 1;

    cell.classList.add('is-clicked');
    setTimeout(() => {
        cell.classList.remove('is-clicked');
    }, 500);
}


function clickCell(clickedCell) {
    clickedCell.currentTarget.setAttribute('data-num', clickedCell.currentTarget.getAttribute('data-num') - 1);

    const colId = clickedCell.currentTarget.getAttribute('data-column');
    const rowId = clickedCell.currentTarget.getAttribute('data-row');
    getRowCells(rowId).forEach((cell) => {
        addOne(cell);
    });

    getColCells(colId).forEach((cell) => {
        addOne(cell);
    });
    const testRows = convertToArray(getRowCells(rowId));
    checkArraySlices(testRows, checkSliceSize);
}


function fiboInit() {
    const t = document.createElement('TABLE');

    for (let rows = 0; rows < gridRows; rows++) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-row', rows);
        t.appendChild(newRow);
        for (let cols = 0; cols < gridCols; cols++) {
            const newCell = document.createElement('td');

            newCell.classList.add('is-empty');
            newCell.setAttribute('data-column', cols);
            newCell.setAttribute('data-row', rows);
            newCell.setAttribute('data-num', 0);
            newCell.addEventListener('click', clickCell);
            newCell.addEventListener('mouseover', highlightColumn);
            newCell.addEventListener('mouseleave', resetColumns);

            newRow.appendChild(newCell);
        }
    }
    gridContainer.appendChild(t);
}
fiboInit();


// TODO: TEST FUNCTION
// POPULATE GRID WITH (HIDDEN) FIBO SEQS
function addFiboToGrid(x) {
    const fiboSeq = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];

    let iterations = x || 1;
    
    const startFibo = getRandomInt(0, (fiboSeq.length - 1) - checkSliceSize); // Last 2 numbers are not usable
    
    // get random position in grid
    const row = getRandomInt(0, gridRows - 1);
    const column = getRandomInt(0, gridCols - 1);
    const randomCell = document.querySelector(`td[data-column="${column}"][data-row="${row}"]`);

    randomCell.setAttribute('data-num', fiboSeq[startFibo] - 1);
    randomCell.innerText = fiboSeq[startFibo] - 1;

    const randomCell1 = document.querySelector(`td[data-column="${column + 1}"][data-row="${row}"]`);
    randomCell1.setAttribute('data-num', fiboSeq[startFibo + 1] - 1);
    randomCell1.innerText = fiboSeq[startFibo + 1] - 1;

    const randomCell2 = document.querySelector(`td[data-column="${column + 2}"][data-row="${row}"]`);
    randomCell2.setAttribute('data-num', fiboSeq[startFibo + 2] - 1);
    randomCell2.innerText = fiboSeq[startFibo + 2] - 1;

    const randomCell3 = document.querySelector(`td[data-column="${column + 3}"][data-row="${row}"]`);
    randomCell3.setAttribute('data-num', fiboSeq[startFibo + 3] - 1);
    randomCell3.innerText = fiboSeq[startFibo + 3] - 1;

    const randomCell4 = document.querySelector(`td[data-column="${column + 4}"][data-row="${row}"]`);
    randomCell4.setAttribute('data-num', fiboSeq[startFibo + 4] - 1);
    randomCell4.innerText = fiboSeq[startFibo + 4] - 1;
}
addFiboToGrid();