import { getLifeInitialValue } from "../config";

export {
    createLifeControl
}

function createLifeControl(afterInit) {
    let life = null;

    const getLife = () => life;
    const addLife = () => life++;
    const minusLife = () => life--;

    const isGameOver = () => life == 0;

    const init = () => {
        life = getLifeInitialValue();
        afterInit(life);
    }

    const reset = () => init();

    /********************************/
    
    init();
    
    return {
        getLife,
        addLife,
        minusLife,
        isGameOver,
        reset
    }
}