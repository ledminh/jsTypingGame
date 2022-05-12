import "./style.css";

import createWrapper from "../createWrapper";
import assembleSteps from "./assembleSteps";
import getWrapperStyle from "./wrapperStyle";

export {
    createGameOverScreenContent,
    GAME_OVER_SCREEN_CLASS
}

const GAME_OVER_SCREEN_CLASS = "game-over-screen";

const createGameOverScreenContent = (handles) => Object.keys(assembleSteps)
                                                        .reduce(
                                                            (wrapper, func) => assembleSteps[func](wrapper, handles), 
                                                            createWrapper(getWrapperStyle())
                                                        );







