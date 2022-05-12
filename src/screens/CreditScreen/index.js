import "./style.css";

import createWrapper from "../createWrapper";
import assembleParts from "./assembleParts";
import getWrapperStyle from "./wrapperStyle";

import createScreenContent from "../createScreenContent";

export {
    createCreditScreenContent,
    CREDIT_SCREEN_CLASS
}

const CREDIT_SCREEN_CLASS = "credit-screen";

const wrapper = createWrapper(getWrapperStyle());


const createCreditScreenContent = (handles) => createScreenContent(wrapper, assembleParts, handles);