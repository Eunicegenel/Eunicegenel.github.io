var cookieCheck = false;
var globalCheck = 0;
var globalTimeout;
var movieList = ['Space Jam: A New Legacy', 'The Mitchells vs. the Machines', 'The Suicide Squad', 'Ghostbusters: Afterlife', 'Godzilla vs. Kong', 'Luca', 'Loki', 'Raya and the Last Dragon', 'Cruella', 'The Unholy'];


var YTkey = 'AIzaSyCn_-EZ7BeA4izRYj58lvnuXC0YhJaCGP8';
var YTplaylistId = 'PLhDTzN_1ZTYCOMSbJKosoLpmezKvbvvBy';
var YTURL = 'https://www.googleapis.com/youtube/v3/playlistItems';

var options = {
	part : 'snippet',
	key : YTkey,
	maxResults : 20,
	playlistId : YTplaylistId 
}

var OMDBkey = 'cbe59045';
var OMDBresult = '';

function loadVids(movieNo) {
	let time = getTime(movieNo);
	$.getJSON(YTURL, options, function(data) {
		var id = data.items[movieNo].snippet.resourceId.videoId;
		mainVid(id);
		clearTimeout(globalTimeout);
		getMovieData(movieNo);
		if (cookieCheck) { setTimeout(function(){ playVideo('playVideo',time); }, 2000); }
	})
}

function getMovieData(movieNo) {
	let movieTitle = movieList[movieNo];
	var OMDBurl = 'https://www.omdbapi.com/?apikey='+OMDBkey;
	
	$.ajax({
		method:'GET',
		url:OMDBurl+'&t='+movieTitle+'&y='+2021,
		success:function(data){
			console.log(data);
			document.getElementById('movieTitle').innerHTML = data.Title;
			document.getElementById('movieYear').innerHTML = data.Year;
			if (data.Runtime === 'N/A') document.getElementById('movieRuntime').innerHTML = '0 min';
			else document.getElementById('movieRuntime').innerHTML = data.Runtime;
		}
	})
}

function getTime(movieNo) {
	document.getElementById('overlay').style.opacity = '1';
	switch(movieNo) {
		case 0:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/spaceJam2.png")';
			return time = 143000;
		case 1:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/mitchells.png")';
			return time = 139000;
		case 2:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/suicideSquad.png")';
			return time = 138000;
		case 3:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/ghostbusters.png")';
			return time = 139000;
		case 4:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/gvk.png")';
			return time = 143000;
		case 5:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/luca.png")';
			return time = 83000;
		case 6:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/loki.png")';
			return time = 132000;
		case 7:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/rayaDragon.png")';
			return time = 140500;
		case 8:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/cruella.png")';
			return time = 116000;
		case 9:
			document.getElementById('overlay').style.backgroundImage = 'url("reelAsset/theUnholy.png")';
			return time = 145000;
	}
}

function mainVid(id) {
	$('#video').html(`
		<iframe class="ytVid" src="https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1"></iframe>
	`);
}

function playVideo(vidcontrol,time) {
    var div = document.getElementById("video");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + vidcontrol + '","args":""}', '*');
    setTimeout(function(){ document.getElementById('overlay').style.opacity = '0'; }, 2000);
    globalTimeout = setTimeout(function(){ pauseVideo('pauseVideo'); }, time);
}

function pauseVideo(vidcontrol) {
    document.getElementById('overlay').style.opacity = '1';
    setTimeout(function(){ 
    	var div = document.getElementById("video");
	    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
	    iframe.postMessage('{"event":"command","func":"' + vidcontrol + '","args":""}', '*');
	}, 1000);
}

function closeCookie() {
	document.getElementById('cookieM').style.display = 'none';
	document.getElementById('cookieBG').style.display = 'none';
}

document.getElementById("cookieM").addEventListener("click", function(){
	let time = getTime(globalCheck);
	cookieCheck = true;
    setTimeout(function(){ playVideo('playVideo',time); }, 2000);
});

document.getElementById("cookieBG").addEventListener("click", function(){
	let time = getTime(globalCheck);
	cookieCheck = true;
    setTimeout(function(){ playVideo('playVideo',time); }, 2000);
});

$(document).ready(function() {
	setTimeout(function(){ 
	document.getElementById('reelLayer').style.opacity = '0'; 
		setTimeout(function(){ 
		document.getElementById('reelLayer').style.display = 'none';
		}, 2000);
	}, 2000);

	let movieNo = Math.floor(Math.random() * 10) + 0;
	globalCheck = movieNo
	loadVids(movieNo);
	setTimeout(function(){ 
	document.getElementById('cookieBG').style.backgroundColor = 'rgba(4,4,4,0.75)'; }, 1000);
});
