import "./css/styles.css";

import {addElementTo, addElementToBody, createElement} from './utils';
import {createBox} from './Box';

const Box = createBox("M");

addElementToBody(Box.getElement());

