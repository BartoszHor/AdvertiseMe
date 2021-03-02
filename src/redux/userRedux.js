import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';


/* selectors */
export const getLoggedUser = ({users}) => users.user && users.user.filter((currentUser) => {
    const cookies = new Cookies();
    let codedToken = cookies.get('userName');
    let token = codedToken ? jwt_decode(codedToken) : ''
    return currentUser.emails === token.user
})


/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/user')
      .then(res => {
          dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        user: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
