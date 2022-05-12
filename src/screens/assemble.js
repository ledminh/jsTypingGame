import { addElementTo } from "../utils";


const assemble = (wrapper, func, handles) => {
    const elem = func(handles);

    addElementTo(elem, wrapper);

    return wrapper;
}

export default assemble;