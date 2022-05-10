export {
    GroundHeight,
    TouchGroundEffectDuration,
    DestroyedEffectDuration,
    Level,
    LevelNotifPopUpTime,
    LifeInitialValue,
    MovingCloudSpaceInterval,
    MovingCloudTimeInterval,
    getLifeInitialValue
}

const MovingCloudSpaceInterval = 2;
const MovingCloudTimeInterval = 1;

const GroundHeight = 300;
const TouchGroundEffectDuration = 300;
const DestroyedEffectDuration = 300;



const LevelNotifPopUpTime = 600;


const LifeInitialValue = 10;

const Level = [
    {
        life: 10,
        droppingSpaceInterval: 2,
        droppingTimeInterval: 10,
        addingTimeInterval:1700
    },

    {
        life: 30,
        droppingSpaceInterval: 2,
        droppingTimeInterval: 5,
        addingTimeInterval:1500
    },

    {
        life: 100,
        droppingSpaceInterval: 3,
        droppingTimeInterval: 5,
        addingTimeInterval: 1400
    },

    {
        life: 200,
        droppingSpaceInterval: 4,
        droppingTimeInterval: 5,
        addingTimeInterval: 1200
    },

    {
        life: 350,
        droppingSpaceInterval: 4,
        droppingTimeInterval: 4,
        addingTimeInterval: 1000
    },

    {
        life: 520,
        droppingSpaceInterval: 5,
        droppingTimeInterval: 4,
        addingTimeInterval: 900
    },

    {
        life: 700,
        droppingSpaceInterval: 5,
        droppingTimeInterval: 4,
        addingTimeInterval: 600
    },

    {
        life: 850,
        droppingSpaceInterval: 5,
        droppingTimeInterval: 4,
        addingTimeInterval: 500
    }
]





const getLifeInitialValue = () => Level[0].life;