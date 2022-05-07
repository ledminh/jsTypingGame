import { random } from "lodash";
import { createElement } from "./utils";

export {
    createBox
}



function createBox(boxName) {
    //Initialize
    const Box = createElement('div', "box", boxName);
    Box.style.zIndex = random(1,3);


    const speedParam = random(.8, 1.1);

    //Private functions
    const getRadius = () => Box.getBoundingClientRect().width/2;
    const getLeft = () => Box.getBoundingClientRect().left;
    const getTop = () => Box.getBoundingClientRect().top;

    const setXCoord = (xCoord) => Box.style.left = (xCoord - getRadius()) + "px"; 
    const setYCoord = (yCoord) => Box.style.top = (yCoord - getRadius()) + "px";



    //Public functions
    const getElement = () => Box;
    const getName = () => boxName;
    const getSpeedParam = () => speedParam;

    const setClass = (className) => Box.classList.add(className);
    const hasClass = (className) => Box.classList.contains(className);
    const setPos = (xCoord, yCoord) => {
        setXCoord(xCoord);
        setYCoord(yCoord);
    }

    const getCenter = () => ({
        x: getLeft() + getRadius(),
        y: getTop() + getRadius()
    })

    const isTouch = (otherX, otherY, otherRadius) => {
        const thisBoxCenter = getCenter();
        const thisRadius = getRadius();
        
        const distanceSqrt = (otherX - thisBoxCenter.x)*(otherX - thisBoxCenter.x) 
                                + (otherY - thisBoxCenter.y)*(otherY - thisBoxCenter.y);
        
        return distanceSqrt <= (thisRadius + otherRadius)*(thisRadius + otherRadius); 

    }

    return {
        getElement,
        setPos,
        setClass,
        hasClass,
        getCenter,
        getRadius,
        isTouch,
        getName,
        getSpeedParam
    }
}

