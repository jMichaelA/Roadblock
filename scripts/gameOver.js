
MYGAME.menus['GameOverState'] = (function (graphics, input, gameStack) {

    function Menu() {
        var that = {
            gameOver: false
        },
            gameOverText = graphics.Text({
                font: '36px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'Game Over',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3)
            }),
            curScoreText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'Current Score:',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3) + ((graphics.canvas.height / 3) / 4)
            }),
            backText = graphics.Text({
                font: '28px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'Back',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3) + ((graphics.canvas.height / 3) / 2) * 2
            }),
            tWidth = 0,
            tHeight = 0,
            tPos = {},
            bSelected = false,
            bClicked = false,
            bColor = 'green',

            mouse = input.Mouse();


        that.mouseOver = function (e) {

            var canX = 0,
                canY = 0,
                gameArea = document.getElementById('gameArea');

            canX = e.clientX - gameArea.offsetLeft;// + 75;
            canY = e.clientY - gameArea.offsetTop;// + 63;


            //console.log('X: ' + canX + ' Y: ' + canY);
            //console.log('tPos.X: ' + tPos.x + ' tPos.Y ' + tPos.y);
            //BACK
            tPos = backText.getPos();
            tWidth = backText.getWidth();
            tHeight = backText.getHeight();
            if (canY > (tPos.y - tHeight) && canY < (tPos.y + tHeight)) {
                if (canX > tPos.x - (tWidth / 2) && canX < tPos.x + (tWidth / 2)) {
                    bSelected = true;
                }
                else {
                    bSelected = false;
                    bClicked = false;
                }
            }
            else {
                bSelected = false;
                bClicked = false;
            }

        };


        that.click = function (e) {
            if (bSelected) {
                bClicked = true;
            }
        };

        that.initialize = function () {
            mouse.registerCommand('mousemove', that.mouseOver);
            mouse.registerCommand('mousedown', that.click);

            that.gameOver = false;
        }


        that.update = function (elapsedTime) {

            var canvas = document.getElementById('id-canvas');

            gameOverText.setPos(canvas.width / 2, (graphics.canvas.height / 3));
            curScoreText.setPos(canvas.width / 2, (graphics.canvas.height / 3) + ((graphics.canvas.height / 3) / 4));
            backText.setPos(canvas.width / 2, (graphics.canvas.height / 3) + ((graphics.canvas.height / 3) / 2) * 2);

            mouse.update(elapsedTime);
            //-----------------------------
            //  IF SELECTED
            //-----------------------------
            //BACK
            if (bSelected === true) {
                bColor = 'lightgreen';
                backText.setColor('darkgreen');
            }
            else {
                bColor = 'green';
                backText.setColor('lightgreen');
            }

            //-----------------------------
            //  IF CLICKED
            //-----------------------------
            if (bClicked === true) {

                that.gameOver = true;

                bClicked = false;

            }

        };

        that.render = function () {

            var canvas = document.getElementById('id-canvas');

            //Draw main background
            graphics.background('media/midTerm.png');

            //Draw Menu RoundRect
            graphics.roundRect(0, 0, canvas.width, canvas.height, 20, 'rgba(00,64,00,0.5)', 'rgba(00,64,00,0.75)');

            //-------------------------------------------------------
            //  Draw Menu buttons
            //-------------------------------------------------------

            //Credit Text
            gameOverText.draw();
            curScoreText.draw();

            //Back
            tWidth = backText.getWidth();
            tHeight = backText.getHeight();
            tPos = backText.getPos();

            graphics.roundRect(tPos.x - (tWidth / 2) - 10, tPos.y - tHeight, tWidth + 20, tHeight * 2, 20, 'darkgreen', bColor, 4);
            backText.draw();
        };


        return that;
    }

    return {
        Menu: Menu
    }

}(MYGAME.graphics, MYGAME.input, MYGAME.gameStack));