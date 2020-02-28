
// button constructor
function Button(name, cssId, soundPath) {
    
    this.name = name;
    this.htmlNode = $(cssId);
    this.sound = new Audio(soundPath);
    this.makeSound = () => this.sound.play();
}

// button instanciation 
const greenBtn = new Button("green", "#green","sounds/green.mp3");
const redBtn = new Button("red", "#red", "sounds/red.mp3" );
const blueBtn = new Button("blue", "#blue", "sounds/blue.mp3");
const yellowBtn = new Button("yellow", "#yellow", "sounds/yellow.mp3");

const buttons = [greenBtn, redBtn, blueBtn, yellowBtn];


var position = 0;
var level = 1;

const pattern = [];

function raiseLevel() {
    level++;
}

function writeLevelTitle() {
    $("#level-title").text("Level  " + level);
}

function writeErrorTitle() {
    $('#level-title').text("Game-Over");
}

function makeLoseSound() {
    const loseSound = new Audio("sounds/wrong.mp3");
    loseSound.play();
}




function changeButtonToPressed(button) {
    button.toggleClass("pressed");
    setTimeout(() => button.toggleClass("pressed"), 500);

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}



function registerRandomPattern() {
    let randomPosition = getRandomInt(0,buttons.length);
    randomBtn = buttons[randomPosition];
    node = randomBtn.htmlNode;
    changeButtonToPressed(node);
    randomBtn.makeSound();
    pattern.push(randomBtn.name);
    position = 0;
}

function registerRandomPatternFirstTime() {
    let randomPosition = Math.floor(Math.random() * buttons.length );
    randomBtn= buttons[randomPosition];
    node = randomBtn.htmlNode;
    writeLevelTitle();
    changeButtonToPressed(node);
    pattern.push(randomBtn.name);

}



function registerPattern(buttonPressed) {
    let id = buttonPressed.prop("id");
    console.log(id + " " + pattern[position]);
   
    if (id === pattern[position]) {
        
        position++;
        console.log(pattern.length + " " + position);
        return true;
    }
    else {
        console.log("wrong");
        return false;
    }
}


function gameLogic(button) {
    buttonNode = button.htmlNode;
    changeButtonToPressed(buttonNode);
    button.makeSound();
    if(registerPattern(buttonNode)&& position === pattern.length ) {
        setTimeout(() => {
           registerRandomPattern();
        }, 700); 
        raiseLevel();
        writeLevelTitle();
    }
    else { 
        writeErrorTitle();
        makeLoseSound();

    }
}

$(document).on("keypress", () => registerRandomPatternFirstTime());

greenBtn.htmlNode.on("click", () => {
    gameLogic(greenBtn);

});

redBtn.htmlNode.on("click", () => {
   gameLogic(redBtn);


});

blueBtn.htmlNode.on("click", () => {
   gameLogic(blueBtn);

});


yellowBtn.htmlNode.on("click", () => {
    gameLogic(yellowBtn);

});


