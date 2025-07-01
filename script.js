// Creating the Chess Board
export const filesOrder = ["a", "b", "c", "d", "e", "f", "g", "h"]; // Array containing the files of the chess board
const chessPiecesImg = document.getElementById("chess-pieces"); // Get the Sprite image of the Chess pieces
let boardPosition = "straight"; // Initial position of the chess board
let boardSize = 1000; // Initial Size of the chess board

// Applying styles to the size of the chess board
const boardContainer = document.getElementById("board-container");
boardContainer.style.width = `${boardSize}px`;
boardContainer.style.height = `${boardSize}px`;
// Adapting the size of the outter box from the chess board
const outerBoardContainer = document.getElementById("outer-board");
outerBoardContainer.style.width = `${boardSize + 60}px`;
outerBoardContainer.style.height = `${boardSize + 60}px`;

// Function to create the squares on the chess board
function createBoardSquare(i, j, k) {
  const squareElement = document.createElement("div");

  squareElement.id = `${filesOrder[j]}${i}`;
  squareElement.style.width = `${boardSize / 8}px`;
  squareElement.style.height = `${boardSize / 8}px`;

  if (k % 2 == 0) {
    squareElement.classList.add("black");
  } else {
    squareElement.classList.add("white");
  }

  boardContainer.appendChild(squareElement);

  loadChessBoard(squareElement.id); // Loads inmediately the position of the chess pieces
}

// Initialize the board with the straight position
for (let i = 8, k = 1; i >= 1; i--, k++) {
  for (let j = 0; j <= 7; j++, k++) {
    createBoardSquare(i, j, k);
  }
}

// Files and Ranks
const stFilesRow = document.querySelector(".st-files-row");
const ndFilesRow = document.querySelector(".nd-files-row");
const stRanksColumn = document.querySelector(".st-ranks-column");
const ndRanksColumn = document.querySelector(".nd-ranks-column");

for (let i = 0; i <= 7; i++) {
  const stFilesPosition = document.createElement("div");
  stFilesPosition.textContent = `${filesOrder[i]}`;
  stFilesPosition.style.display = "flex";
  stFilesPosition.style.alignItems = "center";
  stFilesPosition.style.justifyContent = "center";
  stFilesPosition.style.fontWeight = "900";
  stFilesRow.appendChild(stFilesPosition);

  const ndFilesPosition = document.createElement("div");
  ndFilesPosition.textContent = `${filesOrder[i]}`;
  ndFilesPosition.style.display = "flex";
  ndFilesPosition.style.alignItems = "center";
  ndFilesPosition.style.justifyContent = "center";
  ndFilesPosition.style.fontWeight = "900";
  ndFilesRow.appendChild(ndFilesPosition);

  const stRanksPosition = document.createElement("div");
  stRanksPosition.textContent = `${i + 1}`;
  stRanksPosition.style.display = "flex";
  stRanksPosition.style.alignItems = "center";
  stRanksPosition.style.justifyContent = "center";
  stRanksPosition.style.fontWeight = "900";
  stRanksColumn.appendChild(stRanksPosition);

  const ndRanksPosition = document.createElement("div");
  ndRanksPosition.textContent = `${i + 1}`;
  ndRanksPosition.style.display = "flex";
  ndRanksPosition.style.alignItems = "center";
  ndRanksPosition.style.justifyContent = "center";
  ndRanksPosition.style.fontWeight = "900";
  ndRanksColumn.appendChild(ndRanksPosition);
}

// Change position event
const changePositionBtn = document.getElementById("changePosition");

changePositionBtn.addEventListener("click", () => {
  if (boardPosition == "straight") {
    boardPosition = "reversed";
    boardContainer.textContent = "";
    stFilesRow.style.flexDirection = "row-reverse";
    ndFilesRow.style.flexDirection = "row-reverse";
    stRanksColumn.style.flexDirection = "column";
    ndRanksColumn.style.flexDirection = "column";

    for (let i = 1, k = 1; i <= 8; i++, k++) {
      for (let j = 7; j >= 0; j--, k++) {
        createBoardSquare(i, j, k);
      }
    }
  } else if (boardPosition == "reversed") {
    boardPosition = "straight";
    boardContainer.textContent = "";
    stFilesRow.style.flexDirection = "row";
    ndFilesRow.style.flexDirection = "row";
    stRanksColumn.style.flexDirection = "column-reverse";
    ndRanksColumn.style.flexDirection = "column-reverse";

    for (let i = 8, k = 1; i >= 1; i--, k++) {
      for (let j = 0; j <= 7; j++, k++) {
        createBoardSquare(i, j, k);
      }
    }
  }
});

