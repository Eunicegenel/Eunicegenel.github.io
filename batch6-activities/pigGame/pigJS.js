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
var goal = 30;
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
	document.getElementById("hideUnderlay").style.top = '-200vh';

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

