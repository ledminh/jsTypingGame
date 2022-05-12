import assemble from "./assemble";



const createScreenContent = (wrapper, assembleSteps, handles) => Object.keys(assembleSteps)
                                                        .reduce(
                                                            (wrapper, func) => assemble(wrapper, assembleSteps[func], handles), 
                                                            wrapper
                                                        );

export default createScreenContent;