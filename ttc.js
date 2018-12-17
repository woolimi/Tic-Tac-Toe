const tbody = document.querySelector('#tbody')
const tr = tbody.children
const retryBtn = document.querySelector('#retryBtn')
retryBtn.addEventListener('click', reset)
const winner = document.querySelector('#winner')
let turn = 'X'

// initialize game
reset()

function boxClick (e) {
  if (e.currentTarget.textContent || turn === 'O') {
    return
  }
  if (e.currentTarget.textContent === '') {
    e.target.textContent = 'X'
    turnChange()
    if (checkWin('X')) {
      // remove all eventListener
      removeEvents()
      // massage for winner
      winner.textContent = `Player WIN !`
    } else {
      // computer play after 0.5sec
      setTimeout(computer, 500)
    }
  }
}

function turnChange () {
  (turn === 'X') ? turn = 'O' : turn = 'X'
}

function checkWin (t) {
  let result = false
  // check row
  for (let i = 0; i < 3; i++) {
    if (
      tr[i].children[0].textContent === t &&
      tr[i].children[1].textContent === t &&
      tr[i].children[2].textContent === t
    ) result = true
  }
  // check col
  for (let i = 0; i < 3; i++) {
    if (
      tr[0].children[i].textContent === t &&
      tr[1].children[i].textContent === t &&
      tr[2].children[i].textContent === t
    ) result = true
  }
  // check diagonal
  if (
    tr[0].children[0].textContent === t &&
    tr[1].children[1].textContent === t &&
    tr[2].children[2].textContent === t
  ) result = true
  if (
    tr[0].children[2].textContent === t &&
    tr[1].children[1].textContent === t &&
    tr[2].children[0].textContent === t
  ) result = true
  return result
}

function removeEvents () {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tbody.children[i].children[j].removeEventListener('click', boxClick)
    }
  }
}

function reset () {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tr[i].children[j].addEventListener('click', function (e) {
        boxClick(e)
      })
      tr[i].children[j].textContent = ''
    }
  }
  turn = 'X'
  winner.textContent = ''
}

// turn O
function computer () {
  if (!fillBlank()) {
    winner.textContent = `DRAW`
  }
  // check winner
  if (checkWin(turn)) {
    // remove all eventListener
    removeEvents()
    // massage for winner
    winner.textContent = `Computer WIN !`
  } else {
    // change back to user
    turnChange()
  }
}

function fillBlank () {
  // no blank, no fill
  const board = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board.push(tr[i].children[j])
    }
  }
  if (board.filter(v => !v.textContent).length === 0) {
    return false
  }

  // center
  if (!tr[1].children[1].textContent) {
    tr[1].children[1].textContent = 'O'
    return true
  }

  // 중앙을 거쳐가는 대각선, 십자가 -> 중앙을 안거치는 가로 2 세로 2 체크
  const checkList = [
    // 대각선
    [tr[0].children[0], tr[1].children[1], tr[2].children[2]],
    [tr[0].children[2], tr[1].children[1], tr[2].children[0]],
    // 십자가
    [tr[1].children[0], tr[1].children[1], tr[1].children[2]],
    [tr[0].children[1], tr[1].children[1], tr[2].children[1]],
    // 가로 2
    [tr[0].children[0], tr[0].children[1], tr[0].children[2]],
    [tr[2].children[0], tr[2].children[1], tr[2].children[2]],
    // 세로 2
    [tr[0].children[0], tr[1].children[0], tr[2].children[0]],
    [tr[0].children[2], tr[1].children[2], tr[2].children[2]]
  ]

  // 선 공격
  for (let i = 0; i < checkList.length; i++) {
    if (
      checkList[i].filter(v => v.textContent === 'O').length === 2 &&
      checkList[i].filter(v => !v.textContent).length === 1
    ) {
      checkList[i].filter(v => !v.textContent)[0].textContent = 'O'
      return true
    }
  }

  // 후 수비
  for (let i = 0; i < checkList.length; i++) {
    if (
      checkList[i].filter(v => v.textContent === 'X').length === 2 &&
      checkList[i].filter(v => !v.textContent).length === 1
    ) {
      checkList[i].filter(v => !v.textContent)[0].textContent = 'O'
      return true
    }
  }

  // 센터자리가 이미 차있고, 수비도 공격도 할 곳이 없고 모서리가 비어있으면 모서리에 둔다
  if (
    tr[1].children[1].textContent &&
    [board[0].textContent, board[2].textContent, board[6].textContent, board[8].textContent].includes('')
  ) {
    const edges = [board[0], board[2], board[6], board[8]]
    const emptyEdges = edges.filter(v => !v.textContent)
    emptyEdges.splice(Math.floor(Math.random() * emptyEdges.length), 1)[0].textContent = 'O'
    return true
  }

  // 대각선 조차도 막혔을 경우 랜덤으로 둔다
  const emptyBoard = board.filter(v => !v.textContent)
  emptyBoard.splice(Math.floor(Math.random() * emptyBoard.length), 1)[0].textContent = 'O'
  return true
}
