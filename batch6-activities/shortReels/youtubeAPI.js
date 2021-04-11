async function controlVideo(vidcontrol) {
    var div = document.getElementById("thevideo");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + vidcontrol + '","args":""}', '*');
    document.getElementById('test').style.backgroundColor = 'rgba(4,4,4,0)';
    setTimeout(function(){ document.getElementById('test').style.display = 'none'; }, 3000);
}




window.onload = function() {
    
};

// PAUSING YT VID 
// onClick="controlVideo('pauseVideo');"