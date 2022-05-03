export {
    createAnimation
}

function createAnimation(timeInterval, animate) {
    let runAgainAt = null; 

    const _animate = () => {
        if(Date.now() >= runAgainAt){
            animate();
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