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
    USER_REGISTER_SUCCESS,
    UPDATE_PROFILE,
    UPDATE_ERROR, DELETE_USER
} from './userConstants.js'
import history from "../../history.js"
import {Redirect } from "react-router"
import axios from 'axios'

export const register = (username, name, gender, phone, email, password, isAdmin,location) => async (dispatch) => {
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
            { username, name, gender, phone, email, password, isAdmin,location },
            config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
      
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
        console.log(data)
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('user', JSON.stringify(data))
        history.push("/profile")
      
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        //? remove if crash 
        window.location.reload()


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
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
        console.log("first")
        await axios.put(`http://localhost:5000/user/disable/${id}`)
        dispatch({ type: DELETE_USER })
        dispatch(logout())
    } catch (error) {
       console.log(error)
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
export const updateProfile = (id,profile)=>async(dispatch)=>{

    try {
        const res = await  axios.put(`http://localhost:5000/user/profile/${id}`,profile)
        console.log(res)
        if(res.status===200)
        {
            localStorage.setItem('user', JSON.stringify(res.data.user))
        }
        dispatch({
            type:UPDATE_PROFILE,
            payload:res
        })
            
        
    } catch (error) {
        dispatch({
            type:UPDATE_ERROR,
            payload:209
        })
    }
}
