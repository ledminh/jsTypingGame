import _ from "lodash";

import "./css/styles.css";

import { ALPHABET_ARR } from "./constants";

import {addClassToElement, addElementTo, addElementToBody, createElement, onCharacter, onEnter, randomNum, removeClassFromElement, removeElementFromBody} from './utils';
import { createAnimation } from "./animation";
import {createBox} from './Box';
import { AddingTimeInterval, DestroyedEffectDuration, DroppingSpaceInterval, DroppingTimeInterval, GroundHeight, Level, LevelNotifPopUpTime, TouchGroundEffectDuration } from "./config";


import {createLevelControl} from './LevelControl';

let Boxes = [];

let life = 10;
let lifePanel = null;
let LevelPanel = null;
let LevelNotif = null;

let LevelControl = null;

let droppingAnimation = null,
    addingAnimation = null;

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

function createLevelPanel() {
    const PanelDiv = createElement("div", "level-panel");
    
    
    const ContentWrapperDiv = createElement("div", "content-wrapper");
    addElementTo(ContentWrapperDiv, PanelDiv);
    
    const Label = createElement("span", "label", "LEVEL ");
    addElementTo(Label, ContentWrapperDiv);

    const Level = createElement("span", "level");
    addElementTo(Level, ContentWrapperDiv);



    const getElement = () => PanelDiv;
    const setLevel = (level, endGame) => {
        if(endGame){
            addClassToElement("end-game", PanelDiv);
            Label.innerText = "";
            Level.innerText = "END GAME";
        }
        else {
            Level.innerText = level;
        }
    }

    return {
        getElement,
        setLevel
    }
}

function createLevelNotification() {
    const PanelDiv = createElement("div", "level-notif");
    

    const ContentWrapperDiv = createElement("div", "content-wrapper");
    addElementTo(ContentWrapperDiv, PanelDiv);
    
    const Label = createElement("span", "label", "LEVEL ");
    addElementTo(Label, ContentWrapperDiv);

    const Level = createElement("span", "level");
    addElementTo(Level, ContentWrapperDiv);

    const getElement = () => PanelDiv;
    const setLevel = (level, endGame) => {
        if(endGame){
            addClassToElement("end-game", PanelDiv);
            Label.innerText = "";
            Level.innerText = "END GAME";
        }
        else {
            Level.innerText = level;
            
        }
    }
    
    

    const popUp = () => {
        addClassToElement("pop-up", PanelDiv);

        setTimeout(() => {
            removeClassFromElement("pop-up", PanelDiv);
        }, LevelNotifPopUpTime + 10);
    }




    return {
        getElement,
        setLevel,
        popUp
    }
}

    const notifLevel = (level, isEndGame) => {
        LevelNotif.setLevel(level, isEndGame);
        LevelNotif.popUp();
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

const gameOver = () => {
    droppingAnimation.stop();
    addingAnimation.stop();
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

    notifLevel(level, LevelControl.isEndGame());
}



//***************************************************** */
// Init
//***************************************************** */

const createLifePanel = () => {
    const lifePanel = createElement("div", "life-panel");
    
    const labelDiv = createElement("div", "label");
    labelDiv.innerText = "LIFE";
    addElementTo(labelDiv, lifePanel);

    const lifeDiv = createElement("div", "life");
    addElementTo(lifeDiv, lifePanel);

    

    return {
        getElement: () => lifePanel,
        updateLife: (life) => lifeDiv.innerText = life 
    }
} 



const setUpLifePanel = () => {
    lifePanel = createLifePanel();
    lifePanel.updateLife(life);
    addElementToBody(lifePanel.getElement());

}

const setUpLevelControl = () => {
    LevelControl = createLevelControl(onLevelChange);
    droppingSpaceInterval = LevelControl.getDroppingSpaceInterval();

}

const setUpLevelPanel = () => {
    LevelPanel = createLevelPanel();
    addElementToBody(LevelPanel.getElement());
    LevelPanel.setLevel(LevelControl.getLevel());
}

const addTypingListener = () => {
    onCharacter(document.body, (char) => onType(char.toUpperCase()));
}




function init() {
    setUpLifePanel();

    setUpLevelControl();

    setUpLevelPanel();

    addTypingListener();
    
    
    LevelNotif = createLevelNotification();
    addElementToBody(LevelNotif.getElement());
    LevelNotif.setLevel(LevelControl.getLevel());
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






/***************************************
 * Execution 
 */
init();
//run();





