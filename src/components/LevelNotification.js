import { LevelNotifPopUpTime } from "../config";
import { addClassToElement, addElementTo, createElement, removeClassFromElement } from "../utils";

LevelNotifPopUpTime
export {
    createLevelNotification
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
            removeClassFromElement("end-game", PanelDiv);
            Label.innerText = "LEVEL ";
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
        popUp,
        setLevel
    }
}
