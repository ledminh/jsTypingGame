export {
    addElementTo,
    addElementToBody,
    removeElementFrom,
    removeElementFromBody,
    createElement, 
    randomNum
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

const addInnerText = (innerText) => (elem) => {
    elem.innerText = innerText;

    return elem;
}

 const createElement = (elementType, className, innerText) => [() => document.createElement(elementType),
                                                            ...returnArrElem(addClass(className)).If(typeof className == 'string'),
                                                            ...returnArrElem(addInnerText(innerText)).If(typeof innerText == 'string'),
                                                        ].reduce((val, func) => func(val), elementType);








                        


/*******************************************************
 * RandomNum 
 */
const randomNum = (from, to) => Math.floor(Math.random()*(to - from)) + from;
