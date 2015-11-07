
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

            map_stop_elements = [],
            map_detour_elements = [],
            numSigns = 10,
            i = 0;

            for(i = 0; i < numSigns; i++){
                if (i < (numSigns/2)){
                    image = MYGAME.images['media/StopSign.png'];
                    temp = graphics.map_element({
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        radius: 6,
                        placed: false,
                        image: image
                    });

                    map_stop_elements.push(temp);
                }else{
                    image = MYGAME.images['media/Detour.png'];
                    temp = graphics.map_element({
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        radius: 6,
                        placed: false,
                        image: image
                    });

                    map_detour_elements.push(temp);
                }
            }

            /*for(var i = 0; i < map_stop_elements.length; i++){
                console.log(map_stop_elements[i]);
            }*/

            //  HUD Object
            //--------------------------------
            hud = graphics.HUD({
                x:0,
                y: graphics.canvas.height - 60,
                width:graphics.canvas.width,
                height: 60,
                levelX: 10,
                levelY: graphics.canvas.height - 30,
                level: 1
            });

            //--------------------------------
            //  HUD Element
            //--------------------------------
            hud_stop = graphics.HUD_Element({
                x: 200,
                y: graphics.canvas.height - 30,
                width:50,
                height:50,
                usedMarkers: 0,
                image: MYGAME.images['media/StopSign.png'],
                count: map_stop_elements.length
            });

            hud_detour = graphics.HUD_Element({
                x: 350,
                y: graphics.canvas.height - 30,
                width:50,
                height:50,
                usedMarkers: 0,
                image: MYGAME.images['media/Detour.png'],
                count: map_detour_elements.length
            });

            //--------------------------------
            //  PERSON OBJECTS
            //--------------------------------

            randomStartPos = {
                x: Math.floor(Math.random() * ((graphics.canvas.width-0)+1) + 0),
                y: Math.floor(Math.random() * (((graphics.canvas.height-84)-0)+1) + 0)
            };

			var person1 = graphics.Person( {
            
				images : [MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_1.png'],MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_3.png'],
						MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_1.png'],MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_3.png'],	
						MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_1.png'],MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_3.png'],
						MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_1.png'],MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_3.png']],
				x:	randomStartPos.x, y:randomStartPos.y,
				width : 34, height : 48,
                radius: 10,
				speed : 15,	//pixels per second
				iter: 0,
				imgTime: 0,
                direction: Math.floor(Math.random() * (4 - 1 + 1)) + 1,
				dead: false,
				sel: false,
			}),
			
			person2 = graphics.Person( {
				images : [MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_1.png'],MYGAME.images['media/WalkF_2.png'],MYGAME.images['media/WalkF_3.png'],
						MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_1.png'],MYGAME.images['media/WalkB_2.png'],MYGAME.images['media/WalkB_3.png'],	
						MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_1.png'],MYGAME.images['media/WalkL_2.png'],MYGAME.images['media/WalkL_3.png'],
						MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_1.png'],MYGAME.images['media/WalkR_2.png'],MYGAME.images['media/WalkR_3.png']],
				x:	200, y:300 ,
				width : 34, height : 48,
                radius: 10,
				speed : 15,	//pixels per second
				iter: 0,
				imgTime: 0,
				dead: false,
				sel: false,
			}),
			
			//--------------------------------
            //  CAR OBJECTS
            //--------------------------------
            
			car1 = graphics.Car( {
				image : MYGAME.images['media/car.png'],
				x:	200, y: 100 ,
				width : 96, height : 48,
                direction: Math.floor(Math.random() * (4 - 1 + 1)) + 1,
				speed : 60,	//pixels per second
				rotation: 0,
                stopTime: 7,
                stop:false,
                radius: 40
			}),
			
			//--------------------------------
            //  OTHER VARS
            //--------------------------------

            tWidth = 0,
            tHeight = 0,
            tPos = {},
            objPos1 = {},
            objPos2 = {},
            distanceX = 0,
            distanceY = 0,
            carStatus = {},
            k = 0,
            detourF = false,
            justSet = false,

            sec = 0,
            secCount = 0,
            min = 0,
			tempTime = 0,
			tempTime2 = 0,
            stopTime = 0,

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
				gameAreaJ = $("#gameArea"),
				gameWidth = gameAreaJ.width(),
				gameHeight = gameAreaJ.height();

			canX = e.clientX - gameArea.offsetLeft + document.documentElement.scrollLeft;
			canY = e.clientY - gameArea.offsetTop + document.documentElement.scrollTop;	
			
			person2.detectMouse(canX, canY);
            hud_stop.detectMouse(canX, canY);
            hud_detour.detectMouse(canX, canY);
        };

		//--------------------------------
        //  CLICK FUNCTION
        //--------------------------------
        that.click = function (e) {
            var canX = 0,
                canY = 0,
                gameArea = document.getElementById('gameArea');
                gameAreaJ = $("#gameArea"),
                gameWidth = gameAreaJ.width(),
                gameHeight = gameAreaJ.height();

            canX = e.clientX - gameArea.offsetLeft + document.documentElement.scrollLeft;
            canY = e.clientY - gameArea.offsetTop + document.documentElement.scrollTop; 

            console.log(canX, canY);

            if(hud_stop.getPlacing()){
                if(hud_stop.getCount() != hud_stop.getUsed()){
                    usedMarkers = hud_stop.getUsed();                    
                    map_stop_elements[usedMarkers].setPos(canX,canY);
                    map_stop_elements[usedMarkers].setPlaced(true);
                    hud_stop.setUsed(hud_stop.getUsed()+1);
                    hud_stop.setCount(hud_stop.getCount() - 1);
                    hud_stop.setPlacing(false);
                }
            }

            if(hud_detour.getPlacing()){
                if(hud_detour.getCount() != hud_detour.getUsed()){
                    usedMarkers = hud_detour.getUsed();                    
                    map_detour_elements[usedMarkers].setPos(canX,canY);
                    map_detour_elements[usedMarkers].setPlaced(true);
                    hud_detour.setUsed(usedMarkers+1);
                    hud_detour.setCount(hud_detour.getCount() - 1);
                    hud_detour.setPlacing(false);
                }
            }

			if(person2.isClk()){
				person2.setDeath(true);
			}

            if(hud_stop.isClk()){
                if(!hud_stop.getPlacing() && hud_stop.getCount() != 0){
                    hud_detour.setPlacing(false);
                    hud_stop.setPlacing(true);
                }else{
                    hud_stop.setPlacing(false);
                }
            }

            if(hud_detour.isClk()){
                if(!hud_detour.getPlacing() && hud_detour.getCount() != 0){
                    hud_stop.setPlacing(false);
                    hud_detour.setPlacing(true);
                }else{
                    hud_detour.setPlacing(false);
                }
            }
        };
		
		//--------------------------------
        //  INITIALIZE 
        //--------------------------------
        that.initialize = function () {
            
            mouse.registerCommand('mousemove', that.mouseOver);
            mouse.registerCommand('mousedown', that.click);

            $('#main_menu').hide();

            that.dead = false;
            sec = 0;
            secCount = 0;
            min = 0;

            currentScore = 0;
            level = 1;
        }


		//***********************************************************************************************************************
        //  UPDATE 
        //***********************************************************************************************************************
        that.update = function (elapsedTime) {

            //UPDATE MOUSE
            mouse.update(elapsedTime);

            //Update marker position
            for(var i = 0; i < map_stop_elements.length; i++){
                map_stop_elements[i].draw();
            }

            for(var i = 0; i < map_detour_elements.length; i++){
                map_detour_elements[i].draw();
            }

            canvas = document.getElementById('id-canvas');

			//----------------------------------------------
            //  UPDATE PERSON POSITION
            //----------------------------------------------

            tempTime += elapsedTime;
            
            if(tempTime <= 5){
                if(edgeDetect(person1.getPos().x,person1.getPos().y,person1.getPos().radius,person1.getDirection()) != 'None'){
                    person1.setDirection(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
                }

                //edgeDetect(person1.getPos().x,person1.getPos().y);
                if(person1.getDirection() == 1){
                    person1.goUp(elapsedTime);
                }

                if(person1.getDirection() == 2){
                    person1.goDown(elapsedTime);
                }

                if(person1.getDirection() == 3){
                    person1.goLeft(elapsedTime);
                }

                if(person1.getDirection() == 4){
                    person1.goRight(elapsedTime);
                }
            }else{
                person1.setDirection(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
                tempTime = 0;
            }
			
            //----------------------------------------------
            //  CHECK FOR COLLISIONS WITH SIGNS
            //----------------------------------------------

            objPos1 = car1.getPos();


            for(k = 0; k < numSigns; k++){
                if(k < (numSigns/2)){
                    
                    objPos2 = map_stop_elements[k].getPos();
 
                    distanceX = Math.abs(objPos1.x - objPos2.x);
                    distanceY = Math.abs(objPos1.y - objPos2.y);

                    if(distanceX <= (objPos1.radius+objPos2.radius) && distanceY <= (objPos1.radius+objPos2.radius)){
                            //Collision with Stop Sign
                            car1.setStopF(true,elapsedTime);
                            k = numSigns;
                            console.log("Stop Sign Detection");
                        
                    }
                    else{
                        car1.setStopF(false,elapsedTime);
                    }
                }
                else{
                    
                    objPos2 = map_detour_elements[k-(numSigns/2)].getPos();
 
                    distanceX = Math.abs(objPos1.x - objPos2.x);
                    distanceY = Math.abs(objPos1.y - objPos2.y);

                    if(distanceX <= (objPos1.radius+objPos2.radius) && distanceY <= (objPos1.radius+objPos2.radius)){
                            //Collision with Detour Sign
                            car1.setDetF(true);
                            k = numSigns;
                            console.log("Detour Sign Detection");
                    }
                    else{
                        car1.setDetF(false);
                    }
                }
            }

            //----------------------------------------------
            //  CHECK FOR COLLISIONS WITH HUMAN
            //----------------------------------------------

            objPos1 = car1.getPos();
            objPos2 = person1.getPos();
 
            distanceX = Math.abs(objPos1.x - objPos2.x);
            distanceY = Math.abs(objPos1.y - objPos2.y);

            if(distanceX <= (objPos1.radius+objPos2.radius) && distanceY <= (objPos1.radius+objPos2.radius)){
                    //Collision with Stop Sign
                    person1.dieF(true);
                    console.log("Game Over");
                
            }
            else{
                person1.dieF(false);
            }

            //----------------------------------------------
            //  UPDATE CAR POSITION
            //----------------------------------------------
            tempTime2 += elapsedTime;
            carStatus = car1.getFlags();
            
            if(justSet === false){
                detourF = carStatus.detour;
            }
            
            console.log("detour: "+detourF);
            if(tempTime2 <= 5 && detourF === false){
                if(edgeDetect(car1.getPos().x,car1.getPos().y,car1.getPos().radius,car1.getDirection()) != 'None'){
                    car1.setDirection(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
                }

                //edgeDetect(person1.getPos().x,person1.getPos().y);
                if(car1.getDirection() == 1){
                    
                    car1.goUp(elapsedTime);    
                }

                else if(car1.getDirection() == 2){
                    
                    car1.goDown(elapsedTime);
                }

                else if(car1.getDirection() == 3){
                    
                    car1.goLeft(elapsedTime);
                }

                else if(car1.getDirection() == 4){
                    
                    car1.goRight(elapsedTime);
                    
                }
            }
            else if(justSet === true){
                justSet = false;
            }
            else{
                car1.setDirection(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
                tempTime2 = 0;
                detourF = false;
                justSet = true;
            }
            //Check for GAME OVER
            if (person1.isDead()) {

                gameStack[gameStack.length] = MYGAME.menus['GameOverState'].Menu();
                gameStack[gameStack.length - 1].initialize();

            }



        };

        //***********************************************************************************************************************
        //     RENDER
        //***********************************************************************************************************************
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

            
		/*	if(!person2.getDeath()){
				person2.draw();
			}*/
            for(var i = 0; i < map_stop_elements.length; i++){
                map_stop_elements[i].draw();
            }

            for(var i = 0; i < map_detour_elements.length; i++){
                map_detour_elements[i].draw();
            }
			car1.draw();
			hud.draw();
            hud_stop.draw();
            hud_detour.draw();

                       //Update marker position
            
        };


        return that;

    }

    return {
        Menu: Menu
    };

}(MYGAME.graphics, MYGAME.input, MYGAME.gameStack));

function findNearestRoad(x,y){
    canvas = document.getElementById('id-canvas');
    ctx = canvas.getContext('2d');
        
    imgdata = ctx.getImageData(0,0,1200,600);
    var pix = imgdata.data;

    console.log(pix);
}

function edgeDetect(x,y,radius,current_direction){
    canvas = document.getElementById('id-canvas');
    ctx = canvas.getContext('2d');

    direction = 'None';
 
    distanceBottom = Math.abs(y - (canvas.height-60))
    distanceTop = Math.abs(y - 0);
    distanceLeft = Math.abs(x - 0);
    distanceRight = Math.abs(x - (canvas.width));

    if(distanceTop <= radius && current_direction == 1){
        direction = 'top';
    }

    if(distanceBottom <= radius && current_direction == 2){
        direction = 'bottom';
    }

    if(distanceRight <= radius && current_direction == 4){
        direction = 'right';
    }

    if(distanceLeft <= radius && current_direction == 3){
        direction = 'left';
    }

    return direction;
}
