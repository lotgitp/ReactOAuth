import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_UNITS = 'LOAD_UNITS'
export const ADD_UNIT = 'ADD_UNIT'
export const REMOVE_UNIT = 'REMOVE_UNIT'

// ------------------------------------
// Actions
// ------------------------------------
export function loadUnits (units) {
  return {
    type: LOAD_UNITS,
    payload: units,
  }
}

export function addUnit (unit) {
  return {
    type: ADD_UNIT,
    payload: unit
  }
}

export function removeUint (id) {
  return {
    type: REMOVE_UNIT,
    payload: id
  }
}

export const fetchUnits = () => (dispatch, getState) => {
  const user = getState().user

  if (!user || !user.user_id) {
    return browserHistory.push('/')
  }

  fetch('https://devapi.careerprepped.com/skillbuilder/unit', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.access_token
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === 406 || result.status === 415) {
        // TODO handle error
      } else {
        const units = result._embedded.unit.map(u => ({
          id: u.id,
          code: u.code,
          description: u.description,
          title: u.title,
          isavailable: u.isavailable,
          category: u.category,
          slug: u.slug,
        }))

        dispatch(loadUnits(units))
      }
    })
    .catch(ex => {
      console.log('ex', ex)
    })
}

export const uploadUnit = (unit) => (dispatch, getState) => {
  const user = getState().user

  if (!user || !user.user_id) {
    return browserHistory.push('/')
  }

  fetch('https://devapi.careerprepped.com/skillbuilder/unit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.access_token
    },
    body: JSON.stringify({...unit})
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === 406 ||
          result.status === 415 ||
          result.status === 400 ||
          result.status === 422 ||
          result.status === 401 ||
          result.status === 403)
      {
        // TODO handle error
        console.log('error', result)
      } else {
        const unit = {
          id: result.id,
          code: result.code,
          description: result.description,
          title: result.title,
          isavailable: result.isavailable,
          category: result.category,
          slug: result.slug,
        };

        dispatch(addUnit(unit))
      }
    })
    .catch(ex => {
      // TODO handle error
      console.log('ex', ex)
    })
}

export const removeUnit = (id) => (dispatch, getState) => {
  console.log('error');
  const user = getState().user

  if (!user || !user.user_id) return browserHistory.push('/')

  fetch('https://devapi.careerprepped.com/skillbuilder/unit/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.access_token
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === 406 ||
        result.status === 415 ||
        result.status === 204 ||
        result.status === 404 ||
        result.status === 401 ||
        result.status === 403)
      {
        // TODO handle error
        console.log('error', result)
      } else {
        dispatch(removeUnit(id))
      }
    })
    .catch(ex => {
      // TODO handle error
      console.log('ex', ex)
    })
}
// ------------------------------------
// Initial state
// ------------------------------------
const initialState = []

// ------------------------------------
// Reducer
// ------------------------------------

export default function unitReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_UNITS:
      return action.payload

    case ADD_UNIT:
      return [...state, action.payload]

    case REMOVE_UNIT:
      return state.filter(unit => unit.id !== action.payload)

    default:
      return state
  }
}
