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

export const newUserSuccess = (userData) => {
    return {
        type: actionTypes.NEW_USER_SUCCESS,
        userData: userData
    }
}
    
export const newUser = (username, givenName, familyName, email, password, picture) => {
    return dispatch => {
        const userData={username, givenName, familyName, email, password, picture}
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