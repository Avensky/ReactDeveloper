import * as actionTypes from './actionTypes'
import axios from 'axios';

export const setNewUserRedirectPath  = (path) =>{
    return{
        type: actionTypes.SET_NEW_USER_REDIRECT_PATH,
        path: path
    }
}

export const newUserStart  = () =>{
    return{
        type: actionTypes.NEW_USER_START
    }
}

export const newUserFail = (error) => {
    return {
        type: actionTypes.NEW_USER_FAIL,
        error: error
    }
}

export const newUserSuccess = (postData) => {
    return {
        type: actionTypes.NEW_USER_SUCCESS,
        postData: postData
    }
}
    
export const newUser = (username, givenName, familyName, email, password) => {
    return dispatch => {
        const userData={username, givenName, familyName, email, password}
        dispatch(newUserStart())
        axios.post('/api/addUser', userData)
            .then(response => {
                console.log(response);
                dispatch(newUserSuccess(userData))
        })
        .catch(error => {
            console.log(error);
            dispatch(newUserFail(error))
        })    
    }
}