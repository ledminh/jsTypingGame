import "./style.css";

import createWrapper from "../createWrapper";

import assembleParts from "./assembleParts";
import getWrapperStyle from "./wrapperStyle";
import createScreenContent from "../createScreenContent";


export {
    createStartScreenContent,
    START_SCREEN_CLASS
};

const START_SCREEN_CLASS = "start-screen";


const wrapper = createWrapper(getWrapperStyle());

const createStartScreenContent = (handles) => createScreenContent(wrapper, assembleParts, handles);


















