import { createStore, applyMiddleware,compose } from "redux";
import RootReducer from "./RootReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const store = createStore(RootReducer, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;