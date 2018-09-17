import {
  DEAUTH,
  REAUTH,
  FETCH,
  ERROR,
  RESPONSE,
  AUTH_ERROR,
  LOGIN_RESPONSE,
  INDEX_RESPONSE,
  MY_INDEX_RESPONSE,
  CREATE_JOURNEY_RESPONSE,
  CREATE_JOURNEY_LOG_RESPONSE,
  CREATE_COMMITS_RESPONSE,
  SIGNUP_RESPONSE,
  CLEAR_SIGNUP_ERROR,
  CLEAR_AUTH_ERROR,
  CLEAR_NEW_MEMBER,
  GET_JOURNEY_RESPONSE,
  CLEAR_CREATED_JOURNEY,
  CLEAR_CREATED_JOURNEY_LOG,
  CLEAR_CREATED_COMMITS,
  EDIT_COMMIT_RESPONSE,
  CLEAR_EDITED_COMMIT,
  UPLOAD_PROFILE_PICTURE_RESPONSE,
  CLEAR_ACTION_COMPLETED_FLAG,
  EDIT_JOURNEY_RESPONSE,
  CLEAR_EDITED_JOURNEY
} from "./constants.js";

const initialState = {
  user: null,
  isLoading: false,
  authError: false,
  authToken: null,
  client: null,
  uid: null,
  indexJourneys: [],
  myJourneys: [],
  journeyCache: {},
  //newMember: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true
      }
    case ERROR:
      return {
        ...state,
        isLoading: false
      }
    case RESPONSE:
      return {
        ...state,
        isLoading: false,
        actionCompleted: true
      }
    case LOGIN_RESPONSE:
      return {
        ...state,
        isLoading: false,
        authToken: action.authToken,
        client: action.client,
        uid: action.uid,
        user: action.user
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
        uid: action.uid,
        user: action.user
      }
    case INDEX_RESPONSE:
      return {
        ...state,
        isLoading: false,
        indexJourneys: action.journeys
      }
    case MY_INDEX_RESPONSE:
      return {
        ...state,
        isLoading: false,
        myJourneys: action.myJourneys
      }
    case CREATE_JOURNEY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        createdJourney: true
      }
    case SIGNUP_RESPONSE:
      return {
        ...state,
        isLoading: false,
        authToken: action.authToken,
        client: action.client,
        uid: action.uid,
        newMember: (action.authToken ? true : null),
        signupError: action.signupError,
        user: action.user
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
    case CLEAR_NEW_MEMBER:
      return {
        ...state,
        newMember: false
      }
    case CREATE_JOURNEY_LOG_RESPONSE:
      return {
        ...state,
        isLoading: false,
        createdJourneyLog: true
      }
    case GET_JOURNEY_RESPONSE:
      let journeyCache = state.journeyCache;
      journeyCache[action.journey.id] = action.journey;
      return {
        ...state,
        isLoading: false,
        journeyCache: journeyCache
      }
    case CLEAR_CREATED_JOURNEY:
      return {
        ...state,
        createdJourney: false
      }
    case CLEAR_CREATED_JOURNEY_LOG:
      return {
        ...state,
        createdJourneyLog: false
      }
    case CREATE_COMMITS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        createdCommits: true
      }
    case CLEAR_CREATED_COMMITS:
      return {
        ...state,
        createdCommits: false
      }
    case EDIT_COMMIT_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editedCommit: true
      }
    case CLEAR_EDITED_COMMIT:
      return {
        ...state,
        editedCommit: false
      }
    case UPLOAD_PROFILE_PICTURE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        user: action.user
      }
    case CLEAR_ACTION_COMPLETED_FLAG:
      return {
        ...state,
        actionCompleted: false
      };
    case EDIT_JOURNEY_RESPONSE:
      return {
        ...state,
        editedJourney: true,
        isLoading: false
      };
    case CLEAR_EDITED_JOURNEY:
      return {
        ...state,
        editedJourney: false
      };
    default:
      return state;
  }
}
