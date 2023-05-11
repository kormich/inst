import {
    GET_AUTHORIZED_USER_FAILED,
    GET_AUTHORIZED_USER_STARTED,
    GET_AUTHORIZED_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_STARTED,
    GET_USER_SUCCESS
} from "../actionCreators/users";

const initialState ={
    user:{},
    isUserLoading: true,
    authorizedUser: undefined,
    isAuthorizedUserLoading: true,
    isAuthorizedError: false,
    isUserError: false
}

export const usersReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_USER_STARTED:
            return{
                ...state,
                isUserLoading: true
            }
        case GET_USER_FAILED:
            return {
                ...state,
                isUserLoading: false,
                isUserError: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isUserLoading: false,
                isUserError: false
            }
        case GET_AUTHORIZED_USER_SUCCESS:
            return {
                ...state,
                authorizedUser: action.payload,
                isAuthorizedUserLoading: false,
                isAuthorizedError: false
            }
        case GET_AUTHORIZED_USER_STARTED:
            return {
                ...state,
                isAuthorizedUserLoading: true,
            }

        case GET_AUTHORIZED_USER_FAILED:
            return {
                ...state,
                isAuthorizedUserLoading: false,
                isAuthorizedError: true
            };
        default:
            return {...state}
    }
}