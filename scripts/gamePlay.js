
MYGAME.menus['GamePlayState'] = (function (graphics, input, gameStack) {

    function Menu() {
        var that = {
            dead: false
        },

            //--------------------------------
            //  HUD Object
            //--------------------------------
            hud = graphics.HUD({
                x:0,
                y:graphics.canvas.height - 75,
                width:graphics.canvas.width,
                height:75,
                levelX: 5,
                levelY: 0
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
			}),
            


            /*//--------------------------------
            //  TEXT OBJECTS
            //--------------------------------
            scoreText = graphics.Text({
                font: '24px Arial',
                align: 'left',
                textColor: 'black',
                text: 'Score:',
                baseLine: 'middle',
                x: (graphics.canvas.width / 10) * 1.5,
                y: ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15)
            }),
            scoreDisplay = graphics.Text({
                font: '20px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 0,
                baseLine: 'middle',
                x: (graphics.canvas.width / 10) * 4,
                y: ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15)
            }),
            timeText = graphics.Text({
                font: '24px Arial',
                align: 'left',
                textColor: 'black',
                text: 'Time:',
                baseLine: 'middle',
                x: (graphics.canvas.width / 10) * 1.5,
                y: ((graphics.canvas.height / 4) * 3) + ((graphics.canvas.width / 10) * 2)
            }),
            timeDisplay = graphics.Text({
                font: '20px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 0,
                baseLine: 'middle',
                x: (graphics.canvas.width / 10) * 4,
                y: ((graphics.canvas.height / 4) * 3) + ((graphics.canvas.width / 10) * 2)
            }),
            levelText = graphics.Text({
                font: '24px Arial',
                align: 'left',
                textColor: 'black',
                text: 'Level',
                baseLine: 'middle',
                x: (graphics.canvas.width / 2) + (2 * (graphics.canvas.width / 10)),
                y: ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15)
            }),
            levelDisplay = graphics.Text({
                font: '20px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 0,
                baseLine: 'middle',
                x: (graphics.canvas.width / 2) + (2 * (graphics.canvas.width / 10)),
                y: ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15)
            }),
*/
            tWidth = 0,
            tHeight = 0,
            tPos = {},

            sec = 0,
            secCount = 0,
            min = 0,
			tempTime = 0,

            currentScore = 0,
            level = 1,

            mouse = input.Mouse();


        that.mouseOver = function (e) {

            var canX = 0,
                canY = 0,
                gameArea = document.getElementById('gameArea');

            canX = e.clientX - gameArea.offsetLeft;
            canY = e.clientY - gameArea.offsetTop;

        };


        that.click = function (e) {
            

        };

        that.initialize = function () {

            //get location
            navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
            
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
                //Draw main background
                graphics.background(null, position.coords.latitude, position.coords.longitude)
            }
            
            mouse.registerCommand('mousemove', that.mouseOver);
            mouse.registerCommand('mousedown', that.click);

            that.dead = false;
            sec = 0;
            secCount = 0;
            min = 0;

            currentScore = 0;
            level = 1;
        }


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
            //  UPDATE TEXT POSITIONS
            //----------------------------------------------
            /*scoreText.setPos((graphics.canvas.width / 10) * 1.5, ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15));
            scoreDisplay.setPos((graphics.canvas.width / 10) * 4.6, ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15));

            timeText.setPos((graphics.canvas.width / 10) * 1.5, ((graphics.canvas.height / 4) * 3) + ((graphics.canvas.width / 10) * 2));
            timeDisplay.setPos((graphics.canvas.width / 10) * 4.2, ((graphics.canvas.height / 4) * 3) + ((graphics.canvas.width / 10) * 2));

            tWidth = levelText.getWidth();
            tHeight = levelText.getHeight();
            tPos = levelText.getPos();
            levelText.setPos((graphics.canvas.width / 2) + (2 * (graphics.canvas.width / 10)), ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15));
            levelDisplay.setPos(tPos.x + tWidth / 2, tPos.y + tHeight + (tHeight / 1.5))
*/
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

            //Clear Canvas
			graphics.clear();
			
			//Draw main background
			
			//--------------------------------
            //  DRAW PERSON
            //--------------------------------

			person1.draw();
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
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");   
    var imageObj = new Image();
    imageObj.src = google_tile;
    changeBackground(imageObj);
    // imageObj.onload = function(){
    //   context.drawImage(imageObj, 0, 0);
    // }
}

function changeBackground(image){
    graphics.background(image);
}

}(MYGAME.graphics, MYGAME.input, MYGAME.gameStack));
