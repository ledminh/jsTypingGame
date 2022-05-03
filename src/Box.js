import { createElement } from "./utils";

export {
    createBox
}



function createBox(boxName) {
    //Initialize
    const Box = createElement('div', "box", boxName);

    //Private functions
    const getRadius = () => Box.getBoundingClientRect().width/2;
    const getLeft = () => Box.getBoundingClientRect().left;
    const getTop = () => Box.getBoundingClientRect().top;

    const setXCoord = (xCoord) => Box.style.left = (xCoord - getRadius()) + "px"; 
    const setYCoord = (yCoord) => Box.style.top = (yCoord - getRadius()) + "px";



    //Public functions
    const getElement = () => Box;

    
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
        getCenter,
        getRadius,
        isTouch
    }
}

