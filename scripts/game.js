
MYGAME.game = (function(input,menu, gameStack) {
    'use strict';

    console.log("initializing game!");

    window.addEventListener('resize', MYGAME.canvasSize.resizeGame, false);
    window.addEventListener('orientationchange', MYGAME.canvasSize.resizeGame, false);

    var mouse = input.Mouse(),
        keyboard = input.Keyboard(),
        elapsedTime = 0,
        lastTime = 0

    function collectInput(elapsedTime) {
        mouse.update(elapsedTime);
        keyboard.update(elapsedTime);
    }

    function update(elapsedTime) {

        if (gameStack[gameStack.length - 1].dead === true) {
            gameStack.pop();
        }

        if (gameStack[gameStack.length - 1].gameOver === true) {
            gameStack.pop();
            gameStack.pop();
        }

        gameStack[gameStack.length - 1].update(elapsedTime);
    }

    function render() {

        gameStack[gameStack.length - 1].render();

    }

    function gameLoop(time) {
        elapsedTime = time - lastTime;
        lastTime = time;

        collectInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    function initialize() {

        gameStack[gameStack.length] = menu['MainMenuState'].Menu();
        gameStack[gameStack.length-1].initialize();

        MYGAME.canvasSize.resizeGame();
        requestAnimationFrame(gameLoop);

    }

    return {

        initialize: initialize,
        gameStack: gameStack,
    };


}(MYGAME.input, MYGAME.menus, MYGAME.gameStack));