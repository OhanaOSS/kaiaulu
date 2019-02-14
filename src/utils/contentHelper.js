// This is a helper file to handle comments, comment replies, 
// and reactions across multiple content types.

import { UPDATE_HEADERS } from '../actions/types';
import store from '../store';
import Axios from 'axios';

export async function contentFetcher(requestUrl) {
  try {
    let config = {
      // `url` is the server URL that will be used for the request
      url: requestUrl,
  
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
        store.dispatch({
          type: UPDATE_HEADERS,
          headers: res.headers
        });
        console.log(res, res.data.data);
        Promise.resolve(res);
      })
  } catch(error) {
    console.log(error);
    Promise.reject(error);
  }
};