import { addClassToElement, addElementTo, createElement, removeClassFromElement } from "../utils";

export {
    createGameOverScreen
}

function createGameOverScreen(playAgainHandle, quitHandle) {
    const GameOverScreen = createElement("div", "game-over-screen");
    addClassToElement("hidden", GameOverScreen);

    const contentWrapper = createElement("div", "content-wrapper");
    addElementTo(contentWrapper, GameOverScreen);

    const textDiv = createElement("div", "text", "GAME OVER");
    addElementTo(textDiv, contentWrapper);

    const buttonsDiv = createElement("div", "buttons");
    addElementTo(buttonsDiv, contentWrapper);



    const playAgainButton = createElement("button", "play-again", "PLAY AGAIN?");
    addElementTo(playAgainButton, buttonsDiv);
    playAgainButton.addEventListener("click", playAgainHandle);

    const quitButton = createElement("button", "quit", "QUIT");
    addElementTo(quitButton, buttonsDiv);
    quitButton.addEventListener("click", quitHandle);


    const getElement = () => GameOverScreen;

    const show = () => removeClassFromElement("hidden", GameOverScreen);
    const hide = () => addClassToElement("hidden", GameOverScreen);

    return {
        getElement,
        show,
        hide
    }
}