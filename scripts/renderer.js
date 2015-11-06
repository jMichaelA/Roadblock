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
    //  Game Board Factory Function
    //
    //---------------------------------------------------
	function Board(spec) {
	    var that = {};

	    that.setPos = function (x, y) {
	        spec.x = x;
	        spec.y = y;
	    };

	    that.setSize = function (w, h) {
	        spec.w = w;
	        spec.h = h;
	    };

	    that.doAction = function (){
	        spec.color = 'red';
	    };

	    that.detectMouse = function(x,y){
	        var mouseOverF = false;

	        if (y > (spec.y) && y < (spec.y + spec.h)) {
	            if (x > (spec.x)  && x < (spec.x + spec.w)) {
	                mouseOverF = true;
	                spec.color = 'brown';
	            }
	            else{
	                spec.color = 'tan';
	            }
	        }
	        else{
	            spec.color = 'tan';
	        }
            
	        return mouseOverF;
	    };

	    that.draw = function () {
	        context.save();

	        context.fillStyle = spec.color;
	        context.strokeStyle = spec.lineColor;
	        context.lineWidth = spec.lineW;
	        context.fillRect(spec.x, spec.y, spec.w, spec.h);
	        context.strokeRect(spec.x, spec.y, spec.w, spec.h);
                
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
		var google_tile = "http://maps.google.com/maps/api/staticmap?sensor=false&center=-34.397,150.644&zoom=8&size=300x400"
		var imageObj = new Image();
		imageObj.src = google_tile;

		var map;
	    context.save();
	    context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
	    // context.drawImage(MYGAME.images[image], 0, 0, canvas.width, canvas.height);
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
	    context.moveTo(x + radius, y);
	    context.lineTo(r - radius, y);
	    context.quadraticCurveTo(r, y, r, y + radius);
	    context.lineTo(r, y + h - radius);
	    context.quadraticCurveTo(r, b, r - radius, b);
	    context.lineTo(x + radius, b);
	    context.quadraticCurveTo(x, b, x, b - radius);
	    context.lineTo(x, y + radius);
	    context.quadraticCurveTo(x, y, x + radius, y);
	    context.fill();
	    context.stroke();
	    context.restore();
	}
	

	return {
	    clear: clear,
	    Texture: Texture,
	    Text: Text,
	    Board: Board,
        background: background,
	    roundRect: roundRect,
	    canvas: canvas,
        context: context
	};
}());
