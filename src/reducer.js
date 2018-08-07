import {
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  AUTH_ERROR,
  INDEX_FETCH,
  INDEX_RESPONSE,
  INDEX_ERROR,
  CREATE_JOURNEY_FETCH,
  CREATE_JOURNEY_RESPONSE,
  CREATE_JOURNEY_ERROR,
  SIGNUP_FETCH,
  SIGNUP_RESPONSE,
  SIGNUP_ERROR,
  DEAUTH,
  REAUTH,
  CLEAR_SIGNUP_ERROR,
  CLEAR_AUTH_ERROR
} from "./constants.js";

const initialState = {
  user: null,
  isLoading: false,
  authError: false,
  authToken: null,
  client: null,
  uid: null,
  indexJourneys: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FETCH:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_RESPONSE:
      return {
        ...state,
        isLoading: false,
        authToken: action.authToken,
        client: action.client,
        uid: action.uid,
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
    case CREATE_JOURNEY_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_JOURNEY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        createdJourney: true
      }
    case CREATE_JOURNEY_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case SIGNUP_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case SIGNUP_RESPONSE:
      return {
        ...state,
        isLoading: false,
        authToken: action.authToken,
        client: action.client,
        uid: action.uid,
        signupError: action.signupError
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case DEAUTH:
      return initialState;
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null
      }
    case CLEAR_SIGNUP_ERROR:
      return {
        ...state,
        signupError: null
      }
    default:
      return state;
  }
}
