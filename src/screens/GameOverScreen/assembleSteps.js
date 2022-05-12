import {addElementTo, createElement } from "../../utils";

const assembleSteps = {
    createTextDiv: () => createElement("div", "text", "GAME OVER"),
    
    createButtonsDiv: ({playAgainHandle, quitHandle}) => {
        const buttonsDiv = createElement("div", "buttons");
        
        const playAgainButton = createElement("button", "play-again", "PLAY AGAIN?");
        addElementTo(playAgainButton, buttonsDiv);
        playAgainButton.addEventListener("click", playAgainHandle);

        const quitButton = createElement("button", "quit", "QUIT");
        addElementTo(quitButton, buttonsDiv);
        quitButton.addEventListener("click", quitHandle);

        

        return buttonsDiv;
    } 


}

export default assembleSteps;