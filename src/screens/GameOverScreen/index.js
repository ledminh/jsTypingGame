import "./style.css";

import createWrapper from "../createWrapper";
import assembleSteps from "./assembleSteps";
import getWrapperStyle from "./wrapperStyle";
import createScreenContent from "../createScreenContent";


export {
    createGameOverScreenContent,
    GAME_OVER_SCREEN_CLASS
}

const GAME_OVER_SCREEN_CLASS = "game-over-screen";

const wrapper = createWrapper(getWrapperStyle());

const createGameOverScreenContent = (handles) => createScreenContent(wrapper, assembleSteps, handles);







