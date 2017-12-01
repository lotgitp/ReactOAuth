import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function loginFailed (reason) {
  return {
    type: USER_LOGIN_FAIL,
    payload: reason,
  }
}

export function loginSuccess (user) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  }
}

export const actionLogin = (email, password) => (dispatch, getState) => {
  fetch('https://devapi.careerprepped.com/oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      client_id: 'careerprepped',
      grant_type: 'password'
    })
  }).then(response => response.json())
    .then(result => {
      if (result.status === 401) {
        dispatch(loginFailed(result))
      } else {
        dispatch(loginSuccess(result))
        browserHistory.push('/unit')
      }
    })
    .catch(ex => {
      console.log('ex', ex)
    })
}

// ------------------------------------
// Initial state
// ------------------------------------
const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_FAIL:
      return action.payload;

    case USER_LOGIN_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
