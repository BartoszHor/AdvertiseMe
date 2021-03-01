import axios from 'axios';
/* selectors */
export const getAll = ({posts}) => posts.data
export const getPostsLoadingState = ({posts}) => posts.loading

/* action name creator */
const reducerName = 'posts';
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

export const fetchPublishedPosts = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        const {posts} = getState()
        if(!posts.data.length) {
          dispatch(fetchSuccess(res.data));
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addNewAdvertToDatabase = (newPost) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    axios
      .post('http://localhost:8000/api/posts/add', newPost)
      .then(res => {
        console.log(res.data)
        const {_id, __v, ...restServer} = res.data
        const serverDataWithNoId = JSON.parse(JSON.stringify(restServer))
        serverDataWithNoId.created = newPost.created
        if(JSON.stringify(serverDataWithNoId) === JSON.stringify(newPost)) {
          dispatch(fetchSuccess(res.data))
          alert('Your post has benn added')
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addUpdatedAdvertToDatabase = (newPost) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    axios
      .put('http://localhost:8000/api/posts/update', newPost)
      .then(res => {
        console.log(res.data)
          dispatch(fetchSuccess(res.data))
          alert('Your post has benn edited')
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
        data: action.payload,
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
