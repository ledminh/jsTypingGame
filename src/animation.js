export {
    createAnimation
}

function createAnimation(timeIntervalUserDefined, ...animates) {
    let runAgainAt = null; 
    let timeInterval = timeIntervalUserDefined;
    let stop = false;

    const _animate = () => {
        if(Date.now() >= runAgainAt){
            animates.forEach(ani => ani());
            runAgainAt += timeInterval;
        }
        
        if(!stop){
            requestAnimationFrame(_animate);
        }
    }


    const setTimeInterval = (tI) => timeInterval = tI;

    const run =  () =>  {
        runAgainAt = Date.now();

        requestAnimationFrame(_animate);
    
    };

    const _stopFunc =  () => stop = true;
    const reRun = () => {
        stop = false;
        run();
    }
    
    return {
        stop: _stopFunc,
        run,
        reRun,
        setTimeInterval
    }
}


function animate() {
    if(Date.now() > runAgainAt) {
        update();
        render();
    }

}