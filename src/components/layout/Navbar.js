import React, {useState, useEffect} from 'react'
import {checkAuthorizationToken} from '../../helper/auth'
import NavbarList from './NavbarList'
const Navbar = () => {
    const  [loginStatus, setLoginStatus ] = useState('') 
    useEffect(() => {
        let status = checkAuthorizationToken()
            console.log(status)
            setLoginStatus(status)    
    }, )
    return (
        <div>
             <nav className="green">
                <div className="nav-wrapper">
                <a href="/" className="brand-logo">Chat</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <NavbarList loginStatus={loginStatus}/>
                </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <NavbarList loginStatus={loginStatus}/>
            </ul>
        </div>
    )
}

export default Navbar
