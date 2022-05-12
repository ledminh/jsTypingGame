import "./style.css";

import createWrapper from "../createWrapper";
import assembleSteps from "./assembleSteps";
import getWrapperStyle from "./wrapperStyle";

export {
    createCreditScreenContent,
    CREDIT_SCREEN_CLASS
}

const CREDIT_SCREEN_CLASS = "credit-screen";


const createCreditScreenContent = (handles) => Object.keys(assembleSteps)
                                                            .reduce(
                                                                (wrapper, func) => assembleSteps[func](wrapper, handles), 
                                                                createWrapper(getWrapperStyle())
                                                            );
