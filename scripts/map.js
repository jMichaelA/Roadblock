var google_tile = "http://maps.google.com/maps/api/staticmap?sensor=false&center=-34.397,150.644&zoom=8&size=300x400"
var canvas = document.getElementById("id-canvas");

var imageObj = new Image();
imageObj.src = google_tile;
var context = canvas.getContext("2d");

var map;
function initMap() {
	imageObj.onload = function(){
	context.drawImage(imageObj, 0, 0);
}
}