import  { create, random } from "lodash";

import "./css/styles.css";

import { ALPHABET_ARR } from "./constants";

import {addElementToBody, createElement, onCharacter,  randomNum,  removeElementFromBody} from './utils';
import { createAnimation } from "./animation";
import {createBox} from './Box';
import { DestroyedEffectDuration, GroundHeight, TouchGroundEffectDuration, MovingCloudSpaceInterval, MovingCloudTimeInterval } from "./config";


import { createLevelPanel } from "./components/LevelPanel";
import { createLifePanel } from "./components/LifePanel";
import { createLevelNotification } from "./components/LevelNotification";


import {createLevelControl} from './LevelControl';
import { createGameOverScreen } from "./components/GameOverScreen";

import { createStartScreen } from "./components/StartScreen";

import { createLifeControl } from "./components/LifeControl";

import groundImg from './imgs/ground.png';
import { createClouds } from "./components/Clouds";

import sunIMG from './imgs/sun.png';


import {createSoundControl} from "./SoundControl";

let Boxes = [];



//Screens
let GameOverScreen = null;
let StartScreen = null;


//Components
    //Panels
let LifePanel = null;
let LevelPanel = null;
let LevelNotif = null;

    //Background components
let Clouds = null;
let Sun = null;
let Ground = null;

// Control
let LevelControl = null;
let LifeControl = null;
let SoundControl = null;


// Animations
let droppingAnimation = null,
    addingAnimation = null,
    movingCloudAnimation = null;


// Configuration
let droppingSpaceInterval = null;


/***************************************
 * Functions 
 */

const clearBox = () => {
    Boxes.forEach(b => b.getElement().parentNode? b.getElement().parentNode.removeChild(b.getElement()) : false);
    Boxes = []; 
}

    
const stop = () => {
    droppingAnimation.stop();
    addingAnimation.stop();
    movingCloudAnimation.stop();
}

function reset() {
    LifeControl.init();
    LifePanel.updateLife(LifeControl.getLife());

    LevelControl.init();
    droppingAnimation.setTimeInterval(LevelControl.getDroppingTimeInterval());
    addingAnimation.setTimeInterval(LevelControl.getAddingTimeInterval());
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

    LevelPanel.setLevel(LevelControl.getLevel(), LevelControl.isEndGame());
    


    clearBox();

}
   
function reRun() {
    droppingAnimation.reRun();
    addingAnimation.reRun();
    movingCloudAnimation.reRun();
}


const removeBox = (box) => {
    const boxNode = box.getElement();

    if(boxNode.parentNode){
        removeElementFromBody(boxNode);
    }
    
    Boxes = Boxes.filter(b => b != box);

    
}



//***************************************************** */
// Event Listenners
//***************************************************** */




const onLevelChange = (level) => {
    droppingAnimation.setTimeInterval(LevelControl.getDroppingTimeInterval());
    addingAnimation.setTimeInterval(LevelControl.getAddingTimeInterval());
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

    LevelPanel.setLevel(level, LevelControl.isEndGame());

    LevelNotif.setLevel(level, LevelControl.isEndGame());
    LevelNotif.popUp();
}


const playAgainHandle = () => {
    reset();
    GameOverScreen.hide();
    
    reRun();
}

const playButtonStartScreenOnClick = () => {
    StartScreen.hide();
    run();
}


const onType = (char) => {
    Boxes.forEach(b => {
        const boxName = b.getName();
        
        if(!b.hasClass("to-be-destroyed") && boxName == char){
            SoundControl.playPoppingSound();

            LifeControl.addLife();
            LifePanel.updateLife(LifeControl.getLife());

            LevelControl.setLevel(LifeControl.getLife());

            b.setClass("to-be-destroyed");
            setTimeout(() => removeBox(b), DestroyedEffectDuration);
        }
    })
}

const addListeners = () => {
    onCharacter(document.body, (char) => onType(char.toUpperCase()));
}


//***************************************************** */
// Components
//***************************************************** */

const createSun = () =>{
    const sun = createElement("img", "sun");
    sun.src = sunIMG;
    sun.style.left = random(0, window.innerWidth*2/3) + "px";
    
    return sun;
    
}   

const createGround = () => {
    const ground = createElement("div", "ground");

    
    ground.style.background = `url(${groundImg}) repeat-x`;
    ground.style.height =  (GroundHeight + 50)  + "px";
    ground.style.backgroundSize =  "auto " + " 100%";


    return ground;
    
    

}

