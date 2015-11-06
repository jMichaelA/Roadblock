//Function used to play music anywhere in the Assignment_4 global space

MYGAME.playSound = function (whichSound,vol,loopF) {
    var property = whichSound + '.' + MYGAME.audioExt;
		//element = document.getElementById(idComplete);

    //element.innerHTML = 'playing';
    //Assignment_4.sounds[property].addEventListener('ended', function () {
    //    element.innerHTML = 'ended';
    //});

    MYGAME.sounds[whichSound + '.' + MYGAME.audioExt].volume = vol;
    MYGAME.sounds[whichSound + '.' + MYGAME.audioExt].currentTime = 0;
    MYGAME.sounds[whichSound + '.' + MYGAME.audioExt].loop = loopF;
    MYGAME.sounds[whichSound + '.' + MYGAME.audioExt].play();
};

MYGAME.stopSound = function (whichSound) {
    var property = whichSound + '.' + MYGAME.audioExt;
    //element = document.getElementById(idComplete);

    //element.innerHTML = 'playing';
    //Assignment_4.sounds[property].addEventListener('ended', function () {
    //    element.innerHTML = 'ended';
    //});

    MYGAME.sounds[whichSound + '.' + MYGAME.audioExt].pause();
};