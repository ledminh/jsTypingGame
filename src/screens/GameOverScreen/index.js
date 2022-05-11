import "./style.css";

import { addElementTo, createElement } from "../../utils";

export {
    createGameOverScreenContent,
    GAME_OVER_SCREEN_CLASS
}

const GAME_OVER_SCREEN_CLASS = "game-over-screen";

function createGameOverScreenContent({playAgainHandle, quitHandle}) {
    const contentWrapper = createElement("div", "content-wrapper");
    
    //textDiv
    const textDiv = createElement("div", "text", "GAME OVER");
    addElementTo(textDiv, contentWrapper);

    //buttonDiv
    const buttonsDiv = createElement("div", "buttons");
    
    const playAgainButton = createElement("button", "play-again", "PLAY AGAIN?");
    addElementTo(playAgainButton, buttonsDiv);
    playAgainButton.addEventListener("click", playAgainHandle);

    const quitButton = createElement("button", "quit", "QUIT");
    addElementTo(quitButton, buttonsDiv);
    quitButton.addEventListener("click", quitHandle);

    
    addElementTo(buttonsDiv, contentWrapper);

    
    return contentWrapper;
    
}








