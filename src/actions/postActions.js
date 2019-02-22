import { FETCH_POSTS, NEW_POST, UPDATE_HEADERS} from './types';
import Axios from 'axios';
import store, {history} from '../store';

export const fetchPosts = () => dispatch => {

  let config = {
    // `url` is the server URL that will be used for the request
    url: 'v1/posts',

    // `method` is the request method to be used when making the request
    method: 'get',
  
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: `http://${store.getState().currentUser.baseUrl}`,
  
    // `headers` are custom headers to be sent
    headers: store.getState().currentUser.currentHeader,
  
    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 2000,
  
    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
  }


  Axios(config)
    .then(res => {
      // console.log(res, res.data.data)
      dispatch({
        type: FETCH_POSTS,
        payload: res.data.data
      })
      if (res.headers["access-token"] !== "") {
        // console.log("headers", res.headers["access-token"])
        dispatch({
          type: UPDATE_HEADERS,
          headers: res.headers
        })
      }
    });
};

// export const createPost = postData => dispatch => {
//   fetch(`${baseUrl}/posts`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//     .then(res => res.json())
//     .then(post =>
//       dispatch({
//         type: NEW_POST,
//         payload: post
//       })
//     );
// };