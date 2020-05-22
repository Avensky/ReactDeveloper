import axios from 'axios'
import * as actionTypes from './actionTypes'

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
};

export const fetchUserSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: payload
        
    }
};

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
};

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('/api/fetchUser')
        .then( result => {
            console.log(result)
            const payload = result.data
            dispatch(fetchUserSuccess(payload));
        })
        .catch( error => {
                dispatch(fetchUserFail(error));
        });
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS, 
        idToken: token,
        userId: userId
    }
}

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const logout = () => {
    axios.get('/api/logout')
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkLoginTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const login = (email, password, isSignup) => {
    return dispatch => {
        dispatch(loginStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }        
        axios.post('/api/login', authData)
            .then(response => {
//                console.log(response);
//                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
//                localStorage.setItem('token', response.data.idToken);
//                localStorage.setItem('expirationDate', expirationDate);
//                localStorage.setItem('userId', response.data.localId); 
//                dispatch(loginSuccess(response.data.idToken, response.data.localId));
//                dispatch(checkLoginTimeout(response.data.expiresIn));
                dispatch(loginSuccess(response)) 
})
            .catch(err => {
                console.log(err);
                dispatch(loginFail(err));
            });
    }
}

export const setLoginRedirectPath = (path) => {
    return {
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path
    };
};

export const loginCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log(expirationDate)
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(loginSuccess(token, userId));
                dispatch(checkLoginTimeout((expirationDate.getTime() -new Date().getTime()) / 1000 ))
            }
        }
    }
}



export const getUserStart = () => {
    return {
        type: actionTypes.GET_USER_START
    }
};

export const getUserSuccess = (payload) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        payload: payload
        
    }
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        error: error
    }
};

export const getUser = () => {
    return dispatch => {
        dispatch(getUserStart());
        axios.get('/api/user/')
        .then(result => {
            console.log('Get user response: ' + result);
            const payload = result.data
            dispatch(getUserSuccess(payload));
        })
        .catch( error => {
            dispatch(getUserFail(error));
        })
    }
}
