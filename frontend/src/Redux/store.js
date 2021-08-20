import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import uiReducer from "./UI/UiReducer";
import {userSigninReducer, userListReducer, userSaveReducer, userDeleteReducer} from "./User/UserReducer";

const userInfoJSON = localStorage.getItem('userInfo');
const userInfo = JSON.parse(userInfoJSON) || null;

const initialState = { userSignin: {userInfo} };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    ui:uiReducer,
    userSignin:userSigninReducer,
    userList:userListReducer,
    userSave:userSaveReducer, 
    userDelete:userDeleteReducer,
  });
  
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

export default store;