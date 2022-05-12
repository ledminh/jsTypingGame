import "./style.css";

import createWrapper from "../createWrapper";
import assembleSteps from "./assembleSteps";
import getWrapperStyle from "./wrapperStyle";

export {
    createStartScreenContent,
    START_SCREEN_CLASS
};

const START_SCREEN_CLASS = "start-screen";

const createStartScreenContent = (handles) => Object.keys(assembleSteps)
                                                        .reduce(
                                                            (wrapper, func) => assembleSteps[func](wrapper, handles), 
                                                            createWrapper(getWrapperStyle())
                                                        );



















