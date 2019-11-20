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
let theFiboCounter = 0;

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

function highlightRowCol() {
    const colPos = this.getAttribute('data-column');
    const colRow = this.getAttribute('data-row');
    const highlightedCols = document.querySelectorAll(`td[data-column="${colPos}"]`);
    const highlightedRows = document.querySelectorAll(`td[data-row="${colRow}"]`);
    highlightedCols.forEach((cell) => {
        cell.classList.add('is-hover');
    });
    highlightedRows.forEach((cell) => {
        cell.classList.add('is-hover');
    });
}

function resetCols() {
    const highlightedCols = document.querySelectorAll('td.is-hover');
    highlightedCols.forEach((highlight) => {
        highlight.classList.remove('is-hover');
    });
}

function resetCells() {
    const fiboCells = document.querySelectorAll('.is-fibo');
    fiboCells.forEach(cell => {
        setTimeout(() => {
            cell.innerText = '';
            cell.setAttribute('data-num', 0);
            cell.setAttribute('data-next', 1);
            cell.classList.add('is-empty');
            cell.classList.remove('is-fibo', 'is-filled');
        }, 2000);
    });
}

function updateFiboCounter(){
    theFiboCounter++;
    document.querySelector('#fibo-counter').innerHTML = theFiboCounter;
}

function resetGrid() {
    const allCells = document.querySelectorAll('td');
    allCells.forEach(cell => {
        cell.innerText = '';
        cell.setAttribute('data-num', 0);
        cell.setAttribute('data-next', 1);
        cell.classList.add('is-empty');
        cell.classList.remove('is-fibo', 'is-filled');
    });
}

function changeGridSize() {
    const rowSize = parseInt(document.querySelector('#row-counter input').value, 10);
    const colSize = parseInt(document.querySelector('#col-counter input').value, 10);
    document.querySelector('#fibo-counter').innerHTML = 0;
    setupFibo(rowSize, colSize);
}

function updateCounters() {
    document.querySelector('#row-counter label span').innerHTML = document.querySelector('#row-counter input').value;
    document.querySelector('#col-counter label span').innerHTML = document.querySelector('#col-counter input').value;
    console.log('update');
}

function toggleOptions(){
    document.querySelector('#options').classList.toggle('is-visible');
    document.querySelector('#toggle-options').classList.toggle('is-visible');
}


// checks all nrs in array then makes slices of 5
// and checks if they are fibonacci and also if they are part of a fibonacci sequence
// this method only works when clicked on
function checkArraySlices(array, sliceSize) {
    array.forEach((value, index, arr) => {
        if (index < arr.length - (sliceSize - 1)) {
            const slice = arr.slice(index, (index + sliceSize)).map((x) => parseInt(x.getAttribute('data-num'), 10));
            if (slice.reduce((a, b) => a + b, 0) > 0) {
                if (isFiboSequence(slice) && slice.every((x) => isFibo(x))) {
                    // make cells empty
                    console.log(`index: ${index}`);
                }
            }
        }
    });
}

// Checks all row cells for fibonacci nr starting from 2 till end minus 2
// then puts all cells that qualify as fibonacci in an array with 2 previous siblings and 2 next siblings
// the array will be check if its an fibonacci sequence
// if so the cells will be cleared

// TODO: REFACTOR
// BUGFIX STARTING FROM LEFT
function checkAllRows() {
    [...Array(gridRows).keys()].map((rowIndex) => {
        const testRows = convertToArray(document.querySelectorAll(`td[data-row="${rowIndex}"]`));
        testRows.forEach((value, index, arr) => {
            const nr = parseInt(value.getAttribute('data-num'), 10);
            if (nr > 1 && isFibo(nr) && index > 2 && index < arr.length - 2) {
                const testArr = [
                    parseInt(value.previousElementSibling.previousElementSibling.getAttribute('data-num')),
                    parseInt(value.previousElementSibling.getAttribute('data-num')),
                    nr,
                    parseInt(value.nextElementSibling.getAttribute('data-num')),
                    parseInt(value.nextElementSibling.nextElementSibling.getAttribute('data-num')),
                ];
                const testSequence = isFiboSequence(testArr);
                if (testSequence) {
                    // console.log(testArr);
                    //console.log(`Row:${rowIndex} - start:${index - 2} - end: ${index + 2}`);
                    [...Array(5).keys()].map((i) => {
                        const fiboCell = document.querySelector(`td[data-row="${rowIndex}"][data-column="${index - 2 + i}"]`);
                        fiboCell.classList.add('is-fibo');
                    });
                    updateFiboCounter();
                }
            }
        });
    });
}

