import { combineReducers } from "redux";
import productReducer from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";
import userReducer from "./User/userReducer.js";
<<<<<<< Updated upstream
=======
import EventReducer from "./Event/event.reducer"
>>>>>>> Stashed changes

export default combineReducers({
  productReducer,
  OrderReducer,
<<<<<<< Updated upstream
=======
  EventReducer,
>>>>>>> Stashed changes
  PasswordReducer,
  userReducer,
});
