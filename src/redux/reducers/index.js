import {combineReducers} from "redux";
import {photosReduser} from "./photos";
import { usersReducer} from "./users";


export const  rootReduser = combineReducers({
    photos: photosReduser,
    users: usersReducer
})