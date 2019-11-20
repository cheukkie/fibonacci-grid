// IMPORTS
import {
    getRandomInt,
    isSquare,
} from './utils.js';

// SETUP
const gridRows = 50;
const gridCols = 50;
const gridContainer = document.querySelector('#grid');
let theFiboCounter = 0;
let theSliceSize = 5;
let addSequenceSize = 5;

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
    fiboCells.forEach((cell) => {
        const currentCell = cell;
        setTimeout(() => {
            currentCell.innerText = '';
            currentCell.setAttribute('data-num', 0);
            currentCell.setAttribute('data-next', 1);
            currentCell.classList.add('is-empty');
            currentCell.classList.remove('is-fibo', 'is-filled');
        }, 1500);
    });
}

function updateFiboCounter() {
    theFiboCounter += 1;
    document.querySelector('#fibo-counter').innerHTML = theFiboCounter;
}

function updateSequenceSize() {
    addSequenceSize = parseInt(document.querySelector('#sequence-size input').value, 10);
    document.querySelector('#sequence-size label span').innerHTML = addSequenceSize;
}

function resetGrid() {
    const allCells = document.querySelectorAll('td');
    allCells.forEach((cell) => {
        const currentCell = cell;
        currentCell.innerText = '';
        currentCell.setAttribute('data-num', 0);
        currentCell.setAttribute('data-next', 1);
        currentCell.classList.add('is-empty');
        currentCell.classList.remove('is-fibo', 'is-filled');
    });
}

function updateCounters() {
    document.querySelector('#row-counter label span').innerHTML = document.querySelector('#row-counter input').value;
    document.querySelector('#col-counter label span').innerHTML = document.querySelector('#col-counter input').value;
}

function toggleOptions() {
    document.querySelector('#options').classList.toggle('is-visible');
    document.querySelector('#toggle-options').classList.toggle('is-visible');
}

// FIRST TRY
// checks all nrs in array then makes slices of 5
// and checks if they are fibonacci and also if they are part of a fibonacci sequence
// this method only works when clicked on

/*
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
*/

// SECOND TRY
// Checks all row cells for fibonacci nr starting from 2 till end minus 2
// then puts all cells that qualify as fibonacci in an array
// array starts with 2 previous siblings and ends with 2 next siblings
// the array will be checked if its an fibonacci sequence
// if so the cells will be cleared

// TODO implement slice size
function checkCells(axis = 'all', direction = 'regular') {
    let type = '';
    let arrayLength = '';
    if (axis === 'row') {
        type = 'row';
        arrayLength = parseInt(document.querySelector('#row-counter input').value, 10);
    }
    if (axis === 'column') {
        type = 'column';
        arrayLength = parseInt(document.querySelector('#col-counter input').value, 10);
    }

    if (axis === 'all') {
        if (direction === 'both') {
            checkCells('row', 'regular');
            checkCells('row', 'reversed');
            checkCells('column', 'regular');
            checkCells('column', 'reversed');
        } else {
            checkCells('row', direction);
            checkCells('column', direction);
        }
    }

    [...Array(arrayLength).keys()].map((xIndex) => {
        const testArray = document.querySelectorAll(`td[data-${type}="${xIndex}"]`);
        testArray.forEach((value, yIndex, arr) => {
            const currentCell = parseInt(value.getAttribute('data-num'), 10);
            if (
                isFibo(currentCell)
                && currentCell > 1 // only check if fib nr is above 1
                && yIndex >= 2 // dont check row/col pos -2
                && yIndex < arr.length - 2 // row/col length +2
            ) {
                let sequence = [...Array(5).keys()].map((i) => {
                    let query = '';
                    if (type === 'row') {
                        query = `td[data-row="${xIndex}"][data-column="${yIndex + (i - 2)}"]`;
                    }
                    if (type === 'column') {
                        query = `td[data-row="${yIndex + (i - 2)}"][data-column="${xIndex}"]`;
                    }
                    return parseInt(document.querySelector(query).getAttribute('data-num'), 10);
                });
                if (direction === 'reversed') {
                    sequence = sequence.reverse();
                }
                if (isFiboSequence(sequence)) {
                    [...Array(5).keys()].map((i) => {
                        let query = '';
                        if (type === 'row') {
                            query = `td[data-row="${xIndex}"][data-column="${yIndex + (i - 2)}"]`;
                        }
                        if (type === 'column') {
                            query = `td[data-row="${yIndex + (i - 2)}"][data-column="${xIndex}"]`;
                        }
                        const fiboCell = document.querySelector(query);
                        fiboCell.classList.add('is-fibo');
                    });
                    updateFiboCounter();
                }
            }
        });
    });
}

