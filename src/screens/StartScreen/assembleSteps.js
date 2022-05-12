import {addElementTo, createElement } from "../../utils";

const assembleSteps = {
    addTitle:  (wrapper) => {
        const title = createElement("h1", "title", "TYPING FAST");
        addElementTo(title, wrapper);
    
        return wrapper;
    },
    
    addSubtitle: (wrapper) => {
        const subtitle = createElement("h4", "subtitle", "LET'S SEE HOW FAST YOU CAN TYPE");
        addElementTo(subtitle, wrapper);
    
        return wrapper
    },
    
    addIntro: (wrapper) => {
        const intro = createElement("div", "intro");
        intro.innerHTML = `<p>There will be letters dropping from the sky and your mission is to type these letters in your keyboard to destroy them before they reach the ground.</p> 
        <p>The more experience you are (i.e. the more LIFE you get) the harder your mission will be.</p>
        <p class="emphasize">AND REMEMBER: DON'T LET YOUR LIFE REACH 0.<p>`
    
        addElementTo(intro, wrapper);
    
        return wrapper;
    },
    
    
    addPlayButton: (wrapper, {playHandle}) => {
        const playButton = createElement("button", "play", "PLAY");
        addElementTo(playButton, wrapper);
    
        playButton.addEventListener("click", playHandle);
    
        return wrapper;
    }
}

export default assembleSteps;