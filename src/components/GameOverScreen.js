import { addClassToElement, addElementTo, createElement, removeClassFromElement, removeElementFrom } from "../utils";

export {
    createGameOverScreen
}


function createCreditScreen() {
    const creditScreen = createElement("div", "credit-screen");

    const thankyouNote = createElement("h2", "thank-you", "THANK YOU FOR PLAYING");
    addElementTo(thankyouNote, creditScreen);

    const authorLine = createElement("h3", "author", "This game is created by Minh Le");
    addElementTo(authorLine, creditScreen);

    const contactList = createElement("div", "contact-list");
    addElementTo(contactList, creditScreen);

    contactList.innerHTML = `You can find me at:
                            <ul>
                                <li><a href="https://www.linkedin.com/in/ledminh/">LinkedIn</a></li>
                                <li><a href="https://github.com/ledminh">Github</a></li>
                                <li><a href="https://www.ledminh.com/">LEDMINH.COM</a></li>
                                <li><a href="https://www.ledminh.dev/">LEDMINH.DEV</a></li>
                            </ul>`


    return creditScreen;
}


function createGameOverScreen(playAgainHandle, quitHandle) {
    const GameOverScreen = createElement("div", "game-over-screen");
    
    // TODO: uncomment after finish quit screen
    // addClassToElement("hidden", GameOverScreen);

    const contentWrapper = createElement("div", "content-wrapper");
    addElementTo(contentWrapper, GameOverScreen);

    const textDiv = createElement("div", "text", "GAME OVER");
    const buttonsDiv = createElement("div", "buttons");


    const creditScreen = createCreditScreen();
    addElementTo(creditScreen, contentWrapper);



    // 
    // addElementTo(textDiv, contentWrapper);

    // 
    // addElementTo(buttonsDiv, contentWrapper);


    
    function quitHandle() {
        removeElementFrom(textDiv, contentWrapper);
        removeElementFrom(buttonsDiv, contentWrapper);

    }


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