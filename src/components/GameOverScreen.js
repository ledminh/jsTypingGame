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

    const creditLine = createElement("div", "other-credits");
    addElementTo(creditLine, creditScreen);

    creditLine.innerHTML = `<p>Music: 
                            <p>Uppbeat (https://uppbeat.io/t/hartzmann/sunny) - License code: 9OWFUTHDBK9DYJSQ</p>    
                            <p>and www.bensound.com</p>`



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
    
    
    addClassToElement("hidden", GameOverScreen);

    const contentWrapper = createElement("div", "content-wrapper");
    addElementTo(contentWrapper, GameOverScreen);

    const textDiv = createElement("div", "text", "GAME OVER");
    addElementTo(textDiv, contentWrapper);

    const buttonsDiv = createElement("div", "buttons");
    addElementTo(buttonsDiv, contentWrapper);

    const creditScreen = createCreditScreen();
    addClassToElement("hidden", creditScreen);
    addElementTo(creditScreen, contentWrapper);

    const showCreditScreen = () => removeClassFromElement("hidden", creditScreen);

    
    function quitHandle() {
        removeElementFrom(textDiv, contentWrapper);
        removeElementFrom(buttonsDiv, contentWrapper);

        showCreditScreen();
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