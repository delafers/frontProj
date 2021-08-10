import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_IMG = 'ADD-IMG'
const CHANGE_PHOTO = 'IMG'
const DELETE_POST = 'ADD-IMG'
const UPDATE_SRC = 'UPDATE-SRC'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
let initialState = {
    GalleryAccounts: [
        {
            class: 'Nature',
            name: 'https://sun9-40.userapi.com/impg/IpcbkULm7LqC4XQYLSG_swLa5cdNXXJ4QDerjQ/kdOHf8W9pUc.jpg?size=1080x754&quality=96&proxy=1&sign=9668b310115895160a96b40a1f0a0ba1&type=album',
            id: "1"
        },
        {
            class: 'Brains',
            name: 'https://sun9-19.userapi.com/impg/4cJlx83BGHrmc-qVpGH4db0aXKPihIP3w2dleA/sG643_rh_h0.jpg?size=1080x769&quality=96&proxy=1&sign=1b706df2572e01cd8a9ecc31bc900c14&type=album',
            id: "2"
        },
        {
            class: 'Games',
            name: 'https://sun9-9.userapi.com/impg/315dd_uMOkpAmL5X4VwiD_L_9SZRAkZjVrZCPw/g4LPT_10jkw.jpg?size=277x329&quality=96&proxy=1&sign=37cd58191b5cf139cc7e98607d033033&type=album',
            id: "3"
        }
    ],
    BlockPost: 'send img',
    profile: null
};

const GalleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IMG: {
            let newpick = {
                class: 'face',
                name: state.BlockPost
            };
            let stateCopy = {
                ...state,
                GalleryAccounts: [...state.GalleryAccounts, newpick],
                BlockPost: '',
            };
            return stateCopy;
        }
        case UPDATE_SRC: {
            let stateCopy = {...state};
            stateCopy.BlockPost = action.imgsrc;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case DELETE_POST: {
            return {...state.GalleryAccounts, GalleryAccounts: state.GalleryAccounts.filter(p => p.id != action.postId)}
        }
        case CHANGE_PHOTO: {
            debugger
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }

}

export const AddImgToGallery = () => ({type: ADD_IMG})
export const OnSrcPostChange = (comment) => ({type: UPDATE_SRC, imgsrc: comment})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const savePhotoSuccess = (photos) => ({type: CHANGE_PHOTO, photos})
export const saveProfileSuccess = (photos) => ({type: CHANGE_PHOTO, photos})
export const DeletePost = (postId) => ({type: DELETE_POST, postId})

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.galleryProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    });
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    dispatch(savePhotoSuccess(response.data.data.photos))
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0){
        dispatch(getUserProfile(userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : ""
        dispatch(stopSubmit("edit-Profile", {_error: message}))
    }
}

export default GalleryReducer