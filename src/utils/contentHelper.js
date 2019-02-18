// This is a helper file to handle comments, comment replies, 
// and reactions across multiple content types.

import { UPDATE_HEADERS } from '../actions/types';
import store from '../store';
import Axios from 'axios';

export const urlBuilder = (hash) => {
  // This is a helper url builder for the requestUrl for contentFetcher
  // it's configured to use content routes in hale.
  // i.e. get /v1/comments/:comment_id/comment_replys

  // It takes in options as a hash so when used it should be:
  // urlBuilder({
  //  parent_id: 1,
  //  parent_type: "foo",
  //  request_type: "bar"
  // })

  let apiVersion = "/v1"
  let parentID = hash["parent_id"]
  let parentType = hash["parent_type"]
  let requestType = hash["request_type"]

  return `${apiVersion}/${parentType}/${parentID}/${requestType}`
}

export const contentFetcher = (requestUrl) => {
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
  
  
   let result = Axios(config)
      .then(res => {
        store.dispatch({
          type: UPDATE_HEADERS,
          headers: res.headers
        })
        // console.log(res, res.data.data)
        return res.data.data
      })
      // console.log('result', result)
      return Promise.resolve(result)
      
};