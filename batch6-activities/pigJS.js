var playerX = "";
var playerY = "";
var player1 = "";
var player2 = "";
var play1 = true;
var play2 = false;
var count1 = 0;
var count2 = 0;
var total1 = 0;
var total2 = 0;
var skirmish = false;
var campaign = false;
var conquest = false;
var winner = "";


function playersX(name) {
	playerX = name;
}

function playersY(name) {
	playerY = name;
}

function firstPlayer(playerX,playerY) {
	let pos1 = Math.floor(Math.random() * (7 - 1) + 1);
	let pos2 = Math.floor(Math.random() * (7 - 1) + 1);
	for (let i = 0; i <= 2; i++) {
		if (pos1 > pos2) {
			player1 = playerX;
			player2 = playerY;
			console.log(player1);
			console.log(player2);
			break;
		} else if (pos1 < pos2) {
			player1 = playerY;
			player2 = playerX;
			console.log(player1);
			console.log(player2);
			break;
		} else i--;
	}
}

function skirmishSelect() {
	skirmish = true;
	campaign = false;
	conquest = false;
	return skirmish;
}

function campaignSelect() {
	skirmish = false;
	campaign = true;
	conquest = false;
	return campaign;
}

function conquestSelect() {
	skirmish = false;
	campaign = false
	conquest = true;
	return conquest;
}

function diceRoll() {
	if (play1) {
		console.log(player1);
		let count = Math.floor(Math.random() * (7 - 1) + 1);
		if (count === 1) {
			console.log(0);
			changePlayer();
		} else {
			count1 += count;
			return count1;
		}
	} else if (play2) {
		console.log(player2);
		let count = Math.floor(Math.random() * (7 - 1) + 1);
		if (count === 1) {
			console.log(0);
			changePlayer();
		} else {
			count2 += count;
			return count2;
		}
	}
}

function holdCount() {
	if (play1) {
		total1 += count1;
		console.log(total1);
		if (skirmish) skirmishMatch();
		else if (campaign) campaignMatch();
		else if (conquest) conquestMatch();
	} else if (play2) {
		total2 += count2;
		console.log(total2);
		if (skirmish) skirmishMatch();
		else if (campaign) campaignMatch();
		else if (conquest) conquestMatch();
	}
}

function skirmishMatch() {
	if (play1) {
		console.log(total1);
		if (total1 >= 30) {
			winner = player1;
			return winner;
		} else changePlayer();
	} else if (play2) {
		console.log(total2);
		if (total2 >= 30) {
			winner = player2;
			return winner;
		} else changePlayer();
	} 
}

function campaignMatch() {
	if (play1) {
		if (total1 >= 60) {
			winner = player1;
			return winner;
		} else changePlayer();
	} else if (play2) {
		if (total2 >= 60) {
			winner = player2;
			return winner;
		} else changePlayer();
	} 
}

function conquestMatch() {
	if (play1) {
		if (total1 >= 100) {
			winner = player1;
			return winner;
		} else changePlayer();
	} else if (play2) {
		if (total2 >= 100) {
			winner = player2;
			return winner;
		} else changePlayer();
	} 
}

function changePlayer() {
	if (play1) {
		count1 = 0;
		play1 = false;
		play2 = true;
	} else if (play2) {
		count2 = 0;
		play2 = false;
		play1 = true;
	}
}

function play() {
	console.log("fuk");
	document.getElementById("up1").style.animation = "menuUp 1s ease forwards";
	document.getElementById("up2").style.animation = "menuUp 1s ease forwards";
	document.getElementById("up3").style.animation = "menuUp 1s ease forwards";
	document.getElementById("up4").style.animation = "menuUp 1s ease forwards";
	document.getElementById("gate1").style.animation = "menuLeft 1s ease forwards";
	document.getElementById("gate2").style.animation = "menuRight 1s ease forwards";
	document.getElementById("skirmishSelect").style.animation = "fadeInTop 1.5s ease forwards";
	document.getElementById("campaignSelect").style.animation = "fadeInTop 1.5s ease forwards";
	document.getElementById("conquestSelect").style.animation = "fadeInTop 1.5s ease forwards";
}
