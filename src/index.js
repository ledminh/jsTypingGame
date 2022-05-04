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




let Boxes = [];

let life = 10;

//Screens
let GameOverScreen = null;


//Panels
let lifePanel = null;
let LevelPanel = null;
let LevelNotif = null;

// Control
let LevelControl = null;

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
const addLife = () => life++;
const minusLife = () => life--;

const isGameOver = () => life == 0;

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
            minusLife();
            lifePanel.updateLife(life);

            b.setClass("touch-ground");
            setTimeout(() => removeBox(b), TouchGroundEffectDuration + 10);

            if(isGameOver()) {
                gameOver();
            }
        }

    })
}

const onType = (char) => {
    Boxes.forEach(b => {
        const boxName = b.getName();
        
        if(!b.hasClass("to-be-destroyed") && boxName == char){
            addLife();
            lifePanel.updateLife(life);

            LevelControl.setLevel(life);

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



//***************************************************** */
// Init
//***************************************************** */

    //DOM Element
const setUpLifePanel = () => {
    lifePanel = createLifePanel();
    lifePanel.updateLife(life);
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
    GameOverScreen = createGameOverScreen();
    addElementToBody(GameOverScreen.getElement());
}

    // Control Unit
const setUpLevelControl = () => {
    LevelControl = createLevelControl(onLevelChange);
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

}




    //Adding Listener
const addTypingListener = () => {
    onCharacter(document.body, (char) => onType(char.toUpperCase()));
}




function init() {
    setUpLifePanel();
    

    setUpLevelControl();

    setUpLevelPanel();

    addTypingListener();
    
    setupLevelNotif();

    setUpGameOverScreen();
    
}




//***************************************************** */
// Run
//***************************************************** */

function run() {
    droppingAnimation = createAnimation(LevelControl.getDroppingTimeInterval(), () => dropping(droppingSpaceInterval), touchGround);
    droppingAnimation.run();

    addingAnimation = createAnimation(LevelControl.getAddingTimeInterval(), addBox);
    addingAnimation.run();
}

//***************************************************** */
// Game Over
//***************************************************** */



function gameOver()  {
    droppingAnimation.stop();
    addingAnimation.stop();
}



/***************************************
 * Execution 
 */
init();
//run();





