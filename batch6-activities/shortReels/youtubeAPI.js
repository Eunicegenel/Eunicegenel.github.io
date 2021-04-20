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

const API_KEY = 'api_key=21d8144b59aa5bdd7a78dde28a1c6e5b';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

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
	var OMDBurl = 'http://www.omdbapi.com/?apikey='+OMDBkey;
	
	$.ajax({
		method:'GET',
		url:OMDBurl+'&t='+movieTitle+'&y='+2021,
		success:function(data){
			console.log(data);
			document.getElementById('movieTitle').innerHTML = data.Title;
			document.getElementById('movieYear').innerHTML = data.Year;
			document.getElementById('movieActors').innerHTML = data.Actors;
			document.getElementById('moviePlot').innerHTML = data.Plot;
			if (data.Runtime === 'N/A') document.getElementById('movieRuntime').innerHTML = '0 min';
			else document.getElementById('movieRuntime').innerHTML = data.Runtime;
		}
	})
}

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
            </div>
        
        `

        main.appendChild(movieEl);
    })
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const searchTerm = search.value;
//     selectedGenre=[];
//     setGenre();
//     if(searchTerm) {
//         getMovies(searchURL+'&query='+searchTerm)
//     }else{
//         getMovies(API_URL);
//     }

// })

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
		<iframe class="ytVid" src="https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1&mute=0"></iframe>
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
	getMovies(API_URL);
	let movieNo = Math.floor(Math.random() * 10) + 0;
	globalCheck = movieNo
	loadVids(movieNo);
	setTimeout(function(){ 
	document.getElementById('cookieBG').style.backgroundColor = 'rgba(4,4,4,0.75)'; }, 1000);
});

// https://www.youtube.com/watch?v=9Bvt6BFf6_U