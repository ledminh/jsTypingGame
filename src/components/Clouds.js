import { random } from 'lodash';
import cloud1Img from '../imgs/cloud-1.png';
import cloud2Img from '../imgs/cloud-2.png';
import cloud3Img from '../imgs/cloud-3.png';


import { createElement } from "../utils";

export {
    createClouds
}


function createCloud (cloudImg) {
    let cloud = null;
    const speedParam = random(.7, 1.2);
    const init = () => {
        cloud = createElement("img", "cloud");
        cloud.src = cloudImg;
        
        cloud.style.top = random(0,100) + "px";
        cloud.style.left = random(0, window.innerWidth - 100) + "px";
        cloud.style.height = `${random(100, 400)}px`;

    }   
    

    
    /**********PUBLIC FUNCTIONS **********/
    const getElement = () => cloud;
    
    const setLeft = (leftCoord) => cloud.style.left = leftCoord + "px";
    
    const getLeft = () => cloud.getBoundingClientRect().left;
    const getWidth = () => cloud.getBoundingClientRect().width;
    
    const getSpeedParam = () => speedParam;
    
    /*****************EXECUTION***********/
    init();

    return {
        getElement,
        setLeft,
        getLeft,
        getWidth,
        getSpeedParam
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

    const move = (movingInterval) => {
        
        
        clouds.forEach(cloud => {
            const left = cloud.getLeft(),
                    cloudWidth = cloud.getWidth();

            const nextLeft = (left > window.innerWidth)? -cloudWidth : left + movingInterval*cloud.getSpeedParam();

            cloud.setLeft(nextLeft);        
   
        });
    }

    /**********************************/
    /*** EXECUTION ***/
    
    _addCloud(_createCloud(cloud1Img));
    _addCloud(_createCloud(cloud2Img));
    _addCloud(_createCloud(cloud3Img));

    return {
        getClouds,
        move
    }

}