//  CONSTANTS
import {
    C_Test
} from "../constants";

const initialState = {
    count: 0
};

export const R_Test = (state = initialState, { type, payload }) => {
    switch (type) {
        case C_Test.INCREMENT:
            return {
                ...state,
                count: ++state.count
            };
        case C_Test.DECREMENT:
            return {
                ...state,
                count: --state.count
            }
        default:
            return state;
    }
};