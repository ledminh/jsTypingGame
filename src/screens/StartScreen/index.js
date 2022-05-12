import "./style.css";

import createWrapper from "../createWrapper";
import assembleSteps from "./assembleSteps";
import getWrapperStyle from "./wrapperStyle";
import { addElementTo } from "../../utils";

export {
    createStartScreenContent,
    START_SCREEN_CLASS
};

const START_SCREEN_CLASS = "start-screen";

const assemble = (wrapper, func, handles) => {
    const elem = func(handles);

    addElementTo(elem, wrapper);

    return wrapper;
}


const createStartScreenContent = (handles) => Object.keys(assembleSteps)
                                                        .reduce(
                                                            (wrapper, func) => assemble(wrapper, assembleSteps[func], handles), 
                                                            createWrapper(getWrapperStyle())
                                                        );



















