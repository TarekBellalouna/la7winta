import { createStore, applyMiddleware,compose } from "redux";
import RootReducer from "./RootReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const store = createStore(RootReducer, compose(applyMiddleware(thunk)));

export default store;