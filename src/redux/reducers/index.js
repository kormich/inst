import {combineReducers} from "redux";
import {photosReduser} from "./photos";
import {usersReducer} from "./users";
import {postsByUserReducer} from "./postsByUser";


export const  rootReduser = combineReducers({
    photos: photosReduser,
    users: usersReducer,
    postsByUser: postsByUserReducer
})