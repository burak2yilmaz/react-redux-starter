//  REDUX
import { createStore } from "redux";

//  REDUCER COMBINED
import { reducerCombined } from './Reducers';

const store = createStore(reducerCombined);

export default store;