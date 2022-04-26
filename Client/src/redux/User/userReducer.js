import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DISABLE_USER_REQUEST,
    DISABLE_USER_SUCCESS,
    DISABLE_USER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    UPDATE_ROLE_FAIL,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_REQUEST
} from "./userConstants.js";

const INITIAL_STATE = {
<<<<<<< Updated upstream
    user: null,
=======
    user: JSON.parse(localStorage.getItem('user')) || null,
>>>>>>> Stashed changes
    userInfo: null,
    isLoggedIn: false,
    loading: false,
    loadingDelete: false,
    loadingDisable: false,
    loadingList: false,
<<<<<<< Updated upstream
    token: null,
=======
    token: localStorage.getItem('token') || null,
    userToken:localStorage.getItem('token') || null,
>>>>>>> Stashed changes
    users: null,
    successDelete: false,
    successDisable: false,
    successCreate: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                successCreate: true,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            console.log("ac", action.payload.user)
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                user: action.payload.user,
                userToken: action.payload.token
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                user: null,
                token: null
            }
        case USER_LOGOUT:
            return {}
        case USER_LIST_REQUEST:
            return {
                ...state,
                loadingList: true
            }
        case USER_LIST_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case USER_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loadingDelete: true
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                successDelete: true
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DISABLE_USER_REQUEST:
            return {
                ...state,
                loadingDisable: true
            }
        case DISABLE_USER_SUCCESS:
            console.log("action", action.payload)
            return {
                ...state,
                successDisable: true,
                users: action.payload,
            }
        case DISABLE_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_ROLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ROLE_SUCCESS:
            console.log("action", action.payload)
            return {
                ...state,
                user: action.payload,
            }
        case UPDATE_ROLE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer

