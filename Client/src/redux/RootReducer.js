import { combineReducers } from "redux";
import productReducer from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";
import searchReducer from './search/searchReducer'
import EventReducer from "./Event/event.reducer"
export default combineReducers({
  search:searchReducer,
  productReducer,
  OrderReducer,
  PasswordReducer, EventReducer
});
