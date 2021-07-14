import React, {useState, useContext} from 'react'
import {UserContext} from '../../UserContext'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
const Login = (props) => {
    const {user, setUser} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const submitHandler = async e => {
        e.preventDefault()
        setEmailError('')
        setPasswordError('')
        try {
            axios.post('http://localhost:3002/login', {
            email, password,
        }).then(response => {
            let accessToken = response.headers.authorization
            localStorage.setItem('accessToken', accessToken)
            props.history.push('/')
        }).catch(err => {
            console.log(err.response)
            setEmailError(err.response.data.email)
            setPasswordError(err.response.data.password)
        })
        } catch (error) {
            
        }
    }
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"
                            value={email} onChange={e => setEmail(e.target.value)} />
                            <div className="email error red-text">{emailError}</div>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"
                            value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="password error red-text">{passwordError}</div>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn"> Sign Up</button>
                </form>
            </div>

        </div>
    )
}

export default Login
