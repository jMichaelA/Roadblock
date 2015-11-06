
MYGAME.menus['MainMenuState'] = (function (graphics,input, gameStack) {

    function Menu() {
        var that = {

        },
            newGameText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'New Game',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: graphics.canvas.height / 3
            }),
            controlsText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'Controls',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3) + (graphics.canvas.height / 3) / 2
            }),
            highScoresText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'High Scores',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3) + ((graphics.canvas.height / 3) / 2) * 2
            }),
            creditsText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'lightgreen',
                text: 'Credits',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3) + ((graphics.canvas.height / 3) / 2) * 3
            }),
            tWidth = 0,
            tHeight = 0,
            tPos = {},
            mmSelected = false,
            mmClicked = false,
            mmColor = 'green',
            cSelected = false,
            cClicked = false,
            cColor = 'green',
            hsSelected = false,
            hsClicked = false,
            hsColor = 'green',
            cdSelected = false,
            cdClicked = false,
            cdColor = 'green',

            mouse = input.Mouse();


        that.mouseOver = function (e) {

            var canX = 0,
                canY = 0,
                gameArea = document.getElementById('gameArea');

            canX = e.clientX - gameArea.offsetLeft;// + 75;
            canY = e.clientY - gameArea.offsetTop;// + 63;


            //console.log('X: ' + canX + ' Y: ' + canY);
            //console.log('tPos.X: ' + tPos.x + ' tPos.Y ' + tPos.y);
            //NEW GAME
            tPos = newGameText.getPos();
            tWidth = newGameText.getWidth();
            tHeight = newGameText.getHeight();
            if (canY > (tPos.y - tHeight) && canY < (tPos.y + tHeight)) {
                if (canX > tPos.x - (tWidth / 2) && canX < tPos.x + (tWidth / 2)) {
                    mmSelected = true;
                }
                else {
                    mmSelected = false;
                    mmClicked = false;
                }
            }
            else {
                mmSelected = false;
                mmClicked = false;
            }
            //CONTROLS
            tPos = controlsText.getPos();
            tWidth = controlsText.getWidth();
            tHeight = controlsText.getHeight();
            if (canY > (tPos.y - tHeight) && canY < (tPos.y + tHeight)) {
                if (canX > tPos.x - (tWidth / 2) && canX < tPos.x + (tWidth / 2)) {
                    cSelected = true;
                }
                else {
                    cSelected = false;
                    cClicked = false;
                }
            }
            else {
                cSelected = false;
                cClicked = false;
            }
            //HIGH SCORE
            tPos = highScoresText.getPos();
            tWidth = highScoresText.getWidth();
            tHeight = highScoresText.getHeight();
            if (canY > (tPos.y - tHeight) && canY < (tPos.y + tHeight)) {
                if (canX > tPos.x - (tWidth / 2) && canX < tPos.x + (tWidth / 2)) {
                    hsSelected = true;
                }
                else {
                    hsSelected = false;
                    hsClicked = false;
                }
            }
            else {
                hsSelected = false;
                hsClicked = false;
            }
            //CREDITS
            tPos = creditsText.getPos();
            tWidth = creditsText.getWidth();
            tHeight = creditsText.getHeight();
            if (canY > (tPos.y - tHeight) && canY < (tPos.y + tHeight)) {
                if (canX > tPos.x - (tWidth / 2) && canX < tPos.x + (tWidth / 2)) {
                    cdSelected = true;
                }
                else {
                    cdSelected = false;
                    cdClicked = false;
                }
            }
            else {
                cdSelected = false;
                cdClicked = false;
            }

        };


        that.click = function (e) {
            if (mmSelected) {
                mmClicked = true;
            }
            if (cSelected) {
                cClicked = true;
            }
            if (hsSelected) {
                hsClicked = true;
            }
            if (cdSelected) {
                cdClicked = true;
            }
        };

        that.initialize = function () {
            mouse.registerCommand('mousemove', that.mouseOver);
            mouse.registerCommand('mousedown', that.click);

        }


        that.update = function (elapsedTime) {

            var canvas = document.getElementById('id-canvas');

            newGameText.setPos(canvas.width / 2, canvas.height / 3);
            controlsText.setPos(canvas.width / 2, ((canvas.height / 3) + ((canvas.height / 3) / 2)));
            highScoresText.setPos(canvas.width / 2, (canvas.height / 3) + (((canvas.height / 3) / 2)) * 2);
            creditsText.setPos(canvas.width / 2, (canvas.height / 3) + (((canvas.height / 3) / 2)) * 3);

            mouse.update(elapsedTime);
            //-----------------------------
            //  IF SELECTED
            //-----------------------------
            //NEW GAME
            if (mmSelected === true) {
                mmColor = 'lightgreen';
                newGameText.setColor('darkgreen');
            }
            else {
                mmColor = 'green';
                newGameText.setColor('lightgreen');
            }
            //CONTROLS
            if (cSelected === true) {
                cColor = 'lightgreen';
                controlsText.setColor('darkgreen');
            }
            else {
                cColor = 'green';
                controlsText.setColor('lightgreen');
            }
            //HIGH SCORES
            if (hsSelected === true) {
                hsColor = 'lightgreen';
                highScoresText.setColor('darkgreen');
            }
            else {
                hsColor = 'green';
                highScoresText.setColor('lightgreen');
            }
            //CREDITS
            if (cdSelected === true) {
                cdColor = 'lightgreen';
                creditsText.setColor('darkgreen');
            }
            else {
                cdColor = 'green';
                creditsText.setColor('lightgreen');
            }

            //-----------------------------
            //  IF CLICKED
            //-----------------------------
            if (mmClicked === true) {

                gameStack[gameStack.length] = MYGAME.menus['GamePlayState'].Menu();
                gameStack[gameStack.length - 1].initialize();

                mmClicked = false;
                mmSelected = false;
            }
            else if (cClicked === true) {
                gameStack[gameStack.length] = MYGAME.menus['ControlsMenuState'].Menu();
                gameStack[gameStack.length - 1].initialize();

                cClicked = false;
                cSelected = false;
            }
            else if (hsClicked === true) {
                gameStack[gameStack.length] = MYGAME.menus['HighScoresMenuState'].Menu();
                gameStack[gameStack.length - 1].initialize();

                hsClicked = false;
                hsSelected = false;
            }
            else if (cdClicked === true) {
                gameStack[gameStack.length] = MYGAME.menus['CreditsMenuState'].Menu();
                gameStack[gameStack.length - 1].initialize();

                cdClicked = false;
                cdSelected = false;
            }

        };

        that.render = function () {

            graphics.clear();

            //Draw main background
            graphics.background('media/midTerm.png');

            //-------------------------------------------------------
            //  Draw Menu buttons
            //-------------------------------------------------------

            //New Game
            tWidth = newGameText.getWidth();
            tHeight = newGameText.getHeight();
            tPos = newGameText.getPos();

            graphics.roundRect(tPos.x - (tWidth / 2) - 10, tPos.y - tHeight, tWidth + 20, tHeight * 2, 20, 'darkgreen', mmColor, 6);
            newGameText.draw();
            //Controls
            tWidth = controlsText.getWidth();
            tHeight = controlsText.getHeight();
            tPos = controlsText.getPos();

            graphics.roundRect(tPos.x - (tWidth / 2) - 10, tPos.y - tHeight, tWidth + 20, tHeight * 2, 20, 'darkgreen', cColor, 6);
            controlsText.draw();
            //High Scores
            tWidth = highScoresText.getWidth();
            tHeight = highScoresText.getHeight();
            tPos = highScoresText.getPos();

            graphics.roundRect(tPos.x - (tWidth / 2) - 10, tPos.y - tHeight, tWidth + 20, tHeight * 2, 20, 'darkgreen', hsColor, 6);
            highScoresText.draw();
            //Credits
            tWidth = creditsText.getWidth();
            tHeight = creditsText.getHeight();
            tPos = creditsText.getPos();

            graphics.roundRect(tPos.x - (tWidth / 2) - 10, tPos.y - tHeight, tWidth + 20, tHeight * 2, 20, 'darkgreen', cdColor, 6);
            creditsText.draw();
        };


        return that;

    }

    return {
        Menu: Menu
    };

}(MYGAME.graphics,MYGAME.input, MYGAME.gameStack));
