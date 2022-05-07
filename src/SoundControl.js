import { createElement } from "./utils";
import backgroundMusicFile from "./sounds/background.mp3";
import droppingSoundFile from "./sounds/dropping.ogg";
import poppingSoundFile from "./sounds/popping.ogg";

export {
    createSoundControl
}


function createSound(audioContext, musicFile, volume) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
        
    const element = createElement("audio");
    element.src = musicFile;

    const track = audioContext.createMediaElementSource(element);
        
    return {
        gainNode,
        element,
        track
    }
}

function createSoundControl() {
    
    let audioContext = null,
        background = null,
        dropping = null,
        popping = null;
   

    const init = () => {
        audioContext = new AudioContext();

        background = createSound(audioContext, backgroundMusicFile, .2);
        dropping = createSound(audioContext, droppingSoundFile, 3);
        popping = createSound(audioContext, poppingSoundFile, 3);
    }

    const play = (sound, isLoop) => {
        sound.track.connect(sound.gainNode).connect(audioContext.destination);
    
        sound.element.play();
        sound.element.loop = isLoop; 
    }
    
    /******Public Functions********************/
    const playBackgroundMusic = () => play(background, true)
    
    const playDroppingSound = () => play(dropping, false);
    const playPoppingSound = () => play(popping, false);    

    /******Execution********************/
    init();

    return {
        playBackgroundMusic,
        playDroppingSound,
        playPoppingSound
    }


}