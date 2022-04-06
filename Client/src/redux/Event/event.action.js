import axios from "axios";
import {GET_ALL_EVENTS,LIKE,GET_MY_EVENTS} from "./event.type"
export const getAllEvents =  (searchValue)=>async (dispatch) => {
    try{
    const data = await axios.get(`http://localhost:5000/event/all?searchValue=${searchValue}`);
    console.log({data})
 dispatch({
     
     type: GET_ALL_EVENTS,
     payload:data
 })
}catch(err){
    console.log(err)
}
}
export const getMyEvents =  (idUser,searchValue)=>async (dispatch) => {
    try{
    const data = await axios.get(`http://localhost:5000/event/getUserEvent?idUser=${idUser}&searchValue=${searchValue}`);
    console.log({data})
 dispatch({
     
     type: GET_MY_EVENTS,
     payload:data
 })
}catch(err){
    console.log(err)
}
}
export const Like = (idUser,idEvent)=>async (dispatch)=>{
    console.log("first")
    try {
        const data = await axios.post(
            `http://localhost:5000/event/addLikes?idUser=${idUser}&idEvent=${idEvent}`)
        console.log(data)
        dispatch({
     
            type: LIKE,
            payload:data
        })
    } catch (error) {
        
    }
}