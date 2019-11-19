//SETUP
const gridRows = 50;
const gridCols = 50;
const gridContainer = document.querySelector('#grid');


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