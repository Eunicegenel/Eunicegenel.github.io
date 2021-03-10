// chessLights JS
const chessboard = [];
var count = 1;
var idCount = 1;

for (var i = 0; i <= 63; i++) {
	chessboard.push("");
}

function newGame() {
	let board = document.querySelector(".chessBoard");
	createBoard(board);
	initialPlaces(board);
}

function createBoard(board) {
	for (var i = 1; i <= 32; i++) {
		var wBlock = document.createElement('div');
		wBlock.className = 'wBlock';
		wBlock.setAttribute("name", "none"); 
		var bBlock = document.createElement('div');
		bBlock.className = 'bBlock';
		bBlock.setAttribute("name", "none");
		var cell = document.createElement('div');
		cell.className = 'cell';
		var cell1 = document.createElement('div');
		cell1.className = 'cell';
		if(count%2===0) {
			board.appendChild(bBlock);
			board.appendChild(wBlock);
			wBlock.appendChild(cell);
			bBlock.appendChild(cell1);
			cell1.id = idCount;
			cell.id = idCount + 1;
		} else {
			board.appendChild(wBlock);
			board.appendChild(bBlock);
			wBlock.appendChild(cell);
			bBlock.appendChild(cell1);
			cell.id = idCount;
			cell1.id = idCount + 1;
		}
		idCount+=2;
		if (i%4===0) {
			count++;
		}
	}
}

function initialPlaces(board) {
	var wRook = document.getElementById("64").name;
	console.log(wRook);
}

newGame();