const addCloudsToBody = () => {
    const CloudsElems = Clouds.getClouds();

    CloudsElems.forEach(cld => {
        addElementToBody(cld.getElement());     
    });
}


function createComponents() {
    Sun = createSun();
    Ground = createGround();
    Clouds = createClouds();

    LifePanel = createLifePanel();
    LevelPanel = createLevelPanel();
    LevelNotif = createLevelNotification();

}

function addComponents() {
    addElementToBody(Sun);
    addElementToBody(Ground);
    addCloudsToBody();

    addElementToBody(LifePanel.getElement());
    addElementToBody(LevelPanel.getElement());
    addElementToBody(LevelNotif.getElement());

}



//***************************************************** */
// Screens
//***************************************************** */

function createScreens() {
    StartScreen = createStartScreen(playButtonStartScreenOnClick);
    GameOverScreen = createGameOverScreen(playAgainHandle);
}

function addScreens() {
    addElementToBody(StartScreen.getElement());
    addElementToBody(GameOverScreen.getElement());
}


//***************************************************** */
// Controls
//***************************************************** */

const afterInitLifeControl = (life) => {

    LifePanel.updateLife(life);  
}

const afterInitLevelControl = (level, droppingSpaceItv, droppingTimeItv, addingTimeItv) => {
    
    //Update Level on Panel
    LevelPanel.setLevel(level);
    LevelNotif.setLevel(level);

    //Update animations
    droppingSpaceInterval = droppingSpaceItv;
    droppingAnimation.setTimeInterval(droppingTimeItv);

    addingAnimation.setTimeInterval(addingTimeItv);
}
    

function createControls() {
    LevelControl = createLevelControl(afterInitLevelControl, onLevelChange);
    LifeControl = createLifeControl(afterInitLifeControl);  

    SoundControl = createSoundControl();

}



//***************************************************** */
// Animations
//***************************************************** */
const dropping = () => {
    Boxes.forEach(b => {
        const center = b.getCenter();
        const nextY = center.y + droppingSpaceInterval*b.getSpeedParam();

        b.setPos(center.x, nextY);
    });

}

const touchGround = () => {
    Boxes.forEach(b => {
        const centerY = b.getCenter().y;

        if(!b.hasClass("touch-ground") && centerY >= window.innerHeight - GroundHeight){
            SoundControl.playDroppingSound();
            LifeControl.minusLife();
            LifePanel.updateLife(LifeControl.getLife());

            b.setClass("touch-ground");
            setTimeout(() => removeBox(b), TouchGroundEffectDuration + 10);

            if(LifeControl.isGameOver()) {
                gameOver();
            }
        }

    })
}


//addBox and helper
const isTouch = (xCoord, yCoord, radius) => Boxes.reduce((result, currentB) => {
                                        
    if(result == true) return true;
    
    return currentB.isTouch(xCoord, yCoord, radius);

}, false);


const addBox = () => {
    const Box = createBox(ALPHABET_ARR[randomNum(0, ALPHABET_ARR.length)]);
    addElementToBody(Box.getElement());

    //setPos
    const yCoord = -Box.getRadius();
    let xCoord = randomNum(Box.getRadius(), window.innerWidth - Box.getRadius());
    
    while(isTouch(xCoord, yCoord, Box.getRadius())){
        
        xCoord = randomNum(Box.getRadius(), window.innerWidth - Box.getRadius());
    }
    
    
    Box.setPos(xCoord, yCoord);
    
    //Add to Boxes
    Boxes.push(Box);
}

const createAnimations = () => {
    droppingAnimation = createAnimation(() => dropping(droppingSpaceInterval), touchGround);  

    addingAnimation = createAnimation(addBox);
    
    movingCloudAnimation = createAnimation(() => Clouds.move(MovingCloudSpaceInterval));
    movingCloudAnimation.setTimeInterval(MovingCloudTimeInterval);
}


//***************************************************** */
// Execution Functions
//***************************************************** */
    

    /******************
     * INIT
     * ****************/
function init() {
    createComponents();
    addComponents();

    createAnimations();

    createControls();

    createScreens();
    addScreens();


    addListeners();

    

}


    /******************
     * RUN
     * ****************/
function run() {
    droppingAnimation.run();
    addingAnimation.run();
    movingCloudAnimation.run();

    SoundControl.playBackgroundMusic();
}


    /******************
     * GAME OVER
     * ****************/
function gameOver()  {
    stop();
    GameOverScreen.show();
}



//***************************************************** */
// EXECUTION
//***************************************************** */

init();






