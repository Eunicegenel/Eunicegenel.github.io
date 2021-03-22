var playerX = "";
var playerY = "";
var player1 = "";
var player2 = "";
var play1 = false;
var play2 = false;
var count1 = 0;
var count2 = 0;
var total1 = 0;
var total2 = 0;
var winner = "";
var goa1 = 30;
var dice = 1;
var vsai = 0;
var charX = 0;
var charY = 0;
const charList = ['Red','Blue'];
var historyList = ["","","",""];

var btnClick = new Audio();
btnClick.src = "pigAssets/btnClick.mp3"

var woodClack = new Audio();
woodClack.src = "pigAssets/woodClack.mp3"

var diceRollSFX = new Audio();
diceRollSFX.src = "pigAssets/diceRollSFX.mp3"

var manHit = new Audio();
manHit.src = "pigAssets/manHit.mp3"

function skirmishSelect() {
	goal = 30;
	document.getElementById("skirmish").style.color = "#ffebcd";
	document.getElementById("skirmish").style.backgroundColor = "#4b8077";
	document.getElementById("campaign").style.color = "#fa991c";
	document.getElementById("campaign").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("campaign").style.borderColor = "#4b8077";
	document.getElementById("conquest").style.color = "#fa991c";
	document.getElementById("conquest").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("conquest").style.borderColor = "#4b8077";
}

function campaignSelect() {
	goal = 60;
	document.getElementById("campaign").style.color = "#ffebcd";
	document.getElementById("campaign").style.backgroundColor = "#4b8077";
	document.getElementById("skirmish").style.color = "#fa991c";
	document.getElementById("skirmish").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("skirmish").style.borderColor = "#4b8077";
	document.getElementById("conquest").style.color = "#fa991c";
	document.getElementById("conquest").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("conquest").style.borderColor = "#4b8077";
}

function conquestSelect() {
	goal = 100;
	document.getElementById("conquest").style.color = "#ffebcd";
	document.getElementById("conquest").style.backgroundColor = "#4b8077";
	document.getElementById("skirmish").style.color = "#fa991c";
	document.getElementById("skirmish").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("skirmish").style.borderColor = "#4b8077";
	document.getElementById("campaign").style.color = "#fa991c";
	document.getElementById("campaign").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("campaign").style.borderColor = "#4b8077";
}

function diceSelect() {
	dice = 1;
	document.getElementById("oneDice").style.color = "#ffebcd";
	document.getElementById("oneDice").style.backgroundColor = "#4b8077";
	document.getElementById("twoDie").style.color = "#fa991c";
	document.getElementById("twoDie").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("twoDie").style.borderColor = "#4b8077";
	document.getElementById("diceDetails").innerHTML = "Each turn, a player repeatedly<br>rolls a die until either a one is rolled<br>or the player decides to hold";
}

function dieSelect() {
	dice = 2;
	document.getElementById("twoDie").style.color = "#ffebcd";
	document.getElementById("twoDie").style.backgroundColor = "#4b8077";
	document.getElementById("oneDice").style.color = "#fa991c";
	document.getElementById("oneDice").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("oneDice").style.borderColor = "#4b8077";
	document.getElementById("diceDetails").innerHTML = "Mostly same rules as the one dice, if<br>a player manages to get one on both<br>dice, the total score is reset to zero";
}

function firstPlayer(playerX,playerY) {
	let pos1 = Math.floor(Math.random() * (7 - 1) + 1);
	let pos2 = Math.floor(Math.random() * (7 - 1) + 1);
	for (let i = 0; i <= 2; i++) {
		if (pos1 > pos2) {
			document.getElementById("aiRoll").style.display = "none";
			document.getElementById("aiHold").style.display = "none";
			play1 = true;
			player1 = playerX;
			player2 = playerY;
			historyList.unshift(player1 + " will be 1st Player");
			historyList.unshift(player2 + " will be 2nd Player");
			historyList.unshift(player1 + "'s Turn");
			break;
		} else if (pos1 < pos2) {
			play2 = true;
			player1 = playerY;
			player2 = playerX;
			historyList.unshift(player1 + " will be 1st Player");
			historyList.unshift(player2 + " will be 2nd Player");
			historyList.unshift(player1 + "'s Turn");
			if (vsai === 0) aimoves();
			break;
		} else i--;
	}
}

