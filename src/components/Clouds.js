import { random } from 'lodash';
import cloud1Img from '../imgs/cloud.png';

import { createElement } from "../utils";

export {
    createClouds
}


function createCloud (cloudImg) {
    let cloud = null, cloudWidth = null; 

    const init = () => {
        cloud = createElement("img", "cloud");
        cloud.src = cloudImg;

    }   
    

    
    /**********PUBLIC FUNCTIONS **********/
    const getElement = () => cloud;
    
    const setLeft = (leftCoord) => cloud.style.left = leftCoord + "px";
    
    const getLeft = () => cloud.getBoundingClientRect().left;

    
    /*****************EXECUTION***********/
    init();

    return {
        getElement,
        setLeft,
        getLeft
    }
}

function createClouds() {
    const clouds = [];

    

    /*******************************
     *  Private functions
     */
    const _createCloud = (cloudImg) => createCloud(cloudImg);

    const _addCloud = (cloud) => clouds.push(cloud);


    /*******************************
     *  Public functions
     */
         
    const getClouds = () => clouds;

    const move = (movingInterval) => clouds.forEach(cloud => cloud.setLeft(cloud.getLeft() + movingInterval));

    /**********************************/
    /*** EXECUTION ***/
    
    _addCloud(_createCloud(cloud1Img));
    //_addCloud(_createCloud(cloud2Img));

    return {
        getClouds,
        move
    }

}