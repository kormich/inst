import {combineReducers} from "redux";
import {photosReduser} from "./photos";


export const  rootReduser = combineReducers({
    photos: photosReduser
})