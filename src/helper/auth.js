import jwt from 'jsonwebtoken'
import moment from 'moment'
export function checkAuthorizationToken() {
    let isExpired = false
    let token = localStorage.getItem('accessToken');
    if (token) {
      let decodedToken=jwt.decode(token, {complete: true});
      let dateNow = moment()
      dateNow = dateNow.unix()
      if(decodedToken.payload.exp > dateNow) {
        isExpired = true;
      }
      else if (decodedToken.payload.exp < dateNow){
        localStorage.removeItem('accessToken')
        isExpired = false
      }
    }
    return isExpired
}

export function authHeader() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
}