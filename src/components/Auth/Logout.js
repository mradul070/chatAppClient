import {UserContext} from '../../UserContext'
import {useState, useEffect, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export const LogoutButton = () => {

    const [loggedOut, setLoggedOut] = useState(false)
    useEffect(() => {   
        localStorage.removeItem('accessToken')
        setLoggedOut(true)
    }, [])
  
    if (loggedOut) {
      return <Redirect to="/"/>
    }else {
        return null
    }
  
  };

export default LogoutButton
