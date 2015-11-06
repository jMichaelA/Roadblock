
MYGAME.menus['MainMenuState'] = (function (graphics,input, gameStack) {

    function Menu() {
        var that = {

        },
        newGameText = graphics.Text({
            font: '32px Arial',
            align: 'center',
            textColor: 'black',
            text: 'New Game',
            baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: graphics.canvas.height / 3
            }),
            controlsText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'black',
                text: 'Controls',
                baseLine: 'middle',
                x: graphics.canvas.width / 2,
                y: (graphics.canvas.height / 3) + (graphics.canvas.height / 3) / 2
            }),
            creditsText = graphics.Text({
                font: '32px Arial',
                align: 'center',
                textColor: 'black',
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
            mmColor = 'black',
            cSelected = false,
            cClicked = false,
            cColor = 'black',
            cdSelected = false,
            cdClicked = false,
            cdColor = 'black',

            mouse = input.Mouse();


        that.mouseOver = function (e) {

            var canX = 0,
                canY = 0,
                gameArea = document.getElementById('gameArea');

            canX = e.clientX;// + 75;
            canY = e.clientY;// + 63;

            //NEW GAME
            tPos = newGameText.getPos();
            tWidth = newGameText.getWidth();
            tHeight = newGameText.getHeight();
            if (canY > (tPos.y  - tHeight) && canY < (tPos.y + tHeight)) {
                if (canX > tPos.x - (tWidth / 2) && canX < tPos.x + (tWidth / 2)) {
                    graphics.
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

            console.log("canvas X: " + canX + " canvasY: " +canY);
            console.log("Element X: " + tPos.x + "Element Y: " + tPos.y);
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

            newGameText.setPos(canvas.width - (canvas.width / 3), (canvas.height / 2));
            controlsText.setPos(canvas.width - (canvas.width / 3), ((canvas.height / 2) + 150));
            creditsText.setPos(canvas.width - (canvas.width / 3), ((canvas.height / 2) + 150 * 2));

            mouse.update(elapsedTime);
            //-----------------------------
            //  IF SELECTED
            //-----------------------------
            //NEW GAME
            if (mmSelected === true) {
                mmColor = 'yellow';
                newGameText.setColor('white');
            }
            else {
                mmColor = 'yellow';
                newGameText.setColor('black');
            }
            //CONTROLS
            if (cSelected === true) {
                cColor = 'yellow';
                controlsText.setColor('white');
            }
            else {
                cColor = 'yellow';
                controlsText.setColor('black');
            }
            //CREDITS
            if (cdSelected === true) {
                cdColor = 'yellow';
                creditsText.setColor('white');
            }
            else {
                cdColor = 'yellow';
                creditsText.setColor('black');
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
            graphics.background('media/mainMenuBg.png');
            // graphics.background(null, 41.7418972, -111.8113987)

            //-------------------------------------------------------
            //  Draw Menu buttons
            //-------------------------------------------------------

            //New Game
            tWidth = newGameText.getWidth();
            tHeight = newGameText.getHeight();
            tPos = newGameText.getPos();

            graphics.roundRect(tPos.x - 150, tPos.y - tHeight * 2, 300, tHeight * 4, 20, 'black', mmColor, 3);
            newGameText.draw();
            
            //Controls
            tWidth = controlsText.getWidth();
            tHeight = controlsText.getHeight();
            tPos = controlsText.getPos();

            graphics.roundRect(tPos.x - 150, tPos.y - tHeight * 2, 300, tHeight * 4, 20, 'black', cColor, 3);
            controlsText.draw();

            //Credits
            tWidth = creditsText.getWidth();
            tHeight = creditsText.getHeight();
            tPos = creditsText.getPos();

            graphics.roundRect(tPos.x - 150, tPos.y - tHeight * 2, 300, tHeight * 4, 20, 'black', cdColor, 3);
            creditsText.draw();
        };


        return that;

    }

    return {
        Menu: Menu
    };

}(MYGAME.graphics,MYGAME.input, MYGAME.gameStack));


