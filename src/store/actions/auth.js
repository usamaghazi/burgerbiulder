import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    console.log('the game is start');
    return {
        type: actionTypes.AUTH_START
    }

}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    console.log('you are Logout');
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expireDate');
    return {
        type: actionTypes.AUTH_LOGOUT,

    }

}

export const checkAuthTimeout = (expirationTime) => {
    console.log('dzzzz'+expirationTime)
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)

    }

}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJsXxBx8rOhI68CtnMypRy1kkDDLmTvrQ';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJsXxBx8rOhI68CtnMypRy1kkDDLmTvrQ';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
               // const expiry = response.data.expiresIn;
                const date = new Date();
                const time = new Date(date.setSeconds(date.getSeconds() + 3600));
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('localId', response.data.localId);
                localStorage.setItem('expireDate', time);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(authFail(err.response.data.error));
            })

    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {
            dispatch(logout());
            console.log('hi You are logout gamer')
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expireDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout());
                console.log('com to logout')
            }
            else {
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                console.log('remaining Time of logout' + (expirationDate.getTime() - new Date().getTime()));
            }
        }
    }
}
