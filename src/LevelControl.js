import { after } from "lodash";
import { Level } from "./config";

export {
    createLevelControl,
}




function createLevelControl(afterInit, onLevelChange) {
    
    
    let currentLevel = null;
    
    let droppingSpaceInterval = null,
    droppingTimeInterval = null,
    addingTimeInterval = null;

    function init() {
        currentLevel = 1;
        let levelObj = getLevelObject();

        droppingSpaceInterval = levelObj.droppingSpaceInterval;
        droppingTimeInterval = levelObj.droppingTimeInterval;
        addingTimeInterval = levelObj.addingTimeInterval;

        afterInit(currentLevel, droppingSpaceInterval, droppingTimeInterval, addingTimeInterval);

    }
    
    const maxLevel = Level.length;

    const getLevelObject = () => Level[currentLevel - 1];
    const getNextLevelObject = () => Level[currentLevel];
    const isEndGame = () => currentLevel == maxLevel;

    /*******************************************/

    const getDroppingSpaceInterval = () => droppingSpaceInterval;
    const getDroppingTimeInterval = () => droppingTimeInterval;
    const getAddingTimeInterval = () => addingTimeInterval;

    const getLevel = () => currentLevel;

   

    function setLevel(life) {
        if(currentLevel < maxLevel && life == getNextLevelObject().life){
            currentLevel++;
            
            const levelObj = getLevelObject();

            droppingSpaceInterval = levelObj.droppingSpaceInterval;
            droppingTimeInterval = levelObj.droppingTimeInterval;
            addingTimeInterval = levelObj.addingTimeInterval;

            onLevelChange(currentLevel);
        }
        
    }
    
    /*******************************************/

    

    return {
        getDroppingSpaceInterval,
        getDroppingTimeInterval,
        getAddingTimeInterval,
        setLevel,
        getLevel,
        isEndGame,
        init
    }
}