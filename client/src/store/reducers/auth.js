import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';
import { fetchUser } from '../actions';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    loginRedirectPath: '/',
    payload: null,

};

const fetchUserStart = (state, action) => {
    return updateObject(state, {error: null, loading:true})
}

const fetchUserSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        payload: action.payload,
        error: null,
        loading: false
    })
}
const fetchUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}


const loginStart = (state, action) => {
    return updateObject( state, {error: null, loading: true })
}

const loginSuccess = (state, action) => {
    return updateObject( state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const loginFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const logout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setLoginRedirectPath = (state, action) => {
    return updateObject(state, { loginRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.SET_LOGIN_REDIRECT_PATH: return setLoginRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;