function addOne(cell) {
    const currentCell = cell;
    const currentNumber = parseInt(currentCell.getAttribute('data-num'), 10);
    currentCell.classList.remove('is-empty');
    currentCell.classList.add('is-filled');
    currentCell.setAttribute('data-num', currentNumber + 1);
    currentCell.setAttribute('data-next', currentNumber + 2);
    currentCell.innerText = currentNumber + 1;

    currentCell.classList.add('is-clicked');
    setTimeout(() => {
        cell.classList.remove('is-clicked');
    }, 1000);
}

function clickCell(clickedCell) {
    // Check if green cell is not visible
    if (document.querySelectorAll('.is-fibo').length === 0) {
        clickedCell.currentTarget.setAttribute('data-num', clickedCell.currentTarget.getAttribute('data-num') - 1);

        const colId = clickedCell.currentTarget.getAttribute('data-column');
        const rowId = clickedCell.currentTarget.getAttribute('data-row');

        const allRows = document.querySelectorAll(`td[data-row="${rowId}"]`);
        const allCols = document.querySelectorAll(`td[data-column="${colId}"]`);

        const checkAxis = document.querySelector('#check-axis').value;
        const checkDirection = document.querySelector('#check-direction').value;

        allRows.forEach((cell) => {
            addOne(cell);
        });

        allCols.forEach((cell) => {
            addOne(cell);
        });

        // This only works on single rows after click
        // const testRows = convertToArray(allRows);
        // checkArraySlices(testRows, theSliceSize);

        // checkCells('row');
        checkCells(
            checkAxis, // accepts row, column, all
            checkDirection, // accepts regular, reversed, both
        );
        resetCells();
    }
}

// POPULATE GRID WITH (HIDDEN) FIBO SEQS
function addFiboToGrid(iterations = 1) {
    let fiboSeq = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];

    [...Array(iterations).keys()].map(() => {
        // get random position in grid
        const rowSize = document.querySelector('#row-counter input').value;
        const colSize = document.querySelector('#col-counter input').value;

        if (getRandomInt(0, 2) !== 0) {
            fiboSeq = fiboSeq.reverse();
        }

        const row = getRandomInt(0, (rowSize - 1) - addSequenceSize); // Last 5 numbers are not usable
        const column = getRandomInt(0, (colSize - 1) - addSequenceSize);
        const startFibo = getRandomInt(0, (fiboSeq.length - 1) - addSequenceSize);
        const flipCoin = getRandomInt(0, 2);
        [...Array(addSequenceSize).keys()].map((n) => {
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

function setupFibo(rowSize, colSize) {
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

function changeGridSize() {
    const rowSize = parseInt(document.querySelector('#row-counter input').value, 10);
    const colSize = parseInt(document.querySelector('#col-counter input').value, 10);
    document.querySelector('#fibo-counter').innerHTML = 0;
    setupFibo(rowSize, colSize);
}

function init() {
    setupFibo(gridRows, gridCols);
    document.querySelector('#add-random-fibo').addEventListener('click', addFiboToGrid);
    document.querySelector('#reset-grid').addEventListener('click', resetGrid);
    document.querySelector('#change-grid').addEventListener('click', changeGridSize);
    document.querySelector('#toggle-options').addEventListener('click', toggleOptions);

    document.querySelector('#sequence-size input').addEventListener('change', updateSequenceSize);
    document.querySelector('#row-counter input').addEventListener('change', updateCounters);
    document.querySelector('#col-counter input').addEventListener('change', updateCounters);
    updateSequenceSize();
    updateCounters();
}

init();
addFiboToGrid(30);