// TODO: REFACTOR
// BUGFIX STARTING FROM TOP
function checkAllCols() {
    [...Array(gridCols).keys()].map((colIndex) => {
        const testCols = convertToArray(document.querySelectorAll(`td[data-column="${colIndex}"]`));
        
        testCols.forEach((value, rowIndex, arr) => {
            const nr = parseInt(value.getAttribute('data-num'), 10);
            if (nr > 1 && isFibo(nr) && rowIndex > 2 && rowIndex < arr.length - 2) {
                //console.log(document.querySelector(`td[data-column="${colIndex}"][data-row="${rowIndex}"]`));
                
                const testArr = [
                    parseInt(document.querySelector(`td[data-column="${colIndex}"][data-row="${rowIndex-2}"]`).getAttribute('data-num')),
                    parseInt(document.querySelector(`td[data-column="${colIndex}"][data-row="${rowIndex-1}"]`).getAttribute('data-num')),
                    nr,
                    parseInt(document.querySelector(`td[data-column="${colIndex}"][data-row="${rowIndex+1}"]`).getAttribute('data-num')),
                    parseInt(document.querySelector(`td[data-column="${colIndex}"][data-row="${rowIndex+2}"]`).getAttribute('data-num')),
                ];
                const testSequence = isFiboSequence(testArr);
                if (testSequence) {
                    // console.log(testArr);
                    // console.log(`Column:${colIndex} - start:${rowIndex - 2} - end: ${rowIndex + 2}`);
                    [...Array(5).keys()].map((i) => {
                        const fiboCell = document.querySelector(`td[data-column="${colIndex}"][data-row="${rowIndex - 2 + i}"]`);
                        fiboCell.classList.add('is-fibo');
                    });
                }

            }
        });

    });
}


function addOne(cell) {
    const currentNumber = parseInt(cell.getAttribute('data-num'), 10);
    cell.classList.remove('is-empty');
    cell.classList.add('is-filled');
    cell.setAttribute('data-num', currentNumber + 1);
    cell.setAttribute('data-next', currentNumber + 2);
    cell.innerText = currentNumber + 1;

    cell.classList.add('is-clicked');
    setTimeout(() => {
        cell.classList.remove('is-clicked');
    }, 1000);
}

function clickCell(clickedCell) {
    clickedCell.currentTarget.setAttribute('data-num', clickedCell.currentTarget.getAttribute('data-num') - 1);

    const colId = clickedCell.currentTarget.getAttribute('data-column');
    const rowId = clickedCell.currentTarget.getAttribute('data-row');

    const allRows = document.querySelectorAll(`td[data-row="${rowId}"]`);
    const allCols = document.querySelectorAll(`td[data-column="${colId}"]`);

    allRows(rowId).forEach((cell) => {
        addOne(cell);
    });

    allCols(colId).forEach((cell) => {
        addOne(cell);
    });

    // This only works on single rows after click
    // const testRows = convertToArray(allRows);
    // checkArraySlices(testRows, theSliceSize);

    checkAllRows();
    checkAllCols();
    resetCells();
}

// POPULATE GRID WITH (HIDDEN) FIBO SEQS
function addFiboToGrid(x) {
    const fiboSeq = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];

    const iterations = x || 1;
    [...Array(iterations).keys()].map((i) => {
        // get random position in grid
        const rowSize = document.querySelector('#row-counter input').value;
        const colSize = document.querySelector('#col-counter input').value;

        const row = getRandomInt(0, (rowSize - 1) - theSliceSize); // Last 5 numbers are not usable
        const column = getRandomInt(0, (colSize - 1) - theSliceSize);
        const startFibo = getRandomInt(0, (fiboSeq.length - 1) - theSliceSize);
        const flipCoin = getRandomInt(0, 2);
        [...Array(theSliceSize).keys()].map((n) => {
            let randomCell;
            if (flipCoin === 0) {
                // row
                randomCell = document.querySelector(`td[data-column="${column + n}"][data-row="${row}"]`);
                randomCell.setAttribute('data-num', fiboSeq[startFibo + n]);
                randomCell.setAttribute('data-next', fiboSeq[startFibo + n] + 1);
                randomCell.classList.remove('is-empty');
                randomCell.classList.add('is-filled');
                randomCell.innerText = fiboSeq[startFibo + n];
            } else {
                // column
                randomCell = document.querySelector(`td[data-column="${column}"][data-row="${row + n}"]`);
                randomCell.setAttribute('data-num', fiboSeq[startFibo + n]);
                randomCell.setAttribute('data-next', fiboSeq[startFibo + n] + 1);
                randomCell.classList.remove('is-empty');
                randomCell.classList.add('is-filled');
                randomCell.innerText = fiboSeq[startFibo + n];
            }
        });
    });
}

function setupFibo(rowSize,colSize) {
    gridContainer.innerHTML = '';
    const t = document.createElement('table');

    [...Array(rowSize).keys()].map((rowIndex) => {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-row', rowIndex);
        t.appendChild(newRow);
        [...Array(colSize).keys()].map((colIndex) => {
            const newCell = document.createElement('td');

            newCell.classList.add('is-empty');
            newCell.setAttribute('data-column', colIndex);
            newCell.setAttribute('data-row', rowIndex);
            newCell.setAttribute('data-num', 0);
            newCell.setAttribute('data-next', 1);
            newCell.addEventListener('click', clickCell);
            newCell.addEventListener('mouseover', highlightRowCol);
            newCell.addEventListener('mouseleave', resetCols);

            newRow.appendChild(newCell);
        });
    });
    gridContainer.appendChild(t);
}

function init() {
    setupFibo(gridRows,gridCols);
    document.querySelector('#add-random-fibo').addEventListener('click', addFiboToGrid);
    document.querySelector('#reset-grid').addEventListener('click', resetGrid);
    document.querySelector('#change-grid').addEventListener('click', changeGridSize);
    document.querySelector('#toggle-options').addEventListener('click', toggleOptions);

    document.querySelector('#row-counter input').addEventListener('change', updateCounters);
    document.querySelector('#col-counter input').addEventListener('change', updateCounters);
    updateCounters();
}

init();

