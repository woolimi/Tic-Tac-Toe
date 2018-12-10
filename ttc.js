let body = document.body;
let tb = document.createElement('table');
body.appendChild(tb);
let retryBtn = document.createElement('button');
retryBtn.textContent = 'RETRY ?';
retryBtn.addEventListener('click', function(){
    boxes.forEach(function(row){
        row.forEach(function(val){
            val.textContent = '';
            val.addEventListener('click', boxClick);
        });
    });
    winner.textContent = '';
});
body.appendChild(retryBtn);
let winner = document.createElement('h1');
body.appendChild(winner);

let boxes = []; //make empty array to fill 3x3 boxes
let turn = 'X';

//make table elements
for(let i=0; i<3;i++){
    let tr = document.createElement('tr');
    tb.appendChild(tr);
    let row = [];
    boxes.push(row);
    for(let j=0; j<3;j++){
        let td = document.createElement('td');
        td.addEventListener('click', boxClick);
        tr.appendChild(td);
        row.push(td);
    }
}

function boxClick(e){
    if(e.target.textContent === ''){
        e.target.textContent = turn;
        if(checkWin(turn)){
            //remove all eventListener
            removeEvents();
            // massage for winner
            winner.textContent = `Player ${turn} WIN !`
            //initialize first player
            turn = 'X';
        } else{
            turnChange(turn);
        }
    } else {
        console.log('already clicked');
    }
}

function turnChange(t){
    if(t === 'X') return turn = 'O';
    else return turn = 'X';
}

function checkWin(t){
    let result = false;
    //check row
    for(let i=0; i<3; i++){
        if(
            boxes[i][0].textContent === t &&
            boxes[i][1].textContent === t &&
            boxes[i][2].textContent === t
        ) result = true;
    }
    //check col
    for(let i=0; i<3; i++){
        if(
            boxes[0][i].textContent === t &&
            boxes[1][i].textContent === t &&
            boxes[2][i].textContent === t
        ) result = true;
    }
    //check diagonal
    if(
        boxes[0][0].textContent === t &&
        boxes[1][1].textContent === t &&
        boxes[2][2].textContent === t
    ) result = true;
    if(
        boxes[0][2].textContent === t &&
        boxes[1][1].textContent ===t &&
        boxes[2][0].textContent === t
    ) result = true;
    return result;
}

function removeEvents() {
    for(let i = 0; i<3; i++){
        for(let j=0; j<3; j++){
            boxes[i][j].removeEventListener('click', boxClick);
        }
    }
}
