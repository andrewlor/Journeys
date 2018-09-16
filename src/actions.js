import {
  BASE_URL,
  FETCH,
  ERROR,
  RESPONSE,
  LOGIN_FETCH,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  INDEX_FETCH,
  INDEX_RESPONSE,
  INDEX_ERROR,
  MY_INDEX_FETCH,
  MY_INDEX_RESPONSE,
  MY_INDEX_ERROR,
  CREATE_JOURNEY_FETCH,
  CREATE_JOURNEY_RESPONSE,
  CREATE_JOURNEY_ERROR,
  CREATE_JOURNEY_LOG_FETCH,
  CREATE_JOURNEY_LOG_RESPONSE,
  CREATE_JOURNEY_LOG_ERROR,
  SIGNUP_FETCH,
  SIGNUP_RESPONSE,
  SIGNUP_ERROR,
  AUTH_ERROR,
  DEAUTH,
  REAUTH,
  CLEAR_SIGNUP_ERROR,
  CLEAR_AUTH_ERROR,
  CLEAR_NEW_MEMBER,
  GET_JOURNEY_RESPONSE,
  CREATE_COMMITS_RESPONSE,
  EDIT_COMMIT_RESPONSE,
  UPLOAD_PROFILE_PICTURE_RESPONSE,
  CLEAR_ACTION_COMPLETED_FLAG,
  EDIT_JOURNEY_RESPONSE
} from './constants';
import { AsyncStorage } from 'react-native';

function apiResponseHandler(response) {
  return new Promise(function(resolve, reject) {
    if (response.status >= 200 && response.status < 300) {
      response.json().then((body) => {
        const authToken = response.headers.get("access-token");
        const client = response.headers.get("client");
        const uid = response.headers.get("uid");
        resolve({
          ...body,
          authToken: authToken,
          client: client,
          uid: uid
        });
      });
    } else if (response.status == 401) {
      reject();
    } else {
      reject();
    }
  });
}

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
          
          setStore(authToken, client, uid, body.data);
          dispatch({
            type: LOGIN_RESPONSE,
            authToken: authToken,
            client: client,
            uid: uid,
            user: body.data
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
        console.log(response.status);
        console.log(response);
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: INDEX_ERROR
      });
    })
  }
}

export function myJourneys(authToken, client, uid) {
  return dispatch => {
    dispatch({ type: MY_INDEX_FETCH })
    
    fetch(BASE_URL + '/my_journeys', {
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
            type: MY_INDEX_RESPONSE,
            myJourneys: body
          })
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: MY_INDEX_ERROR
      });
    })
  }
}

export function getJourney(authToken, client, uid, journeyId) {
  return dispatch => {
    dispatch({ type: FETCH })
    
    fetch(BASE_URL + '/journeys/' + journeyId, {
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
            type: GET_JOURNEY_RESPONSE,
            journey: body
          })
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: ERROR
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

export function createJourneyLog(authToken, client, uid, journeyId, log, image) {
  return dispatch => {
    dispatch({ type: CREATE_JOURNEY_LOG_FETCH })

    let body = { log: log };
    if (image) body.image = image;
    
    fetch(BASE_URL + '/journeys/' + journeyId + '/journey_logs', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          dispatch({
            type: CREATE_JOURNEY_LOG_RESPONSE
          });
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => dispatch({type: ERROR}));
  }
}

export function createCommits(authToken, client, uid, journeyId, commitPeriodId, commits) {
  return dispatch => {
    dispatch({ type: FETCH });
    
    fetch(BASE_URL + '/journeys/' + journeyId + '/commit_periods/' + commitPeriodId + '/commits', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      },
      body: JSON.stringify({
        commits: commits
      })
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          dispatch({
            type: CREATE_COMMITS_RESPONSE
          });
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => {
      console.log(error)
      dispatch({
        type: ERROR
      });
    })
  }
}

export function editCommit(authToken, client, uid, journeyId, commitId) {
  return dispatch => {
    dispatch({ type: FETCH });
    
    fetch(BASE_URL + '/journeys/' + journeyId + '/commits/' + commitId, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      }
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          dispatch({
            type: EDIT_COMMIT_RESPONSE
          });
        });
      } else {
        console.log(response.status)
      }
    }).catch((error) => {
      console.log(error)
      dispatch({ type: ERROR });
    })
  }
}

export function signup(email, password, confirm_password, nickname) {
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
        password_confirmation: confirm_password,
        nickname: nickname
      })
    }).then((response) => {
      response.json().then((body) => {
        if (response.status >= 200 && response.status < 300) {
          const authToken = response.headers.get("access-token");
          const client = response.headers.get("client");
          const uid = response.headers.get("uid");
          
          setStore(authToken, client, uid, body.data);
          dispatch({
            type: SIGNUP_RESPONSE,
            authToken: authToken,
            client: client,
            uid: uid,
            user: body.data
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

export function uploadProfilePicture(authToken, client, uid, image) {
  return dispatch => {
    dispatch({ type: FETCH });
    
    fetch(BASE_URL + '/profile_picture', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      },
      body: JSON.stringify({
        image: image
      })
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((body) => {
          setStore(authToken, client, uid, body);
          dispatch({
            type: UPLOAD_PROFILE_PICTURE_RESPONSE,
            user: body
          });
        });
      } else {
        console.log(response.status)
        dispatch({ type: ERROR });
      }
    }).catch((error) => {
      console.log(error)
      dispatch({ type: ERROR });
    })
  }
}

export function deleteJourney(authToken, client, uid, id) {
  return dispatch => {
    dispatch({ type: FETCH });
    
    fetch(BASE_URL + '/journeys/' + id, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      }
    })
      .then(apiResponseHandler)
      .then((body) => {
        dispatch({ type: EDIT_JOURNEY_RESPONSE });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: ERROR });
      })
  }
}

export function deleteJourneyLog(authToken, client, uid, jid, id) {
  return dispatch => {
    dispatch({ type: FETCH });
    
    fetch(BASE_URL + '/journeys/' + jid + '/journey_logs/' + id, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      }
    })
      .then(apiResponseHandler)
      .then((body) => {
        dispatch({ type: RESPONSE });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: ERROR });
      })
  }
}

export function editJourney(authToken, client, uid, id, ms) {
  return dispatch => {
    dispatch({ type: FETCH });
    
    fetch(BASE_URL + '/journeys/' + id, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "access-token": authToken,
        client: client,
        uid: uid
      },
      body: JSON.stringify({
        mission_statement: ms
      })
    })
      .then(apiResponseHandler)
      .then((body) => {
        dispatch({ type: EDIT_JOURNEY_RESPONSE  });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: ERROR });
      })
  }
}

export function clearActionCompletedFlag() {
  return dispatch => {
    dispatch({
      type: CLEAR_ACTION_COMPLETED_FLAG
    });
  };
}

export function reauth(authToken, client, uid, user) {
  return dispatch => {
    dispatch({
      type: REAUTH,
      authToken: authToken,
      client: client,
      uid: uid,
      user: user
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

export function clearNewMember() {
  return dispatch => {
    dispatch({
      type: CLEAR_NEW_MEMBER
    })
  }
}

async function setStore(authToken, client, uid, user) {
  const AUTH = {
    authToken: authToken,
    client: client,
    uid: uid,
    user: user
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
