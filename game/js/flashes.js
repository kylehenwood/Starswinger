// crowd flashes

$(document).ready(function(){
    calc();
    setup();
    levels();
});


// position output
// beam end position
var y;
var x;

function calc() {
    y = 200;
    x = 200;
}

// canvas stuff
var canvas = {
    id: '',
    ctx: '',
    width: '',
    height: ''
};


function setup() {

    canvas.id = $('.js-flashes');
    canvas.ctx = canvas.id[0].getContext("2d");

    // need to recall this on resize

    canvas.width = canvas.id.outerWidth();
    canvas.height = canvas.id.outerHeight();
    canvas.id.attr({
        'width': canvas.width,
        'height': canvas.height
    });

    requestAnimationFrame(flashEmitter);
}


//var pointer = $('#pointer');
var last = 0;

// add a new particle every....
var frequency = 100;

function flashEmitter(timestamp) {
    requestAnimationFrame(flashEmitter);
    // Clear Canvas
    clear(canvas);

    //y = pointer.offset().top+rand(3,9);
    //x = pointer.offset().left+rand(3,9);


    // create particle
    if(timestamp - last > frequency){
        last = timestamp;
        createParticle();
    }

    // call particle creation / handler

    createLayer();

    for (var i = 0; i < particleLayers.length; i++) {
        var layer = particleLayers[i];
        layer.life -= 1;
        if (layer.life <= 0) {
            particleLayers.splice(i,1);
        } else {
            canvas.ctx.save();
            canvas.ctx.globalAlpha = (layer.life*5)/100;
            canvas.ctx.drawImage(layer.layer, 0, 0);
            canvas.ctx.restore();
        }
    }
}

// particles
var particlePool = [];
var maxParticles = 10000;
var rotate = 0;
var particleLayers = [];

var trailsRandom = false;//true;
var layerLife = 20;


function levels() {

    frequency = 1000;
    layerLife = 20;
    trailsRandom = false;
    particleVelocity = 0.2;

    $('.js-level-1').click(function(){
        frequency = 50;
        layerLife = 20;
        trailsRandom = false;
        particleVelocity = 0.2;
    });

    $('.js-level-2').click(function(){
        frequency = 50;
        layerLife = 40;
        trailsRandom = false;
        particleVelocity = 0.1;
    });

    $('.js-level-3').click(function(){
        frequency = 10;
        layerLife = 60;
        trailsRandom = true;
        particleVelocity = 1.2;
    });
}



function createLayer () {

    var buffer = document.createElement('canvas');
        buffer.width = canvas.width;
        buffer.height = canvas.height;
    var layerContext = buffer.getContext('2d');

    // create layer
    drawParticle(layerContext);

    if (trailsRandom == true) {
        particleLayers.push({
            layer:buffer,
            life:rand(0,layerLife)
        });
    } else {
        particleLayers.push({
            layer:buffer,
            life:layerLife
        });
    }
}

var particleDirection = 0;
var particleVelocity = 1;

function createParticle() {
    if (particlePool.length < maxParticles) {
        var particle = {
            x: (canvas.width/2),
            y: 180,//,
            //d: particleDirection,
            d: rand(1,360), // direction
            s: rand(1,1),   // size
            dX: null,
            dY: null,
            opacity: 1,
            velocity: particleVelocity
        };

        particleDirection += 10;

        // get direction based on angle
        var hypotenuse = particle.velocity;
        var adjacent = Math.cos(toRad(particle.d))*hypotenuse;
        var opposite = Math.sin(toRad(particle.d))*hypotenuse;


        //angle
        particle.dX = opposite;
        particle.dY = adjacent;

        // Add Particle to pool
        particlePool.push(particle)
    }
}

function drawParticle(layer) {

    for (var i = 0; i < particlePool.length; i++) {
        var particle = particlePool[i];

        //particlePool.push(particle);

        // remove dead particles
        //!todo remove offscreen
        if (particle.opacity <= 0.05 || particle.s <= 0.2) {
            particlePool.splice([i],1);
        }

        particle.dX *= 1.02;
        particle.dY *= 1.02;

        // update particle position
        particle.x += particle.dX;
        particle.y += particle.dY;
        particle.s *= 1.005;
        //particle.opacity *= 0.98;

        var color = 'rgba(255,255,255,'+particle.opacity+')';

        //layer.fillRect(particle.x,particle.y, particle.s, particle.s);
        //layer.closePath();

        layer.beginPath();
        layer.arc(particle.x-(particle.s/2), particle.y-(particle.s/2), particle.s, 0, Math.PI*2, true);
        layer.closePath();
        layer.fillStyle = color;
        layer.fill();

    }
}






// re init on resize.
$(window).resize(function(){
    waitForFinalEvent(function () {
        //emitterResize();
    }, 200);
});


// convert degrees into radians
function toRad(deg) {
    return deg * Math.PI/180;
}


// clear canvas function
function clear(canvas) {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// random function - no really
function rand(min,max) {
    var num = Math.random() * (max - min) + min;
    return Math.ceil(num);
}


// Request Animation Frame Function
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Resize Delay Function
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
