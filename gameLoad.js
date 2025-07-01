// Drag and Drop Functionality
let dragState = {
  isDragging: false, // Whether we're currently dragging a piece (true/false)
  pieceElement: null, // The actual chess piece DOM element being dragged
  sourceSquare: null, // The original square the piece came from
  offsetX: 0, // The cursor position relative to the piece's top-left corner
  offsetY: 0,
};

// Get the Sprite image of the Chess pieces
const chessPiecesImg = (window.onload =
  document.getElementById("chess-pieces"));

// Creating the canvas elements containing the specific peace image
function createPiece(x, y, id) {
  const mySquare = document.getElementById(id);
  const canvasSquare = document.createElement("canvas");
  canvasSquare.style.width = `100%`;
  canvasSquare.style.height = `100%`;
  canvasSquare.style.cursor = `grab`;
  canvasSquare.addEventListener("mousedown", startDrag);

  let context = canvasSquare.getContext("2d");
  context.drawImage(chessPiecesImg, x, y, 300, 300, 0, 0, 300, 140);
  mySquare.appendChild(canvasSquare);
}

// conditions to place the Chess piece in its position
export function loadChessBoard(id) {
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
  console.log(e.target); // what piece we are dragging
  dragState.sourceSquare = e.target.parentElement; // From what square we are dragging
}
