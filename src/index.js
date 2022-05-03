import _ from "lodash";

import "./css/styles.css";

import { ALPHABET_ARR } from "./constants";

import {addElementTo, addElementToBody, createElement, onCharacter, randomNum, removeElementFromBody} from './utils';
import { createAnimation } from "./animation";
import {createBox} from './Box';
import { AddingTimeInterval, DestroyedEffectDuration, DroppingSpaceInterval, DroppingTimeInterval, GroundHeight, TouchGroundEffectDuration } from "./config";


let Boxes = [];

let life = 10;
let lifePanel = null;


/***************************************
 * Functions 
 */

    // *************************
    // Helpers
    const addLife = () => life++;
    const minusLife = () => life--;

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
        const nextY = center.y + DroppingSpaceInterval;

        b.setPos(center.x, nextY);
    });

}

const removeBox = (box) => {
    const boxNode = box.getElement();

    removeElementFromBody(boxNode);
    
    Boxes = Boxes.filter(b => b != box);

    
}

const touchGround = () => {
    Boxes.forEach(b => {
        const centerY = b.getCenter().y;

        if(!b.hasClass("touch-ground") && centerY >= window.innerHeight - GroundHeight){
            minusLife();
            lifePanel.updateLife(life);

            b.setClass("touch-ground");
            setTimeout(() => removeBox(b), TouchGroundEffectDuration + 10);
        }

    })
}

const onType = (char) => {
    Boxes.forEach(b => {
        const boxName = b.getName();
        
        if(!b.hasClass("to-be-destroyed") && boxName == char){
            addLife();
            lifePanel.updateLife(life);
            b.setClass("to-be-destroyed");
            setTimeout(() => removeBox(b), DestroyedEffectDuration);
        }
    })
}

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

/***************************************
 * Execution 
 */

lifePanel = createLifePanel();
lifePanel.updateLife(life);
addElementToBody(lifePanel.getElement());

onCharacter(document.body, (char) => onType(char.toUpperCase()));


// const droppingAnimation = createAnimation(DroppingTimeInterval, dropping, touchGround);
// droppingAnimation.run();

// const addingAnimation = createAnimation(AddingTimeInterval, addBox);
// addingAnimation.run();


