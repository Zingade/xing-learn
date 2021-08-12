import * as actionTypes from "./UserTypes"
import Axios from 'axios'

const signin = (name,password) => async (dispatch) => {
  dispatch({type: actionTypes.USER_SIGNIN_REQUEST, payload:{name, password}});
  try {
      const {data} = await Axios.post("/api/users/signin",{name,password});
      dispatch({type:actionTypes.USER_SIGNIN_SUCCESS, payload:data});
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({type:actionTypes.USER_SIGNIN_FAIL, payload:error});
  }
}

const register = (name, email,password,phone) => async (dispatch) => {
  dispatch({type: actionTypes.USER_REGISTER_REQUEST, payload:{name, email, password, phone}});
  try {
      const {data} = await Axios.post("/api/users/register",{name, email, password, phone});
      dispatch({type:actionTypes.USER_REGISTER_SUCCESS, payload:data});
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({type:actionTypes.USER_REGISTER_FAIL, payload:error});
  }
}

const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: actionTypes.USER_LOGOUT })
}


export {signin, logout, register}