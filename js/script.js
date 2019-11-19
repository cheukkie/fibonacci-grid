// IMPORTS
import {
    getRandomInt,
    isSquare,
    convertToArray,
} from './utils.js';

// SETUP
const gridRows = 50;
const gridCols = 50;
const theSliceSize = 5;
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
    checkArraySlices(testRows, theSliceSize);
}


function fiboInit() {
    const t = document.createElement('TABLE');

    [...Array(gridRows).keys()].map(rowIndex => {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-row', rowIndex);
        t.appendChild(newRow);
        [...Array(gridCols).keys()].map(colIndex => {
            const newCell = document.createElement('td');

            newCell.classList.add('is-empty');
            newCell.setAttribute('data-column', colIndex);
            newCell.setAttribute('data-row', rowIndex);
            newCell.setAttribute('data-num', 0);
            newCell.addEventListener('click', clickCell);
            newCell.addEventListener('mouseover', highlightColumn);
            newCell.addEventListener('mouseleave', resetColumns);

            newRow.appendChild(newCell);
        });
    });
    gridContainer.appendChild(t);
}
fiboInit();

// POPULATE GRID WITH (HIDDEN) FIBO SEQS
function addFiboToGrid(x) {
    const fiboSeq = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];

    const iterations = x || 1;
    [...Array(iterations).keys()].map(i => {
        // get random position in grid
        const row = getRandomInt(0, (gridRows - 1) - theSliceSize); // Last 5 numbers are not usable
        const column = getRandomInt(0, (gridCols - 1) - theSliceSize);
        const startFibo = getRandomInt(0, (fiboSeq.length - 1) - theSliceSize);
        const flipCoin = getRandomInt(0, 2);
        [...Array(theSliceSize).keys()].map(n => {
            let randomCell;
            if (flipCoin === 0) {
                // row
                randomCell = document.querySelector(`td[data-column="${column + n}"][data-row="${row}"]`);
                randomCell.setAttribute('data-num', fiboSeq[startFibo + n] - 1);
                randomCell.innerText = fiboSeq[startFibo + n] - 1;
            } else {
                // column
                randomCell = document.querySelector(`td[data-column="${column}"][data-row="${row + n}"]`);
                randomCell.setAttribute('data-num', fiboSeq[startFibo + n] - 1);
                randomCell.innerText = fiboSeq[startFibo + n] - 1;
            }
        });
    });
}
addFiboToGrid(10);