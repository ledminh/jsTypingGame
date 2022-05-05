import { LifeInitialValue } from "../config";

export {
    createLifeControl
}

function createLifeControl() {
    let life = LifeInitialValue;

    const getLife = () => life;
    const addLife = () => life++;
    const minusLife = () => life--;

    const isGameOver = () => life == 0;

    const reset = () => life = LifeInitialValue;

    return {
        getLife,
        addLife,
        minusLife,
        isGameOver,
        reset
    }
}