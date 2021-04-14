var key = 'AIzaSyCn_-EZ7BeA4izRYj58lvnuXC0YhJaCGP8';
var playlistId = 'PLhDTzN_1ZTYCOMSbJKosoLpmezKvbvvBy';
var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

var options = {
	part : 'snippet',
	key : key,
	maxResults : 20,
	playlistId : playlistId 
}

function loadVids(movieNo) {
	$.getJSON(URL, options, function(data) {
		console.log(data);
		var id = data.items[movieNo].snippet.resourceId.videoId;
		console.log(id);
		let time = 0;

		switch(movieNo) {
			case 0:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/spaceJam2.png")';
				time = 143000;
				break;
			case 1:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/mitchells.png")';
				time = 140000;
				break;
			case 2:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/suicideSquad.png")';
				time = 139000;
				break;
			case 3:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/ghostbusters.png")';
				time = 140000;
				break;
			case 4:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/jupiterLegacy.png")';
				time = 143000;
				break;
			case 5:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/bigfootFamily.png")';
				time = 112000;
				break;
			case 6:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/loki.png")';
				time = 132000;
				break;
			case 7:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/rayaDragon.png")';
				time = 141000;
				break;
			case 8:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/cruella.png")';
				time = 116000;
				break;
			case 9:
				document.getElementById('test').style.backgroundImage = 'url("reelAsset/theUnholy.png")';
				time = 145000;
				break;
		}

		document.getElementById('test').setAttribute('onclick','controlVideo("playVideo",1,'+time+');');
		mainVid(id);
	})
}

function mainVid(id) {
	$('#video').html(`
		<iframe class="ytVid" src="https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
	`);
}

function controlVideo(vidcontrol,choice,time) {
    var div = document.getElementById("video");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + vidcontrol + '","args":""}', '*');
    document.getElementById('test').style.backgroundColor = 'rgba(4,4,4,0)';
    if(choice === 1) {
    	setTimeout(function(){ document.getElementById('test').style.opacity = '0'; }, 1000);
    	setTimeout(function(){ document.getElementById('test').style.opacity = '1'; 
		controlVideo('pauseVideo',0,0);}, time);
		setTimeout(function(){ document.getElementById('test').style.opacity = '1'; }, time-500);
		document.getElementById('test').setAttribute('onclick','none()');
    }
}

function none (){}

$(document).ready(function() {
	let movieNo = Math.floor(Math.random() * 10) + 0;
	loadVids(movieNo);	
});