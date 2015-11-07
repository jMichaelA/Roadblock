
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
                y: graphics.canvas.height - (graphics.canvas.height / 11),
                width:graphics.canvas.width,
                height: graphics.canvas.width / 11,
                levelX: 10,
                levelY: graphics.canvas.height - (graphics.canvas.height / 25),
                level: 1,
                HUD_elements: [
                    [MYGAME.images['media/StopSign.png'], 1],
                    [MYGAME.images['media/Detour.png'], 1]
                ]
            });

            //--------------------------------
            //  HUD Element
            //--------------------------------
           /* hud_stop = graphics.HUD_Element({
                x: hud.getWidth() + 50,
                y: graphics.canvas.height - 45,
                image: MYGAME.images['media/StopSign.png'],
                count: 1
            });

            hud_detour = graphics.HUD_Element({

            });*/

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

            canX = e.clientX - gameArea.offsetLeft;
            canY = e.clientY - gameArea.offsetTop;

        };

		//--------------------------------
        //  CLICK FUNCTION
        //--------------------------------
        that.click = function (e) {
            

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
			
            //----------------------------------------------
            //  UPDATE VALUES
            //----------------------------------------------
            //Update Score
            /*scoreDisplay.setText(currentScore);

            //Update Game Time
            secCount += (elapsedTime / 1000);
            if (secCount >= 1) {
                sec++;
                secCount = 0;
                if (sec > 59) {
                    min++;
                    sec = 0;
                }
            }

            if (sec < 10) {
                timeDisplay.setText(min + ':0' + sec);
            }
            else {
                timeDisplay.setText(min + ':' + sec);
            }

            //Update Level
            levelDisplay.setText(level);
*/

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
			car1.draw();
			hud.draw();

            //Draw Info Box
            //graphics.roundRect((graphics.canvas.width / 10), (graphics.canvas.height / 4) * 3, graphics.canvas.width - (graphics.canvas.width / 10) * 2, (graphics.canvas.height / 4.5), 20, 'darkgreen', 'lightgreen', 4);

            //Draw Info Text
            //--------------------------------
            //  SCORE
            //--------------------------------
/*            tWidth = scoreText.getWidth();
            tHeight = scoreText.getHeight();
            tPos = scoreText.getPos();
            graphics.roundRect(tPos.x + tWidth + (tWidth / 4), tPos.y - tHeight / 1.5, tWidth * 1.5, tHeight * 1.5, 10, 'darkgreen', 'darkgreen', 1);
            scoreText.draw();
            scoreDisplay.draw();
            //--------------------------------
            //  TIME
            //--------------------------------
            tWidth = timeText.getWidth();
            tHeight = timeText.getHeight();
            tPos = timeText.getPos();
            graphics.roundRect(tPos.x + tWidth + (tWidth / 4), tPos.y - tHeight / 1.5, tWidth * 1.5, tHeight * 1.5, 10, 'darkgreen', 'darkgreen', 1);
            timeText.draw();
            timeDisplay.draw();
            //--------------------------------
            //  LEVEL
            //--------------------------------
            tWidth = levelText.getWidth();
            tHeight = levelText.getHeight();
            tPos = levelText.getPos();
            graphics.roundRect(tPos.x - tWidth / 4, tPos.y + tHeight, tWidth * 1.5, tHeight * 1.5, 10, 'darkgreen', 'darkgreen', 1);
            levelText.draw();
            levelDisplay.draw();*/


        };


        return that;

    }

    return {
        Menu: Menu
    };

}(MYGAME.graphics, MYGAME.input, MYGAME.gameStack));
