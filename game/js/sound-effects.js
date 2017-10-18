var gameSound = true;
var audioVersion = 1;
var gameSoundVolume = 0.1;

function loadAudio() {
  initAudioGrappelLaunch();
  initAudioGrappelHit();
  initAudioFalling();
}


//----
// grappel launch
var audioGrappelLaunch;
function initAudioGrappelLaunch() {
  var fileLocation;
  if (audioVersion === 2) {
    fileLocation = 'audio/1_launch.wav';
  } else {
    fileLocation = 'audio/2_launch.wav';
  }
  audioGrappelLaunch = new Audio();
  audioGrappelLaunch.src = fileLocation;
  audioGrappelLaunch.loop = false;
  audioGrappelLaunch.volume = gameSoundVolume;
}
function soundGrappelLaunch() {
  console.log('audioLaunch');
  audioGrappelLaunch.play();
}

//----
// grappelConnect
var audioGrappelHits;
function initAudioGrappelHit() {
  var fileLocation;

  if (audioVersion === 1) {
    fileLocation = 'audio/1_connect.wav';
  } else {
    fileLocation = 'audio/2_connect.wav';
  }
  audioGrappelHit = new Audio();
  audioGrappelHit.src = fileLocation;
  audioGrappelHit.loop = false;
  audioGrappelHit.volume = gameSoundVolume;
}
function soundGrappelHit() {
  console.log('audioHit');
  audioGrappelHit.play();
}


//----
// falling
var audioFalling;
function initAudioFalling() {
  var fileLocation = 'audio/falling.wav';
  audioFalling = new Audio();
  audioFalling.src = fileLocation;
  audioFalling.loop = false;
  audioFalling.volume = gameSoundVolume;
}
function soundFalling() {
  audioFalling.play();
}
