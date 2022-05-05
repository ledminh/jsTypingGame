import { createElement, addElementTo, addClassToElement, removeClassFromElement } from "../utils";

export {
    createLevelPanel
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
    
    const reset = () => {
        removeClassFromElement("end-game", PanelDiv);
        Label.innerText = "LEVEL ";
    }

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
        setLevel,
        reset
    }
}