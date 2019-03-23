// This is a helper file to handle comments, comment replies, 
// and reactions across multiple content types.

import { UPDATE_HEADERS } from '../actions/types';
import store from '../store';
import Axios from 'axios';

// Requests

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
  
  
  if (hash["parent_type"] === undefined && hash["parent_id"] === undefined && hash["request_type"] === undefined && hash["request_id"] === undefined) {
    const requestUrl = `${apiVersion}`
    return requestUrl
  } else if(hash["parent_id"] === undefined && hash["request_type"] === undefined && hash["request_id"] === undefined) {
    let parentType = pluralizeType(hash["parent_type"])
    const requestUrl = `${apiVersion}/${parentType}`.replace(/-/g, "_")
    return requestUrl
  } else if(hash["request_type"] === undefined && hash["request_id"] === undefined){
    let parentID = hash["parent_id"]
    let parentType = pluralizeType(hash["parent_type"])
    const requestUrl = `${apiVersion}/${parentType}/${parentID}`.replace(/-/g, "_")
    return requestUrl
  } else if(hash["request_id"] === undefined){
    let parentID = hash["parent_id"]
    let parentType = pluralizeType(hash["parent_type"])
    let requestType = pluralizeType(hash["request_type"])
    const requestUrl = `${apiVersion}/${parentType}/${parentID}/${requestType}`.replace(/-/g, "_")
    return requestUrl
  } else {
    let parentID = hash["parent_id"]
    let parentType = pluralizeType(hash["parent_type"])
    let requestType = pluralizeType(hash["request_type"])
    let requestID = hash["request_id"]
    const requestUrl = `${apiVersion}/${parentType}/${parentID}/${requestType}/${requestID}`.replace(/-/g, "_")
    return requestUrl
  }
  
  
}

const pluralizeType = (string) => {
  switch (string) {
    case "post":
      return "posts"
    case "comment":
      return "comments"
    case "comments":
      return "comments"
    case "comment_reply":
      return "comment_replys"
    case "comment-reply":
      return "comment_replys"
    case "reaction":
      return "reactions"
    case "reactions":
      return "reactions"
    case "memeber": case "members":
      return "members"
    case "family": case "authorized_families":
      return "authorized_families"
    default:
      throw new Error(`${string} <- does not match case for pluralizeType.`)
  }
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
      // timeout: 1000,
    
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
        // 
        return res.data.data
      })
      // 
      return Promise.resolve(result)
      
};

export const contentPoster = (method, data, requestUrl) => {
  let config = {
    // `url` is the server URL that will be used for the request
    url: requestUrl,

    // `method` is the request method to be used when making the request
    method: method,
  
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: `http://${store.getState().currentUser.baseUrl}`,
  
    // `headers` are custom headers to be sent
    headers: store.getState().currentUser.currentHeader,
  
    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
    data: data,

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
      // 
      if(res.status === 204){
        return {}
      } else {
        return res.data.data
      }
      
    })
    // 
    return Promise.resolve(result)
    
};

// User Processing

export const findMemberData = (memberID) => {
  // Take in Array and Map
  // member.id is a str and memberID is an int.
  const memberData = store.getState().members.items.find(member => member.id == memberID)

  return memberData.attributes

}