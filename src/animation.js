export {
    createAnimation
}

function createAnimation(timeIntervalUserDefined, ...animates) {
    let runAgainAt = null; 
    let timeInterval = timeIntervalUserDefined;
    
    const _animate = () => {
        if(Date.now() >= runAgainAt){
            animates.forEach(ani => ani());
            runAgainAt += timeInterval;
        }
        
        requestAnimationFrame(_animate);
    }


    const setTimeInterval = (tI) => timeInterval = tI;
    
    const run =  () =>  {
        runAgainAt = Date.now();

        requestAnimationFrame(_animate);
    
    };

    return {
        run,
        setTimeInterval
    }
}


function animate() {
    if(Date.now() > runAgainAt) {
        update();
        render();
    }

}