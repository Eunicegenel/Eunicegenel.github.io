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