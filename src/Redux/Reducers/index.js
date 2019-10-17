//  REDUX
import { combineReducers } from "redux";

//  REDUCERS
import R_Users from "./R_Users";
import R_Menu from './R_Menu';

export const reducerCombined = combineReducers({
    R_Users,
    R_Menu
});