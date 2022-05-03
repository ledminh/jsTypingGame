export {
    addElementTo,
    addElementToBody,
    removeElementFrom,
    removeElementFromBody,
    createElement, 
    randomNum
}

const returnArrElem = (returnVal) => ({
    If: (condition) => condition? [returnVal] : [] 
});


const addElementTo = (element, container) => container.appendChild(element);
const addElementToBody = (element) => addElementTo(element, document.body);

const removeElementFrom = (element, container) => container.removeChild(element);
const removeElementFromBody = (element) => removeElementFrom(element, document.body);

const addClass = (className) => (elem) => {
    elem.classList.add(className);
    return elem;
};

const addInnerText = (innerText) => (elem) => {
    elem.innerText = innerText;

    return elem;
}


const createElement = (elementType, className, innerText) => [() => document.createElement(elementType),
                                                                ...returnArrElem(addClass(className)).If(typeof className == 'string'),
                                                                ...returnArrElem(addInnerText(innerText)).If(typeof innerText == 'string'),
                                                            ].reduce((val, func) => func(val), elementType);
                        



const randomNum = (from, to) => Math.floor(Math.random()*(to - from)) + from;
