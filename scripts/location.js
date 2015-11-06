
function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
}
function handle_errors(error)
{
    switch(error.code)
    {
        case error.PERMISSION_DENIED: alert("user did not share geolocation data");
        break;
        case error.POSITION_UNAVAILABLE: alert("could not detect current position");
        break;
        case error.TIMEOUT: alert("retrieving position timed out");
        break;
        default: alert("unknown error");
        break;
    }
}
function handle_geolocation_query(position)
{
    var google_tile = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +
                    position.coords.longitude + "&zoom=14&size=300x400&markers=color:blue|label:U|" +
                    position.coords.latitude + ',' + position.coords.longitude;
    // var canvas = document.getElementById("myCanvas");
    // var context = canvas.getContext("2d");   
    var imageObj = new Image();
    imageObj.src = google_tile;
    changeBackground(imageObj);
    // imageObj.onload = function(){
    //   context.drawImage(imageObj, 0, 0);
    // }
}

function changeBackground(image){
    MYGAME.menus['MainMenuState'].Menu.graphics.background(image);
}