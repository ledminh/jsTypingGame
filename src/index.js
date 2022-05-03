import _ from "lodash";

import "./css/styles.css";

import { ALPHABET_ARR, MAX_INITIAL_BOXES } from "./constants";

import {addElementToBody, randomNum, removeElementFromBody} from './utils';
import { createAnimation } from "./animation";
import {createBox} from './Box';
import { AddingTimeInterval, DroppingSpaceInterval, DroppingTimeInterval, GroundHeight, TouchGroundEffectDuration } from "./config";


let Boxes = [];


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
            b.setClass("touch-ground");
            setTimeout(() => removeBox(b), TouchGroundEffectDuration + 10);
        }

    })
}

/***************************************
 * Execution 
 */

// const droppingAnimation = createAnimation(DroppingTimeInterval, dropping, touchGround);
// droppingAnimation.run();

// const addingAnimation = createAnimation(AddingTimeInterval, addBox);
// addingAnimation.run();