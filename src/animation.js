export {
    createAnimation
}

function createAnimation(timeInterval, ...animates) {
    let runAgainAt = null; 

    const _animate = () => {
        if(Date.now() >= runAgainAt){
            animates.forEach(ani => ani());
            runAgainAt += timeInterval;
        }
        
        requestAnimationFrame(_animate);
    }


    const run =  () =>  {
        runAgainAt = Date.now();

        requestAnimationFrame(_animate);
    
    };

    return {
        run
    }
}


function animate() {
    if(Date.now() > runAgainAt) {
        update();
        render();
    }

}