
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_UNITS = 'LOAD_UNITS';

// ------------------------------------
// Actions
// ------------------------------------
export function loadUnits (units) {
  return {
    type: LOAD_UNITS,
    payload: units,
  }
}

export const fetchUnits = () => (dispatch) => {
  fetch('https://devapi.careerprepped.com/skillbuilder/unit')
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

export const uploadUnit = (unit) => (dispatch) => {
  fetch('https://devapi.careerprepped.com/skillbuilder/unit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: 'careerprepped',
      grant_type: 'password',
      ...unit,
    })
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
        console.log('response', result)
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

    default:
      return state
  }
}
