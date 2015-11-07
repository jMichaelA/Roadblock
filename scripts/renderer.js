var mapImage = 'undefined';
var globalPosition = 'undefined';
var globalGeolocation = 'undefined';
navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);


//------------------------------------------------------------------
//  Overall structure of renderer.js provided by Dean Mathias
//------------------------------------------------------------------


/*jslint browser: true, white: true */
/*global CanvasRenderingContext2D, MYGAME */
// ------------------------------------------------------------------
//
//
// ------------------------------------------------------------------

MYGAME.graphics = (function() {
	'use strict';
	

	var canvas = document.getElementById('id-canvas'),
        context = canvas.getContext('2d');
    

    // Place a 'clear' function on the Canvas prototype, this makes it a part
    // of the canvas, rather than making a function that calls and does it.
	CanvasRenderingContext2D.prototype.clear = function () {
	    this.save();
	    this.setTransform(1, 0, 0, 1, 0, 0);
	    this.clearRect(0, 0, canvas.width, canvas.height);
	    this.restore();
	};

	function clear() {
	    context.clear();
	}


    //---------------------------------------------------
    //
    //  Person Factory Function
    //
    //---------------------------------------------------
	function Person(spec) {
	    var that = {};

	    that.getPos = function () {
	    	return {
				x: spec.x,
				y: spec.y,
				radius: spec.radius,
			};
	    };

	    that.dieF = function (val) {
	    	spec.dead = val;
	    };

	    that.isDead = function () {
	    	return spec.dead;
	    };

	    that.setPos = function (x, y) {
	        spec.x = x;
	        spec.y = y;
	    };
		
		that.setIter = function (iter) {
			spec.iter = iter;
		};
		
		that.detectMouse = function(x,y){
	        var mouseOverF = false;
			//var gameArea = document.getElementById('gameArea');
			var gameArea = $("#gameArea");

			/*console.log("canX and Y: "+x+" "+y+"\n");
			console.log("specX and Y: "+spec.x+" "+spec.y+"\n");
			console.log("canW and H: "+gameArea.width()+" "+gameArea.height()+"\n");
			*/
	        if (y > (spec.y - spec.height/2) && y < (spec.y + spec.height/2)) {
	            if (x > (spec.x - spec.width/2)  && x < (spec.x + spec.width/2)) {
	                mouseOverF = true;
					spec.sel = true;
	            }
	            else{
					spec.sel = false;
	            }
	        }
	        else{
	            spec.sel = false;
	        }
            
	        return mouseOverF;
	    };
		
		that.isClk = function() {
			return spec.sel;
		};
		
		that.setDeath = function(state) {
			spec.die = state;
		};
		
		that.getDirection = function(){
			return spec.direction;
		}

		that.setDirection = function(direction){
			spec.direction = direction;
		}

		that.getDeath = function() {
			return spec.die;
		};

	    that.goUp = function (elapsedTime){
			spec.imgTime += elapsedTime;
			
			if(spec.imgTime > 0.3){
				spec.iter = ((spec.iter+1)%4)+4;
				spec.imgTime = 0;
			}
			
			spec.y += spec.speed * elapsedTime * -1;
		};
		
		that.goDown = function (elapsedTime){
			spec.imgTime += elapsedTime;
			
			if(spec.imgTime > 0.3){
				spec.iter = (spec.iter+1)%4;
				spec.imgTime = 0;
			}
			
			spec.y += spec.speed * elapsedTime * 1; 
		};
		
		that.goLeft = function (elapsedTime){
			spec.imgTime += elapsedTime;
			
			if(spec.imgTime > 0.3){
				spec.iter = ((spec.iter+1)%4)+8;
				spec.imgTime = 0;
			}
			
			spec.x += spec.speed * elapsedTime * -1;
		};
		
		that.goRight = function (elapsedTime){
			spec.imgTime += elapsedTime;
			
			if(spec.imgTime > 0.3){
				spec.iter = ((spec.iter+1)%4)+12;
				spec.imgTime = 0;
			}
			
			spec.x += spec.speed * elapsedTime * 1;
		};

	    that.draw = function() {
			context.save();
			
			context.drawImage(
				spec.images[spec.iter],
				spec.x - spec.width/2, 
				spec.y - spec.height/2,
				spec.width, spec.height);
			
			context.restore();
		};

	    return that;
	}
	
	//---------------------------------------------------
    //
    //  Car Factory Function
    //
    //---------------------------------------------------
	function Car(spec) {
	    var that = {};

	    that.setPos = function (x, y) {
	        spec.x = x;
	        spec.y = y;
	    };

	    that.getDirection = function(){
			return spec.direction;
		}

		that.setDirection = function(direction){
			spec.direction = direction;
		}

	    that.setStopF = function(val, elapsedTime) {
	    	
	    	if(spec.stop === true && spec.stopTime >= 10){
	    		spec.stopTime = 0;	
	    	}
	    	
			if(spec.stopTime >= 2.5 && spec.stop === true){
	    		spec.stop = false;
	    	}
	    	else if(spec.stopTime >= 10){
	    		spec.stop = val;
	    	}
	    	
	    	if(spec.stopTime < 10){
	    		spec.stopTime += elapsedTime;
	    	}
	    	
	    };

	    that.setDetF = function(val) {
	    	spec.detour = val;
	    };

	    that.getFlags = function() {
	    	return {
				stop: spec.stop,
				detour: spec.detour,
			};
	    }

	    that.getPos = function () {
	    	return {
				x: spec.x,
				y: spec.y,
				radius: spec.radius,
			};
	    };

	    that.getWidth = function() {
			return spec.width;
		};

		that.getHeight = function() {
			return spec.height;
		};

	    that.goUp = function (elapsedTime){
			
			//console.log("stop: "+spec.stop+" stopTime: "+spec.stopTime);
			//console.log("UstopTime: "+spec.stopTime);
			if(spec.stop == false) {
				spec.rotation = (3.14/2); 
				spec.y += spec.speed * elapsedTime * -1;
			}
		};
		
		that.goDown = function (elapsedTime){
			//console.log("DstopTime: "+spec.stopTime);
			if(spec.stop == false) {
				spec.rotation = 3*(3.14/2);
				spec.y += spec.speed * elapsedTime * 1;
			}
			 
		};
		
		that.goLeft = function (elapsedTime){
			//console.log("LstopTime: "+spec.stopTime);
			if(spec.stop == false) {
				spec.rotation = 0;
				spec.x += spec.speed * elapsedTime * -1;
			} 
		};
		
		that.goRight = function (elapsedTime){
			//console.log("RstopTime: "+spec.stopTime);
			if(spec.stop == false) {
				spec.rotation = 3.14;
				spec.x += spec.speed * elapsedTime * 1;
			} 
		};

	    that.draw = function() {
			context.save();
			
			context.translate(spec.x, spec.y);
			context.rotate(spec.rotation);
			context.translate(-spec.x, -spec.y);
			
			context.drawImage(
				spec.image,
				spec.x - spec.width/2, 
				spec.y - spec.height/2,
				spec.width, spec.height);
			
			context.restore();
		};

	    return that;
	}

	//---------------------------------------------------
    //
    //  map Factory Function
    //
    //---------------------------------------------------
	function map(spec) {
	    var that = {};
	    // var position = {};

	    that.setPos = function (x, y) {
	        spec.x = x;
	        spec.y = y;
	    };

	    that.draw = function() {
			context.save();
			if(mapImage != 'undefined'){
				context.drawImage(
					mapImage,
					spec.x - spec.width/2, 
					spec.y - spec.height/2,
					spec.width, spec.height);
			}
			else{
				var position = {
					coords: {
						accuracy: 53,
						latitude: 40.7500,
						longitude: -111.8833
					}
				};
				var img = handle_geolocation_query(position);
				context.drawImage(
					mapImage,
					spec.x - spec.width/2, 
					spec.y - spec.height/2,
					spec.width, spec.height);
			}
			context.restore();
		};
	    return that;
	}

	//---------------------------------------------------
    //
    //  MAP ELEMENT Factory Function
    //
    //---------------------------------------------------

	function map_element(spec){
		var that = {};

		that.setPos = function(x,y){
			spec.x = x;
			spec.y = y;
		};

		that.getPos = function(){
			return {
				x: spec.x,
				y: spec.y,
				radius: spec.radius,
			};
		};

		that.getWidth = function() {
			return spec.width;
		};

		that.getHeight = function() {
			return spec.height;
		};

		that.getPlaced = function(){
			return spec.placed;
		};

		that.setPlaced = function(placed){
			spec.placed = placed;
		};

		that.draw = function(){
			context.save();
			if(spec.placed){
				context.drawImage(
					spec.image, 
					spec.x - spec.width/2, 
					spec.y - spec.height/2, 
					20, 
					20
				);
			}

			context.restore();
		};

		return that;
	}

	//---------------------------------------------------
	//	Hud Factory Function
	//
	//---------------------------------------------------

	function HUD(spec){
		var that = {};

		that.setPos = function(x, y){
			spec.x = x;
			spec.y = y;
		};

		that.getPos = function(){
			return {
				x: spec.x,
				y: spec.y
			};
		};

		that.setLevelPos = function(x, y){
			spec.levelX = x;
			spec.levelY = y;
		};

		that.getLevelPos = function(){
			return {
				x: spec.levelX,
				y: spec.levelY
			}
		};

		that.getLevel = function(){
			return spec.level;
		}

		that.setLevel = function(level){
			spec.level = level;
		}

		that.setWidth = function(width){
			spec.width = width;
		};

		that.getWidth = function(){
			return spec.width;
		};

		that.setHeight = function(height){
			spec.height = height;
		};

		that.getHeight = function(){
			return spec.height;
		};

		that.draw = function () {
	        context.save();
	        context.strokeStyle = 'black';
	        context.lineWidth = 3;
	        context.fillStyle = "#bbb";
	        context.strokeRect(spec.x,spec.y,spec.width,spec.height);
	        context.fillRect(spec.x,spec.y,spec.width,spec.height);

	    	//Draw rectangle for level
	    	context.strokeRect(spec.levelX - 10,spec.levelY - 30,150,spec.height);
	    	context.stroke();

	    	//Text for level
	    	context.font = '30px Arial';
	        context.textAlign = 'left';
	        context.textBaseline = 'middle';
	        context.fillStyle = 'black';
	        context.fillText('Level: ' + spec.level, spec.levelX, spec.levelY);

	        context.restore();
	    };

		return that;
	}

	//---------------------------------------------------
	//
	//	HUD Element Factory Function
	//
	//---------------------------------------------------
	function HUD_Element(spec){
		var that = {};

		that.getPos = function(){
			return {
				x: spec.x,
				y: spec.y
			};
		};

		that.getWidth = function(){
			return spec.x + 150;
		};

		that.setPos = function(x, y){
			spec.x = x;
			spec.y = y;
		};

		that.getPlacing = function(){
			return spec.placing;
		};

		that.setPlacing = function(sel){
			spec.placing = sel;
		};

		that.setPlaced = function(placed){
			spec.placed = placed;
		};

		that.getPlaced = function(){
			return spec.placed;
		};

		that.setCount = function(count){
			if(count >= 0){
				spec.count = count;
			}
		};

		that.getCount = function(){
			return spec.count;
		};

		that.setUsed = function(used_count){
			spec.usedMarkers = used_count;
		};

		that.getUsed = function(){
			return spec.usedMarkers;
		};

		that.detectMouse = function(x,y){
	        var mouseOverF = false;
			//var gameArea = document.getElementById('gameArea');
			var gameArea = $("#gameArea");

			//console.log("canX and Y: "+x+" "+y+"\n");
			//console.log("specX and Y: "+spec.x+" "+spec.y+"\n");
			//console.log("canW and H: "+gameArea.width()+" "+gameArea.height()+"\n");
			
	        if (y > (spec.y - spec.height/2) && y < (spec.y + spec.height/2)) {
	            if (x > (spec.x - spec.width/2)  && x < (spec.x + spec.width/2)) {
	                mouseOverF = true;
					spec.sel = true;
	            }
	            else{
					spec.sel = false;
	            }
	        }
	        else{
	            spec.sel = false;
	        }
            
	        return mouseOverF;
	    };
		
		that.isClk = function() {
			return spec.sel;
		};

		that.draw = function(){
			context.save();

			if(spec.placing){
	        	context.fillStyle = "#777";
				context.fillRect(spec.x - spec.width/2,spec.y - spec.height/2,spec.width + 75, spec.height);
			}

			context.drawImage(
				spec.image, 
				spec.x - spec.width/2, 
				spec.y - spec.height/2, 
				50, 
				50
			);

	       	context.font = '30px Arial';
	        context.textAlign = 'left';
	        context.textBaseline = 'middle';
	        context.fillStyle = 'black';
	       	context.fillText(spec.count, spec.x +40,spec.y);

			context.restore();
		};

		return that;
	}
    //---------------------------------------------------
    //
    //  Texture Factory Function
    //
    //---------------------------------------------------
	function Texture(spec) {
		var that = {};
		
		that.rotateRight = function(elapsedTime) {
			spec.rotation += spec.rotateRate * (elapsedTime / 1000);
		};
		
		that.rotateLeft = function(elapsedTime) {
			spec.rotation -= spec.rotateRate * (elapsedTime / 1000);
		};
		
		that.moveLeft = function(elapsedTime) {
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveRight = function(elapsedTime) {
			spec.center.x += spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveUp = function(elapsedTime) {
			spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveDown = function(elapsedTime) {
			spec.center.y += spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveTo = function(center) {
			spec.center = center;
		};
		
		that.draw = function() {
			context.save();
			
			context.translate(spec.center.x, spec.center.y);
			context.rotate(spec.rotation);
			context.translate(-spec.center.x, -spec.center.y);
			
			context.drawImage(
				spec.image, 
				spec.center.x - spec.width/2, 
				spec.center.y - spec.height/2,
				spec.width, spec.height);
			
			context.restore();
		};
		
		return that;
	}

    //---------------------------------------------------
    //
    //  Text Factory Function
    //
    //---------------------------------------------------
	function Text(spec) {
	    var that = {};

	    that.getHeight = function () {
	        context.font = spec.font;
	        context.textAlign = spec.align;
	        context.textBaseline = spec.baseLine;
	        return context.measureText('M').width;
	    };

	    that.getWidth = function () {

	        context.font = spec.font;
	        context.textAlign = spec.align;
	        context.textBaseline = spec.baseLine;
	        return context.measureText(spec.text).width;
	    }

	    that.getPos = function () {
	        return {
	            x: spec.x,
                y: spec.y
	        };
	    }

	    that.setColor = function (color) {
	        spec.textColor = color;
	    }

	    that.setPos = function (x,y) {
	        spec.x = x;
	        spec.y = y;
	    }

	    that.setText = function (text) {
	        spec.text = text;
	    }

	    that.draw = function () {
	        context.save();

	        context.font = spec.font;
	        context.textAlign = spec.align;
	        context.textBaseline = spec.baseLine;
	        context.fillStyle = spec.textColor;

	        context.fillText(spec.text, spec.x, spec.y);


	        context.restore();
	    };

	    return that;
	}


    //---------------------------------------------------
    //
    //  Function used to draw canvas backgrounds
    //
    //---------------------------------------------------
	function background(image) {
		    context.save();
		    context.drawImage(MYGAME.images[image], 0, 0, canvas.width, canvas.height);
		    context.restore();
	}

    //---------------------------------------------------
    //
    //  Function used to draw rounded Rectangles
    //
    //---------------------------------------------------
	function roundRect(x, y, w, h, radius, borderC, fillC,lineW) {
	    var r = x + w;
	    var b = y + h;
	    context.save();
	    context.beginPath();
	    context.strokeStyle = borderC;
	    context.fillStyle = fillC;
	    context.lineWidth = lineW;
	    context.moveTo(x, y);
	    context.lineTo(r, y);
	    context.lineTo(r, y + h);
	    context.lineTo(x, b);
	    context.lineTo(x, y);
	    context.fill();
	    context.stroke();
	    context.restore();
	}
	

	return {
	    clear: clear,
	    Texture: Texture,
	    Text: Text,
	    Person: Person,
		Car: Car,
	    map: map,
	    map_element: map_element,
	    HUD: HUD,
	    HUD_Element: HUD_Element,
	    background: background,
	    roundRect: roundRect,
	    canvas: canvas,
        context: context
	};
}());


function handle_errors(error){
		switch(error.code){
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

function handle_geolocation_query(position){
	globalPosition=position;
	getRoadLatLongs();

    var imageObj = new Image();
    imageObj.src = getGoogleMap(position.coords.latitude, position.coords.longitude);
    mapImage = imageObj;
}

function getRoadLatLongs(lat,longitude){
	if(lat !== 'undefined' && longitude !== 'undefined'){
		if(mapImage == 'undefined'){
			lat = 41.7419047;
			longitude = -111.81138809999999;
		}else{
			lat=globalPosition.coords.latitude;
			longitude=globalPosition.coords.longitude;
		}
	}
	  var coordinates = [
	    {lat: lat-.001, lng: longitude},
	    {lat: lat+.001, lng: longitude},
	    {lat: lat, lng: longitude-.001},
	    {lat: lat, lng: longitude+.001},
	    {lat: lat-.001, lng: longitude-.001},
	    {lat: lat+.001, lng: longitude+.001},
	    {lat: lat-.001, lng: longitude-.001},
	    {lat: lat+.001, lng: longitude+.001}
	  ];

	  // initializeMap(coordinates);
	 //  $.get('https://roads.googleapis.com/v1/snapToRoads', {
		//     interpolate: true,
		//     key: apiKey,
		//     path: localStorage.path
		// }, function(data) {
		//     processSnapToRoadResponse(data);
		//     drawSnappedPolyline();
	/*	    for(var i = 0; i < snappedCoordinates.length; i++){
		    	console.log(snappedCoordinates[i].lat());
		    	console.log(getCoordPixels(snappedCoordinates[i].lat(),snappedCoordinates[i].lng()));
		    }*/
		    //console.log(data);
		// });
}

function getGoogleMap(lat, longitude){
	var markers = "";
	// console.log(MYGAME.path);

	for(var i in window.globalGeolocation.results) {
		markers += "&markers=color:red%7Clabel:" + i + "%7C" + window.globalGeolocation.results[i].geometry.bounds.northeast.lat
		+ "," + window.globalGeolocation.results[i].geometry.bounds.northeast.lng +
		 "&markers=color:blue%7Clabel:" + i + "%7C" + window.globalGeolocation.results[i].geometry.bounds.southwest.lat + "," +
		 window.globalGeolocation.results[i].geometry.bounds.southwest.lng;
	}
	// console.log(markers);
	var canvas = document.getElementById('id-canvas');
    var image_source = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + lat + "," +
                    longitude + "&zoom=10&size="+canvas.width+"x"+
                    canvas.height+ markers + "&style=feature:road|element:geometry|weight:5.5|color:black|lightness:100&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true?key=AIzaSyB9-sOEES1LmBR83pxuLoJzsKWBqXZCa5k";
                    // console.log(image_source);
    return image_source;
}