function showHistory() {
	if (historyList.length > 4) {
		for (let i = historyList.length; i > 4; i--) {
			historyList.pop();
		}
	}
	document.getElementById("hist1").innerHTML = historyList[0];
	document.getElementById("hist2").innerHTML = historyList[1];
	document.getElementById("hist3").innerHTML = historyList[2];
	document.getElementById("hist4").innerHTML = historyList[3];
}

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

function dice1Roll() {
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

function holdCount() {
	btnClick.play();
	if (play1) {
		total1 += count1;
		historyList.unshift(playerX + " held their points");
		historyList.unshift(playerX + " now has  total of " + total1);
		document.getElementById("totalLeft").innerHTML = playerX + " &nbsp" + total1;
		document.getElementById("pXCount").innerHTML = 0;
		if (goal === 30) skirmishMatch();
		else if (goal === 60) campaignMatch();
		else if (goal === 100) conquestMatch();
	} else if (play2) {
		total2 += count2;
		historyList.unshift(playerY + " held his points");
		historyList.unshift(playerY + " now has  total of " + total2);
		document.getElementById("totalRight").innerHTML = total2+ " &nbsp" + playerY;
		document.getElementById("pYCount").innerHTML = 0;
		if (goal === 30) skirmishMatch();
		else if (goal === 60) campaignMatch();
		else if (goal === 100) conquestMatch();
	}
}

function skirmishMatch() {
	if (play1) {
		if (total1 >= 30) {
			winner = playerX;
			historyList.unshift(winner + " is the Winner");
			showHistory();
			document.getElementById("winnerPost").style.display = "flex";
			document.getElementById("winningPlayer").innerHTML = winner + " wins with a total of " + total1;
		} else changePlayer();
	} else if (play2) {
		if (total2 >= 30) {
			winner = playerY;
			historyList.unshift(winner + " is the Winner");
			showHistory();
			document.getElementById("winnerPost").style.display = "flex";
			document.getElementById("winningPlayer").innerHTML = winner + " wins with a total of " + total2;
		} else changePlayer();
	} 
}

function campaignMatch() {
	if (play1) {
		if (total1 >= 60) {
			winner = playerX;
			historyList.unshift(winner + " is the Winner");
			showHistory();
			document.getElementById("winnerPost").style.display = "flex";
			document.getElementById("winningPlayer").innerHTML = playerX + " wins with a total of " + total1;
		} else changePlayer();
	} else if (play2) {
		if (total2 >= 60) {
			winner = playerY;
			historyList.unshift(winner + " is the Winner");
			showHistory();
			document.getElementById("winnerPost").style.display = "flex";
			document.getElementById("winningPlayer").innerHTML = playerY + " wins with a total of " + total2;
		} else changePlayer();
	} 
}

function conquestMatch() {
	if (play1) {
		if (total1 >= 100) {
			winner = playerX;
			historyList.unshift(winner + " is the Winner");
			showHistory();
			document.getElementById("winnerPost").style.display = "flex";
			document.getElementById("winningPlayer").innerHTML = playerX + " wins with a total of " + total1;
		} else changePlayer();
	} else if (play2) {
		if (total2 >= 100) {
			winner = playerY;
			historyList.unshift(winner + " is the Winner");
			showHistory();
			document.getElementById("winnerPost").style.display = "flex";
			document.getElementById("winningPlayer").innerHTML = playerY + " wins with a total of " + total2;
		} else changePlayer();
	} 
}

function changePlayer() {
	if (play1) {
		count1 = 0;
		play1 = false;
		play2 = true;
		historyList.unshift(playerY + "'s Turn");
		document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
		document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
		showHistory();
		aimoves(); 
	} else if (play2) {
		count2 = 0;
		play2 = false;
		play1 = true;
		historyList.unshift(playerX + "'s Turn");
		document.getElementById("playerX").setAttribute("src","pigAssets/red/redIdleRight.gif");
		document.getElementById("playerY").setAttribute("src","pigAssets/red/redIdleLeft.gif");
		document.getElementById("aiRoll").style.display = "none";
		document.getElementById("aiHold").style.display = "none";
		showHistory(); 
	}
}

function play() {
	difficulty = true;
	document.getElementById("up1").style.animation = "menuUp 1s ease forwards";
	document.getElementById("up2").style.animation = "menuUp 1s ease forwards";
	document.getElementById("up3").style.animation = "menuUp 1s ease forwards";
	document.getElementById("up4").style.animation = "menuUp 1s ease forwards";
	document.getElementById("gate1").style.animation = "menuLeft 1s ease forwards";
	document.getElementById("gate2").style.animation = "menuRight 1s ease forwards";
	document.getElementById("skirmish").style.color = "#ffebcd";
	document.getElementById("skirmish").style.backgroundColor = "#4b8077";
	document.getElementById("oneDice").style.color = "#ffebcd";
	document.getElementById("oneDice").style.backgroundColor = "#4b8077";
	document.getElementById("diceDetails").innerHTML = "Each turn, a player repeatedly<br>rolls a die until either a one is rolled<br>or the player decides to hold";
}

function changeID() {
	if (vsai === 1) {
		document.getElementById("playerYId").innerHTML = "Computer";
		vsai = 0;
		console.log(vsai);
	} else if (vsai === 0) {
		document.getElementById("playerYId").innerHTML = "Player";
		vsai = 1;
		console.log(vsai);
	}
}

function changeCharX() {
	if (charX === 0) {
		let newChar = charList[1];
		document.getElementById("playerXChar").innerHTML = newChar;
		charX = 1;
		console.log(vsai);
	} else if (charX === 1) {
		let newChar = charList[0];
		document.getElementById("playerXChar").innerHTML = newChar;
		charX = 0;
		console.log(vsai);
	}
}

function changeCharY() {
	if (charY === 0) {
		let newChar = charList[1];
		document.getElementById("playerYChar").innerHTML = newChar;
		charY = 1;
		console.log(vsai);
	} else if (charY === 1) {
		let newChar = charList[0];
		document.getElementById("playerYChar").innerHTML = newChar;
		charY = 0;
		console.log(vsai);
	}
}

function startGame() {
	document.getElementById("playNow").style.top = '-200vh';
	// document.getElementById("backPlayerXChar").style.top = '-200vh';
	// document.getElementById("nextPlayerXChar").style.top = '-200vh';
	document.getElementById("backPlayerYId").style.top = '-200vh';
	document.getElementById("nextPlayerYId").style.top = '-200vh';
	// document.getElementById("backPlayerYChar").style.top = '-200vh';
	// document.getElementById("nextPlayerYChar").style.top = '-200vh';
	document.getElementById("charX").style.top = '-200vh';
	document.getElementById("charY").style.top = '-200vh';
	document.getElementById("hideUnderlay").style.top = '0vh';

	setTimeout(function() { document.getElementById("playerX").style.top = '35%';
	document.getElementById("playerY").style.top = '35%';
	document.getElementById("scoreBoard").style.opacity = '1';
	document.getElementById("ruleBoard").style.display = 'grid';}, 500);

	setTimeout(function() { document.getElementById("ruleBoard").style.opacity = '1';
	document.getElementById("aiRoll").style.opacity = 1;
	document.getElementById("aiHold").style.opacity = 1;
	document.getElementById("pXCount").style.top = "20vh";
	document.getElementById("pYCount").style.top = "20vh"; }, 600);

	playerX = document.getElementById("playerXName").value; 
	playerY = document.getElementById("playerYName").value;

	if (playerX === "") playerX = "P1";
	document.getElementById("totalLeft").innerHTML = playerX + " &nbsp" + total1;

	if (playerY === ""&&vsai===0) playerY = "AI";
	else if (playerY === ""&&vsai===1) playerY = "P2";
	document.getElementById("totalRight").innerHTML = total2+ " &nbsp" + playerY;

	firstPlayer(playerX,playerY);
	showHistory(); 

	if (goal === 30) {
		document.getElementById("scoreTitle").innerHTML = "SKIRMISH";
		document.getElementById("moveHist").innerHTML = "MOVE HISTORY - RACE TO " + goal;
	}
	else if (goal === 60) {
		document.getElementById("scoreTitle").innerHTML = "CAMPAIGN";
		document.getElementById("moveHist").innerHTML = "MOVE HISTORY - RACE TO " + goal;
	}
	else if (goal === 100) {
		document.getElementById("scoreTitle").innerHTML = "CONQUEST";
		document.getElementById("moveHist").innerHTML = "MOVE HISTORY - RACE TO " + goal;
	}

	if (dice === 2) document.getElementById("dice2").style.display = "block";
}

function aimoves() {
	if (vsai === 0) {
		document.getElementById("aiRoll").style.display = "block";
		document.getElementById("aiHold").style.display = "block";
		if (dice === 1) {
			if (count2 === 0) setTimeout(diceRoll, 2500);
			else if (total2 + count2 >= goal) setTimeout(holdCount, 2500);
			else {
				let count = Math.floor(Math.random() * (7 - 1) + 1);
				if (count >= 2) setTimeout(diceRoll, 2500);
				else setTimeout(holdCount, 2500);
			}
		} else {
			if (count2 === 0) setTimeout(dualDiceRoll, 2500);
			else if (total2 + count2 >= goal) setTimeout(holdCount, 2500);
			else {
				let count = Math.floor(Math.random() * (7 - 1) + 1);
				if (count >= 2) setTimeout(dualDiceRoll, 2500);
				else setTimeout(holdCount, 2500);
			}
		}
	}
}

function reset() {
	playerX = "";
	playerY = "";
	player1 = "";
	player2 = "";
	play1 = false;
 	play2 = false;
	count1 = 0;
	count2 = 0;
	total1 = 0;
	total2 = 0;
	winner = "";
	goal = 30;
	dice = 1;
	vsai = 0;
	charX = 0;
	charY = 0;
	historyList.splice(0,4);
	historyList = ["","","",""];
	document.getElementById("hideUnderlay").style.top = '0vh';
	document.getElementById("playNow").style.top = '45vh';
	// document.getElementById("backPlayerXChar").style.top = '31vh';
	// document.getElementById("nextPlayerXChar").style.top = '31vh';
	document.getElementById("backPlayerYId").style.top = '62.5vh';
	document.getElementById("nextPlayerYId").style.top = '62.5vh';
	// document.getElementById("backPlayerYChar").style.top = '70.5vh';
	// document.getElementById("nextPlayerYChar").style.top = '70.5vh';
	document.getElementById("charX").style.top = '20vh';
	document.getElementById("charY").style.top = '60vh';
	document.getElementById("winnerPost").style.display = 'none';
	document.getElementById("playerX").style.top = '-200vh';
	document.getElementById("playerY").style.top = '-200vh';
	document.getElementById("scoreBoard").style.opacity = '0';
	document.getElementById("ruleBoard").style.display = 'none';
	document.getElementById("aiRoll").style.display = "none";
	document.getElementById("aiHold").style.display = "none";
	document.getElementById("pXCount").style.top = "-200vh";
	document.getElementById("pYCount").style.top = "-200vh";
}