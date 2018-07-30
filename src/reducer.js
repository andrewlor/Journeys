import {
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  AUTH_ERROR,
  INDEX_FETCH,
  INDEX_RESPONSE,
  INDEX_ERROR,
  REAUTH
} from "./constants.js";

const initialState = {
  user: null,
  email: null,
  password: null,
  isLoading: false,
  authError: false,
  authToken: null,
  client: null,
  uid: null,
  indexJourneys: []
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
        uid: action.uid,
        email: null,
        password: null
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
    case REAUTH:
      return {
        ...state,
        authToken: action.authToken,
        client: action.client,
        uid: action.uid
      }
    case INDEX_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case INDEX_RESPONSE:
      return {
        ...state,
        isLoading: false,
        indexJourneys: action.journeys
      }
    case INDEX_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}
