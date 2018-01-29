SC.initialize({
	client_id: "KEY_GOES_HERE"
});
var title = document.getElementById("__title__");
var artist = document.getElementById("__artist__")
var desc = document.getElementById("__desc__");
var genre = document.getElementById("__genre__")
var image = document.getElementById("__image__");

var index =  0;

var song;
function __onLoad__(){
	SC.stream("/tracks/339767079").then(function(response){
		song = response;
		song.play();
		display(339767079);
	});
}

var Player = {
	playing: true,
	playlist: ["339767079", "257659076", "339201164", "314316066", "280186218"], //	ID
	play: function(){
		if(this.playing === false){
			song.play();
			console.log("This is playing");
			document.getElementsByClassName("play")[0].innerHTML = "Pause"; 
			display(this.playlist[index]);
			this.playing = true;
		}
		else{
			song.pause();
			console.log("This is paused");
			document.getElementsByClassName("play")[0].innerHTML = "Play"; 
			this.playing = false;
		}
	},
	next: function(){
		if(index === this.playlist.length-1){
			index = 0;
			SC.stream("/tracks/" + this.playlist[index]).then(function(response){
				song = response;
				song.play();
				response.currentTime = 0;
			});
		}else{
			index++;
			SC.stream("/tracks/" + this.playlist[index]).then(function(response){
				song = response;
				song.play();
				response.currentTime = 0;
			});
		}
		display(this.playlist[index]);
	},
	previous: function(){
		if(index === 0){
			index++;
			index--;
			SC.stream("/tracks/" + this.playlist[index]).then(function(response){
				song = response;
				song.play();
				response.currentTime = 0;
			});
		}
		else{
			index--;
			SC.stream("/tracks/" + this.playlist[index]).then(function(response){
				song = response;
				song.play();
				response.currentTime = 0;
			});
		}
		display(this.playlist[index]);
	},
	pickTrack: function(){
		console.log("Test");
		__open__(this.playlist);
	}
}

function display(track_id){
	SC.get("/tracks/" + track_id).then(function(response) {
		console.log(response);
		title.innerHTML = "Title: " + response.title;
		artist.innerHTML = "Artist: " + response.user.username;
		desc.innerHTML = "Description: " + response.description;
		genre.innerHTML = "Genre: " + response.genre;
		image.setAttribute( "src", response.artwork_url);
	}); 
}

function __open__(playlist){
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	var list = document.getElementById("list");

	modal.style.display = "block";

	var __p__ = "";
	for(let i = 0; i < playlist.length; i++){
		SC.get("/tracks/" + playlist[i]).then(function(response) {
			__p__ += i + " " + response.title + "<br>";
			console.log(__p__);
		});
	}

	// playlist.forEachAsync(function(item){
	// 	SC.get("/tracks/" + item).then(function(response) {
	// 		__p__ +=" " + response.title + "<br>";
	// 		console.log(__p__);
	// 	});
	// });

	console.log(__p__);
	list.innerHTML = __p__;
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}



