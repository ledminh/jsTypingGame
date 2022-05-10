import backgroundMusicFile from "./sounds/background.mp3";
import introMusicFile from "./sounds/intro.mp3";
import droppingSoundFile from "./sounds/dropping.ogg";
import poppingSoundFile from "./sounds/popping.ogg";

import { Howl } from "howler";

export {
    createSoundControl
}


function createSound(soundFile, autoplay, loop, volume) {
    const sound = new Howl({
        src: [soundFile],
        autoplay: autoplay,
        loop: loop,
        volume: volume
    });

    let playID = null;

    const play = () => playID = sound.play();
    const stop = () => sound.stop(playID);
    const pause = () => sound.pause(playID);
    const fade = (from, to) => sound.fade(from, to, playID);

    return {
        play,
        pause,
        stop,
        fade
    }
}

function createSoundControl() {
    let backgroundMusic = createSound(backgroundMusicFile, false, true, .4),
        introMusic = createSound(introMusicFile, false, true, .4),
        droppingSound = createSound(droppingSoundFile, false, false, 1),
        poppingSound = createSound(poppingSoundFile, false, false, 1);



    return {
        backgroundMusic,
        introMusic,
        droppingSound,
        poppingSound,
    }


}




