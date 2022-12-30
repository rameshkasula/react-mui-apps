import { ActionTypes } from "../actions";

const initialState = {
  posts: false,
  isLoggedIn: false,
  notifications: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    default:
      return state;
  }
};

export default userReducer;
