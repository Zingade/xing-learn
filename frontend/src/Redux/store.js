import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import ui from "./UI/UiReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    ui,
  });
  
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

export default store;