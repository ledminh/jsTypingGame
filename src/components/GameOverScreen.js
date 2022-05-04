import { addElementTo, createElement } from "../utils";

export {
    createGameOverScreen
}

function createGameOverScreen() {
    const GameOverScreen = createElement("div", "game-over-screen");
    
    const contentWrapper = createElement("div", "content-wrapper");
    addElementTo(contentWrapper, GameOverScreen);

    const textDiv = createElement("div", "text", "GAME OVER");
    addElementTo(textDiv, contentWrapper);

    const buttonsDiv = createElement("div", "buttons");
    addElementTo(buttonsDiv, contentWrapper);



    const playAgainButton = createElement("button", "play-again", "PLAY AGAIN?");
    addElementTo(playAgainButton, buttonsDiv);

    const quitButton = createElement("button", "quit", "QUIT");
    addElementTo(quitButton, buttonsDiv);



    const getElement = () => GameOverScreen;


    return {
        getElement
    }
}