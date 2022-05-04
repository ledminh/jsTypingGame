export {
    addElementTo,
    addElementToBody,
    addClassToElement,
    removeClassFromElement,
    removeElementFrom,
    removeElementFromBody,
    createElement, 
    randomNum,
    onCharacter,
    onEnter
}

/******************************************************
 *      USAGE:
 *      ------------------------------------------ 
 *      let a = 9, b = 9, c = 10;
 *      returnArrElem(elem).If(a == b)  // [elem]
 *      returnArrElem(elem).If(a == c) // []
 */

const returnArrElem = (returnVal) => ({
    If: (condition) => condition? [returnVal] : [] 
});





/*******************************************************
 * Add Element 
 */
const addElementTo = (element, container) => container.appendChild(element);
const addElementToBody = (element) => addElementTo(element, document.body);






/*******************************************************
 * Remove Element 
 */
const removeElementFrom = (element, container) => container.removeChild(element);
const removeElementFromBody = (element) => removeElementFrom(element, document.body);









/*******************************************************
 * Create Element 
 */
 const addClass = (className) => (elem) => {
    elem.classList.add(className);
    return elem;
};

const addClassToElement = (className, element) => element.classList.add(className);
const removeClassFromElement = (className, element) => element.classList.remove(className);

const addInnerText = (innerText) => (elem) => {
    elem.innerText = innerText;

    return elem;
}

const createElement = (elementType, className, innerText) => [() => document.createElement(elementType),
                                                            ...returnArrElem(addClass(className)).If(typeof className == 'string'),
                                                            ...returnArrElem(addInnerText(innerText)).If(typeof innerText == 'string'),
                                                        ].reduce((val, func) => func(val), elementType);







/*******************************************************
 * AddListener 
 */          

const addListener = (element, eventName, listener) => element.addEventListener(eventName, listener);

const onKeyUp = (element, condition, listener) => addListener(element, "keyup", (e) => (condition(e)? listener(e): false));
const onEnter = (element, listener) => onKeyUp(element, (e) => e.code == 'Enter', listener);

const onKeyDown = (element, condition, listener) => addListener(element, "keydown", (e) => (condition(e)? listener(e): false));
const onCharacter = (element, listener) => onKeyDown(element, (e) => String.fromCharCode(e.keyCode).match(/^[A-Za-z]$/), (e) => listener(e.key));


/*******************************************************
 * RandomNum 
 */
const randomNum = (from, to) => Math.floor(Math.random()*(to - from)) + from;
