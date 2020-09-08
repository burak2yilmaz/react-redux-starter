//  STORE
import {
    store
} from "../helpers";

//  CONSTANTS
import {
    C_Test
} from "../constants";

export const incrementCount = () => {
    store.dispatch({
        type: C_Test.INCREMENT
    });
};

export const decrementCount = () => {
    store.dispatch({
        type: C_Test.DECREMENT
    });
};