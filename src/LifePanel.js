import { addElementTo, createElement } from "./utils";

export {
    createLifePanel
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