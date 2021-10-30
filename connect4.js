class Game {
  constructor(player1, player2) {
    this.currPlayer = player1
    this.players = [player1, player2]
    console.log(this.players)
    console.log(typeof this.players)
    console.
      // console.log(this.players[1].color)
      // console.log(this.currPlayer)
      // console.log(this.currPlayer.color)
      this.height = 6
    this.width = 7
    this.makeBoard()
    this.makeHtmlBoard()

    /*These are you initial object key-value pairs. They will be set every time when a new instance
    of Game is created (with keyword "new"). They can be accessed just like any other ex: newlyCreatedGame.height will be equal to 6  */

  }



  makeBoard() {
    this.board = []
    /*^here, when makeBoard is called (which is when new instance created), there will be a 
    board key added with a value of []. This will be added to the newlyCreatedGame object, which is what
    the keyword "this refers to.*/
    for (let y = 0; y < this.height; y++) {
      //^this.height is equivalent to saying newlyCreatedObject.height, once the new obj is created
      this.board.push(Array.from({ length: this.width }));
    }
  }



  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''
    //^ every time the makeHtmlBoard function is called, you set 

    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    this.boundedHandleClick = this.handleClick.bind(this)
    //^because handleClick is called in another function, the obj it will refer too is the 
    //window object. To avoid this error, we create a new reference to handleClick which
    //will be permanently bound to the new instance of the Game class.
    top.addEventListener('click', this.boundedHandleClick);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }



  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInHtmlTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    // if newGameObject.currPlayer is equal to newGameObject.player[0]  (both are objects), then set
    //newGameObject.currPlayer to be the second object of newGameObject.players array
  }



  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }



  placeInHtmlTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    // piece.classList.add(this.currPlayer.color);
    piece.style.backgroundColor = this.currPlayer.color
    //^"this", which refers to the new game object that will be created. 
    //^ currePlayer is an object with a key value pair of color = "user input". So to get access to the color we have to do the dot notation.
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }



  endGame(msg) {
    const top = document.querySelector('#column-top')
    top.removeEventListener('click', this.boundedHandleClick)
    alert(msg);

  }



  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color
  }

}


document.querySelector('#startButton').addEventListener('click', function () {
  const player1 = new Player(document.querySelector("#player1").value)
  //^create a new object that stores the player's choice of color. 
  const player2 = new Player(document.querySelector("#player2").value)
  // console.log(player1)
  // console.log(player1)
  new Game(player1, player2)
  //^create new instance of Game which takes as constructor parametres the 2 player objects
  //created above.
})






























