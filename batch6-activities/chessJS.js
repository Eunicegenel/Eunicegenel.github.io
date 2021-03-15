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
		wBlock.setAttribute("capture", "1"); 
		wBlock.setAttribute("color", "none");
		var bBlock = document.createElement('div');
		bBlock.className = 'bBlock';
		bBlock.setAttribute("ondrop", "drop(event)");
		bBlock.setAttribute("ondragover", "allowDrop(event)"); 
		bBlock.setAttribute("capture", "1"); 
		bBlock.setAttribute("color", "none");
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
			cell1.id = idCount;
			cell.id = idCount + 1;
			bBlock.id = "a" + idCount;
			wBlock.id = "a" + (idCount + 1);
		} else {
			board.appendChild(wBlock);
			board.appendChild(bBlock);
			wBlock.appendChild(cell);
			bBlock.appendChild(cell1);
			cell.id = idCount;
			cell1.id = idCount + 1;
			wBlock.id = "a" + idCount;
			bBlock.id = "a" + (idCount + 1);
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

function pawnMoves(data,color,test) {
	index = test.match(/\d+/g);
	let pawns = []; 
	let counter = 8;
	let cellUp = document.getElementById(parseInt(data)-counter);
	let cellDown = document.getElementById(parseInt(data)+counter);

	if(cellUp.getAttribute("name") === "none"||cellDown.getAttribute("name") === "none") {
		if (index<=16&&color==="black") {
			do {
				pawns.push(parseInt(index)+parseInt(counter));
				counter*=2;
			} while (pawns.length<=1);

			for (let i in pawns) {
				let boardLight = document.getElementById("a"+(pawns[i]));
				boardLight.style.boxShadow = "inset 0px 0px 0px 3px white";
			}
			return pawns;
		} else if (color==="black") {
			pawns.push(parseInt(index)+parseInt(counter));
			let boardLight = document.getElementById("a"+(pawns));
			boardLight.style.boxShadow = "inset 0px 0px 0px 3px white";
			return pawns;
		}

		if (index>=49&&color==="white") {
			counter*=-1;
			do {
				pawns.push(parseInt(index)+parseInt(counter));
				counter*=2;
			} while (pawns.length<=1);

			for (let i in pawns) {
				let boardLight = document.getElementById("a"+(pawns[i]));
				boardLight.style.boxShadow = "inset 0px 0px 0px 3px white";
			}
			return pawns;
		} else if (color==="white") {
			counter*=-1;
			pawns.push(parseInt(index)+parseInt(counter));
			let boardLight = document.getElementById("a"+(pawns));
			boardLight.style.boxShadow = "inset 0px 0px 0px 3px white";
			return pawns;
		}
	} else return pawns;
}

function pawnCapture(event){

}

function knightMoves(index,color) {
	
}

function bishopMoves(index,color) {
	
}

function queenMoves(index,color) {
	
}

function kingMoves(index,color) {
	
}

function allowDrop(event) {
	event.preventDefault();
}

function drag(event) {
	event.dataTransfer.setData("text", event.target.id);
	let data = event.dataTransfer.getData("text");
	let eventParent = document.getElementById(data).parentElement.id;	
	let pieceName = document.getElementById(data).getAttribute("name");
	let pieceColor = document.getElementById(data).getAttribute("color");
	pawnMoves(data,pieceColor,eventParent); 
}

function drop(event) {
	event.preventDefault();
	let data = event.dataTransfer.getData("text");
	let eventParent = document.getElementById(data).parentElement.id;
	let eventTargetParent = event.target.parentElement;	
	let capture = eventTargetParent.getAttribute("capture");
	let pieceName = document.getElementById(data).getAttribute("name");
	let pieceColor = document.getElementById(data).getAttribute("color");

	let pawnValid = pawnMoves(data,pieceColor,eventParent);
	let validPawnCapture = pawnCapture(event);
	for (var i = 0; i <= pawnValid.length - 1; i++) {
		if(("a" + pawnValid[i]) === event.target.id) {
			capturePosition(event,data,capture,eventTargetParent);
			break;
		} else if ("a" + pawnValid[i] === "a" + event.target.id) {
			capturePosition(event,data,capture,eventTargetParent);
			break;
		}
	}


	
	for (var i = 1; i <= 64; i++) {
		document.getElementById("a"+i).style.boxShadow = "none";
	}
}

function capturePosition(event,data,capture,eventTargetParent) {
	let targetID = parseInt(event.target.id.match(/\d+/g));
	let color1 = document.getElementById(data).getAttribute("color");
	let color2 = document.getElementById(targetID).getAttribute("color");

	if (color1 !== color2) {
		if(capture !== null) {
			eventTargetParent.appendChild(document.getElementById(data));
			if (eventTargetParent.children[0] !== undefined) {
				eventTargetParent.children[0].remove();
				document.getElementById(data).setAttribute("id",targetID);
			}
		} else {
			if (event.target.children[0] !== undefined) event.target.children[0].remove();
			event.target.appendChild(document.getElementById(data));
			document.getElementById(data).setAttribute("id",targetID);
		}
	}
}

newGame();
