import { GET_ALL_EVENTS,LIKE,GET_MY_EVENTS } from "./event.type";

 

const INITIAL_STATE = {
  events: [],
  myEvents:[],
  like:{},
  error: {},
};

const EventReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
   case GET_ALL_EVENTS:
       console.log({payload})
       return{
           ...state,
           events:payload
       }
       case LIKE:
        return{
            ...state,
            like:payload
        }
        case GET_MY_EVENTS:{
          return{
            ...state,
            myEvents:payload
        }
        }
    default:
      return state;
  }
};

export default EventReducer;