// Drag and Drop Functionality
let dragState = {
  isDragging: false, // Whether we're currently dragging a piece (true/false)
  pieceElement: null, // The actual chess piece DOM element being dragged
  sourceSquare: null, // The original square the piece came from
  offsetX: 0, // The cursor position relative to the piece's top-left corner
  offsetY: 0,
};

// Creating the canvas elements containing the specific peace image
function createPiece(x, y, id) {
  const mySquare = document.getElementById(id);
  const canvasSquare = document.createElement("canvas");
  canvasSquare.style.width = `${boardSize / 8}px`;
  canvasSquare.style.height = `${boardSize / 8}px`;
  canvasSquare.style.cursor = `grab`;
  canvasSquare.addEventListener("mousedown", startDrag); // why it starts at once???

  let context = canvasSquare.getContext("2d");
  context.drawImage(chessPiecesImg, x, y, 300, 300, 0, 0, 300, 140);
  mySquare.appendChild(canvasSquare);
}

// conditions to place the Chess piece in its position
function loadChessBoard(id) {
  if (id[1] === "2") {
    // Placing White Pawns
    createPiece(1500, 300, id);
  } else if (id[1] === "7") {
    // Placing Black Pawns
    createPiece(1500, 0, id);
  } else if (id === "a1" || id === "h1") {
    // Placing White Rooks
    createPiece(0, 300, id);
  } else if (id === "a8" || id === "h8") {
    // Placing Black Rooks
    createPiece(0, 0, id);
  } else if (id === "b1" || id === "g1") {
    // Placing White Knights
    createPiece(1200, 300, id);
  } else if (id === "b8" || id === "g8") {
    // Placing Black Knights
    createPiece(1200, 0, id);
  } else if (id === "c1" || id === "f1") {
    // Placing White Bishops
    createPiece(300, 300, id);
  } else if (id === "c8" || id === "f8") {
    // Placing Black Bishops
    createPiece(300, 0, id);
  } else if (id === "d1") {
    // Placing White Queen
    createPiece(600, 300, id);
  } else if (id === "d8") {
    // Placing Black Queen
    createPiece(600, 0, id);
  } else if (id === "e1") {
    // Placing White King
    createPiece(900, 300, id);
  } else if (id === "e8") {
    // Placing White King
    createPiece(900, 0, id);
  }
}

// Starting dragging the piece function
function startDrag(e) {
  dragState.isDragging = true; // We're dragging true
  dragState.pieceElement = e.target; // what piece we are dragging
  dragState.sourceSquare = e.target.parentElement; // From what square we are dragging

  // Giving styles to the original square
  const rect = e.target.getBoundingClientRect(); // Returns an object providing information about the rectangle of the element
  // Code to Grab the piece from where the cursor is
  // dragState.offsetX = e.clientX - rect.left; // We substract the position of the cursor from the top-left corner of the element
  // dragState.offsetY = e.clientY - rect.top;
  // Code to Grab the piece and place it at the center of the cursor
  dragState.offsetX = (rect.right - rect.left) / 2;
  dragState.offsetY = (rect.bottom - rect.top) / 2;

  // Setup move and end listener
  document.addEventListener("mousemove", duringDrag);
  document.addEventListener("mouseup", endDrag);
}

function duringDrag(e) {
  if (!dragState.isDragging) return; // As a caution of auto activation

  // Position the piece to follow the cursor while having the mousedown
  dragState.pieceElement.style.position = "fixed";
  dragState.pieceElement.style.left = `${e.clientX - dragState.offsetX}px`;
  dragState.pieceElement.style.top = `${e.clientY - dragState.offsetY}px`;
  dragState.pieceElement.style.zIndex = "1000"; // Applying style to bring the piece to the front
  dragState.sourceSquare.style.boxShadow = "inset 0px 0px 30px yellow"; // Applying styles to the original square
}

function endDrag(e) {
  if (!dragState.isDragging) return; // As a caution of auto activation

  document.removeEventListener("mousemove", duringDrag); // Removing the events as isDragging will remain as true
  document.removeEventListener("mouseup", endDrag);
  dragState.pieceElement.style.zIndex = "1"; // Removing from bringing the piece to the front
  dragState.sourceSquare.style.boxShadow = "none"; // Removing styles to the original square

  console.log("Drag ended");
}
