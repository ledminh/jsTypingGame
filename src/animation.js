export {
    createAnimation
}

function createAnimation(...animates) {
    let runAgainAt = null; 
    let isStopped = null;

    let timeInterval = null;
    

    const _animate = () => {
        if(Date.now() >= runAgainAt){
            animates.forEach(ani => ani());
            runAgainAt += timeInterval;
        }
        
        if(!isStopped){
            requestAnimationFrame(_animate);
        }
    }


    const setTimeInterval = (tI) => timeInterval = tI;

    const run =  () =>  {
        isStopped = false;
        runAgainAt = Date.now();
        
        requestAnimationFrame(_animate);
    
    };

    const stop =  () => isStopped = true;

    
    return {
        stop,
        run,
        setTimeInterval
    }
}


