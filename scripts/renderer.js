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

	    that.setPos = function (x, y) {
	        spec.x = x;
	        spec.y = y;
	    };
		
		that.setIter = function (iter) {
			spec.iter = iter;
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
	        context.rect(spec.x,spec.y,spec.width,spec.height); 
	    	context.stroke();
	    	context.fill();

	    	//Draw rectangle for level
	    	context.rect(spec.levelX - 10,spec.levelY - 40,150,spec.height);
	    	context.stroke();

	    	//Text for level
	    	context.font = '30px Arial';
	        context.textAlign = 'left';
	        context.textBaseline = 'middle';
	        context.fillStyle = 'black';
	        context.fillText('Level: ' + spec.level, spec.levelX, spec.levelY);

	        //Draw HUD elements
	        for(var i = 0; i < spec.HUD_elements.length; i++){
	        	context.drawImage(spec.HUD_elements[i][0], spec.levelX + 150*(i+1), spec.levelY - 28, 50, 50);
	        	context.fillText(spec.HUD_elements[i][1], spec.levelX + 60 + (150*(i+1)),spec.levelY);
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
	function background(image, lat, longitude) {
		if(typeof(lat) !== 'undefined' && typeof(longitude) !== 'undefined'){
			var google_tile = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" +lat + "," +
	                    longitude + "&zoom=14&size=300x400&markers=color:blue|label:U|" +
	                    lat + ',' + longitude;
		      
		    var imageObj = new Image();
		    imageObj.src = google_tile;
	    
		    // context.save();
		    context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
		    // context.drawImage(MYGAME.images[image], 0, 0, canvas.width, canvas.height);
		    // context.restore();
		}
		else{
		    context.save();
		     context.drawImage(MYGAME.images[image], 0, 0, canvas.width, canvas.height);
		    context.restore();
			
		}

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
	    HUD: HUD,
        background: background,
	    roundRect: roundRect,
	    canvas: canvas,
        context: context
	};
}());
