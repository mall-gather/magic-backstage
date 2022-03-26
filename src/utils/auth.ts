//set 
export function setToken(TokenKey: string, token: string) {
  return window.localStorage.setItem(TokenKey, token)
}

// get
export function getToken(TokenKey: string) {
  return window.localStorage.getItem(TokenKey)
}

// remove
export function removeToken(TokenKey: string) {
  return window.localStorage.removeItem(TokenKey)
}