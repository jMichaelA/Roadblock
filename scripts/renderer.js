var mapImage = 'undefined';

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
	    context.clear;
	}


    //---------------------------------------------------
    //
    //  Person Factory Function
    //
    //---------------------------------------------------
	function Person(spec) {
	    var that = {};

	    that.setPos = function (x, y) {
	        spec.x = x;
	        spec.y = y;
	    };

	    that.goUp = function (){
		
		};
		
		that.goDown = function (){
		
		};
		
		that.goLeft = function (){
		
		};
		
		that.goRight = function (){
		
		};

	    that.draw = function() {
			context.save();
			
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
			if(mapImage == 'undefined'){
				navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
			}
			if(mapImage != 'undefined'){
				setTimeout(function(){}, 1000);
				console.log(mapImage);
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
	    map: map,
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
    var image_source = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +
                    position.coords.longitude + "&zoom=14&size=300x400&markers=color:blue|label:U|" +
                    position.coords.latitude + ',' + position.coords.longitude;
    var imageObj = new Image();
    imageObj.src = image_source;
    mapImage = imageObj;
    console.log(mapImage);
}
