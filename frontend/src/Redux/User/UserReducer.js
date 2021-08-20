import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGOUT, USER_SAVE_FAIL, USER_SAVE_REQUEST, USER_SAVE_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "./UserTypes";

function userListReducer(state = {users:[]}, action){
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true, users: [] };
        case USER_LIST_SUCCESS:
            return {loading: false, users:action.payload};
        case USER_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}


function userSaveReducer(state = {users:[]}, action){
    switch(action.type){
        case USER_SAVE_REQUEST:
            return {loading: true};
        case USER_SAVE_SUCCESS:
            return {loading: false, success: true, users:action.payload};
        case USER_SAVE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function userDeleteReducer(state = {users:[]}, action){
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true};
        case USER_DELETE_SUCCESS:
            return {loading: false, success: true, users:action.payload, sucess:true};
        case USER_DELETE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function userSigninReducer(state = {}, action){
  switch(action.type){
      case USER_SIGNIN_REQUEST:
          return {loading: true};
      case USER_SIGNIN_SUCCESS:
          return {loading: false, userInfo:action.payload};
      case USER_SIGNIN_FAIL:
          return {loading: false, error:action.payload};
      case USER_LOGOUT:
          return {};
      default:
          return state;
  }
}

export {userSaveReducer, userDeleteReducer, userListReducer, userSigninReducer};  
  