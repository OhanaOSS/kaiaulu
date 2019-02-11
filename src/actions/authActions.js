// Backend Docs on gem handling auth here: https://devise-token-auth.gitbook.io/devise-token-auth/usage

import { VALIDATE_TOKEN_SUCESS, VALIDATE_TOKEN_FAILURE, SIGN_OUT, NEW_SIGN_IN, NEW_SIGN_UP_WITH_NEW_FAMILY } from './types';
import Axios from 'axios';
import store, {history} from '../store';

export const signIn = signInCredentials => dispatch => {
    Axios.post(`http://${signInCredentials.baseUrl}/v1/auth/sign_in`, signInCredentials)
    .then(res => {
      dispatch({
        type: NEW_SIGN_IN,
        baseUrl: signInCredentials.baseUrl,
        payload: res.data.data,
        headers: res.headers
      })
      history.push('/app')
    });
};

export const signUpWithNewFamily = signUpWithNewFamilyCredentials => dispatch => {
    Axios.post(`http://${signUpWithNewFamilyCredentials.baseUrl}/v1/auth`, {
        family:  {
            family_name: signUpWithNewFamilyCredentials.familyName
        },
        registration: {
            email: signUpWithNewFamilyCredentials.email,
            password: signUpWithNewFamilyCredentials.password,
            name: signUpWithNewFamilyCredentials.name,
            surname: signUpWithNewFamilyCredentials.surname,
        }
    })
    .then(res => 
      dispatch({
        type: NEW_SIGN_UP_WITH_NEW_FAMILY,
        baseUrl: signUpWithNewFamilyCredentials.baseUrl,
        payload: res.data.data,
        headers: res.headers
      })
    );
};

export const signOut = signOutRequest => dispatch => {

  let config = {
    // `url` is the server URL that will be used for the request
    url: 'v1/auth/sign_out',
  
    // `method` is the request method to be used when making the request
    method: 'delete',
  
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: `http://${store.getState().currentUser.baseUrl}`,
  
    // `headers` are custom headers to be sent
    headers: signOutRequest,
  
    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 2000,
  
    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
  }

  Axios(config)
  .then(res => 
    dispatch({
      type: SIGN_OUT,
      headers: res.headers
    })
  );
};

export const validateToken = validateTokenRequest => dispatch => {

    let config = {
      // `url` is the server URL that will be used for the request
      url: 'v1/auth/validate_token',
    
      // `method` is the request method to be used when making the request
      method: 'get',
    
      // `baseURL` will be prepended to `url` unless `url` is absolute.
      // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
      // to methods of that instance.
      baseURL: `http://${store.getState().currentUser.baseUrl}`,
    
      // `headers` are custom headers to be sent
      headers: validateTokenRequest,
    
      // `timeout` specifies the number of milliseconds before the request times out.
      // If the request takes longer than `timeout`, the request will be aborted.
      timeout: 2000,
    
      // `responseType` indicates the type of data that the server will respond with
      // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json', // default
    }
  
    Axios(config)
    .then((res) => {
        dispatch({
            type: VALIDATE_TOKEN_SUCESS,
            headers: res.headers
        })
    })
    .catch((err) => {
        if (err.response.status === 401) {
            dispatch({
                type: VALIDATE_TOKEN_FAILURE,
                headers: {}
            })
        }
    });

  };