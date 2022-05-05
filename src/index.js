import _ from "lodash";

import "./css/styles.css";

import { ALPHABET_ARR } from "./constants";

import {addClassToElement, addElementTo, addElementToBody, createElement, onCharacter, onEnter, randomNum, removeClassFromElement, removeElementFromBody} from './utils';
import { createAnimation } from "./animation";
import {createBox} from './Box';
import { AddingTimeInterval, DestroyedEffectDuration, DroppingSpaceInterval, DroppingTimeInterval, GroundHeight, Level, LevelNotifPopUpTime, TouchGroundEffectDuration } from "./config";


import { createLevelPanel } from "./components/LevelPanel";
import { createLifePanel } from "./components/LifePanel";
import { createLevelNotification } from "./components/LevelNotification";


import {createLevelControl} from './LevelControl';
import { createGameOverScreen } from "./components/GameOverScreen";
import { createLifeControl } from "./components/LifeControl";


let Boxes = [];


//Screens
let GameOverScreen = null;


//Panels
let lifePanel = null;
let LevelPanel = null;
let LevelNotif = null;


// Control
let LevelControl = null;
let LifeControl = null;


// Animations
let droppingAnimation = null,
    addingAnimation = null;


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
        const nextY = center.y + droppingSpaceInterval;

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



//***************************************************** */
// Init
//***************************************************** */

    //DOM Element
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


const setUpGameOverScreen = () => {
    GameOverScreen = createGameOverScreen(playAgainHandle);
    addElementToBody(GameOverScreen.getElement());
}

    // Control Unit
const setUpLevelControl = () => {
    LevelControl = createLevelControl(onLevelChange);
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

}

const setupLifeControl = () => {
    LifeControl = createLifeControl();  
}


    //Animation
const setUpAnimation = () => {
    droppingAnimation = createAnimation(LevelControl.getDroppingTimeInterval(), () => dropping(droppingSpaceInterval), touchGround);

    addingAnimation = createAnimation(LevelControl.getAddingTimeInterval(), addBox);
    
}

    //Adding Listener
const addTypingListener = () => {
    onCharacter(document.body, (char) => onType(char.toUpperCase()));
}




function init() {
    setupLifeControl();
    setUpLifePanel();
    

    setUpLevelControl();

    setUpLevelPanel();

    addTypingListener();
    
    setupLevelNotif();

    setUpGameOverScreen();

    setUpAnimation();
}




//***************************************************** */
// Run
//***************************************************** */

function run() {
    droppingAnimation.run();
    addingAnimation.run();
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
//run();





