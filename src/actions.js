import {
  BASE_URL,
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  AUTH_ERROR,
  REAUTH
} from './constants';
import { AsyncStorage } from 'react-native';

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email: email
  }
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password: password
  }
}

export function login(email, password) {
  console.log("STARTING FETCH")
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
          
          storeAuth(authToken, client, uid);
          dispatch({
            type: LOGIN_RESPONSE,
            user: body.data,
            authToken: response.headers.get("access-token"),
            client: response.headers.get("client"),
            uid: response.headers.get("uid")
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

async function storeAuth(authToken, client, uid) {
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
