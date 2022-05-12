import { createElement } from "../utils";

const createWrapper = (styleText) => {
    const wrapper = createElement("div", "content-wrapper");
    wrapper.style.cssText = styleText;
    
    return wrapper;
}


export default createWrapper;
