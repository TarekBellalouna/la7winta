import { createStore, applyMiddleware } from "redux";
import RootReducer from "./RootReducer";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger({
    collapsed: true,
    colors: {
        title: () => "#0B698F",
        prevState: () => "#7286E9",
        action: () => "#bd2839",
        nextState: () => "#1DB954",
        error: () => "#FF534D",
    },
});

const middlewares = [thunk];
const store = createStore(RootReducer, applyMiddleware(...middlewares, logger));

export default store;