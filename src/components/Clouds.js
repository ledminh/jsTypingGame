import cloud1Img from '../imgs/cloud.png';

import { createElement } from "../utils";

export {
    createClouds
}


function createCloud (cloudImg) {
    const cloud = createElement("img", "cloud");
    cloud.src = cloudImg;

    const getElement = () => cloud;
    
    
    
    return {
        getElement
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



    /**********************************/
    /*** EXECUTION ***/
    
    _addCloud(_createCloud(cloud1Img));
    //_addCloud(_createCloud(cloud2Img));

    return {
        getClouds
    }

}