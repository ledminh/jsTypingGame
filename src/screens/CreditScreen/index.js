import "./style.css";
import {addElementTo, createElement } from "../../utils";

export {
    createCreditScreenContent,
    CREDIT_SCREEN_CLASS
}

const CREDIT_SCREEN_CLASS = "credit-screen";


function createCreditScreenContent() {
    const contentWrapper = createElement("div", "content-wrapper");

    const thankyouNote = createElement("h2", "thank-you", "THANK YOU FOR PLAYING");
    addElementTo(thankyouNote, contentWrapper);

    const authorLine = createElement("h3", "author", "This game is created by Minh Le");
    addElementTo(authorLine, contentWrapper);

    const creditLine = createElement("div", "other-credits");
    addElementTo(creditLine, contentWrapper);

    creditLine.innerHTML = `<p>Music: 
                            <p>Uppbeat (https://uppbeat.io/t/hartzmann/sunny) - License code: 9OWFUTHDBK9DYJSQ</p>    
                            <p>and www.bensound.com</p>`



    const contactList = createElement("div", "contact-list");
    addElementTo(contactList, contentWrapper);

    contactList.innerHTML = `You can find me at:
                            <ul>
                                <li><a href="https://www.linkedin.com/in/ledminh/">LinkedIn</a></li>
                                <li><a href="https://github.com/ledminh">Github</a></li>
                                <li><a href="https://www.ledminh.com/">LEDMINH.COM</a></li>
                                <li><a href="https://www.ledminh.dev/">LEDMINH.DEV</a></li>
                            </ul>`


    return contentWrapper;
}
