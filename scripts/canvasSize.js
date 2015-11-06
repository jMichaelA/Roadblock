
//Inspired by http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/


MYGAME.canvasSize = (function () {

    var gameArea = document.getElementById('gameArea'),
        gameCanvas = document.getElementById('id-canvas'),
        widthToHeight,
        newWidth,
        newHeight,
        newWidthToHeight;


    function resizeGame() {
    
        gameArea = document.getElementById('gameArea');
        widthToHeight = 3 / 4;
        newWidth = window.innerWidth*(9/10);
        newHeight = window.innerHeight*(9/10);
        newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            gameArea.style.height = newHeight + 'px';
            gameArea.style.width = newWidth + 'px';
        }
        else {
            newHeight = newWidth / widthToHeight;
            gameArea.style.width = newWidth + 'px';
            gameArea.style.height = newHeight + 'px';
        }

        gameArea.style.marginTop = (-newHeight/2) + 'px';
        gameArea.style.marginLeft = (-newWidth / 2) + 'px';

        gameCanvas = document.getElementById('id-canvas');
        gameCanvas.width = newWidth;
        gameCanvas.height = newHeight;
       

    }


    return {

        resizeGame: resizeGame

    };



}());
