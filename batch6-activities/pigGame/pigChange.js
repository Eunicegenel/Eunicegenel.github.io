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