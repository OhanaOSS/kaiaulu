import { NEW_SIGN_IN } from './types';
import Axios from 'axios';

export const signIn = signInCredentials => dispatch => {
    Axios.post(`http://${signInCredentials.baseUrl}/v1/auth/sign_in`, signInCredentials)
    .then(res => 
      dispatch({
        type: NEW_SIGN_IN,
        baseUrl: signInCredentials.baseUrl,
        payload: res.data.data,
        headers: res.headers
      })
    );
};