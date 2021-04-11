
function diceRollGif(count) {
	document.getElementById("dice1").setAttribute("src","pigAssets/dice/diceRoll.gif");
	setTimeout(function() {
		if (count === 1) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice1.png");
		else if (count === 2) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice2.png");
		else if (count === 3) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice3.png");
		else if (count === 4) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice4.png");
		else if (count === 5) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice5.png");
		else if (count === 6) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice6.png");
	}, 500);
}

function dualDiceRollGif(dices1,dices2) {
	document.getElementById("dice1").setAttribute("src","pigAssets/dice/diceRoll.gif");
	document.getElementById("dice2").setAttribute("src","pigAssets/dice/diceRoll.gif");
	setTimeout(function() {
		if (dices1 === 1) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice1.png");
		else if (dices1 === 2) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice2.png");
		else if (dices1 === 3) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice3.png");
		else if (dices1 === 4) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice4.png");
		else if (dices1 === 5) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice5.png");
		else if (dices1 === 6) document.getElementById("dice1").setAttribute("src","pigAssets/dice/dice6.png");
		
		if (dices2 === 1) document.getElementById("dice2").setAttribute("src","pigAssets/dice/dice1.png");
		else if (dices2 === 2) document.getElementById("dice2").setAttribute("src","pigAssets/dice/dice2.png");
		else if (dices2 === 3) document.getElementById("dice2").setAttribute("src","pigAssets/dice/dice3.png");
		else if (dices2 === 4) document.getElementById("dice2").setAttribute("src","pigAssets/dice/dice4.png");
		else if (dices2 === 5) document.getElementById("dice2").setAttribute("src","pigAssets/dice/dice5.png");
		else if (dices2 === 6) document.getElementById("dice2").setAttribute("src","pigAssets/dice/dice6.png");
	}, 500);
}

function diceRoll() {
	diceRollSFX.play();
	if (dice === 2) dualDiceRoll();
	else {
		if (play1) {
			document.getElementById("aiRoll").style.display = "none";
			document.getElementById("aiHold").style.display = "none";
			let count = Math.floor(Math.random() * (7 - 1) + 1);
			if (count === 1) {
				diceRollGif(count);
				historyList.unshift(playerX + " rolled a 1");
				historyList.unshift(playerX + " now has 0 for the round");
				document.getElementById("pXCount").innerHTML = 0;
				document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
				document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
				changePlayer();
			}
			else {
				diceRollGif(count);
				count1 += count;
				historyList.unshift(playerX + " rolled a " + count);
				historyList.unshift(playerX + " now has " + count1);
				document.getElementById("pXCount").innerHTML = count1;
				document.getElementById("playerX").setAttribute("src","pigAssets/red/redSlashRight.gif");
				setTimeout(function() {
					document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
				}, 500);
				setTimeout(function() {
					manHit.play();
					document.getElementById("playerY").setAttribute("src","pigAssets/red/redHurt.gif");
				}, 500);
				document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
				showHistory(); 
			}
		} else if (play2) {
			let count = Math.floor(Math.random() * (7 - 1) + 1);
			if (count === 1) {
				diceRollGif(count);
				historyList.unshift(playerY + " rolled a 1");
				historyList.unshift(playerY + " now has 0 for the round");
				document.getElementById("pYCount").innerHTML = 0;
				document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
				document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
				changePlayer();
			}
			else {
				diceRollGif(count);
				count2 += count;
				historyList.unshift(playerY + " rolled a " + count);
				historyList.unshift(playerY + " now has " + count2);
				document.getElementById("pYCount").innerHTML = count2;
				showHistory();
				document.getElementById("playerY").setAttribute("src","pigAssets/red/redSlashLeft.gif");
				setTimeout(function() {
					document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
				}, 500);
				setTimeout(function() {
					manHit.play();
					document.getElementById("playerX").setAttribute("src","pigAssets/red/redHurt.gif");
				}, 300);
				document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
				if (vsai === 0) aimoves(); 
			}
		}
	}
}

function dualDiceRoll() {
	diceRollSFX.play();
	if (play1) {
		document.getElementById("aiRoll").style.display = "none";
		document.getElementById("aiHold").style.display = "none";
		let dices1 = Math.floor(Math.random() * (7 - 1) + 1);
		let dices2 = Math.floor(Math.random() * (7 - 1) + 1);
		dualDiceRollGif(dices1,dices2);
		if (dices1 === 1 || dices2 === 1) {
			historyList.unshift(playerX + " rolled a " + dices1 + " and a " + dices2);
			historyList.unshift(playerX + " now has 0 for the round");
			document.getElementById("pXCount").innerHTML = 0;
			document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
			document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
			changePlayer();
		} else if (dices1 === 1 && dices2 === 1) {
			total1 = 0;
			historyList.unshift(playerX + " rolled double 1");
			historyList.unshift(playerX + " now has 0 as total score");
			document.getElementById("totalLeft").innerHTML = playerX + " &nbsp" + total1;
			document.getElementById("pXCount").innerHTML = 0;
			document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
			document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
			changePlayer();
		} else {
			count1 = count1 + dices1 + dices2;
			historyList.unshift(playerX + " rolled a " + dices1 + " and a " + dices2);
			historyList.unshift(playerX + " now has " + count1);
			document.getElementById("pXCount").innerHTML = count1;
			document.getElementById("playerX").setAttribute("src","pigAssets/red/redSlashRight.gif");
			setTimeout(function() {
				document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
			}, 500);
			setTimeout(function() {
				manHit.play();
				document.getElementById("playerY").setAttribute("src","pigAssets/red/redHurt.gif");
			}, 500);
			document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
			showHistory();
		}
	} else if (play2) {
		let dices1 = Math.floor(Math.random() * (7 - 1) + 1);
		let dices2 = Math.floor(Math.random() * (7 - 1) + 1);
		dualDiceRollGif(dices1,dices2);
		if (dices1 === 1 || dices2 === 1) {
			historyList.unshift(playerY + " rolled a " + dices1 + " and a " + dices2);
			historyList.unshift(playerY + " now has 0 for the round");
			document.getElementById("pYCount").innerHTML = 0;
			document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
			document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
			changePlayer();
		} else if (dices1 === 1 && dices2 === 1) {
			total2 = 0;
			historyList.unshift(playerY + " rolled double 1");
			historyList.unshift(playerY + " now has 0 as total score");
			document.getElementById("totalRight").innerHTML = total2+ " &nbsp" + playerY;
			document.getElementById("pYCount").innerHTML = 0;
			document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
			document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
			changePlayer();
		} else {
			count2 = count2 + dices1 + dices2;
			historyList.unshift(playerY + " rolled a " + dices1 + " and a " + dices2);
			historyList.unshift(playerY + " now has " + count2);
			document.getElementById("pYCount").innerHTML = count2;
			document.getElementById("playerY").setAttribute("src","pigAssets/red/redSlashLeft.gif");
			setTimeout(function() {
				document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
			}, 500);
			setTimeout(function() {
				manHit.play();
				document.getElementById("playerX").setAttribute("src","pigAssets/red/redHurt.gif");
			}, 300);
			document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
			showHistory();
			if (vsai === 0) aimoves(); 
		}
	}
}