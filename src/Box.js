import { createElement } from "./utils";

export {
    createBox
}



function createBox(boxName) {
    //Initialize
    const Box = createElement('div', "box", boxName);

    //Functions
    const getElement = () => Box;


    
    
    
    






    return {
        getElement
    }
}

