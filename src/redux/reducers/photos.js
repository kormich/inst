import {GET_PHOTOS_FAILED, GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, SET_PHOTOS_TOTAL} from "../actionCreators/photos";

const initialSate ={
    photos: [],
    isPhotoLoading: true,
    totalPhotos:0
}

export const photosReduser = (state = initialSate, action)=>{
    switch (action.type){
        case GET_PHOTOS_STARTED:
            return{
                ...state,
                isPhotoLoading: true
            }
        case GET_PHOTOS_FAILED:
            return {
                ...state,
                isPhotoLoading: false
            }
        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload,
                isPhotoLoading: false
            }
        case SET_PHOTOS_TOTAL:
            return {
                ...state,
                totalPhotos: action.payload
            }
        default:
            return {...state}
    }
}