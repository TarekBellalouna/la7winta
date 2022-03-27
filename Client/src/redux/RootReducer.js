import { combineReducers } from "redux";
import productReducer from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";
import userReducer from "./User/userReducer.js";

export default combineReducers({
  productReducer,
  OrderReducer,
  PasswordReducer,
  userReducer,
});
