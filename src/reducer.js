import {
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  AUTH_ERROR,
} from "./constants.js";

const initialState = {
  user: null,
  email: null,
  password: null,
  isLoading: false,
  authError: false,
  authToken: null,
  client: null,
  uid: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    case LOGIN_FETCH:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_RESPONSE:
      return {
        ...state,
        isLoading: false,
        user: action.user,
        authToken: action.authToken,
        client: action.client,
        uid: action.uid
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        authError: true
      }
    default:
      return state;
  }
}
