//copied from example files in CS5410
var MYGAME = {
    images: {},
    sounds: {},
    menus: [],
    gameStack: [],
	
	status : {
			preloadRequest : 0,
			preloadComplete : 0
		
	}
	
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
    console.log('Loading resources...');

    MYGAME.audioExt = '';
    //
    // Find out which kind of audio support we have
    if (Modernizr.audio.mp3 === 'probably') {
        console.log('We have MP3 support');
        MYGAME.audioExt = 'mp3';
    }
    else if (Modernizr.audio.wav === 'probably') {
        console.log('We have WAV support');
        MYGAME.audioExt = 'wav';
    }

	Modernizr.load([
		{
			load : [
                'preload!media/midTerm.png',
                'preload!media/midTermB.png',
                'preload!media/OldMainFire.png',
                'preload!media/Tile64-0.png',
                'preload!media/Tile64-1.png',
                'preload!media/Tile64-2.png',
                'preload!media/Tile64-3.png',
                'preload!media/Tile64-4.png',
                'preload!media/Tile64-5.png',
                'preload!media/Tile64-6.png',
                'preload!media/Tile64-7.png',
                'preload!media/Tile64-8.png',
                'preload!media/Tile64-9.png',
                'preload!media/Tile64-10.png',
                'preload!media/Tile64-11.png',
                'preload!media/Tile64-12.png',
                'preload!media/Tile64-13.png',
                'preload!media/Tile64-14.png',
                'preload!media/Tile64-15.png',
                'preload!media/Tile64-16.png',
                'preload!media/Tile64-17.png',
                'preload!media/Tile64-18.png',
                'preload!media/Tile64-19.png',
                'preload!media/Tile64-20.png',
                'preload!media/Tile64-21.png',
                'preload!media/Tile64-22.png',
                'preload!media/Tile64-23.png',
                'preload!media/Tile64-24.png',
                'preload!media/Tile64-25.png',
                'preload!media/Tile64-26.png',
                'preload!media/Tile64-27.png',
                'preload!media/Tile64-28.png',
                'preload!media/Tile64-29.png',
                'preload!media/Tile64-30.png',
                'preload!media/Tile64-31.png',
                'preload!media/Tile64-32.png',
                'preload!media/Tile64-33.png',
                'preload!media/Tile64-34.png',
                'preload!media/Tile64-35.png',
                'preload!media/Tile64-36.png',
                'preload!media/Tile64-37.png',
                'preload!media/Tile64-38.png',
                'preload!media/Tile64-39.png',
                'preload!media/Tile64-40.png',
                'preload!media/Tile64-41.png',
                'preload!media/Tile64-42.png',
                'preload!media/Tile64-43.png',
                'preload!media/Tile64-44.png',
                'preload!media/Tile64-45.png',
                'preload!media/Tile64-46.png',
                'preload!media/Tile64-47.png',
                'preload!media/Tile64-48.png',
                'preload!media/Tile64-49.png',
                'preload!media/Tile64-50.png',
                'preload!media/Tile64-51.png',
                'preload!media/Tile64-52.png',
                'preload!media/Tile64-53.png',
                'preload!media/Tile64-54.png',
                'preload!media/Tile64-55.png',
                'preload!media/Tile64-56.png',
                'preload!media/Tile64-57.png',
                'preload!media/Tile64-58.png',
                'preload!media/Tile64-59.png',
                'preload!media/Tile64-60.png',
                'preload!media/Tile64-61.png',
                'preload!media/Tile64-62.png',
                'preload!media/Tile128-0.png',
                'preload!media/Tile128-1.png',
                'preload!media/Tile128-2.png',
                'preload!media/Tile128-3.png',
                'preload!media/Tile128-4.png',
                'preload!media/Tile128-5.png',
                'preload!media/Tile128-6.png',
                'preload!media/Tile128-7.png',
                'preload!media/Tile128-8.png',
                'preload!media/Tile128-9.png',
                'preload!media/Tile128-10.png',
                'preload!media/Tile128-11.png',
                'preload!media/Tile128-12.png',
                'preload!media/Tile128-13.png',
                'preload!media/Tile128-14.png',
                'preload!scripts/soundPlayer.js',
				//'preload!media/sounds/arcadeSound.' + MYGAME.audioExt,
                'preload!scripts/renderer.js',
                'preload!scripts/canvasSize.js',
                'preload!scripts/Input.js',
                'preload!scripts/mainMenu.js',
                'preload!scripts/gamePlay.js',
                'preload!scripts/gameOver.js',
                'preload!scripts/controlsMenu.js',
                'preload!scripts/highScoresMenu.js',
                'preload!scripts/creditsMenu.js',
				'preload!scripts/game.js'
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);

//
// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	MYGAME.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	var isSound = /.+\.(mp3|wav)$/i.test(resource.url);
	resource.noexec = isSound;

	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			MYGAME.images[resource.url] = image;
		}

		else if (isSound) {
		    var sound = new Audio(resource.url);
		    console.log(resource.url);
		    MYGAME.sounds[resource.url] = sound;
		}
		
		MYGAME.status.preloadComplete += 1;
		
		//
		// When everything has finished preloading, go ahead and start the game
		if (MYGAME.status.preloadComplete === MYGAME.status.preloadRequest) {
		    if (MYGAME.frame == null) {
				console.log("frame is undefined!");
				
			}
			console.log('Preloading complete!');
			MYGAME.game.initialize();
		}
	};
	
	return resource;
});

