import { createElement, addElementTo, addClassToElement } from "../utils";

export {
    createScreen
}

function createScreen(className) {
    const screen = createElement("div", className);

    screen.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        z-index: 10000;
    `

    const addContent = (content) => addElementTo(content, screen);
    const show = () => screen.style.display = "flex";
    const hide = () => screen.style.display = "none";
    
    const hook = (container) => addElementTo(screen, container);


    return {
        hook,
        addContent,
        show,
        hide
    };
}