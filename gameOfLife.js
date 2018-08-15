/* --------------- CELL --------------- */
// Declaration and "constructor" of CELL CLASS
// It is necessary to introduce the position it will occupy on the board
function Cell(posX, posY){
    this.status = 0; // 0: dead | 1: alive
    this.posX = posX; // Position in the board on X-axis
    this.posY = posY; // Position in the board on Y-axis
    this.neighbours = 0; // Number of neighbours
}

// Change status of CELL
Cell.prototype.changeStatus = function(){
    this.status = this.status ? 0 : 1;
}


// Returns TRUE if can reborn, FALSE if cannot, according to the rules
Cell.prototype.reborn = function(){
    return (!this.status && this.neighbours == 3) ? true : false;
}

// Returns TRUE if CELL is lonely, FALSE if is not, according to the rules
Cell.prototype.lonely = function(){
    return (this.status && this.neighbours < 2) ? true : false;
}

// Returns TRUE if there is overpopulation, FALSE if there is not, according to the rules
Cell.prototype.overpopulated = function(){
    return (this.status && this.neighbours > 3) ? true : false;
}



/* --------------- GAME --------------- */
// Declaration and "constructor" of GAME CLASS: 
// It is necessary to introduce the size of the board
function Game(size){
    this.size = size; // Size of the (square)board
    this.board = []; // Initializes the array which will contain the board
    this.createBoard();  // Creates the board
}

Game.prototype.createBoard = function(){
    for(var i = 0; i < this.size; i++){
        this.board[i] = []; // Set up the two-dimension array (matrix) which will represent the board
    }
    this.initBoard(); // Initializes the board
}

Game.prototype.initBoard = function(){
    for (var posX = 0; posX < this.size; posX++) {
        for (var posY = 0; posY < this.size; posY++){
            // For every position in the board (matrix) a CELL is created:
            this.board[posX][posY] = new Cell(posX, posY);
        }
    }
}

// To set the CELLS which are going to be alive at the moment of starting the game.
Game.prototype.setAlive = function(posX, posY){
    this.board[posX][posY].status = 1;
}

// Count the neighbours alive of a CELL in a given position
Game.prototype.countNeighbours = function(posX, posY){
    var counter = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++){
            if(posX + i >= 0 && posX + i < this.size && posY + j >= 0 && posY + j < this.size /*&& this.notItself(posX, posY, i, j)*/){
                counter += this.board[posX + i][posY + j].status;
            }
        }
    }
    this.board[posX][posY].neighbours = counter - this.board[posX][posY].status;
}

// Reproduces an iteration of the game
Game.prototype.nextIteration = function(){
    this.updateNeighbours(); 
    this.iterate();
}

// Prepares the iteration: updates the number of neighbours of every cell
Game.prototype.updateNeighbours = function(){
    for (var posX = 0; posX < this.size; posX++) {
        for (var posY = 0; posY < this.size; posY++){
            this.countNeighbours(posX, posY);
        }
    }
}

// Do the iteration
Game.prototype.iterate = function(){
    for (var posX = 0; posX < this.size; posX++) {
        for (var posY = 0; posY < this.size; posY++){
            // Check whether the CELL can reborn, is lonely or overpopulated to then, change its status
            if(this.board[posX][posY].reborn() || this.board[posX][posY].lonely() || this.board[posX][posY].overpopulated()){
                this.board[posX][posY].changeStatus();
            }
        }
    }
}

// Generates a simple visualization of the board at that moment
Game.prototype.printBoard = function(){
    var visual = "";
    for (var posY = 0; posY < this.size; posY++) {
        for (var posX = 0; posX < this.size; posX++){
            visual += (this.board[posX][posY].status == 1) ? "* " : "- ";
        }
        visual += "\n";
    }
    visual += "\n";
    return visual;
}



/* --------------- APPLICATION OF AN EXAMPLE --------------- */
// Creation of a board of size 3
var lifeGame = new Game(3);

// Printing board just initialized
console.log(lifeGame.printBoard());

// Set some alive CELLS to start
lifeGame.setAlive(0, 2);
lifeGame.setAlive(1, 1);
lifeGame.setAlive(2, 1);

// Visualize board with new CELLS alive
console.log(lifeGame.printBoard());

// Reproduce an iteration & visualize the changes
lifeGame.nextIteration();
console.log(lifeGame.printBoard());

// Reproduce an iteration & visualize the changes
lifeGame.nextIteration();
console.log(lifeGame.printBoard());