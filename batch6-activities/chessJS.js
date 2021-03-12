// chessLights JS
const chessboard = [];
var count = 1;
var idCount = 1;
const rook = [1,8,57,64];
const knight = [2,7,58,63];
const bishop = [3,6,59,62];
const queen = [4,60];
const king = [5,61];
const pawn = [9,10,11,12,13,14,15,16,49,50,51,52,53,54,55,56];

for (var i = 0; i <= 63; i++) {
	chessboard.push("");
}

function newGame() {
	let board = document.querySelector(".chessBoard");
	createBoard(board);
	initialPlaces();
}

function createBoard(board) {
	for (var i = 1; i <= 32; i++) {
		var wBlock = document.createElement('div');
		wBlock.className = 'wBlock';
		wBlock.setAttribute("ondrop", "drop(event)"); 
		wBlock.setAttribute("ondragover", "allowDrop(event)"); 
		var bBlock = document.createElement('div');
		bBlock.className = 'bBlock';
		bBlock.setAttribute("ondrop", "drop(event)"); 
		bBlock.setAttribute("ondragover", "allowDrop(event)");
		var cell = document.createElement('div');
		cell.className = 'cell';
		cell.setAttribute("name", "none"); 
		cell.setAttribute("draggable", "true");
		cell.setAttribute("ondragstart", "drag(event)");
		var cell1 = document.createElement('div');
		cell1.className = 'cell';
		cell1.setAttribute("name", "none"); 
		cell1.setAttribute("draggable", "true");
		cell1.setAttribute("ondragstart", "drag(event)");
		if(count%2===0) {
			board.appendChild(bBlock);
			board.appendChild(wBlock);
			wBlock.appendChild(cell);
			bBlock.appendChild(cell1);
			bBlock.id = idCount;
			wBlock.id = idCount + 1;
		} else {
			board.appendChild(wBlock);
			board.appendChild(bBlock);
			wBlock.appendChild(cell);
			bBlock.appendChild(cell1);
			wBlock.id = idCount;
			bBlock.id = idCount + 1;
		}
		idCount+=2;
		if (i%4===0) {
			count++;
		}
	}
}

function initialPlaces() {
	piecePlacement(rook,"wRook","bRook","rook");
	piecePlacement(knight,"wKnight","bKnight","knight");
	piecePlacement(bishop,"wBishop","bBishop","bishop");
	piecePlacement(queen,"wQueen","bQueen","queen");
	piecePlacement(king,"wKing","bKing","king");
	piecePlacement(pawn,"wPawn","bPawn","pawn");
}

function piecePlacement(set,white,black,piece) {
	for (let i in set) {
		let pieces = document.getElementById(set[i]);

		if(pieces.id <= 16) {
			pieces.setAttribute("name", piece);
			pieces.setAttribute("color", "black");
			pieces.classList.add(black);
		} else {
			pieces.setAttribute("name", piece);
			pieces.setAttribute("color", "white");
			pieces.classList.add(white);
		}
	}
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const index = clickedCell.id;
    const character = clickedCell.getAttribute('name');
    const color = clickedCell.getAttribute('color');

    charMovement(index,character,color);
}

function charMovement(index,character,color) {
	switch(character) {
		case "pawn":
			pawnMoves(index,color);
		case "rook":
			rookMoves(index,color);
		case "knight":
			knightMoves(index,color);
		case "bishop":
			bishopMoves(index,color);
		case "queen":
			queenMoves(index,color);
		case "king":
			kingMoves(index,color);
	}
}

function pawnMoves(index,color) {
	let pawns = [];
	let counter = 8;
	if (index<=16&&color==="black") {
		do {
			pawns.push(parseInt(index)+parseInt(counter));
			counter*=2;
		} while (pawns.length<=1);

	console.log(pawns);
	for (let i in pawns) {
		document.getElementById(pawns[i]).parentElement.style.boxShadow = "inset 0px 0px 0px 3px white";
	}
	document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
	}
}

function rookMoves(index,color) {

}

function knightMoves(index,color) {
	
}

function bishopMoves(index,color) {
	
}

function queenMoves(index,color) {
	
}

function kingMoves(index,color) {
	
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

newGame();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
