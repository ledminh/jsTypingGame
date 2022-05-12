import "./style.css";

import {addElementTo, createElement } from "../../utils";
import createWrapper from "../createWrapper";

export {
    createStartScreenContent,
    START_SCREEN_CLASS
};

const START_SCREEN_CLASS = "start-screen";

const createStartScreenContent = (handles) => Object.keys(assembleSteps)
                                                        .reduce(
                                                            (wrapper, func) => assembleSteps[func](wrapper, handles), 
                                                            createWrapper(wrapperStyle)
                                                        );




const wrapperStyle = `
    width: 80%;
    max-width: 1200px;
    min-width: 400px;
    text-align: center;

    border: 4px solid rgb(83, 6, 6);
    border-radius: 20px;
    padding: 2rem;

    background-color: rgba(179, 179, 179, .9);

    box-shadow: 0 0 10px black;
`


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












