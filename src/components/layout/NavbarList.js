import React from 'react'
import { Redirect } from 'react-router-dom'

const NavbarList = ({loginStatus}) => {
    if(loginStatus) {
        return (
            <div>
                <li><a href="/logout">Logout</a></li>
            </div>
        )
    } else {
        return(
            <div>
                <Redirect to='/' />
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">SignUp</a></li>
            </div>
        )
    }
}

export default NavbarList
