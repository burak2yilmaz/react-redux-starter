import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr'

//  REDUCERS
import { R_Test } from "./R_Test";

const rootReducer = combineReducers({
    toastr,
    R_Test,
});

export default rootReducer;