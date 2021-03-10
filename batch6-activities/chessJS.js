// chessLights JS
const board = [];
var count = 1;

for (var i = 0; i <= 63; i++) {
	board.push("");
}

function newGame() {
	console.log(board);
	var board = document.querySelector(".chessBoard");
	
	for (var i = 1; i <= 32; i++) {
		var wBlock = document.createElement('div');
		wBlock.className = 'wBlock';
		var bBlock = document.createElement('div');
		bBlock.className = 'bBlock';
		
		if(count%2===0) {
			board.appendChild(bBlock);
			board.appendChild(wBlock);
		} else {
			board.appendChild(wBlock);
			board.appendChild(bBlock);
		}
		if (i%8===0) {
			count++;
			console.log(count);
		}

	}
 
	
}

newGame();