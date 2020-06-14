import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    localId: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading:false
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                localId: action.localId,
                idToken: action.idToken,
                error:null,
                loading:false
            };
            case actionTypes.AUTH_LOGOUT:
                return{
                    ...state,
                    idToken:null,
                    localId:null
                }
        default:
          return  state;
    }
}

export default reducer;