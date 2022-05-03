import _, { inRange } from "lodash";

import "./css/styles.css";

import { ALPHABET_ARR, MAX_INITIAL_BOXES } from "./constants";

import {addElementToBody, randomNum} from './utils';
import {createBox} from './Box';


const Boxes = [];


/***************************************
 * Functions 
 */

    // *************************
    // Helpers
const isTouch = (xCoord, yCoord, radius) => Boxes.reduce((result, currentB) => {
                                            
                                            if(result == true) return true;
                                            
                                            return currentB.isTouch(xCoord, yCoord, radius);

                                        }, false);











    // *************************
    // Will Be Executed
const initBoxes = () => _.range(0, MAX_INITIAL_BOXES).forEach((i) => {
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
});



/***************************************
 * Execution 
 */
initBoxes();

