import  { random } from "lodash";

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
let Clouds = null;


//Screens
let GameOverScreen = null;
let StartScreen = null;


//Panels
let lifePanel = null;
let LevelPanel = null;
let LevelNotif = null;


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

    // *************************
    // Helpers

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
        LifeControl.reset();
        lifePanel.updateLife(LifeControl.getLife());

        LevelControl.reset();

        LevelPanel.reset();
        LevelPanel.setLevel(LevelControl.getLevel(), LevelControl.isEndGame());

        LevelNotif.reset();


        clearBox();

    }
   
    function reRun() {
        droppingAnimation.reRun();
        addingAnimation.reRun();
    }

    // *************************
    // Will Be Executed

const dropping = () => {
    Boxes.forEach(b => {
        const center = b.getCenter();
        const nextY = center.y + droppingSpaceInterval*b.getSpeedParam();

        b.setPos(center.x, nextY);
    });

}

const removeBox = (box) => {
    const boxNode = box.getElement();

    if(boxNode.parentNode){
        removeElementFromBody(boxNode);
    }
    
    Boxes = Boxes.filter(b => b != box);

    
}



//***************************************************** */
// Event Listenner
//***************************************************** */
const touchGround = () => {
    Boxes.forEach(b => {
        const centerY = b.getCenter().y;

        if(!b.hasClass("touch-ground") && centerY >= window.innerHeight - GroundHeight){
            SoundControl.playDroppingSound();
            LifeControl.minusLife();
            lifePanel.updateLife(LifeControl.getLife());

            b.setClass("touch-ground");
            setTimeout(() => removeBox(b), TouchGroundEffectDuration + 10);

            if(LifeControl.isGameOver()) {
                gameOver();
            }
        }

    })
}

const onType = (char) => {
    Boxes.forEach(b => {
        const boxName = b.getName();
        
        if(!b.hasClass("to-be-destroyed") && boxName == char){
            SoundControl.playPoppingSound();

            LifeControl.addLife();
            lifePanel.updateLife(LifeControl.getLife());

            LevelControl.setLevel(LifeControl.getLife());

            b.setClass("to-be-destroyed");
            setTimeout(() => removeBox(b), DestroyedEffectDuration);
        }
    })
}

const onLevelChange = (level) => {
    droppingAnimation.setTimeInterval(LevelControl.getDroppingTimeInterval());
    addingAnimation.setTimeInterval(LevelControl.getAddingTimeInterval());
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

    LevelPanel.setLevel(level, LevelControl.isEndGame());

    LevelNotif.popUp(level, LevelControl.isEndGame());
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

//***************************************************** */
// Init
//***************************************************** */

    //DOM Element

const addSun = () =>{
    const sun = createElement("img", "sun");
    sun.src = sunIMG;

    sun.style.left = random(0, window.innerWidth*2/3) + "px";
    
    addElementToBody(sun);
}   

const addGround = () => {
    const ground = createElement("div", "ground");

    

    ground.style.background = `url(${groundImg}) repeat-x`;
    ground.style.height =  (GroundHeight + 50)  + "px";
    ground.style.backgroundSize =  "auto " + " 100%";

    addElementToBody(ground);



}

const setUpClouds = () => {
    Clouds = createClouds();   

    const CloudsElems = Clouds.getClouds();

    CloudsElems.forEach(cld => {
        addElementToBody(cld.getElement());

        cld.setLeft(random(0, window.innerWidth - 100));
    });
}

const setUpLifePanel = () => {
    lifePanel = createLifePanel();
    lifePanel.updateLife(LifeControl.getLife());
    addElementToBody(lifePanel.getElement());

}

const setUpLevelPanel = () => {
    LevelPanel = createLevelPanel();
    addElementToBody(LevelPanel.getElement());
    LevelPanel.setLevel(LevelControl.getLevel());
}

const setupLevelNotif = () => {
    LevelNotif = createLevelNotification();
    addElementToBody(LevelNotif.getElement());
    LevelNotif.setLevel(LevelControl.getLevel());
}

function setupComponents() {
    setUpLifePanel();
    setUpLevelPanel();
    setupLevelNotif();

    addGround();
    setUpClouds();
    addSun();
}


const setUpGameOverScreen = () => {
    GameOverScreen = createGameOverScreen(playAgainHandle);
    addElementToBody(GameOverScreen.getElement());
}

const setUpStartScreen = () => {
    StartScreen = createStartScreen(playButtonStartScreenOnClick);
    
    addElementToBody(StartScreen.getElement());
}

function setupScreens() {
    setUpStartScreen();
    setUpGameOverScreen();
}

    // Control Unit
const setUpLevelControl = () => {
    LevelControl = createLevelControl(onLevelChange);
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

}

const setupLifeControl = () => {
    LifeControl = createLifeControl();  
}

const setUpSoundControl = () => {
    SoundControl = createSoundControl();
}

function setupControls() {
    setupLifeControl();
    setUpLevelControl();
    setUpSoundControl();
}

    //Animation
const setUpAnimation = () => {
    droppingAnimation = createAnimation(LevelControl.getDroppingTimeInterval(), () => dropping(droppingSpaceInterval), touchGround);

    addingAnimation = createAnimation(LevelControl.getAddingTimeInterval(), addBox);
    
    movingCloudAnimation = createAnimation(MovingCloudTimeInterval, () => Clouds.move(MovingCloudSpaceInterval));
}

    //Adding Listener
const addTypingListener = () => {
    onCharacter(document.body, (char) => onType(char.toUpperCase()));
}




function init() {
    setupControls();
    setupComponents();
    setupScreens();
    setUpAnimation();


    addTypingListener();
    
    


    


}




//***************************************************** */
// Run
//***************************************************** */

function run() {
    droppingAnimation.run();
    addingAnimation.run();
    movingCloudAnimation.run();

    SoundControl.playBackgroundMusic();
}

//***************************************************** */
// Game Over
//***************************************************** */


function gameOver()  {
    stop();
    GameOverScreen.show();
}



/***************************************
 * Execution 
 */
init();






