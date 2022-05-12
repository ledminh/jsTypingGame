import "./style.css";

import createWrapper from "../createWrapper";
import assemble from "../assemble";

import assembleSteps from "./assembleSteps";
import getWrapperStyle from "./wrapperStyle";


export {
    createStartScreenContent,
    START_SCREEN_CLASS
};

const START_SCREEN_CLASS = "start-screen";




const createStartScreenContent = (handles) => Object.keys(assembleSteps)
                                                        .reduce(
                                                            (wrapper, func) => assemble(wrapper, assembleSteps[func], handles), 
                                                            createWrapper(getWrapperStyle())
                                                        );



















