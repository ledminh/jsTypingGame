import {addElementTo, createElement } from "../../utils";

const assembleSteps = {
    createTextDiv: (wrapper) => {
        const textDiv = createElement("div", "text", "GAME OVER");
        addElementTo(textDiv, wrapper);

        return wrapper;
    },
    
    createButtonsDiv: (wrapper, {playAgainHandle, quitHandle}) => {
        const buttonsDiv = createElement("div", "buttons");
        
        const playAgainButton = createElement("button", "play-again", "PLAY AGAIN?");
        addElementTo(playAgainButton, buttonsDiv);
        playAgainButton.addEventListener("click", playAgainHandle);

        const quitButton = createElement("button", "quit", "QUIT");
        addElementTo(quitButton, buttonsDiv);
        quitButton.addEventListener("click", quitHandle);

        
        addElementTo(buttonsDiv, wrapper);

        return wrapper;
    } 


}

export default assembleSteps;