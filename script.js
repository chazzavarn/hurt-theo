let screen = 0;
let y = 300;
let x = 300;
let anvily = -20;
let anvilx = 200;
let clevey = -1000;
let clevex = 200;
let dougy = -1300;
let dougx = 200;
let speed = 5;
let score = 0;
let misses = 0;
let dougs = 0;
let difficulty = 4;
let boink;
let fart;
let munch;
let music;
let r;
let r2;
let r3;

function preload() {
    theo = loadImage('assets/theo1.png');
    anvil = loadImage('assets/anvil.png');
    cleve = loadImage('assets/cleve.png');
    linus = loadImage('assets/background.png');
    doug = loadImage('assets/douglas.png');
    end = loadImage('assets/e02.jpeg');
    music = loadSound('assets/music.mp3');
    boink = loadSound('assets/boink.mp3');
    fart = loadSound('assets/fart.mp3');
    munch = loadSound('assets/munch.mp3');
}

function setup() {
    createCanvas(600, 400);
}

function draw() {
    if (screen == 0) {
        start();
    } else if (screen == 1) {
        gameOn();
        if (!music.isPlaying()) {
            music.loop();
            music.setVolume(1);
        }
    } else if (screen == 2) {
        endScreen();
    }
}

function start() {
    r = random(0, 255);
    r2 = random(0, 255);
    r3 = random(0, 255);
    background(r, r2, r3);
    fill('white');
    textAlign(CENTER);
    textSize(64);
    text('HURT THEO', width / 2, height / 2 - 60);
    textSize(16);
    textFont('Georgia');
    text('make the anvils hit theos head', width / 2, height / 2 -30);
    text('avoid the dougs!', width / 2, height / 2 + 20);
    text('catch cleve to reset misses!', width / 2, height / 2 + 40);
    text('n and m to mute music', width/2, height/2 + 60);
    textSize(32);
    text('CLICK TO START', width / 2, height / 2 + 100);
    sleep(200);
    reset();
}

function gameOn() {
    background(linus);
    image(theo, mouseX, y, 100, 100);
    x = mouseX;
    if (keyIsPressed){
      if (keyCode == 77){
        music.setVolume(0.0);
      }if (keyCode == 78){
        music.setVolume(1);
      }
    }
    if (x >= width-100) {
      x = width-100; //stop theo going past screen borders
    } else if (x <= 0) {
        x = 0;
    }
    image(anvil, anvilx, anvily, 80, 80);
    image(cleve, clevex, clevey, 80, 80);
    image(doug, dougx, dougy, 80, 80);
    fill('black'); //displays the scores and misses
    textSize(16);
    text("Score = " + score, 40, 30);
    text("Misses = " + misses, 44, 50);
    text("Dougs hit = " + dougs + "/3", 60, 70);
    difficulty += 0.005 //gets faster as you go along
    anvily += difficulty; //anvil travels downwards 
    clevey += difficulty; //cleve travels downwards 
    dougy += difficulty;
    if (anvily > height) {
        randomAnvil();
        misses++; //if anvil touches bottom gain a miss
    } else if (anvily > height - 140 && anvilx > x - 50 && anvilx < x + 50) {
        randomAnvil();
        boink.play();
        score += 1; //if anvil collides with theo give a point
    }
    if (clevey > height) {
        randomCleve();
    } else if (clevey > height - 140 && clevex > x - 50 && clevex < x + 50) {
        randomCleve();
        munch.play();
        misses = 0; //if cleve collides with theo regain lives
    }
    if (dougy > height) {
        randomDoug();
    } else if (dougy > height - 140 && dougx > x - 50 && dougx < x + 50) {
        randomDoug(); //if doug collides with theo 3 times you lose
        fart.play();
        dougs++;
    }
    if (dougs == 3) {
        screen = 2;
    }
    if (misses == 5) {
        screen = 2;
    }
}

function randomAnvil() {
    anvilx = random(80, width - 80);
    anvily = -80; //moves anvil to top of screen, random x 
}

function randomCleve() {
    clevex = random(80, width - 80); //moves cleve a random distance, random amount of time before he is 
    clevey = random(-5000, -1000); //back on the screen
}

function randomDoug() {
    dougx = random(80, width - 80);
    dougy = random(-1000, -200);
}

function endScreen() {
    r = random(0, 255);
    r2 = random(0, 255);
    r3 = random(0, 255);
    background(r, r2, r3);
    fill('white');
    textAlign(CENTER);
    textSize(64);
    text('LOSER!!', width / 2, height / 2)
    textSize(16);
    text("SCORE = " + score, width / 2, height / 2 + 20)
    text('click to play again', width / 2, height / 2 + 40);
    image(end, 50, 250, 150, 150);
    sleep(200);
}

function mousePressed() {
    if (screen == 0) {
        screen = 1 //starts game
    } else if (screen == 2) {
        screen = 0 //goes back to start screen after losing
    }
}

function reset() {
    score = 0
    difficulty = 4;
    anvily = -20;
    misses = 0;
    dougs = 0;
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}