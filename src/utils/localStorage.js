import store from '../store'
export const storeLocalHeaders = (headers) => {
  const baseUrl = store.getState().currentUser.baseUrl
  Object.keys(headers).map(header => {
    switch (header) {
      case "client":
        window.localStorage.setItem(`${baseUrl}@client`, headers[header]);
        break
      case "access-token":
        window.localStorage.setItem(`${baseUrl}@access-token`, headers[header]);
        break
      case "expiry":
        window.localStorage.setItem(`${baseUrl}@expiry`, headers[header]);
        break
      case "uid":
        window.localStorage.setItem(`${baseUrl}@uid`, headers[header]);
        break;
    
      default:
        break;
    }
  })
}

export const deleteLocalHeaders = () => {
  const baseUrl = store.getState().currentUser.baseUrl
  window.localStorage.removeItem(`${baseUrl}@client`);
  window.localStorage.removeItem(`${baseUrl}@access-token`);
  window.localStorage.removeItem(`${baseUrl}@expiry`);
  window.localStorage.removeItem(`${baseUrl}@uid`);
}