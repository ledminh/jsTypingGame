import {addElementTo, createElement } from "../utils";
import { createScreen } from "../screens/createScreen";




export {
    createStartScreen
}

function createStartScreenContent(playOnClick) {
    const contentWrapper = createElement("div", "content-wrapper");
    

    const title = createElement("h1", "title", "TYPING FAST");
    addElementTo(title, contentWrapper);

    const subtitle = createElement("h4", "subtitle", "LET'S SEE HOW FAST YOU CAN TYPE");
    addElementTo(subtitle, contentWrapper);

    const intro = createElement("div", "intro");
    intro.innerHTML = `<p>There will be letters dropping from the sky and your mission is to type these letters in your keyboard to destroy them before they reach the ground.</p> 
    <p>The more experience you are (i.e. the more LIFE you get) the harder your mission will be.</p>
    <p class="emphasize">AND REMEMBER: DON'T LET YOUR LIFE REACH 0.<p>`

    addElementTo(intro, contentWrapper);

    const playButton = createElement("button", "play", "PLAY");
    addElementTo(playButton, contentWrapper);

    playButton.addEventListener("click", playOnClick);

    return contentWrapper;
}




function createStartScreen(playOnClick) {
    const screen = createScreen("start-screen");
    const contentWrapper = createStartScreenContent(playOnClick);
    
    screen.addContent(contentWrapper);


    const show = screen.show;
    const hide = screen.hide;
    const hook = screen.hook;
    
    return {
        show,
        hide,
        hook
    }
}