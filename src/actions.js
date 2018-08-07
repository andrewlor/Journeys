import {
  BASE_URL,
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  INDEX_FETCH,
  INDEX_RESPONSE,
  INDEX_ERROR,
  CREATE_JOURNEY_FETCH,
  CREATE_JOURNEY_RESPONSE,
  CREATE_JOURNEY_ERROR,
  SIGNUP_FETCH,
  SIGNUP_RESPONSE,
  SIGNUP_ERROR,
  AUTH_ERROR,
  DEAUTH,
  REAUTH,
  CLEAR_SIGNUP_ERROR,
  CLEAR_AUTH_ERROR
} from './constants';
import { AsyncStorage } from 'react-native';

export function login(email, password) {
  return dispatch => {
    dispatch({ type: LOGIN_FETCH })
    
    fetch(BASE_URL + '/users/sign_in', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          const authToken = response.headers.get("access-token");
          const client = response.headers.get("client");
          const uid = response.headers.get("uid");
          
          setStore(authToken, client, uid);
          dispatch({
            type: LOGIN_RESPONSE,
            authToken: authToken,
            client: client,
            uid: uid
          })
        });
      } else {
        dispatch({
          type: AUTH_ERROR
        })
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: LOGIN_ERROR
      });
    })
  }
}

export function logout() {
  return dispatch => {
    clearStore()
    dispatch({ type: DEAUTH })
  }
}

export function index(authToken, client, uid) {
  return dispatch => {
    dispatch({ type: INDEX_FETCH })
    
    fetch(BASE_URL + '/journeys', {
      method: 'get',
      headers: {
        "access-token": authToken,
        client: client,
        uid: uid
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          dispatch({
            type: INDEX_RESPONSE,
            journeys: body
          })
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: INDEX_ERROR
      });
    })
  }
}

export function createJourney(authToken, client, uid, title, missionStatement) {
  return dispatch => {
    dispatch({ type: CREATE_JOURNEY_FETCH })
    
    fetch(BASE_URL + '/journeys', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      },
      body: JSON.stringify({
        title: title,
        mission_statement: missionStatement
      })
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          dispatch({
            type: CREATE_JOURNEY_RESPONSE
          });
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: CREATE_JOURNEY_ERROR
      });
    })
  }
}

export function signup(email, password, confirm_password) {
  return dispatch => {
    dispatch({ type: SIGNUP_FETCH })
    
    fetch(BASE_URL + '/users', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confirm_password
      })
    }).then((response) => {
      response.json().then((body) => {
        if (response.status >= 200 && response.status < 300) {
          const authToken = response.headers.get("access-token");
          const client = response.headers.get("client");
          const uid = response.headers.get("uid");
          
          setStore(authToken, client, uid);
          dispatch({
            type: SIGNUP_RESPONSE,
            authToken: authToken,
            client: client,
            uid: uid
          });
        } else {
          dispatch({
            type: SIGNUP_RESPONSE,
            signupError: body.errors.full_messages
          });
        }
      });
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: SIGNUP_ERROR
      });
    })
  }
}

export function reauth(authToken, client, uid) {
  return dispatch => {
    dispatch({
      type: REAUTH,
      authToken: authToken,
      client: client,
      uid: uid
    });
  }
}

export function clearAuthError() {
  return dispatch => {
    dispatch({
      type: CLEAR_AUTH_ERROR
    })
  }
}

export function clearSignUpError() {
  return dispatch => {
    dispatch({
      type: CLEAR_SIGNUP_ERROR
    })
  }
}

async function setStore(authToken, client, uid) {
  const AUTH = {
    authToken: authToken,
    client: client,
    uid: uid
  };
  try {
    await AsyncStorage.setItem('@Journeys:AUTH', JSON.stringify(AUTH));
  } catch (error) {
    console.log("ERROR PERSISTING STORAGE");
    return;
  }
  console.log("SUCCESSFUL PERSISTING STORAGE");
}

async function clearStore() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("ERROR CLEARING STORAGE");
    return;
  }
  console.log("SUCCESSFUL CLEARING STORAGE");
}
