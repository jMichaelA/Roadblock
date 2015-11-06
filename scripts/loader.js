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
                'preload!media/mainMenuBg.png',
                'preload!scripts/soundPlayer.js',
				//'preload!media/sounds/arcadeSound.' + MYGAME.audioExt,
                'preload!scripts/renderer.js',
                'preload!scripts/Input.js',
                'preload!scripts/mainMenu.js',
                'preload!scripts/gamePlay.js',
                'preload!scripts/gameOver.js',
                'preload!scripts/controlsMenu.js',
                'preload!scripts/highScoresMenu.js',
                'preload!scripts/creditsMenu.js',
                'preload!scripts/jquery.js',
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

