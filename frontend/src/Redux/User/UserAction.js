import * as actionTypes from "./UserTypes"
import Axios from 'axios'

const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_LIST_REQUEST });
    const { data } = await Axios.get('/api/users');
    dispatch({ type: actionTypes.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.USER_LIST_FAIL, payload: error });
  }
};

const saveUser = (user) => async (dispatch, getState) => {
  try{
      dispatch({type:actionTypes.USER_SAVE_REQUEST, payload:user});
      const {userSignin: {userInfo}} = getState();
      if(!user._id){
          const {data} = await Axios.post('/api/users', user, {
              headers: {Authorization: 'Bearer ' + userInfo.token,} 
          });
          dispatch({type:actionTypes.USER_SAVE_SUCCESS, payload:data});
      }
      else {
          const {data} = await Axios.put('/api/users/' + user._id, user, {
              headers: {Authorization: 'Bearer ' + userInfo.token,} 
          });
          dispatch({type:actionTypes.USER_SAVE_SUCCESS, payload:data});
      }
  }
  catch(error){
      dispatch({type: actionTypes.USER_SAVE_FAIL, payload:error});
  }
} 

const deleteUser = (userId) => async (dispatch, getState) => {
  try{
      const {userSignin: {userInfo}} = getState();
      dispatch({type:actionTypes.USER_DELETE_REQUEST, payload:userId});
          const {data} = await Axios.delete('/api/users/' + userId, {
              headers: {Authorization: 'Bearer ' + userInfo.token,} 
          });
          dispatch({type:actionTypes.USER_DELETE_SUCCESS, payload:data,sucess:true});
      }
  catch(error){
      dispatch({type: actionTypes.USER_DELETE_FAIL, payload:error});
  }
} 

const signin = (loginID,password) => async (dispatch) => {
  dispatch({type: actionTypes.USER_SIGNIN_REQUEST, payload:{loginID, password}});
  try {
      const {data} = await Axios.post("/api/users/signin",{loginID,password});
      dispatch({type:actionTypes.USER_SIGNIN_SUCCESS, payload:data});
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log(error)
      dispatch({type:actionTypes.USER_SIGNIN_FAIL, payload:error});
  }
}

const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: actionTypes.USER_LOGOUT })
}


export {listUsers, signin, logout, deleteUser, saveUser}