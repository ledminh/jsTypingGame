import { Level } from "./config";

export {
    createLevelControl,
}




function createLevelControl(onLevelChange) {
    
    
    let currentLevel = 1;
    
    let droppingSpaceInterval = null,
    droppingTimeInterval = null,
    addingTimeInterval = null;

    function init() {
        let levelObj = getLevelObject();

        droppingSpaceInterval = levelObj.droppingSpaceInterval;
        droppingTimeInterval = levelObj.droppingTimeInterval;
        addingTimeInterval = levelObj.addingTimeInterval;

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

    init();

    return {
        getDroppingSpaceInterval,
        getDroppingTimeInterval,
        getAddingTimeInterval,
        setLevel,
        getLevel,
        isEndGame
    }
}