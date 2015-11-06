
MYGAME.menus['MainMenuState'] = (function (graphics,input, gameStack) {

    function Menu() {
        var that = {

        },
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


        that.initialize = function () {
        }


        that.update = function (elapsedTime) {

            var canvas = document.getElementById('id-canvas');
		
            mouse.update(elapsedTime);
            
            $('#new_game').on('click',function(){
                mmClicked = true;
                $('#main_menu').hide();
            });

            $('#controls').on('click',function(){
                cClicked = true;
                $('#main_menu').hide();
            });

            $('#credits').on('click',function(){
                cdClicked = true;
                $('#main_menu').hide();
            });

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

        };


        return that;

    }

    return {
        Menu: Menu
    };

}(MYGAME.graphics,MYGAME.input, MYGAME.gameStack));


