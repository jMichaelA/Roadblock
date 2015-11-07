
MYGAME.menus['GamePlayState'] = (function (graphics, input, gameStack) {

    function Menu() {
        var that = {
            dead: false
        },

            //--------------------------------
            //  map object
            //--------------------------------  
            map = graphics.map( {
                x:  graphics.canvas.width/2, 
                y: graphics.canvas.height/2,
                width : graphics.canvas.width, height : graphics.canvas.height,
            }),
            //  HUD Object
            //--------------------------------
            hud = graphics.HUD({
                x:0,
                y: graphics.canvas.height - 60,
                width:graphics.canvas.width,
                height: 60,
                levelX: 10,
                levelY: graphics.canvas.height - 30,
                level: 1
            });

            //--------------------------------
            //  HUD Element
            //--------------------------------
            hud_stop = graphics.HUD_Element({
                x: 200,
                y: graphics.canvas.height - 30,
                width:50,
                height:50,
                image: MYGAME.images['media/StopSign.png'],
                count: 1
            });

            hud_detour = graphics.HUD_Element({
                x: 350,
                y: graphics.canvas.height - 30,
                width:50,
                height:50,
                image: MYGAME.images['media/Detour.png'],
                count: 1
            });

            //--------------------------------
            //  PERSON OBJECTS
            //--------------------------------
			person1 = graphics.Person( {
				images : [MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_1.png'],MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_3.png'],
						MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_1.png'],MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_3.png'],	
						MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_1.png'],MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_3.png'],
						MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_1.png'],MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_3.png']],
				x:	500, y:300 ,
				width : 46, height : 64,
				speed : 15,	//pixels per second
				iter: 0,
				imgTime: 0,
				die: false,
				sel: false,
			}),
			
			person2 = graphics.Person( {
				images : [MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_1.png'],MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_3.png'],
						MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_1.png'],MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_3.png'],	
						MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_1.png'],MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_3.png'],
						MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_1.png'],MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_3.png']],
				x:	200, y:300 ,
				width : 46, height : 64,
				speed : 15,	//pixels per second
				iter: 0,
				imgTime: 0,
				die: false,
				sel: false,
			}),
			
			//--------------------------------
            //  CAR OBJECTS
            //--------------------------------
            
			car1 = graphics.Car( {
				image : MYGAME.images['media/car.png'],
				x:	700, y: 200 ,
				width : 128, height : 64,
				speed : 60,	//pixels per second
				rotation: 0,
			}),
			
			//--------------------------------
            //  OTHER VARS
            //--------------------------------

            tWidth = 0,
            tHeight = 0,
            tPos = {},

            sec = 0,
            secCount = 0,
            min = 0,
			tempTime = 0,
			tempTime2 = 0,

            currentScore = 0,
            level = 1,

            mouse = input.Mouse();

		//--------------------------------
        //  MOUSE OVER FUNCTION
        //--------------------------------
        that.mouseOver = function (e) {

            var canX = 0,
                canY = 0,
				gameArea = document.getElementById('gameArea');
				gameAreaJ = $("#gameArea"),
				gameWidth = gameAreaJ.width(),
				gameHeight = gameAreaJ.height();

			canX = e.clientX - gameArea.offsetLeft + document.documentElement.scrollLeft;
			canY = e.clientY - gameArea.offsetTop + document.documentElement.scrollTop;	
			
			person2.detectMouse(canX, canY);
            hud_stop.detectMouse(canX, canY);
            hud_detour.detectMouse(canX, canY);

        };

		//--------------------------------
        //  CLICK FUNCTION
        //--------------------------------
        that.click = function (e) {

			if(person2.isClk()){
				person2.setDeath(true);
			}

            if(hud_stop.isClk()){
                alert('stop');
            }

            if(hud_detour.isClk()){
                alert('detour');
            }
        };
		
		//--------------------------------
        //  INITIALIZE 
        //--------------------------------
        that.initialize = function () {
            
            mouse.registerCommand('mousemove', that.mouseOver);
            mouse.registerCommand('mousedown', that.click);

            that.dead = false;
            sec = 0;
            secCount = 0;
            min = 0;

            currentScore = 0;
            level = 1;
        }


		//--------------------------------
        //  UPDATE 
        //--------------------------------
        that.update = function (elapsedTime) {

            //UPDATE MOUSE
            mouse.update(elapsedTime);

			//----------------------------------------------
            //  UPDATE PERSON POSITION
            //----------------------------------------------
			tempTime += elapsedTime;
			
			if(tempTime <= 5){
				person1.goDown(elapsedTime);
			}
			else if(tempTime > 5 && tempTime <= 10){
				person1.goRight(elapsedTime);
			}
			else if(tempTime > 10 && tempTime <= 15){
				person1.goUp(elapsedTime);
			}
			else if(tempTime > 15 && tempTime <= 20){
				person1.goLeft(elapsedTime);
			}
			else{
				tempTime = 0;
			}
			
			//----------------------------------------------
            //  UPDATE CAR POSITION
            //----------------------------------------------
			tempTime2 += elapsedTime;
			
			if(tempTime2 <= 5){
				car1.goDown(elapsedTime);
			}
			else if(tempTime2 > 5 && tempTime2 <= 10){
				car1.goRight(elapsedTime);
			}
			else if(tempTime2 > 10 && tempTime2 <= 15){
				car1.goUp(elapsedTime);
			}
			else if(tempTime2 > 15 && tempTime2 <= 20){
				car1.goLeft(elapsedTime);
			}
			else{
				tempTime2 = 0;
			}

            //Check for GAME OVER
            if (min > 0) {

                gameStack[gameStack.length] = MYGAME.menus['GameOverState'].Menu();
                gameStack[gameStack.length - 1].initialize();

            }



        };

        that.render = function () {
			
            //--------------------------------
            //  DRAW Map
            //--------------------------------

            // map.draw();

            //--------------------------------
            //Clear Canvas
			graphics.clear();
			
			//Draw main background
			
			//--------------------------------
            //  DRAW PERSON
            //--------------------------------
            map.draw();
			person1.draw();
			if(!person2.getDeath()){
				person2.draw();
			}
			car1.draw();
			hud.draw();
            hud_stop.draw();
            hud_detour.draw();
        };


        return that;

    }

    return {
        Menu: Menu
    };

}(MYGAME.graphics, MYGAME.input, MYGAME.gameStack));
