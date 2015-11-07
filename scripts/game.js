
MYGAME.game = (function(input,menu, gameStack) {
    'use strict';

    console.log("initializing game!");

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
            $('#main_menu').show();
        }

        if (gameStack[gameStack.length - 1].gameOver === true) {
            gameStack.pop();
            gameStack.pop();
            $('#main_menu').show();
        }

        gameStack[gameStack.length - 1].update(elapsedTime);
    }

    function render() {

        gameStack[gameStack.length - 1].render();

    }

    function gameLoop(time) {
        elapsedTime = ((time - lastTime)/1000);
        lastTime = time;

        collectInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    function initialize() {

        gameStack[gameStack.length] = menu['MainMenuState'].Menu();
        gameStack[gameStack.length-1].initialize();

        requestAnimationFrame(gameLoop);

    }

    return {

        initialize: initialize,
        gameStack: gameStack,
    };


}(MYGAME.input, MYGAME.menus, MYGAME.gameStack));