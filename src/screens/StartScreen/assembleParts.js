import {createElement } from "../../utils";

const assembleParts = {
    addTitle:  () => createElement("h1", "title", "TYPING FAST"),

    addSubtitle: () => createElement("h4", "subtitle", "LET'S SEE HOW FAST YOU CAN TYPE"),
    
    addIntro: () => {
        const intro = createElement("div", "intro");
        intro.innerHTML = `<p>There will be letters dropping from the sky and your mission is to type these letters in your keyboard to destroy them before they reach the ground.</p> 
        <p>The more experience you are (i.e. the more LIFE you get) the harder your mission will be.</p>
        <p class="emphasize">AND REMEMBER: DON'T LET YOUR LIFE REACH 0.<p>`
    
    
        return intro;
    },
    
    
    addPlayButton: ({playHandle}) => {
        const playButton = createElement("button", "play", "PLAY");
    
        playButton.addEventListener("click", playHandle);
    
        return playButton;
    }
}


export default assembleParts;