import React, {useState, useContext} from 'react'
import {UserContext} from '../../UserContext'
import axios from 'axios'
const SignUp = (props) => {
    const {user, setUser} = useContext(UserContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('') 
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const submitHandler = e => {
        e.preventDefault()
        setEmailError('')
        setNameError('')
        setPasswordError('')
        try {
            const res = axios.post('http://localhost:3002/signup', {
                name, email, password
            }).then(response => {
                if (response.data.userData) {
                    props.history.push('/login')
                } else {

                }
            }).catch(error => {
                setEmailError(error.response.data.email)
                setNameError(error.response.data.name)
                setPasswordError(error.response.data.password)
            })
        } catch (error) {
            console.log('outside catch', error)
        }
    }
    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate"
                            value={name} onChange={e => setName(e.target.value)} />
                            <div className="name error red-text">{nameError}</div>
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
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

export default SignUp
