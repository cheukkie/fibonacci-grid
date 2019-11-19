//SETUP
const gridRows = 50;
const gridCols = 50;
const gridContainer = document.querySelector('#grid');

function fiboInit() {
    const t = document.createElement('TABLE');

    for (let rows = 0; rows < gridRows; rows++) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-row', rows);
        t.appendChild(newRow);
        for (let cols = 0; cols < gridCols; cols++) {
            const newCell = document.createElement('td');
            const newCellInner = document.createElement('div');
            newCellInner.innerText = '1';
            newCell.appendChild(newCellInner);
            newCell.classList.add('is-empty');
            newCell.setAttribute('data-column', cols);
            newCell.setAttribute('data-row', rows);
            newCell.setAttribute('data-num', 0);

            newRow.appendChild(newCell);
        }
    }
    gridContainer.appendChild(t);
}
fiboInit();