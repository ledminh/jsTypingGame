import { getLifeInitialValue } from "../config";

export {
    createLifeControl
}

function createLifeControl() {
    let life = getLifeInitialValue();

    const getLife = () => life;
    const addLife = () => life++;
    const minusLife = () => life--;

    const isGameOver = () => life == 0;

    const reset = () => life = getLifeInitialValue();

    return {
        getLife,
        addLife,
        minusLife,
        isGameOver,
        reset
    }
}