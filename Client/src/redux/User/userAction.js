import {
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DISABLE_USER_FAIL,
    DISABLE_USER_REQUEST,
    DISABLE_USER_SUCCESS,
    UPDATE_ROLE_FAIL,
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from './userConstants.js'
import history from "../../history.js"
import axios from 'axios'

export const register = (username, name, gender, phone, email, password, isAdmin) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(
            'user/register',
            { username, name, gender, phone, email, password, isAdmin },
            config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        history.push('/profile')
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('user/login', { email, password }, config)
        localStorage.setItem('econixtoken', JSON.stringify(data))
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('econixtoken')
    dispatch({ type: USER_LOGOUT })
}

export const usersList = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const { data } = await axios.get(`/user`)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const removeUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })

        await axios.delete(`/user/${id}`)
        dispatch({ type: DELETE_USER_SUCCESS })
        dispatch(usersList())
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const disableUser = (id, status) => async (dispatch) => {
    console.log("statussss", status)
    try {
        dispatch({ type: DISABLE_USER_REQUEST })

        const { data } = await axios.put(`/user/${id}`, status)
        dispatch({
            type: DISABLE_USER_SUCCESS,
            payload: data
        })
        dispatch(usersList())
    } catch (error) {
        dispatch({
            type: DISABLE_USER_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const updateRole = ({ id, role }) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ROLE_REQUEST })

        const { data } = await axios.put(`/user/role/${id}`, role)
        dispatch({
            type: UPDATE_ROLE_SUCCESS,
            payload: data
        })
        // dispatch(usersList())
    } catch (error) {
        dispatch({
            type: UPDATE_ROLE_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

