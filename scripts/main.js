let gmaeContainer = document.querySelector(".game");
let sizeGame = document.querySelectorAll(".size");
let oturnLogo = document.querySelector(".oturn");
let xturnLogo = document.querySelector(".xturn");
let restartButton = document.querySelector("#restart");
oturnLogo.classList.add("turn-off");

// Defualt Game size
function defualtGameSize() {
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        let attr = document.createAttribute("index");
        attr.value = i;
        square.setAttributeNode(attr);
        gmaeContainer.appendChild(square);
    }
}
defualtGameSize();

// choose game size
sizeGame.forEach((size) => {
    size.addEventListener("click", () => {
        removeSquares();
        creatSquares(size);
        gmaeContainer.classList.remove(gmaeContainer.classList[1]);
        setBoardSize(size);
        game(size.id);
        setWinConditions(size.id);
    });
});

// function to make squares by size
function creatSquares(size) {
    for (let i = 0; i < size.id * size.id; i++) {
        let square = document.createElement("div");
        gmaeContainer.appendChild(square);
        square.classList.add("square");
        let attr = document.createAttribute("index");
        attr.value = i;
        square.setAttributeNode(attr);
    }
}
// Function to set the container size
function setBoardSize(size) {
    if (+size.id === 4) {
        gmaeContainer.style.width = "430px";
        gmaeContainer.classList.add("four");
        let element = document.querySelectorAll(".square");
        element.forEach((s) => s.classList.add("four-square"));
    } else if (+size.id === 5) {
        gmaeContainer.style.width = "540px";
        gmaeContainer.classList.add("five");
        let element = document.querySelectorAll(".square");
        element.forEach((s) => s.classList.add("five-square"));
    } else {
        gmaeContainer.style.width = "320px";
    }
}

// function to delete squares
function removeSquares() {
    let square = document.querySelectorAll(".square");
    square.forEach((saq) => {
        saq.remove();
    });
}
let gameState;
let winConditions;
// function to initialize the game
function game(size) {
    let currentPlayer = "x";
    let box = document.querySelectorAll(".square");
    box.forEach((square) => {
        square.addEventListener("click", () => {
            if (currentPlayer === "x") {
                square.classList.add("x");
                square.style.pointerEvents = "none";
                xturnLogo.classList.add("turn-off");
                oturnLogo.classList.remove("turn-off");
                gameState[square.getAttribute("index")] = currentPlayer;
                currentPlayer = "o";
            } else {
                square.classList.add("o");
                square.style.pointerEvents = "none";
                oturnLogo.classList.add("turn-off");
                xturnLogo.classList.remove("turn-off");
                gameState[square.getAttribute("index")] = currentPlayer;
                currentPlayer = "x";
            }
            checkWinner(size);
            checkDraw();
        });
    });
    setWinConditions(size);
}
game(3);
// function to set winning conditions based
function setWinConditions(size) {
    if (+size === 5) {
        gameState = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
        winConditions = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20],
        ];
    } else if (+size === 4) {
        gameState = ["","","","","","","","","","","","","","","",""];
        winConditions = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [0, 5, 10, 15],
            [3, 6, 9, 12],
        ];
    } else {
        gameState = ["", "", "", "", "", "", "", "", ""];
        winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    }
}
// function to check the winner based on the game size
let win;
function checkWinner(size) {
    +size !== 4 && +size !== 5 ? (size = 3) : size;
    const winningLength = +size;
    for (let i = 0; i < winConditions.length; i++) {
        const indices = winConditions[i];
        const firstValue = gameState[indices[0]];

        if (firstValue === "") continue;

        win = true;
        for (let j = 1; j < winningLength; j++) {
            if (gameState[indices[j]] !== firstValue) {
                win = false;
                break;
            }
        }

        if (win) {
            winMessage(firstValue);
            return;
        }
    }
}

// function restart
function restart() {
    removeSquares();
    defualtGameSize();
    setBoardSize(0);
    gmaeContainer.classList.remove(gmaeContainer.classList[1]);
    game(0);
    setWinConditions(0);
    xturnLogo.classList.remove("turn-off");
    oturnLogo.classList.add("turn-off");
}
// adding event to the restart button
restartButton.addEventListener("click", restart);

// function to display the win message
function winMessage(playerWinner) {
    gmaeContainer.style.pointerEvents = "none";
    let div = document.createElement("div");
    let text = document.createElement("p");
    let span = document.createElement("span");
    let button = document.createElement("button");
    button.id = "new-game";
    span.textContent = playerWinner;
    text.textContent = ` WIN : `;
    text.appendChild(span);
    button.innerHTML = "New Game";
    div.id = "win-message";
    div.appendChild(text);
    div.appendChild(button);
    document.body.appendChild(div);
    // new game button
    let newGame = document.querySelector("#new-game");
    newGame.addEventListener("click", () => {
        restart();
        div.remove();
        gmaeContainer.style.pointerEvents = "auto";
    });
}
// function to check the draw 
function checkDraw() {
    let che = gameState.filter((s) => {
        return s == "";
    });
    if (che.length == 0 && win == false) {
        drawMessage();
    }
}
// function to display the draw message
function drawMessage() {
    gmaeContainer.style.pointerEvents = "none";
    let div = document.createElement("div");
    let span = document.createElement("span");
    let button = document.createElement("button");
    button.id = "new-game";
    span.textContent = "Draw!";
    button.innerHTML = "New Game";
    div.id = "draw-message";
    div.appendChild(span);
    div.appendChild(button);
    document.body.appendChild(div);
    // new game button
    let newGame = document.querySelector("#new-game");
    newGame.addEventListener("click", () => {
        restart();
        div.remove();
        gmaeContainer.style.pointerEvents = "auto";
    });
}
