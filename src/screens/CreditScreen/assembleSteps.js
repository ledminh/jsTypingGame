import {addElementTo, createElement } from "../../utils";

const assembleSteps = {
    createThankyouNote: (wrapper) => {
        const thankyouNote = createElement("h2", "thank-you", "THANK YOU FOR PLAYING");
        addElementTo(thankyouNote, wrapper);

        return wrapper;
    },

    createAuthorLine: (wrapper) => {
        const authorLine = createElement("h3", "author", "This game is created by Minh Le");
        addElementTo(authorLine, wrapper);

        return wrapper;

    },

    createCreditLine: (wrapper) => {
        const creditLine = createElement("div", "other-credits");

        creditLine.innerHTML = `<p>Music: 
                            <p>Uppbeat (https://uppbeat.io/t/hartzmann/sunny) - License code: 9OWFUTHDBK9DYJSQ</p>    
                            <p>and www.bensound.com</p>`

        addElementTo(creditLine, wrapper);

        return wrapper;
    },

    createContactList: (wrapper) => {
        const contactList = createElement("div", "contact-list");
        addElementTo(contactList, wrapper);

        contactList.innerHTML = `You can find me at:
                                <ul>
                                    <li><a href="https://www.linkedin.com/in/ledminh/">LinkedIn</a></li>
                                    <li><a href="https://github.com/ledminh">Github</a></li>
                                    <li><a href="https://www.ledminh.com/">LEDMINH.COM</a></li>
                                    <li><a href="https://www.ledminh.dev/">LEDMINH.DEV</a></li>
                                </ul>`

        return wrapper;
    }



}

export default assembleSteps;