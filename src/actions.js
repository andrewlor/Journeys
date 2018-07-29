import {
  BASE_URL,
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  AUTH_ERROR
} from './constants';

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
