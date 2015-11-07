
MYGAME.menus['GamePlayState'] = (function (graphics, input, gameStack) {

    function Menu() {
        var that = {
            dead: false
        },

            //--------------------------------
            //  map object
            //--------------------------------            
            map = graphics.map( {
                x:  500, y: 500,
                width : 300, height : 350,
            }),
            //--------------------------------
            //  PERSON OBJECTS
            //--------------------------------
			person1 = graphics.Person( {
				image : MYGAME.images['media/WalkF_2.png'],
				x:	500, y: 500,
				width : 23, height : 32,
				speed : 2, //pixels per second
			}),
            
            //--------------------------------
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

            tWidth = 0,
            tHeight = 0,
            tPos = {},

            sec = 0,
            secCount = 0,
            min = 0,

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
			
            //----------------------------------------------
            //  UPDATE TEXT POSITIONS
            //----------------------------------------------
            scoreText.setPos((graphics.canvas.width / 10) * 1.5, ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15));
            scoreDisplay.setPos((graphics.canvas.width / 10) * 4.6, ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15));

            timeText.setPos((graphics.canvas.width / 10) * 1.5, ((graphics.canvas.height / 4) * 3) + ((graphics.canvas.width / 10) * 2));
            timeDisplay.setPos((graphics.canvas.width / 10) * 4.2, ((graphics.canvas.height / 4) * 3) + ((graphics.canvas.width / 10) * 2));

            tWidth = levelText.getWidth();
            tHeight = levelText.getHeight();
            tPos = levelText.getPos();
            levelText.setPos((graphics.canvas.width / 2) + (2 * (graphics.canvas.width / 10)), ((graphics.canvas.height / 4) * 3) + (graphics.canvas.width / 15));
            levelDisplay.setPos(tPos.x + tWidth / 2, tPos.y + tHeight + (tHeight / 1.5))

            //----------------------------------------------
            //  UPDATE VALUES
            //----------------------------------------------
            //Update Score
            scoreDisplay.setText(currentScore);

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


            //Check for GAME OVER
            if (min > 0) {

                gameStack[gameStack.length] = MYGAME.menus['GameOverState'].Menu();
                gameStack[gameStack.length - 1].initialize();

            }



        };

        that.render = function () {

            //Draw main background
            graphics.background('media/mainMenuBg.png');
			
            //--------------------------------
            //  DRAW Map
            //--------------------------------

            map.draw();

            //--------------------------------
            //  DRAW PERSON
            //--------------------------------

			person1.draw();
			
            //Draw Info Box
            graphics.roundRect((graphics.canvas.width / 10), (graphics.canvas.height / 4) * 3, graphics.canvas.width - (graphics.canvas.width / 10) * 2, (graphics.canvas.height / 4.5), 20, 'darkgreen', 'lightgreen', 4);

            //Draw Info Text
            //--------------------------------
            //  SCORE
            //--------------------------------
            tWidth = scoreText.getWidth();
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
            levelDisplay.draw();


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
